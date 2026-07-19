import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOTPEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid Email Address" }, { status: 404 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordOTP: otp,
        resetPasswordOTPExpires: expires,
      },
    });

    try {
      await sendOTPEmail(email, otp);
    } catch (emailError) {
      console.error("Failed to send OTP email:", emailError);
      return NextResponse.json({ error: "Failed to send email. Please try again later." }, { status: 500 });
    }

    return NextResponse.json({ message: "If an account exists, an OTP has been sent." });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
