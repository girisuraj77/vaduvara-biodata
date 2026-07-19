"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function TermsPage() {
  const lastUpdated = "April 2026";

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="pt-24 pb-12 bg-[#430917]/5 border-b border-primary/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 mb-4 tracking-tight">Terms & Conditions</h1>
          <p className="text-zinc-500 font-medium tracking-widest uppercase text-xs">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="prose prose-zinc prose-lg max-w-none">
            <p className="text-lg text-zinc-600 leading-relaxed mb-10 font-medium">
              By accessing and using Marriage BioData, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                  Acceptance of Terms
                </h2>
                <p className="text-zinc-600 font-medium leading-relaxed">
                  By using our services, you confirm that you are of legal age to form a binding contract and that the information you provide is accurate and truthful.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                  User Conduct
                </h2>
                <div className="space-y-4 text-zinc-600 font-medium">
                  <p>You agree not to use the service to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Create biodata with false or misleading information.</li>
                    <li>Impersonate any person or entity.</li>
                    <li>Upload content that is offensive, illegal, or violates any third-party rights.</li>
                    <li>Attempt to gain unauthorized access to our systems.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">3</span>
                  Intellectual Property
                </h2>
                <p className="text-zinc-600 font-medium leading-relaxed">
                  The templates, designs, and content on this website are the property of Marriage BioData. You are granted a limited license to use these for personal, non-commercial purposes only.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">4</span>
                  Refund Policy
                </h2>
                <p className="text-zinc-600 font-medium leading-relaxed">
                  Due to the digital nature of our products, all sales are generally final. Please refer to our Cancellation & Refund page for specific details regarding eligible refund cases.
                </p>
              </section>

              <section className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100">
                <h4 className="text-lg font-bold text-zinc-900 mb-4">Agreement</h4>
                <p className="text-zinc-500 text-sm mb-0 italic">
                  By clicking "Create Biodata" or purchasing any premium template, you acknowledge that you have read and agreed to these Terms & Conditions.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
