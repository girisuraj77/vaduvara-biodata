import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Star, BookOpen } from "lucide-react";
import { TemplateCard } from "@/components/templates/template-card";
import { prisma } from "@/lib/prisma";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Sparkles, Info } from "lucide-react";


export const metadata: Metadata = {
  title: "Free Christian Marriage Biodata Format Maker & PDF Templates",
  description: "Create a beautiful Christian marriage biodata for 100% free online. Elegant templates for Catholic, Protestant, and Orthodox families. Instant free print-ready PDF download.",
  keywords: ["free christian marriage biodata", "free matrimonial profile creator", "christian biodata pdf download", "free christian rishta maker", "free marriage biodata maker"],
  alternates: {
    canonical: "/community/christian-wedding-profile",
  },
  openGraph: {
    title: "Free Christian Marriage Biodata Format Maker & PDF Templates",
    description: "Create a beautiful Christian marriage biodata for 100% free online. Elegant templates for Catholic, Protestant, and Orthodox families.",
    url: "https://vadhuvarbiodata.com/community/christian-wedding-profile",
    siteName: "Vadhuvar Biodata",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Christian Marriage Biodata Maker - Vadhuvar Biodata",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Christian Marriage Biodata Format Maker & PDF Templates",
    description: "Create a beautiful Christian marriage biodata for 100% free online.",
    images: ["/og-image.png"],
  },
};

