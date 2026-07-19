import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(session?.user as any)?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: (session!.user as any).id },
      select: {
        name: true,
        email: true,
        mobile: true,
        image: true,
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(session?.user as any)?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, mobile, image } = body;

    const updatedUser = await prisma.user.update({
      where: { id: (session!.user as any).id },
      data: {
        name,
        mobile,
        image,
      },
    });

    return NextResponse.json({ 
      success: true, 
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        image: updatedUser.image,
      }
    });
  } catch (error: any) {
    console.error("Profile Update Error:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Mobile number already in use" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
