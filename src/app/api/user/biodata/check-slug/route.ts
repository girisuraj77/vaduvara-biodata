import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!(session?.user as any)?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const biodataId = searchParams.get("biodataId");

    if (!slug) {
      return NextResponse.json({ available: true });
    }

    let existing: any[] = [];

    // Check if slug is unique (excluding current biodata)
    try {
      existing = (await prisma.$queryRaw`
        SELECT id FROM "Biodata" 
        WHERE "shareSlug" = ${slug.toLowerCase()} AND "id" != ${biodataId} 
        LIMIT 1
      `) as any[];
    } catch (e) {
      // Fallback for different table casing
      existing = (await prisma.$queryRaw`
        SELECT id FROM biodata 
        WHERE shareslug = ${slug.toLowerCase()} AND id != ${biodataId} 
        LIMIT 1
      `) as any[];
    }

    return NextResponse.json({
      available: existing.length === 0,
      message: existing.length === 0 ? "Short link is available" : "This short link is already taken"
    });
  } catch (error) {
    console.error("Failed to check slug availability:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
