import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import type { User } from "./types";
import { SESSION_MAX_AGE, AUTH_COOKIES } from "./cookies";

const SESSION_SECRET = process.env.SESSION_SECRET!;

if (!SESSION_SECRET) {
  throw new Error("Missing SESSION_SECRET environment variable");
}

// JWT requires at least 256 bits (32 characters) for HS256
if (SESSION_SECRET.length < 32) {
  throw new Error("SESSION_SECRET must be at least 32 characters long");
}

export interface SessionPayload extends User {
  iat: number; // issued at (added by jwt.sign)
  exp: number; // expiry (added by jwt.sign)
}

export function createSessionToken(
  user: User,
  maxAgeSeconds: number = SESSION_MAX_AGE
): string {
  return jwt.sign(
    {
      userId: user.userId,
      email: user.email,
      name: user.name,
      picture: user.picture,
      invited: user.invited,
    },
    SESSION_SECRET,
    {
      algorithm: "HS256",
      expiresIn: maxAgeSeconds,
      issuer: "almanacresearch",
      audience: "almanacresearch-web",
    }
  );
}

/**
 * Verifies and decodes a JWT session token
 */
export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const payload = jwt.verify(token, SESSION_SECRET, {
      algorithms: ["HS256"],
      issuer: "almanacresearch",
      audience: "almanacresearch-web",
    }) as unknown as SessionPayload;

    return payload;
  } catch {
    return null;
  }
}

export type AuthResult =
  | { success: true; session: SessionPayload }
  | { success: false; response: NextResponse };

export function requireAuth(request: NextRequest): AuthResult {
  const sessionToken = request.cookies.get(AUTH_COOKIES.SESSION)?.value;

  if (!sessionToken) {
    return {
      success: false,
      response: NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      ),
    };
  }

  const session = verifySessionToken(sessionToken);

  if (!session) {
    const response = NextResponse.json(
      { success: false, error: "Invalid session" },
      { status: 401 }
    );
    response.cookies.delete(AUTH_COOKIES.SESSION);
    return { success: false, response };
  }

  return { success: true, session };
}
