import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        await prisma.$queryRaw`SELECT 1`;
        return NextResponse.json({
            success: true,
            timestamp: new Date().toISOString(),
            message: "Database is alive",
        });
    } catch (error) {
        console.error("KEEP_ALIVE_ERROR:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Database check failed",
            },
            {
                status: 500,
            }
        );
    }
}