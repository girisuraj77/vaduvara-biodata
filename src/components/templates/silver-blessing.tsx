"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

// Silver Blessing — Christian, Charcoal & Silver Pearl, Dove + radiant rays
export function SilverBlessing({ data: externalData }: { data?: any }) {
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
  } = externalData ? getTemplateData(externalData, "Christian") : storeData;

  const isBlankDesign = externalData?.isBlankDesign || false;

  const colors = {
    bgStart: "#1C1C2E",
    bgEnd: "#0E0E1A",
    silver: "#E8E8F0",
    silverMid: "#A8A8C0",
    silverDark: "#6870A0",
    gold: "#D0A040",
    goldLight: "#F5D080",
    textLight: "#F0F0FF",
    textBody: "#C8C8E0",
  };

  // Dove with wings spread
  const DoveCrest = ({ size = 60 }: { size?: number }) => (
    <svg viewBox="0 0 120 80" width={size} height={size * 0.67}>
      {/* Left wing */}
      <path d="M60,40 C45,20 15,15 5,35 C20,30 40,32 60,40Z" fill={colors.silver} opacity="0.9" />
      <path d="M60,40 C42,25 18,22 8,42 C22,36 42,36 60,40Z" fill={colors.silverMid} opacity="0.6" />
      {/* Right wing */}
      <path d="M60,40 C75,20 105,15 115,35 C100,30 80,32 60,40Z" fill={colors.silver} opacity="0.9" />
      <path d="M60,40 C78,25 102,22 112,42 C98,36 78,36 60,40Z" fill={colors.silverMid} opacity="0.6" />
      {/* Body */}
      <ellipse cx="60" cy="45" rx="15" ry="10" fill={colors.silver} />
      {/* Head */}
      <circle cx="72" cy="38" r="8" fill={colors.silver} />
      <circle cx="75" cy="36" r="3" fill={colors.bgStart} />
      {/* Beak */}
      <path d="M80,37 L87,35 L80,39 Z" fill={colors.gold} />
      {/* Tail */}
      <path d="M45,48 L35,58 L50,52 L40,65 L55,55 L50,65 L60,55Z" fill={colors.silverMid} opacity="0.8" />
      {/* Olive branch */}
      <path d="M74,50 C70,60 65,62 60,65" fill="none" stroke={colors.gold} strokeWidth="1.5" />
      <ellipse cx="64" cy="60" rx="4" ry="2.5" fill={colors.gold} opacity="0.8" transform="rotate(-30,64,60)" />
      <ellipse cx="58" cy="63" rx="3" ry="2" fill={colors.gold} opacity="0.7" transform="rotate(15,58,63)" />
    </svg>
  );

  // Radiant halo behind header
  const RadiantHalo = () => (
    <svg viewBox="0 0 200 200" width="200" height="200" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 opacity-20">
      {[...Array(24)].map((_, i) => {
        const angle = i * 15;
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + 30 * Math.cos(rad);
        const y1 = 100 + 30 * Math.sin(rad);
        const x2 = 100 + 95 * Math.cos(rad);
        const y2 = 100 + 95 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={colors.gold} strokeWidth={i % 3 === 0 ? "2" : "1"} opacity={i % 3 === 0 ? "0.8" : "0.4"} />;
      })}
      <circle cx="100" cy="100" r="28" fill="none" stroke={colors.gold} strokeWidth="1.5" />
      <circle cx="100" cy="100" r="20" fill={colors.gold} opacity="0.3" />
    </svg>
  );

  // Pearl chain border
  const PearlChain = ({ flip }: { flip?: boolean }) => (
    <svg viewBox="0 0 794 16" width="794" height="16" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <defs>
        <pattern id="sb-pearl" width="24" height="16" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="8" r="5" fill="none" stroke={colors.silverMid} strokeWidth="1" opacity="0.6" />
          <circle cx="12" cy="8" r="2.5" fill={colors.silverDark} opacity="0.4" />
          <circle cx="12" cy="5" r="1" fill={colors.silver} opacity="0.5" />
          <line x1="0" y1="8" x2="7" y2="8" stroke={colors.silverMid} strokeWidth="0.8" opacity="0.4" />
          <line x1="17" y1="8" x2="24" y2="8" stroke={colors.silverMid} strokeWidth="0.8" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sb-pearl)" />
    </svg>
  );

  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest mt-0.5" style={{ color: colors.silverMid }}>
        {label}:
      </div>
      <div className="text-[13.5px] font-medium leading-normal break-words" style={{ color: colors.textBody }}>
        {value}
      </div>
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 my-2">
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.silver }} />
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 12 12" width="12" height="12"><circle cx="6" cy="6" r="5" fill="none" stroke={colors.gold} strokeWidth="1.5" /><circle cx="6" cy="6" r="2.5" fill={colors.gold} /></svg>
        <span className="text-[12px] font-black tracking-[0.2em] uppercase" style={{ color: colors.silver }}>
          {title}
        </span>
        <svg viewBox="0 0 12 12" width="12" height="12"><circle cx="6" cy="6" r="5" fill="none" stroke={colors.gold} strokeWidth="1.5" /><circle cx="6" cy="6" r="2.5" fill={colors.gold} /></svg>
      </div>
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.silver }} />
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-14 pt-10 pb-14 shrink-0 shadow-2xl"
      style={{ background: `linear-gradient(160deg, ${colors.bgStart} 0%, ${colors.bgEnd} 100%)`, color: colors.textLight }}
    >
      {/* Decorative Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle cross watermark */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
          <rect x="387" y="0" width="20" height="1123" fill={colors.silver} />
          <rect x="0" y="555" width="794" height="14" fill={colors.silver} />
        </svg>

        {/* Silver shimmer dots */}
        <svg className="absolute inset-0 w-full h-full opacity-15">
          {[...Array(30)].map((_, i) => {
            const x = (Math.abs(Math.sin(i * 73.1)) * 794);
            const y = (Math.abs(Math.sin(i * 137.5)) * 1123);
            const r = Math.abs(Math.sin(i * 53.3)) * 1.2 + 0.3;
            return <circle key={i} cx={x} cy={y} r={r} fill={colors.silver} />;
          })}
        </svg>

        {/* Pearl border top/bottom */}
        <div className="absolute top-0 left-0 right-0"><PearlChain /></div>
        <div className="absolute bottom-0 left-0 right-0"><PearlChain flip /></div>

        {/* Silver frame */}
        <div className="absolute inset-[8px] border" style={{ borderColor: `${colors.silver}20` }} />
        <div className="absolute inset-[12px] border" style={{ borderColor: `${colors.gold}15` }} />

        {/* Corner crosses */}
        {[0, 1, 2, 3].map(i => (
          <svg key={i} width="40" height="40" viewBox="0 0 40 40"
            style={{ position: "absolute", top: i < 2 ? 10 : undefined, bottom: i >= 2 ? 10 : undefined, left: i % 2 === 0 ? 10 : undefined, right: i % 2 !== 0 ? 10 : undefined }}
          >
            <rect x="18" y="4" width="4" height="32" rx="1" fill={colors.gold} opacity="0.4" />
            <rect x="4" y="16" width="32" height="4" rx="1" fill={colors.gold} opacity="0.4" />
            <circle cx="20" cy="20" r="4" fill={colors.gold} opacity="0.5" />
          </svg>
        ))}
      </div>

      {/* Content */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-3 mt-4">
          {/* Header */}
          <div className="flex flex-col items-center text-center relative">
            <RadiantHalo />
                        {showGodPhoto && (
              <div className="flex justify-center mb-1 w-[80px] h-[80px] overflow-hidden bg-transparent">
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
                  <DoveCrest size={80} />
                )}
              </div>
            )}
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mt-2 mb-2" style={{ color: colors.gold }}>
              {shloka}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-[0.2em] mb-1" style={{ color: colors.silver }}>
              {biodataTitle || t.biodataTitleDefault}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-14 h-[0.5px]" style={{ backgroundColor: colors.silverMid }} />
              <div className="w-2 h-2 rotate-45" style={{ backgroundColor: colors.gold }} />
              <div className="w-14 h-[0.5px]" style={{ backgroundColor: colors.silverMid }} />
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
                      <div className="p-1.5 shadow-2xl relative" style={{ backgroundColor: `${colors.bgStart}CC`, border: `1.5px solid ${colors.silver}30` }}>
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
          <div className="mt-auto pt-3 flex flex-col items-center opacity-30">
            <DoveCrest size={40} />
          </div>
        </div>
      )}
    </div>
  );
}
