"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function AzureFaith({ data: externalData }: { data?: any }) {
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

  // Azure Faith: Deep Navy & Silver & Gold
  const colors = {
    bgStart: "#0A1628",
    bgEnd: "#050D1C",
    navy: "#0A1628",
    silver: "#BFCFE7",
    silverLight: "#E8EFF8",
    gold: "#D4AF37",
    goldLight: "#FFE590",
    textLight: "#E8EFF8",
    textBody: "#C5D5E8",
  };

  // Star of Bethlehem (8-pointed star)
  const StarOfBethlehem = ({ size = 60 }: { size?: number }) => (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      {/* Outer glow ring */}
      <circle cx="60" cy="60" r="55" fill="none" stroke={colors.gold} strokeWidth="0.5" opacity="0.3" />
      <circle cx="60" cy="60" r="48" fill="none" stroke={colors.silver} strokeWidth="0.8" opacity="0.4" />
      {/* 8-point star rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 60 + 20 * Math.cos(rad);
        const y1 = 60 + 20 * Math.sin(rad);
        const x2 = 60 + 52 * Math.cos(rad);
        const y2 = 60 + 52 * Math.sin(rad);
        const isCardinal = i % 2 === 0;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={isCardinal ? colors.gold : colors.silver}
            strokeWidth={isCardinal ? 3 : 1.5}
            strokeLinecap="round"
          />
        );
      })}
      {/* 8-point star body */}
      <polygon
        points="60,15 65,45 95,40 70,60 95,80 65,75 60,105 55,75 25,80 50,60 25,40 55,45"
        fill={colors.gold}
        opacity="0.9"
      />
      {/* Center jewel */}
      <circle cx="60" cy="60" r="10" fill={colors.goldLight} />
      <circle cx="60" cy="60" r="6" fill={colors.gold} />
    </svg>
  );

  const FieldRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[165px_1fr] gap-x-4 py-0.5 items-start">
      <div className="text-[11px] font-black uppercase tracking-widest mt-0.5" style={{ color: colors.silver }}>
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
        <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: colors.gold }} />
        <span className="text-[12px] font-black tracking-[0.2em] uppercase" style={{ color: colors.silver }}>
          {title}
        </span>
        <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: colors.gold }} />
      </div>
      <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.silver }} />
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-14 pt-10 pb-14 shrink-0 shadow-2xl"
      style={{ background: `radial-gradient(ellipse at 50% 20%, ${colors.bgStart} 0%, ${colors.bgEnd} 100%)`, color: colors.textLight }}
    >
      {/* Decorative Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Constellation dots pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {[...Array(40)].map((_, i) => {
            const seed = (Math.sin(i * 127.1) * 43758.5453) % 1;
            const seed2 = (Math.sin(i * 311.7) * 43758.5453) % 1;
            const x = Math.abs(seed) * 794;
            const y = Math.abs(seed2) * 1123;
            const r = Math.abs((Math.sin(i * 67.3) * 43758.5453) % 1) * 1.5 + 0.5;
            return <circle key={i} cx={x} cy={y} r={r} fill={colors.silverLight} opacity={r / 2} />;
          })}
          {/* Constellation lines */}
          <line x1="150" y1="200" x2="300" y2="280" stroke={colors.silver} strokeWidth="0.3" opacity="0.3" />
          <line x1="300" y1="280" x2="500" y2="180" stroke={colors.silver} strokeWidth="0.3" opacity="0.3" />
          <line x1="600" y1="900" x2="700" y2="800" stroke={colors.silver} strokeWidth="0.3" opacity="0.3" />
        </svg>

        {/* Radiant light beams from center top */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {[...Array(12)].map((_, i) => {
            const angle = -60 + i * 10;
            const rad = (angle * Math.PI) / 180;
            return (
              <line key={i}
                x1="397" y1="0"
                x2={397 + 700 * Math.sin(rad)} y2={700 * Math.cos(rad)}
                stroke={colors.gold} strokeWidth="8"
              />
            );
          })}
        </svg>

        {/* Double silver border */}
        <div className="absolute inset-[10px] border pointer-events-none" style={{ borderColor: `${colors.silver}25` }} />
        <div className="absolute inset-[14px] border pointer-events-none" style={{ borderColor: `${colors.gold}20` }} />

        {/* Corner silver ornaments */}
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
            <path d="M3,35 L3,3 L35,3" stroke={colors.silver} strokeWidth="1.2" fill="none" opacity="0.5" />
            <path d="M3,3 L18,18" stroke={colors.gold} strokeWidth="0.8" opacity="0.4" />
            <circle cx="3" cy="3" r="2" fill={colors.gold} opacity="0.7" />
          </svg>
        ))}
      </div>

      {/* Content Area */}
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
                  <StarOfBethlehem size={64} />
                )}
              </div>
            )}
            <p className="text-[10px] font-black uppercase tracking-[0.35em] mt-2 mb-2" style={{ color: colors.gold }}>
              {shloka}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-[0.2em] mb-1" style={{ color: colors.silverLight }}>
              {biodataTitle || t.biodataTitleDefault}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-16 h-[0.5px]" style={{ backgroundColor: colors.silver }} />
              <StarOfBethlehem size={16} />
              <div className="w-16 h-[0.5px]" style={{ backgroundColor: colors.silver }} />
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
                      <div className="p-1.5 shadow-2xl relative" style={{ backgroundColor: `${colors.bgStart}CC`, border: `1.5px solid ${colors.silver}50` }}>
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
            <div className="flex items-center gap-3 w-full px-20">
              <div className="h-[0.5px] flex-1" style={{ backgroundColor: colors.silver }} />
              <div className="w-1 h-1 rotate-45" style={{ backgroundColor: colors.gold }} />
              <div className="h-[0.5px] flex-1" style={{ backgroundColor: colors.silver }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
