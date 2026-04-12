"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Terminal } from "lucide-react";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  fallbackSrc,
  alt,
  className,
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

  if (hasError && (!fallbackSrc || imgSrc === fallbackSrc)) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-bg-elevated text-text-tertiary gap-2 ${className}`}
        style={{ width: props.width, height: props.height }}
      >
        <Terminal className="w-8 h-8 opacity-20" />
        <span className="text-[10px] uppercase tracking-widest opacity-40">no_preview</span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={imgSrc || src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
