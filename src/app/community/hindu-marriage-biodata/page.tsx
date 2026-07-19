import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Star, BookOpen } from "lucide-react";
import { TemplateCard } from "@/components/templates/template-card";
import { CATEGORY_DUMMY_DATA } from "@/lib/category-data";
import { prisma } from "@/lib/prisma";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Sparkles, Info } from "lucide-react";


export const metadata: Metadata = {
  title: "Free Hindu Marriage Biodata Format Maker & PDF Templates",
  description: "Create a 100% free Hindu marriage biodata online. Choose from premium Vedic templates with Gothra, Rashi, and Nakshatra. Fast, secure, and free print-ready PDF download.",
  keywords: ["free hindu marriage biodata", "free marriage biodata maker", "free lagnacha biodata format", "free matrimonial profile pdf", "hindu biodata gothra rashi"],
  alternates: {
    canonical: "/community/hindu-marriage-biodata",
  },
  openGraph: {
    title: "Free Hindu Marriage Biodata Format Maker & PDF Templates",
    description: "Create a 100% free Hindu marriage biodata online. Choose from premium Vedic templates with Gothra, Rashi, and Nakshatra.",
    url: "https://vadhuvarbiodata.com/community/hindu-marriage-biodata",
    siteName: "Vadhuvar Biodata",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Hindu Marriage Biodata Maker - Vadhuvar Biodata",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Hindu Marriage Biodata Format Maker & PDF Templates",
    description: "Create a 100% free Hindu marriage biodata online. Choose from premium Vedic templates with Gothra, Rashi, and Nakshatra.",
    images: ["/og-image.png"],
  },
};

