import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const template = await prisma.template.update({
      where: { id: id },
      data: {
        templateId: body.templateId,
        name: body.name,
        image: body.image,
        category: body.category,
        gender: body.gender || "BOTH",
        community: body.community || "All",
        isActive: body.isActive ?? true,
        isViewHomePage: body.isViewHomePage ?? true,
        isFree: body.isFree ?? false,
        order: body.order,
      }
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error("Template PUT Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await prisma.template.delete({
      where: { id: id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Template DELETE Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
