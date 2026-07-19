"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Lock, ChevronRight, Loader2, CheckCircle2 } from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { useSession, signIn } from "next-auth/react";
import { useBuilderStore } from "@/store/builder-store";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { email: string; mobile: string }) => void;
  isLoading?: boolean;
  initialEmail?: string;
  initialMobile?: string;
}

export function ContactModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  initialEmail = "",
  initialMobile = ""
}: ContactModalProps) {
  const [email, setEmail] = useState(initialEmail);
  const [mobile, setMobile] = useState(initialMobile);
  const [mounted, setMounted] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const { setAuthModal } = useBuilderStore();
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setEmail(initialEmail || session?.user?.email || "");
      setMobile(initialMobile || "");
      setEmailExists(false);
      setEmailError("");
      setMobileError("");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialEmail, initialMobile, session]);

  const validateEmail = (val: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) return "Email is required";
    if (!emailRegex.test(val)) return "Please enter a valid email address";
    return "";
  };

  const validateMobile = (val: string) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!val) return "Mobile number is required";
    if (!mobileRegex.test(val)) return "Enter a valid 10-digit Indian number";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setMobileError("");
    setEmailExists(false);

    const eErr = validateEmail(email);
    const mErr = validateMobile(mobile);

    if (eErr || mErr) {
      setEmailError(eErr);
      setMobileError(mErr);
      return;
    }

    // Check if email exists in DB only if user is NOT logged in or email is different
    if (!session || email !== session.user?.email) {
      setIsCheckingEmail(true);
      try {
        const res = await fetch(`/api/user/check-email?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        if (data.exists) {
          setEmailExists(true);
          return;
        }
      } catch (err) {
        console.error("Email check failed", err);
      } finally {
        setIsCheckingEmail(false);
      }
    }

    onConfirm({ email, mobile });
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
                <h2 className="text-white text-2xl font-black tracking-tight leading-tight">One Last Detail</h2>
                <p className="text-white/80 text-[13px] font-bold mt-1">Enter your contact info to receive your biodata.</p>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-4">

                  {/* Email Section */}
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-black text-zinc-700 uppercase tracking-widest ml-1">Email Address</label>
                    <div className={cn(
                      "flex items-center gap-3 bg-white border-2 rounded-2xl px-4 py-3.5 transition-all shadow-sm",
                      emailError ? "border-red-200" : "border-zinc-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10",
                      emailExists && "border-amber-200 bg-amber-50/30"
                    )}>
                      <Mail size={20} className={cn("transition-colors", emailExists ? "text-amber-500" : "text-zinc-400")} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailExists(false);
                          setEmailError("");
                        }}
                        disabled={!!session?.user?.email && email === session.user.email}
                        placeholder="example@gmail.com"
                        className="bg-transparent outline-none w-full font-bold text-zinc-800 placeholder:text-zinc-400 disabled:opacity-70"
                      />
                    </div>

                    {emailError && <p className="text-red-500 text-[10px] font-bold ml-1 animate-in fade-in slide-in-from-top-1">⚠️ {emailError}</p>}

                    <AnimatePresence>
                      {emailExists && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mt-3 overflow-hidden"
                        >
                          <div className="flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-amber-600 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                              <p className="text-amber-900 text-[13px] font-black leading-tight">Welcome Back!</p>
                              <p className="text-amber-700 text-[11px] font-bold leading-tight">
                                You already have an account with us. Please log in to access your dashboard.
                              </p>
                              <Button
                                type="button"
                                onClick={() => {
                                  onClose();
                                  setAuthModal(true, "login");
                                }}
                                className="mt-2 h-8 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-black shadow-lg shadow-amber-200"
                              >
                                Login Now
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mobile Section */}
                  {!emailExists && (
                    <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                      <label className="text-[12px] font-black text-zinc-700 uppercase tracking-widest ml-1">Mobile Number</label>
                      <div className={cn(
                        "flex items-center gap-3 bg-white border-2 rounded-2xl px-4 py-3.5 transition-all shadow-sm",
                        mobileError ? "border-red-200" : "border-zinc-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10"
                      )}>
                        <Phone size={20} className="text-zinc-400" />
                        <input
                          type="tel"
                          value={mobile}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                            setMobile(val);
                            setMobileError("");
                          }}
                          autoFocus={!!session?.user?.email}
                          placeholder="10 digit mobile number"
                          className="bg-transparent outline-none w-full font-bold text-zinc-800 placeholder:text-zinc-400"
                        />
                      </div>
                      {mobileError && <p className="text-red-500 text-[10px] font-bold ml-1 animate-in fade-in slide-in-from-top-1">⚠️ {mobileError}</p>}
                    </div>
                  )}
                </div>

                {!emailExists && (
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isCheckingEmail || isLoading}
                      className="w-full h-16 bg-zinc-900 hover:bg-zinc-800 text-white rounded-[1.25rem] font-black text-lg shadow-xl shadow-zinc-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      {isCheckingEmail || isLoading ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        <>
                          Continue to Payment <ChevronRight size={24} />
                        </>
                      )}
                    </Button>
                  </div>
                )}

                <p className="text-center text-[10px] font-bold text-zinc-400 flex items-center justify-center gap-1.5 uppercase tracking-widest">
                  <Lock size={12} /> 256-bit Secure Encrypted Payment
                </p>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
