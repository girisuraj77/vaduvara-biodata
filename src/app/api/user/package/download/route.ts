import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(session?.user as any)?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the active package
    const activePackage = await prisma.userPackage.findFirst({
      where: {
        userId: (session!.user as any).id,
        isActive: true,
        endDate: {
          gt: new Date(),
        },
      },
      orderBy: {
        startDate: "desc",
      },
    });

    if (!activePackage) {
      return NextResponse.json({ error: "No active plan found. Please upgrade to download." }, { status: 403 });
    }

    // Check if limits reached
    if (activePackage.downloadsUsed >= activePackage.downloadLimit) {
      return NextResponse.json({ error: "Download limit reached. Please upgrade your plan." }, { status: 403 });
    }

    // Increment usage
    await prisma.userPackage.update({
      where: { id: activePackage.id },
      data: {
        downloadsUsed: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ success: true, remaining: activePackage.downloadLimit - (activePackage.downloadsUsed + 1) });
  } catch (error) {
    console.error("Download tracking error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
