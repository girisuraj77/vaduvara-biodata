"use client";

import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

export default function CancellationPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="pt-24 pb-12 bg-[#430917]/5 border-b border-primary/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
            <RefreshCcw size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 mb-4 tracking-tight">Cancellation & Refund</h1>
          <p className="text-zinc-500 font-medium tracking-widest uppercase text-xs">Customer Satisfaction Policy</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="prose prose-zinc prose-lg max-w-none">
            <p className="text-lg text-zinc-600 leading-relaxed mb-12 font-medium text-center">
              We value your trust and strive to provide the best possible experience. Please review our policy on cancellations and refunds.
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                  Digital Goods Policy
                </h2>
                <p className="text-zinc-600 font-medium leading-relaxed">
                  Due to the intangible nature of digital templates, once a purchase is completed and the template is unlocked or downloaded, we generally do not offer refunds. However, we are committed to resolving any issues you may encounter.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                  Eligible Refund Cases
                </h2>
                <div className="space-y-4 text-zinc-600 font-medium">
                  <p>We may consider a refund in the following exceptional cases:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Duplicate payment for the same template due to technical error.</li>
                    <li>Unauthorized transaction where the user has not downloaded the template.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">3</span>
                  How to Request a Refund
                </h2>
                <p className="text-zinc-600 font-medium leading-relaxed">
                  To request a refund, please email <span className="text-primary font-bold">info@vadhuvarbiodata.com</span> within 24 hours of purchase with your transaction details and a brief explanation of the issue. Our team will review your request and get back to you within 3-5 business days.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">4</span>
                  Cancellation
                </h2>
                <p className="text-zinc-600 font-medium leading-relaxed">
                  Once a payment is initiated and processed, it cannot be cancelled as the delivery is instantaneous. We recommend reviewing our free templates first to ensure you are satisfied with our quality before making a purchase.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
