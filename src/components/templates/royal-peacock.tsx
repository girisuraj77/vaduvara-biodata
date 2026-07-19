"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function RoyalPeacock({ data: externalData }: { data?: any }) {
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

  // Premium Royal Peacock Theme Colors
  const colors = {
    bgStart: "#0B1A30",       // Deep Royal Peacock Indigo Start
    bgEnd: "#030B18",         // Velvet Dark Peacock Night End
    teal: "#0D9488",          // Radiant Peacock Teal
    bronze: "#CD7F32",        // Metallic Bronze Accent
    goldLight: "#FFE590",     // Luminous Soft Starlight Gold
    creamText: "#FFF2CD",     // Warm High-Contrast Cream Text
  };

  // Highly detailed stylized Peacock Feather SVG
  const PeacockFeather = ({ size = 32 }: { size?: number }) => (
    <svg viewBox="0 0 100 120" style={{ width: size, height: size * 1.2 }} className="shrink-0 pointer-events-none">
      {/* Stem */}
      <path d="M50,120 Q48,70 50,0" stroke={colors.teal} strokeWidth="3" fill="none" opacity="0.6" />
      {/* Outer Feather Eye */}
      <path d="M50,0 C20,20 15,60 50,85 C85,60 80,20 50,0 Z" fill={colors.teal} opacity="0.8" />
      {/* Mid Feather Eye */}
      <path d="M50,15 C30,30 28,55 50,72 C72,55 70,30 50,15 Z" fill={colors.bronze} />
      {/* Inner Core Eye */}
      <path d="M50,28 C38,38 38,50 50,60 C62,50 62,38 50,28 Z" fill="#030B18" />
      <circle cx="50" cy="44" r="6" fill={colors.goldLight} />
      {/* Radiant Barbs */}
      {[...Array(14)].map((_, i) => {
        const offset = (i - 7) * 8;
        return (
          <path
            key={i}
            d={`M50,${40 + i * 2} Q${20 + offset},${20 + i * 4} ${10 + offset * 0.5},${30 + i * 5}`}
            stroke={colors.teal}
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
        );
      })}
    </svg>
  );

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

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 my-1.5">
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.bronze }} />
      <div className="flex items-center gap-1.5">
        <PeacockFeather size={16} />
        <span className="text-[13px] font-black tracking-[0.25em] uppercase text-[#FFE590]">
          {title}
        </span>
        <PeacockFeather size={16} />
      </div>
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.bronze }} />
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
      {/* 1. PEACOCK FEATHER DECORATIVE FRAMES */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Bronze Metallic Double Frame */}
        <div className="absolute inset-6 border border-[#CD7F32]/25" />
        <div className="absolute inset-8 border-[1.5px] border-[#CD7F32]/50" />

        {/* Soft Teal / Teal Luminous Spotlight Highlights */}
        <div className="absolute -top-10 -left-10 w-[350px] h-[350px] rounded-full opacity-15 blur-[100px]"
          style={{ background: `radial-gradient(circle, ${colors.teal} 0%, transparent 75%)` }} />
        <div className="absolute -top-10 -right-10 w-[350px] h-[350px] rounded-full opacity-15 blur-[100px]"
          style={{ background: `radial-gradient(circle, ${colors.teal} 0%, transparent 75%)` }} />

        {/* Floating Peacock Feathers in four corners */}
        <div className="absolute top-[28px] left-[28px] rotate-[45deg] opacity-70"><PeacockFeather size={32} /></div>
        <div className="absolute top-[28px] right-[28px] rotate-[-45deg] opacity-70"><PeacockFeather size={32} /></div>
        <div className="absolute bottom-[28px] left-[28px] rotate-[135deg] opacity-70"><PeacockFeather size={32} /></div>
        <div className="absolute bottom-[28px] right-[28px] rotate-[-135deg] opacity-70"><PeacockFeather size={32} /></div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-4 mt-6">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            {godPhotoId && (
              <div className="mb-2">
                <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center p-2 border-[1.5px] border-[#CD7F32] shadow-xl backdrop-blur-md">
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
            <div className="flex items-center gap-3 mt-1">
              <div className="w-16 h-px" style={{ backgroundColor: colors.bronze }} />
              <PeacockFeather size={14} />
              <div className="w-16 h-px" style={{ backgroundColor: colors.bronze }} />
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
                      <div className="p-1.5 shadow-2xl relative bg-white/10 backdrop-blur-sm" style={{ border: `1.5px solid ${colors.bronze}` }}>
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
              <div className="h-px flex-1" style={{ backgroundColor: colors.bronze }} />
              <PeacockFeather size={14} />
              <div className="h-px flex-1" style={{ backgroundColor: colors.bronze }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
