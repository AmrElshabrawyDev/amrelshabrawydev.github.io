import { Space_Grotesk, Inter } from "next/font/google";
import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";

// ====================================
// 🎨 Fonts Configuration
// ====================================

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ====================================
// 📊 Metadata Configuration
// ====================================

export const metadata: Metadata = {
  // Basic Info
  title: {
    default:
      "Amr Elshabrawy | Front-End Developer | React & Next.js Specialist",
    template: "%s | Amr Elshabrawy",
  },
  description:
    "Professional Front-End Developer from Egypt with 5+ years of experience. Specializing in React.js, Next.js, TypeScript, and modern web development. Building fast, accessible, and scalable web applications.",

  // Keywords
  keywords: [
    "Front-End Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer Egypt",
    "UI Developer",
    "JavaScript Developer",
    "Tailwind CSS",
    "Responsive Web Design",
    "Web Performance Optimization",
    "SEO Optimization",
    "Freelance Web Developer",
    "React Specialist",
    "Frontend Engineer",
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
    index: true,
    follow: true,
    googleBot: {
      index: true,
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
    siteName: "Amr Elshabrawy - Front-End Developer",
    title: "Amr Elshabrawy | Front-End Developer | React & Next.js Specialist",
    description:
      "Professional Front-End Developer specializing in React, Next.js, and TypeScript. Building fast, accessible web applications with 5+ years of experience.",
    images: [
      {
        url: "https://amrelshabrawydev.github.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Amr Elshabrawy - Front-End Developer Portfolio",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@amrelshabrawy",
    creator: "@amrelshabrawy",
    title: "Amr Elshabrawy | Front-End Developer",
    description:
      "Professional Front-End Developer specializing in React, Next.js, and TypeScript. Building fast, accessible web applications.",
    images: ["https://amrelshabrawydev.github.io/twitter-card.png"],
  },

  // Verification (add after domain setup)
  verification: {
    google: "your-google-verification-code",
  },

  // Alternate Languages
  alternates: {
    canonical: "https://amrelshabrawydev.github.io",
    languages: {
      "en-US": "https://amrelshabrawydev.github.io",
    },
  },

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

import { Navbar } from "@/components/Navigation/Navbar";
import { Footer } from "@/components/Layout/Footer";

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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
