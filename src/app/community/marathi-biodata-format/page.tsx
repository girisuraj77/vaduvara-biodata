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
  title: "Free Marathi Marriage Biodata Format Maker - Lagnacha Biodata PDF",
  description: "Create your Marathi marriage biodata (Lagnacha Biodata) online for 100% free. Choose from premium traditional and modern Marathi templates. Free print-ready PDF download.",
  keywords: ["free marathi marriage biodata", "free lagnacha biodata format", "marathi biodata maker online free", "lagnacha biodata free pdf", "free marriage biodata maker"],
  alternates: {
    canonical: "/community/marathi-biodata-format",
  },
  openGraph: {
    title: "Free Marathi Marriage Biodata Format Maker - Lagnacha Biodata PDF",
    description: "Create your Marathi marriage biodata (Lagnacha Biodata) online for 100% free. Choose from premium traditional and modern Marathi templates.",
    url: "https://vadhuvarbiodata.com/community/marathi-biodata-format",
    siteName: "Vadhuvar Biodata",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Marathi Marriage Biodata Maker - Vadhuvar Biodata",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Marathi Marriage Biodata Format Maker - Lagnacha Biodata PDF",
    description: "Create your Marathi marriage biodata (Lagnacha Biodata) online for 100% free.",
    images: ["/og-image.png"],
  },
};

