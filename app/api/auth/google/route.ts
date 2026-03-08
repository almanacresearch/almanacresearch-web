import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIES, OAUTH_COOKIE_MAX_AGE } from "@/lib/auth/cookies";
import type { OAuthFlow } from "@/lib/auth/cookies";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const BASE_SCOPES = ["openid", "email", "profile"];
const GMAIL_SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/calendar.readonly",
];
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.almanacresearch.com";

function generateState(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

/**
 * GET /api/auth/google?returnUrl=/some/path&flow=signin|connect&scopes=gmail&prompt=select_account
 *
 * Unified OAuth entry point for both sign-in and connecting additional accounts.
 *   - flow=signin (default): Standard sign-in / sign-up
 *   - flow=connect: Link an additional Google account to the current user
 *   - scopes=gmail: Request Gmail + Calendar scopes (used with connect)
 *   - prompt=select_account: Force account chooser (sign-in only)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const returnUrl = searchParams.get("returnUrl") || "/";
  const flow: OAuthFlow = (searchParams.get("flow") as OAuthFlow) || "signin";
  const requestGmail = searchParams.get("scopes") === "gmail";
  const prompt = searchParams.get("prompt");

  const state = generateState();
  const redirectUri = `${BASE_URL}/api/auth/callback/google`;

  const scopes = requestGmail
    ? [...BASE_SCOPES, ...GMAIL_SCOPES]
    : BASE_SCOPES;

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes.join(" "),
    state: state,
    access_type: "offline",
  });

  // Connect flow: always needs consent for refresh token, optionally with account selection
  // Sign-in flow: only needs account selection when explicitly requested
  if (flow === "connect") {
    // For connect, combine select_account with consent if user wants to pick an account
    params.set("prompt", prompt === "select_account" ? "select_account consent" : "consent");
  } else if (prompt === "select_account") {
    params.set("prompt", "select_account");
  }

  const authUrl = `${GOOGLE_AUTH_URL}?${params.toString()}`;

  const response = NextResponse.redirect(authUrl);

  const isSecure = request.nextUrl.protocol === "https:";
  const cookieOptions = {
    path: "/",
    maxAge: OAUTH_COOKIE_MAX_AGE,
    sameSite: "lax" as const,
    secure: isSecure,
    httpOnly: true,
  };

  response.cookies.set(AUTH_COOKIES.OAUTH_STATE, state, cookieOptions);
  response.cookies.set(
    AUTH_COOKIES.OAUTH_RETURN_URL,
    encodeURIComponent(returnUrl),
    cookieOptions
  );
  response.cookies.set(AUTH_COOKIES.OAUTH_FLOW, flow, cookieOptions);

  return response;
}
