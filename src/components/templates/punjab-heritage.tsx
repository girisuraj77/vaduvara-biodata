"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

// Punjab Heritage — Sikh + Hindu multi-community, Forest Green & Gold
export function PunjabHeritage({ data: externalData }: { data?: any }) {
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
  } = externalData ? getTemplateData(externalData, "Sikh") : storeData;

  const isBlankDesign = externalData?.isBlankDesign || false;

  const colors = {
    bgStart: "#1B3A1B",
    bgEnd: "#0D200D",
    green: "#1B3A1B",
    greenLight: "#3A7A3A",
    gold: "#F5C842",
    goldMid: "#C8A030",
    goldLight: "#FFF0A0",
    cream: "#F5F0E0",
    textLight: "#F5F0E0",
    textBody: "#D0E8D0",
  };

  // Punjab wheat/harvest motif (Vaar-style)
  const WheatStalk = ({ x = 0, flip = false }: { x?: number; flip?: boolean }) => (
    <g transform={`translate(${x},0) scale(${flip ? -1 : 1},1) translate(${flip ? -30 : 0},0)`}>
      <path d="M15,80 C15,60 14,40 15,10" fill="none" stroke={colors.gold} strokeWidth="2" />
      {[10, 20, 30, 40, 50, 60].map((y, i) => (
        <path key={i}
          d={i % 2 === 0
            ? `M15,${y} C10,${y - 8} 5,${y - 6} 5,${y - 2} C8,${y - 5} 12,${y - 4} 15,${y}Z`
            : `M15,${y} C20,${y - 8} 25,${y - 6} 25,${y - 2} C22,${y - 5} 18,${y - 4} 15,${y}Z`
          }
          fill={colors.gold} opacity="0.7" />
      ))}
      {/* Wheat tip */}
      <path d="M15,10 C13,4 12,0 15,0 C18,0 17,4 15,10Z" fill={colors.goldLight} />
    </g>
  );

  // Traditional phulkari-inspired tile pattern
  const PhulkariPattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
      <defs>
        <pattern id="ph-tile" width="50" height="50" patternUnits="userSpaceOnUse">
          {/* 8-petal flower */}
          {[0, 45, 90, 135].map((a, i) => {
            const r = (a * Math.PI) / 180;
            const r2 = ((a + 90) * Math.PI) / 180;
            return (
              <g key={i}>
                <path d={`M25,25 C${25 + 12 * Math.cos(r)},${25 + 12 * Math.sin(r)} ${25 + 18 * Math.cos(r)},${25 + 18 * Math.sin(r)} ${25 + 12 * Math.cos(r2)},${25 + 12 * Math.sin(r2)}Z`}
                  fill={colors.gold} />
              </g>
            );
          })}
          <circle cx="25" cy="25" r="5" fill={colors.goldLight} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ph-tile)" />
    </svg>
  );

  // Border with wheat + diamonds
  const HeritageBorder = ({ flip }: { flip?: boolean }) => (
    <svg viewBox="0 0 794 30" width="794" height="30" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <defs>
        <pattern id="ph-border" width="60" height="30" patternUnits="userSpaceOnUse">
          <line x1="0" y1="15" x2="60" y2="15" stroke={colors.goldMid} strokeWidth="0.8" opacity="0.4" />
          <rect x="25" y="8" width="10" height="10" fill="none" stroke={colors.gold} strokeWidth="1.2" transform="rotate(45,30,13)" />
          <circle cx="30" cy="13" r="2.5" fill={colors.gold} opacity="0.8" />
          <circle cx="5" cy="13" r="1.5" fill={colors.goldMid} opacity="0.5" />
          <circle cx="55" cy="13" r="1.5" fill={colors.goldMid} opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ph-border)" />
      <line x1="0" y1="29" x2="794" y2="29" stroke={colors.gold} strokeWidth="1" opacity="0.3" />
    </svg>
  );

  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest mt-0.5" style={{ color: colors.gold }}>
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
        <svg viewBox="0 0 16 16" width="10" height="10" fill={colors.gold}>
          <path d="M8,0 L9,6 L15,5 L11,9 L14,15 L8,12 L2,15 L5,9 L1,5 L7,6Z" />
        </svg>
        <span className="text-[12px] font-black tracking-[0.2em] uppercase" style={{ color: colors.gold }}>
          {title}
        </span>
        <svg viewBox="0 0 16 16" width="10" height="10" fill={colors.gold}>
          <path d="M8,0 L9,6 L15,5 L11,9 L14,15 L8,12 L2,15 L5,9 L1,5 L7,6Z" />
        </svg>
      </div>
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.gold }} />
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-14 pt-10 pb-14 shrink-0 shadow-2xl"
      style={{ background: `radial-gradient(ellipse at 50% 30%, ${colors.bgStart} 0%, ${colors.bgEnd} 100%)`, color: colors.textLight }}
    >
      {/* Decorative Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <PhulkariPattern />

        {/* Gold top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-[100px]"
          style={{ background: `radial-gradient(ellipse, ${colors.gold} 0%, transparent 70%)` }} />

        {/* Wheat stalks on sides */}
        <svg className="absolute top-[80px] left-[15px] h-[300px] w-[35px] opacity-30">
          <WheatStalk />
        </svg>
        <svg className="absolute top-[80px] right-[15px] h-[300px] w-[35px] opacity-30">
          <WheatStalk flip />
        </svg>

        {/* Heritage border top/bottom */}
        <div className="absolute top-0 left-0 right-0"><HeritageBorder /></div>
        <div className="absolute bottom-0 left-0 right-0"><HeritageBorder flip /></div>

        {/* Double frame */}
        <div className="absolute inset-[10px] border" style={{ borderColor: `${colors.gold}30` }} />
        <div className="absolute inset-[14px] border" style={{ borderColor: `${colors.greenLight}25` }} />

        {/* Corner ornaments */}
        {[0, 1, 2, 3].map(i => (
          <svg key={i} width="50" height="50" viewBox="0 0 50 50"
            style={{ position: "absolute", top: i < 2 ? 8 : undefined, bottom: i >= 2 ? 8 : undefined, left: i % 2 === 0 ? 8 : undefined, right: i % 2 !== 0 ? 8 : undefined, transform: `rotate(${i * 90}deg)` }}
          >
            <path d="M2,35 L2,2 L35,2" stroke={colors.gold} strokeWidth="1.5" fill="none" opacity="0.5" />
            <path d="M2,2 C8,2 16,5 20,12 C12,10 6,6 2,2Z" fill={colors.gold} opacity="0.2" />
            <circle cx="2" cy="2" r="2.5" fill={colors.gold} opacity="0.8" />
          </svg>
        ))}
      </div>

      {/* Content */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-3 mt-4">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-1">
              <img
                src={`/images/gods/${godPhotoId || "god-1"}.png`}
                className="h-14 w-14 object-contain drop-shadow-lg mx-auto"
                alt="God Symbol"
              />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mb-2" style={{ color: colors.gold }}>
              {shloka}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-[0.2em] mb-1" style={{ color: colors.cream }}>
              {biodataTitle || t.biodataTitleDefault}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-12 h-[0.5px]" style={{ backgroundColor: colors.gold }} />
              <svg viewBox="0 0 20 12" width="20" height="12">
                <path d="M10,12 C8,7 5,5 10,3 C15,5 12,7 10,12Z" fill={colors.gold} opacity="0.8" />
                <path d="M10,12 C6,9 2,8 1,10 C3,9 6,10 10,12Z" fill={colors.goldMid} opacity="0.6" />
                <path d="M10,12 C14,9 18,8 19,10 C17,9 14,10 10,12Z" fill={colors.goldMid} opacity="0.6" />
              </svg>
              <div className="w-12 h-[0.5px]" style={{ backgroundColor: colors.gold }} />
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
                      <div className="p-1.5 shadow-2xl relative" style={{ backgroundColor: `${colors.bgStart}AA`, border: `1.5px solid ${colors.gold}40` }}>
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: colors.gold }} />
                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: colors.gold }} />
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: colors.gold }} />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: colors.gold }} />
                        <div className="w-[120px] h-[150px] overflow-hidden">
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
          <div className="mt-auto pt-3 flex flex-col items-center opacity-25">
            <div className="flex items-center gap-3 w-full px-20">
              <div className="h-[0.5px] flex-1" style={{ backgroundColor: colors.gold }} />
              <div className="w-2 h-2 rotate-45" style={{ backgroundColor: colors.gold }} />
              <div className="h-[0.5px] flex-1" style={{ backgroundColor: colors.gold }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
