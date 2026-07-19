"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";
import { cn } from "@/lib/utils";

export function ModernTeal({ data: externalData }: { data?: any }) {
  const storeData = useTemplateData();
  const {
    formData,
    shloka,
    stepHeadings,
    profilePhotoUrl,
    personalFields,
    familyFields,
    contactFields,
    godPhotoId,
    biodataTitle,
    t
  } = externalData ? getTemplateData(externalData, "Hindu") : storeData;

  const isBlankDesign = externalData?.isBlankDesign || false;

  // Modern Teal Theme Colors
  const colors = {
    bg: "#61979E",
    border: "#FFFFFF",
    primary: "#FFFFFF",
    accent: "#E2F1F3",
    text: "#FFFFFF",
    label: "#E2F1F3",
  };

  const FieldRow = ({ label, value }: { label: string, value: string }) => (
    <div className="grid grid-cols-[160px_1fr] gap-x-4 pb-0.5 items-start">
      <div className="text-[10px] font-black uppercase tracking-widest text-accent mt-0.5 opacity-80">
        {label}:
      </div>
      <div className="text-[13px] font-bold text-white leading-tight break-words">
        {value}
      </div>
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-16 pt-16 pb-15 shrink-0 shadow-2xl"
      style={{
        backgroundColor: colors.bg,
        color: colors.text
      }}
    >
      {/* 1. DECORATIVE BORDER (SVG) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Main Double Border */}
        <div className="absolute inset-8 border-[1px] border-white/40" />
        <div className="absolute inset-10 border-[1.5px] border-white/60" />

        {/* Corner Ornaments */}
        <div className="absolute top-6 left-6 w-20 h-20 text-white/80">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10,40 Q10,10 40,10 M15,35 Q15,15 35,15" />
            <circle cx="10" cy="45" r="1.5" fill="currentColor" />
            <circle cx="45" cy="10" r="1.5" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute top-6 right-6 w-20 h-20 text-white/80 rotate-90">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10,40 Q10,10 40,10 M15,35 Q15,15 35,15" />
          </svg>
        </div>
        <div className="absolute bottom-6 left-6 w-20 h-20 text-white/80 -rotate-90">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10,40 Q10,10 40,10 M15,35 Q15,15 35,15" />
          </svg>
        </div>
        <div className="absolute bottom-6 right-6 w-20 h-20 text-white/80 rotate-180">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10,40 Q10,10 40,10 M15,35 Q15,15 35,15" />
          </svg>
        </div>
      </div>

      {/* 2. CONTENT AREA - Balanced spacing */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-6">
          <div className="flex flex-col items-center text-center pt-2">
            <div className="mb-4">
              <div className="h-14 w-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center p-2 border border-white/20 shadow-lg">
                <img
                  src={`/images/gods/${godPhotoId || 'god-1'}.png`}
                  className="h-full w-full object-contain"
                  alt="God Symbol"
                />
              </div>
            </div>
            <p className="text-[14px] font-black uppercase tracking-[0.4em] mb-4 text-accent opacity-80">
              {shloka}
            </p>
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-black uppercase tracking-[0.25em] mb-1 text-white">
                {biodataTitle || t.biodataTitleDefault}
              </h1>
              <div className="h-0.5 w-24 bg-white/40 rounded-full" />
            </div>
          </div>

          {/* Main Body */}
          <div className="flex flex-col gap-6 min-h-0 py-5">

            {/* Personal Details */}
            {personalFields.length > 0 && (
              <div className="space-y-3 pt-2">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4">
                  <span className="h-px flex-1 bg-white/20" />
                  <span className="text-white">{stepHeadings[1] || "Personal Details"}</span>
                  <span className="h-px flex-1 bg-white/20" />
                </h2>

                <div className="flex gap-6 px-4 items-start">
                  <div className="flex-1 grid grid-cols-1 gap-1">
                    {personalFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                  </div>

                  {profilePhotoUrl && (
                    <div className="shrink-0 mt-1">
                      <div className="relative">
                        <div className="absolute inset-0 border border-white/20 translate-x-1 translate-y-1" />
                        <div className="w-[120px] h-[150px] bg-white/10 backdrop-blur-sm border border-white/40 p-1 shadow-2xl relative z-10">
                          <div className="w-full h-full overflow-hidden">
                            <img src={profilePhotoUrl} className="w-full h-full object-cover" alt="Profile" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Family Details */}
            {familyFields.length > 0 && (
              <div className="space-y-3 pt-4">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4">
                  <span className="h-px flex-1 bg-white/20" />
                  <span className="text-white">{stepHeadings[2] || "Family Details"}</span>
                  <span className="h-px flex-1 bg-white/20" />
                </h2>
                <div className="grid grid-cols-1 gap-1 px-4">
                  {familyFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                </div>
              </div>
            )}

            {/* Contact Details */}
            {contactFields.length > 0 && (
              <div className="space-y-3 pt-4">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4">
                  <span className="h-px flex-1 bg-white/20" />
                  <span className="text-white">{stepHeadings[3] || t.contactDetails}</span>
                  <span className="h-px flex-1 bg-white/20" />
                </h2>
                <div className="grid grid-cols-1 gap-1 px-4">
                  {contactFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                </div>
              </div>
            )}

          </div>
          
          <div className="pt-4 flex flex-col items-center opacity-30">
            <div className="flex items-center gap-4 w-full px-20">
              <div className="h-px flex-1 bg-white" />
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <div className="h-px flex-1 bg-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
