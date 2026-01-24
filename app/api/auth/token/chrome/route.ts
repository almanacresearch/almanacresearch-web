import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { verifySessionToken } from "@/lib/auth/session";
import { AUTH_COOKIES } from "@/lib/auth/cookies";

const EXTENSION_ID = process.env.CHROME_EXTENSION_ID;
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
 * GET /api/auth/token/chrome
 */
export async function GET() {
  if (!EXTENSION_ID || !EXTENSION_TOKEN_SECRET) {
    return NextResponse.json(
      { error: "Extension not configured" },
      { status: 500 }
    );
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_COOKIES.SESSION)?.value;

  if (!sessionToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = verifySessionToken(sessionToken);
  if (!session) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  const token = createExtensionToken({
    userId: session.userId,
    email: session.email,
    name: session.name,
    picture: session.picture,
    invited: session.invited,
    aud: `chrome-extension://${EXTENSION_ID}`,
  });

  const callbackUrl = `chrome-extension://${EXTENSION_ID}/callback.html#token=${token}`;

  return NextResponse.redirect(callbackUrl);
}
