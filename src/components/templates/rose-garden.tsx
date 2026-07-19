"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

// Rose Garden — Christian + Hindu multi-community
// Soft Blush Rose & Sage Green (floral designs suit both faiths)
export function RoseGarden({ data: externalData }: { data?: any }) {
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
  } = externalData ? getTemplateData(externalData, "Christian") : storeData;

  const isBlankDesign = externalData?.isBlankDesign || false;

  const colors = {
    bg: "#FDF5F5",
    rose: "#8B2252",
    roseMid: "#C4587A",
    roseLight: "#F8D7E3",
    sage: "#4A7C59",
    gold: "#C59B27",
    goldLight: "#F5DFA0",
    textDark: "#3A1525",
    textBody: "#4A2035",
  };

  // Rose SVG
  const Rose = ({ size = 20, opacity = 1 }: { size?: number; opacity?: number }) => (
    <svg viewBox="0 0 40 40" width={size} height={size} style={{ opacity }}>
      <circle cx="20" cy="20" r="8" fill={colors.rose} />
      <path d="M20 5 C23 12 28 14 25 20 C22 14 18 12 20 5Z" fill={colors.roseMid} />
      <path d="M35 20 C28 17 26 22 20 20 C26 22 28 26 35 20Z" fill={colors.roseMid} />
      <path d="M20 35 C17 28 12 26 15 20 C18 26 22 28 20 35Z" fill={colors.roseMid} />
      <path d="M5 20 C12 23 14 18 20 20 C14 18 12 14 5 20Z" fill={colors.roseMid} />
      <path d="M20 12 C22 15 25 16 23 20 C21 16 19 15 20 12Z" fill={colors.roseLight} opacity="0.7" />
    </svg>
  );

  // Rose garland border element
  const RoseGarland = ({ flip }: { flip?: boolean }) => (
    <svg viewBox="0 0 794 30" width="794" height="30" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <defs>
        <pattern id="rg-garland" width="80" height="30" patternUnits="userSpaceOnUse">
          {/* Vine stem */}
          <path d="M0,20 Q20,8 40,20 T80,20" fill="none" stroke={colors.sage} strokeWidth="1.5" opacity="0.7" />
          {/* Leaves */}
          <path d="M10,14 C12,8 20,8 18,14 Z" fill={colors.sage} opacity="0.6" />
          <path d="M50,14 C52,8 60,8 58,14 Z" fill={colors.sage} opacity="0.6" />
          {/* Rose buds */}
          <circle cx="40" cy="20" r="5" fill={colors.rose} opacity="0.8" />
          <circle cx="40" cy="20" r="3" fill={colors.roseLight} opacity="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#rg-garland)" />
    </svg>
  );

  // Floral corner wreath
  const FloralCorner = () => (
    <svg viewBox="0 0 80 80" width="80" height="80">
      <path d="M2,70 C2,40 20,20 50,2" fill="none" stroke={colors.sage} strokeWidth="1.5" opacity="0.5" />
      {[
        { cx: 10, cy: 60, r: 8 }, { cx: 20, cy: 45, r: 6 }, { cx: 35, cy: 30, r: 7 },
        { cx: 50, cy: 15, r: 6 }, { cx: 15, cy: 55, r: 4 }, { cx: 42, cy: 22, r: 4 }
      ].map((c, i) => (
        <g key={i}>
          <circle cx={c.cx} cy={c.cy} r={c.r} fill={i % 2 === 0 ? colors.rose : colors.roseMid} opacity="0.75" />
          <circle cx={c.cx} cy={c.cy} r={c.r * 0.55} fill={colors.roseLight} opacity="0.5" />
        </g>
      ))}
      {/* Leaves */}
      {[{ x: 28, y: 37 }, { x: 12, y: 52 }, { x: 44, y: 20 }].map((p, i) => (
        <path key={i} d={`M${p.x},${p.y} C${p.x + 4},${p.y - 8} ${p.x + 10},${p.y - 6} ${p.x + 6},${p.y}Z`} fill={colors.sage} opacity="0.6" />
      ))}
    </svg>
  );

  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest mt-0.5" style={{ color: colors.rose }}>
        {label}:
      </div>
      <div className="text-[13.5px] font-medium leading-normal break-words" style={{ color: colors.textBody }}>
        {value}
      </div>
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 my-2">
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.gold }} />
      <div className="flex items-center gap-2">
        <Rose size={14} />
        <span className="text-[12px] font-black tracking-[0.2em] uppercase" style={{ color: colors.rose }}>
          {title}
        </span>
        <Rose size={14} />
      </div>
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.gold }} />
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-14 pt-8 pb-14 shrink-0 shadow-2xl"
      style={{ backgroundColor: colors.bg, color: colors.textDark }}
    >
      {/* Decorative Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft rose petal background pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
          <defs>
            <pattern id="rg-petals" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M60,10 C70,40 90,50 60,60 C30,50 50,40 60,10Z" fill={colors.rose} />
              <path d="M60,110 C70,80 90,70 60,60 C30,70 50,80 60,110Z" fill={colors.roseMid} />
              <path d="M10,60 C40,70 50,90 60,60 C50,30 40,50 10,60Z" fill={colors.rose} />
              <path d="M110,60 C80,70 70,90 60,60 C70,30 80,50 110,60Z" fill={colors.roseMid} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rg-petals)" />
        </svg>

        {/* Radial rose blush from top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-25 blur-[80px]"
          style={{ background: `radial-gradient(ellipse, ${colors.roseLight} 0%, transparent 70%)` }} />

        {/* Rose garland top */}
        <div className="absolute top-0 left-0 right-0"><RoseGarland /></div>
        {/* Rose garland bottom */}
        <div className="absolute bottom-0 left-0 right-0"><RoseGarland flip /></div>

        {/* Gold border frame */}
        <div className="absolute inset-[10px] border" style={{ borderColor: `${colors.gold}30` }} />
        <div className="absolute inset-[14px] border" style={{ borderColor: `${colors.rose}15` }} />

        {/* Floral corner wreaths */}
        <div className="absolute top-[8px] left-[8px]"><FloralCorner /></div>
        <div className="absolute top-[8px] right-[8px]" style={{ transform: "scaleX(-1)" }}><FloralCorner /></div>
        <div className="absolute bottom-[8px] left-[8px]" style={{ transform: "scaleY(-1)" }}><FloralCorner /></div>
        <div className="absolute bottom-[8px] right-[8px]" style={{ transform: "scale(-1,-1)" }}><FloralCorner /></div>
      </div>

      {/* Content */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-3 mt-6">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="flex gap-1 mb-2">
              {[1, 1.3, 1, 0.8, 0.6].map((s, i) => <Rose key={i} size={20 * s} opacity={0.8} />)}
            </div>

            <div className="mb-4">
              <img
                src={`/images/gods/${godPhotoId || 'god-1'}.png`}
                className="h-14 w-14 object-contain"
                alt="God Symbol"
              />
            </div>

            <p className="text-[10px] font-black uppercase tracking-[0.35em] mb-2" style={{ color: colors.rose }}>
              {shloka}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-[0.2em] mb-1" style={{ color: colors.textDark }}>
              {biodataTitle || t.biodataTitleDefault}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-14 h-[0.5px]" style={{ backgroundColor: colors.gold }} />
              <Rose size={18} />
              <div className="w-14 h-[0.5px]" style={{ backgroundColor: colors.gold }} />
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-3 py-2">
            {personalFields.length > 0 && (
              <div className="space-y-1">
                <SectionHeader title={stepHeadings[1] || "Personal Details"} />
                <div className="flex gap-6 px-3 items-start">
                  <div className="flex-1 grid grid-cols-1 gap-0">
                    {personalFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                  </div>
                  {profilePhotoUrl && (
                    <div className="shrink-0 mt-1">
                      <div className="p-1.5 shadow-xl relative bg-white" style={{ border: `1.5px solid ${colors.gold}50` }}>
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: colors.rose }} />
                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: colors.rose }} />
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: colors.rose }} />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: colors.rose }} />
                        <div className="w-[120px] h-[150px] overflow-hidden bg-zinc-50">
                          <img src={profilePhotoUrl} className="w-full h-full object-cover" alt="Profile" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {familyFields.length > 0 && (
              <div className="space-y-1">
                <SectionHeader title={stepHeadings[2] || "Family Details"} />
                <div className="grid grid-cols-1 gap-0 px-3">
                  {familyFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                </div>
              </div>
            )}
            {contactFields.length > 0 && (
              <div className="space-y-1">
                <SectionHeader title={stepHeadings[3] || t.contactDetails} />
                <div className="grid grid-cols-1 gap-0 px-3">
                  {contactFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-2 flex flex-col items-center opacity-35">
            <div className="flex items-center gap-3 w-full px-20">
              <div className="h-[0.5px] flex-1" style={{ backgroundColor: colors.gold }} />
              <Rose size={14} />
              <div className="h-[0.5px] flex-1" style={{ backgroundColor: colors.gold }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
