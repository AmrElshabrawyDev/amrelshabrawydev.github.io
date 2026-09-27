import { LogoIcon } from "./LogoIcon";

/**
 * First-visit intro: two terminal-style doors close over the page with the
 * logo on the seam, "build" the site, then split the logo and open.
 * Pure CSS timeline (app/globals.css → .intro-gate); the page renders
 * underneath the whole time, so it never delays loading. Skipping is handled
 * by the inline script in lib/intro-gate.ts.
 */
export function IntroGate() {
  return (
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
  );
}
