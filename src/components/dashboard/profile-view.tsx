"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Lock,
  Camera,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Image as ImageIcon,
  Upload
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PasswordModal } from "./password-modal";
import { useSession } from "next-auth/react";

interface ProfileViewProps {
  session: any;
}

export function ProfileView({ session: initialSession }: ProfileViewProps) {
  const { data: session, update: updateSession } = useSession();

  // Profile State
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState("");
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Fetch latest details on mount
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch("/api/user/profile");
        const data = await res.json();
        if (res.ok) {
          setName(data.name || "");
          setMobile(data.mobile || "");
          setImage(data.image || "");
        }
      } catch (err) {
        console.error("Fetch Details Error:", err);
      } finally {
        setIsLoadingDetails(false);
      }
    };
    fetchDetails();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64, fileName: file.name }),
        });
        const data = await res.json();
        if (res.ok) {
          setImage(data.url);
          toast.success("Image uploaded!");
        } else {
          toast.error(data.error || "Upload failed");
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      toast.error("Upload error");
      setIsUploading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        body: JSON.stringify({ name, mobile, image }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated successfully!");
        // Update session locally
        await updateSession({
          name: data.user.name,
          image: data.user.image,
          mobile: data.user.mobile,
        });
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  if (isLoadingDetails) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-8 pb-24"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Profile Settings</h2>
          <p className="text-zinc-500 font-bold text-sm">Manage your personal information and account security.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Main Profile Card */}
        <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-xl overflow-hidden">
          {/* Cover/Top Section */}
          <div className="h-32 bg-primary/5 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
          </div>

          <div className="px-8 pb-10 relative">
            {/* Avatar Section */}
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 mb-10">
              <div className="relative group">
                <div className="w-32 h-32 rounded-[2.5rem] bg-white p-1 shadow-2xl">
                  <div className="w-full h-full rounded-[2.3rem] bg-zinc-50 overflow-hidden border-2 border-white relative">
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                        <Loader2 className="animate-spin text-white" size={24} />
                      </div>
                    )}
                    {image ? (
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary text-white text-4xl font-black">
                        {name?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                </div>
                <label className="absolute bottom-1 right-1 w-10 h-10 bg-zinc-900 rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform hover:bg-primary">
                  <Camera size={18} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              <div className="flex-1 space-y-1 mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-zinc-900">{name || "Anonymous User"}</h3>
                  <div className="px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-green-100">
                    <ShieldCheck size={10} /> Verified Account
                  </div>
                </div>
                <p className="text-zinc-400 font-bold text-sm flex items-center gap-1.5">
                  <Mail size={14} className="text-zinc-300" /> {session?.user?.email}
                </p>
              </div>
            </div>

            {/* Forms Section */}
            <form onSubmit={handleUpdateProfile} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1 flex items-center gap-2">
                    <User size={14} className="text-primary" /> Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-50 px-5 py-4 rounded-2xl border border-zinc-100 text-sm font-black text-zinc-700 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1 flex items-center gap-2">
                    <Smartphone size={14} className="text-primary" /> Mobile Number
                  </label>
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full bg-zinc-50 px-5 py-4 rounded-2xl border border-zinc-100 text-sm font-black text-zinc-700 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                    placeholder="Enter mobile number"
                  />
                </div>

              </div>

              <div className="pt-4 flex flex-col md:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isUpdatingProfile || isUploading}
                  className="flex-1 rounded-2xl font-black h-14 bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm px-6 py-4 cursor-pointer disabled:opacity-50"
                >
                  {isUpdatingProfile ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle2 size={20} />}
                  Save Profile Changes
                </button>

                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="rounded-2xl font-black h-14 bg-white border-2 border-zinc-200 text-zinc-900 hover:bg-zinc-50 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm px-8 py-4 cursor-pointer"
                >
                  <Lock size={18} />
                  Security Code
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>

      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </motion.div>
  );
}
