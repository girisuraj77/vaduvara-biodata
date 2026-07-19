import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { id, language, title, data, template } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Biodata ID is required" }, { status: 400 });
    }

    const biodata = await prisma.biodata.findUnique({
      where: { id },
    });

    if (!biodata) {
      return NextResponse.json({ error: "Biodata not found" }, { status: 404 });
    }

    if (biodata.isDraft) {
      return NextResponse.json({ error: "Unauthorized update. Payment not completed." }, { status: 403 });
    }

    if (biodata.downloadCount >= 4) {
      return NextResponse.json({ error: "Download limit of 4 reached for this purchase." }, { status: 403 });
    }

    const updated = await prisma.biodata.update({
      where: { id },
      data: {
        language,
        title,
        data,
        template,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ biodata: updated, success: true });
  } catch (error) {
    console.error("Update Paid Biodata Error:", error);
    return NextResponse.json({ error: "Failed to update biodata" }, { status: 500 });
  }
}
