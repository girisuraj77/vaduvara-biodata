import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user and clear OTP fields
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetPasswordOTP: null,
        resetPasswordOTPExpires: null,
      },
    });

    return NextResponse.json({ message: "Password reset successful! You can now log in." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
