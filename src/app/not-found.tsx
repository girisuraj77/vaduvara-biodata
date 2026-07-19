"use client";

import { motion } from "framer-motion";
import { Heart, Home, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-white relative overflow-hidden px-4">
      {/* Decorative Floating Elements */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-primary/5 rounded-full blur-[100px] animate-pulse" />

        {/* Soft Animated Floating Hearts */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[30%] right-[20%] text-primary/10 hidden md:block"
        >
          <Heart size={48} className="fill-primary/5" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[30%] left-[20%] text-primary/10 hidden md:block"
        >
          <Heart size={36} className="fill-primary/5" />
        </motion.div>
      </div>

      <div className="container max-w-2xl mx-auto text-center relative z-10 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Animated 404 Heart Badge */}
          <div className="relative mb-8 flex items-center justify-center select-none">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-primary"
            >
              <Heart size={140} className="fill-primary/10 stroke-[1.5]" />
            </motion.div>
            <div className="absolute font-black text-4xl text-primary tracking-tighter uppercase">
              404
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles size={12} className="animate-pulse" /> Page Not Found
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-none mb-6">
            Lost Your Way, <br />
            <span className="text-primary italic">Dearest Guest?</span>
          </h1>

          <p className="text-zinc-500 font-medium text-base md:text-lg leading-relaxed max-w-md mb-12">
            The page you are looking for might have been shared via an old link, renamed, or moved to a different sacred destination.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link href="/">
                <button className="w-full sm:w-auto px-8 h-14 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg shadow-zinc-950/10">
                  <Home size={18} /> Go Back Home
                </button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link href="/templates">
                <button className="w-full sm:w-auto px-8 h-14 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-400 text-zinc-700 hover:text-zinc-900 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm">
                  Browse Templates <ArrowRight size={18} />
                </button>
              </Link>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </main>
  );
}
