"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const faqs = [
    { q: "Do I need to create an account to start?", a: "No! There is no login or account creation required. You can build your biodata instantly. Your progress is saved automatically in your browser's local storage so you don't lose your work." },
    { q: "How much does it cost to download my biodata?", a: "Building and previewing your biodata is completely free. When you are ready, you can download a premium PDF/Image layout for ₹49, or a fully editable Microsoft Word (.doc) layout for ₹99." },
    { q: "Can I edit my biodata after downloading?", a: "Yes, absolutely! You can make corrections and re-download your paid biodata up to 4 times. Simply use the 'Download Paid Biodata' option in the menu and enter your mobile number/email and payment ID." },
    { q: "What file formats are available for download?", a: "We offer high-quality vector PDFs (ideal for printing and sharing on WhatsApp) and editable Microsoft Word files (.doc) that let you modify layout details on your computer." },
    { q: "Is my personal data safe and private?", a: "Yes, your privacy is our top priority. We do not host public profile links on our servers, nor do we expose your personal biodata to search engines. Your draft details reside in your browser, and only completed paid templates are stored securely." },
    { q: "Does the app support regional Indian languages?", a: "Yes, we support over 8 major regional Indian languages including Marathi (Lagn Biodata), Hindi (Shadi Biodata), Gujarati, Kannada, Telugu, Tamil, and more." },
    { q: "Can I print the downloaded biodata?", a: "Yes! The downloaded PDF files are perfectly scaled and optimized for standard A4 paper size, making them ready to print at home or at any local print shop." },
    { q: "What happens if I exceed the 4 download limit?", a: "The 4-download limit exists to allow plenty of free re-downloads for typos and edits. If you exceed the limit, you will need to start a new order to download the biodata again." }
  ];

  return (
    <section id="faq-section" className="py-15 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-zinc-500 text-base max-w-2xl mx-auto">
            Everything you need to know about our marriage biodata maker, secure sharing, and profile management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <Accordion key={i} className="w-full">
              <AccordionItem value={`item-${i}`} className={cn(
                "border rounded-xl px-5 py-0.5 bg-white hover:bg-zinc-50 transition-all"
              )}>
                <AccordionTrigger className="hover:no-underline text-left font-semibold text-zinc-700 py-3.5 text-[15px]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-500 text-sm pb-4 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
