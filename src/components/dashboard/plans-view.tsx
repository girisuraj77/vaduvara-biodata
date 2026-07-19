"use client";

import React from "react";
import { CreditCard, CheckCircle2, Clock, AlertCircle, History, Sparkles, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PlansViewProps {
  activePackage: any;
  allPackages: any[];
  onUpgrade: () => void;
}

export function PlansView({ activePackage, allPackages, onUpgrade }: PlansViewProps) {
  const isExpired = activePackage && new Date(activePackage.endDate) < new Date();
  const isDownloadLimitReached = activePackage && activePackage.downloadsUsed >= activePackage.downloadLimit;
  const isBiodataLimitReached = activePackage && activePackage.biodataUsed >= activePackage.biodataLimit;
  
  const daysRemaining = activePackage 
    ? Math.ceil((new Date(activePackage.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const isExpiringSoon = !isExpired && daysRemaining > 0 && daysRemaining <= 7;
  
  const showUpgrade = !activePackage || isExpired || isDownloadLimitReached || isBiodataLimitReached || isExpiringSoon;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB'); // dd/mm/yyyy
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-black text-zinc-900 tracking-tight">My Plans</h2>
      </div>

      {/* Current Active Plan Card - MADE SMALLER */}
      <div className="max-w-md">
        <div className="bg-white rounded-3xl p-6 text-zinc-900 relative overflow-hidden shadow-lg border border-zinc-100">
          {/* Decorative Background */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.15em] mb-0.5">Plan Status</p>
                <h2 className="text-lg font-black tracking-tight flex items-center gap-2 text-zinc-900">
                  {activePackage?.name || "No Active Plan"}
                  {activePackage && !isExpired && !isDownloadLimitReached && !isBiodataLimitReached && <CheckCircle2 size={16} className="text-primary" />}
                  {(isExpired || isDownloadLimitReached || isBiodataLimitReached || isExpiringSoon) && <AlertCircle size={16} className="text-red-500" />}
                </h2>
              </div>
              <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-100 shadow-sm">
                <CreditCard className="text-primary" size={20} />
              </div>
            </div>

            {activePackage ? (
              <>
                {/* Status Message for Expired/Limit Reached/Expiring Soon */}
                {(isExpired || isDownloadLimitReached || isBiodataLimitReached || isExpiringSoon) && (
                  <div className={cn(
                    "mb-5 p-3 border rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2",
                    isExpiringSoon ? "bg-amber-50 border-amber-100" : "bg-red-50 border-red-100"
                  )}>
                    <Sparkles size={14} className={cn(isExpiringSoon ? "text-amber-500" : "text-red-500", "shrink-0")} />
                    <p className={cn("text-[9px] font-black leading-tight", isExpiringSoon ? "text-amber-700" : "text-red-700")}>
                      {isExpired
                        ? "Plan expired. Renew now for access."
                        : isExpiringSoon
                        ? `Plan is going to expire in ${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'}.`
                        : "Limit reached. Upgrade for more."}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                  <div className="space-y-0.5">
                    <p className="text-zinc-400 text-[8px] font-black uppercase tracking-wider flex items-center gap-1">
                      <FileText size={8} /> Creation
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className={cn(
                        "text-xl font-black",
                        isBiodataLimitReached ? "text-red-500" : "text-zinc-900"
                      )}>
                        {activePackage.biodataUsed}
                      </span>
                      <span className="text-zinc-400 font-bold text-[9px]">/{activePackage.biodataLimit}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-0.5">
                    <p className="text-zinc-400 text-[8px] font-black uppercase tracking-wider flex items-center gap-1">
                      <Download size={8} /> Downloads
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className={cn(
                        "text-xl font-black",
                        isDownloadLimitReached ? "text-red-500" : "text-zinc-900"
                      )}>
                        {activePackage.downloadsUsed}
                      </span>
                      <span className="text-zinc-400 font-bold text-[9px]">/{activePackage.downloadLimit}</span>
                    </div>
                  </div>
                </div>

                {/* Compact Progress Section */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center px-1">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className={cn("w-1.5 h-1.5 rounded-full", isBiodataLimitReached ? "bg-red-500" : "bg-primary")} />
                        <span className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter">Creation</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className={cn("w-1.5 h-1.5 rounded-full", isDownloadLimitReached ? "bg-red-500" : "bg-zinc-900")} />
                        <span className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter">Download</span>
                      </div>
                    </div>
                    <div className={cn("flex items-center gap-1", isExpiringSoon ? "text-amber-500" : "text-zinc-400")}>
                      <Clock size={10} />
                      <span className="text-[9px] font-black">{formatDate(activePackage.endDate)}</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden flex">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (activePackage.biodataUsed / activePackage.biodataLimit) * 50)}%` }}
                      className={cn("h-full", isBiodataLimitReached ? "bg-red-500" : "bg-primary")}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (activePackage.downloadsUsed / activePackage.downloadLimit) * 50)}%` }}
                      className={cn("h-full", isDownloadLimitReached ? "bg-red-400" : "bg-zinc-800")}
                    />
                  </div>
                </div>

                {showUpgrade && (
                  <Button
                    onClick={onUpgrade}
                    className="w-full rounded-xl h-11 bg-primary text-white hover:bg-primary/90 font-black text-xs transition-all active:scale-95 shadow-md shadow-primary/10 flex items-center justify-center gap-2"
                  >
                    <Sparkles size={14} />
                    Upgrade Now
                  </Button>
                )}
              </>
            ) : (
              <div className="py-4 text-center space-y-4">
                <p className="text-xs font-bold text-zinc-500 px-4">No active plan found. Choose a plan to get started.</p>
                <Button
                  onClick={onUpgrade}
                  className="w-full rounded-xl h-11 bg-primary text-white hover:bg-primary/90 font-black text-xs transition-all shadow-md"
                >
                  View Plans
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Plan History List */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500">
            <History size={18} />
          </div>
          <h3 className="text-lg font-black text-zinc-900 tracking-tight">Plan History</h3>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {allPackages.map((pkg) => {
            const pkgExpired = new Date(pkg.endDate) < new Date();
            const pkgLimitReached = pkg.downloadsUsed >= pkg.downloadLimit || pkg.biodataUsed >= pkg.biodataLimit;
            const isPkgActive = pkg.isActive && !pkgExpired && !pkgLimitReached;

            return (
              <div key={pkg.id} className="bg-white border border-zinc-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:border-zinc-200 transition-all">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center border",
                    isPkgActive ? "bg-primary/5 border-primary/10 text-primary" : "bg-zinc-50 border-zinc-100 text-zinc-400"
                  )}>
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-black text-zinc-900 leading-tight">{pkg.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-[9px] font-bold text-zinc-400 whitespace-nowrap">Purchased {formatDate(pkg.startDate)}</p>
                      <span className="w-1 h-1 bg-zinc-200 rounded-full" />
                      <p className="text-[9px] font-bold text-zinc-400 whitespace-nowrap">Expires {formatDate(pkg.endDate)}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1 justify-end">
                    <span className="text-xs font-black text-zinc-900">₹{pkg.price}</span>
                    <span className={cn(
                      "text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                      isPkgActive ? "bg-green-100 text-green-600" : "bg-zinc-100 text-zinc-400"
                    )}>
                      {isPkgActive ? "Active" : pkgExpired ? "Expired" : "Used"}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-2 text-[9px] font-bold text-zinc-400">
                    <span className="flex items-center gap-1"><FileText size={8} /> {pkg.biodataUsed}/{pkg.biodataLimit}</span>
                    <span className="flex items-center gap-1"><Download size={8} /> {pkg.downloadsUsed}/{pkg.downloadLimit}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {allPackages.length === 0 && (
            <div className="py-10 text-center bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
              <p className="text-xs font-bold text-zinc-400">No purchase history found.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
