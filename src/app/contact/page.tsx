"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Sparkles, CheckCircle2, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Reverted Hero Section to match theme */}
      <section className="relative pt-24 pb-12 overflow-hidden bg-[#430917]/5 text-zinc-900">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] mb-8">
              <Sparkles size={14} /> Get in Touch
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight text-zinc-900">
              Let's Start a <span className="text-primary italic">Conversation</span>
            </h1>
            <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
              Have questions about our templates or need help with the builder?
              Our team is ready to assist you through our official support channel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* New Form Section Design */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] -ml-48 -mb-48" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-0 bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-zinc-100 overflow-hidden">
              {/* Left Column: Info Card */}
              <div className="lg:col-span-5 bg-zinc-950 p-10 md:p-16 text-white relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -ml-32 -mb-32" />

                <div className="relative z-10">
                  <h2 className="text-3xl font-black mb-12">Contact Details</h2>
                  <div className="space-y-10">
                    <motion.div whileHover={{ x: 10 }} className="flex gap-6 items-start group">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-1">Email us at</p>
                        <p className="text-xl font-bold">info@vadhuvarbiodata.com</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="relative z-10 mt-20 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Response Status</span>
                  </div>
                  <p className="text-zinc-300 font-medium leading-relaxed">
                    Our support team is currently active and processing inquiries within <span className="text-white font-black italic">24 hours.</span>
                  </p>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-7 p-10 md:p-16 bg-white relative">
                <AnimatePresence mode="wait">
                  {isSent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center py-10"
                    >
                      <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-8 ring-8 ring-green-50/50">
                        <CheckCircle2 size={48} />
                      </div>
                      <h3 className="text-4xl font-black text-zinc-900 mb-4">Email Sent!</h3>
                      <p className="text-zinc-500 font-semibold text-lg max-w-sm mx-auto mb-10">
                        Thank you for reaching out. We've received your message and will get back to you shortly.
                      </p>
                      <Button
                        variant="outline"
                        className="rounded-2xl px-10 h-14 font-black border-zinc-200 hover:bg-zinc-50 hover:text-primary transition-all text-base"
                        onClick={() => setIsSent(false)}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                          <input
                            required
                            type="text"
                            placeholder="Your Name"
                            className="w-full h-16 px-8 rounded-2xl bg-zinc-50 border-2 border-[#d0d0d0] focus:border-primary/20 focus:bg-white focus:ring-0 transition-all outline-none text-zinc-900 font-bold placeholder:text-zinc-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                          <input
                            required
                            type="email"
                            placeholder="hello@example.com"
                            className="w-full h-16 px-8 rounded-2xl bg-zinc-50 border-2 border-[#d0d0d0] focus:border-primary/20 focus:bg-white focus:ring-0 transition-all outline-none text-zinc-900 font-bold placeholder:text-zinc-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">Subject of Inquiry</label>
                        <input
                          required
                          type="text"
                          placeholder="How can we help?"
                          className="w-full h-16 px-8 rounded-2xl bg-zinc-50 border-2 border-[#d0d0d0] focus:border-primary/20 focus:bg-white focus:ring-0 transition-all outline-none text-zinc-900 font-bold placeholder:text-zinc-300"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">Detailed Message</label>
                        <textarea
                          required
                          placeholder="Tell us how we can help you today..."
                          rows={6}
                          className="w-full px-8 py-6 rounded-3xl bg-zinc-50 border-2 border-[#d0d0d0] focus:border-primary/20 focus:bg-white focus:ring-0
                             transition-all outline-none text-zinc-900 font-bold placeholder:text-zinc-300 resize-none"
                        />
                      </div>

                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full h-15 rounded-[2rem] bg-primary hover:bg-primary/95 text-white font-black text-xl shadow-2xl shadow-primary/30 
                          transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 border-none group"
                      >
                        {isSubmitting ? "Sending..." : (
                          <>
                            Send My Message <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                          </>
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
