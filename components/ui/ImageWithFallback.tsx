"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Terminal, AlertCircle } from "lucide-react";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  containerClassName?: string;
  aspectRatio?: "video" | "square" | "auto";
}

export function ImageWithFallback({
  src,
  fallbackSrc,
  alt,
  className,
  containerClassName = "",
  aspectRatio = "video",
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    } else {
      setHasError(true);
    }
  };

  const aspectRatioClass = 
    aspectRatio === "video" ? "aspect-video" : 
    aspectRatio === "square" ? "aspect-square" : "";

  if (hasError && (!fallbackSrc || imgSrc === fallbackSrc)) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-bg-elevated text-text-tertiary gap-3 overflow-hidden border border-border-subtle/50 ${aspectRatioClass} ${containerClassName}`}
      >
        <div className="relative">
          <Terminal className="w-12 h-12 opacity-10" />
          <AlertCircle className="w-4 h-4 absolute -bottom-1 -right-1 text-accent opacity-40 animate-pulse" />
        </div>
        <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] opacity-40">img_load_err</span>
            <span className="text-[8px] font-mono uppercase text-accent/40">404_NOT_FOUND</span>
        </div>
        
        {/* Decorative terminal lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
            <div className="w-full h-px bg-text-primary mb-1" />
            <div className="w-full h-px bg-text-primary mb-1" />
            <div className="w-full h-px bg-text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass} ${containerClassName}`}>
      <Image
        {...props}
        src={imgSrc || src}
        alt={alt}
        className={`${className} transition-opacity duration-500`}
        onError={handleError}
        onLoadingComplete={(img) => {
            img.classList.remove('opacity-0');
        }}
      />
    </div>
  );
}
