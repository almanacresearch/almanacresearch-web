import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, createSessionToken } from "@/lib/auth/session";
import { getUserById } from "@/lib/db/users";
import {
  clearAllAuthCookies,
  setSessionCookie,
  AUTH_COOKIES,
  SESSION_RENEWAL_THRESHOLD,
  ACCESS_TOKEN_DEFAULT_MAX_AGE,
  ACCESS_TOKEN_REFRESH_THRESHOLD,
} from "@/lib/auth/cookies";
import { dbUserToPublic } from "@/lib/auth/types";

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get(AUTH_COOKIES.SESSION)?.value;

  if (!sessionToken) {
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 401 }
    );
  }

  const session = verifySessionToken(sessionToken);

  if (!session) {
    const response = NextResponse.json(
      { authenticated: false, user: null, error: "invalid_session" },
      { status: 401 }
    );

    response.cookies.delete(AUTH_COOKIES.SESSION);
    return response;
  }

  const dbUser = await getUserById(session.userId);

  if (!dbUser) {
    const response = NextResponse.json(
      { authenticated: false, user: null, error: "user_not_found" },
      { status: 401 }
    );
    response.cookies.delete(AUTH_COOKIES.SESSION);
    return response;
  }

  if (dbUser.status !== "ACTIVE") {
    const response = NextResponse.json(
      { authenticated: false, user: null, error: "user_inactive" },
      { status: 401 }
    );
    clearAllAuthCookies(response);
    return response;
  }

  // Check if access token needs refresh (for client-side auto-refresh)
  const accessToken = request.cookies.get(AUTH_COOKIES.ACCESS_TOKEN)?.value;
  const accessTokenAge = accessToken ? ACCESS_TOKEN_DEFAULT_MAX_AGE : 0;
  const shouldRefreshAccessToken = !accessToken; // No cookie = expired or missing

  const now = Math.floor(Date.now() / 1000);
  const timeUntilExpiry = session.exp - now;
  const shouldRenewSession = timeUntilExpiry < SESSION_RENEWAL_THRESHOLD;

  const responseData = {
    authenticated: true,
    user: dbUserToPublic(dbUser),
    // Tell client if it should refresh the access token
    shouldRefreshAccessToken,
    // Tell client when access token expires (for proactive refresh)
    accessTokenExpiresIn: accessToken ? accessTokenAge - ACCESS_TOKEN_REFRESH_THRESHOLD : 0,
  };

  // Sliding session: renew if less than 7 days left
  if (shouldRenewSession) {
    const newSessionToken = createSessionToken(dbUserToPublic(dbUser));
    const response = NextResponse.json(responseData);
    setSessionCookie(response, newSessionToken);
    return response;
  }

  return NextResponse.json(responseData);
}
