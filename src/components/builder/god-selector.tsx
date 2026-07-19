"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBuilderStore } from "@/store/builder-store";
import { X, Upload, CheckCircle2, Pencil, Check, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { godShlokas, godPhotos } from "@/lib/god-data";

const godIcons = godPhotos.map(photo => ({
  id: photo.id,
  src: photo.url,
  alt: photo.alt
}));

export function GodSelector() {
  const {
    language,
    godPhotoId,
    godPhotoUrl,
    godNames,
    biodataTitle,
    showBiodataTitle,
    showGodPhoto,
    showGodName,
    setBiodataTitle,
    setGodName,
    setGodPhoto,
    setGodPhotoUrl,
    toggleHeaderElement
  } = useBuilderStore();

  const currentShlokas = godShlokas[language] || godShlokas.en;

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const currentIcon = godPhotoId === 'custom'
    ? { src: godPhotoUrl || "" }
    : godIcons.find(icon => icon.id === godPhotoId) || godIcons[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGodPhotoUrl(reader.result as string);
        setIsGalleryOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const addShloka = () => {
    if (godNames.length < 3) {
      setGodName("", godNames.length);
      setEditingIndex(godNames.length);
    }
  };

  const removeShloka = (index: number) => {
    const newNames = godNames.filter((_, i) => i !== index);
    useBuilderStore.setState({ godNames: newNames.length > 0 ? newNames : [""] });
  };

  const galleryModal = (
    <AnimatePresence>
      {isGalleryOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsGalleryOpen(false)}
            className="fixed inset-0 bg-white/20 backdrop-blur-[8px] z-[10000] cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] md:max-h-[80vh] bg-white rounded-[2.5rem] shadow-2xl z-[10001] flex flex-col overflow-hidden pointer-events-auto"
          >
            {/* Header */}
            <div className="p-8 border-b flex items-center justify-between bg-zinc-50/50">
              <div>
                <h3 className="text-2xl font-black text-zinc-800">Religious Icons</h3>
                <p className="text-zinc-500 font-bold text-sm">Select a symbol or upload your own</p>
              </div>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="w-10 h-10 rounded-full bg-white border shadow-sm flex items-center justify-center text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                {godIcons.map((icon) => (
                  <motion.div
                    key={icon.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setGodPhoto(icon.id, godNames[0] || "");
                      setIsGalleryOpen(false);
                    }}
                    className={cn(
                      "aspect-square rounded-2xl border-2 flex items-center justify-center p-2 cursor-pointer transition-all relative group",
                      godPhotoId === icon.id
                        ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                        : "border-zinc-100 hover:border-primary/30 bg-white"
                    )}
                  >
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                    {godPhotoId === icon.id && (
                      <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full p-0.5 shadow-lg">
                        <CheckCircle2 size={14} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer / Upload */}
            <div className="p-6 border-t bg-zinc-50/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <p className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest">
                Not finding yours?
              </p>
              <div className="flex gap-3 w-full sm:w-auto">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 sm:flex-none h-12 rounded-xl px-6 font-bold gap-2 border-2"
                >
                  <Upload size={18} />
                  Upload from Local
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="flex flex-col gap-6 w-full items-center py-2">
        {/* God Photo Section - Perfect Centering */}
        <div className="flex flex-col items-center transition-all duration-300 relative">
          <div className="relative group flex items-center justify-center">
            <div className={cn(
              "w-24 h-24 relative flex items-center justify-center transition-all duration-300",
              !showGodPhoto && "opacity-40 grayscale scale-95"
            )}>
              <Image
                src={currentIcon.src}
                alt="God Icon"
                fill
                sizes="96px"
                className="object-contain"
              />
            </div>

            {/* Action Buttons - Absolute positioned to top-right */}
            <div className="absolute -right-2 top-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsGalleryOpen(true)}
                className="p-1.5 rounded-full bg-white shadow-md border border-zinc-100 text-zinc-600 hover:text-primary transition-colors cursor-pointer"
                title="Edit Icon"
              >
                <Pencil size={11} />
              </button>
              <button
                onClick={() => toggleHeaderElement('photo')}
                className="p-1.5 rounded-full bg-white shadow-md border border-zinc-100 text-zinc-600 hover:text-red-500 transition-colors cursor-pointer"
                title={showGodPhoto ? "Remove Icon" : "Show Icon"}
              >
                <X size={11} />
              </button>
            </div>
          </div>
        </div>

        {/* Shloka Section - Multiple Rows, Centered */}
        <div className="flex flex-col items-center gap-3 transition-all duration-300 w-full">
          <div className={cn(
            "flex flex-nowrap items-center justify-center gap-x-6 w-full relative group/shloka transition-all duration-300",
            !showGodName && "opacity-40 blur-[0.5px]"
          )}>
            {godNames.map((name, index) => (
              <div key={index} className="relative group flex items-center justify-center">
                {editingIndex === index ? (
                  <div className="w-full relative min-w-[200px]">
                    <input
                      autoFocus
                      type="text"
                      list={`god-shlokas-${index}`}
                      value={name}
                      onChange={(e) => setGodName(e.target.value, index)}
                      onBlur={() => setEditingIndex(null)}
                      onKeyDown={(e) => e.key === 'Enter' && setEditingIndex(null)}
                      className="w-full text-center text-xl font-bold text-[#8e44ad] bg-transparent border-b-2 border-dashed border-[#8e44ad]/30 outline-none py-1"
                    />
                    <datalist id={`god-shlokas-${index}`}>
                      {currentShlokas.map((shloka, idx) => (
                        <option key={idx} value={shloka} />
                      ))}
                    </datalist>
                  </div>
                ) : (
                  <div className="relative">
                    <h3
                      onClick={() => showGodName && setEditingIndex(index)}
                      className={cn(
                        "text-xl font-bold text-[#8e44ad] text-center cursor-pointer select-none px-4 whitespace-nowrap shrink-0",
                        !name && "italic text-zinc-300 font-normal"
                      )}
                    >
                      {name || "Add shloka"}
                    </h3>

                    {/* Action Buttons - Absolute positioned to top-right */}
                    <div className="absolute -right-2 -top-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditingIndex(index)}
                        className="p-1 rounded-full bg-white shadow-sm border border-zinc-100 text-zinc-600 hover:text-primary transition-colors cursor-pointer"
                      >
                        <Pencil size={10} />
                      </button>
                      {godNames.length > 1 && (
                        <button
                          onClick={() => removeShloka(index)}
                          className="p-1 rounded-full bg-white shadow-sm border border-zinc-100 text-zinc-600 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 size={10} />
                        </button>
                      )}
                      {index === 0 && (
                        <button
                          onClick={() => toggleHeaderElement('name')}
                          className="p-1 rounded-full bg-white shadow-sm border border-zinc-100 text-zinc-600 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <X size={10} />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Add Button - Absolute to the right to prevent shifting */}
            {godNames.length < 2 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/shloka:opacity-100 transition-opacity">
                <button
                  onClick={addShloka}
                  className="w-8 h-8 rounded-full bg-white shadow-sm border-2 border-dashed border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-primary hover:text-primary transition-all cursor-pointer"
                  title="Add another shloka"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Biodata Title Section */}
        <div className="w-full max-w-md transition-all duration-300">
          <div className="flex flex-col gap-1.5 group relative">
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[12px] font-bold text-primary uppercase tracking-wider">
                Biodata Title
              </span>
              <button
                onClick={() => toggleHeaderElement('title')}
                className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400 hover:text-primary transition-colors cursor-pointer"
              >
                <div className={cn(
                  "w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-all",
                  showBiodataTitle ? "bg-primary border-primary text-white" : "border-zinc-200"
                )}>
                  {showBiodataTitle && <Check size={10} strokeWidth={4} />}
                </div>
                INCLUDE
              </button>
            </div>
            <input
              type="text"
              disabled={!showBiodataTitle}
              value={biodataTitle}
              onChange={(e) => setBiodataTitle(e.target.value)}
              className={cn(
                "w-full h-[42px] bg-white border border-zinc-200 rounded-lg px-4 py-2.5 text-[15px] font-bold text-zinc-700 focus:border-primary outline-none transition-all shadow-sm",
                !showBiodataTitle && "opacity-40 grayscale"
              )}
              placeholder="e.g. BIODATA"
            />
          </div>
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(galleryModal, document.body)}
    </>
  );
}
