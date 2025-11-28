import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
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
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { message: "Failed to save your message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message:
        "Thank you for sharing your thoughts! We read all your messages and appreciate your input.",
      status: "success",
    });
  } catch (error) {
    console.error("Error in /api/write-to-us:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
