import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import {
  writeToUsRateLimiter,
  getClientIp,
  checkRateLimit,
} from "@/lib/ratelimit";
import { getServerUser } from "@/lib/auth/server";

export async function POST(req: NextRequest) {
  try {
    // rate-limiting
    const ip = getClientIp(req);
    const rateLimit = await checkRateLimit(writeToUsRateLimiter, ip);
    if (!rateLimit.success) {
      return rateLimit.response;
    }

    const currentUser = await getServerUser();

    const { name, email, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 254 || message.length > 10000) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Insert ideas form submission into database
    const { error } = await supabase.from("ideas").insert([
      {
        name,
        email,
        message,
        user_id: currentUser?.userId || null,
      },
    ]);

    if (error) {
      return NextResponse.json(
        { message: "Failed to send your message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message:
        "Thank you for sharing your thoughts! We read all your messages and appreciate your input.",
      status: "success",
    });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
