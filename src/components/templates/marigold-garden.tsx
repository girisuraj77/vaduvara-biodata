"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function MarigoldGarden({ data: externalData }: { data?: any }) {
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

  // Festive Marigold Theme Colors
  const colors = {
    bg: "#FFFDF9",           // Ultra Clean Warm Milk White
    orange: "#E05A00",       // Vibrant Marigold Orange
    yellow: "#FFB000",       // Luminous Marigold Yellow
    green: "#2E5E3B",        // Mango Leaves Green
    textDark: "#2B1E19",     // Rich Dark Cocoa Charcoal
  };

  // Repeating Marigold Flower SVG for garlands
  const MarigoldFlower = ({ size = 18 }: { size?: number }) => (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }} className="shrink-0 pointer-events-none">
      {/* Outer Petals */}
      <circle cx="50" cy="50" r="42" fill={colors.orange} />
      {[...Array(12)].map((_, i) => (
        <circle
          key={i}
          cx={50 + 30 * Math.cos((i * Math.PI) / 6)}
          cy={50 + 30 * Math.sin((i * Math.PI) / 6)}
          r="16"
          fill={colors.yellow}
        />
      ))}
      {/* Inner Petals */}
      {[...Array(8)].map((_, i) => (
        <circle
          key={i}
          cx={50 + 18 * Math.cos((i * Math.PI) / 4)}
          cy={50 + 18 * Math.sin((i * Math.PI) / 4)}
          r="12"
          fill={colors.orange}
        />
      ))}
      <circle cx="50" cy="50" r="12" fill={colors.yellow} />
    </svg>
  );

  // Mango Leaf Motif (Auspicious toran leaf)
  const MangoLeaf = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 50 100" className={`w-3.5 h-7 fill-[#2E5E3B] ${className}`}>
      <path d="M25,0 C40,40 45,70 25,100 C5,70 10,40 25,0 Z" />
      <path d="M25,0 L25,100" stroke="#1F4227" strokeWidth="1" opacity="0.3" />
    </svg>
  );

  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest text-[#E05A00] mt-0.5">
        {label}:
      </div>
      <div className="text-[13.5px] font-bold text-[#2B1E19] leading-normal break-words">
        {value}
      </div>
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 my-1.5">
      <div className="flex-1 h-[0.5px] bg-[#E05A00]/30" />
      <div className="flex items-center gap-2">
        <MarigoldFlower size={14} />
        <span className="text-[13px] font-black tracking-[0.25em] uppercase text-[#E05A00]">
          {title}
        </span>
        <MarigoldFlower size={14} />
      </div>
      <div className="flex-1 h-[0.5px] bg-[#E05A00]/30" />
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-14 pt-14 pb-14 shrink-0 shadow-2xl bg-[#FFFDF9]"
      style={{ color: colors.textDark }}
    >
      {/* 1. GEOMETRIC MARIGOLD & MANGO LEAVES TORAN BORDER */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Double Inner Frame Lines */}
        <div className="absolute inset-[30px] border border-[#E05A00]/20" />
        <div className="absolute inset-[34px] border-[1.5px] border-[#2E5E3B]/15" />

        {/* Top Auspicious Garland (Toran) */}
        <div className="absolute top-9 left-9 right-9 flex justify-between px-6 z-10">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <MarigoldFlower size={16} />
              <MangoLeaf className="mt-[-2px] origin-top scale-75" />
            </div>
          ))}
        </div>

        {/* Bottom Garland */}
        <div className="absolute bottom-9 left-9 right-9 flex justify-between px-6 z-10">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="flex flex-col items-center rotate-180">
              <MarigoldFlower size={16} />
              <MangoLeaf className="mt-[-2px] origin-top scale-75" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-4 mt-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            {godPhotoId && (
              <div className="mb-2">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center p-2.5 border-[2px] border-[#E05A00] shadow-sm">
                  <img
                    src={`/images/gods/${godPhotoId}.png`}
                    className="h-full w-full object-contain"
                    alt="God Symbol"
                  />
                </div>
              </div>
            )}
            <p className="text-[11px] font-black uppercase tracking-[0.35em] mb-2 text-[#2E5E3B]">
              {shloka}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-[0.25em] mb-1 text-[#E05A00]">
              {biodataTitle || t.biodataTitleDefault}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-16 h-[0.5px] bg-[#E05A00]" />
              <MarigoldFlower size={12} />
              <div className="w-16 h-[0.5px] bg-[#E05A00]" />
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
                      <div className="p-1 border-2 border-[#E05A00] bg-white shadow-md rounded-sm">
                        <div className="w-[120px] h-[150px] overflow-hidden border border-zinc-100 bg-[#FFFDF9]">
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
              <div className="h-[0.5px] flex-1 bg-[#E05A00]" />
              <MarigoldFlower size={12} />
              <div className="h-[0.5px] flex-1 bg-[#E05A00]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
