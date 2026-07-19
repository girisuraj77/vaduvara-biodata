"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Mail, Key, Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useBuilderStore } from "@/store/builder-store";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [paymentIdOrBioId, setPaymentIdOrBioId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const loadBiodata = useBuilderStore((state) => state.loadBiodata);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setEmailOrMobile("");
      setPaymentIdOrBioId("");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrMobile.trim() || !paymentIdOrBioId.trim()) {
      toast.error("Please fill in both fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/biodata/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrMobile: emailOrMobile.trim(),
          paymentIdOrBioId: paymentIdOrBioId.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to download biodata");
      }

      if (data.biodata) {
        // Load the fetched biodata state into Zustand and jump to the 'preview' step
        if (!data.biodata.isDraft) {
          const nextMidnight = new Date();
          nextMidnight.setHours(24, 0, 0, 0);
          localStorage.setItem("vaduvara_active_purchase", JSON.stringify({
            templateId: data.biodata.template || "simple_leafy",
            expiresAt: nextMidnight.getTime()
          }));
        }
        loadBiodata(data.biodata, "preview");
        toast.success("Biodata loaded successfully!");
        onClose();
      } else {
        toast.error("No active paid biodata found with these details.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Could not download biodata. Please check details.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[10000]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[10001] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto border-2 border-primary/20 shadow-primary/10"
            >
              {/* Header */}
              <div className="bg-primary p-7 relative">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-secondary animate-pulse" size={20} />
                  <h2 className="text-white text-xl font-black tracking-tight leading-tight">
                    Download Paid Biodata
                  </h2>
                </div>
                <p className="text-white/80 text-[12px] font-bold mt-1 uppercase tracking-wider">
                  Get your print-ready files or make edits
                </p>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-4">
                  {/* Email or Mobile */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-zinc-700 uppercase tracking-widest ml-1">
                      Email or Mobile Number
                    </label>
                    <div className="flex items-center gap-3 bg-white border-2 border-zinc-200 rounded-2xl px-4 py-3.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all shadow-sm">
                      <Mail size={18} className="text-zinc-400" />
                      <input
                        type="text"
                        value={emailOrMobile}
                        onChange={(e) => setEmailOrMobile(e.target.value)}
                        placeholder="e.g. rajesh@gmail.com or 9876543210"
                        className="bg-transparent outline-none w-full font-bold text-zinc-800 placeholder:text-zinc-400 text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Payment ID or Biodata ID */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-zinc-700 uppercase tracking-widest ml-1">
                      Payment ID or Biodata ID
                    </label>
                    <div className="flex items-center gap-3 bg-white border-2 border-zinc-200 rounded-2xl px-4 py-3.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all shadow-sm">
                      <Key size={18} className="text-zinc-400" />
                      <input
                        type="text"
                        value={paymentIdOrBioId}
                        onChange={(e) => setPaymentIdOrBioId(e.target.value)}
                        placeholder="e.g. pay_XXXXXX or bio_XXXXXX"
                        className="bg-transparent outline-none w-full font-bold text-zinc-800 placeholder:text-zinc-400 text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 bg-primary hover:bg-primary/95 text-white rounded-2xl font-black text-md shadow-xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer border-none"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        <Download size={18} /> Download Paid Biodata
                      </>
                    )}
                  </Button>
                </div>

                {/* Helpful Note */}
                <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-xl flex gap-2 shadow-sm">
                  <AlertTriangle size={16} className="text-secondary shrink-0 mt-0.5" />
                  <p className="text-[10px] text-zinc-400 font-bold leading-normal uppercase tracking-wider">
                    Note: Only successfully paid premium templates can be downloaded. Free templates are saved in browser local storage only.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
