"use client";

import React, { useState, useRef } from "react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@/components/ui/button";
import getCroppedImg from "@/lib/crop-utils";

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
}

export function ImageCropper({ image, onCropComplete, onCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [zoom, setZoom] = useState(1);
  const [isCropping, setIsCropping] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const aspect = 3 / 4;

    // Calculate percentages to get a perfect 3:4 crop box
    let percentWidth = 60;
    let percentHeight = (percentWidth * (width / height)) / aspect;

    if (percentHeight > 90) {
      percentHeight = 90;
      percentWidth = (percentHeight * aspect) / (width / height);
    }

    setCrop({
      unit: '%',
      width: percentWidth,
      height: percentHeight,
      x: (100 - percentWidth) / 2,
      y: (100 - percentHeight) / 2
    });
  }

  const handleSave = async () => {
    if (!completedCrop || !imgRef.current) {
      alert("Please select a valid area to crop.");
      return;
    }

    setIsCropping(true);
    try {
      // SCALE THE CROP COORDINATES TO NATURAL IMAGE SIZE
      const image = imgRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const scaledCrop = {
        x: completedCrop.x * scaleX,
        y: completedCrop.y * scaleY,
        width: completedCrop.width * scaleX,
        height: completedCrop.height * scaleY,
      };

      const croppedImage = await getCroppedImg(image.src, scaledCrop);
      if (croppedImage) {
        onCropComplete(croppedImage);
      }
    } catch (e) {
      console.error("Crop error:", e);
      alert("Failed to crop image. Please try again.");
    } finally {
      setIsCropping(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full bg-zinc-50 p-6 flex justify-center items-center overflow-hidden min-h-[400px]">
        <div className="relative group/cropper transition-all duration-500 hover:shadow-2xl rounded-lg overflow-hidden border-4 border-white shadow-xl bg-white">
          <ReactCrop
            crop={crop}
            onChange={(c, percentCrop) => {
              // Only allow moving x/y, keep the calculated width/height
              setCrop({
                ...percentCrop,
                width: crop?.width || percentCrop.width,
                height: crop?.height || percentCrop.height,
              });
            }}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={3 / 4}
            keepSelection
            className="max-w-full"
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={image}
              onLoad={onImageLoad}
              style={{
                width: `${100 * zoom}%`,
                maxWidth: 'none'
              }}
              className="max-h-[70vh] transition-all duration-200"
            />
          </ReactCrop>
        </div>
      </div>

      <div className="p-8 bg-white border-t border-zinc-100 w-full space-y-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className="text-[11px] font-black text-zinc-400 uppercase tracking-widest shrink-0">Zoom</span>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="hidden items-center gap-3 bg-zinc-50 px-4 py-2 rounded-full border border-zinc-100">
            {/* Circular mode removed to enforce template aspect ratio */}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1 rounded-full font-black uppercase tracking-wider text-xs h-12 border-zinc-200 hover:border-zinc-300 transition-all cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isCropping || !completedCrop}
            className="flex-1 bg-primary text-white font-black uppercase tracking-wider text-xs h-12 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isCropping ? "Cropping..." : "Save Selection"}
          </Button>
        </div>
      </div>
    </div>
  );
}
