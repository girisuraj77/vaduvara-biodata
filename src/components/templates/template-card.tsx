"use client";

import React from "react";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/store/builder-store";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Check, Eye, X, ArrowRight } from "lucide-react";
import { TEMPLATE_COMPONENTS } from "@/lib/templates";
import { Modal } from "@/components/ui/modal";
import { processedDummyProfiles } from "@/lib/dummy-biodata-list";

interface TemplateCardProps {
  templateId: string;
  name: string;
  image: string;
  data?: any;
  className?: string;
  isFree?: boolean;
}

export function TemplateCard({ templateId, name, image, data, className, isFree }: TemplateCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const [scale, setScale] = React.useState(0.8);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [cardScale, setCardScale] = React.useState(0.25);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!isPreviewOpen) return;
    const calculateScale = () => {
      const parentWidth = window.innerWidth;
      const maxContainerWidth = Math.min(794, parentWidth - 48); // 48px padding boundary
      const calculated = maxContainerWidth / 794;
      setScale(Math.min(calculated, 1.0));
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, [isPreviewOpen]);

  React.useEffect(() => {
    if (!isMounted || !cardRef.current) return;
    const calculateCardScale = () => {
      if (cardRef.current) {
        const containerWidth = cardRef.current.clientWidth - 20; // Accounts for p-[10px] padding
        setCardScale(containerWidth / 794);
      }
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof window !== "undefined" && "ResizeObserver" in window && cardRef.current) {
      resizeObserver = new ResizeObserver(() => {
        calculateCardScale();
      });
      resizeObserver.observe(cardRef.current);
    }

    window.addEventListener("resize", calculateCardScale);
    calculateCardScale();

    const timer = setTimeout(calculateCardScale, 100);

    return () => {
      window.removeEventListener("resize", calculateCardScale);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      clearTimeout(timer);
    };
  }, [isMounted]);

  const router = useRouter();
  const storeReligion = useBuilderStore((state) => state.religion || "Hindu");
  const storeLanguage = useBuilderStore((state) => state.language);
  const setTemplate = useBuilderStore((state) => state.setTemplate);
  const setReligion = useBuilderStore((state) => state.setReligion);
  const setLanguage = useBuilderStore((state) => state.setLanguage);
  const pathname = usePathname();

  const handleUseTemplate = () => {
    // 1. Set selected template ID in builder store
    setTemplate(templateId);

    // 2. Set language and religion based on current community context
    const { previewLang, previewReligion } = getPreviewContext();
    if (previewLang) {
      setLanguage(previewLang as any);
    }
    if (previewReligion) {
      setReligion(previewReligion);
    }

    // 3. Close preview modal
    setIsPreviewOpen(false);

    // 4. Redirect to builder workspace
    router.push("/builder");
  };

  // Smart context detection based on current URL path for public previews
  const getPreviewContext = () => {
    let previewLang = storeLanguage || "en";
    let previewReligion = storeReligion || "Hindu";

    if (pathname) {
      if (pathname.includes("/marathi")) {
        previewLang = "mr";
        previewReligion = "Hindu";
      } else if (pathname.includes("/gujarati")) {
        previewLang = "gu";
        previewReligion = "Hindu";
      } else if (pathname.includes("/muslim")) {
        previewReligion = "Islam";
      } else if (pathname.includes("/sikh")) {
        previewReligion = "Sikh";
      } else if (pathname.includes("/christian")) {
        previewReligion = "Christian";
      } else if (pathname.includes("/hindu")) {
        previewReligion = "Hindu";
      } else if (pathname === "/" || pathname === "/templates" || pathname.includes("/formats/")) {
        // Force English default on general overview pages to avoid getting stuck on a past builder language
        previewLang = "en";
        previewReligion = "Hindu";
      }
    }

    return { previewLang, previewReligion };
  };

  const cardDummyData = React.useMemo(() => {
    if (data) return data;
    if (!isMounted) return null;

    const path = pathname || "";

    // 1. Determine target gender from path
    let targetGender: "BOY" | "GIRL" | null = null;
    if (path.includes("marriage-biodata-for-boys") || path.includes("-boys")) {
      targetGender = "BOY";
    } else if (path.includes("marriage-biodata-for-girls") || path.includes("-girls")) {
      targetGender = "GIRL";
    }

    // 2. Determine target language from path
    let targetLang = "en";
    if (path.includes("marathi-biodata-format") || path.includes("/marathi")) {
      targetLang = "mr";
    } else if (path.includes("gujarati-matrimonial-profile") || path.includes("/gujarati")) {
      targetLang = "gu";
    } else if (path.includes("/hindi")) {
      targetLang = "hi";
    }

    // 3. Determine target religion from path or template ID
    const isMuslimTemplate = [
      'emerald-paradise', 'emerald_paradise',
      'turquoise-arabesque', 'turquoise_arabesque',
      'midnight-lantern', 'midnight_lantern',
      'sandstone-grace', 'sandstone_grace',
      'imperial-nikah', 'imperial_nikah'
    ].includes(templateId.toLowerCase());

    const isSikhTemplate = [
      'golden-khanda', 'golden_khanda',
      'saffron-glory', 'saffron_glory',
      'anand-karaj', 'anand_karaj',
      'steel-akali', 'steel_akali',
      'punjab-heritage', 'punjab_heritage'
    ].includes(templateId.toLowerCase());

    const isChristianTemplate = [
      'celestial-grace', 'celestial_grace',
      'ivory-chapel', 'ivory_chapel',
      'azure-faith', 'azure_faith',
      'silver-blessing', 'silver_blessing',
      'rose-garden', 'rose_garden'
    ].includes(templateId.toLowerCase());

    let targetReligion = "Hindu";
    if (path.includes("muslim") || isMuslimTemplate) {
      targetReligion = "Islam";
    } else if (path.includes("sikh") || isSikhTemplate) {
      targetReligion = "Sikh";
    } else if (path.includes("christian") || isChristianTemplate) {
      targetReligion = "Christian";
    } else if (path.includes("hindu")) {
      targetReligion = "Hindu";
    }

    const relLower = targetReligion.toLowerCase();
    const isMuslim = ["islam", "इस्लाम"].includes(relLower);
    const isSikh = ["sikh", "सिख"].includes(relLower);
    const isChristian = ["christian", "क्रिश्चियन", "ख्रिश्चन"].includes(relLower);

    // Filter profiles based on parameters
    let filtered = processedDummyProfiles.filter(p => {
      // Religion filter
      const pRel = p.formData.religion?.toLowerCase() || "";
      if (isMuslim) {
        if (!["islam", "इस्लाम"].includes(pRel)) return false;
      } else if (isSikh) {
        if (!["sikh", "सिख"].includes(pRel)) return false;
      } else if (isChristian) {
        if (!["christian", "क्रिश्चियन", "ख्रिश्चन"].includes(pRel)) return false;
      } else {
        if (["islam", "इस्लाम", "sikh", "सिख", "christian", "क्रिश्चियन", "ख्रिश्चन"].includes(pRel)) return false;
      }

      // Gender filter
      const isFemale = p.photo?.includes("woman") || false;
      const isMale = !isFemale && (p.photo?.includes("man") || false);
      if (targetGender === "BOY" && !isMale) return false;
      if (targetGender === "GIRL" && !isFemale) return false;

      return true;
    });

    // Try matching language if possible
    let langFiltered = filtered.filter(p => p.language === targetLang);
    if (langFiltered.length > 0) {
      filtered = langFiltered;
    } else {
      // Fallback to English if target language not found for this segment
      let enFiltered = filtered.filter(p => p.language === "en");
      if (enFiltered.length > 0) {
        filtered = enFiltered;
      }
    }

    if (filtered.length > 0) {
      return filtered[0];
    }

    return processedDummyProfiles[0];
  }, [data, isMounted, pathname, templateId]);

  const handleOpenPreview = () => {
    setIsPreviewOpen(true);
  };

  return (
    <>
      <div
        ref={cardRef}
        onClick={handleOpenPreview}
        className={cn(
          "group relative bg-white rounded-xl overflow-hidden border border-zinc-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer select-none",
          className
        )}
      >
        {/* Preview Area */}
        <div className="aspect-[3/4] relative bg-white p-[10px] overflow-hidden">
          <div className="relative w-full h-full overflow-hidden rounded-lg bg-zinc-50 flex items-center justify-center">
            {isMounted && TEMPLATE_COMPONENTS[templateId] ? (
              <div
                className="text-left text-zinc-800"
                style={{
                  width: "794px",
                  height: "1123px",
                  transform: `scale(${cardScale})`,
                  transformOrigin: "top left",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  textAlign: "left"
                }}
              >
                {React.createElement(TEMPLATE_COMPONENTS[templateId], { data: cardDummyData })}
              </div>
            ) : (
              <NextImage
                src={image || "/templates/placeholder.jpg"}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="transition-transform duration-500 group-hover:scale-105 object-contain"
              />
            )}

            {/* Free Tier Badge (Premium Badge Removed) */}
            {isFree && (
              <span className="absolute top-3 right-3 px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg shadow-md z-10 transition-transform group-hover:scale-105 duration-300 bg-emerald-500 text-white">
                Free
              </span>
            )}

            {/* Premium Subtle Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 bg-white/95 text-zinc-900 font-black uppercase text-[10px] tracking-widest px-4 py-2 rounded-full shadow-lg transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                View Design
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 border-t bg-zinc-50/50 text-center">
          <h3 className="font-black text-zinc-800 text-sm truncate uppercase tracking-tight w-full">{name}</h3>
        </div>
      </div>

      {/* Template Preview Modal - Only render after mount to prevent hydration mismatch */}
      {isMounted && (
        <Modal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          title={`${name} - Full Preview`}
          className="max-w-[850px] w-full"
        >
          <div className="flex justify-center bg-zinc-50 w-full overflow-hidden pt-2 pb-10 px-4 items-center">
            <div
              className="relative bg-white shadow-lg origin-top transition-transform mt-1 mb-8 shrink-0 border border-zinc-200"
              style={{
                width: `${794 * scale}px`,
                height: `${1123 * scale}px`,
              }}
            >
              <div
                style={{
                  width: "794px",
                  height: "1123px",
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                  position: "absolute",
                  left: 0,
                  top: 0
                }}
              >
                {isPreviewOpen && (TEMPLATE_COMPONENTS[templateId] ? (
                  React.createElement(TEMPLATE_COMPONENTS[templateId], { data: cardDummyData })
                ) : (
                  <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-4xl font-black">
                    TEMPLATE NOT FOUND
                  </div>
                ))}
              </div>
              {/* Watermark for preview */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden flex flex-col items-center justify-around opacity-[0.12] z-[100] select-none">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="text-[35px] font-black text-black rotate-[-45deg] whitespace-nowrap tracking-[0.3em] uppercase">
                    vadhuvarbiodata.com
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Sticky Action Footer */}
          <div className="sticky bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-zinc-100 p-4 px-6 flex items-center justify-between gap-4 z-[200]">
            <div className="text-left hidden sm:block">
              <p className="font-extrabold text-zinc-900 text-sm">{name}</p>
              <p className="text-zinc-500 text-xs font-semibold">Ready to build your matrimonial biodata?</p>
            </div>
            <Button
              onClick={handleUseTemplate}
              className="w-full sm:w-auto ml-auto rounded-xl px-8 h-12 font-black bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-xl shadow-secondary/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Use This Template <ArrowRight size={18} />
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
