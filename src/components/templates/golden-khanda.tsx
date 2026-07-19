"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

// Golden Khanda — Sikh, Royal Navy & Gold, Khanda emblem
export function GoldenKhanda({ data: externalData }: { data?: any }) {
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
    godPhotoUrl,
    showGodPhoto,
    biodataTitle,
    t
  } = externalData ? getTemplateData(externalData, "Sikh") : storeData;

  const isBlankDesign = externalData?.isBlankDesign || false;

  const colors = {
    bgStart: "#0D1B3E",
    bgEnd: "#060E20",
    gold: "#F5C842",
    goldMid: "#C8A030",
    goldLight: "#FFF0A0",
    navyLight: "#1E3060",
    textLight: "#FFFFFF",
    textBody: "#E0E8FF",
    textGold: "#F5C842",
  };

  // Khanda Emblem SVG (accurate Sikh symbol)
  const KhandaEmblem = ({ size = 80 }: { size?: number }) => (
    <svg viewBox="0 0 120 140" width={size} height={size * 1.17}>
      {/* Outer ring/chakra (chakar) */}
      <circle cx="60" cy="70" r="48" fill="none" stroke={colors.gold} strokeWidth="4" />
      <circle cx="60" cy="70" r="42" fill="none" stroke={colors.goldMid} strokeWidth="1" opacity="0.5" />
      {/* Chakar small dots */}
      {[...Array(16)].map((_, i) => {
        const a = (i * 22.5 * Math.PI) / 180;
        return <circle key={i} cx={60 + 45 * Math.sin(a)} cy={70 - 45 * Math.cos(a)} r="2" fill={colors.gold} />;
      })}

      {/* Central Double-edged khanda sword (vertical) */}
      <path d="M57,10 C55,30 54,50 56,70 C54,90 55,110 57,130 L63,130 C65,110 66,90 64,70 C66,50 65,30 63,10 Z" fill={colors.gold} />
      {/* Sword blade edges */}
      <path d="M56,70 C52,55 52,40 57,10 C55,40 55,55 56,70Z" fill={colors.goldLight} opacity="0.5" />
      <path d="M64,70 C68,55 68,40 63,10 C65,40 65,55 64,70Z" fill={colors.goldLight} opacity="0.5" />

      {/* Left katar (kirpan) */}
      <path d="M15,35 C20,50 30,58 56,70 C30,65 18,58 12,42 Z" fill={colors.gold} />
      <path d="M15,35 L18,40 C22,52 32,60 56,70 L20,62 Z" fill={colors.goldLight} opacity="0.4" />

      {/* Right katar (kirpan) */}
      <path d="M105,35 C100,50 90,58 64,70 C90,65 102,58 108,42 Z" fill={colors.gold} />
      <path d="M105,35 L102,40 C98,52 88,60 64,70 L100,62 Z" fill={colors.goldLight} opacity="0.4" />

      {/* Guard/crosspiece at center */}
      <rect x="40" y="67" width="40" height="6" rx="2" fill={colors.gold} />
      <circle cx="60" cy="70" r="6" fill={colors.goldLight} />
      <circle cx="60" cy="70" r="3" fill={colors.goldMid} />
    </svg>
  );

  // Geometric border with Sikh-inspired chain
  const SikhBorderTop = () => (
    <svg viewBox="0 0 794 24" width="794" height="24">
      <defs>
        <pattern id="gk-border" width="48" height="24" patternUnits="userSpaceOnUse">
          {/* Diamond chain */}
          <rect x="20" y="8" width="8" height="8" fill="none" stroke={colors.gold} strokeWidth="1.2" transform="rotate(45,24,12)" />
          <circle cx="24" cy="12" r="2" fill={colors.gold} />
          <line x1="0" y1="12" x2="17" y2="12" stroke={colors.goldMid} strokeWidth="0.8" opacity="0.5" />
          <line x1="31" y1="12" x2="48" y2="12" stroke={colors.goldMid} strokeWidth="0.8" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gk-border)" />
      <line x1="0" y1="23" x2="794" y2="23" stroke={colors.gold} strokeWidth="1" opacity="0.3" />
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
        {/* Small khanda icon */}
        <svg viewBox="0 0 20 24" width="10" height="12" fill={colors.gold}>
          <path d="M9,0 C9,8 8,12 9,18 C8,22 9,24 10,24 C11,24 12,22 11,18 C12,12 11,8 11,0Z" />
          <path d="M2,6 C5,9 8,11 9,14 C7,12 4,10 1,8Z" />
          <path d="M18,6 C15,9 12,11 11,14 C13,12 16,10 19,8Z" />
          <rect x="5" y="13" width="10" height="2" rx="1" />
        </svg>
        <span className="text-[12px] font-black tracking-[0.2em] uppercase" style={{ color: colors.gold }}>
          {title}
        </span>
        <svg viewBox="0 0 20 24" width="10" height="12" fill={colors.gold}>
          <path d="M9,0 C9,8 8,12 9,18 C8,22 9,24 10,24 C11,24 12,22 11,18 C12,12 11,8 11,0Z" />
          <path d="M2,6 C5,9 8,11 9,14 C7,12 4,10 1,8Z" />
          <path d="M18,6 C15,9 12,11 11,14 C13,12 16,10 19,8Z" />
          <rect x="5" y="13" width="10" height="2" rx="1" />
        </svg>
      </div>
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.gold }} />
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-14 pt-10 pb-14 shrink-0 shadow-2xl"
      style={{ background: `radial-gradient(ellipse at 50% 25%, ${colors.bgStart} 0%, ${colors.bgEnd} 100%)`, color: colors.textLight }}
    >
      {/* Decorative Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle gold grid watermark */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
          <defs>
            <pattern id="gk-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect width="60" height="60" fill="none" stroke={colors.gold} strokeWidth="0.5" />
              <line x1="30" y1="0" x2="30" y2="60" stroke={colors.gold} strokeWidth="0.3" />
              <line x1="0" y1="30" x2="60" y2="30" stroke={colors.gold} strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gk-grid)" />
        </svg>

        {/* Large faded Khanda watermark center */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <KhandaEmblem size={400} />
        </div>

        {/* Gold glow from top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-15 blur-[100px]"
          style={{ background: `radial-gradient(ellipse, ${colors.gold} 0%, transparent 70%)` }} />

        {/* Border patterns */}
        <div className="absolute top-0 left-0 right-0"><SikhBorderTop /></div>
        <div className="absolute bottom-0 left-0 right-0" style={{ transform: "scaleY(-1)" }}><SikhBorderTop /></div>

        {/* Double gold border */}
        <div className="absolute inset-[8px] border" style={{ borderColor: `${colors.gold}30` }} />
        <div className="absolute inset-[12px] border" style={{ borderColor: `${colors.gold}15` }} />

        {/* Corner khanda marks */}
        {[0, 1, 2, 3].map(i => (
          <svg key={i} width="45" height="45" viewBox="0 0 45 45"
            style={{ position: "absolute", top: i < 2 ? 6 : undefined, bottom: i >= 2 ? 6 : undefined, left: i % 2 === 0 ? 6 : undefined, right: i % 2 !== 0 ? 6 : undefined }}
          >
            <path d="M2,35 L2,2 L35,2" stroke={colors.gold} strokeWidth="1.5" fill="none" opacity="0.5" />
            <circle cx="2" cy="2" r="2.5" fill={colors.gold} opacity="0.7" />
          </svg>
        ))}
      </div>

      {/* Content */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-3 mt-4">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
                        {showGodPhoto && (
              <div className="flex justify-center mb-1 w-[72px] h-[72px] overflow-hidden bg-transparent">
                {godPhotoId === "custom" && (godPhotoUrl || storeData.godPhotoUrl) ? (
                  <img
                    src={godPhotoUrl || storeData.godPhotoUrl}
                    alt="God Symbol"
                    className="w-full h-full object-contain animate-in fade-in duration-300"
                  />
                ) : godPhotoId && godPhotoId !== "god-1" && godPhotoId !== "none" ? (
                  <img
                    src={`/images/gods/${godPhotoId}.png`}
                    alt="God Symbol"
                    className="w-full h-full object-contain animate-in fade-in duration-300"
                  />
                ) : (
                  <KhandaEmblem size={70} />
                )}
              </div>
            )}
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mt-2 mb-2" style={{ color: colors.gold }}>
              {shloka}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-[0.2em] mb-1" style={{ color: colors.textLight }}>
              {biodataTitle || t.biodataTitleDefault}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-14 h-[0.5px]" style={{ backgroundColor: colors.gold }} />
              <div className="w-2 h-2 rotate-45" style={{ backgroundColor: colors.gold }} />
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
                      <div className="p-1.5 shadow-2xl relative" style={{ backgroundColor: `${colors.navyLight}80`, border: `1.5px solid ${colors.gold}40` }}>
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
              <KhandaEmblem size={24} />
              <div className="h-[0.5px] flex-1" style={{ backgroundColor: colors.gold }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
