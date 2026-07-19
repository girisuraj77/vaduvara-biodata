"use client";

import { motion } from "framer-motion";
import { Heart, Users, Award, ShieldCheck, Sparkles, Zap, Target } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence in Design",
      desc: "We push the boundaries of design to give you templates that stand out from the crowd.",
      color: "bg-blue-500",
      delay: 0.1
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Security & Privacy",
      desc: "Your data is yours. We ensure your personal information is protected with industry-standard security.",
      color: "bg-primary",
      delay: 0.2
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Global Reach",
      desc: "Connecting families across borders through a modern, digital matrimonial presentation.",
      color: "bg-purple-500",
      delay: 0.3
    }
  ];

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden bg-[#430917]/5 text-zinc-900">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] mb-8">
              <Sparkles size={14} /> Our Journey
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
              Helping You Find Your <br />
              <span className="text-primary italic">Perfect Life Partner</span>
            </h1>
            <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
              We started with a simple mission: to make the marriage biodata creation process professional, dignified, and stress-free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-8 tracking-tight">Our Vision</h2>
              <p className="text-zinc-500 text-lg leading-relaxed mb-6 font-semibold opacity-80">
                In today's digital world, your marriage biodata is often the first impression you make on potential life partners and their families. We believe that this first impression should be nothing short of perfect.
              </p>
              <p className="text-zinc-500 text-lg leading-relaxed mb-10 font-semibold opacity-80">
                Vadhuvar Biodata is more than just a tool; it's a platform built on the values of trust, transparency, and cultural respect. We empower individuals to showcase their personality, achievements, and family background through beautiful, professional templates.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-[2rem] bg-zinc-50 border border-zinc-100 group hover:border-primary/20 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <Heart size={24} className="fill-current" />
                  </div>
                  <h4 className="font-black text-zinc-900 mb-2">Built with Love</h4>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">Every feature is designed with the user's emotions in mind.</p>
                </div>
                <div className="p-6 rounded-[2rem] bg-zinc-50 border border-zinc-100 group hover:border-blue-500/20 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                    <Users size={24} />
                  </div>
                  <h4 className="font-black text-zinc-900 mb-2">Community First</h4>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">Supporting diverse cultures and languages across India.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-primary/20 blur-[100px] rounded-full opacity-30 animate-pulse" />
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-zinc-100">
                <Image
                  src="/mockups/about-couple.webp"
                  alt="Our Vision"
                  width={600}
                  height={600}
                  className="w-full h-auto hover:scale-110 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] -ml-48 -mb-48" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-6 tracking-tight">Our Commitment to <span className="text-primary italic">Excellence</span></h2>
            <p className="text-zinc-500 text-lg font-semibold opacity-70">
              We are dedicated to providing the highest quality tools and services to help you make the best first impression possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group bg-white p-10 rounded-[2.5rem] shadow-xl shadow-zinc-200/50 border border-zinc-100 transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-[1.25rem] ${item.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-zinc-900 mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-500 font-semibold leading-relaxed opacity-80">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
