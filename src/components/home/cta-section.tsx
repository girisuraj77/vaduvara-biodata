"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-br from-[#430917]/5 via-zinc-50/50 to-[#CFA132]/5 rounded-[2.5rem] p-12 text-center relative overflow-hidden border-2 border-[#CFA132]/20 shadow-xl shadow-primary/5">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#CFA132]/10 to-transparent blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#430917]/5 to-transparent blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-4 tracking-tight">
              Ready to Design Your <span className="text-primary bg-gradient-to-r from-primary to-[#CFA132] bg-clip-text text-transparent">Matrimonial Biodata</span>?
            </h2>
            <p className="text-zinc-500 text-base font-semibold mb-10 max-w-lg mx-auto leading-relaxed">
              Start creating your marriage biodata instantly. Choose a design, preview and customize for free, and download premium PDF or Word documents.
            </p>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Link href="#create-biodata">
                <Button className="h-14 px-12 rounded-xl bg-gradient-to-r from-[#CFA132] to-[#b58c2a] hover:from-[#b58c2a] hover:to-[#CFA132] text-white font-black text-lg shadow-xl shadow-[#CFA132]/20 hover:shadow-[#CFA132]/35 transition-all border-none cursor-pointer uppercase tracking-wider">
                  Create My Biodata Now
                </Button>
              </Link>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3 mt-12">
              <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-zinc-150 text-zinc-700 font-black text-xs shadow-sm">
                <CheckCircle2 className="text-[#CFA132] w-4 h-4 shrink-0" />
                No Login Required
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-zinc-150 text-zinc-700 font-black text-xs shadow-sm">
                <CheckCircle2 className="text-[#CFA132] w-4 h-4 shrink-0" />
                MS Word & PDF Formats
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-zinc-150 text-zinc-700 font-black text-xs shadow-sm">
                <CheckCircle2 className="text-[#CFA132] w-4 h-4 shrink-0" />
                4 Free Edit Downloads
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
