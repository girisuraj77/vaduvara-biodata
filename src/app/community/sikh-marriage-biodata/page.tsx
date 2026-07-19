import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Star, BookOpen } from "lucide-react";
import { TemplateCard } from "@/components/templates/template-card";
import { prisma } from "@/lib/prisma";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Sparkles, Info } from "lucide-react";


export const metadata: Metadata = {
  title: "Free Sikh Marriage Biodata Format Maker - Anand Karaj PDF Formats",
  description: "Create your Sikh marriage biodata online for 100% free. Premium Anand Karaj Sikh formats with Gursikh, Amritdhari, and clean traditional designs. Free print-ready PDF download.",
  keywords: ["free sikh marriage biodata", "free sikh biodata format maker", "anand karaj biodata free pdf", "free sikh rishta maker", "free marriage biodata maker"],
  alternates: {
    canonical: "/community/sikh-marriage-biodata",
  },
  openGraph: {
    title: "Free Sikh Marriage Biodata Format Maker - Anand Karaj PDF Formats",
    description: "Create your Sikh marriage biodata online for 100% free. Premium Anand Karaj Sikh formats with Gursikh, Amritdhari, and clean traditional designs.",
    url: "https://vadhuvarbiodata.com/community/sikh-marriage-biodata",
    siteName: "Vadhuvar Biodata",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Sikh Marriage Biodata Maker - Vadhuvar Biodata",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Sikh Marriage Biodata Format Maker - Anand Karaj PDF Formats",
    description: "Create your Sikh marriage biodata online for 100% free.",
    images: ["/og-image.png"],
  },
};

