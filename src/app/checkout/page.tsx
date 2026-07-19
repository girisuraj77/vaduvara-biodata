"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldCheck, CreditCard, Sparkles, ArrowLeft, Loader2, Package, Lock, Zap, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useBuilderStore } from "@/store/builder-store";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { setAuthModal } = useBuilderStore();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const planId = searchParams.get("planId");

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const res = await fetch('/api/packages');
        const data = await res.json();
        const plan = data.packages.find((p: any) => p.id === planId);
        if (plan) {
          setSelectedPlan(plan);
        } else {
          // Fallback if plan not found in dynamic data
          const fallbacks: any = {
            basic: { id: "basic", name: "Basic Plan", price: 49, features: ["1 Biodata Profile", "5 PDF Downloads"] },
            standard: { id: "standard", name: "Standard Plan", price: 149, features: ["5 Biodata Profiles", "15 PDF Downloads"] },
            premium: { id: "premium", name: "Premium Plan", price: 299, features: ["15 Biodata Profiles", "50 PDF Downloads"] },
          };
          setSelectedPlan(fallbacks[planId || "basic"]);
        }
      } catch (err) {
        console.error("Failed to fetch plan", err);
      }
    };
    if (planId) fetchPlanDetails();
  }, [planId]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!session || !selectedPlan) return;
    setIsProcessing(true);
    setPaymentError(null);

    try {
      const res = await loadRazorpay();
      if (!res) {
        setPaymentError("Payment system failed to load. Please check your internet connection.");
        setIsProcessing(false);
        return;
      }

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: selectedPlan.id }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) throw new Error(orderData.error || "Order creation failed");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "Marriage Profile",
        description: `Upgrade to ${selectedPlan.name}`,
        order_id: orderData.id,
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              email: session.user?.email,
            }),
          });

          if (verifyRes.ok) {
            router.push("/dashboard?status=success&plan=" + selectedPlan.name);
          } else {
            setPaymentError("Payment verification failed. If money was debited, it will be refunded in 5-7 days.");
          }
        },
        modal: {
          ondismiss: function () {
            setPaymentError("Payment was cancelled. You can try again whenever you're ready.");
            setIsProcessing(false);
          }
        },
        prefill: {
          name: session.user?.name || "",
          email: session.user?.email || "",
        },
        theme: { color: "#d60d2c" },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err: any) {
      console.error(err);
      setPaymentError(err.message || "An unexpected error occurred during checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (status === "loading" || !selectedPlan) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Lock size={20} className="text-primary/40" />
          </div>
        </div>
        <p className="text-zinc-400 font-black uppercase tracking-[0.3em] text-[10px]">Initializing Secure Checkout</p>
      </div>
    );
  }

  // Handle Unauthenticated State within the page
  if (status === "unauthenticated") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3rem] p-12 border border-zinc-100 shadow-2xl shadow-zinc-200/40"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8">
            <User size={40} />
          </div>
          <h2 className="text-3xl font-black text-zinc-900 mb-4 tracking-tight">Login Required</h2>
          <p className="text-zinc-500 font-medium mb-10 leading-relaxed">
            Please login to your account to complete the purchase of <span className="text-zinc-900 font-bold">{selectedPlan.name}</span>.
          </p>
          <Button
            onClick={() => {
              const currentUrl = window.location.pathname + window.location.search;
              window.history.replaceState(null, "", `?redirect=${encodeURIComponent(currentUrl)}`);
              setAuthModal(true, "login");
            }}
            className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20 transition-all"
          >
            Login to Continue
          </Button>
          <p className="mt-6 text-zinc-400 text-xs font-bold">Secure Authentication via MyWedProfile</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
          <Link href="/pricing" className="group w-12 h-12 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all shadow-sm">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-4xl font-black text-zinc-900 tracking-tight">Complete <span className="text-primary italic">Upgrade</span></h1>
            <p className="text-zinc-500 font-bold text-sm">Secure checkout for {selectedPlan.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-green-50 rounded-2xl border border-green-100">
          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
            <ShieldCheck size={18} />
          </div>
          <span className="text-green-700 font-black text-xs uppercase tracking-widest">Bank-Level Security</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Details */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] border border-zinc-100 shadow-2xl shadow-zinc-200/40 overflow-hidden"
          >
            <div className="p-10 border-b border-zinc-50 bg-zinc-50/30">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <Package size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">Selected Package</p>
                    <h3 className="text-2xl font-black text-zinc-900">{selectedPlan.name}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">One-Time Price</p>
                  <p className="text-3xl font-black text-primary">₹{selectedPlan.price}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Zap size={14} className="text-yellow-400" /> Instant Activation
                </div>
                <div className="px-4 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-600 text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Sparkles size={14} className="text-primary" /> Premium Access
                </div>
              </div>
            </div>

            <div className="p-10">
              <h4 className="text-xs font-black text-zinc-400 uppercase tracking-[0.3em] mb-8">What's included in your plan</h4>
              <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
                {selectedPlan.features.map((feature: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center text-green-500 mt-0.5 flex-shrink-0 border border-green-100">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-700 leading-tight">{feature}</p>
                      <p className="text-[10px] font-medium text-zinc-400">Professional Grade</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="p-8 rounded-[2.5rem] bg-primary/5 text-zinc-900 relative overflow-hidden group border border-primary/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            <div className="flex gap-6 items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                <Lock size={22} />
              </div>
              <div>
                <h4 className="font-black text-lg mb-1">Encrypted Checkout</h4>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                  We use 256-bit SSL encryption to ensure your data is 100% safe. Payments are powered by Razorpay, India's most trusted payment gateway.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Payment Box */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-50 rounded-[3rem] border border-zinc-200 p-10 sticky top-24 shadow-sm"
          >
            <h3 className="text-xl font-black text-zinc-900 mb-8">Payment Summary</h3>

            <div className="space-y-5 mb-10">
              <div className="flex justify-between items-center text-zinc-500 font-bold text-sm">
                <span>Plan Subtotal</span>
                <span>₹{selectedPlan.price}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-500 font-bold text-sm">
                <span>GST (Incl.)</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between items-center font-bold text-sm text-green-600">
                <span>Processing Fee</span>
                <span>FREE</span>
              </div>

              <div className="h-px bg-zinc-200 my-6" />

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Final Amount</p>
                  <p className="text-4xl font-black text-zinc-900 tracking-tighter">₹{selectedPlan.price}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-1">Secure</span>
                  <p className="text-[10px] font-bold text-zinc-400 italic leading-none">All inclusive</p>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {paymentError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3 items-start overflow-hidden"
                >
                  <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X size={12} strokeWidth={3} />
                  </div>
                  <p className="text-xs font-bold text-red-600 leading-relaxed">{paymentError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              disabled={isProcessing}
              onClick={handlePayment}
              className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/95 text-white font-black text-lg shadow-xl shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 group"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Processing...
                </>
              ) : (
                <>
                  <CreditCard size={20} className="group-hover:rotate-12 transition-transform" /> Confirm & Pay Now
                </>
              )}
            </Button>

            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-4 opacity-40 grayscale">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Visa_2014_logo_detail.svg" alt="Visa" className="h-3" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" alt="UPI" className="h-3" />
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <ShieldCheck size={12} />
                <p className="text-[9px] font-black uppercase tracking-[0.2em]">PCI-DSS Compliant Gateway</p>
              </div>
            </div>
          </motion.div>

          <p className="mt-6 text-center text-zinc-400 text-[11px] font-medium leading-relaxed px-8">
            By clicking "Confirm & Pay Now," you agree to our <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main className="bg-white min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />

      <Suspense fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-12 h-12 text-primary/20 animate-spin" />
        </div>
      }>
        <CheckoutContent />
      </Suspense>
    </main>
  );
}
