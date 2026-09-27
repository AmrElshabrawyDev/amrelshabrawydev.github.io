import { LogoIcon } from "./LogoIcon";
import { introFilmScript } from "@/lib/intro-gate";

/**
 * Intro on every visit (mode chosen in lib/intro-gate.ts):
 *  - film: two terminal-style doors stay closed while the cinematic logo video
 *    plays over them, then they open and the logo flies into the header
 *  - play (fallback): CSS-only — the logo sits on the seam, "builds", splits
 *    and leaves with the doors
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

      {/* Outside the gate so it can blend (screen) with the page as it flies */}
      <video
        id="intro-film"
        className="intro-film"
        muted
        playsInline
        preload="none"
        aria-hidden
        tabIndex={-1}
      >
        <source src="/intro/logo-intro.webm" type='video/webm; codecs="vp9"' />
        <source src="/intro/logo-intro.mp4" type="video/mp4" />
      </video>
      <script dangerouslySetInnerHTML={{ __html: introFilmScript }} />
    </>
  );
}
