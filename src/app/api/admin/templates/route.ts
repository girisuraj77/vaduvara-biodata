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
    const templates = await prisma.template.findMany({
      select: {
        id: true,
        templateId: true,
        name: true,
        image: true,
        category: true,
        gender: true,
        community: true,
        isActive: true,
        isViewHomePage: true,
        isFree: true,
        order: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(templates);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const template = await prisma.template.create({
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
    console.error("Template POST Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
