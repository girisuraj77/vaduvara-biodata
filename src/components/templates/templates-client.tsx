"use client";

import { useState, useEffect } from "react";
import { TemplateCard } from "@/components/templates/template-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const ITEMS_PER_PAGE = 50;
const COMMUNITIES = ["All", "Hindu", "Muslim", "Christian", "Sikh"];

interface TemplatesClientProps {
  initialTemplates: any[];
}

export function TemplatesClient({ initialTemplates }: TemplatesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dbTemplates, setDbTemplates] = useState<any[]>(initialTemplates || []);
  const [selectedCommunity, setSelectedCommunity] = useState("All");

  useEffect(() => {
    if (dbTemplates.length === 0) {
      const fetchTemplates = async () => {
        try {
          const res = await fetch('/api/templates');
          const data = await res.json();
          if (Array.isArray(data)) setDbTemplates(data);
        } catch (err) {
          console.error("Templates fetch failed", err);
        }
      };
      fetchTemplates();
    }
  }, [dbTemplates.length]);

  // Dynamic count calculator
  const getCommunityCount = (community: string) => {
    if (community === "All") return dbTemplates.length;
    return dbTemplates.filter((t) => {
      if (!t.community) return community === "Hindu"; // Fallback to Hindu
      const communities = t.community.split(",").map((c: string) => c.trim().toLowerCase());
      return communities.includes(community.toLowerCase());
    }).length;
  };

  // Filter templates based on community basis
  const filteredTemplates = dbTemplates.filter((t) => {
    if (selectedCommunity === "All") return true;
    if (!t.community) return selectedCommunity === "Hindu"; // Fallback to Hindu
    const communities = t.community.split(",").map((c: string) => c.trim().toLowerCase());
    return communities.includes(selectedCommunity.toLowerCase());
  });

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTemplates = filteredTemplates.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCommunityChange = (community: string) => {
    setSelectedCommunity(community);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden bg-[#430917]/5 text-zinc-900 border-b border-primary/5">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Sparkles size={12} /> Design Collection
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight animate-in fade-in duration-500">
              Premium <span className="text-primary italic">Biodata Templates</span>
            </h1>
            <p className="text-zinc-500 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Choose from 50+ elegant, professionally designed templates in multiple languages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-zinc-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
            <div>
              <h2 className="text-2xl font-black text-zinc-900 mb-1 uppercase tracking-tight">Browse Designs</h2>
              <p className="text-zinc-400 font-bold text-sm">Find the perfect format for your special presentation.</p>
            </div>
            <Link href="/">
              <Button variant="outline" className="rounded-full px-8 font-black border-zinc-200 hover:bg-white transition-all cursor-pointer">
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Community Filter Tabs */}
          <div className="flex overflow-x-auto pb-4 mb-10 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none gap-2 items-center">
            {COMMUNITIES.map((community) => {
              const isActive = selectedCommunity === community;
              const count = getCommunityCount(community);
              return (
                <button
                  key={community}
                  onClick={() => handleCommunityChange(community)}
                  className={`
                    relative shrink-0 rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-300 select-none cursor-pointer
                    ${isActive
                      ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/10 scale-105"
                      : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-400 hover:text-zinc-900"
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {community === "All" ? "All Designs" : community}
                    <span className={`
                      text-[9px] font-bold rounded-full px-1.5 py-0.5
                      ${isActive ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500"}
                    `}>
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {currentTemplates.map((template) => (
              <TemplateCard
                key={template.templateId || template.id}
                templateId={template.templateId || template.id}
                name={template.name}
                image={template.image || template.img}
                isFree={template.isFree}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="rounded-full border-zinc-200 bg-white cursor-pointer"
              >
                <ChevronLeft size={20} />
              </Button>
              <span className="font-black text-sm uppercase tracking-widest text-zinc-500">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="rounded-full border-zinc-200 bg-white cursor-pointer"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
