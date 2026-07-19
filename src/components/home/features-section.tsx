"use client";

import { motion } from "framer-motion";
import {
  Globe2,
  LayoutTemplate,
  FileDown,
  Users,
  ShieldCheck,
  Settings2,
  Download,
  Edit3,
  Palette
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function FeaturesSection() {
  const languages = [
    { native: "English", english: "English" },
    { native: "मराठी", english: "Marathi" },
    { native: "हिंदी", english: "Hindi" },
    { native: "ગુજરાતી", english: "Gujarati" },
    { native: "ಕನ್ನಡ", english: "Kannada" },
    { native: "తెలుగు", english: "Telugu" },
    { native: "தமிழ்", english: "Tamil" },
    { native: "বাংলা", english: "Bengali" },
  ];

  const features = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Premium Gold Designs",
      desc: "Choose from 50+ beautiful templates designed in brand Chocolate & Gold colors, tailored for premium matrimonial printing."
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Download Print-Ready Files",
      desc: "Get your high-quality vector PDF or fully editable Microsoft Word document (.doc) generated instantly after payment."
    },
    {
      icon: <Edit3 className="w-6 h-6" />,
      title: "Modify & Edit Anytime",
      desc: "Made a typo? No worries. Download your paid biodata using your payment ID to correct details and re-download up to 4 times."
    },
    {
      icon: <Settings2 className="w-6 h-6" />,
      title: "Fully Editable Tables",
      desc: "Customize columns, fields, alignment, and headings offline or online using our flexible drag-and-drop builder blocks."
    },
    {
      icon: <Globe2 className="w-6 h-6" />,
      title: "Multi-Language Support",
      desc: "Create marriage biodata in Marathi, Hindi, English and 8+ other regional scripts seamlessly."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "100% Data Privacy",
      desc: "Your data is stored locally while building and encrypted. We do not expose public profile links to search engines."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-15 bg-zinc-50/50 relative overflow-hidden">
      {/* Full-width Background for Language Section Area */}
      <div className="absolute top-0 left-0 w-full h-[600px] z-0 pointer-events-none">
        <Image
          src="/mockups/features-bg.webp"
          alt="background"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-primary/[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />

        {/* Floating Artistic Stars Scoped to this area */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.3
              }}
              style={{
                top: `${(i * 13) % 100}%`,
                left: `${(i * 19) % 100}%`,
              }}
            >
              <svg width={10 + (i % 3) * 8} height={10 + (i % 3) * 8} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 md:px-8 relative z-10">
        {/* Language Section */}
        <div className="text-center mb-12 relative p-2 sm:p-6">
          <div className="relative z-10">
            {/* Subtle line decoration */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-y-1/2 -z-10" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-widest"
            >
              Regional Support
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6"
            >
              Create Biodata in Your <span className="text-primary italic">Native Language</span>
            </motion.h2>
            <p className="text-zinc-500 text-lg max-w-3xl mx-auto font-medium">
              Choose your preferred language and build a culturally perfect marriage biodata in minutes. We support all major Indian regional scripts.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-4 mt-8 sm:mt-16"
            >
              {languages.map((lang, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 40px -10px rgba(225,29,72,0.15)",
                    borderColor: "rgba(225,29,72,0.3)"
                  }}
                  className="bg-white border border-zinc-100 rounded-2xl p-3 sm:p-6 shadow-sm cursor-pointer transition-all flex flex-col items-center justify-center group"
                >
                  <div className="text-2xl font-black text-primary mb-2 transition-transform group-hover:scale-110">{lang.native}</div>
                  <div className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter">{lang.english}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-widest"
              >
                Why Choose Us
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                The Most <span className="text-primary">Advanced</span> Biodata Maker
              </h2>
              <p className="text-zinc-500 text-base font-medium">
                Our features are built to give you the best experience in creating, managing and sharing your marriage profiles.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />

                <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20 group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500 ease-out">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mb-4">{feature.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
