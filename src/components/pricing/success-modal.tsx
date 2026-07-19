"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  PartyPopper,
  Sparkles
} from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
}

export function PaymentSuccessModal({ isOpen, onClose, planName }: PaymentSuccessModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[20000]"
          />

          <div className="fixed inset-0 flex items-center justify-center z-[20001] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto flex flex-col relative border-4 border-primary/20"
            >
              {/* Confetti-like background elements */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent" />

              <div className="p-8 text-center relative z-10">
                <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/40 rotate-12">
                  <PartyPopper size={40} className="text-white" />
                </div>

                <h2 className="text-3xl font-black text-zinc-900 mb-2 tracking-tight">Payment Successful!</h2>
                <p className="text-zinc-500 font-bold text-sm mb-6">
                  Welcome to the {planName || 'Premium'} Family. Your account has been upgraded instantly.
                </p>

                <div className="bg-primary/5 rounded-[1.5rem] p-5 mb-8 text-left border border-primary/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles size={48} className="text-primary" />
                  </div>
                  <div className="flex items-center gap-2 mb-3 text-primary relative z-10">
                    <Sparkles size={16} className="animate-pulse" />
                    <h4 className="font-black text-[10px] uppercase tracking-widest">AI Profile Booster</h4>
                  </div>
                  <p className="text-[11px] font-bold text-zinc-600 leading-relaxed italic relative z-10">
                    "Our AI data shows that premium profiles with clear, high-quality portrait photos receive <span className="text-primary">5x more responses</span>. You can now create multiple versions of your biodata—try different professional templates to see which one works best for you!"
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={onClose}
                    className="w-full h-14 bg-zinc-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-95"
                  >
                    Go to My Dashboard
                    <ArrowRight size={18} />
                  </Button>
                </div>
              </div>

              {/* Success Badge */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
