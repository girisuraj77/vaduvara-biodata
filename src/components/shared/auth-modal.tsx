"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { ForgotPasswordModal } from "./forgot-password-modal";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setMode(initialMode);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialMode]);

  if (!mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        // toast.success("Account created successfully! Please log in.");
        // setMode("login");
        const loginResult = await signIn("credentials", {
          redirect: false, email, password,
        });
        if (loginResult?.error) { throw new Error(loginResult.error); }

        const { getSession } = await import("next-auth/react");
        const session = await getSession();
        toast.success("Account created successfully!");
        onClose();

        setTimeout(() => {
          if ((session?.user as any)?.role === "ADMIN") {
            window.location.href = "/admin";
          } else {
            window.location.href = "/dashboard?autoSave=true";
          }
        }, 500);

      } else {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        toast.success("Logged in successfully!");
        onClose();

        // Fetch session to check role
        const { getSession } = await import("next-auth/react");
        const session = await getSession();

        setTimeout(() => {
          if ((session?.user as any)?.role === "ADMIN") {
            window.location.href = "/admin";
          } else {
            // Smart Redirect: Stay on current page if it's pricing or checkout
            const params = new URLSearchParams(window.location.search);
            const redirectUrl = params.get("redirect");

            if (redirectUrl) {
              window.location.href = redirectUrl;
            } else if (window.location.pathname.includes("/pricing") || window.location.pathname.includes("/checkout")) {
              // Stay on page to continue flow
              onClose();
              window.location.reload(); // Refresh to update session state in UI
            } else {
              window.location.href = "/dashboard?autoSave=true";
            }
          }
        }, 500); // Small delay to let the toast show
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[20000]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[20001] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-[440px] overflow-hidden pointer-events-auto border-2 border-primary/20 shadow-primary/10 flex flex-col"
            >
              {/* Header / Tabs */}
              <div className="flex bg-zinc-50 border-b border-zinc-100 p-1.5 rounded-t-[2.5rem]">
                <button
                  onClick={() => setMode("login")}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-2xl text-[14px] font-black transition-all duration-300 cursor-pointer",
                    mode === "login" ? "bg-white text-primary shadow-md" : "text-zinc-400 hover:text-zinc-600"
                  )}
                >
                  Log In
                </button>
                <button
                  onClick={() => setMode("signup")}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-2xl text-[14px] font-black transition-all duration-300 cursor-pointer",
                    mode === "signup" ? "bg-white text-primary shadow-md" : "text-zinc-400 hover:text-zinc-600"
                  )}
                >
                  Sign Up
                </button>
                <button
                  onClick={onClose}
                  className="p-3 text-zinc-400 hover:text-primary transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-8 space-y-6">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
                    {mode === "login" ? "Welcome Back!" : "Join Us Today!"}
                  </h2>
                  <p className="text-[13px] font-bold text-zinc-400">
                    {mode === "login"
                      ? "Enter your credentials to access your biodatas."
                      : "Create an account to start building your professional biodata."}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-black text-zinc-700 ml-1">Full Name</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors">
                          <User size={18} />
                        </div>
                        <input
                          required
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full h-12 pl-12 pr-4 bg-white border-2 border-zinc-300 rounded-xl text-[14px] font-bold text-zinc-800 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all shadow-sm"
                        />
                      </div>
                    </div>
                  )}

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
                        placeholder="example@mail.com"
                        className="w-full h-12 pl-12 pr-4 bg-white border-2 border-zinc-300 rounded-xl text-[14px] font-bold text-zinc-800 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[12px] font-black text-zinc-700">Password</label>
                      {mode === "login" && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            setIsForgotPasswordOpen(true);
                          }}
                          className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors">
                        <Lock size={18} />
                      </div>
                      <input
                        required
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-12 pl-12 pr-12 bg-white border-2 border-zinc-300 rounded-xl text-[14px] font-bold text-zinc-800
                          focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all shadow-sm"
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

                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <>
                        {mode === "login" ? "Sign In" : "Create Account"}
                        <ArrowRight size={20} strokeWidth={3} />
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-[12px] font-bold text-zinc-400">
                    {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                    <button
                      onClick={() => setMode(mode === "login" ? "signup" : "login")}
                      className="ml-1.5 text-primary hover:underline font-black cursor-pointer"
                    >
                      {mode === "login" ? "Sign Up Free" : "Log In Now"}
                    </button>
                  </p>
                </div>
              </div>

              {/* Footer Quote */}
              <div className="bg-zinc-50 p-4 border-t border-zinc-100 text-center">
                <p className="text-[10px] font-bold text-zinc-400 flex items-center justify-center gap-1.5 uppercase tracking-wider">
                  <CheckCircle2 size={12} className="text-green-500" />
                  100% Secure & Privacy Protected
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {createPortal(modalContent, document.body)}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </>
  );
}
