"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function ImperialNikah({ data: externalData }: { data?: any }) {
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
    godPhotoUrl,
    showGodPhoto,
    biodataTitle,
    t
  } = externalData ? getTemplateData(externalData, "Muslim") : storeData;

  const isBlankDesign = externalData?.isBlankDesign || false;

  // Premium Royal Burgundy & Antique Bronze Gold Colors
  const colors = {
    bgStart: "#4A0008", // Royal Burgundy Start
    bgEnd: "#1A0002", // Dark Velvet Plum End
    gold: "#D4AF37", // Bright Gold Accent
    goldLight: "#FFE590", // Radiant Gold Highlight
    textCream: "#FFE5D0", // Warm Creamy Peach Text
    textWhite: "#FFFFFF", // High Contrast White
  };

  // Field Row Renderer
  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest text-[#FFE590] mt-0.5">
        {label}:
      </div>
      <div className="text-[13.5px] font-bold text-[#FFFFFF] leading-normal break-words">
        {value}
      </div>
    </div>
  );

  // Section Header
  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 my-1.5">
      <div className="flex-1 h-px bg-[#D4AF37]/30" />
      <div className="flex items-center gap-1.5">
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-[#FFE590]">
          <path d="M50 0 L58 35 L93 25 L65 50 L93 75 L58 65 L50 100 L42 65 L7 75 L35 50 L7 25 L42 35 Z" />
        </svg>
        <span className="text-[13px] font-black tracking-[0.25em] uppercase text-[#FFE590]">
          {title}
        </span>
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-[#FFE590]">
          <path d="M50 0 L58 35 L93 25 L65 50 L93 75 L58 65 L50 100 L42 65 L7 75 L35 50 L7 25 L42 35 Z" />
        </svg>
      </div>
      <div className="flex-1 h-px bg-[#D4AF37]/30" />
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-16 pt-16 pb-20 shrink-0 shadow-2xl"
      style={{
        background: `radial-gradient(circle at 50% 30%, ${colors.bgStart} 0%, ${colors.bgEnd} 100%)`,
        color: colors.textCream
      }}
    >
      {/* 1. DECORATIVE BURGUNDY & ANTIQUE BRONZE LATTICE LAYERS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Subtle geometric background lattice */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="burgundy-lattice" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 0,0 L 50,50 M 50,0 L 0,50" stroke={colors.gold} strokeWidth="1" />
              <rect x="22" y="22" width="6" height="6" fill={colors.gold} transform="rotate(45 25 25)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#burgundy-lattice)" />
        </svg>

        {/* Intricate Repeating Filigree Wave Border (Top) */}
        <svg className="absolute inset-x-0 top-[2px] w-full h-[40px]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="burgundy-filigree-pattern" width="58" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 0,25 Q 14,5 29,25 T 58,25 M 0,25 Q 14,40 29,25 T 58,25"
                fill="none"
                stroke={colors.gold}
                strokeWidth="1.8"
              />
              <path
                d="M 14,18 C 18,10 40,10 44,18 C 38,24 20,24 14,18 Z"
                fill={colors.gold}
                opacity="0.3"
              />
              <circle cx="29" cy="25" r="2.5" fill={colors.goldLight} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#burgundy-filigree-pattern)" />
        </svg>

        {/* Intricate Repeating Filigree Wave Border (Bottom) */}
        <svg className="absolute inset-x-0 bottom-[2px] w-full h-[40px]" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#burgundy-filigree-pattern)" className="transform rotate-180 origin-center" />
        </svg>

        {/* Double Frame Line in Bronze Gold */}
        <div 
          className="absolute inset-[15px] border pointer-events-none"
          style={{ borderColor: `${colors.gold}35` }}
        />
        <div 
          className="absolute inset-[19px] border pointer-events-none"
          style={{ borderColor: `${colors.gold}20` }}
        />

        {/* Left Side Hanging Bead Chains */}
        <svg className="absolute top-[136px] bottom-[136px] left-[11px] h-[calc(100%-272px)] w-[10px]">
          <line x1="5" y1="0" x2="5" y2="100%" stroke={colors.gold} strokeWidth="1" strokeDasharray="1 7" strokeLinecap="round" />
        </svg>

        {/* Right Side Hanging Bead Chains */}
        <svg className="absolute top-[136px] bottom-[136px] right-[11px] h-[calc(100%-272px)] w-[10px]">
          <line x1="5" y1="0" x2="5" y2="100%" stroke={colors.gold} strokeWidth="1" strokeDasharray="1 7" strokeLinecap="round" />
        </svg>
      </div>

      {/* 2. PREMIUM CONTENT AREA */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-4 mt-4">
          
          {/* Header Calligraphic Crescent Crest */}
          <div className="flex flex-col items-center text-center">
            {showGodPhoto && (
              <div className="mb-2">
                {godPhotoId === "custom" && (godPhotoUrl || storeData.godPhotoUrl) ? (
                  <img
                    src={godPhotoUrl || storeData.godPhotoUrl}
                    className="h-14 w-14 object-contain drop-shadow-md"
                    alt="Custom Symbol"
                  />
                ) : godPhotoId && godPhotoId !== "god-1" ? (
                  <img
                    src={`/images/gods/${godPhotoId}.png`}
                    className="h-14 w-14 object-contain drop-shadow-md"
                    alt="God Symbol"
                  />
                ) : (
                  /* Fallback to beautiful color-matched Crescent Moon & Star SVG */
                  <svg viewBox="0 0 100 100" className="w-13 h-13 fill-[#FFE590] drop-shadow-md">
                    <path d="M 50,15 A 35,35 0 1,0 85,50 A 28,28 0 1,1 50,22 Z" />
                    <path d="M 54,36 L 58,44 L 66,46 L 60,52 L 62,60 L 54,56 L 46,60 L 48,52 L 42,46 L 50,44 Z" fill={colors.gold} />
                  </svg>
                )}
              </div>
            )}
            
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mb-2.5 text-[#FFE590]">
              {shloka || "BISMILLAH-AR-RAHMAN-AR-RAHIM"}
            </p>
            
            <div className="flex flex-col items-center">
              <h1 className="text-3.5xl font-black uppercase tracking-[0.22em] mb-1 text-[#FFFFFF] drop-shadow-sm">
                {biodataTitle || t.biodataTitleDefault}
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-10 h-[0.5px] bg-[#D4AF37]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#FFE590]" />
                <div className="w-10 h-[0.5px] bg-[#D4AF37]" />
              </div>
            </div>
          </div>

          {/* Main Body content */}
          <div className="flex flex-col gap-4 min-h-0 py-2">
            
            {/* Section 1: Personal Details with Profile Image */}
            {personalFields.length > 0 && (
              <div className="space-y-2">
                <SectionHeader title={stepHeadings[1] || "Personal Details"} />
                
                <div className="flex gap-6 px-3 items-start">
                  {/* Personal Fields Grid */}
                  <div className="flex-1 grid grid-cols-1 gap-0.5">
                    {personalFields.map((f: any) => (
                      <FieldRow key={f.id} label={f.label} value={f.value} />
                    ))}
                  </div>

                  {/* Elegant Golden Framed Photo Box */}
                  {profilePhotoUrl && (
                    <div className="shrink-0 mt-1">
                      <div className="p-1.5 shadow-2xl relative bg-[#1A0002] border border-[#D4AF37]/45">
                        {/* Decorative golden frame corners */}
                        <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#FFE590]" />
                        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#FFE590]" />
                        <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#FFE590]" />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#FFE590]" />

                        <div className="w-[120px] h-[150px] overflow-hidden border border-[#D4AF37]/20 bg-zinc-950">
                          <img src={profilePhotoUrl} className="w-full h-full object-cover" alt="Profile" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section 2: Family Details */}
            {familyFields.length > 0 && (
              <div className="space-y-1">
                <SectionHeader title={stepHeadings[2] || "Family Details"} />
                <div className="grid grid-cols-1 gap-0.5 px-3">
                  {familyFields.map((f: any) => (
                    <FieldRow key={f.id} label={f.label} value={f.value} />
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Contact Details */}
            {contactFields.length > 0 && (
              <div className="space-y-1">
                <SectionHeader title={stepHeadings[3] || t.contactDetails} />
                <div className="grid grid-cols-1 gap-0.5 px-3">
                  {contactFields.map((f: any) => (
                    <FieldRow key={f.id} label={f.label} value={f.value} />
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer watermark space divider */}
          <div className="mt-auto pt-2 flex flex-col items-center opacity-30">
            <div className="flex items-center gap-4 w-full px-20">
              <div className="h-[0.5px] flex-1 bg-[#D4AF37]" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#FFE590]" />
              <div className="h-[0.5px] flex-1 bg-[#D4AF37]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
