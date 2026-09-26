import type { Metadata } from "next";
import { SITE_NAME, SOCIAL, absoluteUrl } from "@/lib/site";

interface PageSeo {
  /** Page title (the root layout template appends " | Amr Elshabrawy") */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/work" — used for the canonical URL */
  path: string;
  image?: string;
  imageAlt?: string;
  imageSize?: [width: number, height: number];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  locale?: "en_US" | "ar_EG";
  /** Set true when the title already contains the brand name */
  absoluteTitle?: boolean;
}

/**
 * Builds page metadata with a self-referencing canonical URL.
 * Every page must set its own canonical — otherwise pages inherit the
 * homepage canonical and Google treats them as duplicates of "/".
 */
export function buildMetadata({
  title,
  description,
  path,
  image = "/og-image.png",
  imageAlt,
  imageSize = [1200, 630],
  type = "website",
  publishedTime,
  modifiedTime,
  locale = "en_US",
  absoluteTitle = false,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: `${SITE_NAME} — Freelance React & Next.js Developer`,
      locale,
      images: [
        { url: image, width: imageSize[0], height: imageSize[1], alt: imageAlt ?? title },
      ],
      ...(type === "article" && { publishedTime, modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      site: SOCIAL.xHandle,
      creator: SOCIAL.xHandle,
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/** Serialize JSON-LD safely for a <script type="application/ld+json"> tag */
export const jsonLd = (data: unknown) => ({
  __html: JSON.stringify(data).replace(/</g, "\\u003c"),
});
