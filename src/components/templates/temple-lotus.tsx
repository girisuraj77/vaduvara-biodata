"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function TempleLotus({ data: externalData }: { data?: any }) {
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

  // Modern Minimalist Terracotta Theme Colors
  const colors = {
    bg: "#FAF4EC",           // Delicate Warm Clay-White Paper
    terracotta: "#C85A32",   // Traditional Terracotta Earth Red
    accent: "#EAA88C",       // Soft Clay Rose Highlight
    textDark: "#3E261D",     // Deep Charcoal Earthy Espresso
  };

  // Minimalist Lotus SVG motif
  const LineLotus = ({ size = 20, className }: { size?: number; className?: string }) => (
    <svg viewBox="0 0 100 80" style={{ width: size, height: size * 0.8 }} className={`shrink-0 fill-none stroke-[#C85A32] stroke-[2.5] ${className}`}>
      {/* Central petal */}
      <path d="M50,80 C40,45 40,25 50,0 C60,25 60,45 50,80 Z" fill={colors.accent} opacity="0.1" />
      {/* Left petals */}
      <path d="M50,80 C20,50 15,35 30,15 C42,32 45,55 50,80 Z" />
      <path d="M50,80 C0,65 5,45 15,35 C28,48 38,62 50,80 Z" />
      {/* Right petals */}
      <path d="M50,80 C80,50 85,35 70,15 C58,32 55,55 50,80 Z" />
      <path d="M50,80 C100,65 95,45 85,35 C72,48 62,62 50,80 Z" />
    </svg>
  );

  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest text-[#C85A32] mt-0.5">
        {label}:
      </div>
      <div className="text-[13.5px] font-bold text-[#3E261D] leading-normal break-words">
        {value}
      </div>
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 my-1.5">
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.terracotta }} />
      <div className="flex items-center gap-2">
        <LineLotus size={16} />
        <span className="text-[13px] font-black tracking-[0.25em] uppercase text-[#C85A32]">
          {title}
        </span>
        <LineLotus size={16} />
      </div>
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.terracotta }} />
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-14 pt-14 pb-14 shrink-0 shadow-2xl bg-[#FAF4EC]"
      style={{ color: colors.textDark }}
    >
      {/* 1. DECORATIVE MINIMAL ARCHES & LOTUS WATERMARKS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Sleek Terracotta Double Border Frame */}
        <div className="absolute inset-6 border border-[#C85A32]/25" />
        <div className="absolute inset-8 border-[1.5px] border-[#C85A32]" />

        {/* Minimalist Temple Arch vectors inside border */}
        <svg className="absolute inset-x-9 top-9 w-[722px] h-[100px] opacity-15 stroke-[#C85A32] stroke-[1.5] fill-none">
          {/* Central Dome Arch */}
          <path d="M 261,60 C 261,20 461,20 461,60" />
          <path d="M 311,60 C 311,35 411,35 411,60" />
          {/* Side Spires */}
          <path d="M 161,80 L 161,40 L 181,20 L 201,40 L 201,80" />
          <path d="M 521,80 L 521,40 L 541,20 L 561,40 L 561,80" />
        </svg>

        {/* Floating Minimal Lotuses in bottom area */}
        <div className="absolute bottom-[24px] left-[36px] opacity-25"><LineLotus size={36} /></div>
        <div className="absolute bottom-[24px] right-[36px] opacity-25 scale-x-[-1]"><LineLotus size={36} /></div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-4 mt-6">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            {godPhotoId && (
              <div className="mb-2">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center p-2 border-[1.5px] border-[#C85A32] shadow-sm">
                  <img
                    src={`/images/gods/${godPhotoId}.png`}
                    className="h-full w-full object-contain"
                    alt="God Symbol"
                  />
                </div>
              </div>
            )}
            <p className="text-[11px] font-black uppercase tracking-[0.35em] mb-2 text-[#C85A32]">
              {shloka}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-[0.25em] mb-1 text-[#C85A32]">
              {biodataTitle || t.biodataTitleDefault}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-16 h-px" style={{ backgroundColor: colors.terracotta }} />
              <LineLotus size={16} />
              <div className="w-16 h-px" style={{ backgroundColor: colors.terracotta }} />
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
                      <div className="p-1 border-[1.5px] border-[#C85A32] bg-white shadow-md">
                        <div className="w-[120px] h-[150px] overflow-hidden border border-zinc-100 bg-[#FAF4EC]">
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
              <div className="h-px flex-1" style={{ backgroundColor: colors.terracotta }} />
              <LineLotus size={16} />
              <div className="h-px flex-1" style={{ backgroundColor: colors.terracotta }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
