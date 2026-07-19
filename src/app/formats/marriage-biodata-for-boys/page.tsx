import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, BookOpen } from "lucide-react";
import { TemplateCard } from "@/components/templates/template-card";
import { prisma } from "@/lib/prisma";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Sparkles, Info } from "lucide-react";


export const metadata: Metadata = {
  title: "Free Marriage Biodata for Boys - Maker & PDF Formats",
  description: "Create a professional marriage biodata for boys for 100% free. Choose from 50+ elegant premium groom templates. Fast free PDF download and secure sharing.",
  keywords: ["free marriage biodata for boys", "free groom biodata format", "free matrimonial profile for boys", "marriage biodata format boys pdf free"],
  alternates: {
    canonical: "/formats/marriage-biodata-for-boys",
  },
  openGraph: {
    title: "Free Marriage Biodata for Boys - Maker & PDF Formats",
    description: "Create a professional marriage biodata for boys for 100% free. Elegant designs designed specifically for grooms.",
    url: "https://vadhuvarbiodata.com/formats/marriage-biodata-for-boys",
    siteName: "Vadhuvar Biodata",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Marriage Biodata for Boys - Vadhuvar Biodata",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Marriage Biodata for Boys - Maker & PDF Formats",
    description: "Create a professional marriage biodata for boys for 100% free.",
    images: ["/og-image.png"],
  },
};

