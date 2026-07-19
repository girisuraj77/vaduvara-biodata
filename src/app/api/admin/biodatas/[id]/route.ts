import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await params;
    const biodata = await prisma.biodata.findUnique({
      where: { id },
    });

    if (!biodata) {
      return NextResponse.json({ error: "Biodata not found" }, { status: 404 });
    }

    return NextResponse.json({ biodata });
  } catch (error: any) {
    console.error("Admin Biodata GET Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
