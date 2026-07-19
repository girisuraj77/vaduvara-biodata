"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function SecureAdminPortalPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error || "Invalid administrator credentials");
      } else {
        toast.success("Welcome back, Admin!");
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#430917]/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2.5rem] border-2 border-[#430917]/20 shadow-2xl p-8 space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-25 h-25 bg-white border border-zinc-200 rounded-3xl flex items-center justify-center mx-auto shadow-lg overflow-hidden p-2">
              <img
                src="/brand-icon.png"
                alt="Vadhuvar Brand Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-black text-[#430917] tracking-tight mt-4">
              Vadhuvar Admin Portal
            </h1>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">
              Authorized Personnel Only
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-zinc-700 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="flex items-center gap-3 bg-white border-2 border-zinc-200 rounded-2xl px-4 py-3.5 focus-within:border-[#430917] focus-within:ring-2 focus-within:ring-[#430917]/10 transition-all shadow-sm">
                  <Mail size={18} className="text-zinc-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@vadhuvarbiodata.com"
                    className="bg-transparent outline-none w-full font-bold text-zinc-800 placeholder:text-zinc-400 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-zinc-700 uppercase tracking-widest ml-1">
                  Secure Password
                </label>
                <div className="flex items-center gap-3 bg-white border-2 border-zinc-200 rounded-2xl px-4 py-3.5 focus-within:border-[#430917] focus-within:ring-2 focus-within:ring-[#430917]/10 transition-all shadow-sm">
                  <Lock size={18} className="text-zinc-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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
                className="w-full h-14 bg-gradient-to-r from-[#430917] to-[#5c0d20] hover:from-[#5c0d20] hover:to-[#430917] text-white rounded-2xl font-black text-md shadow-lg shadow-[#430917]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Sign In to Dashboard <ArrowRight size={18} />
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Warning */}
          <p className="text-center text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            All attempts are logged and monitored.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
