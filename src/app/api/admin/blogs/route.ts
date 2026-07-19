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
  const skip = (page - 1) * limit;

  try {
    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        take: limit,
        skip,
        orderBy: { createdAt: "desc" },
      }),
      prisma.blog.count()
    ]);

    return NextResponse.json({
      blogs,
      pagination: { total, pages: Math.ceil(total / limit), page, limit }
    });
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
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt,
        featuredImage: body.featuredImage,
        isPublished: body.isPublished,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        keywords: body.keywords,
      }
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Blog POST Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
