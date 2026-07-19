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

    // IF NO ID -> CREATE MODE (Increment usage)
    const dbTpl = await prisma.template.findUnique({ where: { templateId: template } });
    const isFreeTemplate = dbTpl ? dbTpl.isFree : (
      template === "basic_template" ||
      template === "basic-template" ||
      template === "simple_leafy" ||
      template === "simple-leafy"
    );

    let activePackage = null;

    if (!isFreeTemplate) {
      // Check for active package and biodata limit only for premium templates
      activePackage = await prisma.userPackage.findFirst({
        where: {
          userId: (session!.user as any).id,
          isActive: true,
          endDate: {
            gt: new Date(),
          },
        },
        orderBy: {
          startDate: "desc",
        },
      });

      if (!activePackage) {
        return NextResponse.json({ error: "No active plan found. Please upgrade to create biodatas." }, { status: 403 });
      }

      if (activePackage.biodataUsed >= activePackage.biodataLimit) {
        return NextResponse.json({ error: "Biodata creation limit reached. Please upgrade your plan." }, { status: 403 });
      }
    }

    const bioId = `bio_${Date.now()}`;

    // If it's a free template, just insert the record directly without package transaction.
    // If it's premium, run in transaction and increment biodataUsed count.
    if (isFreeTemplate) {
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
    } else {
      await prisma.$transaction([
        prisma.$executeRaw`
          INSERT INTO "Biodata" ("id", "userId", "language", "title", "data", "template", "createdAt", "updatedAt")
          VALUES (${bioId}, ${(session!.user as any).id}, ${language}, ${title}, ${data}, ${template}, ${new Date()}, ${new Date()})
        `.catch(async () => {
          return await prisma.$executeRaw`
            INSERT INTO biodata (id, userid, language, title, data, template, createdat, updatedat)
            VALUES (${bioId}, ${(session!.user as any).id}, ${language}, ${title}, ${data}, ${template}, ${new Date()}, ${new Date()})
          `;
        }),
        prisma.$executeRaw`
          UPDATE "UserPackage"
          SET "biodataUsed" = "biodataUsed" + 1
          WHERE "id" = ${activePackage!.id}
        `.catch(async () => {
          return await prisma.$executeRaw`
            UPDATE userpackage
            SET biodataused = biodataused + 1
            WHERE id = ${activePackage!.id}
          `;
        })
      ] as any);
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
