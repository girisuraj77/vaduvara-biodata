import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!(session?.user as any)?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all user packages sorted by date descending
    const allUserPackages = await prisma.userPackage.findMany({
      where: {
        userId: (session!.user as any).id,
      },
      include: {
        package: true,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    // Determine active package
    // We check the stored snapshot limits instead of the global package limits
    const activeUserPackage = allUserPackages.find(up =>
      up.isActive &&
      new Date(up.endDate) > new Date() &&
      up.downloadsUsed < up.downloadLimit
    );

    // Map to a cleaner format
    const formattedPackages = allUserPackages.map(up => ({
      id: up.id,
      name: up.package.name,
      price: up.package.price,
      biodataLimit: up.biodataLimit, // Using snapshot
      downloadLimit: up.downloadLimit, // Using snapshot
      biodataUsed: up.biodataUsed,
      downloadsUsed: up.downloadsUsed,
      startDate: up.startDate,
      endDate: up.endDate,
      isActive: up.isActive,
    }));

    return NextResponse.json({
      activePackage: formattedPackages.find(p => p.id === activeUserPackage?.id) || null,
      allPackages: formattedPackages,
    });
  } catch (error) {
    console.error("Failed to fetch user package", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
