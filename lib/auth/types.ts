export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  expires_in?: number;
  scope?: string;
  token_type: string;
}

export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  authorizationUrl: string;
  tokenUrl: string;
  scopes: string[];
  additionalParams?: Record<string, string>;
}

export interface UserInfo {
  id: string;
  email?: string;
  name: string;
  picture?: string;
  emailVerified: boolean;
}

export interface ProviderInterface {
  name: string;
  config: OAuthConfig;
  getAuthorizationUrl(state: string, redirectUri: string): string;
  exchangeCodeForTokens(
    code: string,
    redirectUri: string
  ): Promise<TokenResponse>;
  verifyAndGetUserInfo(tokens: TokenResponse): Promise<UserInfo>;
  refreshAccessToken(refreshToken: string): Promise<TokenResponse>;
}

export interface User {
  userId: string;
  email: string | null;
  name: string;
  picture: string | null;
  invited: boolean;
}

export interface UserDB {
  id: string;
  primary_email: string | null;
  name: string;
  picture: string | null;
  status: "ACTIVE" | "INACTIVE" | "DISABLED";
  invited: boolean;
  created_at: string;
  updated_at: string | null;
  last_active: string | null;
}

export function dbUserToPublic(dbUser: UserDB): User {
  return {
    userId: dbUser.id,
    email: dbUser.primary_email,
    name: dbUser.name,
    picture: dbUser.picture,
    invited: dbUser.invited,
  };
}
