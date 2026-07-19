"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Edit3,
  Layout,
  Share2,
  Download,
  User,
  ShieldCheck,
  Smartphone,
  Globe,
  Settings,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HowToGuidePage() {
  const steps = [
    {
      id: "step-1",
      icon: <Edit3 className="w-6 h-6" />,
      title: "Fill Profile Details",
      subtitle: "The Foundation of Your Biodata",
      content: "Start by entering your basic personal information. Our smart form guides you through personal details, educational background, professional life, and family roots. We support multi-language input with a real-time translation side-section that helps you instantly convert words into your native script like Marathi, Hindi, or Gujarati.",
      features: ["Auto-save progress", "Real-time Translation Box", "Multi-language support", "Family background"],
      image: "/mockups/step-1.webp"
    },
    {
      id: "step-2",
      icon: <Layout className="w-6 h-6" />,
      title: "Select & Customize Template",
      subtitle: "Visual Excellence Matters",
      content: "Choose from our library of 50+ premium templates. Whether you prefer a traditional decorative look or a modern minimalist style, we have it all. Customize colors, fonts, and photo placements to match your personality.",
      features: ["50+ Premium Designs", "Real-time Live Preview", "Custom Color Palettes", "Photo adjustment tools"],
      image: "/mockups/templates-collage.webp"
    },
    {
      id: "step-3",
      icon: <Download className="w-6 h-6" />,
      title: "Download Print-Ready PDF",
      subtitle: "Instant & High Quality",
      content: "Once you're satisfied with the design, download your biodata as a high-resolution PDF. Our templates are perfectly scaled for A4 paper, ensuring your physical copies look as stunning as the digital ones.",
      features: ["No Watermarks", "High DPI Resolution", "Print-optimized layouts", "Unlimited downloads"],
      image: "/mockups/step-3.webp"
    },
    {
      id: "step-4",
      icon: <Share2 className="w-6 h-6" />,
      title: "Secure Online Sharing",
      subtitle: "Modern Way to Connect",
      content: "Instead of sending heavy PDF files via WhatsApp, share a secure private link. Your profile opens as a beautiful, mobile-optimized webpage. You can update details anytime, and the shared link updates automatically.",
      features: ["Private Web Link", "WhatsApp Integration", "Update anytime", "Access control"],
      image: "/mockups/step-4.webp"
    },
    {
      id: "step-5",
      icon: <Settings className="w-6 h-6" />,
      title: "Manage from Dashboard",
      subtitle: "Your Personal Control Center",
      content: "Access your personalized dashboard to manage all your biodatas in one place. View analytics, manage shared links, download multiple versions, and keep your profiles organized professionally.",
      features: ["Centralized Management", "Multiple Profile Versions", "Download History", "Profile Analytics"],
      image: "/mockups/step-5.webp"
    }
  ];

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden bg-[#430917]/5 text-zinc-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] mb-8">
              Complete Guide
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.05] tracking-tight text-zinc-900">
              Mastering the Art of <br />
              <span className="text-primary italic">Biodata Creation</span>
            </h1>
            <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
              Step-by-step walkthrough on how to create, design, download, and share your perfect marriage biodata.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#step-1">
                <Button size="lg" className="rounded-full px-8 h-14 font-black bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all cursor-pointer">
                  Start the Guide <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="/#create-biodata">
                <Button size="lg" className="rounded-full px-8 h-14 font-black bg-white text-zinc-950 hover:bg-zinc-100 shadow-xl transition-all cursor-pointer border border-zinc-200">
                  Create Biodata
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Sticky Navigation Sidebar */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 px-4">Sections</h4>
                {steps.map((step) => (
                  <Link
                    key={step.id}
                    href={`#${step.id}`}
                    className="flex items-center gap-4 p-4 rounded-2xl text-sm font-bold text-zinc-500 hover:text-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      {step.icon}
                    </div>
                    {step.title}
                  </Link>
                ))}
              </div>
            </aside>

            {/* Content Area */}
            <div className="lg:col-span-9 space-y-32">
              {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  id={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="scroll-mt-32"
                >
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className={i % 2 === 1 ? "md:order-2" : ""}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                          {step.icon}
                        </div>
                        <span className="text-zinc-400 font-black text-sm uppercase tracking-widest">Step 0{i + 1}</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">{step.title}</h2>
                      <h4 className="text-primary font-bold text-lg mb-6">{step.subtitle}</h4>
                      <p className="text-zinc-500 text-lg leading-relaxed mb-8 font-medium">
                        {step.content}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {step.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100 group hover:border-primary/20 transition-all">
                            <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                            <span className="text-zinc-700 text-sm font-bold">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={i % 2 === 1 ? "md:order-1" : ""}>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative overflow-hidden rounded-[2.5rem] border-8 border-zinc-50 shadow-2xl">
                          <Image
                            src={step.image}
                            alt={step.title}
                            width={600}
                            height={450}
                            className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-8">
                            <span className="text-white font-bold flex items-center gap-2">
                              Visual Guide <ChevronRight size={16} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section Detail */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-[#430917]/5 rounded-[4rem] p-12 md:p-20 overflow-hidden relative border border-primary/10">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-40" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-6 block">Advanced Features</span>
                <h2 className="text-4xl md:text-5xl font-black text-zinc-900 mb-8 leading-tight">
                  Your Marriage <br />
                  <span className="text-primary">Profile Control Center</span>
                </h2>
                <p className="text-zinc-500 text-lg leading-relaxed mb-10 font-medium">
                  We don't just help you create a biodata; we give you a platform to manage your entire matrimonial presentation profile.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-primary/10 flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
                      <ShieldCheck />
                    </div>
                    <div>
                      <h4 className="text-zinc-900 font-bold mb-1">Privacy First</h4>
                      <p className="text-zinc-500 text-sm">Control who sees your biodata. Enable or disable your shared links instantly.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-primary/10 flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
                      <Globe />
                    </div>
                    <div>
                      <h4 className="text-zinc-900 font-bold mb-1">Global Accessibility</h4>
                      <p className="text-zinc-500 text-sm">Your profile is optimized for any device—Mobile, Tablet, or Desktop.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 blur-[80px] rounded-full opacity-50" />
                <div className="relative bg-white border border-primary/10 p-2 rounded-[2.5rem] shadow-2xl overflow-hidden">
                  <Image
                    src="/mockups/dashboard-preview.webp"
                    alt="Dashboard Preview"
                    width={800}
                    height={500}
                    className="w-full h-auto rounded-[2rem] shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-8">Ready to Build Yours?</h2>
          <Link href="/#create-biodata">
            <Button size="lg" className="rounded-full px-12 h-16 text-lg font-black bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/30 transition-all cursor-pointer">
              Start Building Now
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
