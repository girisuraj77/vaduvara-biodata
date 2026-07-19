"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function SandstoneGrace({ data: externalData }: { data?: any }) {
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

  // Premium Sandstone Peach, Sage Green & Antique Gold Colors
  const colors = {
    bg: "#FFF9F2", // Delicate Soft Sandstone Peach
    gold: "#D4AF37", // Elegant Metallic Gold
    goldLight: "#FFE590", // Soft Gold Highlight
    sage: "#2F5233", // Elegant Sage Green Title Accent
    sageLight: "#9FB8A6", // Pale Sage Divider
    textDark: "#332211", // Warm Walnut Brown
  };

  // Field Row Renderer
  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest text-[#2F5233] mt-0.5">
        {label}:
      </div>
      <div className="text-[13.5px] font-bold text-[#332211] leading-normal break-words">
        {value}
      </div>
    </div>
  );

  // Section Header
  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 my-1.5">
      <div className="flex-1 h-px bg-[#2F5233]/30" />
      <div className="flex items-center gap-1.5">
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-[#2F5233]">
          <circle cx="50" cy="50" r="25" />
          <path d="M50 0 L55 20 L75 25 L55 30 L50 50 L45 30 L25 25 L45 20 Z" />
        </svg>
        <span className="text-[13px] font-black tracking-[0.25em] uppercase text-[#2F5233]">
          {title}
        </span>
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-[#2F5233]">
          <circle cx="50" cy="50" r="25" />
          <path d="M50 0 L55 20 L75 25 L55 30 L50 50 L45 30 L25 25 L45 20 Z" />
        </svg>
      </div>
      <div className="flex-1 h-px bg-[#2F5233]/30" />
    </div>
  );

  // Traditional Hanging Lantern (Fanoos) for Sandstone Grace
  const HangingLantern = ({ x, y }: { x: number; y: number }) => (
    <g transform={`translate(${x}, ${y})`} className="opacity-90">
      {/* Fine Hanging Chain */}
      <line x1="0" y1="0" x2="0" y2="40" stroke={colors.gold} strokeWidth="1.2" strokeDasharray="1 3" />

      {/* Dome Top */}
      <path d="M -12,40 C -12,28 12,28 12,40 Z" fill={colors.gold} />
      <path d="M -9,40 C -9,32 9,32 9,40 Z" fill={colors.sage} />

      {/* Hexagonal/Octagonal Lantern Body */}
      <path d="M -11,40 L -7,68 L 7,68 L 11,40 Z" fill="none" stroke={colors.gold} strokeWidth="1.8" />
      <path d="M -6,40 L -3,68 L 3,68 L 6,40 Z" fill="none" stroke={colors.gold} strokeWidth="0.8" opacity="0.6" />
      {/* Glowing Light Core */}
      <circle cx="0" cy="54" r="4" fill={colors.goldLight} opacity="0.85" />

      {/* Pointed Bottom cap */}
      <path d="M -7,68 L 0,80 L 7,68 Z" fill={colors.gold} />
      <line x1="0" y1="80" x2="0" y2="92" stroke={colors.gold} strokeWidth="1.2" />
      <circle cx="0" cy="95" r="2" fill={colors.gold} />
    </g>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-20 pt-8 pb-10 shrink-0 shadow-2xl"
      style={{
        backgroundColor: colors.bg,
        color: colors.textDark
      }}
    >
      {/* 1. DECORATIVE SAGE VINES & DOUBLE GOLD FRAME LAYER */}
      <div className="absolute inset-0 pointer-events-none z-0">

        {/* Premium Islamic Geometric Star Lattice Watermark Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.018]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-star-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              {/* Interlocking lines forming geometric star structures */}
              <path d="M 40,0 L 80,40 L 40,80 L 0,40 Z" fill="none" stroke={colors.sage} strokeWidth="0.8" />
              <path d="M 0,0 L 80,80 M 80,0 L 0,80" fill="none" stroke={colors.sage} strokeWidth="0.8" />
              {/* Center 8-point Star Mandala */}
              <g transform="translate(40,40) scale(0.35)">
                <path
                  d="M 0,-30 L 8,-10 L 28,-20 L 15,0 L 28,20 L 8,10 L 0,30 L -8,10 L -28,20 L -15,0 L -28,-20 L -8,-10 Z"
                  fill={colors.sage}
                />
                <circle cx="0" cy="0" r="5" fill={colors.gold} />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-star-pattern)" />
        </svg>

        {/* Double Frame with Wrapped Green Vines (Mathematical SVG) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 794 1123">
          {/* Main golden outer border line */}
          <rect
            x="12"
            y="12"
            width="770"
            height="1099"
            fill="none"
            stroke={colors.gold}
            strokeWidth="3.5"
          />
          {/* Main green inner border line */}
          <rect
            x="20"
            y="20"
            width="754"
            height="1083"
            fill="none"
            stroke={colors.sage}
            strokeWidth="1.2"
            opacity="0.85"
          />

          {/* Organic Leaf Vines wrapped along the left vertical border line */}
          {[...Array(18)].map((_, i) => {
            const t = i / 17;
            const y = 50 + t * 1023;
            const isLeft = i % 2 === 0;
            return (
              <path
                key={`leaf-l-${i}`}
                d={isLeft
                  ? `M 20,${y} C 10,${y - 5} 0,${y + 5} -5,${y} C 0,${y - 8} 13,${y - 2} 20,${y}`
                  : `M 20,${y} C 30,${y - 5} 40,${y + 5} 45,${y} C 40,${y - 8} 27,${y - 2} 20,${y}`
                }
                fill={colors.sage}
                opacity="0.8"
              />
            );
          })}

          {/* Organic Leaf Vines wrapped along the right vertical border line */}
          {[...Array(18)].map((_, i) => {
            const t = i / 17;
            const y = 50 + t * 1023;
            const isLeft = i % 2 === 0;
            return (
              <path
                key={`leaf-r-${i}`}
                d={isLeft
                  ? `M 774,${y} C 764,${y - 5} 754,${y + 5} 749,${y} C 754,${y - 8} 761,${y - 2} 774,${y}`
                  : `M 774,${y} C 784,${y - 5} 794,${y + 5} 799,${y} C 794,${y - 8} 781,${y - 2} 774,${y}`
                }
                fill={colors.sage}
                opacity="0.8"
              />
            );
          })}

          {/* Decorative Golden Corner Mandala Ornaments (SVGs) */}
          {/* Top-Left */}
          <g transform="translate(20,20) scale(0.35)">
            <path d="M 0,0 L 100,0 C 70,0 0,70 0,100 Z" fill={colors.gold} />
            <path d="M 10,10 L 80,10 C 50,10 10,50 10,80 Z" fill={colors.sage} />
            <circle cx="25" cy="25" r="8" fill={colors.goldLight} />
            <path d="M 25,12 L 28,21 L 37,25 L 28,29 L 25,38 L 22,29 L 13,25 L 22,21 Z" fill={colors.gold} />
          </g>
          {/* Top-Right */}
          <g transform="translate(774,20) scale(0.35) rotate(90)">
            <path d="M 0,0 L 100,0 C 70,0 0,70 0,100 Z" fill={colors.gold} />
            <path d="M 10,10 L 80,10 C 50,10 10,50 10,80 Z" fill={colors.sage} />
            <circle cx="25" cy="25" r="8" fill={colors.goldLight} />
            <path d="M 25,12 L 28,21 L 37,25 L 28,29 L 25,38 L 22,29 L 13,25 L 22,21 Z" fill={colors.gold} />
          </g>
          {/* Bottom-Left */}
          <g transform="translate(20,1103) scale(0.35) rotate(-90)">
            <path d="M 0,0 L 100,0 C 70,0 0,70 0,100 Z" fill={colors.gold} />
            <path d="M 10,10 L 80,10 C 50,10 10,50 10,80 Z" fill={colors.sage} />
            <circle cx="25" cy="25" r="8" fill={colors.goldLight} />
            <path d="M 25,12 L 28,21 L 37,25 L 28,29 L 25,38 L 22,29 L 13,25 L 22,21 Z" fill={colors.gold} />
          </g>
          {/* Bottom-Right */}
          <g transform="translate(774,1103) scale(0.35) rotate(180)">
            <path d="M 0,0 L 100,0 C 70,0 0,70 0,100 Z" fill={colors.gold} />
            <path d="M 10,10 L 80,10 C 50,10 10,50 10,80 Z" fill={colors.sage} />
            <circle cx="25" cy="25" r="8" fill={colors.goldLight} />
            <path d="M 25,12 L 28,21 L 37,25 L 28,29 L 25,38 L 22,29 L 13,25 L 22,21 Z" fill={colors.gold} />
          </g>

          {/* Arched Islamic Mihrab Silhouette framing the header background */}
          <path
            d="M 260,20 C 260,20 330,10 397,7 C 464,10 534,20 534,20 L 534,215 C 534,215 464,230 397,230 C 330,230 260,215 260,215 Z"
            fill="none"
            stroke={colors.gold}
            strokeWidth="0.8"
            strokeDasharray="2 4"
            opacity="0.3"
          />
          <path
            d="M 270,20 C 270,20 330,13 397,10 C 464,13 524,20 524,20 L 524,205 C 524,205 464,220 397,220 C 330,220 270,205 270,205 Z"
            fill="none"
            stroke={colors.sage}
            strokeWidth="0.5"
            opacity="0.25"
          />

          {/* Symmetrical Hanging Lanterns (Fanoos) Suspended from Top Border */}
          <HangingLantern x={95} y={20} />
          <HangingLantern x={699} y={20} />
        </svg>

        {/* 2px Solid Outer Border Line */}
        <div
          className="absolute inset-[15px] border pointer-events-none"
          style={{ borderColor: `${colors.gold}20` }}
        />
      </div>

      {/* 2. PREMIUM CONTENT AREA */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-4 mt-2">

          {/* Header Dynamic God/Community Crest */}
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

            <p className="text-[10px] font-black uppercase tracking-[0.35em] mb-2.5 text-[#2F5233]">
              {shloka || "BISMILLAH-AR-RAHMAN-AR-RAHIM"}
            </p>

            <div className="flex flex-col items-center">
              <h1 className="text-3.5xl font-black uppercase tracking-[0.22em] mb-1 text-[#2F5233] drop-shadow-sm">
                {biodataTitle || t.biodataTitleDefault}
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-10 h-[0.5px] bg-[#D4AF37]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#2F5233]" />
                <div className="w-10 h-[0.5px] bg-[#D4AF37]" />
              </div>
            </div>
          </div>

          {/* Main Body content */}
          <div className="flex flex-col gap-4 min-h-0 mt-4 py-2">

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
                      <div className="p-1.5 shadow-xl relative bg-white border border-[#2F5233]/30">
                        {/* Decorative golden frame corners */}
                        <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37]" />
                        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37]" />
                        <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37]" />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37]" />

                        <div className="w-[120px] h-[150px] overflow-hidden border border-[#2F5233]/15 bg-zinc-50">
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
              <div className="w-1.5 h-1.5 rotate-45 border border-[#2F5233]" />
              <div className="h-[0.5px] flex-1 bg-[#D4AF37]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
