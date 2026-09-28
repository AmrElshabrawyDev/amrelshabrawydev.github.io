import {
  JetBrains_Mono,
  Inter,
  Cairo,
} from "next/font/google";
import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";

// ====================================
// 🎨 Fonts Configuration
// ====================================

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Readable fonts for long-form content (blog, case studies, Arabic pages)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  // Only Arabic articles use it — don't make every page download it up front
  preload: false,
});

// ====================================
// 📊 Metadata Configuration
// ====================================

export const metadata: Metadata = {
  // Base URL for resolving absolute image paths (OG, Twitter)
  metadataBase: new URL("https://amrelshabrawydev.github.io"),

  // Basic Info
  title: {
    default: "Freelance React & Next.js Developer | Amr Elshabrawy",
    template: "%s | Amr Elshabrawy",
  },
  description:
    "Freelance React & Next.js developer in Egypt building fast, SEO-ready websites, online stores (Next.js & Salla) and web apps in Arabic & English.",

  // Keywords
  keywords: [
    "Freelance Next.js Developer",
    "Freelance React Developer",
    "Next.js Developer Egypt",
    "Hire Next.js Developer",
    "Salla Theme Developer",
    "WordPress to Next.js Migration",
    "Arabic RTL Website Development",
    "Front-End Developer Cairo",
    "Amr Elshabrawy",
  ],

  // Author
  authors: [
    {
      name: "Amr Elshabrawy",
      url: "https://amrelshabrawydev.github.io",
    },
  ],
  creator: "Amr Elshabrawy",
  publisher: "Amr Elshabrawy",

  // Robots
  robots: {
    // Preview builds (PREVIEW_BASE_PATH) must never be indexed
    index: !process.env.NEXT_PUBLIC_BASE_PATH,
    follow: true,
    googleBot: {
      index: !process.env.NEXT_PUBLIC_BASE_PATH,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 🎨 Favicon & Icons Configuration (Updated with your new files)
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  // PWA Manifest
  manifest: "/site.webmanifest",

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amrelshabrawydev.github.io",
    siteName: "Amr Elshabrawy — Freelance React & Next.js Developer",
    title: "Freelance React & Next.js Developer | Amr Elshabrawy",
    description:
      "Fast, SEO-ready websites, online stores and web apps built with React & Next.js — in Arabic & English.",
    images: [
      {
        url: "https://amrelshabrawydev.github.io/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Amr Elshabrawy - Front-End Developer Portfolio",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@AmrElshabr43803",
    creator: "@AmrElshabr43803",
    title: "Freelance React & Next.js Developer | Amr Elshabrawy",
    description:
      "Fast, SEO-ready websites, online stores and web apps built with React & Next.js — in Arabic & English.",
    images: ["https://amrelshabrawydev.github.io/twitter-card.jpg"],
  },

  // Verification (add after domain setup)
  verification: {
    google: "KgRDbESCG4O2UXsHZBtAvTpkDVi7dr-nMXfYZbWGdS4",
  },

  // Canonical URLs are set per page (see lib/seo.ts). A canonical here would be
  // inherited by every page and point them all at the homepage.

  // Category
  category: "Technology",
};
export const viewport: Viewport = {
  themeColor: "#0A0E27",
  colorScheme: "dark",
};

// ====================================
// 🏗️ Root Layout Component
// ====================================

import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import Script from "next/script";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { IntroGate } from "@/components/ui/IntroGate";
import { NavigationLoader } from "@/components/ui/NavigationLoader";
import { introGateScript } from "@/lib/intro-gate";

// Console Easter Egg
const easterEgg = `
%c👋 Hey there, fellow developer!

%cNice to see you checking the code.
Built with React, Next.js, and ❤️

Want to collaborate? Let's connect!
→ amrelshabrawy.dev@gmail.com

`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Easter egg in console (runs on client)
  if (typeof window !== "undefined") {
    console.log(
      easterEgg,
      "font-size: 20px; font-weight: bold; color: #3B82F6",
      "font-size: 14px; color: #94A3B8",
    );
  }

  return (
    <html
      lang="en"
      className={`${mono.variable} ${inter.variable} ${cairo.variable}`}
      // data-gate is set by the inline script before hydration
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGateScript }} />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <IntroGate />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-9K8JSGDRYF"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9K8JSGDRYF');
            `,
          }}
        />
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <WhatsAppButton />
        <NavigationLoader />
      </body>
    </html>
  );
}
