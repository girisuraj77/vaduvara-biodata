import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Download, Edit3, BookOpen } from "lucide-react";
import { TemplateCard } from "@/components/templates/template-card";
import { prisma } from "@/lib/prisma";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Sparkles, Info } from "lucide-react";


export const metadata: Metadata = {
  title: "Free Marriage Biodata Word Format - Free Download & Editable DOCX",
  description: "Download 100% free editable marriage biodata formats in MS Word (DOCX). Create your matrimonial profile online and export to Word for further customization for free.",
  keywords: ["free marriage biodata word format", "free biodata format for marriage in word", "free editable matrimonial biodata DOCX", "free word biodata maker"],
  alternates: {
    canonical: "/formats/word-format",
  },
  openGraph: {
    title: "Free Marriage Biodata Word Format - Free Download & Editable DOCX",
    description: "Download 100% free editable marriage biodata formats in MS Word (DOCX). Create online and export for free.",
    url: "https://vadhuvarbiodata.com/formats/word-format",
    siteName: "Vadhuvar Biodata",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Marriage Biodata Word Format - Vadhuvar Biodata",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Marriage Biodata Word Format - Free Download & Editable DOCX",
    description: "Download 100% free editable marriage biodata formats in MS Word (DOCX).",
    images: ["/og-image.png"],
  },
};

export default async function WordFormatPage() {
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
            <BookOpen size={12} /> Free Format Guide
          </div>
          <h1 className="text-3xl md:text-3xl lg:text-5xl font-black mb-6 leading-tight tracking-tight text-zinc-900">
            Free Marriage Biodata <span className="text-blue-600 italic">Word Format</span>
          </h1>
          <p className="text-zinc-500 text-md md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            100% Free flexible DOCX formats that you can edit yourself. 
            Download free editable Word templates, add custom fields, or adjust styling easily.
          </p>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2 tracking-tight">Word Templates</h2>
              <p className="text-zinc-500 font-medium">All our designs are available in editable DOCX format.</p>
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
              <div className="order-2 md:order-1">
                <div className="bg-white p-6 rounded-[3rem] shadow-xl shadow-zinc-200/20 border border-zinc-100">
                  <div className="bg-blue-50 aspect-square rounded-[2rem] flex items-center justify-center">
                    <FileText size={100} className="text-blue-200" />
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-8 tracking-tight">
                  Total <span className="text-blue-600 italic">Control</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Edit3 className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-zinc-900 mb-1">100% Editable</h4>
                      <p className="text-zinc-500 text-sm font-medium">Change any text, font size, or color after downloading. Add custom sections as needed.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Download className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-zinc-900 mb-1">DOCX Standard</h4>
                      <p className="text-zinc-500 text-sm font-medium">Compatible with Microsoft Word, Google Docs, and WPS Office.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Custom SEO Content & Details Checklist for Word Formats */}
            <div className="bg-white rounded-[2.5rem] border border-blue-500/10 p-8 md:p-12 shadow-xl shadow-zinc-200/20">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/5 border border-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-wider">
                    <Sparkles size={12} /> Word DOCX Flexibility
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                    Maximum Customization with <br />
                    <span className="text-blue-600 italic">Editable Word Formats</span>
                  </h3>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
                    For families who want to adjust layout borders, create custom rows, add specific cultural headings, or write long descriptions, the MS Word DOCX format provides ultimate flexibility. You have total creative control.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                    Our platform builds highly organized document tables that open cleanly in any word processing software, enabling you to add offline details, modify font family styles, and adjust spacing without ruining the overall template flow.
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-black text-zinc-800 text-base uppercase tracking-wider flex items-center gap-2 border-b pb-3">
                    <Info size={18} className="text-blue-600" /> Word DOCX Checklist
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-zinc-500">
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>100% Offline Editing Control</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Customizable Column Spacing</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Support for Custom Surnames List</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Standard .docx Open XML Format</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Fully Adjustable Color Schemes</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Manual Drag-and-Drop Image Slots</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Infinite Extra Pages Expansion</span>
                    </div>
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-blue-400" />
                      <span>Google Docs & LibreOffice Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom 5 Step Creation Guide for Word */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-blue-600">Word Creation Workflow</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">5 Easy Steps to Create Your Word Profile</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Generate a highly customizable, offline-ready Word biodata format using our builder.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { step: "01", title: "Select Word Design", desc: "Choose from our premium catalog layouts optimized specifically for MS Word templates." },
                  { step: "02", title: "Fill Details Online", desc: "Enter your biographical data, ancestry, education, and career details securely." },
                  { step: "03", title: "Export to DOCX", desc: "Download your completed matrimonial profile as a standard open XML Word document." },
                  { step: "04", title: "Edit Fonts Offline", desc: "Open the file locally to modify font sizes, add specific lists, or adjust styling." },
                  { step: "05", title: "Save and Share", desc: "Export as a clean PDF or print directly from your computer to share with prospects." }
                ].map((s, i) => (
                  <div key={i} className="bg-zinc-50/50 border border-zinc-100 rounded-3xl p-6 relative overflow-hidden transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/20 group">
                    <span className="absolute right-4 top-4 text-3xl font-black opacity-10 select-none group-hover:scale-110 transition-transform text-blue-600">{s.step}</span>
                    <h5 className="font-black text-zinc-900 mb-2 mt-4 text-sm">{s.title}</h5>
                    <p className="text-zinc-500 text-xs font-semibold leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Distinct FAQs for Word */}
            <div className="space-y-8 pb-4">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.2em] mb-3 block text-blue-600">DOCX Word Q&A</span>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">Word Matrimonial FAQs</h3>
                <p className="text-zinc-500 text-sm font-semibold mt-2">Frequently asked questions about downloading and modifying editable DOCX files.</p>
              </div>

              <div className="grid md:grid-cols-1 gap-4 max-w-4xl mx-auto">
                {[
                  {
                    q: "Is the downloaded Word file fully editable in Microsoft Word?",
                    a: "Yes. The downloaded file is a standard Microsoft Word Open XML document (.docx) which is compatible with MS Word (2007 and newer), LibreOffice, Apple Pages, and WPS Office."
                  },
                  {
                    q: "Can I import this Word template into Google Docs?",
                    a: "Absolutely! You can easily upload the downloaded .docx file to your Google Drive folder, double-click it, and select 'Open with Google Docs' to edit and share it directly in the cloud."
                  },
                  {
                    q: "How do I insert my profile picture inside the Word document?",
                    a: "Open the downloaded document in MS Word, click on the placeholder picture area, and go to the top ribbon 'Insert -> Pictures' to insert your high-resolution formal photo."
                  },
                  {
                    q: "Do I need any specialized formatting skills to edit the tables?",
                    a: "No. All tables are structured using standard margins and auto-wrap columns, making it extremely easy to add or delete rows without breaking the visual grid."
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
                  Ready to Get Your <span className="text-blue-600 italic">Word Biodata?</span>
                </h3>
                <p className="text-zinc-500 text-base font-medium mb-8">
                  Get started for free and export your biodata to editable Word format.
                </p>
                <Link href="/#create-biodata">
                  <Button size="lg" className="rounded-full px-10 h-14 font-black bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20 transition-all">
                    Create Word Now <ArrowRight className="ml-2" size={18} />
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
