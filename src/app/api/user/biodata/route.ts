import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!(session?.user as any)?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const biodatas = (await prisma.$queryRaw`
      SELECT * FROM "Biodata" 
      WHERE "userId" = ${(session!.user as any).id} 
      ORDER BY "updatedAt" DESC
    `.catch(async () => {
      return await prisma.$queryRaw`
        SELECT * FROM biodata 
        WHERE userid = ${(session!.user as any).id} 
        ORDER BY updatedat DESC
      `;
    })) as any[];

    return NextResponse.json({ biodatas });
  } catch (error) {
    console.error("Failed to fetch biodatas:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!(session?.user as any)?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, language, title, data, template } = body;

    // IF ID EXISTS -> UPDATE MODE (No increment)
    if (id) {
      try {
        await prisma.$executeRaw`
          UPDATE "Biodata"
          SET "language" = ${language},
              "title" = ${title},
              "data" = ${data},
              "template" = ${template},
              "updatedAt" = ${new Date()}
          WHERE "id" = ${id} AND "userId" = ${(session!.user as any).id}
        `;
      } catch (e) {
        // Fallback for lowercase table/columns
        await prisma.$executeRaw`
          UPDATE biodata
          SET language = ${language},
              title = ${title},
              data = ${data},
              template = ${template},
              updatedat = ${new Date()}
          WHERE id = ${id} AND userid = ${(session!.user as any).id}
        `;
      }

      // Fetch the updated record
      const updatedResults = (await prisma.$queryRaw`
        SELECT * FROM "Biodata" WHERE "id" = ${id}
      `.catch(async () => {
        return await prisma.$queryRaw`SELECT * FROM biodata WHERE id = ${id}`;
      })) as any[];

      return NextResponse.json({ biodata: updatedResults[0], status: "updated" });
    }

    const bioId = `bio_${Date.now()}`;

    try {
      await prisma.$executeRaw`
        INSERT INTO "Biodata" ("id", "userId", "language", "title", "data", "template", "createdAt", "updatedAt")
        VALUES (${bioId}, ${(session!.user as any).id}, ${language}, ${title}, ${data}, ${template}, ${new Date()}, ${new Date()})
      `;
    } catch (e) {
      await prisma.$executeRaw`
        INSERT INTO biodata (id, userid, language, title, data, template, createdat, updatedat)
        VALUES (${bioId}, ${(session!.user as any).id}, ${language}, ${title}, ${data}, ${template}, ${new Date()}, ${new Date()})
      `;
    }

    const createdBioResults = (await prisma.$queryRaw`
      SELECT * FROM "Biodata" WHERE "id" = ${bioId}
    `.catch(async () => {
      return await prisma.$queryRaw`SELECT * FROM biodata WHERE id = ${bioId}`;
    })) as any[];

    return NextResponse.json({ biodata: createdBioResults[0], status: "created" });
  } catch (error) {
    console.error("Failed to save biodata:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
