import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUserById, hasRequiredChromeScopes } from "@/lib/db/users";

const EXTENSION_TOKEN_SECRET = process.env.EXTENSION_TOKEN_SECRET;
const EXTENSION_TOKEN_EXPIRY = 60 * 60 * 24 * 45; // 45 days in seconds

function createExtensionToken(payload: object): string {
  if (!EXTENSION_TOKEN_SECRET) {
    throw new Error("Missing EXTENSION_TOKEN_SECRET");
  }
  return jwt.sign(payload, EXTENSION_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: EXTENSION_TOKEN_EXPIRY,
  });
}

/**
 * Issues a token for Chrome extension
 * GET /api/auth/token/chrome?redirect_uri=https://xxx.chromiumapp.org/callback&user_id=xxx
 * 
 * Called by OAuth callback with user_id. Issues JWT and redirects to chromiumapp.org
 * which launchWebAuthFlow captures and returns to the extension.
 */
export async function GET(request: NextRequest) {
  if (!EXTENSION_TOKEN_SECRET) {
    return NextResponse.json(
      { error: "Extension not configured" },
      { status: 500 }
    );
  }

  const redirectUri = request.nextUrl.searchParams.get("redirect_uri");
  const userId = request.nextUrl.searchParams.get("user_id");
  
  // Validate redirect_uri
  if (!redirectUri || !redirectUri.includes(".chromiumapp.org")) {
    return NextResponse.json(
      { error: "Invalid redirect_uri" },
      { status: 400 }
    );
  }

  if (!userId) {
    const errorUrl = `${redirectUri}?error=unauthorized`;
    return NextResponse.redirect(errorUrl);
  }

  const dbUser = await getUserById(userId);
  if (!dbUser) {
    const errorUrl = `${redirectUri}?error=user_not_found`;
    return NextResponse.redirect(errorUrl);
  }

  // Check if user has Gmail/Calendar scopes (for dashboard access after invite)
  const hasScopes = await hasRequiredChromeScopes(userId);

  const issuer =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.almanacresearch.com";

  // Extract extension ID from redirect_uri for audience claim
  const extensionIdMatch = redirectUri.match(/https:\/\/([^.]+)\.chromiumapp\.org/);
  const extensionId = extensionIdMatch ? extensionIdMatch[1] : "unknown";
  const audience = `chrome-extension://${extensionId}`;

  // Include hasScopes in token - extension will check this after invite verification
  const token = createExtensionToken({
    userId: dbUser.id,
    email: dbUser.primary_email,
    name: dbUser.name,
    picture: dbUser.picture,
    invited: dbUser.invited,
    hasScopes: hasScopes,
    iss: issuer,
    aud: audience,
  });

  // Redirect to chromiumapp.org with token - launchWebAuthFlow will capture this
  // URL-encode the token to handle special characters like + in base64
  const callbackUrl = `${redirectUri}?token=${encodeURIComponent(token)}`;

  return NextResponse.redirect(callbackUrl);
}

/**
 * Refresh extension token
 * POST /api/auth/token/chrome
 * Authorization: Bearer <existing-extension-token>
 *
 * Returns a fresh JWT with current user data from DB.
 * Used by the extension to sync local state
 */
export async function POST(request: NextRequest) {
  if (!EXTENSION_TOKEN_SECRET) {
    return NextResponse.json(
      { error: "Extension not configured" },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing authorization" },
      { status: 401 }
    );
  }

  const existingToken = authHeader.slice(7);

  let payload: { userId?: string };
  try {
    payload = jwt.verify(existingToken, EXTENSION_TOKEN_SECRET, {
      algorithms: ["HS256"],
    }) as { userId?: string };
  } catch {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }

  if (!payload.userId) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 401 }
    );
  }

  const dbUser = await getUserById(payload.userId);
  if (!dbUser) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  const hasScopes = await hasRequiredChromeScopes(payload.userId);

  const issuer =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.almanacresearch.com";

  const token = createExtensionToken({
    userId: dbUser.id,
    email: dbUser.primary_email,
    name: dbUser.name,
    picture: dbUser.picture,
    invited: dbUser.invited,
    hasScopes: hasScopes,
    iss: issuer,
  });

  return NextResponse.json({ token });
}
