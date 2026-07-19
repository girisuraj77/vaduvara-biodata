"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary";
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary",
}: ConfirmationModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Light Glassmorphism */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/20 backdrop-blur-[8px] z-[10000]"
          />

          {/* Modal Container - Absolute Centering */}
          <div className="fixed inset-0 flex items-center justify-center z-[10001] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-zinc-100 w-full max-w-md overflow-hidden pointer-events-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${variant === "danger" ? "bg-red-50 text-red-500" : "bg-primary/10 text-primary"
                    }`}>
                    <AlertCircle size={24} />
                  </div>
                  <button
                    onClick={onClose}
                    className="text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <h3 className="text-xl font-extrabold text-zinc-800 mb-2">
                  {title}
                </h3>
                <p className="text-zinc-500 font-medium leading-relaxed">
                  {message}
                </p>
              </div>

              <div className="flex items-center gap-3 p-6 bg-zinc-50 border-t border-zinc-100">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 rounded-xl h-12 font-bold border-2"
                >
                  {cancelText}
                </Button>
                <Button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 rounded-xl h-12 font-bold shadow-lg transition-all ${variant === "danger"
                      ? "bg-red-500 hover:bg-red-600 shadow-red-200 text-white"
                      : "bg-primary hover:bg-primary/90 shadow-primary/20 text-white"
                    }`}
                >
                  {confirmText}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
