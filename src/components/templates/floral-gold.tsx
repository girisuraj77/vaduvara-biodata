"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";
import { cn } from "@/lib/utils";

export function FloralGold({ data: externalData }: { data?: any }) {
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

  // Floral Gold Theme Colors
  const colors = {
    bg: "#FFFFFF",
    primary: "#DAA520", // Goldenrod
    secondary: "#B8860B", // Dark Goldenrod
    text: "#2D2D2D",
    label: "#8B6508", // Darker gold for labels
  };

  const FieldRow = ({ label, value }: { label: string, value: string }) => (
    <div className="grid grid-cols-[160px_1fr] gap-x-4 border-b border-primary/10 pb-0.5 items-start">
      <div className="text-[10.5px] font-black uppercase tracking-widest text-[#B8860B] mt-0.5 opacity-90">
        {label}:
      </div>
      <div className="text-[13.5px] font-bold text-[#2D2D2D] leading-tight break-words">
        {value}
      </div>
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-20 pt-16 pb-20 shrink-0 shadow-2xl bg-white"
      style={{ color: colors.text }}
    >
      {/* 1. DECORATIVE BORDERS (Absolute Layer) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Main Solid Gold Outer Border */}
        <div className="absolute inset-x-4 inset-y-4 border-[6px] border-[#DAA520]" />
        {/* Inner Thin Border */}
        <div className="absolute inset-x-12 inset-y-8 border-[1px] border-[#DAA520]" />

        {/* Define SVG patterns for floral border */}
        <svg width="0" height="0">
          <defs>
            {/* Repeating floral/vine pattern for sides */}
            <pattern id="floral-pattern" x="0" y="0" width="40" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M20,0 C30,20 40,30 20,50 C0,70 10,80 20,100 C15,80 0,70 20,50 C40,30 30,20 20,0 Z M20,25 Q35,25 35,40 Q35,25 20,25 M20,75 Q5,75 5,60 Q5,75 20,75"
                fill="#DAA520"
                opacity="0.8"
              />
              <circle cx="20" cy="50" r="3" fill="#DAA520" />
              <circle cx="20" cy="0" r="3" fill="#DAA520" />
              <circle cx="20" cy="100" r="3" fill="#DAA520" />
              <path d="M5,15 Q15,10 20,25 Q15,10 5,15" fill="#DAA520" />
              <path d="M35,85 Q25,90 20,75 Q25,90 35,85" fill="#DAA520" />
              {/* Additional leaf details */}
              <path d="M20,10 C10,15 10,25 20,30 C30,25 30,15 20,10 Z" fill="#DAA520" opacity="0.6"/>
              <path d="M20,60 C10,65 10,75 20,80 C30,75 30,65 20,60 Z" fill="#DAA520" opacity="0.6"/>
            </pattern>
            {/* Elegant Corner Ornament */}
            <g id="floral-corner">
              <path d="M0,0 L60,0 C60,30 30,60 0,60 Z" fill="#DAA520" />
              <path d="M10,10 L50,10 C50,20 20,50 10,50 Z" fill="#FFFFFF" />
              <circle cx="15" cy="15" r="4" fill="#DAA520" />
              <path d="M25,15 Q35,10 40,20 Q30,25 25,15 Z" fill="#DAA520" />
              <path d="M15,25 Q10,35 20,40 Q25,30 15,25 Z" fill="#DAA520" />
            </g>
          </defs>
        </svg>

        {/* Left Floral Border */}
        <div className="absolute top-8 bottom-8 left-4 w-10">
          <svg width="100%" height="100%">
            <rect width="100%" height="100%" fill="url(#floral-pattern)" />
          </svg>
        </div>

        {/* Right Floral Border */}
        <div className="absolute top-8 bottom-8 right-4 w-10 rotate-180">
          <svg width="100%" height="100%">
            <rect width="100%" height="100%" fill="url(#floral-pattern)" />
          </svg>
        </div>

        {/* Top Center Flourish */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-48 h-8 flex justify-center items-center">
          <svg viewBox="0 0 200 40" fill="none" stroke="#DAA520" strokeWidth="2">
            <path d="M0,20 Q50,0 100,20 Q150,40 200,20" />
            <circle cx="100" cy="20" r="5" fill="#DAA520" />
            <path d="M80,20 Q90,10 100,20 Q110,30 120,20" fill="#DAA520" />
          </svg>
        </div>

        {/* Bottom Center Flourish */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-8 flex justify-center items-center rotate-180">
          <svg viewBox="0 0 200 40" fill="none" stroke="#DAA520" strokeWidth="2">
            <path d="M0,20 Q50,0 100,20 Q150,40 200,20" />
            <circle cx="100" cy="20" r="5" fill="#DAA520" />
            <path d="M80,20 Q90,10 100,20 Q110,30 120,20" fill="#DAA520" />
          </svg>
        </div>

        {/* Corners */}
        <svg className="absolute top-4 left-4 w-16 h-16"><use href="#floral-corner" /></svg>
        <svg className="absolute top-4 right-4 w-16 h-16 rotate-90"><use href="#floral-corner" /></svg>
        <svg className="absolute bottom-4 left-4 w-16 h-16 -rotate-90"><use href="#floral-corner" /></svg>
        <svg className="absolute bottom-4 right-4 w-16 h-16 rotate-180"><use href="#floral-corner" /></svg>
      </div>

      {/* 2. CONTENT AREA - Balanced spacing */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-6 pl-4 pr-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center p-2 border-2 border-[#DAA520] shadow-sm">
                <img
                  src={`/images/gods/${godPhotoId || 'god-1'}.png`}
                  className="h-full w-full object-contain"
                  alt="God Symbol"
                />
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 text-[#8B6508] opacity-80">
              {shloka}
            </p>
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-black uppercase tracking-[0.25em] mb-1 text-[#DAA520]">
                {biodataTitle || t.biodataTitleDefault}
              </h1>
              <div className="flex items-center gap-2">
                <div className="h-[1px] w-16 bg-[#DAA520]" />
                <div className="w-2 h-2 rotate-45 border border-[#DAA520]" />
                <div className="h-[1px] w-16 bg-[#DAA520]" />
              </div>
            </div>
          </div>

          {/* Main Body */}
          <div className="flex flex-col gap-6 min-h-0 py-4">

            {/* Personal Details */}
            {personalFields.length > 0 && (
              <div className="space-y-3 pt-2">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4 text-[#DAA520]">
                  <span className="h-px flex-1 bg-[#DAA520]/25" />
                  <span className="shrink-0">{stepHeadings[1] || "Personal Details"}</span>
                  <span className="h-px flex-1 bg-[#DAA520]/25" />
                </h2>

                <div className="flex gap-6 px-6 items-start">
                  {/* Fields List */}
                  <div className="flex-1 grid grid-cols-1 gap-1">
                    {personalFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                  </div>

                  {/* Profile Photo */}
                  {profilePhotoUrl && (
                    <div className="shrink-0 mt-1">
                      <div className="relative p-1.5 border-2 border-[#DAA520] bg-white">
                        <div className="w-[120px] h-[150px] overflow-hidden">
                          <img src={profilePhotoUrl} className="w-full h-full object-cover" alt="Profile" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Family Details */}
            {familyFields.length > 0 && (
              <div className="space-y-3 pt-4">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4 text-[#DAA520]">
                  <span className="h-px flex-1 bg-[#DAA520]/25" />
                  <span className="shrink-0">{stepHeadings[2] || "Family Details"}</span>
                  <span className="h-px flex-1 bg-[#DAA520]/25" />
                </h2>
                <div className="grid grid-cols-1 gap-1 px-6">
                  {familyFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                </div>
              </div>
            )}

            {/* Contact Details */}
            {contactFields.length > 0 && (
              <div className="space-y-3 pt-4">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-4 text-[#DAA520]">
                  <span className="h-px flex-1 bg-[#DAA520]/25" />
                  <span className="shrink-0">{stepHeadings[3] || t.contactDetails}</span>
                  <span className="h-px flex-1 bg-[#DAA520]/25" />
                </h2>
                <div className="grid grid-cols-1 gap-1 px-6">
                  {contactFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                </div>
              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}
