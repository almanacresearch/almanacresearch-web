import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIES, OAUTH_COOKIE_MAX_AGE } from "@/lib/auth/cookies";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const BASE_SCOPES = ["openid", "email", "profile"];
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.almanacresearch.com";

// Get the root domain for cookie sharing across subdomains
function getCookieDomain(): string | undefined {
  try {
    const url = new URL(BASE_URL);
    const hostname = url.hostname;

    // For localhost, cookies are shared automatically (no domain needed)
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return undefined;
    }

    // For *.local domains (local dev with subdomains)
    if (hostname.endsWith(".local")) {
      return `.${hostname}`;
    }

    // For production domains, return root domain (e.g., ".almanacresearch.com")
    const parts = hostname.split(".");
    if (parts.length >= 2) {
      return `.${parts.slice(-2).join(".")}`;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

function generateState(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

/**
 * GET /api/auth/google?returnUrl=/some/path
 * Webapp OAuth entry point. Basic scopes only.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const returnUrl = searchParams.get("returnUrl") || "/";
  const prompt = searchParams.get("prompt");

  const state = generateState();
  const redirectUri = `${BASE_URL}/api/auth/callback/google`;

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: BASE_SCOPES.join(" "),
    state: state,
    access_type: "offline",
  });
  if (prompt === "select_account") {
    params.set("prompt", "select_account");
  }

  const authUrl = `${GOOGLE_AUTH_URL}?${params.toString()}`;

  const response = NextResponse.redirect(authUrl);

  const isSecure = process.env.NODE_ENV === "production" || request.nextUrl.protocol === "https:";
  const cookieOptions = {
    path: "/",
    maxAge: OAUTH_COOKIE_MAX_AGE,
    sameSite: "lax" as const,
    secure: isSecure,
    domain: getCookieDomain(),
  };

  response.cookies.set(AUTH_COOKIES.OAUTH_STATE, state, cookieOptions);
  response.cookies.set(
    AUTH_COOKIES.OAUTH_RETURN_URL,
    encodeURIComponent(returnUrl),
    cookieOptions
  );

  return response;
}
