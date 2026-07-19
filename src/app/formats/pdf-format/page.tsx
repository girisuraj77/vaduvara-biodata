import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Download, Shield, BookOpen } from "lucide-react";
import { TemplateCard } from "@/components/templates/template-card";
import { prisma } from "@/lib/prisma";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Sparkles, Info } from "lucide-react";


export const metadata: Metadata = {
  title: "Free Marriage Biodata PDF Format - Maker & Print-Ready PDF",
  description: "Download 100% free professional marriage biodata formats in PDF. Create your matrimonial profile online for free and download a high-quality print-ready PDF instantly.",
  keywords: ["free marriage biodata pdf", "free matrimonial biodata download pdf", "free marriage biodata maker pdf", "print ready biodata pdf free"],
  alternates: {
    canonical: "/formats/pdf-format",
  },
  openGraph: {
    title: "Free Marriage Biodata PDF Format - Maker & Print-Ready PDF",
    description: "Download 100% free professional marriage biodata formats in PDF. Create your matrimonial profile online and export for free.",
    url: "https://vadhuvarbiodata.com/formats/pdf-format",
    siteName: "Vadhuvar Biodata",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Marriage Biodata PDF Format - Vadhuvar Biodata",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Marriage Biodata PDF Format - Maker & Print-Ready PDF",
    description: "Download 100% free professional marriage biodata formats in PDF.",
    images: ["/og-image.png"],
  },
};

