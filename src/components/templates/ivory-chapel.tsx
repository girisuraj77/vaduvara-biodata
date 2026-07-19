"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function IvoryChapel({ data: externalData }: { data?: any }) {
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

  // Ivory Chapel: Warm Ivory & Forest Green & Gold
  const colors = {
    bg: "#FBF8F0",
    green: "#2D5A27",
    greenLight: "#D4E8C2",
    gold: "#B8960C",
    goldLight: "#F0D870",
    textDark: "#1A2E17",
    textBody: "#2E3D2A",
  };

  // Gothic Arch Frame (top header)
  const GothicArch = () => (
    <svg viewBox="0 0 200 80" width="200" height="80">
      {/* Gothic pointed arch */}
      <path d="M 10,80 L 10,40 Q 10,5 100,5 Q 190,5 190,40 L 190,80" fill="none" stroke={colors.gold} strokeWidth="1.5" />
      <path d="M 25,80 L 25,45 Q 25,18 100,18 Q 175,18 175,45 L 175,80" fill="none" stroke={colors.green} strokeWidth="0.8" opacity="0.5" />
      {/* Celtic knot top center */}
      <path d="M 95,5 Q 100,-2 105,5 Q 100,12 95,5 Z" fill={colors.gold} />
      {/* Trefoil at apex */}
      <circle cx="100" cy="5" r="5" fill={colors.goldLight} opacity="0.8" />
      <circle cx="93" cy="10" r="4" fill={colors.greenLight} opacity="0.6" />
      <circle cx="107" cy="10" r="4" fill={colors.greenLight} opacity="0.6" />
    </svg>
  );

  // Celtic Cross SVG
  const CelticCross = () => (
    <svg viewBox="0 0 80 100" width="44" height="55">
      {/* Circle ring */}
      <circle cx="40" cy="40" r="22" fill="none" stroke={colors.gold} strokeWidth="3" />
      <circle cx="40" cy="40" r="17" fill="none" stroke={colors.goldLight} strokeWidth="1" opacity="0.5" />
      {/* Cross arms */}
      <rect x="36" y="5" width="8" height="90" rx="2" fill={colors.green} />
      <rect x="10" y="34" width="60" height="8" rx="2" fill={colors.green} />
      {/* Celtic knot nodes at intersections */}
      <circle cx="40" cy="40" r="7" fill={colors.gold} />
      <circle cx="40" cy="5" r="4" fill={colors.goldLight} />
      <circle cx="40" cy="95" r="3" fill={colors.goldLight} />
      <circle cx="10" cy="38" r="3" fill={colors.goldLight} />
      <circle cx="70" cy="38" r="3" fill={colors.goldLight} />
    </svg>
  );

  // Vine border element
  const VineBorder = ({ flip }: { flip?: boolean }) => (
    <svg viewBox="0 0 794 20" width="794" height="20" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <defs>
        <pattern id="vine-ic" width="60" height="20" patternUnits="userSpaceOnUse">
          <path d="M0,10 Q15,2 30,10 T60,10" fill="none" stroke={colors.green} strokeWidth="1.2" />
          <circle cx="15" cy="5" r="2.5" fill={colors.greenLight} />
          <circle cx="45" cy="15" r="2.5" fill={colors.greenLight} />
          <path d="M15,5 L12,0 M15,5 L18,0 M15,5 L15,1" fill="none" stroke={colors.green} strokeWidth="0.8" />
          <path d="M45,15 L42,20 M45,15 L48,20 M45,15 L45,19" fill="none" stroke={colors.green} strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#vine-ic)" />
    </svg>
  );

  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest mt-0.5" style={{ color: colors.green }}>
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
        {/* Small leaf icon */}
        <svg viewBox="0 0 20 20" width="12" height="12" fill={colors.green}>
          <path d="M10 2 C10 2 4 8 4 13 C4 17 7 19 10 19 C13 19 16 17 16 13 C16 8 10 2 10 2Z" />
        </svg>
        <span className="text-[12px] font-black tracking-[0.2em] uppercase" style={{ color: colors.green }}>
          {title}
        </span>
        <svg viewBox="0 0 20 20" width="12" height="12" fill={colors.green}>
          <path d="M10 2 C10 2 4 8 4 13 C4 17 7 19 10 19 C13 19 16 17 16 13 C16 8 10 2 10 2Z" />
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
      {/* Decorative layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Ivy/vine pattern subtle background */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ivy-bg" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50,10 C60,30 80,40 50,50 C20,40 40,30 50,10Z" fill={colors.green} />
              <path d="M20,60 C30,80 50,90 20,100 C-10,90 10,80 20,60Z" fill={colors.green} />
              <path d="M80,60 C90,80 110,90 80,100 C50,90 70,80 80,60Z" fill={colors.green} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ivy-bg)" />
        </svg>

        {/* Warm aged paper tint */}
        <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(ellipse at 50% 0%, ${colors.greenLight} 0%, transparent 60%)` }} />

        {/* Top vine border */}
        <div className="absolute top-0 left-0 right-0"><VineBorder /></div>
        {/* Bottom vine border */}
        <div className="absolute bottom-0 left-0 right-0"><VineBorder flip /></div>

        {/* Gold border frame */}
        <div className="absolute inset-[10px] border pointer-events-none" style={{ borderColor: `${colors.gold}35` }} />
        <div className="absolute inset-[14px] border pointer-events-none" style={{ borderColor: `${colors.green}20` }} />

        {/* Corner thorn ornaments */}
        {[0, 1, 2, 3].map(i => (
          <svg key={i} width="50" height="50" viewBox="0 0 50 50"
            style={{
              position: "absolute",
              top: i < 2 ? 8 : undefined,
              bottom: i >= 2 ? 8 : undefined,
              left: i % 2 === 0 ? 8 : undefined,
              right: i % 2 !== 0 ? 8 : undefined,
              transform: `rotate(${i * 90}deg)`,
            }}
          >
            <path d="M2,30 L2,2 L30,2" stroke={colors.gold} strokeWidth="1.5" fill="none" />
            <circle cx="2" cy="2" r="2" fill={colors.green} />
            <circle cx="2" cy="30" r="1.5" fill={colors.gold} />
            <circle cx="30" cy="2" r="1.5" fill={colors.gold} />
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
                  <CelticCross />
                )}
              </div>
            )}
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mt-2 mb-2" style={{ color: colors.green }}>
              {shloka}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-[0.2em] mb-1" style={{ color: colors.textDark }}>
              {biodataTitle || t.biodataTitleDefault}
            </h1>
            <GothicArch />
          </div>

          {/* Body */}
          <div className="flex flex-col gap-3 py-1">
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
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: colors.green }} />
                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: colors.green }} />
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: colors.green }} />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: colors.green }} />
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
            <div className="flex items-center gap-4 w-full px-20">
              <div className="h-[0.5px] flex-1" style={{ backgroundColor: colors.gold }} />
              <svg viewBox="0 0 24 24" width="12" height="12" fill={colors.green}><path d="M12 2 C12 2 4 10 4 15 C4 19 8 22 12 22 C16 22 20 19 20 15 C20 10 12 2 12 2Z" /></svg>
              <div className="h-[0.5px] flex-1" style={{ backgroundColor: colors.gold }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
