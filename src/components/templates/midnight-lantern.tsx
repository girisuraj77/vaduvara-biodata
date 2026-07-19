"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function MidnightLantern({ data: externalData }: { data?: any }) {
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

  // Premium Midnight Blue & Rose Gold Colors
  const colors = {
    bgStart: "#0B132B", // Deep Midnight Blue Start
    bgEnd: "#020614", // Velvet Dark Indigo End
    roseGold: "#E5A99E", // Radiant Metallic Rose Gold
    roseLight: "#FFF0ED", // Luminous Rose Gold Highlight
    textCream: "#FFF0E0", // Warm Peach-Cream Text
    textWhite: "#FFFFFF", // High Contrast White
  };

  // Sparkle Diamond Accent (✦)
  const Sparkle = ({ style, className }: { style?: React.CSSProperties; className?: string }) => (
    <svg viewBox="0 0 100 100" style={{ width: "16px", height: "16px", ...style }} className={className}>
      <path d="M 50,0 C 50,35 65,50 100,50 C 65,50 50,65 50,100 C 50,65 35,50 0,50 C 35,50 50,35 50,0 Z" fill={colors.roseLight} />
    </svg>
  );

  // Traditional Hanging Rose Gold Lantern Component
  const HangingLantern = ({ x, y }: { x: number; y: number }) => (
    <g transform={`translate(${x}, ${y})`} className="opacity-90">
      {/* Hanging Chain */}
      <line x1="0" y1="0" x2="0" y2="50" stroke={colors.roseGold} strokeWidth="1.2" strokeDasharray="1 3" />
      
      {/* Dome Top */}
      <path d="M -14,50 C -14,38 14,38 14,50 Z" fill={colors.roseGold} />
      <path d="M -10,50 C -10,42 10,42 10,50 Z" fill={colors.bgStart} />

      {/* Body Frame */}
      <rect x="-12" y="50" width="24" height="28" fill="none" stroke={colors.roseGold} strokeWidth="1.8" rx="2" />
      <line x1="-12" y1="50" x2="12" y2="78" stroke={colors.roseGold} strokeWidth="0.8" opacity="0.6" />
      <line x1="12" y1="50" x2="-12" y2="78" stroke={colors.roseGold} strokeWidth="0.8" opacity="0.6" />
      <circle cx="0" cy="64" r="4.5" fill={colors.roseLight} opacity="0.85" />

      {/* Bottom Cap & Tassel */}
      <path d="M -12,78 L 0,91 L 12,78 Z" fill={colors.roseGold} />
      <line x1="0" y1="91" x2="0" y2="105" stroke={colors.roseGold} strokeWidth="1.2" />
      <circle cx="0" cy="108" r="2.5" fill={colors.roseGold} />
    </g>
  );

  // Field Row Renderer
  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest text-[#E5A99E] mt-0.5">
        {label}:
      </div>
      <div className="text-[13.5px] font-medium text-[#FFFFFF] leading-normal break-words">
        {value}
      </div>
    </div>
  );

  // Section Header
  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 my-1.5">
      <div className="flex-1 h-px bg-[#E5A99E]/35" />
      <div className="flex items-center gap-1.5">
        <Sparkle style={{ width: "10px", height: "10px" }} />
        <span className="text-[13px] font-black tracking-[0.25em] uppercase text-[#E5A99E]">
          {title}
        </span>
        <Sparkle style={{ width: "10px", height: "10px" }} />
      </div>
      <div className="flex-1 h-px bg-[#E5A99E]/35" />
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-14 pt-14 pb-14 shrink-0 shadow-2xl"
      style={{
        background: `radial-gradient(circle at 50% 30%, ${colors.bgStart} 0%, ${colors.bgEnd} 100%)`,
        color: colors.textCream
      }}
    >
      {/* 1. DECORATIVE MIDNIGHT BACKDROP & GLOWING LANTERNS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Soft Spotlight Rays */}
        <div 
          className="absolute -top-10 -left-10 w-[320px] h-[320px] rounded-full opacity-20 blur-[90px]"
          style={{ background: `radial-gradient(circle, ${colors.roseLight} 0%, transparent 70%)` }}
        />
        <div 
          className="absolute -top-10 -right-10 w-[320px] h-[320px] rounded-full opacity-20 blur-[90px]"
          style={{ background: `radial-gradient(circle, ${colors.roseLight} 0%, transparent 70%)` }}
        />
        <div 
          className="absolute bottom-[-120px] left-[100px] right-[100px] h-[220px] opacity-15 blur-[70px]"
          style={{ background: `radial-gradient(circle, ${colors.roseLight} 0%, transparent 70%)` }}
        />

        {/* Diagonal Sparkling Wave (deterministic to avoid hydration mismatch) */}
        <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M -10,800 Q 200,680 400,750 T 810,580" 
            fill="none" 
            stroke={colors.roseGold} 
            strokeWidth="1.2" 
            strokeDasharray="4 8"
          />
          
          {(() => {
            const getPseudoRandom = (seed: number) => {
              const x = Math.sin(seed) * 10000;
              return x - Math.floor(x);
            };

            return [...Array(50)].map((_, i) => {
              const t = i / 49;
              const x = t * 814 - 10;
              const y = 780 - 220 * t + 80 * Math.sin(t * Math.PI * 2) + (getPseudoRandom(i) - 0.5) * 35;
              const size = getPseudoRandom(i + 100) * 1.8 + 0.8;
              return (
                <circle 
                  key={i} 
                  cx={x} 
                  cy={y} 
                  r={size} 
                  fill={i % 2 === 0 ? colors.roseLight : colors.roseGold} 
                  opacity={getPseudoRandom(i + 200) * 0.6 + 0.3} 
                />
              );
            });
          })()}
        </svg>

        {/* Ornate Hanging Lanterns */}
        <svg className="absolute inset-0 w-full h-full">
          <HangingLantern x={105} y={0} />
          <HangingLantern x={689} y={0} />
        </svg>

        {/* Double border frame lines in rose gold */}
        <div 
          className="absolute inset-[15px] border pointer-events-none"
          style={{ borderColor: `${colors.roseGold}20` }}
        />
        <div 
          className="absolute inset-[19px] border pointer-events-none"
          style={{ borderColor: `${colors.roseGold}15` }}
        />
        
        {/* Sleek star corners */}
        <Sparkle style={{ position: "absolute", top: "11px", left: "11px", width: "10px", height: "10px" }} />
        <Sparkle style={{ position: "absolute", top: "11px", right: "11px", width: "10px", height: "10px" }} />
        <Sparkle style={{ position: "absolute", bottom: "11px", left: "11px", width: "10px", height: "10px" }} />
        <Sparkle style={{ position: "absolute", bottom: "11px", right: "11px", width: "10px", height: "10px" }} />
      </div>

      {/* 2. PREMIUM CONTENT AREA */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-4 mt-4">
          
          {/* Header calligraphic Crescent star crest */}
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
                  <svg viewBox="0 0 100 100" className="w-13 h-13 fill-[#E5A99E] drop-shadow-md">
                    <path d="M 50,15 A 35,35 0 1,0 85,50 A 28,28 0 1,1 50,22 Z" />
                    <path d="M 54,36 L 58,44 L 66,46 L 60,52 L 62,60 L 54,56 L 46,60 L 48,52 L 42,46 L 50,44 Z" fill={colors.roseLight} />
                  </svg>
                )}
              </div>
            )}
            
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mb-2.5 text-[#E5A99E]">
              {shloka || "BISMILLAH-AR-RAHMAN-AR-RAHIM"}
            </p>
            
            <div className="flex flex-col items-center">
              <h1 className="text-3.5xl font-black uppercase tracking-[0.22em] mb-1 text-[#FFFFFF] drop-shadow-sm">
                {biodataTitle || t.biodataTitleDefault}
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-10 h-[0.5px] bg-[#E5A99E]" />
                <Sparkle style={{ width: "8px", height: "8px" }} />
                <div className="w-10 h-[0.5px] bg-[#E5A99E]" />
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
                      <div className="p-1.5 shadow-2xl relative bg-[#020614] border border-[#E5A99E]/45">
                        {/* Decorative golden frame corners */}
                        <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#FFF0ED]" />
                        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#FFF0ED]" />
                        <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#FFF0ED]" />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#FFF0ED]" />

                        <div className="w-[120px] h-[150px] overflow-hidden border border-[#E5A99E]/20 bg-zinc-950">
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
          <div className="mt-auto pt-2 flex flex-col items-center opacity-35">
            <div className="flex items-center gap-4 w-full px-20">
              <div className="h-[0.5px] flex-1 bg-[#E5A99E]" />
              <Sparkle style={{ width: "6px", height: "6px" }} />
              <div className="h-[0.5px] flex-1 bg-[#E5A99E]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
