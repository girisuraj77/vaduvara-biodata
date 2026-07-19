import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Biodata ID is required" }, { status: 400 });
    }

    const biodata = await prisma.biodata.findUnique({
      where: { id },
    });

    if (!biodata) {
      return NextResponse.json({ error: "Biodata not found" }, { status: 404 });
    }

    if (biodata.downloadCount >= 4) {
      return NextResponse.json({ error: "Download limit of 4 reached for this purchase." }, { status: 403 });
    }

    const updated = await prisma.biodata.update({
      where: { id },
      data: {
        downloadCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ success: true, downloadCount: updated.downloadCount });
  } catch (error) {
    console.error("Increment Download Error:", error);
    return NextResponse.json({ error: "Failed to increment download count" }, { status: 500 });
  }
}
