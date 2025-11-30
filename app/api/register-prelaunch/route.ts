import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { supabase } from "@/lib/supabaseClient";
import crypto from "crypto";
import { NextResponse } from "next/server";

dotenv.config({ path: ".env.local" });

function emailHTML(verifyLink: string) {
  return `
  <div style="margin:0;padding:0;background-color:#0c0c0c;color:#eaeaea;font-family:'Inter',Arial,sans-serif;">
    <div style="max-width:600px;margin:auto;background-color:#141414;border-radius:16px;padding:40px 30px;border:1px solid #2a2a2a;">

      <!-- Company Name -->
      <div style="text-align:center;margin-bottom:30px;">
        <h1 style="color:#c9a45c;font-size:12px;letter-spacing:0.6px;margin:0;">ALMANAC RESEARCH</h1>
      </div>

      <!-- Heading -->
      <div style="text-align:center;">
        <h2 style="color:#f2f2f2;font-size:20px;margin-bottom:16px;">
          Confirm your email to join the AlmanacAI Waitlist
        </h2>
        <p style="color:#bdbdbd;font-size:15px;line-height:1.6;margin-bottom:36px;">
          You’re one step away to secure premium access to <b>AlmanacAI</b>.
          Please confirm your email to complete your registration.
        </p>

        <!-- Verify Button -->
        <a href="${verifyLink}"
          style="display:inline-block;background:linear-gradient(90deg,#d7a154,#8b5a2b);
          color:#fffbe6;text-decoration:none;padding:14px 36px;border-radius:8px;
          font-weight:500;letter-spacing:0.3px;transition:opacity 0.3s ease;">
          Verify My Email
        </a>

        <!-- Backup Link -->
        <p style="color:#9e9e9e;font-size:13px;margin-top:40px;margin-bottom:6px;">
          If the button above doesn’t work, copy and paste this link into your browser:
        </p>
        <p style="color:#c9a45c;font-size:13px;word-break:break-all;margin:0;">
          <a href="${verifyLink}" style="color:#c9a45c;text-decoration:none;">${verifyLink}</a>
        </p>
      </div>

      <!-- Footer -->
      <hr style="border:none;border-top:1px solid #2a2a2a;margin:40px 0;">
      <p style="font-size:12px;color:#777;text-align:center;line-height:1.6;margin:0;">
        © ${new Date().getFullYear()} Almanac Research. All rights reserved.<br>
        You’re receiving this email because you registered for AlmanacAI.
      </p>
    </div>
  </div>
`;
}

export async function POST(req: Request) {
  try {
    // parse request body
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email required" }, { status: 400 });
    }

    // Check if email already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

    // Case 1: Email already verified
    if (existingUser && existingUser.verified) {
      return NextResponse.json({
        status: 200,
        message: "Email already verified. Thanks for registering!",
      });
    }

    // Configure Mail transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const token = crypto.randomBytes(32).toString("hex");
    const verifyLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`;

    // Case 2: Resend verification if unverified email exists
    if (existingUser && !existingUser.verified) {
      const { error } = await supabase
        .from("users")
        .update({ verify_token: token })
        .eq("email", email);

      if (error) {
        console.error(error);
        return NextResponse.json(
          { message: "Database error" },
          { status: 500 }
        );
      }

      // Respond immediately, send mail in background
      setTimeout(() => {
        transporter.sendMail({
          from: `"Almanac Research" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Confirm your email to join AlmanacAI waitlist",
          html: emailHTML(verifyLink),
        });
      }, 0);
      // TODO: Use a real job queue for production

      return NextResponse.json({
        status: "resent",
        message: "Verification email resent. Please check your inbox.",
      });
    }

    // Case 3: New user
    const { error } = await supabase
      .from("users")
      .insert([{ email, verify_token: token }]);

    if (error) {
      console.error(error);
      return NextResponse.json({ message: "Database error" }, { status: 500 });
    }

    // Respond immediately, send mail in background
    setTimeout(() => {
      transporter.sendMail({
        from: `"Almanac Research" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Confirm your email to join AlmanacAI waitlist",
        html: emailHTML(verifyLink),
      });
    }, 0);
    // TODO: Use a real job queue for production

    return NextResponse.json({
      message:
        "Thank you for registering. Please check your inbox and verify the mail to secure your access to AlmanacAI.",
    });
  } catch (error) {
    console.error("Error in /api/register-prelaunch:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