export default async function PDFFormatPage() {
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
      {/* Blogs-Style Hero Section - Light Primary Tint */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-primary/5 border-b border-primary/5">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <BookOpen size={12} /> Free Format Guide
          </div>
          <h1 className="text-3xl md:text-3xl lg:text-5xl font-black mb-6 leading-tight tracking-tight text-zinc-900">
            Free Marriage Biodata <span className="text-primary italic">PDF Format</span>
          </h1>
          <p className="text-zinc-500 text-md md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            100% Free professional, print-ready PDF formats that work perfectly on WhatsApp, email, and social networks.
            Create online and download free biodata instantly.
          </p>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2 tracking-tight">PDF Templates</h2>
              <p className="text-zinc-500 font-medium">All our designs are optimized for crisp, professional PDF generation.</p>
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

      {/* Why Section */}
      <section className="py-24 bg-zinc-50/30">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="space-y-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-8 tracking-tight">
                  Why Choose <br />
                  <span className="text-primary italic">PDF Format?</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Shield className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-zinc-900 mb-1">Layout Preservation</h4>
                      <p className="text-zinc-500 text-sm font-medium">Unlike Word files, PDF looks exactly the same on every phone and laptop.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Download className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-zinc-900 mb-1">Easy Sharing</h4>
                      <p className="text-zinc-500 text-sm font-medium">Perfect for sharing on WhatsApp groups and matrimonial platforms.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-[3rem] shadow-xl shadow-zinc-200/20 border border-zinc-100">
                <div className="bg-zinc-50 aspect-square rounded-[2rem] flex items-center justify-center">
                  <FileText size={100} className="text-zinc-200" />
                </div>
              </div>
            </div>

            {/* Dynamic Custom SEO Content & Details Checklist for PDF Formats */}
            <div className="bg-white rounded-[2.5rem] border border-primary/10 p-8 md:p-12 shadow-xl shadow-zinc-200/20">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                    <Sparkles size={12} /> PDF Standard Benefits
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                    Why Matrimonial Experts <br />
                    <span className="text-primary italic">Demand PDF Biodatas</span>
                  </h3>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
                    A PDF document is a universal standard that locks your fonts, styling, margins, and photograph alignment in place. Unlike editable formats which look distorted on different office software, a PDF guarantees a unified experience across iPhone, Android, and Windows.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                    Our platform builds highly compressed, high-fidelity vector PDF files. This ensures your file size is small enough for easy WhatsApp sharing while keeping the resolution crisp enough for clear physical printing.
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-black text-zinc-800 text-base uppercase tracking-wider flex items-center gap-2 border-b pb-3">
                    <Info size={18} className="text-primary" /> Technical PDF Checklist
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-zinc-500">
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-primary" />
                      <span>100% Fixed Layout Locking</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-primary" />
                      <span>Crisp Vector Font Scaling</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-primary" />
                      <span>A4 Standard Border Padding</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-primary" />
                      <span>Small File Sizes for Easy Sharing</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-primary" />
                      <span>Cross-Platform OS Compatibility</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-primary" />
                      <span>High Resolution Photo Preservation</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-primary" />
                      <span>Zero Page Break Overflows</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-primary" />
                      <span>Direct WhatsApp Document Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom 5 Step Creation Guide for PDF */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-primary">PDF Generation Workflow</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">5 Easy Steps to Create Your PDF Profile</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Generate a professional, print-ready PDF format instantly using our template system.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { step: "01", title: "Select PDF Layout", desc: "Choose from our premium template catalog optimized specifically for digital PDFs." },
                  { step: "02", title: "Input Profile Details", desc: "Enter your biographical, academic, and contact details in our secure form." },
                  { step: "03", title: "Review Page Setup", desc: "Use our real-time preview to check spelling, alignment, and formatting boundaries." },
                  { step: "04", title: "Set Privacy Controls", desc: "Enable digital sharing or choose to restrict your link access to private matches." },
                  { step: "05", title: "Instant PDF Export", desc: "Generate a print-ready vector PDF document and share it securely in seconds." }
                ].map((s, i) => (
                  <div key={i} className="bg-zinc-50/50 border border-zinc-100 rounded-3xl p-6 relative overflow-hidden transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/20 group">
                    <span className="absolute right-4 top-4 text-3xl font-black opacity-10 select-none group-hover:scale-110 transition-transform text-primary">{s.step}</span>
                    <h5 className="font-black text-zinc-900 mb-2 mt-4 text-sm">{s.title}</h5>
                    <p className="text-zinc-500 text-xs font-semibold leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Distinct FAQs for PDF */}
            <div className="space-y-8 pb-4">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-primary">Technical PDF Q&A</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">PDF Matrimonial FAQs</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Frequently asked questions about printing, saving, and sharing PDF biodatas.</p>
              </div>

              <div className="grid md:grid-cols-1 gap-4 max-w-4xl mx-auto">
                {[
                  {
                    q: "Why is PDF format highly recommended over editable Word formats?",
                    a: "Word files require specialized software (like MS Word or Google Docs) to open. Different software versions often distort font sizes, break tabular alignments, and throw photographs out of place. A PDF locks every element permanently in place, guaranteeing it looks identical on every phone and screen."
                  },
                  {
                    q: "Is the downloaded PDF ready to print on A4 paper?",
                    a: "Yes! All of our premium layouts are mathematically structured to perfectly match standard A4 paper dimensions, preserving safe margin zones for printing so that no text is cut off or cropped."
                  },
                  {
                    q: "How can I share the PDF safely on WhatsApp?",
                    a: "Since our builder outputs a vector-based, highly compressed file, you can upload the PDF directly as a document in your WhatsApp chats. This retains your high-resolution photo quality without compression."
                  },
                  {
                    q: "Can I edit my biodata details after downloading the PDF?",
                    a: "Yes! Simply log back into your dashboard, update your profile or change the template, and download the new PDF. Your shared digital web links will also automatically show the updated details."
                  }
                ].map((faq, i) => (
                  <Accordion key={i} className="w-full">
                    <AccordionItem value={`item-${i}`} className="border border-zinc-200/60 rounded-2xl px-6 py-0.5 bg-white hover:bg-zinc-50/30 transition-all shadow-sm">
                      <AccordionTrigger className="hover:no-underline text-left font-black text-zinc-800 py-4 text-sm md:text-base">
                        <span className="flex items-center gap-3">
                          <HelpCircle size={18} className="text-primary" /> {faq.q}
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
            <div className="bg-primary/5 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden border border-primary/10">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-4xl font-black mb-4 text-zinc-900 leading-tight">
                  Ready to Get Your <span className="text-primary italic">PDF Biodata?</span>
                </h3>
                <p className="text-zinc-500 text-base font-medium mb-8">
                  Create your biodata in minutes and get a professional PDF instantly.
                </p>
                <Link href="/#create-biodata">
                  <Button size="lg" className="rounded-full px-10 h-14 font-black bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all">
                    Create PDF Now <ArrowRight className="ml-2" size={18} />
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
