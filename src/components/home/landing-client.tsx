"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Languages, ShieldCheck, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { TemplateCard } from "@/components/templates/template-card";
import dynamic from "next/dynamic";

const HowItWorks = dynamic(() => import("@/components/home/how-it-works").then((mod) => mod.HowItWorks));
const FeaturesSection = dynamic(() => import("@/components/home/features-section").then((mod) => mod.FeaturesSection));
const BlogSection = dynamic(() => import("@/components/home/blog-section").then((mod) => mod.BlogSection));
const FAQSection = dynamic(() => import("@/components/home/faq-section").then((mod) => mod.FAQSection));
const CTASection = dynamic(() => import("@/components/home/cta-section").then((mod) => mod.CTASection));

const BuilderContainer = dynamic(
  () => import("@/components/builder/builder-container").then((mod) => mod.BuilderContainer),
  { ssr: false }
);

interface LandingClientProps {
  initialTemplates: any[];
}

export function LandingClient({ initialTemplates }: LandingClientProps) {
  const [templates, setTemplates] = useState<any[]>(initialTemplates || []);

  useEffect(() => {
    if (templates.length === 0) {
      const fetchTemplates = async () => {
        try {
          const res = await fetch('/api/templates?homepage=true');
          const data = await res.json();
          if (Array.isArray(data)) setTemplates(data);
        } catch (err) {
          console.error("Templates fetch failed", err);
        }
      };
      fetchTemplates();
    }
  }, [templates.length]);

  useEffect(() => {
    if (window.location.hash === "#create-biodata") {
      setTimeout(() => {
        const element = document.getElementById("create-biodata");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, []);

  const displayedTemplates = templates.slice(0, 10);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section id="hero-section" className="relative overflow-hidden pt-24 pb-28 bg-gradient-to-b from-white via-zinc-50/30 to-white">
        {/* Subtle, premium gold & chocolate background glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#CFA132]/10 via-transparent to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#430917]/5 via-transparent to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Subtle dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#8080800b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none -z-20" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl text-left animate-in fade-in slide-in-from-left-8 duration-700 order-2 lg:order-1">
            {/* Trust Badge Banner */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
              <Sparkles size={12} className="text-[#CFA132] animate-pulse" /> Loved by 4,000+ brides & grooms this month
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-zinc-900 leading-[1.05]">
              Create Your <span className="text-[#CFA132] italic">Free</span> & Premium <br />
              <span className="bg-gradient-to-r from-primary via-[#8c233c] to-[#CFA132] bg-clip-text text-transparent pr-2">
                Matrimonial Biodata
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-500 mb-10 leading-relaxed max-w-xl font-medium">
              Create your marriage biodata for free with our easy-to-use builder. Choose from beautiful free styles or unlock premium Chocolate & Gold layouts for instant download in PDF or editable Word document format.
            </p>

            <div className="flex flex-row gap-4 w-full max-w-md mb-10">
              <div className="flex-1 transition-transform duration-200 hover:scale-105 active:scale-95">
                <Link href="#create-biodata" className="w-full">
                  <Button size="lg" className="w-full rounded-xl text-xs sm:text-base px-2 sm:px-8 py-6 sm:py-7 bg-primary hover:bg-primary/95 text-white font-black uppercase tracking-wider shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer truncate border-none">
                    Create Biodata
                  </Button>
                </Link>
              </div>
              <div className="flex-1 transition-transform duration-200 hover:scale-105 active:scale-95">
                <Link href="#templates" className="w-full">
                  <Button size="lg" variant="outline" className="w-full rounded-xl text-xs sm:text-base px-2 sm:px-8 py-6 sm:py-7 border-2 border-primary text-primary hover:bg-primary/5 font-black uppercase tracking-wider cursor-pointer transition-all truncate">
                    View Templates
                  </Button>
                </Link>
              </div>
            </div>

            {/* Premium Trust Vectors */}
            <div className="grid grid-cols-2 sm:flex items-center gap-x-8 gap-y-6 pt-8 border-t border-zinc-100 text-[11px] font-black text-zinc-500 uppercase tracking-widest">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white border-2 border-zinc-100 text-primary shadow-sm">
                  <Languages size={16} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-zinc-800 text-[13px] font-black leading-none">8+ Languages</span>
                  <span className="text-[10px] opacity-75 font-bold leading-none lowercase">Marathi, Hindi, English...</span>
                </div>
              </div>

              <div className="hidden sm:block w-px h-8 bg-zinc-200"></div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white border-2 border-zinc-100 text-primary shadow-sm">
                  <ShieldCheck size={16} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-zinc-800 text-[13px] font-black leading-none">100% Private</span>
                  <span className="text-[10px] opacity-75 font-bold leading-none lowercase">Stored locally in browser</span>
                </div>
              </div>

              <div className="hidden sm:block w-px h-8 bg-zinc-200"></div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white border-2 border-zinc-100 text-primary shadow-sm">
                  <Download size={16} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-zinc-800 text-[13px] font-black leading-none">Instant Download</span>
                  <span className="text-[10px] opacity-75 font-bold leading-none lowercase">High-quality vector exports</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floater Stack Visual */}
          <div className="relative aspect-auto flex justify-center w-full animate-float select-none order-1 lg:order-2">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-[#CFA132]/10 to-transparent scale-150 blur-3xl opacity-50 rounded-full" />
            <Image
              src="/mockups/marathi_biodata_stack.webp"
              alt="Marathi and Multi-language Marriage Biodata Formats"
              width={600}
              height={700}
              className="relative z-10 drop-shadow-[0_20px_50px_rgba(67,9,23,0.18)] rounded-[2rem] w-full max-w-md lg:max-w-xl object-contain animate-in fade-in duration-500"
              priority
            />
          </div>

        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-10 sm:py-16 bg-zinc-50 border-t border-b border-zinc-100">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10">
            Free & Premium Collection
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-6 mb-3 text-zinc-900 tracking-tight">Free & Premium Templates</h2>
          <p className="text-zinc-400 font-bold text-sm max-w-xl mx-auto">
            Browse our hand-picked selection of top-tier marriage biodata formats designed for standard, elegant printing.
          </p>

          <div className="flex sm:grid sm:flex-wrap overflow-x-auto sm:overflow-visible gap-4 md:gap-6 mt-6 sm:mt-10 w-full snap-x no-scrollbar px-4 sm:px-0 -mx-4 sm:mx-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {displayedTemplates.map((template) => (
              <div key={template.templateId} className="shrink-0 w-[160px] sm:w-auto">
                <TemplateCard templateId={template.templateId} name={template.name} image={template.image} isFree={template.isFree} />
              </div>
            ))}
            {displayedTemplates.length === 0 && [...Array(10)].map((_, i) => (
              <div key={i} className="snap-center shrink-0 w-[160px] sm:w-auto aspect-[3/4] bg-zinc-200/60 animate-pulse rounded-2xl border border-zinc-100" />
            ))}
          </div>


          <div className="mt-8 sm:mt-12 flex flex-col items-center">
            <Link href="/templates">
              <Button size="lg" variant="outline" className="rounded-full h-12 px-10 font-bold border-zinc-300 text-zinc-700 hover:text-zinc-900 hover:bg-white transition-all active:scale-95 cursor-pointer shadow-sm">
                View All Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Builder Section */}
      <section id="create-biodata" className="scroll-mt-20 bg-[#f5eaec]/5">
        <BuilderContainer />
      </section>

      <HowItWorks />

      <FeaturesSection />

      <BlogSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
