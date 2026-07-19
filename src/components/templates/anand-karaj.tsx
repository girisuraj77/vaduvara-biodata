"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

// Anand Karaj — Sikh, Ivory & Royal Blue, Lotus + Gurudwara silhouette
export function AnandKaraj({ data: externalData }: { data?: any }) {
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
    bg: "#FFFEF5",
    blue: "#1A3A6B",
    blueLight: "#D0DCEF",
    blueMid: "#2D5A9B",
    gold: "#C8A84B",
    goldLight: "#F0D88A",
    textDark: "#0D2040",
    textBody: "#1A2E50",
  };

  // Gurudwara silhouette
  const GurudwaraSilhouette = ({ size = 80 }: { size?: number }) => (
    <svg viewBox="0 0 120 130" width={size} height={size * 1.08}>
      {/* Main dome */}
      <path d="M60,10 C45,10 35,20 35,35 L35,45 L85,45 L85,35 C85,20 75,10 60,10Z" fill={colors.blue} opacity="0.9" />
      {/* Dome top finial */}
      <rect x="56" y="2" width="8" height="12" rx="2" fill={colors.gold} />
      <circle cx="60" cy="2" r="4" fill={colors.gold} />
      {/* Flag pole */}
      <rect x="58" y="-5" width="4" height="20" fill={colors.goldLight} opacity="0.8" />
      {/* Nishan Sahib (Sikh flag triangle) */}
      <path d="M62,0 L80,8 L62,16Z" fill={colors.gold} opacity="0.8" />

      {/* Side minarets */}
      <rect x="22" y="35" width="14" height="35" rx="4" fill={colors.blue} opacity="0.8" />
      <path d="M29,35 C24,28 22,22 29,18 C36,22 34,28 29,35Z" fill={colors.blueMid} opacity="0.7" />
      <circle cx="29" cy="18" r="3" fill={colors.gold} />

      <rect x="84" y="35" width="14" height="35" rx="4" fill={colors.blue} opacity="0.8" />
      <path d="M91,35 C86,28 84,22 91,18 C98,22 96,28 91,35Z" fill={colors.blueMid} opacity="0.7" />
      <circle cx="91" cy="18" r="3" fill={colors.gold} />

      {/* Main building body */}
      <rect x="25" y="45" width="70" height="55" rx="3" fill={colors.blue} opacity="0.85" />
      {/* Arched entrance */}
      <path d="M46,100 L46,75 Q60,62 74,75 L74,100 Z" fill={colors.gold} opacity="0.7" />
      <path d="M50,100 L50,78 Q60,68 70,78 L70,100 Z" fill={colors.blueLight} opacity="0.5" />
      {/* Windows */}
      <path d="M30,60 Q36,52 42,60 L42,72 L30,72 Z" fill={colors.gold} opacity="0.4" />
      <path d="M78,60 Q84,52 90,60 L90,72 L78,72 Z" fill={colors.gold} opacity="0.4" />
      {/* Base/steps */}
      <rect x="15" y="100" width="90" height="8" rx="1" fill={colors.gold} opacity="0.5" />
      <rect x="8" y="106" width="104" height="6" rx="1" fill={colors.gold} opacity="0.35" />
      <rect x="0" y="110" width="120" height="5" rx="1" fill={colors.gold} opacity="0.25" />
    </svg>
  );

  // Lotus mandala header
  const LotusHeader = () => (
    <svg viewBox="0 0 200 50" width="200" height="50">
      <defs>
        <pattern id="ak-lotus" width="40" height="50" patternUnits="userSpaceOnUse">
          {/* Simple lotus petal row */}
          <path d="M20,50 C14,35 12,25 20,20 C28,25 26,35 20,50Z" fill={colors.blue} opacity="0.2" />
          <path d="M0,50 C5,38 8,30 20,20 C18,30 15,38 0,50Z" fill={colors.blueLight} opacity="0.3" />
          <path d="M40,50 C35,38 32,30 20,20 C22,30 25,38 40,50Z" fill={colors.blueLight} opacity="0.3" />
        </pattern>
      </defs>
      <rect width="200" height="50" fill="url(#ak-lotus)" />
      <line x1="0" y1="49" x2="200" y2="49" stroke={colors.gold} strokeWidth="1.5" />
    </svg>
  );

  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest mt-0.5" style={{ color: colors.blue }}>
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
        {/* Lotus icon */}
        <svg viewBox="0 0 20 16" width="12" height="10">
          <path d="M10,16 C8,10 6,8 10,5 C14,8 12,10 10,16Z" fill={colors.blue} opacity="0.7" />
          <path d="M10,16 C6,12 3,10 2,12 C4,12 7,14 10,16Z" fill={colors.blueMid} opacity="0.6" />
          <path d="M10,16 C14,12 17,10 18,12 C16,12 13,14 10,16Z" fill={colors.blueMid} opacity="0.6" />
        </svg>
        <span className="text-[12px] font-black tracking-[0.2em] uppercase" style={{ color: colors.blue }}>
          {title}
        </span>
        <svg viewBox="0 0 20 16" width="12" height="10">
          <path d="M10,16 C8,10 6,8 10,5 C14,8 12,10 10,16Z" fill={colors.blue} opacity="0.7" />
          <path d="M10,16 C6,12 3,10 2,12 C4,12 7,14 10,16Z" fill={colors.blueMid} opacity="0.6" />
          <path d="M10,16 C14,12 17,10 18,12 C16,12 13,14 10,16Z" fill={colors.blueMid} opacity="0.6" />
        </svg>
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
        {/* Light blue watercolor wash */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-15 blur-[120px]"
          style={{ background: `radial-gradient(ellipse, ${colors.blueLight} 0%, transparent 70%)` }} />

        {/* Subtle paisley dots */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
          <defs>
            <pattern id="ak-dots" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="2" fill={colors.blue} />
              <circle cx="10" cy="10" r="1.5" fill={colors.gold} />
              <circle cx="70" cy="70" r="1.5" fill={colors.gold} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ak-dots)" />
        </svg>

        {/* Top lotus header */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2"><LotusHeader /></div>
        {/* Bottom lotus footer */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ transform: "translateX(-50%) scaleY(-1)" }}><LotusHeader /></div>

        {/* Gold border */}
        <div className="absolute inset-[10px] border" style={{ borderColor: `${colors.gold}30` }} />
        <div className="absolute inset-[14px] border" style={{ borderColor: `${colors.blue}15` }} />

        {/* Corner ornaments */}
        {[0, 1, 2, 3].map(i => (
          <svg key={i} width="55" height="55" viewBox="0 0 55 55"
            style={{ position: "absolute", top: i < 2 ? 8 : undefined, bottom: i >= 2 ? 8 : undefined, left: i % 2 === 0 ? 8 : undefined, right: i % 2 !== 0 ? 8 : undefined, transform: `rotate(${i * 90}deg)` }}
          >
            <path d="M3,40 L3,3 L40,3" stroke={colors.gold} strokeWidth="1.5" fill="none" opacity="0.5" />
            <path d="M3,3 C12,3 20,8 22,18 C14,14 8,10 3,3Z" fill={colors.blueLight} opacity="0.5" />
            <circle cx="3" cy="3" r="2.5" fill={colors.gold} opacity="0.8" />
          </svg>
        ))}
      </div>

      {/* Content */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-3 mt-8">
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
                  <GurudwaraSilhouette size={72} />
                )}
              </div>
            )}
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mt-2 mb-2" style={{ color: colors.blue }}>
              {shloka}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-[0.2em] mb-1" style={{ color: colors.textDark }}>
              {biodataTitle || t.biodataTitleDefault}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-16 h-[0.5px]" style={{ backgroundColor: colors.gold }} />
              <div className="w-2 h-2 rotate-45" style={{ backgroundColor: colors.blue }} />
              <div className="w-16 h-[0.5px]" style={{ backgroundColor: colors.gold }} />
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
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: colors.blue }} />
                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: colors.blue }} />
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: colors.blue }} />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: colors.blue }} />
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
          <div className="mt-auto pt-2 flex flex-col items-center opacity-30">
            <div className="flex items-center gap-3 w-full px-20">
              <div className="h-[0.5px] flex-1" style={{ backgroundColor: colors.gold }} />
              <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: colors.blue }} />
              <div className="h-[0.5px] flex-1" style={{ backgroundColor: colors.gold }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
