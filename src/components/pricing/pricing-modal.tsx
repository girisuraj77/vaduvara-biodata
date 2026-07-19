"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  Info,
  Sparkles,
  Download,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Zap,
  Bot,
  Percent,
  Loader2
} from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/store/builder-store";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: (planId: string) => void;
  error?: string | null;
}

export function PricingModal({ isOpen, onClose, onProceed, error }: PricingModalProps) {
  const [packages, setPackages] = useState<any[]>([]);
  const [comparison, setComparison] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [mounted, setMounted] = useState(false);
  const { profilePhotoUrl, setAuthModal } = useBuilderStore();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/packages");
        const data = await res.json();
        if (data.packages) {
          setPackages(data.packages);
          setComparison(data.comparison || []);
          // Find standard or premium to select by default
          const standard = data.packages.find((p: any) => p.id === "standard");
          if (standard) setSelectedPlan(standard.id);
        }
      } catch (err) {
        console.error("Failed to fetch packages", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const currentPlan = packages.find(p => p.id === selectedPlan);

  const getIcon = (id: string) => {
    if (id === "premium") return Sparkles;
    if (id === "standard") return CheckCircle2;
    return FileText;
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10000]"
          />

          <div className="fixed inset-0 flex items-center justify-center z-[10001] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#f8f9fa] rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh] border-2 border-primary/20 shadow-primary/10"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary/90 p-5 relative shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden border-2 border-white/50">
                    {profilePhotoUrl ? (
                      <img
                        src={profilePhotoUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-black text-primary">ॐ</span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-white text-xl font-black tracking-tight leading-tight">Your Biodata Is Ready!</h2>
                    <p className="text-white/80 text-[11px] font-bold uppercase tracking-wider">Everything Is Set - Proceed to Get Your Biodata Now.</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar">
                {/* ERROR ALERT */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 border border-red-100 rounded-xl flex gap-3 shadow-sm shrink-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                      <Info size={18} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-red-900 mb-0.5 uppercase tracking-tight">Payment Issue!</h4>
                      <p className="text-[10px] font-bold text-red-700 leading-relaxed">
                        {error}
                      </p>
                    </div>
                  </motion.div>
                )}

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <Loader2 className="animate-spin text-primary" size={40} />
                    <p className="text-zinc-400 font-bold text-sm animate-pulse">Loading Premium Packages...</p>
                  </div>
                ) : (
                  <>
                    {/* Plans Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {packages.map((plan) => {
                        const Icon = getIcon(plan.id);
                        return (
                          <button
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan.id)}
                            className={cn(
                              "relative flex flex-col p-4 rounded-[1.5rem] border-2 transition-all duration-500 text-center group cursor-pointer h-full",
                              selectedPlan === plan.id
                                ? "bg-white border-primary shadow-[0_15px_30px_-10px_rgba(225,29,72,0.2)] scale-[1.05] z-10"
                                : "bg-white border-zinc-100 hover:border-primary/30"
                            )}
                          >
                            {plan.badge && (
                              <div className={cn(
                                "absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-white text-[8px] font-black uppercase tracking-widest shadow-md z-20 whitespace-nowrap",
                                plan.badgeColor || "bg-primary"
                              )}>
                                {plan.badge}
                              </div>
                            )}

                            <div className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-500",
                              selectedPlan === plan.id ? "bg-primary text-white shadow-lg" : "bg-primary/5 text-primary"
                            )}>
                              <Icon size={24} strokeWidth={2.5} />
                            </div>

                            <h4 className="text-[14px] font-black text-zinc-900 leading-tight mb-1">{plan.name}</h4>

                            <div className="mb-3">
                              {plan.originalPrice && (
                                <p className="text-[10px] text-zinc-400 font-bold line-through">₹{plan.originalPrice}</p>
                              )}
                              <div className="flex items-baseline justify-center">
                                <span className="text-2xl font-black text-zinc-900 leading-none">₹{plan.price}</span>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1.5 mt-auto pt-3 border-t border-zinc-50 text-left">
                              {plan.features?.map((f: string, i: number) => (
                                <div key={i} className="flex items-start gap-1.5">
                                  <Check size={10} className="text-green-500 shrink-0 mt-0.5" />
                                  <span className="text-[9px] font-bold text-zinc-600 leading-tight">{f}</span>
                                </div>
                              ))}
                            </div>

                            {selectedPlan === plan.id && (
                              <div className="absolute top-2.5 right-2.5 text-primary">
                                <CheckCircle2 size={16} />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Comparison Table */}
                    {comparison.length > 0 && (
                      <div className="mt-4 bg-white rounded-2xl border border-zinc-100 overflow-hidden">
                        <div className="p-3 bg-zinc-50 border-b border-zinc-100 text-center">
                          <p className="text-[13px] font-black text-zinc-700 flex items-center justify-center gap-2">
                            📊 Check Price Comparison!
                          </p>
                        </div>
                        <table className="w-full text-left text-[11px]">
                          <thead>
                            <tr className="border-b border-zinc-50 text-zinc-400 uppercase font-black tracking-widest">
                              <th className="p-3">Feature</th>
                              <th className="p-3 text-center">Basic</th>
                              <th className="p-3 text-center">Standard</th>
                              <th className="p-3 text-center">Premium</th>
                            </tr>
                          </thead>
                          <tbody>
                            {comparison.map((row, i) => (
                              <tr key={i} className="border-b border-zinc-50 last:border-0 font-bold text-zinc-600">
                                <td className="p-3">{row.feature}</td>
                                <td className="p-3 text-center">
                                  {row.basic === "true" ? <Check className="mx-auto text-green-500" size={14} /> : row.basic === "false" ? <X className="mx-auto text-red-300" size={14} /> : row.basic}
                                </td>
                                <td className="p-3 text-center font-black text-zinc-900">
                                  {row.standard === "true" ? <Check className="mx-auto text-green-500" size={14} /> : row.standard === "false" ? <X className="mx-auto text-red-300" size={14} /> : row.standard}
                                </td>
                                <td className="p-3 text-center">
                                  {row.premium === "true" ? <Check className="mx-auto text-green-500" size={14} /> : row.premium === "false" ? <X className="mx-auto text-red-300" size={14} /> : row.premium}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-white border-t border-zinc-100 shrink-0">
                {!session && (
                  <div className="text-center mb-3 flex flex-col gap-1">
                    <button
                      onClick={() => {
                        onClose();
                        setAuthModal(true, "login");
                      }}
                      className="text-[11px] font-black text-primary hover:text-primary/80 transition-colors cursor-pointer underline underline-offset-2"
                    >
                      Already have a package? Login here
                    </button>
                  </div>
                )}
                <Button
                  onClick={() => onProceed(selectedPlan)}
                  disabled={isLoading}
                  className="w-full h-16 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-2xl font-black text-xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98] cursor-pointer"
                >
                  Pay ₹{currentPlan?.price || 0} - Download Now
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
