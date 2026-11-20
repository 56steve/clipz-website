import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { STORE_URL, GITHUB_URL, SITE_URL, APP_VERSION } from "@/lib/links";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_TITLE = "Clipz — Notch Clipboard Manager for Windows & macOS";
const SITE_DESCRIPTION =
  "Clipz is a fast, privacy-first clipboard manager for Windows and macOS that lives in a floating notch at the top of your screen. On-device OCR, instant full-text search, clip reminders, and encryption for sensitive clips.";
const SOCIAL_DESCRIPTION =
  "A floating notch clipboard manager for Windows and macOS with real-time capture, instant search, timed clip reminders, and encrypted sensitive data.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    default: SITE_TITLE,
    template: "%s | Clipz",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "clipboard manager",
    "Windows clipboard manager",
    "macOS clipboard manager",
    "Windows 11 clipboard",
    "Dynamic Island for Windows",
    "clipboard history",
    "clipboard OCR",
    "Tauri clipboard app",
    "Rust clipboard manager",
    "Ditto alternative",
    "clipboard reminders",
    "productivity tools",
    "Clipz Microsoft Store",
    "clipboard manager Microsoft Store",
    "clipboard history Windows 10",
    "free clipboard manager",
    "copy paste manager",
    "paste history",
  ],
  authors: [{ name: "Clipz" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SOCIAL_DESCRIPTION,
    siteName: "Clipz",
    images: [
      {
        url: "/clipz-website.png",
        width: 1200,
        height: 630,
        alt: "Clipz - notch clipboard manager for Windows and macOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SOCIAL_DESCRIPTION,
    images: ["/clipz-website.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#161618",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Clipz",
  operatingSystem: "Windows 10, Windows 11, macOS",
  applicationCategory: "UtilitiesApplication",
  description: SITE_DESCRIPTION,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Dynamic Island floating notch interface",
    "On-device OCR image-to-text extraction",
    "Sub-millisecond SQLite FTS5 search",
    "Timed clip reminders",
    "Smart categories and favorites",
    "Local encryption for sensitive clips (DPAPI on Windows, AES-256-GCM on macOS)",
    "Zero telemetry & 100% local-first",
  ],
  downloadUrl: STORE_URL,
  installUrl: STORE_URL,
  sameAs: [STORE_URL, GITHUB_URL],
  softwareVersion: APP_VERSION,
  license: "https://opensource.org/licenses/MIT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full">
        {children}
        <Script
          src="https://cdn.oyechats.com/oyechats-widget.js"
          data-bot-key="bot-d364c0690e73"
          strategy="lazyOnload"
        />
        <Script
          src="https://get.microsoft.com/badge/ms-store-badge.bundled.js"
          type="module"
          strategy="afterInteractive"
        />
        <Analytics />
      </body>
    </html>
  );
}
