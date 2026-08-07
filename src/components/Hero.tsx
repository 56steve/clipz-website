"use client";

import { motion, useReducedMotion } from "motion/react";
import { NotchSimulator } from "./NotchSimulator";
import { Aurora } from "./ui/Aurora";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-20 pt-36 sm:pt-44"
    >
      <Aurora />

      <div className="container-page flex flex-col items-center text-center">
        <span className="mb-8 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-faint">
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
            href="#download"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-violet-deep)] px-6 py-3 text-[0.95rem] font-medium text-white transition-colors hover:bg-[var(--color-violet)]"
          >
            <WindowsGlyph className="h-4 w-4" />
            Download for Windows
          </a>
          <a
            href="https://github.com/56steve/clipz"
            target="_blank"
            rel="noreferrer"
            className="text-[0.95rem] text-muted transition-colors hover:text-text"
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
          <div className="relative mx-auto max-w-[980px]">
            <div className="relative overflow-hidden rounded-[24px] border border-[var(--border)] bg-[#0a0a12] p-2 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]">
              <div className="relative h-[380px] overflow-hidden rounded-[16px] bg-[radial-gradient(120%_100%_at_50%_-20%,#1a1730_0%,#0b0b14_55%,#08080d_100%)] sm:h-[440px]">
                <div className="absolute left-8 top-24 hidden h-40 w-64 rotate-[-4deg] rounded-xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm sm:block" />
                <div className="absolute right-10 top-32 hidden h-48 w-56 rotate-[3deg] rounded-xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm sm:block" />

                <div className="absolute inset-x-0 top-3 z-10">
                  <NotchSimulator defaultExpanded />
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#08080d] to-transparent" />
              </div>
            </div>
            <p className="mt-4 text-center font-mono text-[0.72rem] text-faint">
              hover to expand &middot; arrow keys and enter to navigate
            </p>
          </div>
        </div>
      </FadeUp>
    </section>
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
