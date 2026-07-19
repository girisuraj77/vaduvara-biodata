"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  User,
  FileText,
  Pencil,
  Download,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Phone,
  Calendar,
  Languages,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShareModal } from "./share-modal";

interface BiodataListProps {
  biodatas: any[];
  activePackage: any;
  onLoad: (bio: any, targetStep?: any) => void;
  onReset?: () => void;
  router: any;
}

const languageMap: Record<string, string> = {
  en: "English",
  hi: "Hindi",
  mr: "Marathi",
  gu: "Gujarati",
  kn: "Kannada",
  te: "Telugu",
  ml: "Malayalam",
  bn: "Bengali",
  ta: "Tamil",
  pa: "Punjabi"
};

export function BiodataList({ biodatas, activePackage, onLoad, onReset, router }: BiodataListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [shareBio, setShareBio] = useState<any>(null);
  const [localBiodatas, setLocalBiodatas] = useState(biodatas);
  const itemsPerPage = 16;

  const isFreeTemplate = (templateId: string) => {
    const lower = (templateId || "").toLowerCase();
    return lower === "basic_template" || lower === "basic-template" || lower === "simple_leafy" || lower === "simple-leafy";
  };

  // Keep local state in sync
  React.useEffect(() => {
    setLocalBiodatas(biodatas);
  }, [biodatas]);

  const handleUpdateBio = (updated: any) => {
    setLocalBiodatas(prev => prev.map(b => b.id === updated.id ? updated : b));
    setShareBio(updated);
  };

  const isLimitReached = activePackage && activePackage.downloadsUsed >= activePackage.downloadLimit;
  const isExpired = activePackage && new Date(activePackage.endDate) < new Date();
  const cannotDownload = !activePackage || isLimitReached || isExpired;

  // Sort biodatas by date descending (latest updated first)
  const sortedBiodatas = React.useMemo(() => {
    return [...biodatas].sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return dateB - dateA;
    });
  }, [biodatas]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedBiodatas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBiodatas = sortedBiodatas.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight">My Biodatas</h2>
          <p className="text-zinc-500 font-bold text-xs mt-0.5">Total {biodatas.length} records found</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {cannotDownload && activePackage && (
            <div className="px-3 py-2 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 animate-pulse">
              <AlertCircle size={14} className="text-red-500" />
              <p className="text-[10px] font-black text-red-700 uppercase tracking-tight">Upgrade Required</p>
            </div>
          )}
          <Button
            onClick={() => {
              onReset?.();
              router.push("/#create-biodata");
            }}
            className="rounded-xl h-11 px-6 font-black gap-2 shadow-lg shadow-primary/20 text-sm bg-primary hover:bg-primary/90 transition-all active:scale-95"
          >
            <Plus size={18} />
            New Biodata
          </Button>
        </div>
      </div>

      {biodatas.length > 0 ? (
        <div className="space-y-8">
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {currentBiodatas.map((bio) => {
                const bioData = bio.data || {};
                const name = bioData.fullName || bio.title;
                const mobile = bioData.mobile || "Not specified";
                const photo = bioData.profilePhotoUrl;
                const updatedAt = bio.updatedAt || bio.createdAt;
                const fullLanguage = languageMap[bio.language] || bio.language;
                
                const isBioFree = isFreeTemplate(bio.template);
                const canDownloadBio = !cannotDownload || isBioFree;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    key={bio.id}
                    className="group bg-white rounded-2xl border border-zinc-100 p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-primary/25 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden"
                  >
                    {/* Left: Avatar + Name + Badges */}
                    <div className="flex items-center gap-3.5 min-w-0 md:w-[260px] shrink-0">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-zinc-50 overflow-hidden relative shrink-0 shadow-inner flex items-center justify-center border border-zinc-100/80">
                        {photo ? (
                          <img 
                            src={photo} 
                            alt={name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-zinc-50 text-primary font-black text-lg animate-fade-in">
                            {name?.[0]?.toUpperCase() || "U"}
                          </div>
                        )}
                      </div>
                      
                      <div className="min-w-0">
                        <h3 className="text-[14px] md:text-[15px] font-black text-zinc-900 group-hover:text-primary transition-colors truncate tracking-tight leading-tight mb-1.5">
                          {name}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="px-1.5 py-0.5 bg-zinc-50 border border-zinc-100 rounded-lg text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                            <Languages size={10} className="text-primary shrink-0" />
                            {fullLanguage}
                          </span>
                          {isBioFree ? (
                            <span className="px-1.5 py-0.5 bg-zinc-50 border border-zinc-100 rounded-lg text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                              Free Draft
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 bg-amber-50 border border-amber-100 rounded-lg text-[9px] font-black text-amber-600 uppercase tracking-widest">
                              Premium
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Info Grid (Occupation, DOB, Native Place) */}
                    <div className="grid grid-cols-3 gap-2 md:flex md:items-center md:gap-8 flex-1 min-w-0 py-2.5 md:py-0 border-t border-b border-dashed border-zinc-100 md:border-none my-1 md:my-0">
                      <div className="flex flex-col min-w-0">
                        <span className="text-[8px] uppercase tracking-widest text-zinc-400 font-black">Occupation</span>
                        <p className="text-[11px] font-bold text-zinc-600 truncate mt-0.5">{bioData.job || "—"}</p>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[8px] uppercase tracking-widest text-zinc-400 font-black">Birth Date</span>
                        <p className="text-[11px] font-bold text-zinc-600 truncate mt-0.5">{bioData.dob || "—"}</p>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[8px] uppercase tracking-widest text-zinc-400 font-black">Native Place</span>
                        <p className="text-[11px] font-bold text-zinc-600 truncate mt-0.5">{bioData.nativePlace || bioData.birthPlace || "—"}</p>
                      </div>
                    </div>

                    {/* Right: Date & Actions */}
                    <div className="flex items-center justify-between md:justify-end gap-5 shrink-0">
                      <div className="flex flex-col md:items-end">
                        <span className="text-[8px] uppercase tracking-widest text-zinc-400 font-black md:text-right">Last Updated</span>
                        <p className="text-[10px] font-bold text-zinc-500 flex items-center gap-1 mt-0.5 md:justify-end">
                          <Calendar size={10} className="text-zinc-300" /> {formatDate(updatedAt)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => {
                            onLoad(bio);
                            router.push("/#create-biodata");
                          }}
                          title="Edit Biodata"
                          className="w-9 h-9 p-0 rounded-xl border border-zinc-200 text-zinc-600 hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all duration-200 cursor-pointer shrink-0 animate-fade-in"
                        >
                          <Pencil size={14} />
                        </Button>
                        
                        <Button
                          variant="outline"
                          onClick={() => setShareBio(bio)}
                          title="Share Biodata"
                          className="w-9 h-9 p-0 rounded-xl border border-zinc-200 text-zinc-600 hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all duration-200 cursor-pointer shrink-0 animate-fade-in"
                        >
                          <Share2 size={14} />
                        </Button>

                        {!canDownloadBio ? (
                          <Link href="/dashboard/plans" className="shrink-0">
                            <Button className="h-9 px-4 rounded-xl font-black text-[10px] tracking-wider uppercase bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 flex items-center gap-1.5 shadow-md shadow-amber-500/15 transition-all active:scale-95 duration-200 cursor-pointer animate-fade-in">
                              <AlertCircle size={12} /> Upgrade
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            onClick={() => {
                              onLoad(bio, 'preview');
                              router.push("/preview");
                            }}
                            className="h-9 px-4 rounded-xl font-black text-[10px] tracking-wider uppercase bg-primary text-white hover:bg-primary/90 flex items-center gap-1.5 shadow-md shadow-primary/20 transition-all active:scale-95 duration-200 cursor-pointer shrink-0 animate-fade-in"
                          >
                            <Download size={12} /> Get File
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Pagination Controls - PRIMARY COLOR */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8">
              <Button
                variant="ghost"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="w-10 h-10 rounded-xl p-0 hover:bg-primary/5 text-zinc-400 hover:text-primary disabled:opacity-30 transition-all"
              >
                <ChevronLeft size={20} />
              </Button>

              <div className="flex items-center gap-1.5">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={cn(
                      "w-10 h-10 rounded-xl text-[11px] font-black transition-all",
                      currentPage === i + 1
                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110"
                        : "text-zinc-400 hover:bg-primary/5 hover:text-primary"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <Button
                variant="ghost"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="w-10 h-10 rounded-xl p-0 hover:bg-primary/5 text-zinc-400 hover:text-primary disabled:opacity-30 transition-all"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] border border-zinc-100 p-20 text-center shadow-sm">
          <div className="w-20 h-20 bg-zinc-50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-zinc-100 shadow-inner">
            <FileText size={40} className="text-zinc-200" />
          </div>
          <h3 className="text-xl font-black text-zinc-900 mb-2 tracking-tight">No Biodatas Ready</h3>
          <p className="text-zinc-500 font-bold mb-10 max-w-xs mx-auto text-sm leading-relaxed">
            Start your journey by creating your first professional marriage biodata.
          </p>
          <Button
            onClick={() => {
              onReset?.();
              router.push("/#create-biodata");
            }}
            className="rounded-2xl h-14 px-10 font-black shadow-xl shadow-primary/20 text-sm bg-primary hover:bg-primary/90 transition-all active:scale-95"
          >
            Start Creating Now
          </Button>
        </div>
      )}
      <ShareModal 
        isOpen={!!shareBio}
        onClose={() => setShareBio(null)}
        biodata={shareBio}
        onUpdate={handleUpdateBio}
      />
    </motion.div>
  );
}
