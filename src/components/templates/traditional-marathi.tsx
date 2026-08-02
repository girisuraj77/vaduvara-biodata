"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function MaroonGoldGanesh({ data: externalData }: { data?: any }) {
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
    outerBorder: "#7A1F1F",  // Deep maroon-red outer border frame
    bg: "#F5E7BF",           // Warm tan/cream textured inner background
    gold: "#C9A24C",         // Thin gold inner border line
    heading: "#C1272D",      // Red for shloka & section headings
    corner: "#6B3A22",       // Brown twig/leaf corner ornament
    labelText: "#1A1A1A",    // Field label (black)
    valueText: "#2A2A2A",    // Field value (soft black)
  };

  // Field Row Component — label : value, colon aligned, black text on cream background
  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[140px_1fr] gap-x-2 py-[3px] items-start text-[13.5px] leading-snug">
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

  // Small brown twig-and-leaf corner ornament — simple, delicate, reused in all
  // 4 corners via mirroring for diagonal + edge symmetry
  const CornerOrnament = () => (
    <g id="floral-corner-master">
      {/* Main curling vine stem */}
      <path
        d="M 4 4 C 20 8 30 20 34 36 C 38 54 30 66 40 78 C 48 88 62 86 72 96"
        fill="none"
        stroke={colors.corner}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Secondary short curling tendril branching off the main vine */}
      <path
        d="M 34 36 C 46 34 54 24 58 12"
        fill="none"
        stroke={colors.corner}
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Small leaves along the vine */}
      <path d="M 14 12 C 8 8 0 12 0 20 C 8 22 16 18 14 12 Z" fill={colors.corner} />
      <path d="M 44 28 C 52 24 60 30 58 38 C 50 40 42 34 44 28 Z" fill={colors.corner} />
      <path d="M 28 58 C 20 56 14 62 16 70 C 24 70 30 64 28 58 Z" fill={colors.corner} />
      <path d="M 56 80 C 60 72 70 70 76 76 C 72 84 62 86 56 80 Z" fill={colors.corner} />

      {/* Multiple small flowers blooming along the vine, largest nearest the tip */}
      <use href="#small-flower-master" transform="translate(20,10) scale(1.15)" />
      <use href="#small-flower-master" transform="translate(52,10) scale(0.85)" />
      <use href="#small-flower-master" transform="translate(36,36) scale(1)" />
      <use href="#small-flower-master" transform="translate(38,66) scale(0.9)" />
      <use href="#small-flower-master" transform="translate(68,92) scale(0.75)" />

      {/* Corner tip accent dot */}
      <circle cx="4" cy="4" r="1.8" fill={colors.corner} />
    </g>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden shrink-0 shadow-2xl flex flex-col"
      style={{
        backgroundColor: colors.outerBorder,
        padding: "18px",
        fontFamily: "'Segoe UI', Georgia, serif, sans-serif",
      }}
    >
      {/* Inner cream card with thin gold border and dotted texture */}
      <div
        className="relative w-full flex-1 flex flex-col px-12 pt-8 pb-12"
        style={{
          backgroundColor: colors.bg,
          border: `2px solid ${colors.gold}`,
          color: colors.valueText,
        }}
      >
        {/* 1. DOTTED TEXTURE + FOUR SMALL BROWN TWIG-AND-LEAF CORNERS (SVG, so it
            renders reliably in export/print pipelines instead of a CSS background) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 794 1087"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <CornerOrnament />
            <pattern id="dotTexture" width="9" height="9" patternUnits="userSpaceOnUse">
              <circle cx="4.5" cy="4.5" r="1" fill="rgba(139,90,43,0.18)" />
            </pattern>
          </defs>

          {/* Dotted background texture across the whole card */}
          <rect x="0" y="0" width="794" height="1087" fill="url(#dotTexture)" />

          {/* Top-Left */}
          <use href="#floral-corner-master" transform="translate(6, 6)" />
          {/* Top-Right */}
          <use href="#floral-corner-master" transform="translate(788, 6) scale(-1,1)" />
          {/* Bottom-Left */}
          <use href="#floral-corner-master" transform="translate(6, 1081) scale(1,-1)" />
          {/* Bottom-Right */}
          <use href="#floral-corner-master" transform="translate(788, 1081) scale(-1,-1)" />
        </svg>

        {/* 2. CONTENT AREA */}
        {!isBlankDesign && (
          <div className="relative z-10 flex flex-col flex-1">
            {/* Header: centered Ganesh image + shloka */}
            <div className="flex flex-col items-center text-center mb-4">
              <img
                src={`/images/gods/${godPhotoId || "god-1"}.png`}
                className="h-20 w-20 object-contain mb-2"
                alt="Lord Ganesha"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <p
                className="text-[15px] font-semibold"
                style={{ color: colors.heading }}
              >
                {shloka || "॥ श्री गणेशाय नमः ॥"}
              </p>
              {biodataTitle && (
                <h1
                  className="text-[20px] font-bold tracking-wide mt-1"
                  style={{ color: colors.heading, fontFamily: "Georgia, serif" }}
                >
                  {biodataTitle}
                </h1>
              )}
            </div>

            {/* Body Sections */}
            <div className="flex flex-col gap-5 flex-1">
              {/* Section 1: Personal Details */}
              {personalFields && personalFields.length > 0 && (
                <div className="flex flex-col gap-1">
                  <h2
                    className="text-[15px] font-bold text-center mb-1"
                    style={{ color: colors.heading, fontFamily: "Georgia, serif" }}
                  >
                    {stepHeadings?.[1] || t.personalDetails || "वैयक्तिक माहिती"}
                  </h2>
                  <div className="flex flex-row gap-6">
                    <div className="flex flex-col flex-1">
                      {personalFields.map((field: any, idx: number) => (
                        <FieldRow key={idx} label={field.label} value={field.value} />
                      ))}
                    </div>
                    {profilePhotoUrl && (
                      <div
                        className="w-[120px] h-[150px] shrink-0 overflow-hidden"
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
                <div className="flex flex-col gap-1">
                  <h2
                    className="text-[15px] font-bold text-center mb-1"
                    style={{ color: colors.heading, fontFamily: "Georgia, serif" }}
                  >
                    {stepHeadings?.[2] || t.familyDetails || "कौटुंबिक माहिती"}
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
                <div className="flex flex-col gap-1">
                  <h2
                    className="text-[15px] font-bold text-center mb-1"
                    style={{ color: colors.heading, fontFamily: "Georgia, serif" }}
                  >
                    {stepHeadings?.[3] || t.contactDetails || "संपर्क"}
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
    </div>
  );
}

export const TraditionalMarathiTemplate = MaroonGoldGanesh;
export default MaroonGoldGanesh;