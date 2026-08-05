"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { NotchSimulator } from "./NotchSimulator";
import { Aurora } from "./ui/Aurora";
import { cn } from "@/lib/cn";

export function Hero() {
  const reduce = useReducedMotion();
  const glowRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    if (reduce || !glowRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    glowRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    glowRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <section
      id="top"
      onMouseMove={onMove}
      className="relative overflow-hidden px-4 pb-16 pt-36 sm:pt-40"
    >
      <Aurora />

      {/* cursor-follow glow */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden opacity-70 md:block"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 30%), rgba(139,124,255,0.10), transparent 70%)",
        }}
      />

      <div className="container-page flex flex-col items-center text-center">
        <Fade reduce={reduce}>
          <a
            href="https://github.com/56steve/clipz/releases"
            target="_blank"
            rel="noreferrer"
            className="group mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.03] px-3.5 py-1.5 text-sm text-muted backdrop-blur-md transition-colors hover:border-[var(--border-glow)] hover:text-text"
          >
            <span className="flex items-center gap-1.5 font-medium text-violet">
              <Sparkles className="h-3.5 w-3.5" /> v2.0.1
            </span>
            <span className="h-3.5 w-px bg-[var(--border-strong)]" />
            <span>Now with DPAPI encryption</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Fade>

        <Fade reduce={reduce} delay={0.06}>
          <h1 className="mx-auto max-w-4xl text-balance text-[clamp(2.75rem,6vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            Your clipboard,
            <br className="hidden sm:block" /> reimagined as a{" "}
            <span className="text-gradient">Dynamic Island</span>.
          </h1>
        </Fade>

        <Fade reduce={reduce} delay={0.12}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[1.125rem] leading-relaxed text-muted sm:text-[1.2rem]">
            Clipz is a lightning-fast clipboard manager for Windows that lives in a
            floating notch at the top of your screen. It captures everything you copy,
            categorizes it instantly, and encrypts what matters. All in under 1% CPU.
          </p>
        </Fade>

        <Fade reduce={reduce} delay={0.18}>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#download"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-violet-deep)] px-7 py-3.5 text-[0.98rem] font-medium text-white shadow-[0_10px_40px_-10px_rgba(109,92,255,0.85)] transition-all hover:-translate-y-0.5 hover:bg-[var(--color-violet)]"
            >
              <WindowsGlyph className="h-4 w-4" />
              Download for Windows
            </a>
            <a
              href="https://github.com/56steve/clipz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.02] px-6 py-3.5 text-[0.98rem] text-text backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[var(--border-glow)]"
            >
              <Github className="h-4 w-4" />
              View source
            </a>
          </div>
        </Fade>

        <Fade reduce={reduce} delay={0.24}>
          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm text-faint">
            <span>Windows 10 &amp; 11</span>
            <span className="h-1 w-1 rounded-full bg-faint" />
            <span>~4 MB installer</span>
            <span className="h-1 w-1 rounded-full bg-faint" />
            <span>Free &amp; open source (MIT)</span>
          </p>
        </Fade>
      </div>

      {/* Product stage: notch floating at the top of a mock screen */}
      <Fade reduce={reduce} delay={0.3}>
        <div className="container-page mt-16">
          <div className="relative mx-auto max-w-[980px]">
            <div className="border-gradient relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-gradient-to-b from-[#0c0c15] to-[#08080d] p-3 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]">
              {/* faux desktop */}
              <div className="relative h-[360px] overflow-hidden rounded-[18px] bg-[radial-gradient(120%_100%_at_50%_-20%,#1a1730_0%,#0b0b14_55%,#08080d_100%)] sm:h-[420px]">
                {/* window hints behind */}
                <div className="absolute left-8 top-24 hidden h-40 w-64 rotate-[-4deg] rounded-xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm sm:block" />
                <div className="absolute right-10 top-32 hidden h-48 w-56 rotate-[3deg] rounded-xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm sm:block" />

                {/* the notch, anchored top-center */}
                <div className="absolute inset-x-0 top-3 z-10">
                  <NotchSimulator defaultExpanded />
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#08080d] to-transparent" />
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-faint">
              Hover the notch to expand. Use{" "}
              <span className="font-mono text-muted">arrow keys</span> and{" "}
              <span className="font-mono text-muted">enter</span> to try it.
            </p>
          </div>
        </div>
      </Fade>
    </section>
  );
}

function Fade({
  children,
  delay = 0,
  reduce,
}: {
  children: React.ReactNode;
  delay?: number;
  reduce: boolean | null;
}) {
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
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
