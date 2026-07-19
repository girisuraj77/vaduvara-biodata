import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { image, fileName } = await req.json();

    if (!image || !fileName) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Ensure it's WebP only
    const isWebpBase64 = image.startsWith("data:image/webp;base64,");
    const hasWebpExt = fileName.toLowerCase().endsWith(".webp");

    if (!isWebpBase64 && !hasWebpExt) {
      return NextResponse.json({ error: "Only WebP images are allowed" }, { status: 400 });
    }

    // Convert base64 to buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Create unique filename
    const sanitizedName = fileName.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.-]/g, "");
    const uniqueFileName = `${Date.now()}-${sanitizedName}`;
    const publicPath = join(process.cwd(), "public", "blogs", uniqueFileName);

    // Ensure directory exists
    const dir = dirname(publicPath);
    if (!fs.existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }

    await writeFile(publicPath, buffer);

    const relativePath = `/blogs/${uniqueFileName}`;
    return NextResponse.json({ url: relativePath });
  } catch (error) {
    console.error("Blog Image Upload Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
