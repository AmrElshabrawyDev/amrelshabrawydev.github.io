"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LOGO_PATHS, LOGO_VIEWBOX } from "./logoPaths";

/** Only slow navigations get the loader — fast ones would just flash it */
const SHOW_AFTER_MS = 300;
/** Never keep the page covered if something goes wrong */
const GIVE_UP_MS = 10_000;

/** A plain left-click on a link to another page of this site */
function isPageNavigation(event: MouseEvent) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return false;
  }
  const link = (event.target as Element | null)?.closest?.("a");
  if (
    !link ||
    (link.target && link.target !== "_self") ||
    link.hasAttribute("download")
  ) {
    return false;
  }
  const url = new URL(link.href, window.location.href);
  return (
    url.origin === window.location.origin &&
    url.pathname !== window.location.pathname
  );
}

/**
 * While a page change takes longer than SHOW_AFTER_MS, blurs the page and
 * draws the logo in a loop (styles in app/nav-loader.css). Also stops
 * impatient double clicks, since the overlay covers the page.
 */
export function NavigationLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const timers = useRef<number[]>([]);

  // The new page is here: hide (state adjusted during render, no effect needed)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setVisible(false);
  }

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, [pathname]);

  useEffect(() => {
    const clear = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    const start = () => {
      clear();
      timers.current.push(
        window.setTimeout(() => setVisible(true), SHOW_AFTER_MS),
        window.setTimeout(() => setVisible(false), GIVE_UP_MS),
      );
    };
    // Capture phase: runs before next/link handles (and prevents) the click
    const onClick = (event: MouseEvent) => {
      if (isPageNavigation(event)) start();
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", start);
    return () => {
      clear();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", start);
    };
  }, []);

  return (
    <div
      className={`nav-loader${visible ? " is-visible" : ""}`}
      role="status"
      aria-live="polite"
    >
      <svg
        viewBox={`0 0 ${LOGO_VIEWBOX} ${LOGO_VIEWBOX}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {LOGO_PATHS.map((path) => (
          <path key={path.d} d={path.d} pathLength={1} />
        ))}
      </svg>
      {visible && <span className="sr-only">Loading page…</span>}
    </div>
  );
}
