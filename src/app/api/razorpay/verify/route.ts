import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body_data = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email: client_email,
      mobile: client_mobile,
      biodataId,
    } = body_data;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !client_email) {
      return NextResponse.json({ error: "Missing verification parameters" }, { status: 400 });
    }

    // 1. SECURITY: Signature Verification (HMAC SHA256)
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("CRITICAL: Payment Signature Mismatch detected!");
      return NextResponse.json({ error: "Tampering detected. Verification failed." }, { status: 400 });
    }

    // 2. DATABASE TRANSACTION: Atomic updates to prevent inconsistencies
    return await prisma.$transaction(async (tx) => {
      // Find the order
      const order = await tx.order.findUnique({
        where: { razorpayOrderId: razorpay_order_id },
      });

      if (!order) {
        throw new Error("Order not found");
      }

      if (order.status === "SUCCESS") {
        return NextResponse.json({ success: true, message: "Already processed" });
      }

      // Update Order Status
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: "SUCCESS",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          email: client_email.trim(),
          mobile: client_mobile ? client_mobile.trim() : null,
        },
      });

      // Update Biodata status: mark as not draft (isDraft: false) and increment downloadCount
      const targetBioId = biodataId || order.id; // Fallback to order id if biodataId is missing
      const biodata = await tx.biodata.findFirst({
        where: {
          OR: [
            { id: targetBioId },
            { orderId: order.id },
          ],
        },
      });

      if (biodata) {
        await tx.biodata.update({
          where: { id: biodata.id },
          data: {
            isDraft: false,
            downloadCount: 1, // Set first download count
            email: client_email.trim(),
            mobile: client_mobile ? client_mobile.trim() : null,
          },
        });
      }

      return NextResponse.json({
        success: true,
        message: "Payment verified. Biodata activated successfully.",
      });
    });
  } catch (error: any) {
    console.error("SECURE_VERIFY_ERROR:", error);
    return NextResponse.json({ error: error.message || "Critical error during verification" }, { status: 500 });
  }
}