export default async function HinduCommunityPage() {
  const templates = await prisma.template.findMany({
    where: { 
      isActive: true,
      community: { contains: "Hindu", mode: "insensitive" }
    },
    select: {
      id: true,
      templateId: true,
      name: true,
      image: true,
      isFree: true,
    },
    orderBy: { order: 'asc' }
  });

  const content = {
    name: "Hindu Marriage Biodata",
    whatIs: "A Hindu marriage biodata is a comprehensive profile reflecting spiritual and social values. It focuses on family lineage (Gothra), astrological compatibility (Kundli), and educational background. Hindu families prioritize shared values and ancestral heritage when seeking a life partner.",
    whatToInclude: [
      "Full Name & Family Surname",
      "Gothra & Community/Caste",
      "Birth Date, Time, and Place",
      "Rashi, Nakshatra, and Manglik Status",
      "Educational & Professional Background",
      "Family Details (Parents, Siblings)",
      "Expectations from Partner"
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Blogs-Style Hero Section - Light Chocolate Tint */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-[#430917]/5 border-b border-[#430917]/10">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CFA132]/10 border border-[#CFA132]/20 text-[#CFA132] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <BookOpen size={12} /> Free Sacred Traditions
          </div>
          <h1 className="text-3xl md:text-3xl lg:text-5xl font-black mb-6 leading-tight tracking-tight text-zinc-900">
            Free Hindu Marriage <span className="text-secondary italic">Biodata Maker</span>
          </h1>
          <p className="text-zinc-500 text-md md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            100% Free Hindu matrimonial biodata format builder with Gothra, Rashi, and Nakshatra details. 
            Traditional Vedic designs blended with modern professional layout structures.
          </p>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2 tracking-tight">Hindu Templates</h2>
              <p className="text-zinc-500 font-medium">Sacred Vedic motifs blended with modern professional layouts.</p>
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

      {/* Guide Content */}
      <section className="py-24 bg-zinc-50/30">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="space-y-20">
            <div className="grid md:grid-cols-12 gap-10 items-start">
              <div className="md:col-span-5">
                <span className="text-primary font-black uppercase tracking-widest text-[10px] mb-2 block">Hindu Tradition</span>
                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                  Vedic <br />
                  <span className="text-secondary italic">Philosophy</span>
                </h2>
              </div>
              <div className="md:col-span-7">
                <div className="p-8 rounded-[2rem] bg-white shadow-xl shadow-zinc-200/20 border border-zinc-100">
                  <p className="text-lg text-zinc-600 leading-relaxed font-medium italic">
                    &quot;{content.whatIs}&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-white border border-primary/10 shadow-md">
              <h3 className="text-2xl font-black text-zinc-900 mb-8 flex items-center gap-3 tracking-tight">
                <CheckCircle2 className="text-secondary" size={28} /> Key Sections
              </h3>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                {content.whatToInclude.map((item, i) => (
                  <div key={i} className="flex gap-3 text-zinc-600 font-medium text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Custom SEO Content & Details Checklist for Hindu Community */}
            <div className="bg-white rounded-[2.5rem] border border-primary/10 p-8 md:p-12 shadow-xl shadow-zinc-200/20">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/5 border border-secondary/10 text-secondary text-[10px] font-black uppercase tracking-wider">
                    <Sparkles size={12} /> Sacred Vedic Pedigree
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                    Incorporating Horoscope & Lineage in a <br />
                    <span className="text-secondary italic">Hindu Marriage Biodata</span>
                  </h3>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
                    Hindu matrimonial traditions place immense value on spiritual alignment, family lineage (Gothra), and horoscope matching (Kundli). Presenting these traditional aspects clearly alongside modern educational and professional details is vital.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                    Our sacred chocolate-accented layouts feature dedicated structures for Rashi, Nakshatra, Gothra, and maternal relations (Mama's side), helping you introduce your background with complete cultural respect and trust.
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-black text-zinc-800 text-base uppercase tracking-wider flex items-center gap-2 border-b pb-3">
                    <Info size={18} className="text-[#CFA132]" /> Key Hindu Fields
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-zinc-500">
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-secondary" />
                      <span>Full Name & Caste/Sub-caste</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-secondary" />
                      <span>Gothra & Family Ancestry (Kul)</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-secondary" />
                      <span>Birth Date, Time & Exact Place</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-secondary" />
                      <span>Kundli Details: Rashi, Nakshatra & Gana</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-secondary" />
                      <span>Manglik Status (Yes / No / Anshik)</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-secondary" />
                      <span>Mother's Mosal (Mama's Surname & Village)</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-secondary" />
                      <span>Education, Profession & Income details</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-secondary" />
                      <span>Clear Partner Expectations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom 5 Step Creation Guide for Hindu Matrimony */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-secondary">Vedic Builder Workflow</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">5 Easy Steps to Create Your Hindu Profile</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Generate a highly respectful, traditional Hindu matrimonial profile instantly using our builder.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { step: "01", title: "Select Vedic Design", desc: "Choose from our catalog of traditional layouts featuring elegant motifs." },
                  { step: "02", title: "Fill Astro & Gothra", desc: "Enter your exact birth time, birth place, Rashi, Nakshatra, and Gothra details." },
                  { step: "03", title: "Add Job & Degrees", desc: "Input your college degree, current company role, and annual salary package." },
                  { step: "04", title: "List Mama's Roots", desc: "Add family ancestry details including your maternal uncle's (Mama's) surname." },
                  { step: "05", title: "Instant PDF Export", desc: "Preview your finished template layout and download your vector PDF instantly." }
                ].map((s, i) => (
                  <div key={i} className="bg-zinc-50/50 border border-zinc-100 rounded-3xl p-6 relative overflow-hidden transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/20 group">
                    <span className="absolute right-4 top-4 text-3xl font-black opacity-10 select-none group-hover:scale-110 transition-transform text-secondary">{s.step}</span>
                    <h5 className="font-black text-zinc-900 mb-2 mt-4 text-sm">{s.title}</h5>
                    <p className="text-zinc-500 text-xs font-semibold leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Distinct FAQs for Hindu Matrimony */}
            <div className="space-y-8 pb-4">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-secondary">Sacred Matchmaking Q&A</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">Hindu Matrimonial FAQs</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Frequently asked questions about horoscopes, Gothra, and traditional profile requirements.</p>
              </div>

              <div className="grid md:grid-cols-1 gap-4 max-w-4xl mx-auto">
                {[
                  {
                    q: "Why is Gothra and Astro Rashi extremely vital in a Hindu marriage biodata?",
                    a: "Gothra defines your paternal clan lineage; matching Gothras is traditionally avoided to prevent closely related marriages. Rashi and Nakshatra are used by astrologers for Kundli Milan (horoscope matching) to ensure long-term harmony."
                  },
                  {
                    q: "How should I specify my Manglik status inside the profile?",
                    a: "You can write it clearly under the Astro details section. Options include 'Non-Manglik', 'Manglik', or 'Anshik (Partial) Manglik' to assist families with matching horoscopes."
                  },
                  {
                    q: "Why should Hindu families list the maternal uncle's (Mama's) surname?",
                    a: "Listing mother's ancestral details (Mosal/Mama's side) is a widespread custom in Hindu marriages to show the broader family connections and help community verification."
                  },
                  {
                    q: "Is it possible to download my completed Hindu profile in PDF?",
                    a: "Absolutely! The completed profile prints instantly to an A4 vector-grade PDF document that maintains crystal-clear formatting for easy sharing on WhatsApp."
                  }
                ].map((faq, i) => (
                  <Accordion key={i} className="w-full">
                    <AccordionItem value={`item-${i}`} className="border border-zinc-200/60 rounded-2xl px-6 py-0.5 bg-white hover:bg-zinc-50/30 transition-all shadow-sm">
                      <AccordionTrigger className="hover:no-underline text-left font-black text-zinc-800 py-4 text-sm md:text-base">
                        <span className="flex items-center gap-3">
                          <HelpCircle size={18} className="text-secondary" /> {faq.q}
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
            <div className="bg-[#430917]/5 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden border border-primary/10">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-4xl font-black mb-4 text-zinc-900 leading-tight">
                  Ready to Create Your <br />
                  <span className="text-[#CFA132] italic">Hindu Biodata?</span>
                </h3>
                <p className="text-zinc-500 text-base font-medium mb-8">
                  Create a sacred matrimonial profile with Gothra, Rashi, and Kundli details.
                </p>
                <Link href="/#create-biodata">
                  <Button size="lg" className="rounded-full px-10 h-14 font-black bg-primary hover:bg-[#CFA132] hover:text-[#430917] text-white shadow-xl shadow-primary/20 transition-all cursor-pointer">
                    Create Biodata Now <ArrowRight className="ml-2" size={18} />
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
