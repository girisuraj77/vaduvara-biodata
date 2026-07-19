"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function RoyalAmethyst({ data: externalData }: { data?: any }) {
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
  } = externalData ? getTemplateData(externalData, "Hindu") : storeData;

  const isBlankDesign = externalData?.isBlankDesign || false;

  // Premium Royal Amethyst (Purple) & Antique Gold Colors
  const colors = {
    bgStart: "#3F003F", // Rich Deep Amethyst Purple
    bgEnd: "#1A001A", // Imperial Dark Plum
    gold: "#D4AF37", // Elegant Metallic Gold
    goldLight: "#FFE590", // Radiant Gold Highlight
    textCream: "#FFF2D2", // Rich Cream Text
    textWhite: "#FFFFFF", // High Contrast White
  };

  // Standalone Gold Lotus Crest (Centered at top and bottom)
  const LotusCrest = ({ style }: { style?: React.CSSProperties }) => (
    <svg viewBox="0 0 100 80" style={{ width: "42px", height: "34px", ...style }} className="shrink-0">
      {/* Central Petal */}
      <path d="M 50,15 C 56,35 60,45 50,65 C 40,45 44,35 50,15 Z" fill={colors.gold} />

      {/* Inner Petals Left */}
      <path d="M 50,35 C 38,20 26,25 22,45 C 32,45 42,40 50,35 Z" fill={colors.gold} />
      <path d="M 50,48 C 30,38 12,58 24,72 C 36,62 44,58 50,48 Z" fill={colors.gold} opacity="0.9" />

      {/* Inner Petals Right */}
      <path d="M 50,35 C 62,20 74,25 78,45 C 68,45 58,40 50,35 Z" fill={colors.gold} />
      <path d="M 50,48 C 70,38 88,58 76,72 C 64,62 56,58 50,48 Z" fill={colors.gold} opacity="0.9" />

      {/* Golden Base scroll */}
      <path d="M 30,72 C 40,68 60,68 70,72 C 65,76 35,76 30,72 Z" fill={colors.goldLight} />
    </svg>
  );

  // Field Row Renderer
  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest text-[#FFE590] mt-0.5">
        {label}:
      </div>
      <div className="text-[13.5px] font-bold text-[#FFF2D2] leading-normal break-words">
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
          <path d="M50 15 L60 40 L85 50 L60 60 L50 85 L40 60 L15 50 L40 40 Z" />
        </svg>
        <span className="text-[13px] font-black tracking-[0.25em] uppercase text-[#FFE590]">
          {title}
        </span>
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-[#FFE590]">
          <path d="M50 15 L60 40 L85 50 L60 60 L50 85 L40 60 L15 50 L40 40 Z" />
        </svg>
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
        color: colors.textCream
      }}
    >
      {/* 1. DECORATIVE IMPERIAL BACKGROUND & GOLD EMBELLISHMENTS */}
      <div className="absolute inset-0 pointer-events-none z-0">

        {/* Seamless Damask Background Pattern Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="damask-tile" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M 40,0 C 45,15 55,20 40,40 C 25,20 35,15 40,0 Z M 0,40 C 15,45 20,55 40,40 C 20,25 15,35 0,40 Z M 40,80 C 45,65 55,60 40,40 C 25,60 35,65 40,80 Z M 80,40 C 65,45 60,55 40,40 C 60,25 65,35 80,40 Z"
                fill={colors.gold}
                fillRule="evenodd"
              />
              <circle cx="40" cy="40" r="4" fill="none" stroke={colors.gold} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#damask-tile)" />
        </svg>

        {/* Ornate Gold Corner Leaf Carvings */}
        {/* Top-Left Corner Leaf */}
        <div className="absolute top-[16px] left-[16px]">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
            {/* Rich flourish paths matching classic Indian borders */}
            <path d="M 0,0 C 25,3 45,12 60,25 C 45,35 25,45 5,35 C 15,40 25,52 35,70 C 22,66 12,56 2,42 C 2,58 6,80 15,100 C 6,90 2,78 0,65" fill={colors.gold} />
            <path d="M 0,0 C 15,2 30,8 40,18 C 30,25 18,32 4,25 Z" fill={colors.goldLight} opacity="0.6" />
            <circle cx="2" cy="2" r="3" fill={colors.gold} />
          </svg>
        </div>

        {/* Top-Right Corner Leaf */}
        <div className="absolute top-[16px] right-[16px] transform scale-x-[-1]">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
            <path d="M 0,0 C 25,3 45,12 60,25 C 45,35 25,45 5,35 C 15,40 25,52 35,70 C 22,66 12,56 2,42 C 2,58 6,80 15,100 C 6,90 2,78 0,65" fill={colors.gold} />
            <path d="M 0,0 C 15,2 30,8 40,18 C 30,25 18,32 4,25 Z" fill={colors.goldLight} opacity="0.6" />
            <circle cx="2" cy="2" r="3" fill={colors.gold} />
          </svg>
        </div>

        {/* Bottom-Left Corner Leaf */}
        <div className="absolute bottom-[16px] left-[16px] transform scale-y-[-1]">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
            <path d="M 0,0 C 25,3 45,12 60,25 C 45,35 25,45 5,35 C 15,40 25,52 35,70 C 22,66 12,56 2,42 C 2,58 6,80 15,100 C 6,90 2,78 0,65" fill={colors.gold} />
            <path d="M 0,0 C 15,2 30,8 40,18 C 30,25 18,32 4,25 Z" fill={colors.goldLight} opacity="0.6" />
            <circle cx="2" cy="2" r="3" fill={colors.gold} />
          </svg>
        </div>

        {/* Bottom-Right Corner Leaf */}
        <div className="absolute bottom-[16px] right-[16px] transform scale-x-[-1] scale-y-[-1]">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
            <path d="M 0,0 C 25,3 45,12 60,25 C 45,35 25,45 5,35 C 15,40 25,52 35,70 C 22,66 12,56 2,42 C 2,58 6,80 15,100 C 6,90 2,78 0,65" fill={colors.gold} />
            <path d="M 0,0 C 15,2 30,8 40,18 C 30,25 18,32 4,25 Z" fill={colors.goldLight} opacity="0.6" />
            <circle cx="2" cy="2" r="3" fill={colors.gold} />
          </svg>
        </div>

        {/* Thin Gold Border frame with hanging beaded chains on sides */}
        <div
          className="absolute inset-[15px] border pointer-events-none"
          style={{ borderColor: `${colors.gold}44` }}
        />

        {/* Left Side Hanging Bead Chains */}
        <svg className="absolute top-[136px] bottom-[136px] left-[12px] h-[calc(100%-272px)] w-[10px]">
          <line x1="5" y1="0" x2="5" y2="100%" stroke={colors.gold} strokeWidth="1" strokeDasharray="1 7" strokeLinecap="round" />
        </svg>

        {/* Right Side Hanging Bead Chains */}
        <svg className="absolute top-[136px] bottom-[136px] right-[12px] h-[calc(100%-272px)] w-[10px]">
          <line x1="5" y1="0" x2="5" y2="100%" stroke={colors.gold} strokeWidth="1" strokeDasharray="1 7" strokeLinecap="round" />
        </svg>
      </div>

      {/* 2. PREMIUM CONTENT AREA */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-4 mt-1">

          {/* Top Lotus Emblem Header Section */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-1">
              <LotusCrest />
            </div>

            <div className="mb-2">
              <img
                src={`/images/gods/${godPhotoId || "god-1"}.png`}
                className="h-13 w-13 object-contain drop-shadow-md"
                alt="God Symbol"
              />
            </div>



            <p className="text-[10px] font-black uppercase tracking-[0.35em] mb-2 text-[#FFE590]">
              {shloka}
            </p>

            <div className="flex flex-col items-center">
              <h1 className="text-3.5xl font-black uppercase tracking-[0.22em] mb-1 text-[#FFFFFF] drop-shadow-md">
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
                      <div className="p-1.5 shadow-2xl relative bg-[#2A002A] border border-[#D4AF37]/45">
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

          {/* Bottom Lotus Crest & Divider */}
          <div className="mt-auto pt-2 flex flex-col items-center">
            <div className="mb-2">
              <LotusCrest style={{ transform: "rotate(180deg)" }} />
            </div>
            <div className="flex items-center gap-4 w-full px-20 opacity-30">
              <div className="h-[0.5px] flex-1 bg-[#D4AF37]" />
              <div className="w-1 h-1 rotate-45 bg-[#D4AF37]" />
              <div className="h-[0.5px] flex-1 bg-[#D4AF37]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
