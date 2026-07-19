"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  User
} from "lucide-react";
import { DownloadModal } from "@/components/builder/download-modal";

export function Footer() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  return (
    <footer className="bg-zinc-950 text-white pt-16 pb-6 border-t border-zinc-900">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-12 lg:gap-8">
        {/* Info & About - 40% width */}
        <div className="flex flex-col gap-6 lg:col-span-4 pr-10">
          <Logo variant="footer" className="scale-110 origin-left" />
          <div className="space-y-4">
            <p className="text-[15px] text-zinc-100 leading-relaxed font-medium">
              Create a stunning first impression with our premium marriage biodata maker.
              Craft professional, high-quality profiles in minutes that reflect your cultural heritage and personal status.
            </p>
            <p className="text-[14px] text-zinc-400 leading-relaxed font-medium">
              Choose from 50+ elegant templates in languages like English, Marathi, Hindi, and Gujarati.
              Our secure platform lets you store multiple biodatas, modify them anytime, and instantly share your profile with family via a private link.
            </p>
          </div>
        </div>

        {/* Formats - 20% width */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium mb-6 text-white uppercase">Formats</h3>
          <ul className="grid grid-cols-1 gap-3 text-[14px] text-zinc-200 font-medium">
            <li><Link href="/formats/pdf-format" className="hover:text-secondary hover:underline underline-offset-4 transition-all">PDF Format</Link></li>
            <li><Link href="/formats/marriage-biodata-for-girls" className="hover:text-secondary hover:underline underline-offset-4 transition-all">For Girls</Link></li>
            <li><Link href="/formats/marriage-biodata-for-boys" className="hover:text-secondary hover:underline underline-offset-4 transition-all">For Boys</Link></li>
          </ul>
        </div>

        {/* By Community - 20% width */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium mb-6 text-white uppercase">Community</h3>
          <ul className="grid grid-cols-1 gap-3 text-[14px] text-zinc-200 font-medium">
            <li><Link href="/community/hindu-marriage-biodata" className="hover:text-secondary hover:underline underline-offset-4 transition-all">Hindu Marriage Biodata</Link></li>
            <li><Link href="/community/muslim-marriage-biodata" className="hover:text-secondary hover:underline underline-offset-4 transition-all">Muslim Marriage Biodata</Link></li>
            <li><Link href="/community/marathi-biodata-format" className="hover:text-secondary hover:underline underline-offset-4 transition-all">Marathi Biodata Format</Link></li>
            <li><Link href="/community/gujarati-matrimonial-profile" className="hover:text-secondary hover:underline underline-offset-4 transition-all">Gujarati Matrimonial Profile</Link></li>
            <li><Link href="/community/christian-wedding-profile" className="hover:text-secondary hover:underline underline-offset-4 transition-all">Christian Wedding Profile</Link></li>
            <li><Link href="/community/sikh-marriage-biodata" className="hover:text-secondary hover:underline underline-offset-4 transition-all">Sikh Marriage Biodata</Link></li>
          </ul>
        </div>

        {/* Resources - 20% width */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium mb-6 text-white uppercase">Resources</h3>
          <ul className="grid grid-cols-1 gap-3 text-[14px] text-zinc-200 font-medium">
            <li><Link href="/" className="hover:text-secondary hover:underline underline-offset-4 transition-all">Home</Link></li>
            <li><Link href="/templates" className="hover:text-secondary hover:underline underline-offset-4 transition-all">Templates</Link></li>
            <li>
              <button
                onClick={() => setIsDownloadOpen(true)}
                className="hover:text-secondary hover:underline underline-offset-4 transition-all cursor-pointer text-left font-medium bg-transparent border-none p-0 text-zinc-200 outline-none block"
              >
                Download Paid Biodata
              </button>
            </li>
            <li><Link href="/how-to-create-biodata" className="hover:text-secondary hover:underline underline-offset-4 transition-all">How to Make</Link></li>
            <li><Link href="/blogs" className="hover:text-secondary hover:underline underline-offset-4 transition-all">Blogs & Articles</Link></li>
            <li><Link href="/about" className="hover:text-secondary hover:underline underline-offset-4 transition-all">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-secondary hover:underline underline-offset-4 transition-all">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 md:px-8 mt-12 pt-4 border-t border-zinc-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
          {/* Policy Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 text-[13px] text-zinc-100 font-medium tracking-tight">
            <Link href="/privacy-policy" className="hover:text-secondary transition-colors underline underline-offset-4 decoration-zinc-700 hover:decoration-secondary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-secondary transition-colors underline underline-offset-4 decoration-zinc-700 hover:decoration-secondary">Terms & Conditions</Link>
            <Link href="/shipping" className="hover:text-secondary transition-colors underline underline-offset-4 decoration-zinc-700 hover:decoration-secondary">Shipping & Delivery</Link>
            <Link href="/cancellation" className="hover:text-secondary transition-colors underline underline-offset-4 decoration-zinc-700 hover:decoration-secondary">Cancellation & Refund</Link>
          </div>

          {/* Social Icons Right */}
          <div className="flex items-center gap-4">
            <Link href="https://instagram.com" className="p-2 border border-zinc-700 rounded-full text-white hover:bg-secondary hover:text-white hover:border-secondary transition-all shadow-sm">
              <Instagram size={20} />
            </Link>
            <Link href="https://youtube.com" className="p-2 border border-zinc-700 rounded-full text-white hover:bg-secondary hover:text-white hover:border-secondary transition-all shadow-sm">
              <Youtube size={20} />
            </Link>
            <Link href="https://twitter.com" className="p-2 border border-zinc-700 rounded-full text-white hover:bg-secondary hover:text-white hover:border-secondary transition-all shadow-sm">
              <Twitter size={20} />
            </Link>
            <Link href="https://facebook.com" className="p-2 border border-zinc-700 rounded-full text-white hover:bg-secondary hover:text-white hover:border-secondary transition-all shadow-sm">
              <Facebook size={20} />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pb-2 text-[12px] text-zinc-500 font-medium uppercase tracking-widest pt-6 border-t border-zinc-900">
          <p>© 2026 vadhuvarbiodata.com. All rights reserved.</p>
          <p className="mt-1 opacity-100 lowercase font-normal italic text-zinc-600">Crafted with ❤️ for your special match.</p>
        </div>
      </div>

      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </footer>
  );
}
