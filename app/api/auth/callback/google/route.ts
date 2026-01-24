import { NextRequest, NextResponse } from "next/server";
import { googleProvider } from "@/lib/auth/providers/google";
import { findOrCreateUser } from "@/lib/db/users";
import { createSessionToken } from "@/lib/auth/session";
import { colors } from "@/lib/constants/theme";
import {
  clearOAuthCookies,
  setSessionCookie,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setAuthProviderCookie,
  AUTH_COOKIES,
} from "@/lib/auth/cookies";
import { dbUserToPublic } from "@/lib/auth/types";
import { sendWelcomeEmail } from "@/lib/email/welcome";

function createErrorRedirect(request: NextRequest, error: string) {
  const url = new URL("/", request.nextUrl.origin);
  url.searchParams.set("error", error);
  return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return createErrorRedirect(request, "oauth_error");
  }

  if (!code) {
    return createErrorRedirect(request, "no_code");
  }

  // Verify state for CSRF protection
  const storedState = request.cookies.get(AUTH_COOKIES.OAUTH_STATE)?.value;
  if (!state || !storedState || state !== storedState) {
    return createErrorRedirect(request, "state_mismatch");
  }

  // Get return URL (stored before redirect to Google)
  const returnUrl = request.cookies.get(AUTH_COOKIES.OAUTH_RETURN_URL)?.value;
  const redirectPath = returnUrl ? decodeURIComponent(returnUrl) : "/";

  const redirectUri = `${request.nextUrl.origin}/api/auth/callback/google`;

  try {
    const tokens = await googleProvider.exchangeCodeForTokens(
      code,
      redirectUri
    );

    const userInfo = await googleProvider.verifyAndGetUserInfo(tokens);

    const { user: dbUser, isNewUser } = await findOrCreateUser(
      {
        provider: "google",
        provider_user_id: userInfo.id,
        email: userInfo.email,
      },
      {
        name: userInfo.name,
        picture: userInfo.picture,
      },
      {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token || "",
        scopes: tokens.scope?.split(" ") || [],
        expiry: tokens.expires_in
          ? new Date(Date.now() + tokens.expires_in * 1000)
          : undefined,
      }
    );

    // Send welcome email for new users
    if (isNewUser && userInfo.email) {
      sendWelcomeEmail(userInfo.email, userInfo.name);
    }

    // Create response that closes popup and notifies parent window
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Sign in successful</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: linear-gradient(135deg, ${colors.background.offWhite} 0%, ${colors.background.cream} 100%);
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              text-align: center;
              padding: 40px;
            }
            .logo {
              width: 80px;
              height: 80px;
              margin: 0 auto 24px;
              animation: scaleIn 0.4s ease-out;
            }
            .logo img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
            h1 {
              color: ${colors.stone[800]};
              font-size: 24px;
              font-weight: 500;
              margin-bottom: 8px;
              animation: fadeIn 0.4s ease-out 0.2s both;
            }
            p {
              color: ${colors.stone[700]};
              font-size: 14px;
              animation: fadeIn 0.4s ease-out 0.3s both;
            }
            @keyframes scaleIn {
              from { transform: scale(0.8); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(8px); }
              to { opacity: 1; transform: translateY(0); }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <img src="/favicon/favicon.svg" alt="AlmanacAI" />
            </div>
            <h1>Welcome!</h1>
            <p>Signing you in...</p>
          </div>
          <script>
            // Notify parent window of successful auth
            if (window.opener) {
              try {
                window.opener.postMessage({ type: "AUTH_SUCCESS" }, "*");
              } catch (e) {}
              setTimeout(function() {
                window.close();
              }, 1200);
            } else {
              // Mobile: redirected in same tab, go to return URL
              setTimeout(function() {
                window.location.href = "${redirectPath}";
              }, 1200);
            }
          </script>
        </body>
      </html>
    `;

    const response = new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });

    clearOAuthCookies(response);

    const sessionToken = createSessionToken(dbUserToPublic(dbUser));
    setSessionCookie(response, sessionToken);
    setAccessTokenCookie(response, tokens.access_token, tokens.expires_in);

    if (tokens.refresh_token) {
      setRefreshTokenCookie(response, tokens.refresh_token);
    }

    setAuthProviderCookie(response, "google");

    return response;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "callback_error";
    return createErrorRedirect(request, errorMessage);
  }
}
