import { OAuth2Client } from "google-auth-library";
import {
  ProviderInterface,
  OAuthConfig,
  TokenResponse,
  UserInfo,
} from "../types";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID);

const config: OAuthConfig = {
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenUrl: "https://oauth2.googleapis.com/token",
  scopes: ["openid", "email", "profile"],
  additionalParams: {
    access_type: "offline",
    prompt: "select_account",
  },
};

export const googleProvider: ProviderInterface = {
  name: "google",
  config,

  getAuthorizationUrl(state: string, redirectUri: string): string {
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: config.scopes.join(" "),
      state: state,
      ...config.additionalParams,
    });

    return `${config.authorizationUrl}?${params.toString()}`;
  },

  async exchangeCodeForTokens(
    code: string,
    redirectUri: string
  ): Promise<TokenResponse> {
    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error("token_exchange_failed");
    }

    return response.json();
  },

  async verifyAndGetUserInfo(tokens: TokenResponse): Promise<UserInfo> {
    if (!tokens.id_token) {
      throw new Error("no_id_token");
    }

    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error("empty_token_payload");
    }

    if (!payload.email_verified) {
      throw new Error("email_not_verified");
    }

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name || "User",
      emailVerified: payload.email_verified ?? false,
    };
  },

  async refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!response.ok) {
      throw new Error("token_refresh_failed");
    }

    return response.json();
  },
};
