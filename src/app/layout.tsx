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
  title: {
    default: "Clipz: Dynamic Island Clipboard Hub for Windows & macOS",
    template: "%s | Clipz",
  },
  description:
    "Clipz is a lightning-fast clipboard manager for Windows & macOS with a floating Dynamic Island notch. Real-time capture, sub-millisecond FTS5 search, clip reminders, smart categories, and DPAPI encryption.",
  keywords: [
    "clipboard manager",
    "Windows clipboard",
    "macOS clipboard",
    "Dynamic Island",
    "Tauri",
    "Rust",
    "clipboard history",
    "reminders",
    "productivity",
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
    title: "Clipz: Dynamic Island Clipboard Hub for Windows & macOS",
    description:
      "A floating notch clipboard manager with real-time capture, instant search, timed clip reminders, and encrypted sensitive data.",
    siteName: "Clipz",
    images: [
      {
        url: "/clipz-website.png",
        width: 1200,
        height: 630,
        alt: "Clipz Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clipz: Dynamic Island Clipboard Hub for Windows & macOS",
    description:
      "A floating notch clipboard manager with real-time capture, instant search, timed clip reminders, and encrypted sensitive data.",
    images: ["/clipz-website.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#060609",
  colorScheme: "dark",
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
      <body className="grain min-h-full">{children}
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
