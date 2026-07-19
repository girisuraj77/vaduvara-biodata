"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useBuilderStore } from "@/store/builder-store";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Family" },
  { id: 3, label: "Contact" },
];

export function Stepper() {
  const { currentStep } = useBuilderStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-center gap-4 md:gap-8">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = typeof currentStep === 'number' && currentStep > step.id;

          return (
            <div key={step.id} className="flex items-center gap-3">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isActive || isCompleted ? "var(--color-primary)" : "rgb(244 244 245)",
                  scale: isActive ? 1.1 : 1,
                }}
                className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-bold transition-colors shadow-sm",
                  isActive || isCompleted ? "text-white" : "text-zinc-500"
                )}
              >
                {isCompleted ? "✓" : step.id}
              </motion.div>
              <div className="hidden sm:block">
                <p className={cn(
                  "text-[13px] md:text-sm font-bold uppercase tracking-wider",
                  isActive ? "text-zinc-900" : "text-zinc-400"
                )}>
                  Step {step.id}
                </p>
                <p className={cn(
                  "text-[14px] md:text-[15px] font-medium leading-none",
                  isActive ? "text-zinc-700" : "text-zinc-400"
                )}>
                  {step.label}
                </p>
              </div>
              {step.id < 3 && (
                <div className="hidden md:block w-12 lg:w-20 h-0.5 bg-zinc-100 rounded-full overflow-hidden mx-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    className="h-full bg-primary"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Visual Indicator Line (Mobile) */}
      <div className="mt-8 h-1 w-full bg-zinc-100 rounded-full overflow-hidden max-w-md mx-auto sm:hidden">
        <motion.div
          animate={{ 
            width: currentStep === 'preview' 
              ? "100%" 
              : `${(Math.min(Math.max(Number(currentStep) || 1, 1), 3) / 3) * 100}%` 
          }}
          className="h-full bg-primary transition-all duration-500"
        />
      </div>
    </div>
  );
}