export default async function MarathiCommunityPage() {
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
    name: "Marathi Marriage Biodata",
    whatIs: "A Marathi marriage biodata is a cultural document used by families in Maharashtra to find a suitable match. It includes detailed information about the candidate's education, profession, family background, and horoscopic details like Gana, Nadi, and Nakshatra. It is often shared during the 'Kanda-Pohe' ceremony or via community WhatsApp groups.",
    whatToInclude: [
      "Full Name & Family Surname",
      "Kul (Family Lineage)",
      "Birth Date, Time, and Place",
      "Horoscope: Gana, Nadi, Nakshatra, Charana",
      "Education & Career Achievements",
      "Family Background & Mama's Surname",
      "Expectations from Partner"
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Blogs-Style Hero Section - Light Chocolate Tint */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-[#430917]/5 border-b border-[#430917]/10">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CFA132]/10 border border-[#CFA132]/20 text-[#CFA132] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <BookOpen size={12} /> Free Cultural Heritage
          </div>
          <h1 className="text-3xl md:text-3xl lg:text-5xl font-black mb-6 leading-tight tracking-tight text-zinc-900">
            Free Marathi Marriage <span className="text-secondary italic">Biodata Maker</span>
          </h1>
          <p className="text-zinc-500 text-md md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            100% Free Marathi marriage biodata builder (Lagnacha Biodata Format) with Kul, Devak, and horoscopic details. 
            Available in native Marathi and English language formats with free PDF exports.
          </p>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2 tracking-tight">Marathi Templates</h2>
              <p className="text-zinc-500 font-medium">Traditional motifs meet modern professional layouts.</p>
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
      <section className="py-24 bg-zinc-50/30 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
          <div className="space-y-20">
            <div className="grid md:grid-cols-12 gap-10 items-start">
              <div className="md:col-span-5">
                <span className="text-primary font-black uppercase tracking-widest text-[10px] mb-2 block">Marathi Culture</span>
                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                  Cultural <br />
                  <span className="text-secondary italic">Significance</span>
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

            <div className="p-10 rounded-[3rem] bg-primary text-white shadow-xl shadow-primary/10">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tight">
                <CheckCircle2 className="text-secondary" size={28} /> Key Details to Include
              </h3>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                {content.whatToInclude.map((item, i) => (
                  <div key={i} className="flex gap-3 text-white/90 font-medium text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Custom SEO Content & Details Checklist for Marathi Community */}
            <div className="bg-white rounded-[2.5rem] border border-primary/10 p-8 md:p-12 shadow-xl shadow-zinc-200/20">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/5 border border-secondary/10 text-secondary text-[10px] font-black uppercase tracking-wider">
                    <Sparkles size={12} /> Maharashtrian Traditions
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                    Drafting a Culturally Perfect <br />
                    <span className="text-secondary italic">Marathi Lagnacha Biodata</span>
                  </h3>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
                    A Maharashtrian marriage biodata (Lagnacha Biodata) requires specific cultural parameters like Devak, clan (Kul), and detailed horoscopic traits (Gana, Nadi, Nakshatra) alongside educational and career achievements.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                    Our traditional saffron-gold themed templates feature modular blocks dedicated to all Marathi wedding customs, helping you create a profile that carries high respect during the first family meeting or Kanda-Pohe ceremony.
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-black text-zinc-800 text-base uppercase tracking-wider flex items-center gap-2 border-b pb-3">
                    <Info size={18} className="text-secondary" /> Key Marathi Fields
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-zinc-500">
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-secondary" />
                      <span>Full Name & Surname (Kul)</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-secondary" />
                      <span>Family Devak & Clan roots</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-secondary" />
                      <span>Birth Date, exact Time & Place</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-secondary" />
                      <span>Horoscope: Nakshatra, Charana & Gana</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-secondary" />
                      <span>Nadi (Adya/Madhya/Antya) & Rashi</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-secondary" />
                      <span>Mama's Surname & Native Place (Mosal)</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-secondary" />
                      <span>Highest Degree, Designation & Salary</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-secondary" />
                      <span>Detailed Bride / Groom Expectations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom 5 Step Creation Guide for Marathi Matrimony */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-secondary">Marathi Builder Workflow</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">5 Easy Steps to Create Your Marathi Profile</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Generate a traditional Maharashtrian rishta biodata instantly using our secure builder.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { step: "01", title: "Select Saffron Layout", desc: "Select from our premium traditional Marathi layouts featuring auspicious accents." },
                  { step: "02", title: "Fill Devak & Clan", desc: "Enter your family's Devak totem, Kul, and ancestral regional origins." },
                  { step: "03", title: "List Horoscope", desc: "Add your Nakshatra, Rashi, Gana, Nadi, and Kundli parameters clearly." },
                  { step: "04", title: "Add Mosal / Mama", desc: "Share details of your maternal uncle's (Mama's) surname and native village." },
                  { step: "05", title: "Lagnacha PDF Export", desc: "Live preview the layout and download your vector-grade PDF instantly." }
                ].map((s, i) => (
                  <div key={i} className="bg-zinc-50/50 border border-zinc-100 rounded-3xl p-6 relative overflow-hidden transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/20 group">
                    <span className="absolute right-4 top-4 text-3xl font-black opacity-10 select-none group-hover:scale-110 transition-transform text-secondary">{s.step}</span>
                    <h5 className="font-black text-zinc-900 mb-2 mt-4 text-sm">{s.title}</h5>
                    <p className="text-zinc-500 text-xs font-semibold leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Distinct FAQs for Marathi Matrimony */}
            <div className="space-y-8 pb-4">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-secondary">Marathi Matrimonial Q&A</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">Marathi Matrimonial FAQs</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Frequently asked questions about Lagnacha biodata preparation and Devak listings.</p>
              </div>

              <div className="grid md:grid-cols-1 gap-4 max-w-4xl mx-auto">
                {[
                  {
                    q: "What is the cultural significance of Devak and Kul in Marathi biodata?",
                    a: "Devak is the sacred family totem (symbolized by a specific tree or artifact), while Kul denotes the ancestral lineage. Matching same Devak and Kul is traditionally restricted in Marathi matchmaking to verify clan distance."
                  },
                  {
                    q: "How should I present horoscope parameters like Gana and Nadi?",
                    a: "You can specify your Gana (Dev, Manushya, or Rakshas) and Nadi (Adya, Madhya, or Antya) within the dedicated astrology block. This simplifies the Kundli matching process for prospective families."
                  },
                  {
                    q: "Why is listing the maternal uncle's (Mama's) surname mandatory in Maharashtra?",
                    a: "Adding details of maternal roots (Mama's surname and place) is a highly valued Maharashtrian custom to provide transparent context on the maternal family's social background."
                  },
                  {
                    q: "Can I download my finished Marathi marriage biodata in native Marathi?",
                    a: "Yes! Our platform natively supports Devnagari Marathi text inputs, allowing you to create your entire Lagnacha Biodata in traditional Marathi and export to PDF."
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
                  <span className="text-[#CFA132] italic">Marathi Biodata?</span>
                </h3>
                <p className="text-zinc-500 text-base font-medium mb-8">
                  Create a professional rishta biodata with Kul, Mama&apos;s name, and horoscope.
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
