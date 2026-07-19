"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useBuilderStore } from "@/store/builder-store";
import { cn } from "@/lib/utils";
import { ConfirmationModal } from "./confirmation-modal";

const languages = [
  { id: "en", label: "English", local: "English" },
  { id: "mr", label: "Marathi", local: "मराठी" },
  { id: "hi", label: "Hindi", local: "हिंदी" },
  { id: "kn", label: "Kannada", local: "ಕನ್ನಡ" },
  { id: "te", label: "Telugu", local: "తెలుగు" },
  { id: "ml", label: "Malayalam", local: "മലയാളം" },
  { id: "gu", label: "Gujarati", local: "ગુજરાતી" },
  { id: "bn", label: "Bengali", local: "বাংলা" },
];

export function LanguageSelector() {
  const { language, setLanguage, formData } = useBuilderStore();
  const [isMounted, setIsMounted] = useState(false);
  const [pendingLanguage, setPendingLanguage] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const hasData = Object.values(formData).some(val => val && typeof val === 'string' && val.trim() !== "");

  const handleLanguageClick = (langId: string) => {
    if (langId === language) return;

    if (hasData) {
      setPendingLanguage(langId);
    } else {
      setLanguage(langId as any);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-[13px] font-bold text-primary uppercase tracking-widest pl-1">
        Choose Your Language
      </span>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => {
          const isActive = language === lang.id;

          return (
            <motion.button
              key={lang.id}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleLanguageClick(lang.id)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-[13px] font-bold transition-all border-2 cursor-pointer",
                isActive
                  ? "bg-primary border-primary text-white shadow-md shadow-primary/10"
                  : "bg-white border-zinc-100 text-zinc-600 hover:border-primary/30 hover:text-primary"
              )}
            >
              <span>{lang.local}</span>
            </motion.button>
          );
        })}
      </div>

      <ConfirmationModal
        isOpen={!!pendingLanguage}
        onClose={() => setPendingLanguage(null)}
        onConfirm={() => {
          if (pendingLanguage) {
            setLanguage(pendingLanguage as any);
            setPendingLanguage(null);
          }
        }}
        title="Change Language?"
        message="Changing the language may affect how your existing data is displayed. Are you sure you want to proceed?"
        confirmText="Yes, Change Language"
        cancelText="Stay on Current"
      />
    </div>
  );
}
