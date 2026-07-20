"use client";

import { useEffect, useState, Suspense } from "react";
import { PreviewStep } from "@/components/builder/preview-step";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useBuilderStore } from "@/store/builder-store";

function PreviewContent() {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const bioId = searchParams.get("bioId");
  const isAdmin = searchParams.get("admin") === "true";
  const loadBiodata = useBuilderStore((state) => state.loadBiodata);

  useEffect(() => {
    setIsMounted(true);
    
    const initializePage = async () => {
      if (bioId && isAdmin) {
        try {
          const res = await fetch(`/api/admin/biodatas/${bioId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.biodata) {
              loadBiodata(data.biodata, "preview");
              useBuilderStore.setState({ hasActivePackage: true });
              
              // Set the grace checkout memory in localStorage expiring at midnight
              const nextMidnight = new Date();
              nextMidnight.setHours(24, 0, 0, 0);
              localStorage.setItem("vaduvara_active_purchase", JSON.stringify({
                templateId: data.biodata.template || "simple_leafy",
                expiresAt: nextMidnight.getTime()
              }));
            }
          }
        } catch (e) {
          console.error("Failed to load admin biodata", e);
        }
      }
      setLoading(false);
    };

    initializePage();
  }, [bioId, isAdmin, loadBiodata]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-[#fcfcfc] lg:overflow-hidden relative">
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center gap-6"
          >
            <div className="relative">
              <div className="w-20 h-20 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse" size={32} />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-black uppercase tracking-widest text-zinc-800">Preparing Preview</h2>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest animate-pulse">Designing your biodata...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={loading ? "invisible" : "visible"}>
        <div className="pt-8 md:pt-12 pb-6 md:pb-10">
          <PreviewStep />
        </div>
      </div>
    </main>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse" size={32} />
        </div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
