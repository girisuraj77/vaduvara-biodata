"use client";

import { motion } from "framer-motion";
import { Truck } from "lucide-react";

export default function ShippingPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="pt-24 pb-12 bg-[#430917]/5 border-b border-primary/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
            <Truck size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 mb-4 tracking-tight">Shipping & Delivery</h1>
          <p className="text-zinc-500 font-medium tracking-widest uppercase text-xs">Digital Delivery Information</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="prose prose-zinc prose-lg max-w-none text-center">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-zinc-900 mb-6 italic text-primary">Instant Digital Delivery</h2>
              <p className="text-lg text-zinc-600 leading-relaxed font-medium">
                At Vadhuvar Biodata, all our products are digital. We do not ship physical products to your address.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100">
                <h4 className="text-xl font-bold text-zinc-900 mb-4">How it Works</h4>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  Once your payment is successful, your premium template or package is instantly unlocked. You can download the high-resolution PDF directly from the builder or your dashboard.
                </p>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100">
                <h4 className="text-xl font-bold text-zinc-900 mb-4">Order Confirmation</h4>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  An order confirmation with your purchase details will be sent to your registered email address immediately after a successful transaction. Please note that no physical bill or package will be shipped.
                </p>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100">
                <h4 className="text-xl font-bold text-zinc-900 mb-4">No Waiting Time</h4>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  Since there is no physical shipping involved, you don't have to wait for days. Your biodata is ready for use immediately after purchase.
                </p>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100">
                <h4 className="text-xl font-bold text-zinc-900 mb-4">Support</h4>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  In the rare case that you don't see your download link after payment, please contact our support team at <span className="text-primary font-bold">info@vadhuvarbiodata.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
