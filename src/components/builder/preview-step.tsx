"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useBuilderStore } from "@/store/builder-store";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { TEMPLATE_COMPONENTS, DEFAULT_TEMPLATE } from "@/lib/templates";
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Download,
  Sparkles,
  Zap,
  ShieldCheck,
  Smartphone,
  Loader2,
  Check,
  X,
  FileText,
  Image as ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { domToPng } from "modern-screenshot";
import jsPDF from "jspdf";

interface FormatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFormat: (format: "image" | "pdf", isPaid: boolean) => void;
  isAlreadyPaid: boolean;
}

function FormatModal({ isOpen, onClose, onSelectFormat, isAlreadyPaid }: FormatModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4 transition-all duration-300">
      <div className="bg-gradient-to-b from-white to-zinc-50 rounded-[2.5rem] border-2 border-primary/15 shadow-[0_25px_60px_-15px_rgba(67,9,23,0.3)] w-full max-w-xl overflow-hidden flex flex-col p-6 sm:p-8 relative transition-all transform scale-100">
        
        {/* Header Ribbon Glow */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-rose-500 to-primary" />

        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-950 transition-colors p-1.5 rounded-full hover:bg-zinc-100 cursor-pointer"
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-8 mt-4">
          <span className="inline-flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10">
            <Sparkles size={11} className="text-primary animate-pulse" />
            {isAlreadyPaid ? "Direct Download Access" : "Premium Design Export"}
          </span>
          <h3 className="text-2xl font-black text-zinc-900 mt-4 mb-2 tracking-tight">
            {isAlreadyPaid ? "Download Ready" : "Get Your Biodata"}
          </h3>
          <p className="text-zinc-500 text-xs font-medium leading-relaxed max-w-xs mx-auto">
            {isAlreadyPaid 
              ? "You have already paid. Choose your format below to export watermark-free files." 
              : "Choose your format below to export in premium watermark-free quality."}
          </p>
        </div>

        <div className="space-y-5">
          {/* PRICING & TIER DETAILS (Only shown if not already paid) */}
          {!isAlreadyPaid && (
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/[0.03] to-rose-500/[0.03] rounded-2xl border border-primary/10">
              <div className="text-left">
                <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest block mb-0.5">Special Pricing</span>
                <span className="text-sm font-black text-zinc-800">Watermark-Free Copy</span>
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-rose-600 text-white font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-md shadow-rose-500/10 flex items-center gap-1.5">
                ₹49 ONLY
              </div>
            </div>
          )}

          {/* TWO ROW-BASED OPTION BUTTONS */}
          <div className="flex flex-col gap-4">
            {/* Image Option Row (First) */}
            <button
              onClick={() => onSelectFormat("image", !isAlreadyPaid)}
              className="group relative flex items-center justify-between p-5 bg-white hover:bg-gradient-to-r hover:from-white hover:to-sky-500/[0.02] border-2 border-zinc-100 hover:border-primary rounded-[1.8rem] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 outline-none text-left w-full border-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                  <ImageIcon size={22} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-black text-zinc-950 text-[15px] leading-tight mb-0.5 group-hover:text-primary transition-colors">
                    Download PNG Image Format
                  </h4>
                  <p className="text-zinc-500 text-xs font-semibold leading-normal">
                    Best for instant sharing on WhatsApp
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end pl-2">
                <span className="px-2.5 py-1 bg-sky-500/10 text-sky-600 text-[8px] font-black uppercase tracking-wider rounded-md whitespace-nowrap">
                  PNG Photo
                </span>
                <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mt-1.5 group-hover:text-zinc-500 whitespace-nowrap">
                  No Watermark
                </span>
              </div>
            </button>

            {/* PDF Option Row (Second) */}
            <button
              onClick={() => onSelectFormat("pdf", !isAlreadyPaid)}
              className="group relative flex items-center justify-between p-5 bg-white hover:bg-gradient-to-r hover:from-white hover:to-rose-500/[0.02] border-2 border-zinc-100 hover:border-primary rounded-[1.8rem] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 outline-none text-left w-full border-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                  <FileText size={22} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-black text-zinc-950 text-[15px] leading-tight mb-0.5 group-hover:text-primary transition-colors">
                    Download A4 PDF Format
                  </h4>
                  <p className="text-zinc-500 text-xs font-semibold leading-normal">
                    Perfect for high-quality printing (Print-Ready)
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end pl-2">
                <span className="px-2.5 py-1 bg-rose-500/10 text-rose-600 text-[8px] font-black uppercase tracking-wider rounded-md whitespace-nowrap">
                  PDF File
                </span>
                <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mt-1.5 group-hover:text-zinc-500 whitespace-nowrap">
                  No Watermark
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Footer Features */}
        <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1">🔒 Secure Payment</span>
          <span className="flex items-center gap-1">⚡ Instant Download</span>
        </div>
      </div>
    </div>
  );
}

