"use client";

import { motion, useReducedMotion } from "motion/react";
import { HeroBolt } from "./HeroBolt";
import { NotchSimulator } from "./NotchSimulator";
import { APP_VERSION, GITHUB_URL, STORE_URL } from "@/lib/links";

const BENEFITS: { title: string; body: string }[] = [
  {
    title: "Instant search",
    body: "Full-text search across your whole clipboard history, as you type.",
  },
  {
    title: "Private by design",
    body: "Sensitive clips are encrypted, and everything stays on your device.",
  },
  {
    title: "Keyboard first",
    body: "Open with a shortcut, arrow to a clip, press Enter. No mouse needed.",
  },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-16 pt-28 sm:pt-32"
    >
      <HeroBolt />

      <div className="container-page relative flex flex-col items-center text-center">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[0.72rem] text-muted ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.04] hover:text-text"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-violet)]" />
          Free &amp; open source on GitHub
          <span aria-hidden>&rarr;</span>
        </a>

        <h1 className="mx-auto max-w-4xl text-balance text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
          A clipboard manager that lives in your notch.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-[1.075rem] leading-relaxed text-muted">
          Clipz captures everything you copy, sorts it, makes it instantly
          searchable, sets timed reminders, and encrypts what matters. For
          Windows and macOS.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-violet-deep)] px-6 py-3 text-[0.95rem] font-medium text-white transition-all duration-200 hover:bg-[var(--color-violet)] hover:scale-[1.02]"
          >
            <WindowsGlyph className="h-4 w-4" />
            Get it from Microsoft Store
          </a>
          <a
            href="/api/download"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.95rem] text-muted ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.04] hover:text-text"
          >
            <WindowsGlyph className="h-3.5 w-3.5" />
            Windows installer
          </a>
          <a
            href="/api/download?platform=mac"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.95rem] text-muted ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.04] hover:text-text"
          >
            <AppleGlyph className="h-3.5 w-3.5" />
            macOS (.dmg)
          </a>
        </div>

        <p className="mt-5 font-mono text-[0.72rem] text-faint">
          v{APP_VERSION} &middot; Windows 10 / 11 &middot; macOS (Apple Silicon)
          &middot; Rust + Tauri &middot; MIT
        </p>

        <ul className="mt-12 grid w-full max-w-3xl gap-6 text-left sm:grid-cols-3">
          {BENEFITS.map((b) => (
            <li key={b.title} className="border-l border-[var(--border-strong)] pl-4">
              <h2 className="text-[0.95rem] font-semibold text-text">{b.title}</h2>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted">
                {b.body}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <FadeUp reduce={reduce}>
        <div className="container-page relative mt-14">
          <figure className="relative mx-auto max-w-[980px]">
            <ProductStage>
              <div className="absolute inset-x-0 top-3 z-10">
                <NotchSimulator defaultExpanded />
              </div>
            </ProductStage>
            <figcaption className="mt-4 text-center font-mono text-[0.72rem] text-faint">
              hover to expand &middot; arrow keys and enter to navigate
            </figcaption>
          </figure>
        </div>
      </FadeUp>
    </section>
  );
}

/**
 * Product stage: a plain near-black canvas with a single soft ceiling light.
 * No color wash, no drift. The product is the subject.
 */
function ProductStage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[#0d0f17]">
      {/* Window Titlebar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[#12151f] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        <div className="font-mono text-[0.72rem] text-faint">
          Desktop Canvas &middot; Clipz v{APP_VERSION} Notch
        </div>
        <div className="w-12" />
      </div>

      <div className="relative h-[380px] overflow-hidden bg-[#090a0f] sm:h-[440px]">
        {children}
      </div>
    </div>
  );
}

function FadeUp({
  children,
  reduce,
}: {
  children: React.ReactNode;
  reduce: boolean | null;
}) {
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function WindowsGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm0 13 7.5 1.1v-7H3v5.9Zm8.5 1.2L21 21V12.5h-9.5v7.2Zm0-15.4v7.2H21V3l-9.5 1.3Z" />
    </svg>
  );
}

function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.11-1 .04-2.19.67-2.88 1.48-.62.72-1.15 1.88-.99 3.01 1.12.09 2.22-.56 2.88-1.38z" />
    </svg>
  );
}
