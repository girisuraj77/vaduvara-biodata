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
  title: "Free Gujarati Marriage Biodata Format Maker & PDF Templates",
  description: "Create a 100% free Gujarati marriage biodata online. Custom elegant templates for Patel, Shah, Jain, and all Gujarati families. Fast free print-ready PDF download.",
  keywords: ["free gujarati marriage biodata", "gujarati biodata maker free", "free matrimonial profile maker", "free shadi biodata gujarati", "free marriage biodata maker"],
  alternates: {
    canonical: "/community/gujarati-matrimonial-profile",
  },
  openGraph: {
    title: "Free Gujarati Marriage Biodata Format Maker & PDF Templates",
    description: "Create a 100% free Gujarati marriage biodata online. Custom elegant templates for Patel, Shah, Jain, and all Gujarati families.",
    url: "https://vadhuvarbiodata.com/community/gujarati-matrimonial-profile",
    siteName: "Vadhuvar Biodata",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Gujarati Marriage Biodata Maker - Vadhuvar Biodata",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Gujarati Marriage Biodata Format Maker & PDF Templates",
    description: "Create a 100% free Gujarati marriage biodata online.",
    images: ["/og-image.png"],
  },
};

export default async function GujaratiCommunityPage() {
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
    name: "Gujarati Marriage Biodata",
    whatIs: "A Gujarati marriage biodata is a detailed profile used by Gujarati families to find a suitable match. It emphasizes family values, business or professional background, and community (Samaj) details. Gujarati families often look for compatibility in lifestyle, dietary habits (vegetarianism), and family culture.",
    whatToInclude: [
      "Full Name & Surname",
      "Birth Date, Time, and Place",
      "Native Place (Vatan) & Current City",
      "Community (Samaj) and Sub-caste",
      "Education Details & Degree",
      "Profession & Annual Income",
      "Family Details (Parents, Siblings)",
      "Mama's Name & Native Place"
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Blogs-Style Hero Section - Light Yellow/Gold Tint */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-yellow-500/5 border-b border-yellow-500/10">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <BookOpen size={12} /> Free Heritage Guide
          </div>
          <h1 className="text-3xl md:text-3xl lg:text-5xl font-black mb-6 leading-tight tracking-tight text-zinc-900">
            Free Gujarati Marriage <span className="text-yellow-600 italic">Biodata Maker</span>
          </h1>
          <p className="text-zinc-500 text-md md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            100% Free Gujarati matrimonial biodata format builder with Samaj, Vatan, and family lineage background. 
            Create a professional Gujarati profile in minutes and download a free PDF.
          </p>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2 tracking-tight">Gujarati Templates</h2>
              <p className="text-zinc-500 font-medium">Elegant designs tailored for the vibrant Gujarati community.</p>
            </div>
            <Link href="/templates">
              <Button variant="outline" className="rounded-xl font-black h-12 px-8 border-zinc-200 hover:bg-zinc-50 transition-all shadow-sm">Explore All Designs</Button>
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
                <span className="text-yellow-600 font-black uppercase tracking-widest text-[10px] mb-2 block">Gujarati Culture</span>
                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                  Cultural <br />
                  <span className="text-yellow-600 italic">Values</span>
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

            <div className="p-10 rounded-[2.5rem] bg-white border border-yellow-500/10 shadow-md">
              <h3 className="text-2xl font-black text-zinc-900 mb-8 flex items-center gap-3 tracking-tight">
                <CheckCircle2 className="text-yellow-600" size={28} /> Key Sections
              </h3>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                {content.whatToInclude.map((item, i) => (
                  <div key={i} className="flex gap-3 text-zinc-600 font-medium text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Custom SEO Content & Details Checklist for Gujarati Community */}
            <div className="bg-white rounded-[2.5rem] border border-yellow-500/10 p-8 md:p-12 shadow-xl shadow-zinc-200/20">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50/5 border border-yellow-500/10 text-yellow-700 text-[10px] font-black uppercase tracking-wider">
                    <Sparkles size={12} /> Samaj & Business Pedigree
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                    Reflecting Cultural Roots in a <br />
                    <span className="text-yellow-600 italic">Gujarati Marriage Biodata</span>
                  </h3>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
                    Gujarati matrimonial matchmaking places high priority on family values, business or professional achievements, native place (Vatan), and Samaj details. Establishing these elements clearly builds immediate trust and connection.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                    Our customized amber-gold themed layouts feature distinct fields for your ancestral roots, family enterprise details, dietary selections, and native values, ensuring your profile stands out within the community.
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-black text-zinc-800 text-base uppercase tracking-wider flex items-center gap-2 border-b pb-3">
                    <Info size={18} className="text-yellow-600" /> Key Gujarati Fields
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-zinc-500">
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-yellow-400" />
                      <span>Full Name & Samaj/Sub-caste</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-yellow-400" />
                      <span>Native Place (Vatan) & Current City</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-yellow-400" />
                      <span>Dietary Habit (Pure Veg / Jain / Swaminarayan)</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-yellow-400" />
                      <span>Education Degrees & College Pedigree</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-yellow-400" />
                      <span>Father's Enterprise/Business details</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-yellow-400" />
                      <span>Mama's Surname & Vatan location</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-yellow-400" />
                      <span>Matrimonial Partner Expectations</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-yellow-400" />
                      <span>Recent Elegant Profile Photograph</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom 5 Step Creation Guide for Gujarati Matrimony */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-yellow-600">Gujarati Builder Workflow</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">5 Easy Steps to Create Your Gujarati Profile</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Generate a highly professional, native Gujarati matrimonial profile instantly using our secure creator.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { step: "01", title: "Select Gold Layout", desc: "Choose from our gracefully crafted amber-gold traditional Gujarati templates." },
                  { step: "02", title: "Specify Vatan & Samaj", desc: "Highlight your native village, current city, and community/sub-caste groups." },
                  { step: "03", title: "Enter Profession", desc: "Add your career path, current position, or family enterprise achievements." },
                  { step: "04", title: "Add Mama's Details", desc: "Enter details of your mother's side (Mosal/Mama's surname and place)." },
                  { step: "05", title: "Instant PDF Export", desc: "Preview your finished layout and download your vector-grade PDF instantly." }
                ].map((s, i) => (
                  <div key={i} className="bg-zinc-50/50 border border-zinc-100 rounded-3xl p-6 relative overflow-hidden transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/20 group">
                    <span className="absolute right-4 top-4 text-3xl font-black opacity-10 select-none group-hover:scale-110 transition-transform text-yellow-600">{s.step}</span>
                    <h5 className="font-black text-zinc-900 mb-2 mt-4 text-sm">{s.title}</h5>
                    <p className="text-zinc-500 text-xs font-semibold leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Distinct FAQs for Gujarati Matrimony */}
            <div className="space-y-8 pb-4">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-yellow-600">Gujarati Matrimonial Q&A</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">Gujarati Matrimonial FAQs</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Frequently asked questions about designing a Gujarati-compatible marriage biodata.</p>
              </div>

              <div className="grid md:grid-cols-1 gap-4 max-w-4xl mx-auto">
                {[
                  {
                    q: "Why is mentioning the native village (Vatan) highly crucial in Gujarati biodata?",
                    a: "In Gujarati culture, providing your ancestral roots (Vatan) gives families immediate context about your family history, background, and social standing within the regional community."
                  },
                  {
                    q: "How should I describe my family business inside the profile?",
                    a: "Specify the industry sector, company name (if formal), your father's active designation, and locate the business headquarters clearly to provide transparency to prospective matches."
                  },
                  {
                    q: "Can I choose Swaminarayan or Jain vegetarian food preferences?",
                    a: "Yes. Our builder supports explicit inputs for dietary habits, allowing you to highlight pure vegetarian, Swaminarayan, or Jain food choices to find perfectly compatible matches."
                  },
                  {
                    q: "Is it possible to download my completed Gujarati matrimonial profile in PDF?",
                    a: "Absolutely! The builder renders a crisp, standard A4 vector PDF optimized for easy printing and lossless digital sharing on WhatsApp."
                  }
                ].map((faq, i) => (
                  <Accordion key={i} className="w-full">
                    <AccordionItem value={`item-${i}`} className="border border-zinc-200/60 rounded-2xl px-6 py-0.5 bg-white hover:bg-zinc-50/30 transition-all shadow-sm">
                      <AccordionTrigger className="hover:no-underline text-left font-black text-zinc-800 py-4 text-sm md:text-base">
                        <span className="flex items-center gap-3">
                          <HelpCircle size={18} className="text-yellow-600" /> {faq.q}
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
            <div className="bg-yellow-500/5 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden border border-yellow-500/10">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-4xl font-black mb-4 text-zinc-900 leading-tight">
                  Ready to Create Your <br />
                  <span className="text-yellow-600 italic">Gujarati Biodata?</span>
                </h3>
                <p className="text-zinc-500 text-base font-medium mb-8">
                  Create a professional profile with Samaj, Vatan, and family background.
                </p>
                <Link href="/#create-biodata">
                  <Button size="lg" className="rounded-full px-10 h-14 font-black bg-yellow-500 hover:bg-yellow-600 text-white shadow-xl shadow-yellow-600/20 transition-all">
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
