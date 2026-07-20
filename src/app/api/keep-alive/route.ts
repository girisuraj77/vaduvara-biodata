import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // Verify optional Authorization secret to restrict endpoint access
    const authHeader = req.headers.get("authorization");
    const secret = process.env.CRON_SECRET;
    
    if (secret && authHeader !== `Bearer ${secret}`) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Ping the Supabase database via Prisma to keep it active
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({ 
      success: true, 
      message: "Supabase database pinged successfully!" 
    });
  } catch (error: any) {
    console.error("Database keep-alive ping failed:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Failed to keep database alive" 
    }, { status: 500 });
  }
}