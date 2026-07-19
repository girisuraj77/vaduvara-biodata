"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";
import { cn } from "@/lib/utils";

export function RoyalGold({ data: externalData }: { data?: any }) {
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

  // Royal Gold Theme Colors
  const colors = {
    bg: "#FFFFFF",
    primary: "#B8860B", // Dark Goldenrod
    secondary: "#8B4513", // Saddle Brown
    accent: "#D4AF37", // Gold
    text: "#2D2D2D",
    label: "#8B4513",
  };

  const FieldRow = ({ label, value }: { label: string, value: string }) => (
    <div className="grid grid-cols-[160px_1fr] gap-x-4 pb-0.5 items-start">
      <div className="text-[10.5px] font-black uppercase tracking-widest text-[#B8860B] mt-0.5 opacity-90">
        {label}:
      </div>
      <div className="text-[13.5px] font-bold text-[#2D2D2D] leading-tight break-words">
        {value}
      </div>
    </div>
  );

  const MandalaUnit = () => (
    <svg viewBox="0 0 100 100" className="w-10 h-10 text-[#D4AF37] opacity-80">
      <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M50,10 Q60,30 50,50 Q40,30 50,10" fill="currentColor" />
      <path d="M50,90 Q60,70 50,50 Q40,70 50,90" fill="currentColor" />
      <path d="M10,50 Q30,40 50,50 Q30,60 10,50" fill="currentColor" />
      <path d="M90,50 Q70,40 50,50 Q70,60 90,50" fill="currentColor" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
    </svg>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-20 pt-20 pb-24 shrink-0 shadow-2xl"
      style={{ backgroundColor: colors.bg }}
    >
      {/* 1. REPEATING MANDALA BORDER */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Top Border */}
        <div className="absolute top-0 left-0 right-0 flex justify-around p-4">
          {[...Array(16)].map((_, i) => <MandalaUnit key={`t-${i}`} />)}
        </div>
        {/* Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around p-4 rotate-180">
          {[...Array(16)].map((_, i) => <MandalaUnit key={`b-${i}`} />)}
        </div>
        {/* Left Border */}
        <div className="absolute top-12 bottom-12 left-0 flex flex-col justify-around p-2">
          {[...Array(20)].map((_, i) => (
            <div key={`l-${i}`} className="-rotate-90">
              <MandalaUnit />
            </div>
          ))}
        </div>
        {/* Right Border */}
        <div className="absolute top-12 bottom-12 right-0 flex flex-col justify-around p-2">
          {[...Array(20)].map((_, i) => (
            <div key={`r-${i}`} className="rotate-90">
              <MandalaUnit />
            </div>
          ))}
        </div>
      </div>

      {/* 2. CONTENT AREA - Balanced spacing */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <img
                src={`/images/gods/${godPhotoId || 'god-1'}.png`}
                className="h-14 w-14 object-contain"
                alt="God Symbol"
              />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 text-[#8B4513] opacity-70">
              {shloka}
            </p>
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-black uppercase tracking-[0.25em] mb-1 text-[#8B0000]">
                {biodataTitle || t.biodataTitleDefault}
              </h1>
              <div className="flex items-center gap-4">
                <div className="h-0.5 w-12 bg-[#D4AF37]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
                <div className="h-0.5 w-12 bg-[#D4AF37]" />
              </div>
            </div>
          </div>

          {/* Main Body */}
          <div className="flex flex-col gap-6 min-h-0 py-4">

            {/* Personal Details */}
            {personalFields.length > 0 && (
              <div className="space-y-3 pt-2">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4 text-[#8B0000]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  {stepHeadings[1] || "Personal Details"}
                  <div className="h-px flex-1 bg-[#D4AF37]/30" />
                </h2>

                <div className="flex gap-8 px-6 items-start">
                  <div className="flex-1 grid grid-cols-1 gap-1">
                    {personalFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                  </div>

                  {profilePhotoUrl && (
                    <div className="shrink-0">
                      <div className="p-1 border-2 border-[#D4AF37] bg-white shadow-xl">
                        <div className="w-[120px] h-[150px] overflow-hidden border border-zinc-100">
                          <img src={profilePhotoUrl} className="w-full h-full object-cover" alt="Profile" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Family Details */}
            {familyFields.length > 0 && (
              <div className="space-y-3 pt-6">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4 text-[#8B0000]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  {stepHeadings[2] || "Family Details"}
                  <div className="h-px flex-1 bg-[#D4AF37]/30" />
                </h2>
                <div className="grid grid-cols-1 gap-1 px-6">
                  {familyFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                </div>
              </div>
            )}

            {/* Contact Details */}
            {contactFields.length > 0 && (
              <div className="space-y-3 pt-6">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4 text-[#8B0000]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  {stepHeadings[3] || t.contactDetails}
                  <div className="h-px flex-1 bg-[#D4AF37]/30" />
                </h2>
                <div className="grid grid-cols-1 gap-1 px-6">
                  {contactFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                </div>
              </div>
            )}

          </div>
          
          {/* Footer */}
          <div className="mt-auto flex justify-center opacity-10 py-2">
            <MandalaUnit />
          </div>
        </div>
      )}
    </div>
  );
}