export default async function SikhCommunityPage() {
  const templates = await prisma.template.findMany({
    where: { 
      isActive: true,
      community: { contains: "Sikh", mode: "insensitive" }
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
    name: "Sikh Marriage Biodata",
    whatIs: "A Sikh marriage biodata, also known as a matrimonial profile for Anand Karaj, is a document that introduces a prospective bride or groom to a Sikh family. It highlights personal background, educational qualifications, and spiritual values (Gursikh, Amritdhari, etc.). Sikh families prioritize shared values, heritage, and a commitment to the Guru's path.",
    whatToInclude: [
      "Full Name & Family Surname",
      "Gursikh / Amritdhari Status",
      "Birth Date, Time, and Place",
      "Education & Career Achievements",
      "Family Background & Roots (Pind)",
      "Height & Physical Appearance",
      "Hobbies & Interests"
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Blogs-Style Hero Section - Light Orange/Gold Tint */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-orange-500/5 border-b border-orange-500/10">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <BookOpen size={12} /> Free Heritage & Values
          </div>
          <h1 className="text-3xl md:text-3xl lg:text-5xl font-black mb-6 leading-tight tracking-tight text-zinc-900">
            Free Sikh Marriage <span className="text-orange-600 italic">Biodata Maker</span>
          </h1>
          <p className="text-zinc-500 text-md md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            100% Free Sikh marriage biodata builder and Anand Karaj matrimonial profile generator. 
            Highlight spiritual values (Gursikh, Amritdhari) and family lineage for free.
          </p>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2 tracking-tight">Sikh Templates</h2>
              <p className="text-zinc-500 font-medium">Graceful and clean designs for the Sikh community.</p>
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
                <span className="text-orange-600 font-black uppercase tracking-widest text-[10px] mb-2 block">Sikh Heritage</span>
                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                  Values & <br />
                  <span className="text-orange-600 italic">Tradition</span>
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

            <div className="p-10 rounded-[3rem] bg-white border border-orange-500/10 shadow-md">
              <h3 className="text-2xl font-black text-zinc-900 mb-8 flex items-center gap-3 tracking-tight">
                <CheckCircle2 className="text-orange-500" size={28} /> Key Details
              </h3>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                {content.whatToInclude.map((item, i) => (
                  <div key={i} className="flex gap-3 text-zinc-600 font-medium text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Custom SEO Content & Details Checklist for Sikh Community */}
            <div className="bg-white rounded-[2.5rem] border border-yellow-500/10 p-8 md:p-12 shadow-xl shadow-zinc-200/20">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50/5 border border-yellow-500/10 text-yellow-700 text-[10px] font-black uppercase tracking-wider">
                    <Sparkles size={12} /> Anand Karaj Principles
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                    Reflecting Spiritual Values in a <br />
                    <span className="text-yellow-600 italic">Sikh Matrimonial Biodata</span>
                  </h3>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
                    Preparing a Sikh matrimonial profile for Anand Karaj involves highlighting both professional stability and spiritual roots, such as Gursikh, Keshdhari, or Amritdhari status, along with native village (Pind) heritage.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                    Our customized amber-gold themed layouts feature distinct sections for spiritual commitments, family heritage (Pind), physical heights, and turban preferences, presenting your details with royal Sikh aesthetics.
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-black text-zinc-800 text-base uppercase tracking-wider flex items-center gap-2 border-b pb-3">
                    <Info size={18} className="text-yellow-600" /> Key Sikh Fields
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-zinc-500">
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-yellow-400" />
                      <span>Full Name & Caste/Sub-caste</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-yellow-400" />
                      <span>Spiritual Status: Gursikh / Amritdhari</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-yellow-400" />
                      <span>Turban status (for grooms) / Kesh</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-yellow-400" />
                      <span>Ancestral Pind (Native Village) name</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-yellow-400" />
                      <span>Highest Degree & Work Pedigree</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-yellow-400" />
                      <span>Father's / Mother's Background</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-yellow-400" />
                      <span>Anand Karaj Partner Expectations</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-yellow-400" />
                      <span>Clear High-Resolution Photograph</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom 5 Step Creation Guide for Sikh Matrimony */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-yellow-600">Sikh Builder Workflow</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">5 Easy Steps to Create Your Sikh Profile</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Generate a royal, print-ready Sikh matrimonial profile instantly using our secure builder.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { step: "01", title: "Choose Royal Layout", desc: "Select from our premium gold-themed templates optimized for Sikh wedding profiles." },
                  { step: "02", title: "Fill Spiritual Status", desc: "Declare your Gursikh, Keshdhari, Amritdhari status, and turban wear choices." },
                  { step: "03", title: "Add Career Achievements", desc: "Input your job designation, employer, monthly income, and academic degrees." },
                  { step: "04", title: "Add Native Pind", desc: "List ancestral roots, Pind name, and parent details to establish local trust." },
                  { step: "05", title: "Export Vector PDF", desc: "Preview your finished template layout and download a crisp, premium PDF." }
                ].map((s, i) => (
                  <div key={i} className="bg-zinc-50/50 border border-zinc-100 rounded-3xl p-6 relative overflow-hidden transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/20 group">
                    <span className="absolute right-4 top-4 text-3xl font-black opacity-10 select-none group-hover:scale-110 transition-transform text-yellow-600">{s.step}</span>
                    <h5 className="font-black text-zinc-900 mb-2 mt-4 text-sm">{s.title}</h5>
                    <p className="text-zinc-500 text-xs font-semibold leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Distinct FAQs for Sikh Matrimony */}
            <div className="space-y-8 pb-4">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-yellow-600">Sikh Matrimonial Q&A</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">Sikh Matrimonial FAQs</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Frequently asked questions about Anand Karaj requirements and Pind details.</p>
              </div>

              <div className="grid md:grid-cols-1 gap-4 max-w-4xl mx-auto">
                {[
                  {
                    q: "Should I mention my Amritdhari or Gursikh status on the matrimonial profile?",
                    a: "Yes. For practicing Sikh families, listing Gursikh, Keshdhari, or Amritdhari status helps find compatible matches aligned in spiritual lifestyles, Rehat Maryada, and Guru's principles."
                  },
                  {
                    q: "Why is listing the ancestral Pind (native village) highly crucial?",
                    a: "Providing your native Pind name establishes direct geographic links, making family background verification and social networking much easier for parent circles."
                  },
                  {
                    q: "Is it possible to download my completed Sikh matrimonial biodata in PDF?",
                    a: "Absolutely! The completed profile exports instantly to a standard A4-sized, high-resolution vector PDF that looks perfectly crisp on all devices and physical prints."
                  },
                  {
                    q: "Can I manage multiple profiles on the dashboard?",
                    a: "Yes. You can manage multiple versions of your profile under a single account, allowing you to test different layouts or customize details as required."
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
            <div className="bg-orange-500/5 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden border border-orange-500/10">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-4xl font-black mb-4 text-zinc-900 leading-tight">
                  Ready to Create Your <br />
                  <span className="text-orange-600 italic">Sikh Biodata?</span>
                </h3>
                <p className="text-zinc-500 text-base font-medium mb-8">
                  Get started for free and download your professional rishta biodata instantly.
                </p>
                <Link href="/#create-biodata">
                  <Button size="lg" className="rounded-full px-10 h-14 font-black bg-orange-600 hover:bg-orange-700 text-white shadow-xl shadow-orange-600/20 transition-all">
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
