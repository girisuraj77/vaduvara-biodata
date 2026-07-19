"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

// Steel Akali — Sikh, Steel Blue & Saffron, Khanda watermark + chain link border
export function SteelAkali({ data: externalData }: { data?: any }) {
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
    bgStart: "#1E2D40",
    bgEnd: "#0F1820",
    steel: "#4A6080",
    steelLight: "#8AA0C0",
    saffron: "#FF8C00",
    saffronLight: "#FFB84D",
    saffronPale: "#FFE4A0",
    textLight: "#E0EAF5",
    textBody: "#B8CCE0",
    gold: "#D4A040",
  };

  // Compact Khanda
  const CompactKhanda = ({ size = 50 }: { size?: number }) => (
    <svg viewBox="0 0 80 90" width={size} height={size * 1.12}>
      <circle cx="40" cy="45" r="30" fill="none" stroke={colors.saffron} strokeWidth="3" />
      {[...Array(12)].map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return <circle key={i} cx={40 + 28 * Math.sin(a)} cy={45 - 28 * Math.cos(a)} r="1.5" fill={colors.saffron} />;
      })}
      {/* Central sword */}
      <path d="M38,5 C37,20 37,35 38,45 C37,55 37,70 38,85 L42,85 C43,70 43,55 42,45 C43,35 43,20 42,5Z" fill={colors.saffronLight} />
      {/* Kirpans */}
      <path d="M10,22 C15,32 25,38 38,45 C25,42 13,36 8,28Z" fill={colors.saffronLight} opacity="0.85" />
      <path d="M70,22 C65,32 55,38 42,45 C55,42 67,36 72,28Z" fill={colors.saffronLight} opacity="0.85" />
      {/* Center guard */}
      <rect x="28" y="43" width="24" height="4" rx="2" fill={colors.saffron} />
      <circle cx="40" cy="45" r="4" fill={colors.saffronPale} />
    </svg>
  );

  // Steel chain link border
  const ChainBorder = ({ vertical = false }: { vertical?: boolean }) => {
    if (vertical) {
      return (
        <svg viewBox="0 0 20 1123" width="20" height="1123">
          <defs>
            <pattern id="sa-chain-v" width="20" height="32" patternUnits="userSpaceOnUse">
              <rect x="4" y="2" width="12" height="14" rx="6" fill="none" stroke={colors.steel} strokeWidth="2" />
              <rect x="4" y="16" width="12" height="14" rx="6" fill="none" stroke={colors.saffron} strokeWidth="1.5" opacity="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sa-chain-v)" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 794 20" width="794" height="20">
        <defs>
          <pattern id="sa-chain-h" width="32" height="20" patternUnits="userSpaceOnUse">
            <rect x="2" y="4" width="14" height="12" rx="6" fill="none" stroke={colors.steel} strokeWidth="2" />
            <rect x="16" y="4" width="14" height="12" rx="6" fill="none" stroke={colors.saffron} strokeWidth="1.5" opacity="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sa-chain-h)" />
      </svg>
    );
  };

  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest mt-0.5" style={{ color: colors.saffronLight }}>
        {label}:
      </div>
      <div className="text-[13.5px] font-medium leading-normal break-words" style={{ color: colors.textBody }}>
        {value}
      </div>
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 my-2">
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.saffron }} />
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: colors.saffron }} />
        <span className="text-[12px] font-black tracking-[0.2em] uppercase" style={{ color: colors.saffronLight }}>
          {title}
        </span>
        <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: colors.saffron }} />
      </div>
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.saffron }} />
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-14 pt-10 pb-14 shrink-0 shadow-2xl"
      style={{ background: `linear-gradient(145deg, ${colors.bgStart} 0%, ${colors.bgEnd} 100%)`, color: colors.textLight }}
    >
      {/* Decorative Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Large faded khanda watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
          <CompactKhanda size={500} />
        </div>

        {/* Steel grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
          {[...Array(8)].map((_, i) => (
            <line key={`v${i}`} x1={100 * (i + 1)} y1="0" x2={100 * (i + 1)} y2="1123" stroke={colors.steelLight} strokeWidth="0.5" />
          ))}
          {[...Array(11)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={100 * (i + 1)} x2="794" y2={100 * (i + 1)} stroke={colors.steelLight} strokeWidth="0.5" />
          ))}
        </svg>

        {/* Saffron glow from top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full opacity-10 blur-[80px]"
          style={{ background: `radial-gradient(ellipse, ${colors.saffron} 0%, transparent 70%)` }} />

        {/* Chain borders top/bottom */}
        <div className="absolute top-0 left-0 right-0"><ChainBorder /></div>
        <div className="absolute bottom-0 left-0 right-0"><ChainBorder /></div>

        {/* Side chain links */}
        <div className="absolute top-[20px] bottom-[20px] left-[8px]"><ChainBorder vertical /></div>
        <div className="absolute top-[20px] bottom-[20px] right-[8px]"><ChainBorder vertical /></div>

        {/* Saffron inner border */}
        <div className="absolute inset-[30px] border pointer-events-none" style={{ borderColor: `${colors.saffron}20` }} />
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
                  <CompactKhanda size={70} />
                )}
              </div>
            )}
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mt-2 mb-2" style={{ color: colors.saffron }}>
              {shloka}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-[0.2em] mb-1" style={{ color: colors.textLight }}>
              {biodataTitle || t.biodataTitleDefault}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-14 h-[0.5px]" style={{ backgroundColor: colors.saffron }} />
              <CompactKhanda size={18} />
              <div className="w-14 h-[0.5px]" style={{ backgroundColor: colors.saffron }} />
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
                      <div className="p-1.5 shadow-2xl relative" style={{ backgroundColor: `${colors.bgStart}AA`, border: `1.5px solid ${colors.saffron}40` }}>
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: colors.saffron }} />
                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: colors.saffron }} />
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: colors.saffron }} />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: colors.saffron }} />
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
              <div className="h-[0.5px] flex-1" style={{ backgroundColor: colors.saffron }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: colors.saffronLight }} />
              <div className="h-[0.5px] flex-1" style={{ backgroundColor: colors.saffron }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
