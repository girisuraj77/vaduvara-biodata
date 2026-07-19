import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const [
      userCount,
      biodataCount,
      orderCount,
      totalRevenue,
      recentOrders,
      recentUsers
    ] = await Promise.all([
      prisma.user.count(),
      prisma.biodata.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        where: { status: "SUCCESS" },
        _sum: { amount: true }
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, email: true } } }
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, email: true, createdAt: true }
      })
    ]);

    return NextResponse.json({
      stats: {
        users: userCount,
        biodatas: biodataCount,
        orders: orderCount,
        revenue: totalRevenue._sum.amount || 0
      },
      recentOrders,
      recentUsers
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
