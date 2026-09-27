import { LogoIcon } from "./LogoIcon";
import { introFilmScript } from "@/lib/intro-gate";

/**
 * Intro on every visit (lib/intro-gate.ts):
 *  1. The gate (CSS only): terminal-style doors with the logo on the seam
 *     "build" the site, then the logo splits and the doors open.
 *  2. As they open, the cinematic logo film plays on a dark stage, then the
 *     logo flies into the header and the page appears.
 * The page renders underneath the whole time, so it never delays loading.
 */
export function IntroGate() {
  return (
    <>
      <div className="intro-gate" aria-hidden>
        <div className="intro-gate-door intro-gate-door-left">
          <div className="intro-gate-logo intro-gate-logo-left">
            <LogoIcon className="w-full h-full" />
          </div>
        </div>
        <div className="intro-gate-door intro-gate-door-right">
          <div className="intro-gate-logo intro-gate-logo-right">
            <LogoIcon className="w-full h-full" />
          </div>
        </div>

        <div className="intro-gate-seam" />

        <div className="intro-gate-terminal">
          <p className="intro-gate-command">
            <span className="text-success">$</span> npm run build
          </p>
          <p className="intro-gate-result">✓ Compiled successfully</p>
        </div>
      </div>

      {/* Stage behind the doors while the film plays */}
      <div className="intro-stage" aria-hidden />
      {/* The <video> is created by the script (React never touches it) */}
      <div
        id="intro-film-slot"
        dangerouslySetInnerHTML={{ __html: "" }}
        suppressHydrationWarning
      />
      <script dangerouslySetInnerHTML={{ __html: introFilmScript }} />
    </>
  );
}
