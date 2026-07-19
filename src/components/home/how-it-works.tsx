"use client";

import { motion } from "framer-motion";
import { Edit3, Layout, Download, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function HowItWorks() {
  const steps = [
    {
      icon: <Edit3 className="w-8 h-8" />,
      title: "Fill Your Details",
      description: "Enter your personal, educational, and family information in our intuitive, smart form.",
      color: "from-blue-500 to-blue-600",
      glow: "shadow-blue-500/20"
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: "Choose a Template",
      description: "Select from our huge collection of premium, culturally appropriate templates.",
      color: "from-purple-500 to-purple-600",
      glow: "shadow-purple-500/20"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Download PDF & Word",
      description: "Instantly download your high-quality print-ready PDF or fully editable MS Word document (.doc) to print.",
      color: "from-primary to-[#f83a3a]",
      glow: "shadow-primary/20"
    }
  ];

  return (
    <section id="how-it-works-section" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-24 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-24 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] mb-6">
              <Sparkles size={14} /> The Process
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 mb-6 leading-tight tracking-tight">
              Create Your Free <span className="text-primary italic">Marriage Biodata</span> in 3 Simple Steps
            </h2>
            <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-2xl">
              We've refined the biodata creation process into a seamless,
              stress-free experience that produces professional results every time.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 relative">
          {/* Curved Animated Connector Lines (Desktop) */}
          <div className="hidden md:block absolute top-[120px] left-[15%] right-[15%] h-24 z-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 800 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M0 50C100 50 150 10 250 10C350 10 400 90 500 90C600 90 650 50 800 50"
                stroke="url(#gradient-line)"
                strokeWidth="3"
                strokeDasharray="8 12"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="gradient-line" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E2E8F0" stopOpacity="0" />
                  <stop offset="0.2" stopColor="#FF4D4D" />
                  <stop offset="0.8" stopColor="#FF4D4D" />
                  <stop offset="1" stopColor="#E2E8F0" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative group"
            >
              <div className="flex flex-col items-center">
                {/* Icon Wrapper with Floating Animation */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                  className={`w-24 h-24 rounded-[2.5rem] bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-2xl ${step.glow} relative z-10 group-hover:scale-110 transition-transform duration-500`}
                >
                  {step.icon}
                  {/* Glowing Ring */}
                  <div className="absolute inset-0 rounded-[2.5rem] bg-current opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                </motion.div>

                {/* Step Number with Backdrop Blur */}
                <div className="mt-[-12px] mb-8 relative z-20">
                  <div className="bg-zinc-900/90 backdrop-blur-md text-white w-12 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 border-white shadow-lg">
                    STEP {i + 1}
                  </div>
                </div>

                {/* Content Card */}
                <Link href="/how-to-create-biodata" className="cursor-pointer group/card block">
                  <div className="bg-white rounded-[2rem] p-8 pt-0 transition-all duration-500 text-center">
                    <h3 className="text-2xl font-black text-zinc-900 mb-4 group-hover/card:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-zinc-500 text-base leading-relaxed font-semibold opacity-80">
                      {step.description}
                    </p>

                    <div className="mt-8 flex items-center justify-center gap-2 text-primary font-black text-[11px] uppercase tracking-widest opacity-0 group-hover/card:opacity-100 transition-all transform translate-y-2 group-hover/card:translate-y-0">
                      Learn More <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );


}
