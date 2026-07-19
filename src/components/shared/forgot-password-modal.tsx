"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useBuilderStore } from "@/store/builder-store";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ResetStep = "email" | "otp" | "reset";

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<ResetStep>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(0);

  const { setAuthModal } = useBuilderStore();

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStep("email");
      setOtp("");
      setNewPassword("");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (!mounted) return null;

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to send OTP");

      toast.success("OTP sent to your email!");
      setStep("otp");
      setTimer(60); // 1 minute cooldown
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Invalid OTP code");

      toast.success("OTP verified! Please set your new password.");
      setStep("reset");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to reset password");

      toast.success("Password reset successfully! You can now log in.");
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[30000]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[30001] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-[440px] overflow-hidden pointer-events-auto border-2 border-primary/20 shadow-primary/10 flex flex-col"
            >
              {/* Header */}
              <div className="flex bg-zinc-50 border-b border-zinc-100 p-6 rounded-t-[2.5rem] items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck size={24} />
                  </div>
                  <h2 className="text-xl font-black text-zinc-900 tracking-tight">Account Recovery</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-zinc-400 hover:text-primary transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-8">
                {step === "email" && (
                  <form onSubmit={handleSendOTP} className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-zinc-800">Forgot Password?</h3>
                      <p className="text-[13px] font-bold text-zinc-400 leading-relaxed">
                        Enter your registered email address and we'll send you a 6-digit OTP to reset your password.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[12px] font-black text-zinc-700 ml-1">Email Address</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors">
                          <Mail size={18} />
                        </div>
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full h-12 pl-12 pr-4 bg-white border-2 border-zinc-300 rounded-xl text-[14px] font-bold text-zinc-800 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <Button
                      disabled={isLoading}
                      type="submit"
                      className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        <>
                          Send OTP Code
                          <ArrowRight size={20} strokeWidth={3} />
                        </>
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        setAuthModal(true, "login");
                      }}
                      className="w-full text-[13px] font-bold text-zinc-400 hover:text-zinc-600 transition-colors"
                    >
                      Back to Login
                    </button>
                  </form>
                )}

                {step === "otp" && (
                  <form onSubmit={handleVerifyOTP} className="space-y-6">
                    <div className="space-y-1 text-center">
                      <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mx-auto mb-4 border-2 border-zinc-100">
                        <Mail className="text-primary" size={32} />
                      </div>
                      <h3 className="text-lg font-black text-zinc-800">Verify Your Email</h3>
                      <p className="text-[13px] font-bold text-zinc-400 leading-relaxed px-4">
                        We have sent a 6-digit code to <span className="text-zinc-800">{email}</span>
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-[12px] font-black text-zinc-700">Enter OTP Code</label>
                        {timer > 0 ? (
                          <span className="text-[11px] font-bold text-zinc-400">Resend in {timer}s</span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSendOTP}
                            className="text-[11px] font-black text-primary hover:underline cursor-pointer"
                          >
                            Resend Code
                          </button>
                        )}
                      </div>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors">
                          <KeyRound size={18} />
                        </div>
                        <input
                          required
                          type="text"
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                          placeholder="000000"
                          className="w-full h-14 pl-12 pr-4 bg-white border-2 border-zinc-300 rounded-xl text-2xl font-black tracking-[10px] text-zinc-800 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all shadow-sm text-center"
                        />
                      </div>
                    </div>

                    <Button
                      disabled={isLoading || otp.length !== 6}
                      type="submit"
                      className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        <>
                          Verify & Continue
                          <ArrowRight size={20} strokeWidth={3} />
                        </>
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={() => setStep("email")}
                      className="w-full text-[13px] font-bold text-zinc-400 hover:text-zinc-600 transition-colors"
                    >
                      Change Email Address
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        setAuthModal(true, "login");
                      }}
                      className="w-full text-[11px] font-bold text-zinc-300 hover:text-primary transition-colors"
                    >
                      Back to Login
                    </button>
                  </form>
                )}

                {step === "reset" && (
                  <form onSubmit={handleResetPassword} className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-zinc-800">New Password</h3>
                      <p className="text-[13px] font-bold text-zinc-400 leading-relaxed">
                        Create a strong password to protect your account.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-black text-zinc-700 ml-1">New Password</label>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors">
                            <Lock size={18} />
                          </div>
                          <input
                            required
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full h-12 pl-12 pr-12 bg-white border-2 border-zinc-300 rounded-xl text-[14px] font-bold text-zinc-800 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <Button
                      disabled={isLoading || newPassword.length < 6}
                      type="submit"
                      className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        <>
                          Reset Password
                          <CheckCircle2 size={20} strokeWidth={3} />
                        </>
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        setAuthModal(true, "login");
                      }}
                      className="w-full text-[13px] font-bold text-zinc-400 hover:text-zinc-600 transition-colors"
                    >
                      Back to Login
                    </button>
                  </form>
                )}
              </div>

              {/* Footer */}
              <div className="bg-zinc-50 p-4 border-t border-zinc-100 text-center">
                <p className="text-[10px] font-bold text-zinc-400 flex items-center justify-center gap-1.5 uppercase tracking-wider">
                  <KeyRound size={12} className="text-primary" />
                  Password Recovery System Secure
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
