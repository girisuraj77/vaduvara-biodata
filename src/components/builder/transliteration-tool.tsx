"use client";

import { useState } from "react";
import { Copy, Trash2, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TransliterationTool() {
  const [inputText, setInputText] = useState("");
  const [lastCopied, setLastCopied] = useState(false);

  const handleCopy = () => {
    if (inputText) {
      navigator.clipboard.writeText(inputText);
      setLastCopied(true);
      setTimeout(() => setLastCopied(false), 2000);
    }
  };

  return (
    <div className="mt-16 p-8 bg-zinc-50/50 rounded-3xl border border-zinc-100 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Languages size={20} />
        </div>
        <div>
          <h4 className="font-bold text-zinc-800">Transliteration Tool</h4>
          <p className="text-[13px] text-zinc-500 font-medium">Type in English and get text in your selected language.</p>
        </div>
      </div>

      <div className="space-y-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="English मध्ये टाइप करा (Type in English...)"
          rows={3}
          className="w-full bg-white border-2 border-zinc-200 rounded-2xl px-6 py-4 text-[16px] font-medium focus:border-primary outline-none transition-all placeholder:text-zinc-300"
        />
        
        <div className="flex gap-3">
          <Button
            onClick={handleCopy}
            disabled={!inputText}
            variant="outline"
            className="flex-1 rounded-xl h-12 font-bold gap-2 border-2"
          >
            <Copy size={18} />
            {lastCopied ? "Copied!" : "Copy Text"}
          </Button>
          <Button
            onClick={() => setInputText("")}
            disabled={!inputText}
            variant="ghost"
            className="rounded-xl h-12 px-6 font-bold text-zinc-400 hover:text-primary hover:bg-primary/5 transition-all"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
