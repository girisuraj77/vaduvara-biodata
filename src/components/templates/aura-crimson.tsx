"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function AuraCrimson({ data: externalData }: { data?: any }) {
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

  // Premium Velvet Crimson & Majestic Gold Color Palette
  const colors = {
    bgStart: "#5A000A",       // Deep Velvet Crimson Red Start
    bgEnd: "#1A0003",         // Rich Velvet Dark Crimson End
    goldAccent: "#D4AF37",    // Elegant Metallic Gold
    goldLight: "#FFE590",     // Luminous Soft Starlight Gold
    creamText: "#FFF3CC",     // Warm Auspicious Cream Text for high contrast
    whiteText: "#FFFFFF",     // Perfect white readability
  };

  // Sparkle Diamond Accent Icon (✦)
  const Sparkle = ({ style }: { style?: React.CSSProperties }) => (
    <svg viewBox="0 0 100 100" style={{ width: "16px", height: "16px", ...style }} className="shrink-0 fill-[#FFE590]">
      <path d="M50,0 Q50,50 100,50 Q50,50 50,100 Q50,50 0,50 Q50,50 50,0 Z" />
    </svg>
  );

  // Optimized Field Row (Exact 165px label alignment to match other designs)
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

  // Styled Section Header with Gradient Gold Lines and Sparkle Stars
  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 my-1.5">
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.goldAccent }} />
      <div className="flex items-center gap-1.5">
        <Sparkle style={{ width: "10px", height: "10px" }} />
        <span className="text-[13px] font-black tracking-[0.25em] uppercase text-[#FFE590]">
          {title}
        </span>
        <Sparkle style={{ width: "10px", height: "10px" }} />
      </div>
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.goldAccent }} />
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
      {/* 1. ELEGANT GOLDEN BORDERS LAYER */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Fine Double Gold Borders */}
        <div className="absolute inset-6 border border-[#D4AF37]/30" />
        <div className="absolute inset-8 border-[1.5px] border-[#D4AF37]/50" />

        {/* Soft Background Spotlights */}
        <div className="absolute -top-10 -left-10 w-[300px] h-[300px] rounded-full opacity-20 blur-[90px]"
          style={{ background: `radial-gradient(circle, ${colors.goldLight} 0%, transparent 70%)` }} />
        <div className="absolute -top-10 -right-10 w-[300px] h-[300px] rounded-full opacity-20 blur-[90px]"
          style={{ background: `radial-gradient(circle, ${colors.goldLight} 0%, transparent 70%)` }} />

        {/* Corner Ornaments */}
        {[0, 1, 2, 3].map(i => (
          <svg key={i} width="45" height="45" viewBox="0 0 50 50"
            style={{
              position: "absolute",
              top: i < 2 ? 24 : undefined,
              bottom: i >= 2 ? 24 : undefined,
              left: i % 2 === 0 ? 24 : undefined,
              right: i % 2 !== 0 ? 24 : undefined,
              transform: `rotate(${i * 90}deg)`
            }}
            className="fill-none stroke-[#D4AF37] stroke-[1.5]"
          >
            <path d="M 5,45 L 5,5 L 45,5" opacity="0.6" />
            <path d="M 5,5 Q 15,5 18,18 Q 5,15 5,5 Z" fill={colors.goldAccent} opacity="0.4" />
            <circle cx="5" cy="5" r="2.5" fill={colors.goldLight} />
          </svg>
        ))}
      </div>

      {/* 2. MAIN CONTENT AREA */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-4 mt-4">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            {godPhotoId && (
              <div className="mb-2">
                <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center p-2.5 border-2 border-[#D4AF37] shadow-xl backdrop-blur-md">
                  <img
                    src={`/images/gods/${godPhotoId}.png`}
                    className="h-full w-full object-contain filter brightness-110"
                    alt="God Symbol"
                  />
                </div>
              </div>
            )}
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mb-2 text-[#FFE590]">
              {shloka}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-[0.2em] mb-1 text-[#FFFFFF]">
              {biodataTitle || t.biodataTitleDefault}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-16 h-px" style={{ backgroundColor: colors.goldAccent }} />
              <Sparkle style={{ width: "8px", height: "8px" }} />
              <div className="w-16 h-px" style={{ backgroundColor: colors.goldAccent }} />
            </div>
          </div>

          {/* Body Sections */}
          <div className="flex flex-col gap-4 py-2">
            {/* Section 1: Personal Details */}
            {personalFields.length > 0 && (
              <div className="space-y-1.5">
                <SectionHeader title={stepHeadings[1] || "Personal Details"} />
                <div className="flex gap-6 px-4 items-start">
                  <div className="flex-1 grid grid-cols-1 gap-0.5">
                    {personalFields.map((f: any) => (
                      <FieldRow key={f.id} label={f.label} value={f.value} />
                    ))}
                  </div>
                  {profilePhotoUrl && (
                    <div className="shrink-0 mt-1">
                      <div className="p-1.5 shadow-2xl relative bg-white/10 backdrop-blur-sm" style={{ border: `1.5px solid ${colors.goldAccent}` }}>
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: colors.goldLight }} />
                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: colors.goldLight }} />
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: colors.goldLight }} />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: colors.goldLight }} />
                        <div className="w-[120px] h-[150px] overflow-hidden bg-black/20">
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
              <div className="space-y-1.5">
                <SectionHeader title={stepHeadings[2] || "Family Details"} />
                <div className="grid grid-cols-1 gap-0.5 px-4">
                  {familyFields.map((f: any) => (
                    <FieldRow key={f.id} label={f.label} value={f.value} />
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Contact Details */}
            {contactFields.length > 0 && (
              <div className="space-y-1.5">
                <SectionHeader title={stepHeadings[3] || t.contactDetails} />
                <div className="grid grid-cols-1 gap-0.5 px-4">
                  {contactFields.map((f: any) => (
                    <FieldRow key={f.id} label={f.label} value={f.value} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Decor */}
          <div className="mt-auto pt-2 flex flex-col items-center opacity-30">
            <div className="flex items-center gap-3 w-full px-20">
              <div className="h-px flex-1" style={{ backgroundColor: colors.goldAccent }} />
              <Sparkle style={{ width: "6px", height: "6px" }} />
              <div className="h-px flex-1" style={{ backgroundColor: colors.goldAccent }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
