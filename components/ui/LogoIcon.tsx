import React from "react";
import { LOGO_PATHS, LOGO_VIEWBOX } from "./logoPaths";

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${LOGO_VIEWBOX} ${LOGO_VIEWBOX}`}
      xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {LOGO_PATHS.map((path) => (
        <path
          key={path.d}
          d={path.d}
          fill={path.fill}
          {...("stroke" in path ? { stroke: path.stroke, strokeWidth: path.strokeWidth } : {})}
        />
      ))}
    </svg>
  );
}
