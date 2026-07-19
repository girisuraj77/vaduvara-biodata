"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Lock, Loader2, ShieldAlert, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PasswordModal({ isOpen, onClose }: PasswordModalProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/user/password", {
        method: "PATCH",
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onClose();
      } else {
        toast.error(data.error || "Password change failed");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Security Update"
      className="max-w-[450px]"
    >
      <div className="bg-primary p-6 text-white relative">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Lock size={60} />
        </div>
        <div className="relative z-10">
          <p className="text-white/80 font-bold text-xs uppercase tracking-widest">Update Credentials</p>
          <h4 className="text-xl font-black tracking-tight mt-1">Change Security Password</h4>
        </div>
      </div>

      <form onSubmit={handleUpdatePassword} className="p-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
          <ShieldAlert className="text-amber-500 shrink-0" size={18} />
          <p className="text-[10px] font-bold text-amber-700 leading-tight">
            You must provide your current password to authorize this change. This keeps your account secure.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-1">Current Password</label>
            <div className="relative">
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="w-full bg-zinc-50 px-4 py-3.5 pl-11 rounded-xl border border-zinc-100 text-sm font-bold text-zinc-700 focus:border-primary focus:ring-0 transition-all"
                placeholder="••••••••"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-1">New Password</label>
            <div className="relative">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full bg-zinc-50 px-4 py-3.5 pl-11 rounded-xl border border-zinc-100 text-sm font-bold text-zinc-700 focus:border-primary focus:ring-0 transition-all"
                placeholder="Create new password"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-1">Confirm New Password</label>
            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-zinc-50 px-4 py-3.5 pl-11 rounded-xl border border-zinc-100 text-sm font-bold text-zinc-700 focus:border-primary focus:ring-0 transition-all"
                placeholder="Repeat new password"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl font-black h-12 bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
            Update Password
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="w-full rounded-xl font-black h-10 text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            I'll do it later
          </Button>
        </div>
      </form>
    </Modal>
  );
}
