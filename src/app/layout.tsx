import type { Metadata, Viewport } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://clipz.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Clipz — Dynamic Island Clipboard Manager for Windows",
    template: "%s | Clipz",
  },
  description:
    "Clipz is a lightning-fast, privacy-first clipboard manager for Windows with a floating Dynamic Island notch. On-device OCR, sub-millisecond search, clip reminders, and DPAPI encryption.",
  keywords: [
    "clipboard manager",
    "Windows clipboard manager",
    "Windows 11 clipboard",
    "Dynamic Island for Windows",
    "clipboard history",
    "clipboard OCR",
    "Tauri clipboard app",
    "Rust clipboard manager",
    "Ditto alternative",
    "clipboard reminders",
    "productivity tools",
  ],
  authors: [{ name: "Clipz" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/clipz-website.png", type: "image/png" },
    ],
    shortcut: "/icon.svg",
    apple: "/clipz-website.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Clipz — Dynamic Island Clipboard Manager for Windows",
    description:
      "A floating notch clipboard manager for Windows with real-time capture, instant search, timed clip reminders, and encrypted sensitive data.",
    siteName: "Clipz",
    images: [
      {
        url: "/clipz-website.png",
        width: 1200,
        height: 630,
        alt: "Clipz - Dynamic Island Clipboard Manager for Windows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clipz — Dynamic Island Clipboard Manager for Windows",
    description:
      "A floating notch clipboard manager for Windows with real-time capture, instant search, timed clip reminders, and encrypted sensitive data.",
    images: ["/clipz-website.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#060609",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Clipz",
  operatingSystem: "Windows 10, Windows 11",
  applicationCategory: "UtilitiesApplication",
  description:
    "A lightning-fast, privacy-first clipboard manager for Windows with a floating Dynamic Island notch, on-device OCR, instant search, and clip reminders.",
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
    "DPAPI local encryption",
    "Zero telemetry & 100% local-first",
  ],
  downloadUrl: "https://clipz.app/api/download",
  softwareVersion: "2.0.1",
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
      className={`${outfit.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grain min-h-full">
        {children}
        <Script
          src="https://cdn.oyechats.com/oyechats-widget.js"
          data-bot-key="bot-b22566936b1b"
          strategy="lazyOnload"
        />
        <Analytics />
      </body>
    </html>
  );
}
