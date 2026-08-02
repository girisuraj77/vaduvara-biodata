"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function RegalGoldFrame({ data: externalData }: { data?: any }) {
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

  // Exact color matching from the reference image
  const colors = {
    borderGold: "#AD8712",  // Thick solid outer frame border
    gold: "#998542",        // Olive-Gold for thin borders & ornaments
    goldDark: "#857335",    // Darker gold outline
    brownText: "#5C4712",   // Dark olive brown for titles & labels
    valueText: "#3D3117",   // Rich dark olive-brown for field values
  };

  // Field Row Component matching exact layout and typography from the image
  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[190px_1fr] gap-x-2 py-[2.5px] items-start text-[14px] leading-snug">
      <div className="font-bold" style={{ color: colors.brownText }}>
        {label}
      </div>
      <div className="flex items-start font-medium" style={{ color: colors.valueText }}>
        <span className="font-bold mr-3" style={{ color: colors.brownText }}>
          :
        </span>
        <span className="flex-1 break-words">{value}</span>
      </div>
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-16 pt-12 pb-14 shrink-0 shadow-2xl bg-white"
      style={{
        color: colors.valueText,
        fontFamily: "'Segoe UI', Georgia, serif, sans-serif",
      }}
    >
      {/* 1. EXACT SVG VECTOR FRAME & CORNER ORNAMENTS (794x1123 Full Canvas) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 794 1123"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── OUTER SOLID BORDER — flush with the page edge, edge to edge ── */}
        <rect x="6" y="6" width="782" height="1111" fill="none" stroke={colors.borderGold} strokeWidth="12" />

        {/* ── CORNER-ONLY FILIGREE ORNAMENTS (DEFINED VIA MASTER REUSABLE <g>) ── */}
        {/* No lines connect the corners — the ornament stays contained inside each of the 4 corners */}
        <defs>
          <g id="corner-ornament-master">
            {/* Double-line L bracket, rounded corner */}
            <path d="M 30 112 L 30 60 C 30 42 42 30 60 30 L 112 30" stroke={colors.gold} strokeWidth="1.4" fill="none" />
            <path d="M 38 112 L 38 64 C 38 49 49 38 64 38 L 112 38" stroke={colors.gold} strokeWidth="1.4" fill="none" />

            {/* Flowing tail from the bracket into the spiral */}
            <path d="M 64 38 C 74 38 80 45 80 54" stroke={colors.gold} strokeWidth="1.2" fill="none" strokeLinecap="round" />

            {/* Primary spiral (bigger loop) */}
            <path
              d="M 80 54 C 80 68 68 76 56 72 C 47 69 44 59 50 52 C 55 47 62 49 62 56 C 62 60 58 62 55 60"
              stroke={colors.gold}
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
            />

            {/* Secondary spiral (smaller loop, upper-right) */}
            <path
              d="M 90 40 C 100 38 108 44 107 53 C 106 60 99 63 94 59 C 91 56 93 52 96 52"
              stroke={colors.gold}
              strokeWidth="1.1"
              fill="none"
              strokeLinecap="round"
            />

            {/* Connecting flow between the two spirals */}
            <path d="M 80 54 C 84 48 87 43 90 40" stroke={colors.gold} strokeWidth="1.1" fill="none" strokeLinecap="round" />

            {/* 3-leaf fan cluster at the top-edge tip */}
            <g fill={colors.gold} stroke="none">
              <path d="M 112 30 Q 118 19 131 21 Q 124 33 112 30 Z" />
              <path d="M 112 30 Q 122 24 133 30 Q 123 38 112 30 Z" />
              <path d="M 112 30 Q 116 40 126 44 Q 119 48 112 30 Z" />
            </g>

            {/* 3-leaf fan cluster at the left-edge tip */}
            <g fill={colors.gold} stroke="none">
              <path d="M 30 112 Q 19 118 21 131 Q 33 124 30 112 Z" />
              <path d="M 30 112 Q 24 122 30 133 Q 38 123 30 112 Z" />
              <path d="M 30 112 Q 40 116 44 126 Q 48 119 30 112 Z" />
            </g>

            {/* Terminal dots */}
            <circle cx="55" cy="60" r="2.2" fill={colors.gold} />
            <circle cx="96" cy="52" r="1.9" fill={colors.gold} />
          </g>
        </defs>

        {/* Top-Left Corner */}
        <use href="#corner-ornament-master" x="0" y="0" />

        {/* Top-Right Corner (Flipped Horizontally) */}
        <use href="#corner-ornament-master" transform="translate(794, 0) scale(-1, 1)" />

        {/* Bottom-Left Corner (Flipped Vertically) */}
        <use href="#corner-ornament-master" transform="translate(0, 1123) scale(1, -1)" />

        {/* Bottom-Right Corner (Flipped Both) */}
        <use href="#corner-ornament-master" transform="translate(794, 1123) scale(-1, -1)" />

        {/* ── LEFT/RIGHT CENTER SIDE EMBLEMS (diamond flower with short arrow-capped stubs) ── */}
        <defs>
          <g id="side-emblem-master">
            {/* Short line stubs above and below the flower */}
            <line x1="0" y1="-95" x2="0" y2="-30" stroke={colors.gold} strokeWidth="1.6" />
            <line x1="0" y1="30" x2="0" y2="95" stroke={colors.gold} strokeWidth="1.6" />

            {/* Arrow-point caps at the stub ends */}
            <path d="M 0 -95 L -5 -85 L 5 -85 Z" fill={colors.gold} />
            <path d="M 0 95 L -5 85 L 5 85 Z" fill={colors.gold} />

            {/* Petals N/S/E/W */}
            <g fill={colors.gold} stroke="none">
              <path d="M 0 -26 Q 6 -16 0 -8 Q -6 -16 0 -26 Z" />
              <path d="M 0 26 Q 6 16 0 8 Q -6 16 0 26 Z" />
              <path d="M -26 0 Q -16 6 -8 0 Q -16 -6 -26 0 Z" />
              <path d="M 26 0 Q 16 6 8 0 Q 16 -6 26 0 Z" />
            </g>
            {/* Concentric diamond */}
            <polygon points="0,-14 14,0 0,14 -14,0" fill={colors.gold} />
            <polygon points="0,-8 8,0 0,8 -8,0" fill="#FFFFFF" />
            <polygon points="0,-3.5 3.5,0 0,3.5 -3.5,0" fill={colors.gold} />
          </g>
        </defs>

        {/* Left Center Emblem */}
        <use href="#side-emblem-master" x="12" y="561.5" />

        {/* Right Center Emblem */}
        <use href="#side-emblem-master" x="782" y="561.5" />
      </svg>

      {/* 2. CONTENT AREA */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 px-4 pt-4">
          {/* Header Section: Left BIODATA | Center Ganesha | Right Shloka */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center mb-8 pb-4 border-b border-[#AD8712]/30 gap-4">
            {/* Left: BIODATA Title */}
            <div className="text-right">
              <h1
                className="text-[24px] font-black tracking-widest uppercase whitespace-nowrap"
                style={{ color: colors.brownText, fontFamily: "Georgia, serif" }}
              >
                {biodataTitle || "BIODATA"}
              </h1>
            </div>

            {/* Center: Lord Ganesha Image */}
            <div className="flex justify-center px-2 shrink-0">
              <img
                src={`/images/gods/${godPhotoId || "god-1"}.png`}
                className="h-12 w-12 object-contain drop-shadow-sm"
                alt="Lord Ganesha"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>

            {/* Right: Sanskrit Ganesha Shloka */}
            <div className="text-left">
              <p
                className="text-[18px] font-bold tracking-wide whitespace-nowrap"
                style={{ color: colors.brownText, fontFamily: "'Noto Sans Devanagari', 'Segoe UI', serif" }}
              >
                {shloka || "॥ श्री गणेशाय नमः ॥"}
              </p>
            </div>
          </div>

          {/* Body Sections */}
          <div className="flex flex-col gap-6 flex-1">
            {/* Section 1: Personal Details */}
            {personalFields && personalFields.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <h2
                  className="text-[17px] font-black tracking-wide mb-1"
                  style={{ color: colors.brownText, fontFamily: "Georgia, serif" }}
                >
                  {stepHeadings?.[1] || t.personalDetails || "Personal Details"}
                </h2>
                <div className="flex flex-col">
                  {personalFields.map((field: any, idx: number) => (
                    <FieldRow key={idx} label={field.label} value={field.value} />
                  ))}
                </div>
              </div>
            )}

            {/* Section 2: Family Details */}
            {familyFields && familyFields.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <h2
                  className="text-[17px] font-black tracking-wide mb-1"
                  style={{ color: colors.brownText, fontFamily: "Georgia, serif" }}
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
              <div className="flex flex-col gap-1.5">
                <h2
                  className="text-[17px] font-black tracking-wide mb-1"
                  style={{ color: colors.brownText, fontFamily: "Georgia, serif" }}
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
