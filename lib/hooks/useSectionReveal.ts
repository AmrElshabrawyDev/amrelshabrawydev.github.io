import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealOptions {
  stagger?: number | gsap.StaggerVars;
  y?: number;
  scale?: number;
  duration?: number;
  start?: string;
  delay?: number;
  triggerElement?: string;
}

/**
 * Standardized section reveal hook for professional portfolio aesthetics.
 * Uses a subtle scale + opacity + Y transform stagger.
 */
export function useSectionReveal(
  containerRef: RefObject<HTMLElement | null>,
  targetSelector: string = ".gsap-reveal",
  options: RevealOptions = {},
) {
  const {
    stagger = 0.1,
    y = 30,
    scale = 0.98,
    duration = 0.6,
    start = "top 85%",
    delay = 0,
    triggerElement,
  } = options;

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const targets = containerRef.current.querySelectorAll(targetSelector);
      if (targets.length === 0) return;

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y,
          scale,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          stagger,
          delay,
          ease: "elastic",
          scrollTrigger: {
            trigger: triggerElement || containerRef.current,
            start,
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: containerRef },
  );
}
