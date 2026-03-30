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

export function PowerlineGroup({ children, className = "" }: PowerlineGroupProps) {
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
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const colorMap: Record<PowerlineColor, string> = {
  primary: "bg-primary text-bg-base",
  secondary: "bg-secondary text-bg-base",
  accent: "bg-accent text-bg-base",
  warning: "bg-warning text-bg-base",
  success: "bg-success text-bg-base",
  info: "bg-info text-bg-base",
  surface: "bg-bg-elevated text-text-primary",
};

const arrowColorMap: Record<PowerlineColor, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  warning: "bg-warning",
  success: "bg-success",
  info: "bg-info",
  surface: "bg-bg-elevated",
};

export function PowerlineSegment({
  children,
  color = "primary",
  showArrow = true,
  className = "",
  icon,
  onClick,
}: PowerlineSegmentProps) {
  return (
    <div
      onClick={onClick}
      className={`powerline-segment group relative z-0 transition-transform duration-200 ease-out ${
        onClick ? "cursor-pointer hover:translate-x-1" : ""
      } ${colorMap[color]} ${className}`}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="opacity-80">{icon}</span>}
        <span>{children}</span>
      </div>
      
      {showArrow && (
        <div 
          className={`powerline-arrow ${arrowColorMap[color]}`} 
        />
      )}
    </div>
  );
}
