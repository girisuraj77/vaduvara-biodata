"use client";

import { useState, useEffect } from "react";

import { useBuilderStore } from "@/store/builder-store";
import { translations } from "@/lib/translations";
import { FormField } from "./form-field";
import {
  User,
  Calendar,
  Ruler,
  MapPin,
  Heart,
  BookOpen,
  Briefcase,
  IndianRupee,
  Plus,
  Pencil
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ICON_MAP: Record<string, any> = {
  fullName: User,
  dob: Calendar,
  height: Ruler,
  birthPlace: MapPin,
  religion: Heart,
  caste: Heart,
  rashi: Heart,
  nakshatra: Heart,
  manglik: Heart,
  gotra: Heart,
  gan: Heart,
  blood: Heart,
  complexion: User,
  education: BookOpen,
  job: Briefcase,
  salary: IndianRupee,
  custom: Plus
};

export function StepOne() {
  const { stepFields, language, addCustomField, stepHeadings, setStepHeading } = useBuilderStore();
  const [isEditingHeading, setIsEditingHeading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const t = translations[language];
  const heading = stepHeadings[1] || t.personalDetails;

  return (
    <div className="space-y-8">
      <div className="flex justify-center group">
        {isEditingHeading ? (
          <input
            autoFocus
            type="text"
            value={heading}
            onChange={(e) => setStepHeading(1, e.target.value)}
            onBlur={() => setIsEditingHeading(false)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditingHeading(false)}
            className="font-extrabold text-[#430917] bg-transparent border-b-2 border-dashed border-[#430917]/30 outline-none w-full max-w-md text-center"
          />
        ) : (
          <div className="relative">
            <h3 className="text-xl font-extrabold text-[#430917] text-center px-8">{heading}</h3>
            <button
              onClick={() => setIsEditingHeading(true)}
              className="absolute -right-2 top-0 hover:scale-110 transition-transform cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Pencil size={18} className="text-[#CFA132]" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-y-3">
        {stepFields[1].map((field) => (
          <FormField
            key={field.id}
            id={field.id}
            stepId={1}
            labelId={field.labelId}
            isCustom={field.isCustom}
            customLabel={field.customLabel}
            icon={ICON_MAP[field.labelId] || ICON_MAP.custom}
          />
        ))}
      </div>

      <div className="pt-2 flex justify-start">
        <Button
          variant="outline"
          onClick={() => addCustomField(1)}
          className="rounded-lg border-dashed border-2 px-4 py-2 font-bold text-primary hover:bg-primary/5 gap-2 border-primary/30 w-auto cursor-pointer"
        >
          <Plus size={16} />
          {t.addCustomField}
        </Button>
      </div>
    </div>
  );
}
