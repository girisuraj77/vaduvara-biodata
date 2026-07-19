import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, BookOpen } from "lucide-react";
import { TemplateCard } from "@/components/templates/template-card";
import { prisma } from "@/lib/prisma";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Sparkles, Info } from "lucide-react";


export const metadata: Metadata = {
  title: "Free Marriage Biodata for Girls - Maker & PDF Formats",
  description: "Create a beautiful marriage biodata for girls for 100% free. Choose from 50+ elegant premium bride templates. Free print-ready PDF download and easy digital sharing.",
  keywords: ["free marriage biodata for girls", "free bride biodata format", "free matrimonial profile for girls", "marriage biodata format girls pdf free"],
  alternates: {
    canonical: "/formats/marriage-biodata-for-girls",
  },
  openGraph: {
    title: "Free Marriage Biodata for Girls - Maker & PDF Formats",
    description: "Create a beautiful marriage biodata for girls for 100% free. Elegant designs designed specifically for brides.",
    url: "https://vadhuvarbiodata.com/formats/marriage-biodata-for-girls",
    siteName: "Vadhuvar Biodata",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Marriage Biodata for Girls - Vadhuvar Biodata",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Marriage Biodata for Girls - Maker & PDF Formats",
    description: "Create a beautiful marriage biodata for girls for 100% free.",
    images: ["/og-image.png"],
  },
};

