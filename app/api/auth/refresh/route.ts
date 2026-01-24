import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, requireAuth } from "@/lib/auth/session";
import { getUserById, updateRefreshToken, getOAuthTokens } from "@/lib/db/users";
import { googleProvider } from "@/lib/auth/providers/google";
import {
  clearAllAuthCookies,
  setSessionCookie,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  AUTH_COOKIES,
} from "@/lib/auth/cookies";
import { dbUserToPublic } from "@/lib/auth/types";

const providers = {
  google: googleProvider,
} as const;

type ProviderName = keyof typeof providers;

function isValidProvider(name: string): name is ProviderName {
  return name in providers;
}

export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.success) return auth.response;
  const { session } = auth;

  const providerName =
    request.cookies.get(AUTH_COOKIES.AUTH_PROVIDER)?.value || "google";

  if (!isValidProvider(providerName)) {
    return NextResponse.json(
      { success: false, error: "Invalid provider" },
      { status: 400 }
    );
  }
  let refreshToken = request.cookies.get(AUTH_COOKIES.REFRESH_TOKEN)?.value;
  
  if (!refreshToken) {
    const dbTokens = await getOAuthTokens(session.userId, providerName);
    refreshToken = dbTokens?.refresh_token;
  }

  if (!refreshToken) {
    return NextResponse.json(
      { success: false, error: "No refresh token available" },
      { status: 400 }
    );
  }

  const provider = providers[providerName];

  try {
    const tokens = await provider.refreshAccessToken(refreshToken);

    const dbUser = await getUserById(session.userId);
    if (!dbUser || dbUser.status !== "ACTIVE") {
      const response = NextResponse.json(
        { success: false, error: "user_inactive" },
        { status: 401 }
      );
      clearAllAuthCookies(response);
      return response;
    }

    const newRefreshToken = tokens.refresh_token;
    if (newRefreshToken) {
      await updateRefreshToken(session.userId, providerName, newRefreshToken);
    }
    const newSessionToken = createSessionToken(dbUserToPublic(dbUser));

    const response = NextResponse.json({
      success: true,
      expiresIn: tokens.expires_in,
    });

    setSessionCookie(response, newSessionToken);
    setAccessTokenCookie(response, tokens.access_token, tokens.expires_in);

    if (newRefreshToken) {
      setRefreshTokenCookie(response, newRefreshToken);
    }

    return response;
  } catch {
    const response = NextResponse.json(
      { success: false, error: "refresh_token_invalid" },
      { status: 401 }
    );
    clearAllAuthCookies(response);
    return response;
  }
}