interface CheckoutContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { email: string; mobile: string }) => void;
  isProcessing: boolean;
  paymentError?: string | null;
  onRetry?: () => void;
}

function CheckoutContactModal({
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
  paymentError,
  onRetry
}: CheckoutContactModalProps) {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !mobile) return;
    onConfirm({ email, mobile });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] border-2 border-primary/20 shadow-2xl w-full max-w-md overflow-hidden flex flex-col p-6 relative">
        <button onClick={onClose} disabled={isProcessing} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer">
          <X size={24} />
        </button>
        
        <div className="text-center mb-6 mt-2">
          <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10">
            Contact Details
          </span>
          <h3 className="text-xl font-black text-zinc-900 mt-4 mb-1 tracking-tight">Enter the Payment details</h3>
          <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Required for order verification & invoice delivery</p>
        </div>

        {paymentError && (
          <div className="mb-4 p-3.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-xs font-bold leading-relaxed flex flex-col gap-2">
            <p>❌ {paymentError}</p>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="mt-1 self-start px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                Retry Payment
              </button>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Email Address</label>
            <input
              type="email"
              required
              disabled={isProcessing}
              placeholder="e.g. aditya@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 h-12 rounded-xl border border-zinc-200 focus:outline-none focus:border-primary font-bold text-zinc-800"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Mobile Number</label>
            <input
              type="tel"
              required
              disabled={isProcessing}
              placeholder="e.g. 9876543210"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 h-12 rounded-xl border border-zinc-200 focus:outline-none focus:border-primary font-bold text-zinc-800"
            />
          </div>

          <Button
            type="submit"
            disabled={isProcessing || !email || !mobile}
            className="w-full h-14 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary text-white rounded-xl font-black text-base shadow-xl shadow-primary/10 transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer border-none"
          >
            {isProcessing ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Preparing Checkout...
              </>
            ) : (
              "Proceed to Payment (₹49)"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

interface CarouselTemplateCardProps {
  templateId: string;
  name: string;
  selectedTemplateId: string;
  onClick: () => void;
  isSuggested: boolean;
  isTemplateFree: boolean;
}

function CarouselTemplateCard({
  templateId,
  name,
  selectedTemplateId,
  onClick,
  isSuggested,
  isTemplateFree
}: CarouselTemplateCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardScale, setCardScale] = useState(0.18);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !cardRef.current) return;
    const updateScale = () => {
      if (cardRef.current) {
        const width = cardRef.current.clientWidth;
        setCardScale(width / 794);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    const timer = setTimeout(updateScale, 100);
    return () => {
      window.removeEventListener("resize", updateScale);
      clearTimeout(timer);
    };
  }, [isMounted]);

  const isSelected = selectedTemplateId === templateId;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      data-template-id={templateId}
      className={cn(
        "group relative shrink-0 w-[140px] sm:w-[160px] h-[198px] sm:h-[226px] m-1 rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer snap-center shadow-md",
        isSelected ? "border-primary shadow-xl scale-[1.02]" : "border-zinc-300 hover:border-zinc-400"
      )}
    >
      <div className="w-full h-full relative overflow-hidden bg-zinc-50 flex items-center justify-center pointer-events-none">
        {isMounted && TEMPLATE_COMPONENTS[templateId] ? (
          <div
            className="text-left text-zinc-800"
            style={{
              width: "794px",
              height: "1123px",
              transform: `scale(${cardScale})`,
              transformOrigin: "top left",
              position: "absolute",
              left: 0,
              top: 0,
              textAlign: "left"
            }}
          >
            {React.createElement(TEMPLATE_COMPONENTS[templateId])}
          </div>
        ) : (
          <div className="w-full h-full bg-zinc-200 animate-pulse" />
        )}
      </div>

      {/* Dynamic selection outline and checkmark */}
      {isSelected && (
        <div className="absolute inset-0 border-4 border-primary rounded-2xl pointer-events-none z-20 flex items-start justify-end p-2 bg-primary/5">
          <span className="bg-primary text-white p-1 rounded-full shadow-lg">
            <Check size={10} className="stroke-[4px]" />
          </span>
        </div>
      )}

      {isSuggested && !isSelected && (
        <span className="absolute top-2 left-2 px-2 py-0.5 bg-rose-500 text-white text-[8px] font-black uppercase tracking-wider rounded-md shadow-sm z-10 animate-pulse">
          Suggested
        </span>
      )}
      {isTemplateFree && !isSelected && (
        <span className="absolute top-2 right-2 px-2 py-0.5 bg-emerald-500 text-white text-[7px] font-black uppercase tracking-widest rounded-md shadow-sm z-10 transition-all">
          Free
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2.5 pt-6 pointer-events-none">
        <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-center text-white block truncate">
          {name}
        </span>
      </div>
    </div>
  );
}

export function PreviewStep() {
  const {
    selectedTemplateId,
    setTemplate,
    setStep,
    language,
    formData,
    profilePhotoUrl,
    godPhotoId,
    godNames,
    biodataTitle,
    setCheckoutInfo,
    selectedPlan,
    hasActivePackage,
    setHasActivePackage,
    checkActivePackage,
    currentBiodataId,
    setBiodataId
  } = useBuilderStore();

  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAdmin = searchParams?.get("admin") === "true";
  const { autoDownload, setAutoDownload } = useBuilderStore();

  const [dbTemplates, setDbTemplates] = useState<any[]>([]);

  const isFreeTemplate = useMemo(() => {
    const activeTemplate = dbTemplates.find(t => t.templateId === selectedTemplateId);
    if (activeTemplate) return activeTemplate.isFree;
    
    // Fallback if dbTemplates hasn't loaded yet
    return selectedTemplateId === "basic_template" ||
      selectedTemplateId === "basic-template" ||
      selectedTemplateId === "simple_leafy" ||
      selectedTemplateId === "simple-leafy";
  }, [dbTemplates, selectedTemplateId]);

  const [isMounted, setIsMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  // Auto-Download logic
  useEffect(() => {
    if (isMounted && autoDownload) {
      handleDownload();
      setAutoDownload(false); // Reset to prevent loops
    }
  }, [isMounted, autoDownload]);

  // Scroll to active template inside the carousel on load
  const hasScrolledRef = useRef(false);
  useEffect(() => {
    if (isMounted && selectedTemplateId && scrollRef.current && !hasScrolledRef.current) {
      const timer = setTimeout(() => {
        const container = scrollRef.current;
        if (!container) return;

        const activeCard = container.querySelector(`[data-template-id="${selectedTemplateId}"]`);
        if (activeCard) {
          hasScrolledRef.current = true; // Mark as scrolled so we do not auto-scroll on manual click changes
          const containerWidth = container.clientWidth;
          const cardLeft = (activeCard as HTMLElement).offsetLeft;
          const cardWidth = (activeCard as HTMLElement).clientWidth;

          container.scrollTo({
            left: cardLeft - (containerWidth / 2) + (cardWidth / 2),
            behavior: "smooth"
          });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isMounted, selectedTemplateId]);

  // Synchronize dynamic checkout grace memory from localStorage
  useEffect(() => {
    if (!isMounted) return;
    
    const checkGracePurchase = () => {
      try {
        const stored = localStorage.getItem("vaduvara_active_purchase");
        if (stored) {
          const purchase = JSON.parse(stored);
          const now = Date.now();
          
          if (now >= purchase.expiresAt) {
            // Past midnight - clear memory
            localStorage.removeItem("vaduvara_active_purchase");
            useBuilderStore.setState({ hasActivePackage: false });
          } else if (purchase.templateId === selectedTemplateId) {
            // Valid and matches selected template
            useBuilderStore.setState({ hasActivePackage: true });
          } else {
            // Valid but template ID changed - block free download
            useBuilderStore.setState({ hasActivePackage: false });
          }
        } else {
          // No stored purchase - require payment
          useBuilderStore.setState({ hasActivePackage: false });
        }
      } catch (err) {
        console.error("Grace memory verification failed:", err);
      }
    };

    checkGracePurchase();
  }, [isMounted, selectedTemplateId]);
  const [isFormatModalOpen, setIsFormatModalOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "image">("pdf");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [contactData, setContactData] = useState({ email: "", mobile: "" });

  const stageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-open FormatModal for Admin downloads
  const adminAutoOpenRef = useRef(false);
  useEffect(() => {
    if (isMounted && isAdmin && !adminAutoOpenRef.current) {
      adminAutoOpenRef.current = true;
      setIsFormatModalOpen(true);
    }
  }, [isMounted, isAdmin]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch('/api/templates');
        const data = await res.json();
        if (Array.isArray(data)) setDbTemplates(data);
      } catch (err) {
        console.error("Templates fetch failed", err);
      }
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const calculateScale = () => {
      if (!stageRef.current) return;

      const padding = window.innerWidth >= 640 ? 64 : 32; // sm:p-8 is 64px, p-4 is 32px
      const containerWidth = stageRef.current.clientWidth - padding;
      const containerHeight = stageRef.current.clientHeight - padding;

      if (containerWidth <= 0 || containerHeight <= 0) {
        // Safe fallback using window bounds if container is not yet fully measured
        const fallbackWidth = window.innerWidth - 64;
        const fallbackHeight = window.innerHeight * 0.45;
        const scaleX = fallbackWidth / 794;
        const scaleY = fallbackHeight / 1123;
        setScale(Math.max(Math.min(scaleX, scaleY, 1), 0.1));
        return;
      }

      const scaleX = containerWidth / 794;
      const scaleY = containerHeight / 1123;

      // Scale down to fit both dimensions perfectly without scroll or clipping
      const newScale = Math.min(scaleX, scaleY);
      setScale(Math.max(Math.min(newScale, 1), 0.1));
    };

    // Listen to container resize for perfect dynamic responsive behavior
    let resizeObserver: ResizeObserver | null = null;
    if (typeof window !== "undefined" && "ResizeObserver" in window && stageRef.current) {
      resizeObserver = new ResizeObserver(() => {
        calculateScale();
      });
      resizeObserver.observe(stageRef.current);
    }

    window.addEventListener('resize', calculateScale);
    calculateScale();

    // Trigger secondary calculation after mounting to handle initial CSS layout settled state
    const timer = setTimeout(calculateScale, 100);

    return () => {
      window.removeEventListener('resize', calculateScale);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      clearTimeout(timer);
    };
  }, []);

  const SelectedTemplate = useMemo(() => {
    return TEMPLATE_COMPONENTS[selectedTemplateId] || DEFAULT_TEMPLATE;
  }, [selectedTemplateId]);

  const sortedTemplates = useMemo(() => {
    if (!dbTemplates.length) return [];

    const userReligion = (useBuilderStore.getState().religion || "Hindu").trim().toLowerCase();

    // Scan all form fields text to infer gender accurately
    const allValuesText = Object.values(formData).join(" ").toLowerCase();
    const isGirl = allValuesText.includes("female") || allValuesText.includes("girl") || allValuesText.includes("bride") || allValuesText.includes("gromette");
    const isBoy = allValuesText.includes("male") || allValuesText.includes("boy") || allValuesText.includes("groom");
    const userGender = isGirl ? "GIRL" : (isBoy ? "BOY" : "BOTH");

    return [...dbTemplates].map(t => {
      let score = 1;

      const tCommunities = (t.community || "Hindu").trim().toLowerCase().split(',').map((c: string) => c.trim());
      const tGender = t.gender || "BOTH";

      const religionMatch = tCommunities.some((c: string) => userReligion.includes(c) || c.includes(userReligion));
      const genderMatch = (tGender === "BOTH") || (tGender === userGender);

      if (religionMatch && genderMatch) {
        score = 4;
      } else if (religionMatch) {
        score = 3;
      } else if (genderMatch) {
        score = 2;
      } else {
        score = 0;
      }

      // Boost matching community even higher
      const isUserMuslim = userReligion.includes("muslim") || userReligion.includes("islam");
      const isTemplateMuslim = tCommunities.includes("muslim");
      if (isUserMuslim && isTemplateMuslim) {
        score += 5;
      } else if (!isUserMuslim && isTemplateMuslim) {
        score -= 2;
      }

      return { ...t, score };
    }).sort((a, b) => b.score - a.score || a.order - b.order);
  }, [dbTemplates, formData]);

  const handleDownloadClick = () => {
    if (isFreeTemplate) {
      // Free templates download immediately as PDF with watermark, no saving
      handleDownload(false, "pdf");
    } else {
      // Premium templates open the format selector modal
      setIsFormatModalOpen(true);
    }
  };

  const handleFormatSelect = (format: "pdf" | "image", isPaid: boolean) => {
    setSelectedFormat(format);
    setIsFormatModalOpen(false);
    
    if (isPaid) {
      setPaymentError(null);
      setIsContactOpen(true);
    } else {
      // Free download with watermark
      handleDownload(false, format);
    }
  };

  const handlePaymentConfirm = async (data: { email: string; mobile: string }) => {
    setIsProcessingPayment(true);
    setPaymentError(null);
    setContactData(data);
    try {
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format: selectedFormat,
          email: data.email,
          mobile: data.mobile,
          biodata: {
            id: currentBiodataId || undefined,
            title: biodataTitle,
            data: {
              ...formData,
              profilePhotoUrl,
              religion: useBuilderStore.getState().religion,
              godPhotoId: useBuilderStore.getState().godPhotoId,
              godNames: useBuilderStore.getState().godNames,
              stepHeadings: useBuilderStore.getState().stepHeadings,
              stepFields: useBuilderStore.getState().stepFields,
              fieldSettings: useBuilderStore.getState().fieldSettings,
            },
            template: selectedTemplateId,
            language: language,
          }
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Failed to create order");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "VADHUVAR BIODATA",
        description: `Premium Biodata Download (${selectedFormat.toUpperCase()})`,
        order_id: orderData.id,
        handler: async (response: any) => {
          setIsProcessingPayment(true);
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                email: data.email,
                mobile: data.mobile,
                biodataId: orderData.biodataId
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              toast.success("Payment successful!");
              setIsContactOpen(false);
              
              // Set the grace checkout memory in localStorage expiring at midnight
              const nextMidnight = new Date();
              nextMidnight.setHours(24, 0, 0, 0);
              localStorage.setItem("vaduvara_active_purchase", JSON.stringify({
                templateId: selectedTemplateId,
                expiresAt: nextMidnight.getTime()
              }));
              useBuilderStore.setState({ hasActivePackage: true });

              // Trigger watermark-free download
              handleDownload(true, selectedFormat);
            } else {
              throw new Error(verifyData.error || "Verification failed");
            }
          } catch (err: any) {
            console.error("Payment verification error:", err);
            setPaymentError(err.message || "Payment verification failed. Please contact support.");
          } finally {
            setIsProcessingPayment(false);
          }
        },
        prefill: { email: data.email, contact: data.mobile },
        theme: { color: "#430917" },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false);
            setPaymentError("Payment checkout cancelled. You can retry below.");
          }
        }
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error("Payment initialization error:", error);
      setPaymentError(error.message || "Payment initialization failed. Please try again.");
      setIsProcessingPayment(false);
    }
  };

  const handleDownload = async (isPaidOverride = false, formatType: "pdf" | "image" = "pdf") => {
    setIsDownloading(true);
    try {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

      // MODERN SNAPSHOT LOGIC
      const templateElement = document.getElementById("biodata-template");
      if (!templateElement) {
        toast.error("Template not found");
        setIsDownloading(false);
        return;
      }

      // Wait for layout and images to fully settle
      await new Promise(resolve => setTimeout(resolve, 800));

      // DYNAMIC HEIGHT LOGIC
      const width = templateElement.offsetWidth;
      const height = templateElement.offsetHeight;

      // Add watermark only to free templates
      const needWatermark = isFreeTemplate;

      let watermarkEl: HTMLDivElement | null = null;
      let diagonalWatermarkEl: HTMLDivElement | null = null;

      if (needWatermark) {
        // 1. Bottom signature watermark
        watermarkEl = document.createElement("div");
        watermarkEl.id = "mywedprofile-download-watermark";
        watermarkEl.style.position = "absolute";
        watermarkEl.style.bottom = "12px";
        watermarkEl.style.left = "0";
        watermarkEl.style.right = "0";
        watermarkEl.style.textAlign = "center";
        watermarkEl.style.fontFamily = "system-ui, -apple-system, sans-serif";
        watermarkEl.style.fontSize = "9px";
        watermarkEl.style.fontWeight = "bold";
        watermarkEl.style.letterSpacing = "0.25em";
        watermarkEl.style.color = "rgba(0, 0, 0, 0.28)"; // Subtle, elegant and professional
        watermarkEl.style.textTransform = "uppercase";
        watermarkEl.style.zIndex = "999";
        watermarkEl.style.pointerEvents = "none";
        watermarkEl.innerHTML = "Created via www.vadhuvarbiodata.com";
        templateElement.appendChild(watermarkEl);

        // 2. Diagonal repeating watermark (exact on-screen replica for PDF printing)
        diagonalWatermarkEl = document.createElement("div");
        diagonalWatermarkEl.id = "mywedprofile-download-diagonal-watermark";
        diagonalWatermarkEl.style.position = "absolute";
        diagonalWatermarkEl.style.inset = "0";
        diagonalWatermarkEl.style.display = "flex";
        diagonalWatermarkEl.style.flexDirection = "column";
        diagonalWatermarkEl.style.alignItems = "center";
        diagonalWatermarkEl.style.justifyContent = "space-around";
        diagonalWatermarkEl.style.opacity = "0.10"; // Elegant opacity for high quality print legibility
        diagonalWatermarkEl.style.zIndex = "999";
        diagonalWatermarkEl.style.pointerEvents = "none";
        diagonalWatermarkEl.style.overflow = "hidden";

        for (let i = 0; i < 3; i++) {
          const textEl = document.createElement("div");
          textEl.style.fontSize = "25px";
          textEl.style.fontWeight = "900";
          textEl.style.color = "#000000";
          textEl.style.transform = "rotate(-45deg)";
          textEl.style.whiteSpace = "nowrap";
          textEl.style.letterSpacing = "0.2em";
          textEl.style.textTransform = "uppercase";
          textEl.style.userSelect = "none";
          textEl.innerHTML = "vadhuvarbiodata.com";
          diagonalWatermarkEl.appendChild(textEl);
        }
        templateElement.appendChild(diagonalWatermarkEl);
      }

      const imgData = await domToPng(templateElement, {
        width,
        height,
        scale: 3.0, // Optimized for 300 DPI balance
        filter: (node: any) => {
          if (node.classList && node.classList.contains('no-print')) return false;
          return true;
        }
      });

      // Instantly remove watermark elements so preview screen remains clean
      if (watermarkEl && templateElement.contains(watermarkEl)) {
        templateElement.removeChild(watermarkEl);
      }
      if (diagonalWatermarkEl && templateElement.contains(diagonalWatermarkEl)) {
        templateElement.removeChild(diagonalWatermarkEl);
      }

      if (formatType === "image") {
        const link = document.createElement("a");
        link.download = `${formData.fullName || 'Marriage_Biodata'}.png`;
        link.href = imgData;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Calculate PDF height in mm to match the A4 width (210mm) but dynamic height
        const pdfHeightMm = (height * 210) / width;

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: [210, pdfHeightMm],
          compress: true
        });

        pdf.addImage(imgData, "PNG", 0, 0, 210, pdfHeightMm, undefined, 'FAST');
        pdf.save(`${formData.fullName || 'Marriage_Biodata'}.pdf`);
      }

      toast.success("Biodata downloaded!");
      setIsDownloading(false);
    } catch (err) {
      console.error("DOWNLOAD ERROR:", err);
      toast.error("Download failed. Please try again.");
      setIsDownloading(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!isMounted) return null;

  return (
    <div className="container mx-auto px-4 md:px-8 flex flex-col items-center h-full max-h-screen overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-8 w-full flex-1 min-h-0 items-stretch pb-12 lg:pb-8 overflow-y-auto lg:overflow-hidden no-scrollbar">
        {/* Left: THE PREVIEW STAGE */}
        <div className="flex-1 w-full flex flex-col min-h-[450px] lg:min-h-0 relative min-w-0">
          <div
            ref={stageRef}
            className="flex-1 w-full flex items-center justify-center overflow-x-auto lg:overflow-hidden bg-white p-4 sm:p-8 rounded-[2.5rem] border-2 border-primary/20 min-h-0"
          >
            <div
              className="relative bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] overflow-hidden shrink-0 border border-zinc-200"
              style={{
                width: `${794 * scale}px`,
                height: `${1123 * scale}px`
              }}
            >
              <div
                style={{
                  width: '794px',
                  height: '1123px',
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  position: 'absolute',
                  left: 0,
                  top: 0
                }}
              >
                <SelectedTemplate />
              </div>
              <div className="absolute inset-0 pointer-events-none overflow-hidden flex flex-col items-center justify-around opacity-[0.12] z-[100] no-print diagonal-watermark">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="text-[25px] font-black text-black rotate-[-45deg] whitespace-nowrap tracking-[0.2em] select-none uppercase">
                    vadhuvarbiodata.com
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-[2px] py-2 overflow-hidden z-[120] no-print">
                <div className="whitespace-nowrap animate-marquee">
                  <div className="inline-block text-[12px] font-black text-white/80 tracking-widest uppercase">
                    <span className="mx-8">⚡ Watermark removed in download</span>
                    <span className="mx-8">⚡ High Resolution A4 Print PDF Download</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: CONTROL CENTER */}
        <div className="flex-1 w-full flex flex-col min-w-0">
          <div className="flex-1 bg-white rounded-[2.5rem] p-6 lg:p-10 border-2 border-primary/20 flex flex-col gap-6 lg:gap-8 overflow-y-auto no-scrollbar min-h-0">
            <div className="flex items-center justify-between shrink-0">
              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-zinc-900 tracking-tight flex items-center gap-2 text-primary">
                  <Sparkles className="text-primary" size={20} />
                  Choose Template
                </h3>
                <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-[0.2em]">Select Style Below</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => scroll('left')} className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center border hover:bg-primary/40 cursor-pointer shadow-sm transition-all"><ChevronLeft size={18} /></button>
                <button onClick={() => scroll('right')} className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center border hover:bg-primary/40 cursor-pointer shadow-sm transition-all"><ChevronRight size={18} /></button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x shrink-0"
            >
              {sortedTemplates.map((template) => {
                const isSuggested = template.score >= 4;
                const isTemplateFree = template.isFree;
                return (
                  <CarouselTemplateCard
                    key={template.templateId}
                    templateId={template.templateId}
                    name={template.name}
                    selectedTemplateId={selectedTemplateId}
                    onClick={() => setTemplate(template.templateId)}
                    isSuggested={isSuggested}
                    isTemplateFree={isTemplateFree}
                  />
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-3 py-6 border-t border-zinc-50 shrink-0">
              {[
                { icon: Zap, t: "Instant Preview", s: "Real-time updates" },
                { icon: ShieldCheck, t: "Official Brand Footer", s: "vadhuvarbiodata.com" },
                { icon: Smartphone, t: "Mobile Ready", s: "Print-ready PDF" },
                { icon: Sparkles, t: "Smart Icons", s: "Premium assets" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-zinc-50/50 rounded-xl border border-zinc-100">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                    <item.icon size={16} />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-black text-zinc-800 uppercase tracking-tight">{item.t}</p>
                    <p className="text-[8px] text-zinc-400 font-bold">{item.s}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-zinc-100 shrink-0">
              <Button onClick={() => { setStep(1); router.push('/#create-biodata'); }}
                className="w-full sm:w-auto px-6 py-6 bg-white border-2 border-primary/20 text-primary rounded-xl font-bold transition-all shadow-sm"
              >
                <Pencil size={18} />
                <span>Edit Biodata</span>
              </Button>

              <Button onClick={handleDownloadClick}
                disabled={isDownloading}
                className="w-full sm:flex-1 px-6 py-6 bg-primary text-white rounded-xl font-bold transition-all shadow-md group"
              >
                {isDownloading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
                <span>{isDownloading ? "Generating..." : "Download Biodata"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <FormatModal
        isOpen={isFormatModalOpen}
        onClose={() => setIsFormatModalOpen(false)}
        onSelectFormat={handleFormatSelect}
        isAlreadyPaid={hasActivePackage}
      />

      <CheckoutContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onConfirm={handlePaymentConfirm}
        isProcessing={isProcessingPayment}
        paymentError={paymentError}
        onRetry={() => handlePaymentConfirm(contactData)}
      />
    </div>
  );
}
