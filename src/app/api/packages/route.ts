import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // We use separate try-catches for packages and comparison to be extra safe
    let packages: any[] = [];
    let comparison: any[] = [];

    try {
      packages = await prisma.package.findMany({
        where: { isActive: true },
        orderBy: { price: "asc" },
      });
    } catch (e) {
      console.error("Prisma Package Error:", e);
    }

    try {
      comparison = await prisma.comparisonRow.findMany({
        orderBy: { order: "asc" },
      });
    } catch (e) {
      console.error("Prisma Comparison Error:", e);
    }

    return NextResponse.json(
      { packages, comparison },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error("Global Package API Error:", error);
    return NextResponse.json({ packages: [], comparison: [] }); // Fallback to empty instead of error
  }
}
