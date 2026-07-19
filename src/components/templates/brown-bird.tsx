"use client";

import React from "react";
import { useTemplateData, getTemplateData } from "@/hooks/use-template-data";

export function BrownBird({ data: externalData }: { data?: any }) {
    const storeData = useTemplateData();
    const {
        shloka,
        stepHeadings,
        profilePhotoUrl,
        personalFields,
        familyFields,
        contactFields,
        godPhotoId,
        biodataTitle,
        t,
    } = externalData ? getTemplateData(externalData, "Hindu") : storeData;

    const isBlankDesign = externalData?.isBlankDesign || false;

    const colors = {
        bg: "#7A2800",
        outerBorder: "#C8981A",
        innerBorder: "#E8B830",
        gold: "#FFD070",
        brightGold: "#FFE590",
        cream: "#FFF3CC",
        patternGold: "#D4A017",
    };

    const DiamondIcon = () => (
        <svg width="10" height="10" viewBox="0 0 10 10">
            <polygon points="5,0 10,5 5,10 0,5" fill={colors.gold} />
        </svg>
    );

    const FieldRow = ({ label, value }: { label: string; value: string }) => (
        <div className="grid items-start pb-0.5" style={{ gridTemplateColumns: "148px 10px 1fr", gap: "0 8px" }}>
            <span className="text-[13px] font-semibold leading-snug" style={{ color: colors.cream }}>
                {label}
            </span>
            <span className="text-[13px]" style={{ color: colors.gold }}>:</span>
            <span className="text-[13px] font-medium leading-snug break-words" style={{ color: "#FFFFFF" }}>
                {value}
            </span>
        </div>
    );

    const SectionHeading = ({ children }: { children: React.ReactNode }) => (
        <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.outerBorder }} />
            <DiamondIcon />
            <span className="text-[13.5px] font-bold tracking-widest uppercase px-1" style={{ color: colors.brightGold }}>
                {children}
            </span>
            <DiamondIcon />
            <div className="flex-1 h-px opacity-30" style={{ backgroundColor: colors.outerBorder }} />
        </div>
    );

    const BorderPattern = () => {
        const W = 794, H = 1123, m = 18, im = 30, s = 7 / 2, sp = 13;

        const makeDiamonds = (x1: number, y1: number, x2: number, y2: number, axis: "h" | "v") => {
            const len = axis === "h" ? Math.abs(x2 - x1) : Math.abs(y2 - y1);
            const count = Math.floor(len / sp);
            return Array.from({ length: count + 1 }, (_, i) => {
                const t = count === 0 ? 0 : i / count;
                const cx = axis === "h" ? x1 + (x2 - x1) * t : x1;
                const cy = axis === "v" ? y1 + (y2 - y1) * t : y1;
                return (
                    <polygon key={i}
                        points={`${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`}
                        fill={colors.patternGold} />
                );
            });
        };

        return (
            <svg className="absolute inset-0 pointer-events-none z-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
                <rect x={m} y={m} width={W - m * 2} height={H - m * 2} fill="none" stroke={colors.outerBorder} strokeWidth="3" />
                <rect x={im} y={im} width={W - im * 2} height={H - im * 2} fill="none" stroke={colors.innerBorder} strokeWidth="1" opacity="0.7" />
                <rect x={m + 5} y={m + 5} width={W - m * 2 - 10} height={H - m * 2 - 10} fill="none" stroke={colors.gold} strokeWidth="0.5" opacity="0.4" />

                {makeDiamonds(m + 14, m + 6, W - m - 14, m + 6, "h")}
                {makeDiamonds(m + 14, H - m - 6, W - m - 14, H - m - 6, "h")}
                {makeDiamonds(m + 6, m + 14, m + 6, H - m - 14, "v")}
                {makeDiamonds(W - m - 6, m + 14, W - m - 6, H - m - 14, "v")}

                {[
                    [m, m], [W - m, m], [m, H - m], [W - m, H - m],
                ].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="5" fill={colors.outerBorder} />)}

                <polygon points={`${m},${m + 28} ${m + 28},${m} ${m + 5},${m} ${m},${m + 5}`} fill={colors.gold} opacity="0.6" />
                <polygon points={`${W - m},${m + 28} ${W - m - 28},${m} ${W - m - 5},${m} ${W - m},${m + 5}`} fill={colors.gold} opacity="0.6" />
                <polygon points={`${m},${H - m - 28} ${m + 28},${H - m} ${m + 5},${H - m} ${m},${H - m - 5}`} fill={colors.gold} opacity="0.6" />
                <polygon points={`${W - m},${H - m - 28} ${W - m - 28},${H - m} ${W - m - 5},${H - m} ${W - m},${H - m - 5}`} fill={colors.gold} opacity="0.6" />
            </svg>
        );
    };

    return (
        <div
            id="biodata-template"
            className="w-[794px] min-h-[1123px] h-auto relative overflow-hidden flex flex-col px-16 pt-12 pb-16 shrink-0"
            style={{
                backgroundColor: colors.bg,
                fontFamily: "'Noto Sans Devanagari', 'Mangal', sans-serif",
                backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(200,152,26,0.12) 0%, transparent 60%),
                          radial-gradient(ellipse at 50% 100%, rgba(200,152,26,0.10) 0%, transparent 60%)`,
            }}
        >
            {/* 1. BORDER LAYER */}
            <BorderPattern />

            {/* 2. CONTENT AREA */}
            {!isBlankDesign && (
                <div className="relative z-10 flex flex-col flex-1 gap-4">

                    {/* Header */}
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-2">
                            <img
                                src={`/images/gods/${godPhotoId || "god-1"}.png`}
                                className="h-18 w-18 object-contain drop-shadow-md"
                                alt="God Symbol"
                            />
                        </div>
                        <p className="text-[14px] font-bold tracking-[0.35em] mb-3 uppercase" style={{ color: colors.brightGold }}>
                            {shloka}
                        </p>
                        <div className="flex items-center gap-3 w-full mb-2">
                            <div className="flex-1 h-px" style={{ backgroundColor: colors.outerBorder }} />
                            <DiamondIcon /><DiamondIcon /><DiamondIcon />
                            <div className="flex-1 h-px" style={{ backgroundColor: colors.outerBorder }} />
                        </div>
                        <h1 className="text-xl font-black tracking-[0.2em] mb-2" style={{ color: colors.brightGold }}>
                            {biodataTitle || t.biodataTitleDefault}
                        </h1>
                        {/* <div className="h-0.5 w-28 rounded-full" style={{ backgroundColor: colors.outerBorder }} /> */}
                    </div>

                    {/* Section 1: Personal + Photo */}
                    {personalFields.length > 0 && (
                        <div>
                            <SectionHeading>{stepHeadings[1] || "वैयक्तिक माहिती"}</SectionHeading>
                            <div className="flex gap-4 px-2 items-start">
                                <div className="flex-1 grid grid-cols-1">
                                    {personalFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                                </div>
                                {profilePhotoUrl && (
                                    <div className="shrink-0">
                                        <div className="p-1.5 relative" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                                            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: colors.brightGold }} />
                                            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: colors.brightGold }} />
                                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: colors.brightGold }} />
                                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: colors.brightGold }} />
                                            <div className="w-[120px] h-[148px] overflow-hidden border" style={{ borderColor: colors.outerBorder + "55" }}>
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
                        <div>
                            <SectionHeading>{stepHeadings[2] || "कौटुंबिक माहिती"}</SectionHeading>
                            <div className="grid grid-cols-1 px-2">
                                {familyFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                            </div>
                        </div>
                    )}

                    {/* Section 3: Contact */}
                    {contactFields.length > 0 && (
                        <div>
                            <SectionHeading>{stepHeadings[3] || t.contactDetails}</SectionHeading>
                            <div className="grid grid-cols-1 px-2">
                                {contactFields.map((f: any) => <FieldRow key={f.id} label={f.label} value={f.value} />)}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="mt-auto pt-6 flex items-center gap-3 opacity-40">
                        <div className="flex-1 h-px" style={{ backgroundColor: colors.gold }} />
                        <DiamondIcon /><DiamondIcon /><DiamondIcon />
                        <div className="flex-1 h-px" style={{ backgroundColor: colors.gold }} />
                    </div>

                </div>
            )}
        </div>
    );
}