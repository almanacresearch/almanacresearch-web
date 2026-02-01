import { NextRequest } from "next/server";
import { handleChromeAuth } from "../shared";

/**
 * GET /api/auth/chrome/start?redirect_uri=https://xxx.chromiumapp.org/callback
 *
 * Chrome extension OAuth with Gmail/Calendar scopes.
 * Used after invite code verification to grant email access.
 */
export async function GET(request: NextRequest) {
  return handleChromeAuth(request, {
    requestGmailScopes: true,
  });
}
