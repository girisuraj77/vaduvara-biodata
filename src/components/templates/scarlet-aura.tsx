"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function ScarletAura({ data: externalData }: { data?: any }) {
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

  // Premium Velvet Crimson & Gold Theme Colors
  const colors = {
    bgStart: "#4A0007", // Deep Velvet Red Start
    bgEnd: "#150003", // Rich Dark Crimson End
    goldAccent: "#D4AF37", // Elegant Metallic Gold
    goldLight: "#FFE590", // Soft Bright Starlight Gold
    creamText: "#FFF3CC", // Warm Cream Text for high readability
    whiteText: "#FFFFFF", // High contrast white
  };

  // Sparkle Diamond Accent (✦)
  const Sparkle = ({ style, className }: { style?: React.CSSProperties; className?: string }) => (
    <svg viewBox="0 0 100 100" style={{ width: "16px", height: "16px", ...style }} className={className}>
      <path d="M 50,0 C 50,35 65,50 100,50 C 65,50 50,65 50,100 C 50,65 35,50 0,50 C 35,50 50,35 50,0 Z" fill={colors.goldLight} />
    </svg>
  );

  // Field Row Renderer
  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest text-[#FFE590] mt-0.5">
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
      <div className="flex-1 h-px bg-[#D4AF37]/30" />
      <div className="flex items-center gap-1.5">
        <Sparkle style={{ width: "10px", height: "10px" }} />
        <span className="text-[13px] font-black tracking-[0.25em] uppercase text-[#FFE590]">
          {title}
        </span>
        <Sparkle style={{ width: "10px", height: "10px" }} />
      </div>
      <div className="flex-1 h-px bg-[#D4AF37]/30" />
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-14 pt-14 pb-14 shrink-0 shadow-2xl"
      style={{
        background: `radial-gradient(circle at 50% 30%, ${colors.bgStart} 0%, ${colors.bgEnd} 100%)`,
        color: colors.creamText
      }}
    >
      {/* 1. DECORATIVE BACKGROUND & SPOTLIGHTS LAYER (Dynamic SVG vector mapping) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Soft Spotlight Glows */}
        <div 
          className="absolute -top-10 -left-10 w-[300px] h-[300px] rounded-full opacity-25 blur-[80px]"
          style={{ background: `radial-gradient(circle, ${colors.goldLight} 0%, transparent 70%)` }}
        />
        <div 
          className="absolute -top-10 -right-10 w-[300px] h-[300px] rounded-full opacity-25 blur-[80px]"
          style={{ background: `radial-gradient(circle, ${colors.goldLight} 0%, transparent 70%)` }}
        />
        <div 
          className="absolute bottom-[-100px] left-[150px] right-[150px] h-[200px] opacity-20 blur-[60px]"
          style={{ background: `radial-gradient(circle, ${colors.goldLight} 0%, transparent 70%)` }}
        />

        {/* Diagonal Sparkling Wave (represented as high-quality vector particle path) */}
        <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          {/* Background starlight path */}
          <path 
            d="M -10,750 Q 200,600 400,680 T 810,500" 
            fill="none" 
            stroke={colors.goldAccent} 
            strokeWidth="1.5" 
            strokeDasharray="4 8"
          />
          <path 
            d="M -10,765 Q 230,620 420,695 T 810,520" 
            fill="none" 
            stroke={colors.goldLight} 
            strokeWidth="0.8" 
            strokeDasharray="2 12"
          />
          
          {/* Micro dots creating the sparkling dust path (deterministic to avoid hydration mismatch) */}
          {(() => {
            const getPseudoRandom = (seed: number) => {
              const x = Math.sin(seed) * 10000;
              return x - Math.floor(x);
            };

            return [...Array(60)].map((_, i) => {
              const t = i / 59;
              const x = t * 814 - 10;
              // Bezier formula to match path: y = (1-t)^2 * y0 + 2(1-t)t * y1 + t^2 * y2
              // Let's approximate the curve to align particles perfectly along the wave
              const y = 730 - 300 * t + 100 * Math.sin(t * Math.PI * 2.5) + (getPseudoRandom(i) - 0.5) * 45;
              const size = getPseudoRandom(i + 100) * 2 + 0.8;
              return (
                <circle 
                  key={i} 
                  cx={x} 
                  cy={y} 
                  r={size} 
                  fill={i % 2 === 0 ? colors.goldLight : colors.goldAccent} 
                  opacity={getPseudoRandom(i + 200) * 0.7 + 0.3} 
                />
              );
            });
          })()}
        </svg>

        {/* Corner Geometric Frame Accents (Top-Left & Bottom-Right) */}
        {/* Top-Left Corner Frame */}
        <div className="absolute top-[20px] left-[20px] pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" stroke={colors.goldAccent} strokeWidth="1.2">
            <path d="M 10,60 L 10,10 L 60,10" />
            <path d="M 0,90 L 0,0 L 90,0" strokeWidth="0.8" opacity="0.6" />
            {/* Small ending dots */}
            <circle cx="10" cy="65" r="2" fill={colors.goldAccent} />
            <circle cx="65" cy="10" r="2" fill={colors.goldAccent} />
          </svg>
          <Sparkle style={{ position: "absolute", top: "-5px", left: "-5px", width: "16px", height: "16px" }} />
          <Sparkle style={{ position: "absolute", top: "25px", left: "-15px", width: "10px", height: "10px", opacity: 0.7 }} />
          <Sparkle style={{ position: "absolute", top: "-15px", left: "25px", width: "10px", height: "10px", opacity: 0.7 }} />
        </div>

        {/* Bottom-Right Corner Frame */}
        <div className="absolute bottom-[20px] right-[20px] pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" stroke={colors.goldAccent} strokeWidth="1.2" className="transform rotate-180 origin-center">
            <path d="M 10,60 L 10,10 L 60,10" />
            <path d="M 0,90 L 0,0 L 90,0" strokeWidth="0.8" opacity="0.6" />
            <circle cx="10" cy="65" r="2" fill={colors.goldAccent} />
            <circle cx="65" cy="10" r="2" fill={colors.goldAccent} />
          </svg>
          <Sparkle style={{ position: "absolute", bottom: "-5px", right: "-5px", width: "16px", height: "16px" }} />
          <Sparkle style={{ position: "absolute", bottom: "25px", right: "-15px", width: "10px", height: "10px", opacity: 0.7 }} />
          <Sparkle style={{ position: "absolute", bottom: "-15px", right: "25px", width: "10px", height: "10px", opacity: 0.7 }} />
        </div>

        {/* Double Border Frame Lines */}
        <div className="absolute inset-[30px] border border-[#D4AF37]/10 pointer-events-none" />
        <div className="absolute inset-[34px] border border-[#D4AF37]/20 pointer-events-none" />
      </div>

      {/* 2. PREMIUM CONTENT AREA */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-4 mt-2">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-2">
              <img
                src={`/images/gods/${godPhotoId || "god-1"}.png`}
                className="h-14 w-14 object-contain drop-shadow-[0_2px_8px_rgba(255,229,144,0.4)]"
                alt="God Symbol"
              />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mb-2.5 text-[#FFE590] drop-shadow-[0_0_4px_rgba(255,229,144,0.3)]">
              {shloka}
            </p>
            <div className="flex flex-col items-center">
              <h1 className="text-3.5xl font-black uppercase tracking-[0.22em] mb-1 text-[#FFFFFF] drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
                {biodataTitle || t.biodataTitleDefault}
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-10 h-[0.5px] bg-[#D4AF37]" />
                <Sparkle style={{ width: "8px", height: "8px" }} />
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
                      <div className="p-1.5 shadow-2xl relative bg-[#1A0003] border border-[#D4AF37]/45">
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
              <Sparkle style={{ width: "6px", height: "6px" }} />
              <div className="h-[0.5px] flex-1 bg-[#D4AF37]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