export default async function GirlsFormatPage() {
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
      {/* Blogs-Style Hero Section - Light Pink Tint */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-pink-500/5 border-b border-pink-500/10">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <BookOpen size={12} /> Free Bride Guide
          </div>
          <h1 className="text-3xl md:text-3xl lg:text-5xl font-black mb-6 leading-tight tracking-tight text-zinc-900">
            Free Marriage Biodata <span className="text-pink-600 italic">for Girls</span>
          </h1>
          <p className="text-zinc-500 text-md md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            100% Free beautifully designed templates that reflect grace and elegance.
            Create your bride matrimonial profile in minutes and download a free print-ready PDF.
          </p>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2 tracking-tight">Bride Templates</h2>
              <p className="text-zinc-500 font-medium">Choose from our collection of elegant and modern designs.</p>
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
                  Elegance & <span className="text-pink-600 italic">Clarity</span>
                </h2>
                <p className="text-zinc-500 text-lg font-medium leading-relaxed mb-8">
                  Our templates for girls are designed to highlight educational achievements, family values, and personal interests with a touch of elegance.
                </p>
                <div className="grid gap-4">
                  <div className="flex items-center gap-3 text-zinc-600 font-bold">
                    <Star size={18} className="text-pink-500" fill="currentColor" /> Professional Layouts
                  </div>
                  <div className="flex items-center gap-3 text-zinc-600 font-bold">
                    <Star size={18} className="text-pink-500" fill="currentColor" /> High Quality PDF
                  </div>
                  <div className="flex items-center gap-3 text-zinc-600 font-bold">
                    <Star size={18} className="text-pink-500" fill="currentColor" /> Instant Sharing
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-pink-100 aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl rotate-3" />
                <div className="absolute inset-0 bg-white aspect-[3/4] rounded-[3rem] shadow-xl -rotate-3 border border-pink-50 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mx-auto mb-4">
                      <Star className="text-pink-500" size={32} fill="currentColor" />
                    </div>
                    <h4 className="font-black text-zinc-900 mb-1">Premium Quality</h4>
                    <p className="text-zinc-500 text-xs font-medium">Trusted by brides across India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Custom SEO Content & Details Checklist for Brides */}
            <div className="bg-white rounded-[2.5rem] border border-pink-500/10 p-8 md:p-12 shadow-xl shadow-zinc-200/20">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/5 border border-pink-500/10 text-pink-600 text-[10px] font-black uppercase tracking-wider">
                    <Sparkles size={12} /> Bride Profile Guide
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                    Showcasing Grace and Academics in a <br />
                    <span className="text-pink-600 italic">Bride Marriage Biodata</span>
                  </h3>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
                    A bride's marriage biodata is an elegant introduction that balances professional success, academic accolades, family upbringing, and personal values. Presenting these details in a structured and refined layout reflects high standards and seriousness.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                    Our soft pastel pink templates are designed specifically to display career paths, creative interests, and family roots gracefully, helping you make an immediate positive impression on compatible families.
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-black text-zinc-800 text-base uppercase tracking-wider flex items-center gap-2 border-b pb-3">
                    <Info size={18} className="text-pink-600" /> Key Bride Fields to List
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-zinc-500">
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-pink-400" />
                      <span>Full Name & Date of Birth</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-pink-400" />
                      <span>Height, Rashi & Star Sign</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-pink-400" />
                      <span>Highest Degree, College & Stream</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-pink-400" />
                      <span>Job/Profession, Employer & Income</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-pink-400" />
                      <span>Father's / Mother's Background</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-pink-400" />
                      <span>Brothers & Sisters (Careers/Marital)</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-pink-400" />
                      <span>Detailed Partner Expectations</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-pink-400" />
                      <span>Recent High-Quality Photograph</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom 5 Step Creation Guide for Brides */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-pink-600">Bride Builder Workflow</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">5 Easy Steps to Create Your Bride Profile</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Generate a highly customized, elegant bride biodata PDF instantly using our template system.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { step: "01", title: "Select Elegant Design", desc: "Browse from our gracefully designed pink-themed or minimalist bride templates." },
                  { step: "02", title: "Highlight Credentials", desc: "List your educational degrees, academic achievements, and career path." },
                  { step: "03", title: "Add Family Background", desc: "Share ancestral heritage, father's status, and siblings details." },
                  { step: "04", title: "Specify Ideal Match", desc: "Clearly state your expectations regarding career, location, and values." },
                  { step: "05", title: "Instant Print PDF", desc: "Live preview the template and download a crisp, professional vector PDF." }
                ].map((s, i) => (
                  <div key={i} className="bg-zinc-50/50 border border-zinc-100 rounded-3xl p-6 relative overflow-hidden transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/20 group">
                    <span className="absolute right-4 top-4 text-3xl font-black opacity-10 select-none group-hover:scale-110 transition-transform text-pink-600">{s.step}</span>
                    <h5 className="font-black text-zinc-900 mb-2 mt-4 text-sm">{s.title}</h5>
                    <p className="text-zinc-500 text-xs font-semibold leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Distinct FAQs for Brides */}
            <div className="space-y-8 pb-4">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-pink-600">Bride Matchmaking Q&A</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">Bride Matrimonial FAQs</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Frequently asked questions about drafting an outstanding bride biodata.</p>
              </div>

              <div className="grid md:grid-cols-1 gap-4 max-w-4xl mx-auto">
                {[
                  {
                    q: "How do I write a beautiful marriage biodata for a bride?",
                    a: "Focus on balancing your educational accolades, career accomplishments, creative hobbies, and family values. Choosing an elegant pink or pastel-themed layout adds professional refinement while honoring traditional aesthetics."
                  },
                  {
                    q: "Can I create my matrimonial profile without showing my photograph publicly?",
                    a: "Absolutely. Data security is our top priority. You can choose to generate a private PDF version to share selectively offline, or disable digital viewing at any time from your dashboard."
                  },
                  {
                    q: "How should I structure partner expectations as a bride?",
                    a: "Be respectful and clear. State your preferences regarding the groom's educational background, job stability, location choice, dietary parameters, and readiness to support your career aspirations."
                  },
                  {
                    q: "Is it possible to edit my bride biodata after sharing?",
                    a: "Yes! If you make a typo or want to update a career milestone, simply log into your profile and make changes. Your shared private web link will update instantly."
                  }
                ].map((faq, i) => (
                  <Accordion key={i} className="w-full">
                    <AccordionItem value={`item-${i}`} className="border border-zinc-200/60 rounded-2xl px-6 py-0.5 bg-white hover:bg-zinc-50/30 transition-all shadow-sm">
                      <AccordionTrigger className="hover:no-underline text-left font-black text-zinc-800 py-4 text-sm md:text-base">
                        <span className="flex items-center gap-3">
                          <HelpCircle size={18} className="text-pink-500" /> {faq.q}
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
            <div className="bg-pink-500/5 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden border border-pink-500/10">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-4xl font-black mb-4 text-zinc-900 leading-tight">
                  Ready to Create Your <span className="text-pink-600 italic">Bride Biodata?</span>
                </h3>
                <p className="text-zinc-500 text-base font-medium mb-8">
                  Choose your favorite template and start creating for free.
                </p>
                <Link href="/#create-biodata">
                  <Button size="lg" className="rounded-full px-10 h-14 font-black bg-pink-600 hover:bg-pink-700 text-white shadow-xl shadow-pink-600/20 transition-all">
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
