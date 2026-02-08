import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth/session";
import { AUTH_COOKIES, OAUTH_COOKIE_MAX_AGE } from "@/lib/auth/cookies";
import { hasRequiredChromeScopes } from "@/lib/db/users";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.almanacresearch.com";

export const BASE_SCOPES = ["openid", "email", "profile"];
export const GMAIL_SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/calendar.readonly",
];

function generateState(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

interface ChromeAuthOptions {
  requestGmailScopes: boolean;
}

export async function handleChromeAuth(
  request: NextRequest,
  options: ChromeAuthOptions
): Promise<NextResponse> {
  const redirectUri = request.nextUrl.searchParams.get("redirect_uri");
  const promptParam = request.nextUrl.searchParams.get("prompt");
  const loginHintParam = request.nextUrl.searchParams.get("login_hint");

  // Validate redirect_uri - must be a chromiumapp.org URL
  if (!redirectUri || !redirectUri.includes(".chromiumapp.org")) {
    return NextResponse.json(
      { error: "Invalid redirect_uri" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_COOKIES.SESSION)?.value;

  let userEmail: string | null = null;

  // Check if user has existing session (and not forcing new account)
  if (sessionToken && promptParam !== "select_account") {
    const session = verifySessionToken(sessionToken);
    if (session) {
      userEmail = session.email || null;
      
      // For signin: just check session exists
      // For start: also check if user already has Gmail scopes
      const canSkipOAuth = options.requestGmailScopes
        ? await hasRequiredChromeScopes(session.userId)
        : true;
      
      if (canSkipOAuth) {
        // User already authenticated - go directly to token endpoint with user_id
        const tokenUrl = `${BASE_URL}/api/auth/token/chrome?redirect_uri=${encodeURIComponent(redirectUri)}&user_id=${session.userId}`;
        return NextResponse.redirect(tokenUrl);
      }
    }
  }

  // Need to authenticate with Google
  const scopes = options.requestGmailScopes
    ? [...BASE_SCOPES, ...GMAIL_SCOPES]
    : BASE_SCOPES;
    
  const state = generateState();
  const googleRedirectUri = `${BASE_URL}/api/auth/callback/google`;

  // Build return URL for after OAuth callback
  const returnUrl = `/api/auth/token/chrome?redirect_uri=${encodeURIComponent(redirectUri)}`;

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: googleRedirectUri,
    response_type: "code",
    scope: scopes.join(" "),
    state: state,
    access_type: "offline",
  });

  // Only show account picker if user explicitly wants different account
  if (promptParam === "select_account") {
    params.set("prompt", "select_account");
  } else {
    // Force consent to ensure we get a refresh_token.
    params.set("prompt", "consent");
  }
  if (userEmail || loginHintParam) {
    params.set("login_hint", userEmail || loginHintParam!);
  }

  const authUrl = `${GOOGLE_AUTH_URL}?${params.toString()}`;

  const response = NextResponse.redirect(authUrl);

  // Chrome's launchWebAuthFlow uses an isolated browser context.
  // Cookies must use sameSite: "none" with secure: true to survive
  // the cross-origin redirect chain (our domain → Google → our domain).
  const cookieOptions = {
    path: "/",
    maxAge: OAUTH_COOKIE_MAX_AGE,
    sameSite: "none" as const,
    secure: true, // Required when sameSite is "none"
    httpOnly: true, // Prevent XSS access to OAuth state
  };

  // Store state and return URL for callback
  response.cookies.set(AUTH_COOKIES.OAUTH_STATE, state, cookieOptions);
  response.cookies.set(
    AUTH_COOKIES.OAUTH_RETURN_URL,
    encodeURIComponent(returnUrl),
    cookieOptions
  );

  return response;
}
