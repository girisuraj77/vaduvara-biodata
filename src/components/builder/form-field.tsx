"use client";

import { useState, useEffect } from "react";

import { useBuilderStore } from "@/store/builder-store";
import { translations } from "@/lib/translations";
import {
  Pencil,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fieldDatasets } from "@/lib/datasets";

const DATASET_MAPPING: Record<string, string> = {
  height: "height",
  blood: "bloodGroup",
  complexion: "complexion",
  rashi: "zodiacSign",
  nakshatra: "nakshatra",
  religion: "religion",
  education: "education",
  job: "occupation"
};

interface FormFieldProps {
  id: string;
  labelId: string;
  isCustom?: boolean;
  customLabel?: string;
  icon: any;
  textarea?: boolean;
  stepId: 1 | 2 | 3;
}

export function FormField({ id, labelId, isCustom, customLabel, icon: Icon, textarea, stepId }: FormFieldProps) {
  const {
    language,
    formData,
    updateField,
    updateCustomLabel,
    fieldSettings,
    toggleFieldVisibility,
    moveField,
    removeField,
    validationErrors
  } = useBuilderStore();

  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-[72px] animate-pulse bg-zinc-50 rounded-xl" />;

  const t = translations[language];
  const isIncluded = fieldSettings[id]?.include !== false;
  const placeholder = isCustom ? "..." : (t[labelId + "Placeholder"] || "...");
  const label = isCustom ? customLabel : (customLabel || t[labelId] || labelId);

  const datasetKey = DATASET_MAPPING[labelId];
  const dataset = datasetKey ? (fieldDatasets[datasetKey][language as keyof typeof fieldDatasets[string]] || fieldDatasets[datasetKey].en) : null;
  const datalistId = `datalist-${id}`;

  return (
    <motion.div
      layout
      className="flex flex-col gap-0.5 group transition-opacity duration-300"
    >
      {/* Label Row */}
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2 flex-1">
          {isEditingLabel || (isCustom && !customLabel) ? (
            <input
              autoFocus
              type="text"
              value={label}
              onChange={(e) => updateCustomLabel(id, e.target.value)}
              onBlur={() => setIsEditingLabel(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingLabel(false)}
              className="text-[15px] font-bold text-zinc-800 bg-transparent border-b border-dashed border-primary/50 focus:border-primary outline-none w-full max-w-[200px]"
              placeholder="Field Label"
            />
          ) : (
            <div className={cn("flex items-center gap-1.5", !isIncluded && "opacity-40")}>
              <label className="text-[15px] font-bold text-zinc-800">{label}</label>
              <button
                onClick={() => setIsEditingLabel(true)}
                className="hover:scale-110 transition-transform"
              >
                <Pencil size={14} className="text-[#CFA132] cursor-pointer" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isIncluded}
              onChange={() => toggleFieldVisibility(id)}
              className="w-4 h-4 rounded border-zinc-300 text-[#CFA132] focus:ring-[#CFA132] cursor-pointer"
            />
            <span className="text-[12px] font-medium text-zinc-500">
              Include in biodata
            </span>
          </div>

          {isCustom && (
            <button
              onClick={() => removeField(stepId, id)}
              className="text-zinc-300 hover:text-[#CFA132] transition-colors cursor-pointer"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      <div className={cn("flex items-center gap-3", !isIncluded && "opacity-40")}>
        <div className="relative flex-1">
          {textarea ? (
            <textarea
              value={formData[id] || ""}
              onChange={(e) => updateField(id, e.target.value)}
              placeholder={placeholder}
              rows={3}
              className={cn(
                "w-full bg-white border-2 rounded-lg px-4 py-2.5 text-[15px] outline-none transition-all resize-none text-zinc-800 shadow-sm font-bold placeholder:text-zinc-400 placeholder:font-normal",
                validationErrors[id]
                  ? "border-red-500 bg-red-50/5 focus:border-red-500 focus:ring-red-500/10"
                  : "border-zinc-300 focus:border-primary focus:ring-2 focus:ring-primary/10"
              )}
            />
          ) : (
            <>
              <input
                type="text"
                list={dataset ? datalistId : undefined}
                value={formData[id] || ""}
                onChange={(e) => updateField(id, e.target.value)}
                placeholder={placeholder}
                className={cn(
                  "w-full h-[42px] bg-white border-2 rounded-lg px-4 py-2.5 text-[15px] outline-none transition-all text-zinc-800 shadow-sm font-bold placeholder:text-zinc-400 placeholder:font-normal",
                  validationErrors[id]
                    ? "border-red-500 bg-red-50/5 focus:border-red-500 focus:ring-red-500/10"
                    : "border-zinc-300 focus:border-primary focus:ring-2 focus:ring-primary/10"
                )}
              />
              {dataset && (
                <datalist id={datalistId}>
                  {dataset.map((item, idx) => (
                    <option key={idx} value={item} />
                  ))}
                </datalist>
              )}
            </>
          )}
          {validationErrors[id] && (
            <p className="text-[12px] font-bold text-red-500 mt-1 flex items-center gap-1 animate-pulse">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500" />
              {validationErrors[id]}
            </p>
          )}

        </div>

        {/* Vertical Reordering Controls */}
        <div className="flex flex-col -gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={() => moveField(stepId, id, 'up')}
            className="w-8 h-6 hover:opacity-70 cursor-pointer flex items-center justify-center transition-all"
            title="Move field up"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M7 14l5-5 5 5H7z" fill="#430917" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => moveField(stepId, id, 'down')}
            className="w-8 h-6 hover:opacity-70 cursor-pointer flex items-center justify-center transition-all"
            title="Move field down"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M7 10l5 5 5-5H7z" fill="#430917" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
