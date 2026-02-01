import { NextRequest } from "next/server";
import { handleChromeAuth } from "../shared";

/**
 * GET /api/auth/chrome/signin?redirect_uri=https://xxx.chromiumapp.org/callback
 *
 * Chrome extension initial sign-in with basic scopes only (email, profile).
 * Used before invite code verification.
 */
export async function GET(request: NextRequest) {
  return handleChromeAuth(request, {
    requestGmailScopes: false,
  });
}

