"use client";

import { useState, useEffect } from "react";
import { useBuilderStore } from "@/store/builder-store";
import { translations } from "@/lib/translations";
import { FormField } from "./form-field";
import {
  Phone,
  MapPin,
  Plus,
  Mail,
  Pencil,
  Camera,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Modal } from "@/components/ui/modal";
import { ImageCropper } from "./image-cropper";

const ICON_MAP: Record<string, any> = {
  mobile: Phone,
  email: Mail,
  address: MapPin,
  custom: Plus
};

export function StepThree() {
  const {
    stepFields,
    language,
    addCustomField,
    stepHeadings,
    setStepHeading,
    profilePhotoUrl,
    setProfilePhotoUrl
  } = useBuilderStore();
  const [isEditingHeading, setIsEditingHeading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);



  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleCropModalClose = () => {
    setIsCropModalOpen(false);

    if (tempImage) {
      URL.revokeObjectURL(tempImage);
    }

    setTempImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setTempImage(objectUrl);
    setIsCropModalOpen(true);
  };

  const handleCropComplete = (croppedImage: string) => {
    setProfilePhotoUrl(croppedImage);

    if (tempImage) {
      URL.revokeObjectURL(tempImage);
    }

    setTempImage(null);
    setIsCropModalOpen(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isMounted) return null;

  const t = translations[language];
  const heading = stepHeadings[3] || t.contactDetails;

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="flex justify-center group">
          {isEditingHeading ? (
            <input
              autoFocus
              type="text"
              value={heading}
              onChange={(e) => setStepHeading(3, e.target.value)}
              onBlur={() => setIsEditingHeading(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingHeading(false)}
              className="font-extrabold text-[#430917] bg-transparent border-b-2 border-dashed border-[#430917]/30 outline-none w-full max-w-md text-center"
            />
          ) : (
            <div className="relative">
              <h3 className="text-xl font-extrabold text-[#430917] text-center px-8">{heading}</h3>
              <button
                onClick={() => setIsEditingHeading(true)}
                className="absolute -right-2 top-0 hover:scale-110 transition-transform cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Pencil size={18} className="text-[#CFA132]" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-y-3">
          {stepFields[3].map((field) => (
            <FormField
              key={field.id}
              id={field.id}
              stepId={3}
              labelId={field.labelId}
              isCustom={field.isCustom}
              customLabel={field.customLabel}
              icon={ICON_MAP[field.labelId] || ICON_MAP.custom}
              textarea={field.id === 'address' || field.id.startsWith('custom_')}
            />
          ))}
        </div>

        <div className="pt-2 flex justify-start border-b border-zinc-100 pb-2">
          <Button
            variant="outline"
            onClick={() => addCustomField(3)}
            className="rounded-lg border-dashed border-2 px-4 py-2 font-bold text-primary hover:bg-primary/5 gap-2 border-primary/30 w-auto cursor-pointer"
          >
            <Plus size={16} />
            {t.addCustomField}
          </Button>
        </div>
      </div>

      {/* Modern Photo Upload Section - At the Absolute Bottom */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-zinc-200 p-5 shadow-sm transition-all hover:border-primary/50 relative group/container">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex flex-col items-center gap-4 shrink-0">
            <div
              onClick={openFilePicker}
              className="relative w-48 h-64 rounded-lg border-4 border-zinc-50 shadow-lg overflow-hidden cursor-pointer group/photo bg-zinc-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95 ring-2 ring-transparent hover:ring-primary/20"
            >
              {profilePhotoUrl ? (
                <>
                  <img src={profilePhotoUrl} className="w-full h-full object-cover" alt="Profile" />
                  <div className="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity">
                    <Camera className="text-white" size={15} />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <User size={46} className="text-zinc-300 transition-colors group-hover/photo:text-primary/40" />
                </div>
              )}
            </div>

            <Button
              onClick={openFilePicker}
              className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-8 py-2 shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              {t.uploadPhoto}
            </Button>
            {profilePhotoUrl && (
              <button
                onClick={() => setProfilePhotoUrl(undefined)}
                className="text-[11px] font-black text-zinc-500 uppercase tracking-widest hover:text-[#CFA132] transition-colors cursor-pointer"
              >
                Remove Photo
              </button>
            )}
          </div>

          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <h5 className="text-md font-extrabold text-zinc-900 tracking-tight">{t.choosePhoto}</h5>
              <p className="text-[13px] text-zinc-500 font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
                {t.uploadPhotoSub}
              </p>
            </div>

            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
              <div className="flex items-center gap-2 mb-1 text-primary justify-center md:justify-start">
                <Camera size={20} />
                <h5 className="font-bold uppercase tracking-widest text-[12px]">{t.photoTips}</h5>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-left">
                {[t.tip1, t.tip2, t.tip3, t.tip4, t.tip5].map((tip, i) => (
                  <div key={i} className="flex gap-3 text-[13px] text-zinc-600 font-semibold leading-tight">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <Modal
        isOpen={isCropModalOpen}
        onClose={handleCropModalClose}
        title="Adjust Your Profile Photo"
        className="max-w-xl"
      >
        {tempImage && (
          <ImageCropper
            image={tempImage}
            onCropComplete={handleCropComplete}
            onCancel={handleCropModalClose}
          />
        )}
      </Modal>
    </div>
  );
}
