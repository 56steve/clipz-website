"use client";

import { motion, useReducedMotion } from "motion/react";
import { NotchSimulator } from "./NotchSimulator";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-24 pt-36 sm:pt-44"
    >
      <div className="container-page flex flex-col items-center text-center">
        <span className="mb-8 inline-flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-faint">
          <span className="h-px w-6 bg-[var(--border-strong)]" />
          Clipboard, reimagined
          <span className="h-px w-6 bg-[var(--border-strong)]" />
        </span>

        <h1 className="mx-auto max-w-4xl text-balance text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          A Dynamic Island for your desktop clipboard.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-[1.075rem] leading-relaxed text-muted">
          Clipz lives in a floating notch at the top of your screen. It captures
          everything you copy, categorizes it, sets timed reminders, and encrypts what matters.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/56steve/clipz/releases/latest"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-violet-deep)] px-6 py-3 text-[0.95rem] font-medium text-white transition-all duration-200 hover:bg-[var(--color-violet)] hover:scale-[1.02]"
          >
            <WindowsGlyph className="h-4 w-4" />
            Download for Windows
          </a>
          <a
            href="https://github.com/56steve/clipz/releases/latest"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.04] px-6 py-3 text-[0.95rem] font-medium text-text transition-all duration-200 hover:bg-white/[0.08] hover:scale-[1.02]"
          >
            <AppleGlyph className="h-4 w-4" />
            Download for macOS
          </a>
          <a
            href="https://github.com/56steve/clipz"
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-4 py-2.5 text-[0.95rem] text-muted transition-colors hover:bg-white/[0.04] hover:text-text"
          >
            View source &rarr;
          </a>
        </div>

        <p className="mt-6 font-mono text-[0.72rem] text-faint">
          4 MB &middot; Windows 10 / 11 &amp; macOS 12+ &middot; Rust + Tauri &middot; MIT
        </p>
      </div>

      <FadeUp reduce={reduce}>
        <div className="container-page mt-20">
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
          Desktop Canvas &middot; Clipz v2.0.1 Notch
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
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.12-1.96.99-3.1-.97.04-2.15.65-2.84 1.45-.61.71-1.15 1.87-.99 2.99 1.09.08 2.17-.52 2.84-1.34z" />
    </svg>
  );
}
