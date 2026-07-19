import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Star, Shield, BookOpen } from "lucide-react";
import { TemplateCard } from "@/components/templates/template-card";
import { CATEGORY_DUMMY_DATA } from "@/lib/category-data";
import { prisma } from "@/lib/prisma";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Sparkles, Info } from "lucide-react";


export const metadata: Metadata = {
  title: "Free Muslim Marriage Biodata Maker - Nikah Profile PDF Templates",
  description: "Create a professional Muslim matrimonial biodata online for 100% free. Elegant Nikah formats with Maslak, sect, and religious details. Free print-ready PDF download.",
  keywords: ["free muslim marriage biodata", "free nikah profile maker", "free islamic rishta biodata", "muslim biodata format pdf free", "free marriage biodata maker"],
  alternates: {
    canonical: "/community/muslim-marriage-biodata",
  },
  openGraph: {
    title: "Free Muslim Marriage Biodata Maker - Nikah Profile PDF Templates",
    description: "Create a professional Muslim matrimonial biodata online for 100% free. Elegant Nikah formats with Maslak, sect, and religious details.",
    url: "https://vadhuvarbiodata.com/community/muslim-marriage-biodata",
    siteName: "Vadhuvar Biodata",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Muslim Marriage Biodata Maker - Vadhuvar Biodata",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Muslim Marriage Biodata Maker - Nikah Profile PDF Templates",
    description: "Create a professional Muslim matrimonial biodata online for 100% free.",
    images: ["/og-image.png"],
  },
};

