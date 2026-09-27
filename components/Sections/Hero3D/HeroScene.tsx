"use client";

import { useEffect, useRef, useState } from "react";

type NavigatorHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

/**
 * WebGL with a real GPU. Software renderers (no graphics card — some VMs,
 * old laptops, and the servers PageSpeed Insights runs on) would stutter.
 */
const hasHardwareWebGL = () => {
  try {
    const gl = document.createElement("canvas").getContext("webgl");
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = String(
      gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER),
    );
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(
      renderer,
    );
  } catch {
    return false;
  }
};

/**
 * Decorative 3D background for the home hero.
 * three.js is only downloaded on desktop-width screens, on the first
 * interaction or once the page has loaded and gone idle — never for phones,
 * software-rendered WebGL, reduced-motion users, data-saver,
 * very low-memory devices or browsers without WebGL (they keep the static
 * background).
 */
export function HeroScene({ className = "" }: { className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = container.current;
    const nav = navigator as NavigatorHints;
    if (
      !el ||
      // Only where the scene is actually visible (desktop layout)
      !window.matchMedia("(min-width: 1024px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      nav.connection?.saveData ||
      (nav.deviceMemory ?? 8) <= 2
    ) {
      return;
    }

    let cancelled = false;
    let destroy: (() => void) | undefined;
    let started = false;
    const start = async () => {
      if (started) return;
      started = true;
      removeTriggers();
      // Creating a WebGL context is expensive, so this check is deferred too.
      // ?3d forces the scene (previews, testing on machines without a GPU).
      const forced = /[?&]3d(=|&|$)/.test(window.location.search);
      if (!forced && !hasHardwareWebGL()) return;
      const { createHeroScene } = await import("./heroSceneEngine");
      if (cancelled) return;
      const dispose = await createHeroScene(el, {
        lite: (nav.hardwareConcurrency ?? 8) <= 4,
        onReady: () => setReady(true),
      });
      if (cancelled) dispose();
      else destroy = dispose;
    };

    // Start on the first interaction, or once the page (and the intro gate)
    // is done and idle — so the 3D never competes with loading the page.
    let timer: number | undefined;
    const triggers = [
      "pointermove",
      "scroll",
      "keydown",
      "touchstart",
    ] as const;
    const removeTriggers = () =>
      triggers.forEach((type) => window.removeEventListener(type, start));
    triggers.forEach((type) =>
      window.addEventListener(type, start, { once: true, passive: true }),
    );
    const schedule = () => {
      timer = window.setTimeout(() => {
        if (typeof window.requestIdleCallback === "function") {
          window.requestIdleCallback(start, { timeout: 2000 });
        } else start();
      }, 3500);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      removeTriggers();
      window.clearTimeout(timer);
      destroy?.();
    };
  }, []);

  return (
    <div
      ref={container}
      aria-hidden
      className={`pointer-events-none transition-opacity duration-[1500ms] ${
        ready ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}