export default async function ChristianCommunityPage() {
  const templates = await prisma.template.findMany({
    where: { 
      isActive: true,
      community: { contains: "Christian", mode: "insensitive" }
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
    name: "Christian Marriage Biodata",
    whatIs: "A Christian marriage biodata is a formal profile used by individuals within the Christian community to find a compatible life partner. It focuses on faith, denomination (Catholic, Protestant, etc.), family values, and personal interests. It is a modern way to introduce oneself while honoring spiritual foundations.",
    whatToInclude: [
      "Full Name & Family Name",
      "Denomination & Church Affiliation",
      "Personal Faith Journey (Optional)",
      "Educational & Professional Background",
      "Family Details & Siblings",
      "Interests, Hobbies & Music",
      "Expectations from Partner"
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Blogs-Style Hero Section - Light Blue Tint */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-blue-500/5 border-b border-blue-500/10">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <BookOpen size={12} /> Free Faith & Heritage
          </div>
          <h1 className="text-3xl md:text-3xl lg:text-5xl font-black mb-6 leading-tight tracking-tight text-zinc-900">
            Free Christian Marriage <span className="text-blue-600 italic">Biodata Maker</span>
          </h1>
          <p className="text-zinc-500 text-md md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            100% Free Christian matrimonial biodata format builder for Catholic, Protestant, and Orthodox denominations. 
            Create a professional Christian matrimonial profile that reflects your faith and personality.
          </p>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2 tracking-tight">Christian Templates</h2>
              <p className="text-zinc-500 font-medium">Modern and elegant designs that focus on clarity and grace.</p>
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
                <span className="text-blue-600 font-black uppercase tracking-widest text-[10px] mb-2 block">Faith Journey</span>
                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                  Spiritual <br />
                  <span className="text-blue-600 italic">Foundation</span>
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

            <div className="p-10 rounded-[3rem] bg-white border border-blue-500/10 shadow-md">
              <h3 className="text-2xl font-black text-zinc-900 mb-8 flex items-center gap-3 tracking-tight">
                <CheckCircle2 className="text-blue-500" size={28} /> Key Sections
              </h3>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                {content.whatToInclude.map((item, i) => (
                  <div key={i} className="flex gap-3 text-zinc-600 font-medium text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Custom SEO Content & Details Checklist for Christian Community */}
            <div className="bg-white rounded-[2.5rem] border border-blue-500/10 p-8 md:p-12 shadow-xl shadow-zinc-200/20">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/5 border border-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-wider">
                    <Sparkles size={12} /> Faith & Family Standards
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                    Reflecting Spiritual Core in a <br />
                    <span className="text-blue-600 italic">Christian Marriage Biodata</span>
                  </h3>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
                    In Christian matrimonial matching, families value a balanced outline of the candidate's denominational roots, local parish affiliation, baptism details, and personal commitment to church life alongside professional achievements.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                    Our classical layouts provide dedicated sections for your church credentials and spiritual values, ensuring your profile is received with immediate trust and respect across Catholic, Protestant, and Orthodox circles.
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-black text-zinc-800 text-base uppercase tracking-wider flex items-center gap-2 border-b pb-3">
                    <Info size={18} className="text-blue-600" /> Key Christian Fields
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-zinc-500">
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Full Name & Baptismal Name</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Denomination (Catholic/Protestant/etc.)</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Parish Church Name & Diocese</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Highest Degree & Work Pedigree</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Father's / Mother's Background</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Siblings' Careers & Church Involvements</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Christian/Spiritual Expectations</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>High-Quality Clear Profile Photograph</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom 5 Step Creation Guide for Christian Matrimony */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-blue-600">Christian Builder Workflow</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">5 Easy Steps to Create Your Christian Profile</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Generate an elegant, parish-ready Christian matrimonial profile instantly using our secure builder.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { step: "01", title: "Select Graceful Layout", desc: "Choose from our minimalist, classic designs optimized specifically for Christian profiles." },
                  { step: "02", title: "Enter Church Roots", desc: "Highlight your exact denomination, parish church name, and diocesan background." },
                  { step: "03", title: "Share Family Legacy", desc: "List your parents' profiles, siblings, and family's ancestral village." },
                  { step: "04", title: "State Spiritual Alignment", desc: "Clearly note your preferences regarding faith, church attendance, and lifestyle." },
                  { step: "05", title: "Instant A4 PDF Export", desc: "Review your completed profile and download a high-resolution, print-ready PDF." }
                ].map((s, i) => (
                  <div key={i} className="bg-zinc-50/50 border border-zinc-100 rounded-3xl p-6 relative overflow-hidden transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/20 group">
                    <span className="absolute right-4 top-4 text-3xl font-black opacity-10 select-none group-hover:scale-110 transition-transform text-blue-600">{s.step}</span>
                    <h5 className="font-black text-zinc-900 mb-2 mt-4 text-sm">{s.title}</h5>
                    <p className="text-zinc-500 text-xs font-semibold leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Distinct FAQs for Christian Matrimony */}
            <div className="space-y-8 pb-4">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-blue-600">Christian Matrimonial Q&A</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">Christian Matrimonial FAQs</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Frequently asked questions about preparing church-compatible marriage profiles.</p>
              </div>

              <div className="grid md:grid-cols-1 gap-4 max-w-4xl mx-auto">
                {[
                  {
                    q: "Should I list my exact parish church inside my Christian marriage biodata?",
                    a: "Yes. Listing your local parish church and diocese helps families of potential matches easily verify your background and understand your active community ties, fostering instant trust."
                  },
                  {
                    q: "What denominations are supported by the profile templates?",
                    a: "Our modular inputs allow you to specify any denomination seamlessly—including Roman Catholic, Syrian Catholic, Protestant, CSI/CNI, Jacobite, Orthodox, Mar Thoma, and Pentecostal."
                  },
                  {
                    q: "How do I share my spiritual and religious expectations politely?",
                    a: "You can write a simple sentence under your self-description paragraph noting your commitment to church life, and state if you expect your partner to be baptized or active in Sunday service."
                  },
                  {
                    q: "Is it possible to download my completed Christian wedding biodata in PDF?",
                    a: "Absolutely! The completed profile exports instantly to a standard A4-sized, high-resolution vector PDF that looks perfectly crisp on all devices and physical prints."
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
                  Ready to Create Your <br />
                  <span className="text-blue-600 italic">Christian Profile?</span>
                </h3>
                <p className="text-zinc-500 text-base font-medium mb-8">
                  Get started for free and download your professional biodata instantly.
                </p>
                <Link href="/#create-biodata">
                  <Button size="lg" className="rounded-full px-10 h-14 font-black bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20 transition-all">
                    Create Profile Now <ArrowRight className="ml-2" size={18} />
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
