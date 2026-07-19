"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 mx-4",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-zinc-100">
          <h3 className="text-xl font-extrabold text-zinc-900 ml-1 tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} className="text-zinc-400" />
          </button>
        </div>
        <div className="relative bg-white overflow-y-auto max-h-[85vh]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
