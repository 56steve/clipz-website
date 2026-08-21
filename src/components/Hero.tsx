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
          A Dynamic Island for your Windows clipboard.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-[1.075rem] leading-relaxed text-muted">
          Clipz lives in a floating notch at the top of your screen. It captures
          everything you copy, categorizes it, and encrypts what matters.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="https://github.com/56steve/clipz/releases/download/main/Clipz_0.1.0_x64-setup.exe"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-violet-deep)] px-6 py-3 text-[0.95rem] font-medium text-white transition-all duration-200 hover:bg-[var(--color-violet)] hover:shadow-[0_0_25px_rgba(139,124,255,0.3)] hover:scale-[1.02]"
          >
            <WindowsGlyph className="h-4 w-4" />
            Download for Windows
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
          4 MB &middot; Windows 10 / 11 &middot; Rust + Tauri &middot; MIT
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
    <div className="relative overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[#0d0f17] shadow-2xl">
      {/* Window Titlebar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[#12151f] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        <div className="font-mono text-[0.72rem] text-faint">
          Windows Desktop &middot; Clipz v2.0.1 Notch
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
