"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hover" | "strong";
  glow?: boolean;
  children: React.ReactNode;
}

export function GlassCard({
  variant = "default",
  glow = false,
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMouseEnter = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    if (variant === "hover") {
      gsap.to(e.currentTarget, {
        y: -4,
        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
        duration: 0.3,
        ease: "power2.out",
      });
    }
    onMouseEnter?.(e);
  });

  const handleMouseLeave = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    if (variant === "hover") {
      gsap.to(e.currentTarget, {
        y: 0,
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
    onMouseLeave?.(e);
  });

  const baseClasses = cn(
    "rounded-2xl border",
    {
      "bg-bg-overlay/60 backdrop-blur-xl border-border-subtle": variant === "default",
      "bg-bg-overlay/60 backdrop-blur-xl border-border-subtle cursor-pointer": variant === "hover",
      "bg-bg-overlay/80 backdrop-blur-xl border-border-default": variant === "strong",
      "glow-subtle": glow,
    },
    className,
  );

  return (
    <div
      ref={cardRef}
      className={baseClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}
