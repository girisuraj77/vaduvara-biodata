"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function IvoryFiligree({ data: externalData }: { data?: any }) {
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

  // Premium Sandstone Ivory & Vintage Maroon Theme Colors
  const colors = {
    bg: "#FAF0DB", // Creamy Vintage Ivory Paper
    gold: "#C59B27", // Rich Antique Gold
    goldLight: "#F0DFAD", // Light Gold Highlighting
    maroon: "#7D000B", // Premium Indian Wedding Crimson Red
    textDark: "#332211", // Deep Chocolate Brown Field Text
  };

  // Semicircle Symmetrical Mandala (Centered on left and right edges)
  const EdgeMandala = ({ side }: { side: "left" | "right" }) => {
    const isLeft = side === "left";
    return (
      <svg 
        viewBox={`0 0 100 200`} 
        style={{ 
          width: "80px", 
          height: "160px",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          [isLeft ? "left" : "right"]: "0px",
          transformOrigin: "center",
          rotate: isLeft ? "0deg" : "180deg"
        }}
        className="shrink-0 opacity-40 pointer-events-none"
      >
        {/* Concentric Arches */}
        <circle cx="0" cy="100" r="90" fill="none" stroke={colors.gold} strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="0" cy="100" r="75" fill="none" stroke={colors.gold} strokeWidth="1.5" />
        <circle cx="0" cy="100" r="60" fill="none" stroke={colors.gold} strokeWidth="2.5" />
        <circle cx="0" cy="100" r="45" fill="none" stroke={colors.gold} strokeWidth="1" />
        <circle cx="0" cy="100" r="30" fill="none" stroke={colors.gold} strokeWidth="1.5" />
        <circle cx="0" cy="100" r="15" fill={colors.gold} opacity="0.2" />

        {/* Traditional Fan Rays */}
        {[...Array(13)].map((_, i) => {
          const angle = -90 + i * 15; // fan from -90 to 90 degrees
          const rad = (angle * Math.PI) / 180;
          const x = 75 * Math.cos(rad);
          const y = 100 + 75 * Math.sin(rad);
          return (
            <line
              key={i}
              x1="0"
              y1="100"
              x2={x}
              y2={y}
              stroke={colors.gold}
              strokeWidth="1.2"
            />
          );
        })}

        {/* Outer Crown/Petal Points */}
        {[...Array(9)].map((_, i) => {
          const angle = -80 + i * 20;
          const rad = (angle * Math.PI) / 180;
          const xBase = 75 * Math.cos(rad);
          const yBase = 100 + 75 * Math.sin(rad);
          const xTip = 85 * Math.cos(rad);
          const yTip = 100 + 85 * Math.sin(rad);
          return (
            <g key={i}>
              <path
                d={`M ${xBase},${yBase} L ${xTip},${yTip} L ${75 * Math.cos((angle+10)*Math.PI/180)},${100 + 75 * Math.sin((angle+10)*Math.PI/180)}`}
                fill={colors.gold}
              />
              <circle cx={xTip} cy={yTip} r="2" fill={colors.gold} />
            </g>
          );
        })}
      </svg>
    );
  };

  // Field Row Renderer
  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 border-b border-[#C59B27]/10 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest text-[#7D000B] mt-0.5">
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
      <div className="flex-1 h-px bg-[#C59B27]/30" />
      <div className="flex items-center gap-1.5">
        <svg viewBox="0 0 100 100" className="w-4 h-4 fill-[#7D000B]">
          <path d="M50 0 L58 35 L93 25 L65 50 L93 75 L58 65 L50 100 L42 65 L7 75 L35 50 L7 25 L42 35 Z" />
        </svg>
        <span className="text-[13px] font-black tracking-[0.25em] uppercase text-[#7D000B]">
          {title}
        </span>
        <svg viewBox="0 0 100 100" className="w-4 h-4 fill-[#7D000B]">
          <path d="M50 0 L58 35 L93 25 L65 50 L93 75 L58 65 L50 100 L42 65 L7 75 L35 50 L7 25 L42 35 Z" />
        </svg>
      </div>
      <div className="flex-1 h-px bg-[#C59B27]/30" />
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-14 pt-14 pb-14 shrink-0 shadow-2xl"
      style={{
        backgroundColor: colors.bg,
        color: colors.textDark
      }}
    >
      {/* 1. DECORATIVE RETINA GOLD FILIGREE BORDERS & EDGE MANDALAS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Seamless Repeating Paisley/Filigree Pattern Borders */}
        <svg className="absolute inset-x-0 top-[2px] w-full h-[40px]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="filigree-top" width="58" height="40" patternUnits="userSpaceOnUse">
              {/* Paisley/Lotus Filigree Wave Waveform */}
              <path
                d="M 0,25 Q 14,5 29,25 T 58,25 M 0,25 Q 14,40 29,25 T 58,25"
                fill="none"
                stroke={colors.gold}
                strokeWidth="1.8"
              />
              <path
                d="M 14,18 C 18,10 40,10 44,18 C 38,24 20,24 14,18 Z"
                fill={colors.gold}
                opacity="0.25"
              />
              <circle cx="29" cy="25" r="2.5" fill={colors.gold} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#filigree-top)" />
        </svg>

        <svg className="absolute inset-x-0 bottom-[2px] w-full h-[40px]" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#filigree-top)" className="transform rotate-180 origin-center" />
        </svg>

        {/* 2px solid gold frame line */}
        <div 
          className="absolute inset-[3px] border-2 pointer-events-none"
          style={{ borderColor: colors.gold }}
        />

        {/* Circular Side Mandalas */}
        <EdgeMandala side="left" />
        <EdgeMandala side="right" />
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
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mb-2.5 text-[#7D000B]">
              {shloka}
            </p>
            <div className="flex flex-col items-center">
              <h1 className="text-3.5xl font-black uppercase tracking-[0.22em] mb-1 text-[#7D000B] drop-shadow-sm">
                {biodataTitle || t.biodataTitleDefault}
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-10 h-[0.5px] bg-[#C59B27]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#7D000B]" />
                <div className="w-10 h-[0.5px] bg-[#C59B27]" />
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
                      <div className="p-1.5 shadow-xl relative bg-white border border-[#C59B27]/40">
                        {/* Decorative golden frame corners */}
                        <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#7D000B]" />
                        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#7D000B]" />
                        <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#7D000B]" />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#7D000B]" />

                        <div className="w-[120px] h-[150px] overflow-hidden border border-[#C59B27]/15 bg-zinc-50">
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
              <div className="h-[0.5px] flex-1 bg-[#C59B27]" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#7D000B]" />
              <div className="h-[0.5px] flex-1 bg-[#C59B27]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
