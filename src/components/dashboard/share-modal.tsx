"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Share2,
  Copy,
  Check,
  Globe,
  Lock,
  MessageCircle,
  Facebook,
  ExternalLink,
  Loader2,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { Modal } from "@/components/ui/modal";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  biodata: any;
  onUpdate: (updatedBio: any) => void;
}

export function ShareModal({ isOpen, onClose, biodata, onUpdate }: ShareModalProps) {
  const [slug, setSlug] = useState(biodata?.shareSlug || "");
  const [isPublic, setIsPublic] = useState(biodata?.isPublic || false);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Initialize state when biodata changes
  useEffect(() => {
    if (biodata) {
      setSlug(biodata.shareSlug || "");
      setIsPublic(biodata.isPublic || false);
      setSlugStatus("idle");
      setStatusMessage("");
    }
  }, [biodata]);

  // Debounced slug check
  useEffect(() => {
    const sanitizedSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    
    // Don't check if it's the same as the current slug
    if (sanitizedSlug === biodata?.shareSlug || !sanitizedSlug) {
      setSlugStatus("idle");
      setStatusMessage("");
      return;
    }

    const timer = setTimeout(async () => {
      setSlugStatus("checking");
      try {
        const res = await fetch(`/api/user/biodata/check-slug?slug=${sanitizedSlug}&biodataId=${biodata.id}`);
        const data = await res.json();
        
        if (data.available) {
          setSlugStatus("available");
          setStatusMessage("Short link is available!");
        } else {
          setSlugStatus("taken");
          setStatusMessage("This short link is already taken.");
        }
      } catch (err) {
        setSlugStatus("idle");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [slug, biodata]);

  const shareUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/share/${slug || biodata?.id}`
    : "";

  const handleSave = async () => {
    if (slugStatus === "taken") {
      toast.error("Please choose a unique short link.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/user/biodata/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          biodataId: biodata.id,
          shareSlug: slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-"),
          isPublic
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update share settings");

      onUpdate(data.biodata);
      toast.success("Share settings updated!");
      setSlugStatus("idle"); // Reset status after successful save
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`Check out my marriage biodata: ${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Biodata">
      <div className="p-8 space-y-8">
        <p className="text-zinc-500 font-medium -mt-4">
          Generate a short link and share your professional biodata with others.
        </p>

        {/* Public Toggle */}
        <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
          <div className="flex gap-3">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
              isPublic ? "bg-green-100 text-green-600" : "bg-zinc-200 text-zinc-500"
            )}>
              {isPublic ? <Globe size={18} /> : <Lock size={18} />}
            </div>
            <div>
              <p className="text-sm font-black text-zinc-800">Public Access</p>
              <p className="text-[11px] text-zinc-500 font-bold">
                {isPublic ? "Anyone with the link can view" : "Only you can view"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPublic(!isPublic)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
              isPublic ? "bg-primary" : "bg-zinc-200"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                isPublic ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>

        {/* Custom Slug Input */}
        <div className="space-y-3">
          <label className="text-[11px] font-black uppercase tracking-widest text-zinc-400">Custom Short Link</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-zinc-400 select-none">
                /share/
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="rajesh-kumar"
                className={cn(
                  "w-full pl-16 pr-10 h-12 bg-white border-2 rounded-xl focus:ring-0 outline-none font-bold transition-all",
                  slugStatus === "available" ? "border-green-200 focus:border-green-500" :
                  slugStatus === "taken" ? "border-red-200 focus:border-red-500" :
                  "border-zinc-100 focus:border-primary"
                )}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {slugStatus === "checking" && <Loader2 size={16} className="animate-spin text-zinc-400" />}
                {slugStatus === "available" && <Check size={16} className="text-green-500" />}
                {slugStatus === "taken" && <AlertCircle size={16} className="text-red-500" />}
              </div>
            </div>
            <button 
              onClick={handleSave} 
              disabled={isSaving || slugStatus === "checking" || slugStatus === "taken"}
              className="h-12 px-6 rounded-xl font-black bg-zinc-900 hover:bg-zinc-800 text-white transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : "Save"}
            </button>
          </div>
          {statusMessage && (
            <p className={cn(
              "text-[10px] font-bold px-1",
              slugStatus === "available" ? "text-green-600" : "text-red-600"
            )}>
              {statusMessage}
            </p>
          )}
          <p className="text-[10px] text-zinc-400 font-bold italic px-1">
            * Letters, numbers and hyphens only
          </p>
        </div>

        {/* Share Actions */}
        <AnimatePresence>
          {isPublic && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-6 pt-6 border-t border-zinc-100"
            >
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-zinc-400">Copy Link</label>
                <div className="flex gap-2 p-1.5 bg-zinc-50 rounded-2xl border border-zinc-100 group">
                  <div className="flex-1 px-3 py-2 text-xs font-bold text-zinc-500 truncate">
                    {shareUrl}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className={cn(
                      "px-4 rounded-xl font-black text-[10px] h-8 transition-all flex items-center justify-center cursor-pointer shadow-sm",
                      copied ? "bg-green-500 text-white" : "bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50"
                    )}
                  >
                    {copied ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={shareWhatsApp}
                  className="rounded-2xl h-14 border-2 border-green-100 bg-white hover:bg-green-50 hover:border-green-200 text-green-600 flex flex-col items-center justify-center gap-1 group transition-all cursor-pointer"
                >
                  <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-tight">WhatsApp</span>
                </button>
                <button
                  onClick={shareFacebook}
                  className="rounded-2xl h-14 border-2 border-blue-100 bg-white hover:bg-blue-50 hover:border-blue-200 text-blue-600 flex flex-col items-center justify-center gap-1 group transition-all cursor-pointer"
                >
                  <Facebook size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-tight">Facebook</span>
                </button>
                <Link href={shareUrl} target="_blank" className="contents">
                  <button
                    className="rounded-2xl h-14 border-2 border-zinc-100 bg-white hover:bg-zinc-50 hover:border-zinc-200 text-zinc-600 flex flex-col items-center justify-center gap-1 group transition-all cursor-pointer"
                  >
                    <ExternalLink size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-black uppercase tracking-tight">View Page</span>
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isPublic && (
          <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Lock size={24} />
            </div>
            <div>
              <p className="text-sm font-black text-amber-900 uppercase tracking-tight">Private Link</p>
              <p className="text-xs text-amber-700 font-bold mt-1">
                You must enable "Public Access" to share this link with others.
              </p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
