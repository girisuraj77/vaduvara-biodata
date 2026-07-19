import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(session?.user as any)?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.json();
    const { image, fileName } = formData;

    if (!image || !fileName) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Convert base64 to buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    // Create unique filename
    const uniqueFileName = `${Date.now()}-${fileName.replace(/\s+/g, "-")}`;
    const publicPath = join(process.cwd(), "public", "uploads", uniqueFileName);
    const relativePath = `/uploads/${uniqueFileName}`;

    await writeFile(publicPath, buffer);

    return NextResponse.json({ url: relativePath });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
