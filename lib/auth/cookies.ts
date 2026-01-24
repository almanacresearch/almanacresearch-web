import { NextResponse } from "next/server";

// Cookie names
export const AUTH_COOKIES = {
  SESSION: "session",
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  AUTH_PROVIDER: "auth_provider",
  OAUTH_STATE: "oauth_state",
  OAUTH_RETURN_URL: "oauth_return_url",
} as const;

// Cookie TTLs
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
export const SESSION_RENEWAL_THRESHOLD = 60 * 60 * 24 * 7; // Renew if less than 7 days left
export const ACCESS_TOKEN_DEFAULT_MAX_AGE = 3600; // 1 hour
export const ACCESS_TOKEN_REFRESH_THRESHOLD = 5 * 60; // Refresh 5 minutes before expiry
export const OAUTH_COOKIE_MAX_AGE = 600; // 10 minutes

// Get the root domain for cookie sharing across subdomains
function getCookieDomain(): string | undefined {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) return undefined;

  try {
    const url = new URL(baseUrl);
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

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  domain: getCookieDomain(),
};

export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(AUTH_COOKIES.SESSION, token, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: SESSION_MAX_AGE,
  });
}

export function setAccessTokenCookie(
  response: NextResponse,
  token: string,
  expiresIn?: number
): void {
  response.cookies.set(AUTH_COOKIES.ACCESS_TOKEN, token, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: expiresIn || ACCESS_TOKEN_DEFAULT_MAX_AGE,
  });
}

export function setRefreshTokenCookie(
  response: NextResponse,
  token: string
): void {
  response.cookies.set(AUTH_COOKIES.REFRESH_TOKEN, token, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: SESSION_MAX_AGE,
  });
}

export function setAuthProviderCookie(
  response: NextResponse,
  provider: string
): void {
  response.cookies.set(AUTH_COOKIES.AUTH_PROVIDER, provider, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: SESSION_MAX_AGE,
  });
}

export function clearAllAuthCookies(response: NextResponse): void {
  const cookiesToClear = [
    AUTH_COOKIES.SESSION,
    AUTH_COOKIES.ACCESS_TOKEN,
    AUTH_COOKIES.REFRESH_TOKEN,
    AUTH_COOKIES.AUTH_PROVIDER,
  ];

  cookiesToClear.forEach((name) => {
    response.cookies.set(name, "", {
      ...AUTH_COOKIE_OPTIONS,
      maxAge: 0,
    });
  });
}

export function clearOAuthCookies(response: NextResponse): void {
  response.cookies.delete(AUTH_COOKIES.OAUTH_STATE);
  response.cookies.delete(AUTH_COOKIES.OAUTH_RETURN_URL);
}
