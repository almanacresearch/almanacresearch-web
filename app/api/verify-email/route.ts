import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return new NextResponse("Invalid token", { status: 400 });
  }

  // Find the user with that verification token
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("verify_token", token)
    .single();

  if (error || !data) {
    return new NextResponse("Invalid or expired token", { status: 400 });
  }

  await supabase
    .from("users")
    .update({ verified: true, verify_token: null })
    .eq("email", data.email);

  return new NextResponse(
    `<html><body style="background:#121212;color:#f5f5f5;text-align:center;padding-top:50px;">
      <h2>Email verified successfully!</h2>
      <p>You can now close this tab.</p>
    </body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
