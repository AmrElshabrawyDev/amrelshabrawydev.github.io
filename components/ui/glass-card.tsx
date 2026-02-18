"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "hover" | "strong";
  glow?: boolean;
  children: React.ReactNode;
}

export function GlassCard({
  variant = "default",
  glow = false,
  children,
  className,
  ...props
}: GlassCardProps) {
  const baseClasses = cn(
    "rounded-2xl border transition-all duration-300",
    {
      // Default variant
      "bg-bg-overlay/60 backdrop-blur-xl border-border-subtle":
        variant === "default",
      // Hover variant with lift effect
      "bg-bg-overlay/60 backdrop-blur-xl border-border-subtle hover:border-border-default hover:-translate-y-1 hover:shadow-xl":
        variant === "hover",
      // Strong background
      "bg-bg-overlay/80 backdrop-blur-xl border-border-default":
        variant === "strong",
      // Glow effect
      "glow-subtle": glow,
    },
    className,
  );

  if (variant === "hover") {
    return (
      <motion.div
        className={baseClasses}
        whileHover={{
          y: -4,
          boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
        }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div className={baseClasses} {...props}>
      {children}
    </motion.div>
  );
}
