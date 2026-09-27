/** The AMR logo (572×572), shared by <LogoIcon /> and the 3D hero scene */
export const LOGO_VIEWBOX = 572;

export const LOGO_PATHS = [
  // Hexagon
  {
    fill: "#89b4fa",
    stroke: "#89b4fa",
    strokeWidth: 40,
    d: "M256 68.5l-215 115v195l215 125h61l214-125v-195l-214-115z",
  },
  // A
  {
    fill: "#181825",
    d: "M116 305.5v80l-40-25v-160l120-64v294l-40-25v-100zm0-80v40h40v-60z",
  },
  // M
  {
    fill: "#cdd6f4",
    d: "M271 265.5l-15-40v240l-40-25v-315l40-22 30 102 30-102 40 22v315l-40 25v-240l-16 40z",
  },
  // R
  {
    fill: "#181825",
    d: "M416 305.5v100l-40 25v-294l120 64v70l-20 10 20 10v70l-40 25v-60l-25-20zm0-100v60h15l25-25v-15z",
  },
] as const;

/** Standalone SVG markup (used to rasterize the logo for the 3D scene) */
export const logoSvgMarkup = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LOGO_VIEWBOX} ${LOGO_VIEWBOX}" stroke-linecap="round" stroke-linejoin="round">${LOGO_PATHS.map(
    (p) =>
      `<path d="${p.d}" fill="${p.fill}"${
        "stroke" in p ? ` stroke="${p.stroke}" stroke-width="${p.strokeWidth}"` : ""
      }/>`,
  ).join("")}</svg>`;
