import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const homepageOnly = searchParams.get("homepage") === "true";

    const whereClause = homepageOnly
      ? `WHERE "isActive" = true AND "isViewHomePage" = true`
      : `WHERE "isActive" = true`;

    const templates = await prisma.$queryRawUnsafe(`
      SELECT id, "templateId", name, image, category, gender, community, "isActive", "isViewHomePage", "order", "isFree"
      FROM "Template"
      ${whereClause}
      ORDER BY "order" ASC
    `);
    return NextResponse.json(templates, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error: any) {
    console.error("Templates API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
