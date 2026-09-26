"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { trackLead } from "@/lib/analytics";

/** Floating WhatsApp button — most clients in Egypt & the Gulf prefer WhatsApp */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Amr on WhatsApp"
      onClick={() => trackLead("whatsapp_floating")}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-success text-bg-base font-bold text-sm px-4 h-12 shadow-[0_0_20px] shadow-success/30 hover:brightness-110 hover:text-bg-base transition-all"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
