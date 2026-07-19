"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

// Saffron Glory — Sikh, Vibrant Saffron & Deep Maroon, Ik Onkar crest
export function SaffronGlory({ data: externalData }: { data?: any }) {
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
    bg: "#FFF8EE",
    saffron: "#E85D00",
    saffronLight: "#FF8C2A",
    saffronPale: "#FFE4C8",
    maroon: "#5A0020",
    maroonLight: "#8B1040",
    gold: "#D4A017",
    goldLight: "#F5D060",
    textDark: "#2A0010",
    textBody: "#3D1025",
  };

  // Ik Onkar SVG (ੴ stylized)
  const IkOnkar = ({ size = 60 }: { size?: number }) => (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {/* Outer decorative ring */}
      <circle cx="50" cy="50" r="46" fill="none" stroke={colors.saffron} strokeWidth="1.5" opacity="0.4" />
      <circle cx="50" cy="50" r="40" fill={colors.saffronPale} opacity="0.6" />
      {/* Ik Onkar calligraphic symbol (simplified) */}
      {/* "1" numeral top */}
      <path d="M35,20 L35,15 L45,20 L45,55 C45,65 50,70 60,70 C68,70 72,65 72,58 C72,50 67,46 60,46 C55,46 52,49 52,53" fill="none" stroke={colors.maroon} strokeWidth="4" strokeLinecap="round" />
      {/* Oankar loop */}
      <path d="M52,53 C50,58 52,63 58,65 C65,67 70,63 70,57 C70,51 65,47 60,47" fill="none" stroke={colors.maroon} strokeWidth="3.5" strokeLinecap="round" />
      {/* Top curve/hook */}
      <path d="M35,20 C35,14 42,10 50,12 C58,14 62,20 60,28" fill="none" stroke={colors.saffron} strokeWidth="3" strokeLinecap="round" />
      {/* Long descending tail */}
      <path d="M60,70 C60,80 55,86 45,88" fill="none" stroke={colors.maroon} strokeWidth="3.5" strokeLinecap="round" />
      {/* Bottom wave / nada */}
      <path d="M30,88 C36,84 44,86 50,88 C56,90 62,88 68,84" fill="none" stroke={colors.saffron} strokeWidth="2.5" strokeLinecap="round" />
      {/* Decorative dots */}
      <circle cx="35" cy="14" r="3" fill={colors.gold} />
      <circle cx="65" cy="28" r="2" fill={colors.gold} />
    </svg>
  );

  // Saffron wave pattern border
  const SaffronWave = ({ flip }: { flip?: boolean }) => (
    <svg viewBox="0 0 794 28" width="794" height="28" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <defs>
        <pattern id="sg-wave" width="80" height="28" patternUnits="userSpaceOnUse">
          <path d="M0,20 Q20,6 40,20 T80,20" fill={colors.saffronPale} />
          <path d="M0,20 Q20,10 40,20 T80,20" fill="none" stroke={colors.saffron} strokeWidth="1.5" opacity="0.6" />
          {/* Punjabi lotus motif */}
          <path d="M40,20 C38,12 36,10 40,8 C44,10 42,12 40,20Z" fill={colors.saffron} opacity="0.5" />
          <path d="M40,20 C36,14 32,13 30,16 C33,16 37,18 40,20Z" fill={colors.saffronLight} opacity="0.4" />
          <path d="M40,20 C44,14 48,13 50,16 C47,16 43,18 40,20Z" fill={colors.saffronLight} opacity="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sg-wave)" />
      <line x1="0" y1="27" x2="794" y2="27" stroke={colors.saffron} strokeWidth="1.2" opacity="0.4" />
    </svg>
  );

  // Kaur knot corner ornament
  const KnotCorner = () => (
    <svg viewBox="0 0 70 70" width="70" height="70">
      <path d="M5,55 L5,5 L55,5" fill="none" stroke={colors.saffron} strokeWidth="2" opacity="0.5" />
      <path d="M5,5 Q20,5 25,20 Q30,5 5,5" fill={colors.saffronLight} opacity="0.3" />
      {/* Lotus petal at corner */}
      <path d="M5,5 C5,20 15,25 25,20 C15,15 8,10 5,5Z" fill={colors.saffron} opacity="0.4" />
      <circle cx="5" cy="5" r="3" fill={colors.gold} opacity="0.8" />
      <circle cx="5" cy="55" r="2" fill={colors.saffron} opacity="0.6" />
      <circle cx="55" cy="5" r="2" fill={colors.saffron} opacity="0.6" />
    </svg>
  );

  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest mt-0.5" style={{ color: colors.maroon }}>
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
        <svg viewBox="0 0 16 16" width="10" height="10" fill={colors.saffron}>
          <path d="M8,0 L9.5,5.5 L15,4 L11,8 L15,12 L9.5,10.5 L8,16 L6.5,10.5 L1,12 L5,8 L1,4 L6.5,5.5Z" />
        </svg>
        <span className="text-[12px] font-black tracking-[0.2em] uppercase" style={{ color: colors.maroon }}>
          {title}
        </span>
        <svg viewBox="0 0 16 16" width="10" height="10" fill={colors.saffron}>
          <path d="M8,0 L9.5,5.5 L15,4 L11,8 L15,12 L9.5,10.5 L8,16 L6.5,10.5 L1,12 L5,8 L1,4 L6.5,5.5Z" />
        </svg>
      </div>
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.saffron }} />
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
        {/* Saffron diagonal stripe background */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="sg-stripe" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
              <rect width="20" height="40" fill={colors.saffron} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sg-stripe)" />
        </svg>

        {/* Warm radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 blur-[100px]"
          style={{ background: `radial-gradient(ellipse, ${colors.saffronPale} 0%, transparent 70%)` }} />

        {/* Top saffron wave */}
        <div className="absolute top-0 left-0 right-0"><SaffronWave /></div>
        {/* Bottom saffron wave */}
        <div className="absolute bottom-0 left-0 right-0"><SaffronWave flip /></div>

        {/* Gold frame borders */}
        <div className="absolute inset-[10px] border" style={{ borderColor: `${colors.gold}30` }} />
        <div className="absolute inset-[14px] border" style={{ borderColor: `${colors.saffron}20` }} />

        {/* Corner lotus ornaments */}
        <div className="absolute top-[6px] left-[6px]"><KnotCorner /></div>
        <div className="absolute top-[6px] right-[6px]" style={{ transform: "scaleX(-1)" }}><KnotCorner /></div>
        <div className="absolute bottom-[6px] left-[6px]" style={{ transform: "scaleY(-1)" }}><KnotCorner /></div>
        <div className="absolute bottom-[6px] right-[6px]" style={{ transform: "scale(-1,-1)" }}><KnotCorner /></div>
      </div>

      {/* Content */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col flex-1 gap-3 mt-6">
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
                  <IkOnkar size={72} />
                )}
              </div>
            )}
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mt-1 mb-2" style={{ color: colors.saffron }}>
              {shloka}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-[0.2em] mb-1" style={{ color: colors.textDark }}>
              {biodataTitle || t.biodataTitleDefault}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-14 h-[1px]" style={{ backgroundColor: colors.saffron }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.gold }} />
              <div className="w-14 h-[1px]" style={{ backgroundColor: colors.saffron }} />
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
                      <div className="p-1.5 shadow-xl relative bg-white" style={{ border: `1.5px solid ${colors.saffron}50` }}>
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: colors.saffron }} />
                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: colors.saffron }} />
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: colors.saffron }} />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: colors.saffron }} />
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
            <IkOnkar size={32} />
          </div>
        </div>
      )}
    </div>
  );
}
