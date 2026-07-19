import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { emailOrMobile, paymentIdOrBioId } = await req.json();

    if (!emailOrMobile || !paymentIdOrBioId) {
      return NextResponse.json({ error: "Contact info and ID are required" }, { status: 400 });
    }

    // 1. Query the paid biodata directly using the stored email/mobile and ID
    const biodata = await prisma.biodata.findFirst({
      where: {
        isDraft: false,
        OR: [
          { email: emailOrMobile.trim() },
          { mobile: emailOrMobile.trim() },
        ],
        AND: {
          OR: [
            { id: paymentIdOrBioId.trim() },
            { orderId: paymentIdOrBioId.trim() },
            { order: { razorpayPaymentId: paymentIdOrBioId.trim() } },
            { order: { razorpayOrderId: paymentIdOrBioId.trim() } },
          ],
        }
      },
      include: {
        order: true,
      },
    });

    if (!biodata) {
      return NextResponse.json({ error: "No completed purchase found matching these details." }, { status: 404 });
    }

    return NextResponse.json({ biodata });
  } catch (error: any) {
    console.error("Download API Error:", error);
    return NextResponse.json({ error: "Failed to download biodata" }, { status: 500 });
  }
}
