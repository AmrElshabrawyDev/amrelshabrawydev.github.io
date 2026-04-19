"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

interface MasonryOptions {
  columns?: {
    mobile: number;
    desktop: number;
  };
  breakpoint?: number;
  gap?: number;
  selector: string;
}

/**
 * useMasonryGSAP: Programmatic Masonry layout using absolute positioning and GSAP.
 * Handles dynamic content expansion via ResizeObserver and window resizing.
 */
export function useMasonryGSAP(
  containerRef: RefObject<HTMLElement | null>,
  {
    columns = { mobile: 1, desktop: 2 },
    breakpoint = 1024,
    gap = 48,
    selector,
  }: MasonryOptions,
) {
  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      // Internal Reflow Logic
      const reflow = (isInitial: boolean = false) => {
        const items = el.querySelectorAll(selector) as NodeListOf<HTMLElement>;
        if (items.length === 0) return;

        const containerWidth = el.offsetWidth;
        const isDesktop =
          typeof window !== "undefined" && window.innerWidth >= breakpoint;
        const colCount = isDesktop ? columns.desktop : columns.mobile;
        const colWidth = (containerWidth - gap * (colCount - 1)) / colCount;

        const colHeights = Array(colCount).fill(0);

        items.forEach((item) => {
          const shortestColIndex = colHeights.indexOf(Math.min(...colHeights));
          const x = shortestColIndex * (colWidth + gap);
          const y = colHeights[shortestColIndex];

          item.style.width = `${colWidth}px`;
          item.style.position = "absolute";

          if (isInitial) {
            gsap.set(item, { x, y });
          } else {
            gsap.to(item, {
              x,
              y,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          colHeights[shortestColIndex] += item.offsetHeight + gap;
        });

        gsap.to(el, {
          height: Math.max(...colHeights),
          duration: 0.4,
          ease: "power2.out",
        });
      };

      // Initial reflow
      reflow(true);

      // Watch for size changes in any item (handles expansion)
      const observer = new ResizeObserver(() => reflow());
      const items = el.querySelectorAll(selector);
      items.forEach((item) => observer.observe(item));

      // Watch for window resize
      const handleResize = () => reflow();
      window.addEventListener("resize", handleResize);

      return () => {
        observer.disconnect();
        window.removeEventListener("resize", handleResize);
      };
    },
    {
      scope: containerRef,
      dependencies: [selector, JSON.stringify(columns), breakpoint, gap],
    },
  );
}
