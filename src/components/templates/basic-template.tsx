"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";
import { cn } from "@/lib/utils";

export function BasicTemplate({ data: externalData }: { data?: any }) {
  const storeData = useTemplateData();
  const {
    formData,
    shloka,
    stepHeadings,
    profilePhotoUrl,
    fieldSettings,
    personalFields,
    familyFields,
    contactFields,
    biodataTitle,
    godPhotoId,
    t
  } = externalData ? getTemplateData(externalData, "Hindu") : storeData;

  const isBlankDesign = externalData?.isBlankDesign || false;

  // Premium Gold Palette
  const goldPrimary = "#996515";
  const goldAccent = "#d4af37";

  // Helper to check if a field should be shown
  const shouldShow = (id: string) => {
    return (fieldSettings[id]?.include ?? true) && !!formData[id];
  };

  // Helper to render a field row - Updated for Multi-line support
  const FieldRow = ({ label, value }: { label: string, value: string }) => (
    <div className="grid grid-cols-[160px_1fr] gap-x-4 border-b border-zinc-50 pb-0.5 items-start">
      <div className="text-[10px] font-black uppercase tracking-wider opacity-60 mt-0.5">
        {label}:
      </div>
      <div className="text-[13px] font-bold leading-tight break-words">
        {value}
      </div>
    </div>
  );

  return (
    <div
      id="biodata-template"
      className="w-[794px] h-[1123px] relative overflow-hidden bg-white flex flex-col px-20 pt-16 pb-14 shrink-0"
      style={{ color: goldPrimary }}
    >
      {/* 1. Simple Golden Border */}
      <div
        className="absolute inset-0 border-[2px] m-6 pointer-events-none z-0"
        style={{ borderColor: goldAccent }}
      />
      <div
        className="absolute inset-0 border-[1px] m-10 pointer-events-none z-0 opacity-50"
        style={{ borderColor: goldAccent }}
      />

      {/* Photo moved to Section 1 flex wrapper */}
      {!isBlankDesign && (
        <div className="relative z-10 flex flex-col h-full">

          {/* Header Section - Perfectly Centered */}
          <div className="flex flex-col items-center mb-2 text-center">
            <div className="mb-2">
              <img
                src={`/images/gods/${godPhotoId || 'god-1'}.png`}
                alt="Ganesha"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="text-[10px] font-black tracking-[0.4em] uppercase mb-1 opacity-70">
              {shloka}
            </div>
            <h1
              className="text-3xl font-black tracking-[0.2em] uppercase border-b-2 pb-1"
              style={{ color: goldPrimary, borderColor: goldAccent }}
            >
              {biodataTitle || t.biodataTitleDefault}
            </h1>
          </div>

          {/* Main Body - Optimized for Total Visibility */}
          <div className="flex flex-col gap-4 flex-1 min-h-0 pb-10">

            {/* Section 1: Personal with Photo on Right */}
            {personalFields.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-black uppercase tracking-widest border-b pb-0.5" style={{ borderColor: goldAccent }}>
                  {stepHeadings[1] || t.personalDetails}
                </h2>

                <div className="flex gap-6 px-2 items-start">
                  {/* Fields List */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    {personalFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                  </div>

                  {/* Profile Photo */}
                  {profilePhotoUrl && (
                    <div className="shrink-0 mt-1">
                      <div className="w-[120px] h-[150px] bg-white border-2 p-1 shadow-md relative z-10" style={{ borderColor: goldAccent }}>
                        <div className="w-full h-full overflow-hidden">
                          <img src={profilePhotoUrl} className="w-full h-full object-cover" alt="Profile" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section 2: Family */}
            {familyFields.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-black uppercase tracking-widest border-b pb-0.5" style={{ borderColor: goldAccent }}>
                  {stepHeadings[2] || t.familyDetails}
                </h2>
                <div className="flex flex-col gap-1.5 px-2">
                  {familyFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                </div>
              </div>
            )}

            {/* Section 3: Contact */}
            {contactFields.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-black uppercase tracking-widest border-b pb-0.5" style={{ borderColor: goldAccent }}>
                  {stepHeadings[3] || t.contactDetails}
                </h2>
                <div className="flex flex-col gap-1 px-2">
                  {contactFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="mt-auto pt-6 text-center opacity-40">
            <div className="h-px w-24 mx-auto mb-2" style={{ backgroundColor: goldAccent }} />
            {/* Branding removed */}
          </div>
        </div>
      )}
    </div>
  );
}
