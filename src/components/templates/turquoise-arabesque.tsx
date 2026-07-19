"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function TurquoiseArabesque({ data: externalData }: { data?: any }) {
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

  // Premium Persian Turquoise, Ivory & Gold Colors
  const colors = {
    bg: "#FAF6EB", // Creamy Sandy Ivory Paper
    turquoise: "#115E59", // Deep Persian Turquoise / Teal
    turquoiseLight: "#2DD4BF", // Bright Turquoise Highlight
    gold: "#D4AF37", // Elegant Metallic Gold
    goldLight: "#FFE590", // Soft Bright Starlight Gold
    textDark: "#2B1E10", // Elegant dark wood brown
  };

  // Repeating 8-Point Islamic Star Tile Component
  const StarTile = ({ style }: { style?: React.CSSProperties }) => (
    <svg viewBox="0 0 100 100" style={{ width: "26px", height: "26px", ...style }} className="shrink-0 pointer-events-none">
      {/* Outer Golden 8-point star */}
      <g transform="translate(50,50) scale(0.95)">
        <rect x="-42" y="-42" width="84" height="84" fill={colors.gold} />
        <rect x="-42" y="-42" width="84" height="84" fill={colors.gold} transform="rotate(45)" />
        
        {/* Inner Turquoise star */}
        <rect x="-34" y="-34" width="68" height="68" fill={colors.turquoise} />
        <rect x="-34" y="-34" width="68" height="68" fill={colors.turquoise} transform="rotate(45)" />
        
        {/* Center gold dot */}
        <circle cx="0" cy="0" r="10" fill={colors.goldLight} />
        {/* Internal micro star details */}
        <polygon points="0,-6 1.8,-1.8 6,-1.8 2.6,0.6 3.8,4.8 0,2.4 -3.8,4.8 -2.6,0.6 -6,-1.8 -1.8,-1.8" fill={colors.turquoise} />
      </g>
    </svg>
  );

  // Field Row Renderer
  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-1 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest text-[#115E59] mt-0.5">
        {label}:
      </div>
      <div className="text-[13.5px] font-bold text-[#2B1E10] leading-normal break-words">
        {value}
      </div>
    </div>
  );

  // Section Header
  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 my-1.5">
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.turquoise }} />
      <div className="flex items-center gap-1.5">
        <StarTile style={{ width: "16px", height: "16px" }} />
        <span className="text-[13px] font-black tracking-[0.25em] uppercase text-[#115E59]">
          {title}
        </span>
        <StarTile style={{ width: "16px", height: "16px" }} />
      </div>
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.turquoise }} />
    </div>
  );

  const numHorizontal = 20; // top/bottom tiles
  const numVertical = 28; // side tiles

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-16 pt-16 pb-20 shrink-0 shadow-2xl"
      style={{
        backgroundColor: colors.bg,
        color: colors.textDark
      }}
    >
      {/* 1. DECORATIVE PERSIAN GEOMETRIC BORDERS & STAR TILES */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Solid 3px turquoise border around the page */}
        <div 
          className="absolute inset-[3px] border-[3px] pointer-events-none"
          style={{ borderColor: colors.turquoise }}
        />
        
        {/* Double gold inside frame line */}
        <div 
          className="absolute inset-[10px] border border-[#D4AF37]/35 pointer-events-none"
        />

        {/* Top border repeating star tiles */}
        <div className="absolute top-[13px] left-[13px] right-[13px] flex justify-between px-2">
          {[...Array(numHorizontal)].map((_, i) => (
            <StarTile key={`top-${i}`} />
          ))}
        </div>

        {/* Bottom border repeating star tiles */}
        <div className="absolute bottom-[13px] left-[13px] right-[13px] flex justify-between px-2">
          {[...Array(numHorizontal)].map((_, i) => (
            <StarTile key={`bottom-${i}`} />
          ))}
        </div>

        {/* Left border repeating star tiles */}
        <div className="absolute top-[48px] bottom-[48px] left-[13px] flex flex-col justify-between py-2">
          {[...Array(numVertical)].map((_, i) => (
            <StarTile key={`left-${i}`} />
          ))}
        </div>

        {/* Right border repeating star tiles */}
        <div className="absolute top-[48px] bottom-[48px] right-[13px] flex flex-col justify-between py-2">
          {[...Array(numVertical)].map((_, i) => (
            <StarTile key={`right-${i}`} />
          ))}
        </div>
      </div>

      {/* 2. PREMIUM CONTENT AREA */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-4 mt-2">
          
          {/* Header Calligraphic Crescent Star Crest */}
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
                  <svg viewBox="0 0 100 100" className="w-13 h-13 fill-[#115E59] drop-shadow-md">
                    <path d="M 50,15 A 35,35 0 1,0 85,50 A 28,28 0 1,1 50,22 Z" />
                    <path d="M 54,36 L 58,44 L 66,46 L 60,52 L 62,60 L 54,56 L 46,60 L 48,52 L 42,46 L 50,44 Z" fill={colors.gold} />
                  </svg>
                )}
              </div>
            )}
            
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mb-2.5 text-[#115E59]">
              {shloka || "BISMILLAH-AR-RAHMAN-AR-RAHIM"}
            </p>
            
            <div className="flex flex-col items-center">
              <h1 className="text-3.5xl font-black uppercase tracking-[0.22em] mb-1 text-[#115E59] drop-shadow-sm">
                {biodataTitle || t.biodataTitleDefault}
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-10 h-[0.5px] bg-[#D4AF37]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#115E59]" />
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
                      <div className="p-1.5 shadow-xl relative bg-white border border-[#115E59]/30">
                        {/* Decorative golden frame corners */}
                        <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37]" />
                        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37]" />
                        <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37]" />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37]" />

                        <div className="w-[120px] h-[150px] overflow-hidden border border-[#115E59]/15 bg-zinc-50">
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
              <div className="w-1.5 h-1.5 rotate-45 border border-[#115E59]" />
              <div className="h-[0.5px] flex-1 bg-[#D4AF37]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
