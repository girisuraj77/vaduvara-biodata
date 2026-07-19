"use client";

import { useState, useEffect, useCallback } from "react";
import { useBuilderStore } from "@/store/builder-store";
import { translations } from "@/lib/translations";
import { Copy, Languages, Loader2, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function TransliterationSidebar() {
  const { language } = useBuilderStore();
  const t = translations[language];

  const [isMounted, setIsMounted] = useState(false);
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Map language code to Google ITC (Input Tool Code)
  const getITC = (lang: string) => {
    switch (lang) {
      case "mr": return "mr-t-i0-und";
      case "hi": return "hi-t-i0-und";
      case "gu": return "gu-t-i0-und";
      case "kn": return "kn-t-i0-und";
      case "te": return "te-t-i0-und";
      case "ml": return "ml-t-i0-und";
      case "bn": return "bn-t-i0-und";
      default: return "";
    }
  };

  const fetchSuggestions = useCallback(async (text: string) => {
    if (!text || text.length < 3 || language === 'en') {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const itc = getITC(language);
      const url = `https://inputtools.google.com/request?text=${encodeURIComponent(text)}&itc=${itc}&num=5&cp=0&cs=1&ie=utf-8&oe=utf-8&app=test`;

      const response = await fetch(url);
      const data = await response.json();

      if (data[0] === "SUCCESS") {
        setSuggestions(data[1][0][1]);
      }
    } catch (error) {
      console.error("Transliteration Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  useEffect(() => {
    if (inputText.length < 3) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchSuggestions(inputText);
    }, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [inputText, fetchSuggestions]);

  const handleCopy = (word: string, index: number) => {
    navigator.clipboard.writeText(word);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 flex flex-col gap-6"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Languages size={20} />
        </div>
        <div>
          <h4 className="font-bold text-zinc-800">{t.transliterationTitle}</h4>
          <p className="text-[12px] text-zinc-500 font-medium">{t.transliterationSub}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative group/search">
          <div className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors",
            inputText.length >= 3 && "text-primary"
          )}>
            <Languages size={18} />
          </div>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type in English..."
            className="w-full bg-white border-2 border-zinc-100 rounded-xl pl-11 pr-11 py-3 text-[14px] font-bold text-zinc-700 focus:border-primary outline-none transition-all placeholder:text-zinc-300"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {isLoading && (
              <Loader2 size={16} className="animate-spin text-primary" />
            )}
            {inputText && (
              <button
                onClick={() => setInputText("")}
                className="p-1 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-all cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 min-h-[100px]">
          <AnimatePresence>
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => handleCopy(suggestion, index)}
                className="group flex items-center justify-between py-2 px-3 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-primary/30 hover:bg-white transition-all text-left cursor-pointer"
              >
                <span className="text-[14px] font-bold text-zinc-700 group-hover:text-primary transition-colors">
                  {suggestion}
                </span>
                {copiedIndex === index ? (
                  <CheckCircle2 size={16} className="text-green-500" />
                ) : (
                  <Copy size={14} className="text-zinc-300 group-hover:text-primary transition-colors" />
                )}
              </motion.button>
            ))}
          </AnimatePresence>

          {inputText.length > 0 && inputText.length < 3 && !isLoading && (
            <div className="flex flex-col items-center justify-center py-6 text-zinc-400 gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Type {3 - inputText.length} more letters...</span>
            </div>
          )}

          {!inputText && !isLoading && (
            <div className="flex flex-col items-center justify-center py-10 text-zinc-300 gap-2">
              <Languages size={32} strokeWidth={1.5} />
              <span className="text-[13px] font-medium italic">Start typing...</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-50">
        <p className="text-[11px] text-zinc-400 font-medium text-center">
          Suggestions appear instantly in {t.personalDetails?.split(' ')[0] || 'local language'}. Click to copy.
        </p>
      </div>
    </motion.div>
  );
}
