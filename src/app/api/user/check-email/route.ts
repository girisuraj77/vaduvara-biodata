import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }, // We only need to know if it exists
    });

    return NextResponse.json({ exists: !!user });
  } catch (error) {
    console.error("Error checking email:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
