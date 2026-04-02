import React from "react";

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 572 572"
      xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* <defs>
        <radialGradient id="logoGradient">
          <stop offset="20%" stopColor="#89b4fa" />
          <stop offset="60%" stopColor="#181825" />
        </radialGradient>

        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="14"
            floodColor="#6ba3ff"
            floodOpacity=".7"
          />
        </filter>
      </defs> */}

      <path
        stroke="#89b4fa"
        strokeWidth="40"
        fill="#89b4fa"
        filter="url(#logoGlow)"
        d="M256 68.5l-215 115v195l215 125h61l214-125v-195l-214-115z"
      />

      <path
        fill="#181825"
        strokeWidth="0"
        d="M116 305.5v80l-40-25v-160l120-64v294l-40-25v-100zm0-80v40h40v-60z"
      />

      <path
        fill="#cdd6f4"
        strokeWidth="0"
        d="M271 265.5l-15-40v240l-40-25v-315l40-22 30 102 30-102 40 22v315l-40 25v-240l-16 40z"
      />

      <path
        fill="#181825"
        strokeWidth="0"
        d="M416 305.5v100l-40 25v-294l120 64v70l-20 10 20 10v70l-40 25v-60l-25-20zm0-100v60h15l25-25v-15z"
      />
    </svg>
  );
}
