import { LOGO_PATHS, LOGO_VIEWBOX, logoSvgMarkup } from "./logoPaths";
import { LogoIcon } from "./LogoIcon";

// The logo's silhouette, used to keep the light glint inside the logo
const logoMask = `url("data:image/svg+xml,${encodeURIComponent(logoSvgMarkup())}")`;

/**
 * Intro on every full page load — one continuous shot, pure CSS
 * (timeline in app/globals.css, mode + measurements in lib/intro-gate.ts):
 * the logo is traced in light and built up while "npm run build" runs, a
 * glint and pulse mark "Compiled successfully", then it arcs into the header
 * while the curtains open on the page.
 * The page renders underneath the whole time, so it never delays loading.
 */
export function IntroGate() {
  return (
    <div className="intro-gate" aria-hidden>
      <div className="intro-gate-curtain intro-gate-curtain-left" />
      <div className="intro-gate-curtain intro-gate-curtain-right" />

      <div className="intro-gate-terminal">
        <p className="intro-gate-command">
          <span className="text-success">$</span> npm run build
        </p>
        <p className="intro-gate-result">✓ Compiled successfully</p>
      </div>

      <div className="intro-gate-mark">
        <div className="intro-gate-mark-inner">
          <svg
            className="intro-gate-outline"
            viewBox={`0 0 ${LOGO_VIEWBOX} ${LOGO_VIEWBOX}`}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {LOGO_PATHS.map((path) => (
              <path key={path.d} d={path.d} pathLength={1} />
            ))}
          </svg>
          <LogoIcon className="intro-gate-fill" />
          <div className="intro-gate-scan" />
          <div
            className="intro-gate-glint"
            style={{ WebkitMaskImage: logoMask, maskImage: logoMask }}
          />
        </div>
      </div>
    </div>
  );
}
