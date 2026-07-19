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
  const status = searchParams.get("status") || "ALL";
  const search = searchParams.get("search") || "";
  const skip = (page - 1) * limit;

  try {
    const where: any = {};
    
    if (status !== "ALL") {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { razorpayOrderId: { contains: search, mode: 'insensitive' } },
        { razorpayPaymentId: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        take: limit,
        skip,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { name: true, email: true, mobile: true } }
        }
      }),
      prisma.order.count({ where })
    ]);

    return NextResponse.json({
      orders,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    });
  } catch (error) {
    console.error("Transactions API Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