export default async function MuslimCommunityPage() {
  const templates = await prisma.template.findMany({
    where: { 
      isActive: true,
      community: { contains: "Muslim", mode: "insensitive" }
    },
    select: {
      id: true,
      templateId: true,
      name: true,
      image: true,
      isFree: true,
    },
    orderBy: [
      { community: "desc" }, // Places "Muslim" templates first, then "All"
      { order: "asc" }
    ]
  });

  const content = {
    name: "Muslim Marriage Biodata",
    whatIs: "A Muslim marriage biodata, also known as a Nikah profile or Rishta biodata, is a one-page document used during the arranged marriage search in Muslim families. It introduces a prospective bride or groom to another family, covering personal details, religious practice (Deen), family background, and partner expectations. Unlike general formats, it specifically includes fields like Maslak (school of thought), Sect (Sunni or Shia), and Community/Caste (Sheikh, Syed, Pathan, etc.).",
    whatToInclude: [
      "Religious commitment (Salah regularity, Fasting, Hajj)",
      "Sect and Maslak (Barelvi, Deobandi, Ahle Hadith, etc.)",
      "Ancestral Origin (Native Place)",
      "Marital Status (Never Married, Divorced, etc.)",
      "Educational & Professional Pedigree",
      "Hijab/Parda observance (for brides)",
      "Family Values (Joint or Nuclear setup)"
    ],
    notToInclude: [
      "Gotra: This is a Hindu lineage concept and has no place in Islamic tradition.",
      "Nakshatra & Rashi: Astrological signs are not part of Islamic matching practices.",
      "Manglik Status: This is an astrological concept irrelevant to Muslim families.",
      "Personal Social Media IDs: Keep these private for initial family vetting.",
      "Extremely casual or group photos."
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Blogs-Style Hero Section - Light Emerald Tint */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-emerald-500/5 border-b border-emerald-500/10">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <BookOpen size={12} /> Free Islamic Traditions
          </div>
          <h1 className="text-3xl md:text-3xl lg:text-5xl font-black mb-6 leading-tight tracking-tight text-zinc-900">
            Free Muslim Marriage <span className="text-emerald-600 italic">Biodata Maker</span>
          </h1>
          <p className="text-zinc-500 text-md md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            100% Free Muslim marriage biodata builder and Nikah profile generator. 
            Create a professional Muslim matrimonial profile with Deen, Maslak, Sect, and family background details for free.
          </p>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2 tracking-tight">Premium Templates</h2>
              <p className="text-zinc-500 font-medium">Beautifully crafted designs that respect Islamic values.</p>
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
                <span className="text-emerald-600 font-black uppercase tracking-widest text-[10px] mb-2 block">Knowledge Base</span>
                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                  What is a <br />
                  <span className="text-emerald-600 italic">Muslim Biodata?</span>
                </h2>
              </div>
              <div className="md:col-span-7">
                <div className="p-8 rounded-[2rem] bg-white shadow-xl shadow-zinc-200/20 border border-zinc-100">
                  <p className="text-lg text-zinc-600 leading-relaxed font-medium">
                    {content.whatIs}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-10 rounded-[3rem] bg-white border border-emerald-500/10 shadow-lg">
                <h3 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-500" size={24} /> What to Include
                </h3>
                <ul className="space-y-4">
                  {content.whatToInclude.map((item, i) => (
                    <li key={i} className="flex gap-3 text-zinc-500 font-medium text-base">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-10 rounded-[3rem] bg-emerald-600 text-white shadow-lg">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <Shield className="text-emerald-100" size={24} /> Avoid These
                </h3>
                <ul className="space-y-4">
                  {content.notToInclude.map((item, i) => (
                    <li key={i} className="flex gap-3 text-emerald-50 font-medium text-base">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-200 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Dynamic Custom SEO Content & Details Checklist for Muslim Community */}
            <div className="bg-white rounded-[2.5rem] border border-emerald-500/10 p-8 md:p-12 shadow-xl shadow-zinc-200/20">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/5 border border-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-wider">
                    <Sparkles size={12} /> Islamic Matrimonial Standard
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                    Balancing Deen & Dunya in a <br />
                    <span className="text-emerald-600 italic">Muslim Nikah Biodata</span>
                  </h3>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
                    A Muslim marriage biodata (Nikah profile) prioritizes transparent details regarding the candidate's religious commitment (Deen), Sect, school of thought (Maslak), educational credentials, and family background.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                    Our customized emerald-green templates feature clean structures dedicated to Islamic values, Salah regularity, ancestral roots (Watan), and hijab observance, helping you draft an exceptional profile for prospective families.
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-black text-zinc-800 text-base uppercase tracking-wider flex items-center gap-2 border-b pb-3">
                    <Info size={18} className="text-emerald-600" /> Key Muslim Fields
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-zinc-500">
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-emerald-400" />
                      <span>Full Name & Sect (Sunni / Shia)</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-emerald-400" />
                      <span>Maslak (Hanafi/Ahle-Hadith/Deobandi/etc.)</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-emerald-400" />
                      <span>Religious Practice: Salah & Fasting</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-emerald-400" />
                      <span>Hijab / Parda details (for brides)</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-emerald-400" />
                      <span>Ancestral Origin & Native Place (Watan)</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-emerald-400" />
                      <span>Highest Qualification & Employer</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-emerald-400" />
                      <span>Father's / Mother's Background</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-emerald-400" />
                      <span>Religious & Social Partner Expectations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom 5 Step Creation Guide for Muslim Matrimony */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-emerald-600">Islamic Builder Workflow</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">5 Easy Steps to Create Your Muslim Profile</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Generate a professional, custom Islamic rishta profile instantly using our builder.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { step: "01", title: "Pick Nikah Template", desc: "Select from our gracefully crafted emerald layouts reflecting Islamic art motifs." },
                  { step: "02", title: "Enter Deen & Sect", desc: "List your Sect, Maslak, Salah regularity, and commitment to Islamic values." },
                  { step: "03", title: "Add Job & Education", desc: "Input your career track, current designation, and college degrees." },
                  { step: "04", title: "List Family Background", desc: "Share native ancestry (Watan), father's job details, and siblings' profiles." },
                  { step: "05", title: "Instant PDF Export", desc: "Review your completed layout and export to a crisp, high-resolution PDF." }
                ].map((s, i) => (
                  <div key={i} className="bg-zinc-50/50 border border-zinc-100 rounded-3xl p-6 relative overflow-hidden transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/20 group">
                    <span className="absolute right-4 top-4 text-3xl font-black opacity-10 select-none group-hover:scale-110 transition-transform text-emerald-600">{s.step}</span>
                    <h5 className="font-black text-zinc-900 mb-2 mt-4 text-sm">{s.title}</h5>
                    <p className="text-zinc-500 text-xs font-semibold leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Distinct FAQs for Muslim Matrimony */}
            <div className="space-y-8 pb-4">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-emerald-600">Islamic Matchmaking Q&A</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">Muslim Matrimonial FAQs</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Frequently asked questions about preparing highly compatible Nikah profiles.</p>
              </div>

              <div className="grid md:grid-cols-1 gap-4 max-w-4xl mx-auto">
                {[
                  {
                    q: "Why is listing Sect and Maslak highly vital in a Muslim marriage biodata?",
                    a: "Different schools of thought (Maslaks) have distinct cultural and religious practices. Clearly stating your Sect (Sunni/Shia) and Maslak helps families quickly assess compatibility in daily practices, values, and traditions."
                  },
                  {
                    q: "How do I describe my commitment to religious practices (Deen)?",
                    a: "You can use the custom fields to state your Salah (Namaz) frequency (e.g. '5 times daily'), regular Quran recitation, fasting in Ramadan, and other core Islamic practices."
                  },
                  {
                    q: "What details are not necessary or typically avoided in Muslim biodatas?",
                    a: "Astrological matching metrics (like Manglik status, Rashi, and Nakshatra) are Hindu concepts and have no place in traditional Islamic matchmaking. Casual photos or personal social media handles should also be omitted."
                  },
                  {
                    q: "Can I download my finished Muslim rishta biodata in print-ready PDF?",
                    a: "Absolutely! The builder generates a clean, standard A4 vector PDF optimized for physical printing and lossless sharing as a document on WhatsApp."
                  }
                ].map((faq, i) => (
                  <Accordion key={i} className="w-full">
                    <AccordionItem value={`item-${i}`} className="border border-zinc-200/60 rounded-2xl px-6 py-0.5 bg-white hover:bg-zinc-50/30 transition-all shadow-sm">
                      <AccordionTrigger className="hover:no-underline text-left font-black text-zinc-800 py-4 text-sm md:text-base">
                        <span className="flex items-center gap-3">
                          <HelpCircle size={18} className="text-emerald-500" /> {faq.q}
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
            <div className="bg-emerald-500/5 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden border border-emerald-500/10">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-4xl font-black mb-4 text-zinc-900 leading-tight">
                  Ready to Find Your <br />
                  <span className="text-emerald-600 italic">Life Partner?</span>
                </h3>
                <p className="text-zinc-500 text-base font-medium mb-8">
                  Join thousands of families who trust our professional templates for their matrimonial journey.
                </p>
                <Link href="/#create-biodata">
                  <Button size="lg" className="rounded-full px-10 h-14 font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/20 transition-all">
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
