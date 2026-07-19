"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "April 2026";

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="pt-24 pb-12 bg-[#430917]/5 border-b border-primary/5">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
            <Shield size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-zinc-500 font-medium tracking-widest uppercase text-xs">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="prose prose-zinc prose-lg max-w-none">
            <p className="text-lg text-zinc-600 leading-relaxed mb-10">
              At Marriage BioData, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our website and services.
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                  Information We Collect
                </h2>
                <div className="space-y-4 text-zinc-600 font-medium">
                  <p>We collect information that you provide directly to us when you create a biodata, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Personal details (Name, Date of Birth, Caste, Religion)</li>
                    <li>Education and Career details</li>
                    <li>Family background information</li>
                    <li>Photos you upload for your biodata</li>
                    <li>Contact information (Email, Phone number)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                  How We Use Your Information
                </h2>
                <div className="space-y-4 text-zinc-600 font-medium">
                  <p>We use the collected information to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Generate your marriage biodata templates</li>
                    <li>Manage your account and biodata storage</li>
                    <li>Provide customer support and respond to your requests</li>
                    <li>Improve our services and design new features</li>
                    <li>Send important notifications regarding your account</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">3</span>
                  Data Storage and Security
                </h2>
                <p className="text-zinc-600 font-medium leading-relaxed">
                  Your data is stored securely on encrypted servers. We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or modification.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">4</span>
                  Sharing Your Biodata
                </h2>
                <p className="text-zinc-600 font-medium leading-relaxed">
                  When you use our "Share" feature, you are explicitly choosing to share your profile with others. We provide you with controls to enable or disable public sharing at any time from your dashboard.
                </p>
              </section>

              <section className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100">
                <h4 className="text-lg font-bold text-zinc-900 mb-4">Questions?</h4>
                <p className="text-zinc-500 text-sm mb-0">
                  If you have any questions about this Privacy Policy, please contact us at <span className="text-primary font-bold">info@vadhuvarbiodata.com</span>
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
