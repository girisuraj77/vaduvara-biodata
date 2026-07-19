"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function PlansPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-6 text-center space-y-8 animate-in fade-in duration-500">
      <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto border border-primary/10">
        <Sparkles className="text-primary h-8 w-8" />
      </div>
      
      <div className="space-y-3">
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Pay Per Template</h1>
        <p className="text-zinc-500 font-medium text-base">
          We have simplified our pricing! There are no more monthly subscriptions or complicated packages.
        </p>
      </div>

      <div className="p-8 bg-zinc-50 dark:bg-zinc-800/30 rounded-[2rem] border border-zinc-200/60 max-w-md mx-auto space-y-6 text-left">
        <h3 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-lg">New Dynamic Pricing:</h3>
        <ul className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
            <span><strong>Free Templates</strong>: Create, edit, and download with watermarks for ₹0.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
            <span><strong>Premium Templates</strong>: Direct checkout flat ₹49 to unlock watermark-free Image and A4 Print PDF downloads.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
            <span><strong>Grace Window</strong>: Make unlimited edits and redownloads on the same template for free until midnight 12:00 AM!</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link href="/#create-biodata">
          <Button className="rounded-xl px-8 h-12 bg-primary hover:bg-primary/95 text-white font-bold shadow-lg shadow-primary/10">
            Create Biodata <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
        <Link href="/dashboard/biodatas">
          <Button variant="outline" className="rounded-xl px-8 h-12 border-zinc-200 font-bold hover:bg-zinc-50">
            View My Drafts
          </Button>
        </Link>
      </div>
    </div>
  );
}
