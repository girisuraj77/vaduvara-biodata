"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, X, Sparkles, Share2, Layout, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useBuilderStore } from "@/store/builder-store";
import Link from "next/link";

interface PricingClientProps {
  initialPackages: any[];
  initialComparison: any[];
}

export function PricingClient({ initialPackages, initialComparison }: PricingClientProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { setAuthModal } = useBuilderStore();

  const displayPackages = initialPackages.length > 0 ? initialPackages : [
    { id: "basic", name: "Basic Plan", price: 49, description: "Single Profile", subtext: "Ideal for a quick professional draft", features: ["1 Biodata Profile", "5 PDF Downloads", "Dashboard Access", "1 Month Validity"], isActive: true },
    { id: "standard", name: "Standard Plan", price: 149, description: "Multiple Profiles", subtext: "Most chosen by parents", features: ["5 Biodata Profiles", "15 PDF Downloads", "Private Share Link", "Edit Anytime", "6 Months Validity"], isActive: true, badge: "Popular" },
    { id: "premium", name: "Premium Plan", price: 299, description: "Full Professional Access", subtext: "Perfect for large families", features: ["15 Biodata Profiles", "50 PDF Downloads", "Private Share Link", "Priority Dashboard", "1 Year Validity"], isActive: true, badge: "Best Value" },
  ];

  const displayComparison = initialComparison.length > 0 ? initialComparison : [
    { feature: "Biodata Creation", basic: "1", standard: "5", premium: "15" },
    { feature: "Download Limit", basic: "5", standard: "15", premium: "50" },
    { feature: "Private Share Link", basic: "false", standard: "true", premium: "true" },
    { feature: "Profile Dashboard", basic: "true", standard: "true", premium: "true" },
    { feature: "Edit Anytime", basic: "false", standard: "true", premium: "true" },
    { feature: "Premium Templates", basic: "true", standard: "true", premium: "true" },
    { feature: "Ad-Free PDF", basic: "true", standard: "true", premium: "true" },
    { feature: "Validity", basic: "1 Month", standard: "6 Months", premium: "1 Year" },
  ];

  const handlePlanClick = (pkg: any) => {
    if (pkg.price === 0) {
      router.push("/#create-biodata");
      return;
    }

    if (!session) {
      const checkoutUrl = `/checkout?planId=${pkg.id}`;
      window.history.replaceState(null, "", `?redirect=${encodeURIComponent(checkoutUrl)}`);
      setAuthModal(true, "login");
    } else {
      router.push(`/checkout?planId=${pkg.id}`);
    }
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden bg-[#d60d2c]/5 text-zinc-900 border-b border-primary/5">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Crown size={12} /> Simple Plans
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight text-zinc-900">
              Pricing <span className="text-primary italic">Packages</span>
            </h1>
            <p className="text-zinc-500 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Transparent pricing with no hidden costs. All plans include access to our premium design library.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-zinc-50/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {displayPackages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-3xl p-8 border ${pkg.badge ? 'border-primary shadow-xl shadow-primary/5' : 'border-zinc-200'} flex flex-col`}
              >
                {pkg.badge && (
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${pkg.id === 'standard' ? 'bg-primary' : 'bg-green-600'} text-white px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg`}>
                    {pkg.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-black text-zinc-900 mb-1">{pkg.name}</h3>
                  <p className="text-zinc-400 font-bold text-[12px] leading-tight">{pkg.subtext || pkg.description}</p>
                </div>

                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-zinc-900">₹{pkg.price}</span>
                  <span className="text-zinc-400 font-bold text-xs">/one-time</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-zinc-600 font-semibold text-[13px]">
                      <Check size={14} className="text-primary" strokeWidth={3} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Key Benefits Icons INSIDE Card */}
                <div className="grid grid-cols-3 gap-2 pt-6 mb-8 border-t border-zinc-50">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 border border-zinc-100">
                      <Share2 size={14} />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-tighter text-zinc-400">Share</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 border border-zinc-100">
                      <Layout size={14} />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-tighter text-zinc-400">Panel</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 border border-zinc-100">
                      <Edit3 size={14} />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-tighter text-zinc-400">Edit</span>
                  </div>
                </div>

                <Button
                  onClick={() => handlePlanClick(pkg)}
                  className={`w-full h-12 rounded-xl font-black text-sm transition-all cursor-pointer ${pkg.badge
                      ? 'bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg shadow-primary/10'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                    }`}
                >
                  {pkg.price === 0 ? "Get Started" : "Get Plan"}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section - Clean & Basic Look */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-black text-zinc-900 mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Sparkles size={18} />
              </span>
              Compare Features
            </h2>

            <div className="overflow-hidden border border-zinc-100 rounded-2xl bg-white shadow-sm">
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
                  <tr className="bg-zinc-50/80 border-b border-zinc-100">
                    <th className="py-4 px-6 text-zinc-400 font-black uppercase tracking-wider w-[40%]">Plan Features</th>
                    <th className="py-4 px-6 text-zinc-900 font-black">Basic</th>
                    <th className="py-4 px-6 text-primary font-black">Standard</th>
                    <th className="py-4 px-6 text-zinc-900 font-black">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {displayComparison.map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-50/30 transition-colors">
                      <td className="py-4 px-6 font-bold text-zinc-700">{row.feature}</td>
                      <td className="py-4 px-6 text-zinc-500 font-semibold">
                        {row.basic === "true" ? <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-500"><Check size={12} strokeWidth={3} /></div> : row.basic === "false" ? <X size={14} className="text-red-300" /> : row.basic}
                      </td>
                      <td className="py-4 px-6 text-zinc-900 font-black">
                        {row.standard === "true" ? <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-500"><Check size={12} strokeWidth={3} /></div> : row.standard === "false" ? <X size={14} className="text-red-300" /> : row.standard}
                      </td>
                      <td className="py-4 px-6 text-zinc-500 font-semibold">
                        {row.premium === "true" ? <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-500"><Check size={12} strokeWidth={3} /></div> : row.premium === "false" ? <X size={14} className="text-red-300" /> : row.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-[#d60d2c]/5 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-primary/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-40" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-zinc-900 text-3xl md:text-5xl font-black mb-6 leading-tight">Start your journey today</h3>
              <p className="text-zinc-500 text-lg font-medium mb-12">
                Professional biodata for a lasting first impression. Secure your perfect plan now.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/contact">
                  <Button size="lg" className="rounded-full px-10 h-16 font-black bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all cursor-pointer">
                    Contact Support <Sparkles size={18} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
