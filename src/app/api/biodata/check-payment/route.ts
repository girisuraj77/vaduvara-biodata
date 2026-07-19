import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const biodataId = searchParams.get("biodataId");

    if (!biodataId) {
      return NextResponse.json({ error: "Biodata ID is required" }, { status: 400 });
    }

    const biodata = await prisma.biodata.findUnique({
      where: { id: biodataId },
    });

    if (!biodata || biodata.isDraft) {
      return NextResponse.json({ paid: false });
    }

    // Determine format from order/package
    let format = "pdf";
    if (biodata.orderId) {
      const order = await prisma.order.findUnique({
        where: { id: biodata.orderId },
      });
      if (order?.packageId === "word_download") {
        format = "word";
      }
    }

    const remaining = 4 - biodata.downloadCount;

    return NextResponse.json({
      paid: true,
      format,
      remainingDownloads: Math.max(0, remaining),
    });
  } catch (error) {
    console.error("Check Payment Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