export default async function BoysFormatPage() {
  const templates = await prisma.template.findMany({
    where: { isActive: true },
    select: {
      id: true,
      templateId: true,
      name: true,
      image: true,
      isFree: true,
    },
    orderBy: { order: 'asc' }
  });

  return (
    <main className="min-h-screen bg-white">
      {/* Blogs-Style Hero Section - Light Blue Tint */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-blue-500/5 border-b border-blue-500/10">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <BookOpen size={12} /> Free Groom Guide
          </div>
          <h1 className="text-3xl md:text-3xl lg:text-5xl font-black mb-6 leading-tight tracking-tight text-zinc-900">
            Free Marriage Biodata <span className="text-blue-600 italic">for Boys</span>
          </h1>
          <p className="text-zinc-500 text-md md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            100% Free professional and formal templates designed specifically for grooms. 
            Create a stunning groom matrimonial profile in minutes and download a free PDF.
          </p>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2 tracking-tight">Groom Templates</h2>
              <p className="text-zinc-500 font-medium">Choose from our collection of formal and modern designs.</p>
            </div>
            <Link href="/templates">
              <Button variant="outline" className="rounded-xl font-black h-12 px-8 border-zinc-200 hover:bg-zinc-50 transition-all shadow-sm">View All Designs</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {templates.map((template) => (
              <TemplateCard 
                key={template.id} 
                templateId={template.templateId} 
                name={template.name} 
                image={template.image} 
                isFree={template.isFree}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="py-24 bg-zinc-50/30">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="space-y-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-6 tracking-tight">
                  Strength & <span className="text-blue-600 italic">Professionalism</span>
                </h2>
                <p className="text-zinc-500 text-lg font-medium leading-relaxed mb-8">
                  Our templates for boys focus on professional achievements, educational pedigree, and clear family background to help you find the right match.
                </p>
                <div className="grid gap-4">
                  <div className="flex items-center gap-3 text-zinc-600 font-bold">
                    <Star size={18} className="text-blue-500" fill="currentColor" /> Formal Designs
                  </div>
                  <div className="flex items-center gap-3 text-zinc-600 font-bold">
                    <Star size={18} className="text-blue-500" fill="currentColor" /> Print-Ready PDF
                  </div>
                  <div className="flex items-center gap-3 text-zinc-600 font-bold">
                    <Star size={18} className="text-blue-500" fill="currentColor" /> Secure Sharing
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-blue-100 aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl -rotate-3" />
                <div className="absolute inset-0 bg-white aspect-[3/4] rounded-[3rem] shadow-xl rotate-3 border border-blue-50 flex items-center justify-center p-8">
                   <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                         <Star className="text-blue-500" size={32} fill="currentColor" />
                      </div>
                      <h4 className="font-black text-zinc-900 mb-1">Groom Profile</h4>
                      <p className="text-zinc-500 text-xs font-medium">Professional Standards</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Dynamic Custom SEO Content & Details Checklist for Grooms */}
            <div className="bg-white rounded-[2.5rem] border border-blue-500/10 p-8 md:p-12 shadow-xl shadow-zinc-200/20">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-wider">
                    <Sparkles size={12} /> Groom Profile Strategy
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                    Making a Lasting Impression with a <br />
                    <span className="text-blue-600 italic">Groom Marriage Biodata</span>
                  </h3>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
                    When families evaluate a groom's profile, they prioritize a clear overview of career progress, educational qualifications, stability, and family legacy. A structured, professional presentation shows maturity and seriousness about marriage.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                    Our formal blue-accented templates are designed specifically to showcase high-priority parameters, giving prospective bride families a trusted first impression of your accomplishments and lifestyle.
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-black text-zinc-800 text-base uppercase tracking-wider flex items-center gap-2 border-b pb-3">
                    <Info size={18} className="text-blue-600" /> Key Groom Fields to List
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-zinc-500">
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Full Name & Zodiac/Astro Rashi</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Gothra / Family Ancestry</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Degree & College/University Name</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Company Name, Role & Annual Salary</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Father's Occupation & Roots</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Siblings' Careers & Education</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Clear Partner Preferences</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>High-Resolution Formal Photograph</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom 5 Step Creation Guide for Grooms */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-blue-600">Groom Builder Workflow</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">5 Easy Steps to Create Your Groom Profile</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Generate a formal, print-ready groom biodata PDF instantly using our template system.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { step: "01", title: "Choose Formal Design", desc: "Select from our minimalist, executive-styled blue-themed groom templates." },
                  { step: "02", title: "Highlight Career", desc: "Input your current job designation, company name, salary range, and degrees." },
                  { step: "03", title: "Add Family Pedigree", desc: "Share background details of your parents, family status, and heritage." },
                  { step: "04", title: "Define Expectations", desc: "List what qualities, values, and traits you seek in your prospective partner." },
                  { step: "05", title: "Export Vector PDF", desc: "Preview your complete profile online and download your high-quality PDF instantly." }
                ].map((s, i) => (
                  <div key={i} className="bg-zinc-50/50 border border-zinc-100 rounded-3xl p-6 relative overflow-hidden transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/20 group">
                    <span className="absolute right-4 top-4 text-3xl font-black opacity-10 select-none group-hover:scale-110 transition-transform text-blue-600">{s.step}</span>
                    <h5 className="font-black text-zinc-900 mb-2 mt-4 text-sm">{s.title}</h5>
                    <p className="text-zinc-500 text-xs font-semibold leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Distinct FAQs for Grooms */}
            <div className="space-y-8 pb-4">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-blue-600">Groom Matchmaking Q&A</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">Groom Matrimonial FAQs</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Frequently asked questions about drafting a highly professional groom biodata.</p>
              </div>

              <div className="grid md:grid-cols-1 gap-4 max-w-4xl mx-auto">
                {[
                  {
                    q: "What makes a groom's marriage biodata look highly professional?",
                    a: "A professional groom's biodata prioritizes structured, readable layouts. Emphasizing career accomplishments, job stability, and educational background while using a formal blue-accented theme helps project maturity and credibility to the bride's family."
                  },
                  {
                    q: "Is it mandatory to list my annual income or salary?",
                    a: "While it is optional, listing your annual salary range or income bracket establishes transparency and financial readiness. It is highly appreciated by families trying to understand lifestyle alignment."
                  },
                  {
                    q: "How should I specify my partner expectations as a groom?",
                    a: "Be respectful and clear. State your preferences regarding the bride's career path (working vs homemaker), lifestyle values, dietary habits, and cultural alignment without sounding overly demanding."
                  },
                  {
                    q: "Can I download my groom biodata in print-ready PDF format?",
                    a: "Yes! Once you complete your details, you can instantly export your profile as a high-resolution, print-ready PDF. It preserves layouts across all mobile screen widths for effortless sharing on WhatsApp."
                  }
                ].map((faq, i) => (
                  <Accordion key={i} className="w-full">
                    <AccordionItem value={`item-${i}`} className="border border-zinc-200/60 rounded-2xl px-6 py-0.5 bg-white hover:bg-zinc-50/30 transition-all shadow-sm">
                      <AccordionTrigger className="hover:no-underline text-left font-black text-zinc-800 py-4 text-sm md:text-base">
                        <span className="flex items-center gap-3">
                          <HelpCircle size={18} className="text-blue-500" /> {faq.q}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-zinc-500 text-sm pb-5 pl-7 leading-relaxed font-semibold">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>

            {/* Simplified CTA - Reference from BlogsList.tsx at the VERY BOTTOM */}
            <div className="bg-blue-500/5 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden border border-blue-500/10">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-4xl font-black mb-4 text-zinc-900 leading-tight">
                  Ready to Create Your <span className="text-blue-600 italic">Groom Biodata?</span>
                </h3>
                <p className="text-zinc-500 text-base font-medium mb-8">
                  Choose your favorite template and start creating for free.
                </p>
                <Link href="/#create-biodata">
                  <Button size="lg" className="rounded-full px-10 h-14 font-black bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20 transition-all">
                    Create Now <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
