import { NextRequest, NextResponse } from "next/server";
import { deleteUserAccount } from "@/lib/db/users";
import { requireAuth } from "@/lib/auth/session";
import { clearAllAuthCookies } from "@/lib/auth/cookies";

export async function DELETE(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.success) return auth.response;
  const { session } = auth;

  try {
    const body = await request.json().catch(() => ({}));
    if (body.confirm !== true) {
      return NextResponse.json(
        { success: false, error: "Please confirm account deletion" },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, error: "Please confirm account deletion" },
      { status: 400 }
    );
  }

  const result = await deleteUserAccount(session.userId);

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 500 }
    );
  }

  const response = NextResponse.json({ success: true });
  clearAllAuthCookies(response);

  return response;
}
