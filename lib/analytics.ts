// Google Analytics 4 helpers (gtag is loaded in app/layout.tsx)

type Gtag = (command: "event", action: string, params?: Record<string, unknown>) => void;

/**
 * Track a lead action (WhatsApp click, email click, form submit).
 * Mark "generate_lead" as a key event in GA4 to see which pages bring clients.
 */
export function trackLead(method: string) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", "generate_lead", { method, page_path: window.location.pathname });
}
