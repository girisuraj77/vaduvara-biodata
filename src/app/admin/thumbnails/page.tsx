"use client";

import React, { useState, useRef } from "react";
import { TEMPLATE_COMPONENTS } from "@/lib/templates";
import { processedDummyProfiles } from "@/lib/dummy-biodata-list";
import { domToPng } from "modern-screenshot";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ThumbnailGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Dynamically filter template components to avoid duplicate/alias keys (hyphens or legacy aliases)
  // This automatically registers any new templates added to TEMPLATE_COMPONENTS with underscore keys!
  const templates = Object.entries(TEMPLATE_COMPONENTS).filter(([key]) => {
    // 1. Exclude duplicate hyphenated keys (canonical keys use underscore format)
    if (key.includes('-')) return false;
    // 2. Exclude legacy duplicate aliases for existing designs
    if (key === 'trad_maroon' || key === 'simple_leafy') return false;
    return true;
  });

  const generateThumbnails = async () => {
    setIsGenerating(true);
    let successCount = 0;

    try {
      for (const [id] of templates) {
        const element = containerRefs.current[id];
        if (!element) continue;

        // Ensure rendering is complete
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Get dynamic dimensions to match the working preview-step download logic
        const width = element.offsetWidth || 794;
        const height = element.offsetHeight || 1123;

        // Generate high-quality PNG
        const dataUrl = await domToPng(element, {
          scale: 2, // Doubled for high-resolution retina quality
          width,
          height,
          filter: (node: any) => {
            if (node.classList && node.classList.contains('no-print')) return false;
            return true;
          }
        });

        // Send to local API route to save to disk
        const response = await fetch('/api/admin/save-thumbnail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            templateId: id,
            imageData: dataUrl
          }),
        });

        if (response.ok) {
          successCount++;
        } else {
          console.error(`Failed to save thumbnail for ${id}`);
        }
      }
      toast.success(`Successfully generated and saved ${successCount} high-quality thumbnails!`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate thumbnails");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isMounted) {
    return <div className="min-h-screen bg-zinc-100 p-8 flex items-center justify-center font-bold text-zinc-500">Loading Thumbnails Generator...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-sm mb-8">
        <h1 className="text-3xl font-black mb-2">Template Thumbnail Sync</h1>
        <p className="text-zinc-500 mb-6">
          This tool renders all templates with dummy sample details and automatically saves ultra-high-resolution
          screenshots to <code className="bg-zinc-100 px-2 py-1 rounded">public/images/templates/</code>.
        </p>

        <Button
          onClick={generateThumbnails}
          disabled={isGenerating}
          className="h-12 px-8 font-bold text-lg"
        >
          {isGenerating && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          {isGenerating ? "Generating..." : "Generate High-Quality Thumbnails"}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto justify-items-center pb-20">
        {templates.map(([id, TemplateComponent]) => {
          // Use the first English dummy profile for consistency
          const dummyData = processedDummyProfiles.find(p => p.language === 'en') || processedDummyProfiles[0];
          const blankData = { ...dummyData, isBlankDesign: true };

          return (
            <div key={id} className="flex flex-col items-center gap-2">
              <h2 className="font-bold text-xs uppercase tracking-wider text-zinc-600 truncate max-w-[190px]">{id}</h2>
              <div
                className="w-[198px] h-[281px] overflow-hidden shadow-2xl relative border border-zinc-200 rounded-lg bg-white"
              >
                {/* This wrapper handles the 25% scaling purely for visual preview in the admin panel */}
                <div
                  className="w-[794px] h-[1123px] origin-top-left"
                  style={{ transform: 'scale(0.25)' }}
                >
                  {/* This target div has NO scaling or transform classes, ensuring domToPng captures at 100% full scale with zero margins */}
                  <div
                    ref={(el) => {
                      containerRefs.current[id] = el;
                    }}
                    className="w-[794px] h-[1123px] bg-white relative"
                  >
                    <TemplateComponent data={blankData} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
