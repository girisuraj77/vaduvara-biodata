"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function RoyalTealGold({ data: externalData }: { data?: any }) {
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

  // Color palette matched from the reference image
  const colors = {
    bg: "#204A56",          // Deep teal background
    gold: "#CBA24C",        // Filigree / border line gold
    goldLight: "#F3E2A9",   // Gradient highlight
    goldDark: "#A9791F",    // Gradient shadow
    titleGold: "#E3B94E",   // BIO DATA title & section headings
    labelText: "#EAF2F3",   // Field label (near-white)
    valueText: "#D6E3E5",   // Field value (soft off-white)
  };

  // Field Row Component — label : value, colon aligned, light text on dark background
  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[170px_1fr] gap-x-2 py-[3px] items-start text-[13.5px] leading-snug">
      <div className="font-medium" style={{ color: colors.labelText }}>
        {label}
      </div>
      <div className="flex items-start" style={{ color: colors.valueText }}>
        <span className="mr-3" style={{ color: colors.labelText }}>
          :
        </span>
        <span className="flex-1 break-words">{value}</span>
      </div>
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-14 pt-10 pb-14 shrink-0 shadow-2xl"
      style={{
        backgroundColor: colors.bg,
        color: colors.valueText,
        fontFamily: "'Segoe UI', Georgia, serif, sans-serif",
      }}
    >
      {/* 1. GOLD FRAME — solid gradient border edge-to-edge + paisley filigree only in the
          top-right and bottom-left corners (diagonal symmetry, matching the reference) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 794 1123"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="royalTealGoldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.goldLight} />
            <stop offset="50%" stopColor={colors.gold} />
            <stop offset="100%" stopColor={colors.goldDark} />
          </linearGradient>
        </defs>

        {/* Outer border — flush with the page edge */}
        <rect x="5" y="5" width="784" height="1113" fill="none" stroke="url(#royalTealGoldBorder)" strokeWidth="10" />

        {/* Paisley corner filigree (master, reused at top-right & bottom-left only) */}
        <defs>
          <g id="paisley-corner-master">
            {/* Large paisley swirl */}
            <path
              d="M 0 40 C -40 10 -95 8 -130 40 C -158 66 -158 108 -128 130
                 C -104 148 -70 140 -60 116 C -52 98 -64 80 -84 82
                 C -98 84 -104 98 -94 108"
              fill="none"
              stroke={colors.gold}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <circle cx="-94" cy="108" r="2.6" fill={colors.gold} />

            {/* Secondary smaller paisley */}
            <path
              d="M -10 60 C -30 46 -56 48 -68 66 C -78 82 -70 100 -52 100
                 C -40 100 -34 90 -42 84"
              fill="none"
              stroke={colors.gold}
              strokeWidth="1.3"
              strokeLinecap="round"
            />

            {/* Trailing vine stems along both edges */}
            <path d="M -4 8 C -40 4 -80 4 -120 10" fill="none" stroke={colors.gold} strokeWidth="1.2" />
            <path d="M 8 4 C 4 40 4 80 10 120" fill="none" stroke={colors.gold} strokeWidth="1.2" />

            {/* Small leaves along the vines */}
            <g fill={colors.gold} stroke="none">
              <path d="M -30 7 Q -34 -3 -46 -1 Q -42 11 -30 7 Z" />
              <path d="M -55 6 Q -59 -4 -71 -2 Q -67 10 -55 6 Z" />
              <path d="M -80 8 Q -84 -2 -96 0 Q -92 12 -80 8 Z" />
              <path d="M -105 11 Q -109 1 -121 3 Q -117 15 -105 11 Z" />

              <path d="M 7 30 Q 17 26 15 14 Q 3 18 7 30 Z" />
              <path d="M 6 55 Q 16 51 14 39 Q 2 43 6 55 Z" />
              <path d="M 8 80 Q 18 76 16 64 Q 4 68 8 80 Z" />
              <path d="M 11 105 Q 21 101 19 89 Q 7 93 11 105 Z" />
            </g>

            {/* Accent dot cluster at the very corner tip */}
            <circle cx="0" cy="0" r="3" fill={colors.gold} />
            <circle cx="-16" cy="-4" r="1.8" fill={colors.gold} />
            <circle cx="-4" cy="-16" r="1.8" fill={colors.gold} />
          </g>
        </defs>

        {/* Top-Right Corner */}
        <use href="#paisley-corner-master" transform="translate(789, 5)" />

        {/* Bottom-Left Corner (180° rotated — diagonal symmetry) */}
        <use href="#paisley-corner-master" transform="translate(5, 1118) rotate(180)" />
      </svg>

      {/* 2. CONTENT AREA */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1">
          {/* Header: Shloka | Ganesh icon | BIO DATA title — all centered */}
          <div className="flex flex-col items-center text-center mb-8">
            <p
              className="text-[11px] tracking-[0.2em] uppercase mb-3"
              style={{ color: colors.gold, opacity: 0.85 }}
            >
              {shloka || "|| Shree Ganesh ||"}
            </p>

            <img
              src={`/images/gods/${godPhotoId || "god-1"}.png`}
              className="h-10 w-10 object-contain mb-2"
              alt="Lord Ganesha"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />

            <h1
              className="text-[28px] font-bold tracking-[0.15em] uppercase"
              style={{ color: colors.titleGold, fontFamily: "Georgia, serif" }}
            >
              {biodataTitle || "Bio Data"}
            </h1>
          </div>

          {/* Body Sections */}
          <div className="flex flex-col gap-7 flex-1">
            {/* Section 1: Personal Details (with photo aligned to the right) */}
            {personalFields && personalFields.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2
                  className="text-[15px] font-bold tracking-[0.1em] uppercase mb-1"
                  style={{ color: colors.titleGold, fontFamily: "Georgia, serif" }}
                >
                  {stepHeadings?.[1] || t.personalDetails || "Personal Details"}
                </h2>
                <div className="flex flex-row gap-6">
                  <div className="flex flex-col flex-1">
                    {personalFields.map((field: any, idx: number) => (
                      <FieldRow key={idx} label={field.label} value={field.value} />
                    ))}
                  </div>
                  {profilePhotoUrl && (
                    <div
                      className="w-[130px] h-[160px] shrink-0 overflow-hidden"
                      style={{ border: `2px solid ${colors.gold}` }}
                    >
                      <img src={profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section 2: Family Details */}
            {familyFields && familyFields.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2
                  className="text-[15px] font-bold tracking-[0.1em] uppercase mb-1"
                  style={{ color: colors.titleGold, fontFamily: "Georgia, serif" }}
                >
                  {stepHeadings?.[2] || t.familyDetails || "Family Details"}
                </h2>
                <div className="flex flex-col">
                  {familyFields.map((field: any, idx: number) => (
                    <FieldRow key={idx} label={field.label} value={field.value} />
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Contact Details */}
            {contactFields && contactFields.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2
                  className="text-[15px] font-bold tracking-[0.1em] uppercase mb-1"
                  style={{ color: colors.titleGold, fontFamily: "Georgia, serif" }}
                >
                  {stepHeadings?.[3] || t.contactDetails || "Contact Details"}
                </h2>
                <div className="flex flex-col">
                  {contactFields.map((field: any, idx: number) => (
                    <FieldRow key={idx} label={field.label} value={field.value} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
