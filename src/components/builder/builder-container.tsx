import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBuilderStore } from "@/store/builder-store";
import { Stepper } from "./stepper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, RotateCcw, AlertCircle } from "lucide-react";
import { LanguageSelector } from "./language-selector";
import { GodSelector } from "./god-selector";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";
import { StepThree } from "./step-three";
import { TransliterationSidebar } from "./transliteration-sidebar";
import { translations } from "@/lib/translations";
import { ConfirmationModal } from "./confirmation-modal";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export function BuilderContainer() {
  const { currentStep, setStep, resetForm, language, validationErrors, setValidationErrors, stepFields } = useBuilderStore();

  const router = useRouter();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const t = translations[language];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // If we land on home page and the store says 'preview', reset to step 1
    // because preview is now on a separate standalone page.
    if (currentStep === 'preview') {
      setStep(1);
    }
  }, []);

  const firstMount = useRef(true);

  // Scroll to top on step change
  useEffect(() => {
    if (isMounted) {
      if (firstMount.current) {
        firstMount.current = false;
        return;
      }
      document.getElementById('create-biodata')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStep, isMounted]);

  const handleNext = () => {
    const { formData, fieldSettings, stepFields, language, setValidationErrors } = useBuilderStore.getState();
    const t = translations[language] || translations.en;

    const isRequiredTextMap: Record<string, string> = {
      en: "is required",
      hi: "आवश्यक है",
      mr: "आवश्यक आहे",
      gu: "જરૂરી છે",
      kn: "ಅಗತ್ಯವಿದೆ",
      te: "అవసరం",
      ml: "ആവശ്യമാണ്",
      bn: "প্রয়োজন"
    };
    const isRequiredText = isRequiredTextMap[language] || "is required";

    const errors: Record<string, string> = {};

    if (currentStep === 1) {
      const fieldsToValidate = ['fullName', 'dob', 'height', 'birthPlace', 'religion', 'caste', 'blood', 'education', 'job', 'salary'];
      const step1Fields = stepFields[1];

      for (const id of fieldsToValidate) {
        const field = step1Fields.find(f => f.id === id);
        if (!field) continue;

        const isIncluded = fieldSettings[id]?.include ?? true;
        if (isIncluded) {
          const val = (formData[id] || "").trim();
          if (!val) {
            const label = field.customLabel || t[field.labelId] || field.labelId;
            errors[id] = `${label} ${isRequiredText}`;
          }
        }
      }
    } else if (currentStep === 2) {
      const fieldsToValidate = ['fatherName', 'fatherOccupation', 'motherName', 'motherOccupation', 'sisters', 'brothers'];
      const step2Fields = stepFields[2];

      for (const id of fieldsToValidate) {
        const field = step2Fields.find(f => f.id === id);
        if (!field) continue;

        const isIncluded = fieldSettings[id]?.include ?? true;
        if (isIncluded) {
          const val = (formData[id] || "").trim();
          if (!val) {
            const label = field.customLabel || t[field.labelId] || field.labelId;
            errors[id] = `${label} ${isRequiredText}`;
          }
        }
      }
    } else if (currentStep === 3) {
      const step3Fields = stepFields[3];

      for (const field of step3Fields) {
        const isIncluded = fieldSettings[field.id]?.include ?? true;
        if (isIncluded) {
          const val = (formData[field.id] || "").trim();
          if (!val) {
            const label = field.customLabel || t[field.labelId] || field.labelId;
            errors[field.id] = `${label} ${isRequiredText}`;
          }
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error(language === 'hi' ? "कृपया सभी आवश्यक फ़ील्ड भरें।" : language === 'mr' ? "कृपया सर्व आवश्यक फील्ड भरा." : "Please fill in all required fields.");
      document.getElementById('create-biodata')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setValidationErrors({});

    if (typeof currentStep === 'number' && currentStep < 3) {
      setStep((currentStep + 1) as any);
    } else {
      setStep('preview');
      router.push('/preview');
    }
  };

  const handleBack = () => {
    useBuilderStore.getState().setValidationErrors({});
    if (typeof currentStep === 'number' && currentStep > 1) {
      setStep((currentStep - 1) as any);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <section id="create-biodata"
        className="w-full py-6 sm:py-12 px-2 sm:px-4 relative bg-[#430917]/5"
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
          <div className="absolute top-0 left-0 w-full h-32 bg-primary/20 blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-0 w-full h-32 bg-primary/20 blur-3xl opacity-20" />
        </div>

        <div className="container mx-auto px-1 sm:px-4 max-w-[1600px] relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-zinc-800 mb-3 sm:mb-4 tracking-tight">
              Create Your <span className="text-primary italic">Marriage Biodata</span>
            </h2>
            <p className="text-zinc-500 font-medium max-w-2xl mx-auto text-xs sm:text-sm">
              Fill in your details, choose a template and download your print-ready PDF.
            </p>
            <div className="w-20 sm:w-24 h-1 bg-primary mx-auto mt-4 sm:mt-6 rounded-full opacity-30" />
          </div>


          <div className="flex justify-center w-full">
            <div className="relative w-full transition-all duration-500 max-w-4xl">
              {/* Main Builder Card */}
              <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-2xl sm:rounded-[2rem] p-3 sm:p-6 md:p-10">
                <Stepper />

                <div className="grid grid-cols-1 gap-8 mt-10">
                  {/* Step Content Wrapper with Animation */}
                  <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        {/* Step header with language and religion selectors - Only visible in Step 1 */}
                        {currentStep === 1 && (
                          <div
                            className="mb-10 p-8 rounded-2xl border-2 border-dashed border-primary/20 flex flex-col gap-7 bg-[#430917]/5"
                          >
                            <LanguageSelector />
                            <div className="w-full h-px bg-[#4309172b]" />
                            <GodSelector />
                          </div>
                        )}
                        
                        {/* Step-specific Validation Errors Summary Banner */}
                        {Object.keys(validationErrors).some(key => {
                          const activeStep = typeof currentStep === 'number' ? currentStep : 1;
                          const stepFieldsList = stepFields[activeStep as 1 | 2 | 3] || [];
                          return stepFieldsList.some(f => f.id === key && validationErrors[key]);
                        }) && (
                            <div className="mb-8 p-5 rounded-2xl border-2 border-red-200 bg-red-50/70 backdrop-blur-sm text-red-800 space-y-2 shadow-sm animate-pulse">
                              <div className="font-extrabold flex items-center gap-2 text-[14px] uppercase tracking-wider text-red-900">
                                <AlertCircle size={18} className="text-red-600" />
                                <span>Please fill in the required fields:</span>
                              </div>
                              <ul className="list-disc list-inside text-sm pl-1 font-bold space-y-0.5">
                                {Object.keys(validationErrors).map(key => {
                                  const activeStep = typeof currentStep === 'number' ? currentStep : 1;
                                  const stepFieldsList = stepFields[activeStep as 1 | 2 | 3] || [];
                                  const field = stepFieldsList.find(f => f.id === key);
                                  if (!field || !validationErrors[key]) return null;
                                  return (
                                    <li key={key} className="text-red-700">
                                      {validationErrors[key]}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}

                        {/* Dynamic Form Content (Step 1, 2, or 3) */}
                        <div className="space-y-6 sm:space-y-8 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-primary/20 bg-[#430917]/5">
                          {currentStep === 1 && <StepOne />}
                          {currentStep === 2 && <StepTwo />}
                          {currentStep === 3 && <StepThree />}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-100 mt-6 bg-white/50 -mx-3 sm:-mx-6 md:-mx-10 px-3 sm:px-6 md:px-10 pb-2 rounded-b-[2rem] w-full">
                    
                    {/* Buttons Row - Side-by-Side on Mobile */}
                    <div className="flex flex-row items-center gap-3 w-full sm:w-auto flex-1">
                      {typeof currentStep === 'number' && currentStep > 1 ? (
                        <Button
                          variant="outline"
                          onClick={handleBack}
                          className="flex-1 sm:flex-none rounded-xl px-4 sm:px-8 font-bold border-2 transition-all gap-1.5 h-[48px] sm:h-[52px] cursor-pointer text-xs sm:text-sm hover:bg-zinc-50"
                        >
                          <ChevronLeft size={16} />
                          <span>Previous Step</span>
                        </Button>
                      ) : (
                        <div className="hidden sm:block w-[140px]" />
                      )}

                      <Button
                        onClick={handleNext}
                        className="flex-1 sm:flex-none rounded-xl px-4 sm:px-10 h-[48px] sm:h-[52px] font-bold bg-[#430917] hover:bg-[#CFA132] hover:text-[#430917] text-white shadow-md transition-all gap-1.5 text-xs sm:text-sm cursor-pointer ml-auto"
                      >
                        <span>{currentStep === 3 ? "Preview" : "Next Step"}</span>
                        <ChevronRight size={16} />
                      </Button>
                    </div>

                    {/* Step Dots Indicators */}
                    <div className="hidden md:flex items-center gap-2">
                      {[1, 2, 3].map((s) => (
                        <div
                          key={s}
                          className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all duration-300",
                            currentStep === s ? "bg-primary w-8" : "bg-zinc-200"
                          )}
                        />
                      ))}
                      <span className="ml-2 text-sm font-bold text-zinc-400">
                        Step {currentStep} of 3
                      </span>
                    </div>

                    {/* Reset Button Container */}
                    <div className="flex items-center justify-center w-full sm:w-auto mt-2 sm:mt-0">
                      <button
                        onClick={() => setShowResetConfirm(true)}
                        className="text-zinc-400 hover:text-primary font-bold gap-2 text-xs sm:text-sm transition-colors flex items-center cursor-pointer py-1"
                      >
                        <RotateCcw size={13} />
                        Reset Form
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Floating Sticky Sidebar - Absolute positioned relative to the Form Card */}
              {language !== 'en' && (
                <div className="hidden xl:block absolute top-0 -right-[360px] h-full w-[320px] z-50">
                  <div className="sticky top-28">
                    <TransliterationSidebar />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ConfirmationModal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={resetForm}
        variant="danger"
        title="Reset Biodata?"
        message="Are you sure you want to reset all form data? This action cannot be undone and you will lose all progress."
        confirmText="Yes, Reset All"
        cancelText="No, Keep Data"
      />
    </>
  );
}
