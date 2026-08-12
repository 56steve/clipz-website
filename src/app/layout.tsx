import type { Metadata, Viewport } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Clipz — The Dynamic Island Clipboard Hub for Windows",
    template: "%s — Clipz",
  },
  description:
    "Clipz is a lightning-fast clipboard manager for Windows with a floating Dynamic Island notch. Real-time capture, sub-millisecond FTS5 search, smart categories, and DPAPI encryption. Free and open source.",
  keywords: [
    "clipboard manager",
    "Windows clipboard",
    "Dynamic Island",
    "Tauri",
    "Rust",
    "clipboard history",
    "productivity",
  ],
  authors: [{ name: "Clipz" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Clipz — The Dynamic Island Clipboard Hub for Windows",
    description:
      "A floating notch clipboard manager for Windows. Real-time capture, instant search, and encrypted sensitive data.",
    siteName: "Clipz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clipz — The Dynamic Island Clipboard Hub for Windows",
    description:
      "A floating notch clipboard manager for Windows. Real-time capture, instant search, and encrypted sensitive data.",
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
      <body className="grain min-h-full">{children}</body>
    </html>
  );
}
