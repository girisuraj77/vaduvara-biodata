import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const pkg = await prisma.package.update({
      where: { id },
      data: {
        name: body.name,
        price: body.price,
        originalPrice: body.originalPrice,
        badge: body.badge,
        badgeColor: body.badgeColor,
        description: body.description,
        subtext: body.subtext,
        tag: body.tag,
        tagColor: body.tagColor,
        biodataLimit: body.biodataLimit,
        downloadLimit: body.downloadLimit,
        validityDays: body.validityDays,
        features: body.features,
        isActive: body.isActive,
      }
    });

    return NextResponse.json(pkg);
  } catch (error) {
    console.error("Package PUT Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.package.delete({
      where: { id }
    });

    return new NextResponse("Deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
