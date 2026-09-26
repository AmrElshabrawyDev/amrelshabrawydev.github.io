"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { trackLead } from "@/lib/analytics";

interface CtaBannerProps {
  title?: string;
  text?: string;
  /** Pre-filled WhatsApp message, so leads arrive with context */
  whatsappText?: string;
  source: string;
  lang?: "en" | "ar";
}

const labels = {
  en: { eyebrow: "Let's work together", quote: "Get a free quote" },
  ar: { eyebrow: "لنعمل معًا", quote: "اطلب عرض سعر مجاني" },
};

export function CtaBanner({
  title = "Have a project in mind?",
  text = "Tell me what you need. I reply within 24 hours with honest advice and a fixed quote — no obligation.",
  whatsappText,
  source,
  lang = "en",
}: CtaBannerProps) {
  const t = labels[lang];
  return (
    <aside
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`${lang === "ar" ? "font-arabic" : "font-[family-name:var(--font-inter)]"} relative overflow-hidden border border-primary/40 bg-bg-elevated p-8 md:p-12`}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(600px_300px_at_0%_0%,rgba(137,180,250,0.15),transparent_70%)]"
      />
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="max-w-xl">
          <p className="eyebrow mb-3">{t.eyebrow}</p>
          <h2 className="heading-natural font-[inherit]! text-2xl md:text-3xl font-bold mb-3">
            {title}
          </h2>
          <p className="text-base">{text}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/contact"
            className="btn-primary"
            onClick={() => trackLead(`contact_${source}`)}
          >
            {t.quote} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
          <a
            href={whatsappLink(whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            onClick={() => trackLead(`whatsapp_${source}`)}
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </div>
    </aside>
  );
}
