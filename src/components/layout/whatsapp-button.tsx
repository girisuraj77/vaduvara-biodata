"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Headphones, X } from "lucide-react";

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const rawNumber = "9739811268";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || `91${rawNumber}`;
  const defaultText = "Hello! How can you help me today?";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultText)}`;
  const phoneCallUrl = `tel:${rawNumber}`;

  return (
    <>
      {/* DESKTOP VIEW: Right-Side Center Sticky Help Button Toggle */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-[99999] flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-3"
            >
              {/* Phone Call Icon Button */}
              <a
                href={phoneCallUrl}
                aria-label="Call support"
                className="w-[52px] h-[52px] bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg transition-all border-2 border-white/20 group relative"
              >
                <Phone className="w-5 h-5 text-white" />
                <span className="absolute right-full mr-3 bg-zinc-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-zinc-800">
                  Call Us
                </span>
              </a>

              {/* WhatsApp Icon Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-[52px] h-[52px] bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg transition-all border-2 border-white/20 group relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.705 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.156 4.223 4.899-1.254zm11.605-7.441c-.244-.122-1.444-.712-1.668-.793-.223-.081-.386-.122-.549.123-.163.244-.63.793-.772.956-.143.163-.285.183-.529.061-.244-.122-1.033-.381-1.968-1.214-.727-.648-1.218-1.449-1.36-1.693-.143-.244-.015-.376.107-.497.11-.11.244-.285.366-.427.122-.143.163-.244.244-.407.081-.163.041-.305-.02-.427-.061-.122-.549-1.32-.752-1.808-.198-.476-.399-.412-.549-.42-.143-.007-.305-.008-.468-.008-.163 0-.427.061-.65.305-.224.244-.854.834-.854 2.034 0 1.2.874 2.359.996 2.522.122.163 1.721 2.628 4.169 3.684.583.252 1.038.402 1.393.515.586.187 1.119.16 1.541.097.471-.07 1.444-.59 1.648-1.16.203-.57.203-1.057.142-1.16-.061-.101-.223-.162-.467-.284z" />
                </svg>
                <span className="absolute right-full mr-3 bg-zinc-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-zinc-800">
                  WhatsApp
                </span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Desktop Help Toggle Button (+5px width: 61px x 61px) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Support Help Options"
          className="relative w-[61px] h-[61px] bg-primary hover:bg-primary/95 text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white/30 transition-all duration-300 active:scale-95 cursor-pointer"
        >
          {!isOpen && (
            <div className="absolute inset-0 rounded-full bg-primary opacity-60 animate-ping pointer-events-none" />
          )}
          {isOpen ? <X className="w-7 h-7 text-white" /> : <Headphones className="w-7 h-7 text-white" />}
        </button>
      </div>

      {/* MOBILE RESPONSIVE VIEW: Fixed Bottom Right Help Toggle */}
      <div className="flex md:hidden fixed bottom-5 right-5 z-[99999] flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-row items-center gap-3 bg-zinc-950/90 backdrop-blur-lg border border-zinc-800 p-2 px-3 rounded-full shadow-2xl"
            >
              {/* Phone Call Icon */}
              <a
                href={phoneCallUrl}
                aria-label="Call support"
                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-full flex items-center justify-center shadow-md transition-all border border-white/20"
              >
                <Phone className="w-5 h-5 text-white" />
              </a>

              {/* WhatsApp Icon */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-12 h-12 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full flex items-center justify-center shadow-md transition-all border border-white/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.705 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.156 4.223 4.899-1.254zm11.605-7.441c-.244-.122-1.444-.712-1.668-.793-.223-.081-.386-.122-.549.123-.163.244-.63.793-.772.956-.143.163-.285.183-.529.061-.244-.122-1.033-.381-1.968-1.214-.727-.648-1.218-1.449-1.36-1.693-.143-.244-.015-.376.107-.497.11-.11.244-.285.366-.427.122-.143.163-.244.244-.407.081-.163.041-.305-.02-.427-.061-.122-.549-1.32-.752-1.808-.198-.476-.399-.412-.549-.42-.143-.007-.305-.008-.468-.008-.163 0-.427.061-.65.305-.224.244-.854.834-.854 2.034 0 1.2.874 2.359.996 2.522.122.163 1.721 2.628 4.169 3.684.583.252 1.038.402 1.393.515.586.187 1.119.16 1.541.097.471-.07 1.444-.59 1.648-1.16.203-.57.203-1.057.142-1.16-.061-.101-.223-.162-.467-.284z" />
                </svg>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Help Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Support Options"
          className="w-14 h-14 bg-primary hover:bg-primary/95 text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white/20 active:scale-95 transition-all cursor-pointer"
        >
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Headphones className="w-6 h-6 text-white" />}
        </button>
      </div>
    </>
  );
}
