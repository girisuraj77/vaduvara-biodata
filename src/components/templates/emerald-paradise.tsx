"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function EmeraldParadise({ data: externalData }: { data?: any }) {
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

  // Premium Emerald Green, Ivory & Gold Colors
  const colors = {
    bg: "#FFFDF6", // Auspicious Sandy Ivory Paper
    emerald: "#064E28", // Traditional Deep Emerald Green
    gold: "#D4AF37", // Bright Royal Metallic Gold
    goldLight: "#F0DFAD", // Soft Gold Highlight
    textDark: "#223322", // Deep Sage Charcoal Brown
    textEmerald: "#043B1E", // Deep Accent Green
  };

  // Traditional Hanging Lantern (Fanoos) Component
  const HangingLantern = ({ x, y }: { x: number; y: number }) => (
    <g transform={`translate(${x}, ${y})`} className="opacity-80">
      {/* Hanging Chain */}
      <line x1="0" y1="0" x2="0" y2="45" stroke={colors.gold} strokeWidth="1.5" strokeDasharray="1 3" />

      {/* Dome Top */}
      <path d="M -16,45 C -16,32 16,32 16,45 Z" fill={colors.gold} />
      <path d="M -12,45 C -12,36 12,36 12,45 Z" fill={colors.emerald} />

      {/* Body Frame */}
      <rect x="-14" y="45" width="28" height="32" fill="none" stroke={colors.gold} strokeWidth="2.0" rx="2" />
      {/* Internal Glass Lattice */}
      <line x1="-14" y1="45" x2="14" y2="77" stroke={colors.gold} strokeWidth="1" opacity="0.7" />
      <line x1="14" y1="45" x2="-14" y2="77" stroke={colors.gold} strokeWidth="1" opacity="0.7" />
      <circle cx="0" cy="61" r="5" fill={colors.goldLight} opacity="0.8" />

      {/* Bottom Cap & Tassel */}
      <path d="M -14,77 L 0,92 L 14,77 Z" fill={colors.gold} />
      <line x1="0" y1="92" x2="0" y2="108" stroke={colors.gold} strokeWidth="1.5" />
      <circle cx="0" cy="111" r="3" fill={colors.gold} />
    </g>
  );

  // Field Row Renderer
  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-1 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest text-[#064E28] mt-0.5">
        {label}:
      </div>
      <div className="text-[13.5px] font-bold text-[#223322] leading-normal break-words">
        {value}
      </div>
    </div>
  );

  // Section Header
  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 my-1.5">
      <div className="flex-1 h-px bg-[#D4AF37]/30" />
      <div className="flex items-center gap-1.5">
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-[#064E28]">
          <path d="M50 0 L58 35 L93 25 L65 50 L93 75 L58 65 L50 100 L42 65 L7 75 L35 50 L7 25 L42 35 Z" />
        </svg>
        <span className="text-[13px] font-black tracking-[0.25em] uppercase text-[#064E28]">
          {title}
        </span>
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-[#064E28]">
          <path d="M50 0 L58 35 L93 25 L65 50 L93 75 L58 65 L50 100 L42 65 L7 75 L35 50 L7 25 L42 35 Z" />
        </svg>
      </div>
      <div className="flex-1 h-px bg-[#D4AF37]/30" />
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-20 pt-16 pb-16 shrink-0 shadow-2xl"
      style={{
        backgroundColor: colors.bg,
        color: colors.textDark
      }}
    >
      {/* 1. DECORATIVE EMERALD & GOLD FRAME LAYER */}
      <div className="absolute inset-0 pointer-events-none z-0">

        {/* Soft Arabesque Wallpaper Background Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.015]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="arabesque-tile" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 30,0 L 60,30 L 30,60 L 0,30 Z M 30,10 L 50,30 L 30,50 L 10,30 Z"
                fill={colors.emerald}
              />
              <circle cx="30" cy="30" r="3" fill={colors.emerald} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arabesque-tile)" />
        </svg>

        {/* Solid 4px emerald border around the page */}
        <div
          className="absolute inset-[12px] border-[4px] pointer-events-none"
          style={{ borderColor: colors.emerald }}
        />

        {/* Double gold inside frame line */}
        <div
          className="absolute inset-[20px] border border-[#D4AF37]/35 pointer-events-none"
        />

        {/* Fine inside dash border */}
        <div
          className="absolute inset-[26px] border border-dashed border-[#D4AF37]/20 pointer-events-none"
        />

        {/* Decorative Golden Corner Mandala Ornaments (SVGs) */}
        {/* Top-Left */}
        <svg className="absolute top-[28px] left-[28px] w-8 h-8 fill-[#D4AF37] opacity-80" viewBox="0 0 100 100">
          <path d="M 0,0 L 100,0 C 70,0 0,70 0,100 Z" />
          <path d="M 10,10 L 80,10 C 50,10 10,50 10,80 Z" fill={colors.emerald} />
          <circle cx="25" cy="25" r="8" fill="#FFE590" />
        </svg>
        {/* Top-Right */}
        <svg className="absolute top-[28px] right-[28px] w-8 h-8 fill-[#D4AF37] opacity-80 transform rotate-90" viewBox="0 0 100 100">
          <path d="M 0,0 L 100,0 C 70,0 0,70 0,100 Z" />
          <path d="M 10,10 L 80,10 C 50,10 10,50 10,80 Z" fill={colors.emerald} />
          <circle cx="25" cy="25" r="8" fill="#FFE590" />
        </svg>
        {/* Bottom-Left */}
        <svg className="absolute bottom-[28px] left-[28px] w-8 h-8 fill-[#D4AF37] opacity-80 transform -rotate-90" viewBox="0 0 100 100">
          <path d="M 0,0 L 100,0 C 70,0 0,70 0,100 Z" />
          <path d="M 10,10 L 80,10 C 50,10 10,50 10,80 Z" fill={colors.emerald} />
          <circle cx="25" cy="25" r="8" fill="#FFE590" />
        </svg>
        {/* Bottom-Right */}
        <svg className="absolute bottom-[28px] right-[28px] w-8 h-8 fill-[#D4AF37] opacity-80 transform rotate-180" viewBox="0 0 100 100">
          <path d="M 0,0 L 100,0 C 70,0 0,70 0,100 Z" />
          <path d="M 10,10 L 80,10 C 50,10 10,50 10,80 Z" fill={colors.emerald} />
          <circle cx="25" cy="25" r="8" fill="#FFE590" />
        </svg>

        {/* Dynamic Vector Hanging Lanterns at the sides */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 794 1123">
          <HangingLantern x={80} y={20} />
          <HangingLantern x={714} y={20} />
        </svg>
      </div>

      {/* 2. PREMIUM CONTENT AREA */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-4 mt-8">

          {/* Header Dynamic God/Community Crest */}
          <div className="flex flex-col items-center text-center">
            {showGodPhoto && (
              <div className="mb-1.5">
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
                  /* Fallback to beautiful color-matched mathematically symmetrical golden Mosque silhouette SVG */
                  <svg viewBox="0 0 120 90" className="w-16 h-13 drop-shadow-md" style={{ fill: colors.gold }}>
                    {/* Left Minaret */}
                    <rect x="15" y="30" width="6" height="50" />
                    <path d="M 13,30 L 18,15 L 23,30 Z" />
                    <circle cx="18" cy="12" r="2.5" fill={colors.goldLight} />
                    
                    {/* Right Minaret */}
                    <rect x="99" y="30" width="6" height="50" />
                    <path d="M 97,30 L 102,15 L 107,30 Z" />
                    <circle cx="102" cy="12" r="2.5" fill={colors.goldLight} />

                    {/* Main Mosque Dome */}
                    <path d="M 35,60 C 35,35 85,35 85,60 Z" />
                    {/* Onion Dome Peak */}
                    <path d="M 56,40 C 56,33 60,25 60,18 C 60,25 64,33 64,40 Z" fill={colors.goldLight} />
                    <line x1="60" y1="18" x2="60" y2="8" stroke={colors.gold} strokeWidth="1.5" />
                    <circle cx="60" cy="5" r="3" fill={colors.gold} />

                    {/* Base Building */}
                    <rect x="25" y="60" width="70" height="20" />
                    {/* Arched Entrance */}
                    <path d="M 50,80 L 50,68 C 50,62 70,62 70,68 L 70,80 Z" fill={colors.bg} />
                    {/* Crescent Peak */}
                    <path d="M 60,3 A 3,3 0 1,0 64,7 A 2.2,2.2 0 1,1 60,4.2 Z" fill={colors.goldLight} />
                  </svg>
                )}
              </div>
            )}

            <p className="text-[10px] font-black uppercase tracking-[0.35em] mb-2.5 text-[#064E28]">
              {shloka || "BISMILLAH-AR-RAHMAN-AR-RAHIM"}
            </p>

            <div className="flex flex-col items-center">
              <h1 className="text-3.5xl font-black uppercase tracking-[0.22em] mb-1 text-[#064E28] drop-shadow-sm">
                {biodataTitle || t.biodataTitleDefault}
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-10 h-[0.5px] bg-[#D4AF37]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#064E28]" />
                <div className="w-10 h-[0.5px] bg-[#D4AF37]" />
              </div>
            </div>
          </div>

          {/* Main Body content */}
          <div className="flex flex-col gap-4 min-h-0 mt-10 py-2">

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
                      <div className="p-1.5 shadow-xl relative bg-white border border-[#064E28]/30">
                        {/* Decorative golden frame corners */}
                        <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37]" />
                        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37]" />
                        <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37]" />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37]" />

                        <div className="w-[120px] h-[150px] overflow-hidden border border-[#064E28]/15 bg-zinc-50">
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
              <div className="w-1.5 h-1.5 rotate-45 border border-[#064E28]" />
              <div className="h-[0.5px] flex-1 bg-[#D4AF37]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
