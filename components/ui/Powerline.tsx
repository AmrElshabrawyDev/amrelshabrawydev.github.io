"use client";

import React from "react";

/**
 * Powerline Design System Components
 * Inspired by terminal prompts (zsh/fish) with segmented blocks.
 */

interface PowerlineGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function PowerlineGroup({
  children,
  className = "",
}: PowerlineGroupProps) {
  return (
    <div className={`powerline-container flex-wrap gap-y-2 ${className}`}>
      {children}
    </div>
  );
}

type PowerlineColor =
  | "primary"
  | "secondary"
  | "accent"
  | "warning"
  | "success"
  | "info"
  | "surface";

interface PowerlineSegmentProps {
  children: React.ReactNode;
  color?: PowerlineColor;
  showArrow?: boolean;
  direction?: "left" | "right" | "both";
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const segmentStyles: Record<
  PowerlineColor,
  { segment: string; arrow: string }
> = {
  primary: {
    segment: "bg-primary text-bg-base",
    arrow: "bg-primary border-2 border-primary",
  },
  secondary: {
    segment: "bg-secondary text-bg-base",
    arrow: "bg-secondary border-2 border-secondary",
  },
  accent: {
    segment: "bg-accent text-bg-base",
    arrow: "bg-accent border-2 border-accent",
  },
  warning: {
    segment: "bg-warning text-bg-base",
    arrow: "bg-warning border-2 border-warning",
  },
  success: {
    segment: "bg-success text-bg-base",
    arrow: "bg-success border-2 border-success",
  },
  info: {
    segment: "bg-info text-bg-base",
    arrow: "bg-info border-2 border-info",
  },
  surface: {
    segment: "bg-bg-elevated text-text-primary",
    arrow: "bg-bg-elevated border-2 border-bg-elevated",
  },
};

export function PowerlineSegment({
  children,
  color = "primary",
  showArrow = true,
  direction = "left",
  className = "",
  icon,
  onClick,
}: PowerlineSegmentProps) {
  const styles = segmentStyles[color];
  const isRight = direction === "right";
  const isLeft = direction === "left";
  const isBoth = direction === "both";

  return (
    <div
      onClick={onClick}
      className={`powerline-segment relative ${isLeft && "pl-5 pr-2"} ${isRight && "pl-2 pr-5"} ${isBoth && "px-5"} ${styles.segment} ${className}`}
    >
      {showArrow && (isRight || isBoth) && (
        <div
          className={`powerline-arrow-right transition-colors duration-200 ease-linear group-hover:bg-accent group-hover:border-accent group-active:bg-primary group-active:text-bg-base group-active:border-primary ${styles.arrow}`}
        />
      )}

      <div className="flex items-center gap-1">
        {icon && (
          <span className={`opacity-80 ${isRight ? "order-1" : "order-0"}`}>
            {icon}
          </span>
        )}
        <span>{children}</span>
      </div>

      {showArrow && (isLeft || isBoth) && (
        <div
          className={`powerline-arrow-left transition-colors duration-200 ease-linear group-hover:bg-accent group-hover:border-accent group-active:bg-primary group-active:text-bg-base group-active:border-primary ${styles.arrow}`}
        />
      )}
    </div>
  );
}
