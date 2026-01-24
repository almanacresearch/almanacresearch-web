import { NextResponse } from "next/server";
import { clearAllAuthCookies } from "@/lib/auth/cookies";

export async function POST() {
  const response = NextResponse.json({ success: true });
  clearAllAuthCookies(response);
  return response;
}
