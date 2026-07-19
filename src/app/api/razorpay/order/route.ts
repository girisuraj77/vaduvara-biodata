import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { format, email, mobile, biodata } = await req.json();

    if (!format || !email || !mobile || !biodata) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Setup flat rate ₹49 checkout details (no Prisma Package query needed)
    const pkg = {
      id: format === "word" ? "word_download" : "image_download",
      price: 49.0
    };

    // 2. Create or update the Biodata record in draft status
    const bioId = biodata.id || `bio_${Date.now()}`;
    await prisma.biodata.upsert({
      where: { id: bioId },
      update: {
        email: email.trim(),
        mobile: mobile.trim(),
        title: biodata.title,
        data: biodata.data,
        template: biodata.template,
        language: biodata.language,
        isDraft: true,
      },
      create: {
        id: bioId,
        email: email.trim(),
        mobile: mobile.trim(),
        title: biodata.title,
        data: biodata.data,
        template: biodata.template,
        language: biodata.language,
        isDraft: true,
      },
    });

    // 3. Create Razorpay Order
    const options = {
      amount: Math.round(pkg.price * 100), // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // 4. Create PENDING Order in Database
    const dbOrder = await prisma.order.create({
      data: {
        email: email.trim(),
        mobile: mobile.trim(),
        packageId: pkg.id,
        amount: pkg.price,
        status: "PENDING",
        razorpayOrderId: order.id,
      },
    });

    // 6. Link the Biodata to the Order
    await prisma.biodata.update({
      where: { id: bioId },
      data: {
        orderId: dbOrder.id,
      },
    });

    // Return Razorpay order details and our generated Biodata ID
    return NextResponse.json({
      ...order,
      biodataId: bioId,
    });
  } catch (error: any) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 500 });
  }
}
