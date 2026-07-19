"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";
import { cn } from "@/lib/utils";

export function TraditionalGold({ data: externalData }: { data?: any }) {
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

  // Premium Traditional Colors
  const colors = {
    bg: "#FFF9F0", // Creamy paper texture
    accent: "#B8860B", // Dark Goldenrod
    primary: "#8B0000", // Deep Red
    text: "#4A3728", // Rich Brown
  };

  const FieldRow = ({ label, value }: { label: string, value: string }) => (
    <div className="grid grid-cols-[160px_1fr] gap-x-4 border-primary/5 pb-0.5 items-start">
      <div className="text-[10.5px] font-black uppercase tracking-widest text-[#4A3728] mt-0.5">
        {label}:
      </div>
      <div className="text-[13.5px] font-bold text-[#4A3728] leading-tight break-words">
        {value}
      </div>
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-16 pt-16 pb-20 shrink-0 shadow-2xl"
      style={{ color: colors.text }}
    >
      {/* 1. DECORATIVE BACKGROUND (Absolute Layer) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Corner Ornaments */}
        <div className="absolute top-0 left-0 w-48 h-48 opacity-20 rotate-0">
          <svg viewBox="0 0 200 200" fill={colors.accent}>
            <path d="M0,0 L200,0 C150,50 50,150 0,200 Z" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-48 h-48 opacity-20 rotate-90">
          <svg viewBox="0 0 200 200" fill={colors.accent}>
            <path d="M0,0 L200,0 C150,50 50,150 0,200 Z" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-48 h-48 opacity-20 -rotate-90">
          <svg viewBox="0 0 200 200" fill={colors.accent}>
            <path d="M0,0 L200,0 C150,50 50,150 0,200 Z" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-48 h-48 opacity-20 rotate-180">
          <svg viewBox="0 0 200 200" fill={colors.accent}>
            <path d="M0,0 L200,0 C150,50 50,150 0,200 Z" />
          </svg>
        </div>

        {/* Main Border */}
        <div className="absolute inset-8 border-[4px] border-double opacity-30" style={{ borderColor: colors.accent }} />
        <div className="absolute inset-10 border-[1px] opacity-20" style={{ borderColor: colors.accent }} />
      </div>

      {/* 2. CONTENT AREA - Balanced spacing */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              <img
                src={`/images/gods/${godPhotoId || 'god-1'}.png`}
                className="h-14 w-14 object-contain drop-shadow-md"
                alt="God Symbol"
              />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-3 opacity-60" style={{ color: colors.primary }}>
              {shloka}
            </p>
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-black uppercase tracking-[0.25em] mb-1" style={{ color: colors.primary }}>
                {biodataTitle || t.biodataTitleDefault}
              </h1>
              <div className="h-1 w-32 rounded-full" style={{ backgroundColor: colors.accent }} />
            </div>
          </div>

          {/* Main Body */}
          <div className="flex flex-col gap-6 min-h-0 py-4">

            {/* Section 1: Personal with Photo on Right */}
            {personalFields.length > 0 && (
              <div className="space-y-2 pt-2">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4">
                  <span className="h-px flex-1" style={{ backgroundColor: colors.accent + "33" }} />
                  <span style={{ color: colors.primary }}>{stepHeadings[1] || "Personal Details"}</span>
                  <span className="h-px flex-1" style={{ backgroundColor: colors.accent + "33" }} />
                </h2>

                <div className="flex gap-6 px-4 items-start">
                  {/* Fields List */}
                  <div className="flex-1 grid grid-cols-1 gap-1">
                    {personalFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                  </div>

                  {/* Profile Photo */}
                  {profilePhotoUrl && (
                    <div className="shrink-0 mt-1">
                      <div className="p-1.5 shadow-xl relative" style={{ backgroundColor: colors.bg }}>
                        {/* Decorative photo corners */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: colors.accent }} />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: colors.accent }} />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: colors.accent }} />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: colors.accent }} />

                        <div className="w-[120px] h-[150px] overflow-hidden border" style={{ borderColor: colors.accent + "33" }}>
                          <img src={profilePhotoUrl} className="w-full h-full object-cover" alt="Profile" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section 2: Family */}
            {familyFields.length > 0 && (
              <div className="space-y-2 pt-4">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4">
                  <span className="h-px flex-1" style={{ backgroundColor: colors.accent + "33" }} />
                  <span style={{ color: colors.primary }}>{stepHeadings[2] || "Family Details"}</span>
                  <span className="h-px flex-1" style={{ backgroundColor: colors.accent + "33" }} />
                </h2>
                <div className="grid grid-cols-1 gap-1 px-4">
                  {familyFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                </div>
              </div>
            )}

            {/* Section 3: Contact */}
            {contactFields.length > 0 && (
              <div className="space-y-2 pt-4">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4">
                  <span className="h-px flex-1" style={{ backgroundColor: colors.accent + "33" }} />
                  <span style={{ color: colors.primary }}>{stepHeadings[3] || t.contactDetails}</span>
                  <span className="h-px flex-1" style={{ backgroundColor: colors.accent + "33" }} />
                </h2>
                <div className="grid grid-cols-1 gap-1 px-4">
                  {contactFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                </div>
              </div>
            )}

          </div>

          <div className="pt-4 flex flex-col items-center opacity-40">
            <div className="flex items-center gap-4 w-full px-20 mb-2">
              <div className="h-px flex-1 bg-zinc-300" />
              <div className="w-2 h-2 rotate-45 border border-zinc-400" />
              <div className="h-px flex-1 bg-zinc-300" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
