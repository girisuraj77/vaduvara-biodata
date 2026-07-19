"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function CelestialGrace({ data: externalData }: { data?: any }) {
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

  // Celestial Christian: Soft White & Sky Blue & Gold
  const colors = {
    bg: "#FEFCFF",
    skyBlue: "#1E4D8C",
    lightBlue: "#D6E8FF",
    gold: "#C8A84B",
    goldLight: "#F5DFA0",
    textDark: "#12213A",
    textBody: "#2C3E5A",
  };

  // Stained Glass Cross Crest
  const CrossCrest = () => (
    <svg viewBox="0 0 120 120" width="56" height="56">
      {/* Outer ring */}
      <circle cx="60" cy="60" r="56" fill="none" stroke={colors.gold} strokeWidth="1.5" opacity="0.5" />
      <circle cx="60" cy="60" r="50" fill="none" stroke={colors.gold} strokeWidth="0.8" opacity="0.3" />
      {/* Stained glass segments */}
      <path d="M60 10 L60 45 L45 30 Z" fill={colors.lightBlue} opacity="0.8" />
      <path d="M60 10 L60 45 L75 30 Z" fill={colors.skyBlue} opacity="0.5" />
      <path d="M110 60 L75 60 L90 45 Z" fill={colors.lightBlue} opacity="0.8" />
      <path d="M110 60 L75 60 L90 75 Z" fill={colors.skyBlue} opacity="0.5" />
      <path d="M60 110 L60 75 L75 90 Z" fill={colors.lightBlue} opacity="0.8" />
      <path d="M60 110 L60 75 L45 90 Z" fill={colors.skyBlue} opacity="0.5" />
      <path d="M10 60 L45 60 L30 45 Z" fill={colors.lightBlue} opacity="0.8" />
      <path d="M10 60 L45 60 L30 75 Z" fill={colors.skyBlue} opacity="0.5" />
      {/* Gold Cross */}
      <rect x="55" y="18" width="10" height="84" rx="3" fill={colors.gold} />
      <rect x="22" y="48" width="76" height="10" rx="3" fill={colors.gold} />
      {/* Center gem */}
      <circle cx="60" cy="60" r="8" fill={colors.gold} />
      <circle cx="60" cy="60" r="5" fill={colors.goldLight} />
    </svg>
  );

  // Dove SVG
  const Dove = () => (
    <svg viewBox="0 0 80 50" width="32" height="20">
      <path d="M 40,25 C 30,10 10,15 5,25 C 15,30 30,28 40,25 Z" fill={colors.gold} opacity="0.7" />
      <path d="M 40,25 C 50,10 70,15 75,25 C 65,30 50,28 40,25 Z" fill={colors.gold} opacity="0.5" />
      <ellipse cx="40" cy="27" rx="10" ry="7" fill={colors.goldLight} />
      <circle cx="45" cy="24" r="2.5" fill={colors.gold} />
    </svg>
  );

  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest mt-0.5" style={{ color: colors.skyBlue }}>
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
        <svg viewBox="0 0 24 24" width="10" height="10" fill={colors.gold}>
          <path d="M12 2L13.5 8.5L20 8L14.5 12L16 18.5L12 14.5L8 18.5L9.5 12L4 8L10.5 8.5Z" />
        </svg>
        <span className="text-[12px] font-black tracking-[0.2em] uppercase" style={{ color: colors.skyBlue }}>
          {title}
        </span>
        <svg viewBox="0 0 24 24" width="10" height="10" fill={colors.gold}>
          <path d="M12 2L13.5 8.5L20 8L14.5 12L16 18.5L12 14.5L8 18.5L9.5 12L4 8L10.5 8.5Z" />
        </svg>
      </div>
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.gold }} />
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-14 pt-10 pb-14 shrink-0 shadow-2xl"
      style={{ backgroundColor: colors.bg, color: colors.textDark }}
    >
      {/* Decorative Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Radial glow from top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-[80px]"
          style={{ background: `radial-gradient(ellipse, ${colors.lightBlue} 0%, transparent 70%)` }}
        />

        {/* Top stained glass wave band */}
        <svg className="absolute inset-x-0 top-0 w-full" height="60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cg-arch" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M0,60 L0,30 Q30,0 60,30 L60,60 Z" fill={colors.lightBlue} opacity="0.35" />
              <path d="M0,60 L0,38 Q30,12 60,38 L60,60 Z" fill={colors.skyBlue} opacity="0.12" />
              <line x1="30" y1="0" x2="30" y2="60" stroke={colors.gold} strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cg-arch)" />
          <line x1="0" y1="59" x2="794" y2="59" stroke={colors.gold} strokeWidth="1.5" />
        </svg>

        {/* Bottom wave band */}
        <svg className="absolute inset-x-0 bottom-0 w-full" height="60" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#cg-arch)" transform="rotate(180, 397, 30)" />
          <line x1="0" y1="1" x2="794" y2="1" stroke={colors.gold} strokeWidth="1.5" />
        </svg>

        {/* Corner ornaments */}
        {[
          { x: 12, y: 12, rotate: "0deg" },
          { x: 782, y: 12, rotate: "90deg", origin: "right" },
          { x: 12, y: 1111, rotate: "270deg" },
          { x: 782, y: 1111, rotate: "180deg" },
        ].map((corner, i) => (
          <svg key={i} width="60" height="60" viewBox="0 0 60 60" fill="none"
            style={{ position: "absolute", left: i % 2 === 0 ? corner.x : undefined, right: i % 2 !== 0 ? (794 - corner.x) : undefined, top: i < 2 ? corner.y : undefined, bottom: i >= 2 ? (1123 - corner.y) : undefined }}
          >
            <path d="M5,35 L5,5 L35,5" stroke={colors.gold} strokeWidth="1.5" fill="none" />
            <path d="M5,5 L20,20" stroke={colors.goldLight} strokeWidth="0.8" opacity="0.6" />
            <circle cx="5" cy="5" r="2.5" fill={colors.gold} />
          </svg>
        ))}

        {/* Outer border */}
        <div className="absolute inset-[8px] border pointer-events-none" style={{ borderColor: `${colors.skyBlue}20` }} />
        <div className="absolute inset-[12px] border pointer-events-none" style={{ borderColor: `${colors.gold}30` }} />
      </div>

      {/* Content Area */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-3 mt-6">

          {/* Header */}
          <div className="flex flex-col items-center text-center pt-2">
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
                  <CrossCrest />
                )}
              </div>
            )}
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mt-2 mb-2" style={{ color: colors.skyBlue }}>
              {shloka}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-[0.2em] mb-1" style={{ color: colors.textDark }}>
              {biodataTitle || t.biodataTitleDefault}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-16 h-[1px]" style={{ backgroundColor: colors.gold }} />
              <Dove />
              <div className="w-16 h-[1px]" style={{ backgroundColor: colors.gold }} />
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-3 py-2">
            {personalFields.length > 0 && (
              <div className="space-y-1">
                <SectionHeader title={stepHeadings[1] || "Personal Details"} />
                <div className="flex gap-6 px-3 items-start">
                  <div className="flex-1 grid grid-cols-1 gap-0">
                    {personalFields.map((f: any) => (
                      <FieldRow key={f.id} label={f.label} value={f.value} />
                    ))}
                  </div>
                  {profilePhotoUrl && (
                    <div className="shrink-0 mt-1">
                      <div className="p-1.5 shadow-xl relative bg-white" style={{ border: `1.5px solid ${colors.gold}60` }}>
                        <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2" style={{ borderColor: colors.skyBlue }} />
                        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2" style={{ borderColor: colors.skyBlue }} />
                        <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2" style={{ borderColor: colors.skyBlue }} />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2" style={{ borderColor: colors.skyBlue }} />
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
          <div className="mt-auto pt-3 flex flex-col items-center opacity-40">
            <div className="flex items-center gap-4 w-full px-20">
              <div className="h-[0.5px] flex-1" style={{ backgroundColor: colors.gold }} />
              <CrossCrest />
              <div className="h-[0.5px] flex-1" style={{ backgroundColor: colors.gold }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
