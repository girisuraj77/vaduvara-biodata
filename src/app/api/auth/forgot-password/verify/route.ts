import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.resetPasswordOTP || !user.resetPasswordOTPExpires) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Check if OTP matches and is not expired
    if (user.resetPasswordOTP !== otp) {
      return NextResponse.json({ error: "Invalid OTP code" }, { status: 400 });
    }

    if (new Date() > user.resetPasswordOTPExpires) {
      return NextResponse.json({ error: "OTP code has expired" }, { status: 400 });
    }

    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
