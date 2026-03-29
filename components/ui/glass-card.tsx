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
        y: -8,
        borderColor: "#FF00FF",
        boxShadow: "0 0 30px rgba(255, 0, 255, 0.3)",
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
        borderColor: "#2D1B4E",
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
    onMouseLeave?.(e);
  });

  const baseClasses = cn(
    "retro-card border-none",
    {
      "bg-bg-overlay backdrop-blur-xl": variant === "default",
      "bg-bg-overlay backdrop-blur-xl cursor-pointer": variant === "hover",
      "bg-bg-overlay/90 backdrop-blur-2xl border-2 border-secondary": variant === "strong",
      "shadow-neon-cyan": glow,
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
