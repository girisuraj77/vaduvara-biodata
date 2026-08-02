"use client";

import React, { useState, useRef } from "react";
import { TEMPLATE_COMPONENTS } from "@/lib/templates";
import { processedDummyProfiles } from "@/lib/dummy-biodata-list";
import { domToPng } from "modern-screenshot";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Search, Sparkles, Image as ImageIcon, AlertTriangle, X } from "lucide-react";

export default function ThumbnailGenerator() {
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const containerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Dynamically filter template components to avoid duplicate/alias keys (hyphens or legacy aliases)
  // Canonical keys use underscore format
  const templates = Object.entries(TEMPLATE_COMPONENTS).filter(([key]) => {
    // 1. Exclude duplicate hyphenated keys
    if (key.includes('-')) return false;
    // 2. Exclude legacy duplicate aliases for existing designs
    if (key === 'trad_maroon' || key === 'simple_leafy') return false;
    return true;
  });

  const filteredTemplates = templates.filter(([id]) =>
    id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate thumbnail for a single specific template ID
  const generateSingleThumbnail = async (id: string) => {
    const element = containerRefs.current[id];
    if (!element) {
      toast.error(`Template element for ${id} not found`);
      return;
    }

    setGeneratingId(id);
    try {
      // Ensure rendering is complete
      await new Promise((resolve) => setTimeout(resolve, 500));

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
        toast.success(`Successfully saved thumbnail for ${id}!`);
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(`Failed to save thumbnail for ${id}: ${errorData.error || 'Server error'}`);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(`Error generating thumbnail for ${id}: ${error.message || error}`);
    } finally {
      setGeneratingId(null);
    }
  };

  // Execution function for generating thumbnails for all filtered templates
  const executeGenerateAll = async () => {
    setShowConfirmModal(false);
    setIsGeneratingAll(true);
    let successCount = 0;

    try {
      for (const [id] of filteredTemplates) {
        const element = containerRefs.current[id];
        if (!element) continue;

        setGeneratingId(id);
        await new Promise((resolve) => setTimeout(resolve, 500));

        const width = element.offsetWidth || 794;
        const height = element.offsetHeight || 1123;

        const dataUrl = await domToPng(element, {
          scale: 2,
          width,
          height,
          filter: (node: any) => {
            if (node.classList && node.classList.contains('no-print')) return false;
            return true;
          }
        });

        const response = await fetch('/api/admin/save-thumbnail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            templateId: id,
            imageData: dataUrl
          }),
        });

        if (response.ok) {
          successCount++;
        }
      }
      toast.success(`Generated and saved ${successCount} thumbnails!`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate thumbnails");
    } finally {
      setIsGeneratingAll(false);
      setGeneratingId(null);
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-zinc-100 p-8 flex items-center justify-center font-bold text-zinc-500">
        Loading Thumbnail Generator...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 p-8 relative">
      {/* ── MODAL POPUP CONFIRMATION ── */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 text-amber-600">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-zinc-900 leading-tight">Regenerate All Thumbnails?</h3>
                <p className="text-xs text-zinc-500 font-semibold mt-0.5">Confirmation Required</p>
              </div>
            </div>

            <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
              Are you sure you want to regenerate thumbnails for <strong className="text-zinc-900 font-bold">{filteredTemplates.length} templates</strong>?
              This will overwrite the existing thumbnail image files stored in your local directory <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-amber-800 text-xs font-mono">public/images/templates/</code>.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-100">
              <Button
                variant="outline"
                onClick={() => setShowConfirmModal(false)}
                className="rounded-xl px-5 font-bold border-zinc-200 hover:bg-zinc-100"
              >
                Cancel
              </Button>
              <Button
                onClick={executeGenerateAll}
                className="rounded-xl px-5 font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/20"
              >
                Yes, Regenerate All
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Header Container */}
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b pb-6">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
              <ImageIcon className="text-amber-600" /> Template Thumbnail Generator
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              Generate ultra-high-resolution thumbnails locally for individual new templates or all templates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowConfirmModal(true)}
              disabled={isGeneratingAll || !!generatingId}
              variant="outline"
              className="h-11 px-5 font-bold text-sm border-zinc-300 hover:bg-zinc-50 text-zinc-800"
            >
              {isGeneratingAll && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate All ({filteredTemplates.length})
            </Button>
          </div>
        </div>

        {/* Individual Template Selection Control */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-zinc-50 p-4 rounded-xl border border-zinc-200">
          <div className="md:col-span-6 flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-zinc-200">
            <Search className="w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search template ID (e.g. regal_gold_frame)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="w-full h-10 px-3 text-sm rounded-lg border border-zinc-200 bg-white font-medium outline-none"
            >
              <option value="">-- Select Specific Template --</option>
              {templates.map(([id]) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <Button
              onClick={() => selectedTemplateId && generateSingleThumbnail(selectedTemplateId)}
              disabled={!selectedTemplateId || !!generatingId}
              className="w-full h-10 font-bold bg-amber-600 hover:bg-amber-700 text-white"
            >
              {generatingId === selectedTemplateId ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Generate Selected"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Grid of Templates with Individual Single-Generate Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto justify-items-center pb-20">
        {filteredTemplates.map(([id, TemplateComponent]) => {
          const dummyData = processedDummyProfiles.find(p => p.language === 'en') || processedDummyProfiles[0];
          const blankData = { ...dummyData, isBlankDesign: true };
          const isThisGenerating = generatingId === id;

          return (
            <div key={id} className="flex flex-col items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-zinc-200 w-[230px]">
              <div className="flex items-center justify-between w-full px-1">
                <h2 className="font-bold text-xs uppercase tracking-wider text-zinc-700 truncate max-w-[140px]" title={id}>
                  {id}
                </h2>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => generateSingleThumbnail(id)}
                  disabled={!!generatingId}
                  className="h-7 px-2.5 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/60 rounded-md"
                >
                  {isThisGenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : "Generate"}
                </Button>
              </div>

              <div className="w-[198px] h-[281px] overflow-hidden shadow-md relative border border-zinc-200 rounded-lg bg-white group">
                <div
                  className="w-[794px] h-[1123px] origin-top-left"
                  style={{ transform: 'scale(0.25)' }}
                >
                  <div
                    ref={(el) => {
                      containerRefs.current[id] = el;
                    }}
                    className="w-[794px] h-[1123px] bg-white relative"
                  >
                    <TemplateComponent data={blankData} />
                  </div>
                </div>

                {isThisGenerating && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center flex-col gap-2">
                    <Loader2 className="h-6 w-6 text-amber-600 animate-spin" />
                    <span className="text-xs font-bold text-zinc-700">Generating PNG...</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
