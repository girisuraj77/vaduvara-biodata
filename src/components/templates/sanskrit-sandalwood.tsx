"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function SanskritSandalwood({ data: externalData }: { data?: any }) {
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

  // Premium Sanskrit Sandalwood Palette
  const colors = {
    bg: "#FAF4E8",           // Auspicious Sandalwood Beige
    maroon: "#701A1E",       // Sacred Deep Maroon Accent
    gold: "#C59B27",         // Matte Vedic Gold
    textDark: "#33221C",     // Elegant Earthy Charcoal
    textMuted: "#6B5851",    // Muted Earthy Brown
  };

  // Vedic Swastik / Mandala Symbol for dividers
  const VedicKnot = () => (
    <svg viewBox="0 0 100 100" className="w-5 h-5 fill-[#C59B27]">
      <path d="M50 0 L58 35 L93 25 L65 50 L93 75 L58 65 L50 100 L42 65 L7 75 L35 50 L7 25 L42 35 Z" />
    </svg>
  );

  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest text-[#701A1E] mt-0.5">
        {label}:
      </div>
      <div className="text-[13.5px] font-bold text-[#33221C] leading-normal break-words">
        {value}
      </div>
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 my-1.5">
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.maroon }} />
      <div className="flex items-center gap-2">
        <VedicKnot />
        <span className="text-[13px] font-black tracking-[0.25em] uppercase text-[#701A1E]">
          {title}
        </span>
        <VedicKnot />
      </div>
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.maroon }} />
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-14 pt-14 pb-14 shrink-0 shadow-2xl bg-[#FAF4E8]"
      style={{ color: colors.textDark }}
    >
      {/* 1. DECORATIVE BACKGROUND & CALLIGRAPHY LAYER */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft watermark of ancient Sanskrit text in the background */}
        <div className="absolute inset-x-12 inset-y-16 opacity-[0.03] select-none text-[9px] leading-[1.8] font-serif break-all overflow-hidden text-[#701A1E]">
          {Array(30).fill("॥ ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥ ॐ नमः शिवाय ॥ शुभ विवाह ॥ कल्याणमस्तु ॥").join(" ")}
        </div>

        {/* Vintage Maroon Border with Inner Gold Frame */}
        <div className="absolute inset-6 border border-[#701A1E]/30" />
        <div className="absolute inset-8 border-[1.5px] border-[#701A1E]" />
        <div className="absolute inset-[36px] border border-[#C59B27]/40" />

        {/* Corner Ornaments */}
        {[0, 1, 2, 3].map(i => (
          <svg key={i} width="40" height="40" viewBox="0 0 40 40"
            style={{
              position: "absolute",
              top: i < 2 ? 24 : undefined,
              bottom: i >= 2 ? 24 : undefined,
              left: i % 2 === 0 ? 24 : undefined,
              right: i % 2 !== 0 ? 24 : undefined,
              transform: `rotate(${i * 90}deg)`
            }}
            className="fill-none stroke-[#701A1E] stroke-[2]"
          >
            <path d="M 4,36 L 4,4 L 36,4" />
            <path d="M 8,32 L 8,8 L 32,8" stroke={colors.gold} strokeWidth="1" opacity="0.6" />
            <circle cx="4" cy="4" r="2.5" fill={colors.maroon} />
          </svg>
        ))}
      </div>

      {/* 2. MAIN CONTENT AREA */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-4 mt-6">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            {godPhotoId && (
              <div className="mb-2">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center p-2 border-[1.5px] border-[#701A1E] shadow-md">
                  <img
                    src={`/images/gods/${godPhotoId}.png`}
                    className="h-full w-full object-contain"
                    alt="God Symbol"
                  />
                </div>
              </div>
            )}
            <p className="text-[11px] font-black uppercase tracking-[0.35em] mb-2 text-[#701A1E]">
              {shloka}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-[0.25em] mb-1 text-[#701A1E]">
              {biodataTitle || t.biodataTitleDefault}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-16 h-px" style={{ backgroundColor: colors.gold }} />
              <VedicKnot />
              <div className="w-16 h-px" style={{ backgroundColor: colors.gold }} />
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
                      <div className="p-1 border-2 border-[#701A1E] bg-white shadow-lg">
                        <div className="w-[120px] h-[150px] overflow-hidden border border-zinc-100 bg-[#FAF4E8]">
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
              <div className="h-px flex-1" style={{ backgroundColor: colors.maroon }} />
              <VedicKnot />
              <div className="h-px flex-1" style={{ backgroundColor: colors.maroon }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
