import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const skip = (page - 1) * limit;

  try {
    const where = {
      role: "USER" as any,
      ...(search 
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' as any } },
              { email: { contains: search, mode: 'insensitive' as any } },
              { mobile: { contains: search, mode: 'insensitive' as any } },
            ],
          }
        : {})
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        take: limit,
        skip,
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: { biodatas: true, orders: true }
          }
        }
      }),
      prisma.user.count({ where })
    ]);

    return NextResponse.json({
      users,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    });
  } catch (error) {
    console.error("Users API Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
