"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function SonaSanskriti({ data: externalData }: { data?: any }) {
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

  // Premium Royal Gold and White Theme Colors
  const colors = {
    bg: "#FFFFFF", // Pure White background as requested
    gold: "#D49E25", // Royal Matte Gold
    goldLight: "#F3E1B9", // Soft Gold Highlight
    textDark: "#2D2214", // Elegant Dark Brown/Charcoal
    textRed: "#8D1B1B", // Traditional Premium Crimson Red
  };

  // Beautiful Traditional Motif Component (matches the uploaded image, base sits along y=90, enlarged to 48px with thicker strokes)
  const BorderMotif = ({ style }: { style?: React.CSSProperties }) => (
    <svg viewBox="0 0 100 100" style={{ width: "48px", height: "48px", ...style }} className="shrink-0 pointer-events-none">
      {/* Central Dome/Base */}
      <path
        d="M 15,90 C 25,60 75,60 85,90 Z"
        fill="none"
        stroke={colors.gold}
        strokeWidth="4.5"
      />
      <path
        d="M 25,90 C 32,70 68,70 75,90 Z"
        fill={colors.gold}
        opacity="0.15"
      />

      {/* Concentric Traditional Arches & Rays */}
      {[...Array(5)].map((_, i) => {
        const angle = 30 + i * 30; // 30, 60, 90, 120, 150 degrees
        const rad = (angle * Math.PI) / 180;
        const r1 = 35;
        const r2 = 45;
        const x1 = 50 + r1 * Math.cos(rad - Math.PI);
        const y1 = 90 - r1 * Math.sin(rad);
        const x2 = 50 + r2 * Math.cos(rad - Math.PI);
        const y2 = 90 - r2 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={colors.gold}
            strokeWidth="3.5"
          />
        );
      })}

      {/* Repeating Outer Flower Petals / Peaks */}
      {[...Array(7)].map((_, i) => {
        const angle = 22.5 + i * 22.5; // Fan out from 22.5 to 157.5 degrees
        const rad = (angle * Math.PI) / 180;
        const rBase = 42;
        const rTip = 50;

        // Base of petal
        const bx = 50 + rBase * Math.cos(rad - Math.PI);
        const by = 90 - rBase * Math.sin(rad);

        // Tip of petal
        const tx = 50 + rTip * Math.cos(rad - Math.PI);
        const ty = 90 - rTip * Math.sin(rad);

        return (
          <g key={i}>
            {/* Crown/Mandala petal peak */}
            <path
              d={`M ${bx},${by} C ${bx - 4},${by - 2} ${tx - 2},${ty + 2} ${tx},${ty} C ${tx + 2},${ty + 2} ${bx + 4},${by - 2} ${bx},${by} Z`}
              fill={colors.gold}
            />
            {/* Small golden dot on peak tip */}
            <circle
              cx={50 + (rTip + 3) * Math.cos(rad - Math.PI)}
              cy={90 - (rTip + 3) * Math.sin(rad)}
              r="1.5"
              fill={colors.gold}
            />
          </g>
        );
      })}

      {/* Internal Core Semicircle Decor */}
      <path
        d="M 35,90 A 15,15 0 0,1 65,90"
        fill="none"
        stroke={colors.gold}
        strokeWidth="3.0"
      />
      <circle cx="50" cy="85" r="4" fill={colors.gold} />
    </svg>
  );

  // Individual Field Row Renderer (highly optimized padding for compact fit, no underlines)
  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest text-[#5C462C] mt-0.5">
        {label}:
      </div>
      <div className="text-[13.5px] font-bold text-[#2D2214] leading-normal break-words">
        {value}
      </div>
    </div>
  );

  // SVG Divider for Sections (more compact vertical margin)
  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 my-1.5">
      <div className="flex-1 h-px bg-[#D49E25]/30" />
      <div className="flex items-center gap-1.5">
        {/* Tiny golden mandala symbol */}
        <svg viewBox="0 0 100 100" className="w-5 h-5 fill-[#D49E25]">
          <path d="M50 0 L58 35 L93 25 L65 50 L93 75 L58 65 L50 100 L42 65 L7 75 L35 50 L7 25 L42 35 Z" />
        </svg>
        <span className="text-[13px] font-black tracking-[0.25em] uppercase text-[#8D1B1B]">
          {title}
        </span>
        <svg viewBox="0 0 100 100" className="w-5 h-5 fill-[#D49E25]">
          <path d="M50 0 L58 35 L93 25 L65 50 L93 75 L58 65 L50 100 L42 65 L7 75 L35 50 L7 25 L42 35 Z" />
        </svg>
      </div>
      <div className="flex-1 h-px bg-[#D49E25]/30" />
    </div>
  );

  // Spacing configs for flex borders (with bigger 48px flowers)
  const numHorizontal = 16; // 16 motifs at 48px fits beautifully with flex justify-between
  const numVertical = 22; // 22 motifs at 48px fits beautifully with flex flex-col justify-between

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-14 pt-14 pb-14 shrink-0 shadow-2xl"
      style={{ backgroundColor: colors.bg, color: colors.textDark }}
    >
      {/* 1. DECORATIVE MANDALA BORDERS (Exact repeat as attached image, 100% stretch responsive) */}
      <div className="absolute inset-0 pointer-events-none z-0">

        {/* Solid 5px gold border flush with the template page edges (always stretches with height!) */}
        <div
          className="absolute inset-[1px] border-[5px] pointer-events-none"
          style={{ borderColor: colors.gold }}
        />

        {/* Top Edge Flowers (sitting exactly on the line, pointing downwards) */}
        <div className="absolute top-[1px] left-[1px] right-[1px] flex justify-between">
          {[...Array(numHorizontal)].map((_, i) => (
            <BorderMotif key={`top-${i}`} style={{ transform: "rotate(180deg)" }} />
          ))}
        </div>

        {/* Bottom Edge Flowers (sitting exactly on the line, pointing upwards) */}
        <div className="absolute bottom-[1px] left-[1px] right-[1px] flex justify-between">
          {[...Array(numHorizontal)].map((_, i) => (
            <BorderMotif key={`bottom-${i}`} />
          ))}
        </div>

        {/* Left Edge Flowers (sitting exactly on the line, pointing rightwards, stretches dynamically!) */}
        <div className="absolute top-[48px] bottom-[48px] left-[1px] flex flex-col justify-between">
          {[...Array(numVertical)].map((_, i) => (
            <BorderMotif key={`left-${i}`} style={{ transform: "rotate(90deg)" }} />
          ))}
        </div>

        {/* Right Edge Flowers (sitting exactly on the line, pointing leftwards, stretches dynamically!) */}
        <div className="absolute top-[48px] bottom-[48px] right-[1px] flex flex-col justify-between">
          {[...Array(numVertical)].map((_, i) => (
            <BorderMotif key={`right-${i}`} style={{ transform: "rotate(270deg)" }} />
          ))}
        </div>
      </div>

      {/* 2. PREMIUM CONTENT AREA */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-4 mt-2">

          {/* Header Section */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-2">
              <img
                src={`/images/gods/${godPhotoId || "god-1"}.png`}
                className="h-14 w-14 object-contain drop-shadow-md"
                alt="God Symbol"
              />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mb-2.5 text-[#8D1B1B]">
              {shloka}
            </p>
            <div className="flex flex-col items-center">
              <h1 className="text-3.5xl font-black uppercase tracking-[0.22em] mb-1 text-[#8D1B1B] drop-shadow-sm">
                {biodataTitle || t.biodataTitleDefault}
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-10 h-0.5 bg-[#D49E25]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#D49E25]" />
                <div className="w-10 h-0.5 bg-[#D49E25]" />
              </div>
            </div>
          </div>

          {/* Main Body content */}
          <div className="flex flex-col gap-5 min-h-0 py-2">

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
                      <div className="p-1.5 shadow-xl relative bg-white border border-[#D49E25]/30">
                        {/* Decorative golden frame corners */}
                        <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D49E25]" />
                        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D49E25]" />
                        <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D49E25]" />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D49E25]" />

                        <div className="w-[120px] h-[150px] overflow-hidden border border-[#D49E25]/15 bg-zinc-50">
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
              <div className="h-px flex-1 bg-[#D49E25]" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#D49E25]" />
              <div className="h-px flex-1 bg-[#D49E25]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
