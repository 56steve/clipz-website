"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { HeroBolt } from "./HeroBolt";
import { StoreBadge } from "./StoreBadge";
import { Keyboard, Lock, Search } from "@/components/ui/icons";
import { APP_VERSION, GITHUB_URL } from "@/lib/links";

const HIGHLIGHTS: { label: string; Icon: typeof Search }[] = [
  { label: "Instant search", Icon: Search },
  { label: "Encrypted secrets", Icon: Lock },
  { label: "Keyboard first", Icon: Keyboard },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-20 pt-28 sm:pt-32"
    >
      <HeroBolt />

      <div className="container-page relative flex flex-col items-center text-center">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[0.82rem] text-muted ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.04] hover:text-text"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-violet)]" />
          Free &amp; open source
          <span aria-hidden>&rarr;</span>
        </a>

        <h1 className="mx-auto max-w-4xl text-balance text-[clamp(2.4rem,6vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
          Your clipboard,
          <br />
          living in the notch.
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-pretty text-[1.1rem] leading-relaxed text-muted">
          Everything you copy, captured, searchable and encrypted. For Windows
          and macOS.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4">
          <StoreBadge />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/api/download"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[0.95rem] text-muted ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.04] hover:text-text"
            >
              <WindowsGlyph className="h-4 w-4" />
              Windows installer
            </a>
            <a
              href="/api/download?platform=mac"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[0.95rem] text-muted ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.04] hover:text-text"
            >
              <AppleGlyph className="h-4 w-4" />
              macOS (.dmg)
            </a>
          </div>
        </div>

        <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {HIGHLIGHTS.map(({ label, Icon }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 text-[0.95rem] text-text"
            >
              <Icon className="h-4 w-4 text-[var(--color-violet)]" />
              {label}
            </li>
          ))}
        </ul>

        <p className="mt-5 font-mono text-[0.82rem] text-faint">
          {`v${APP_VERSION} · Windows 10/11 · macOS Apple Silicon · MIT`}
        </p>
      </div>

      <FadeUp reduce={reduce}>
        <div className="container-page relative mt-14">
          <div className="relative mx-auto max-w-[1040px]">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-10 -bottom-10 top-1/3 -z-0 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(124,134,255,0.28),transparent_70%)] blur-2xl"
            />
            <Image
              src="/screenshots/drawer.png"
              alt="The Clipz notch drawer listing recent clips with search and filters"
              width={1920}
              height={1080}
              priority
              sizes="(min-width: 1080px) 1040px, 100vw"
              className="relative h-auto w-full rounded-2xl border border-[var(--border-strong)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
            />
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

function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.11-1 .04-2.19.67-2.88 1.48-.62.72-1.15 1.88-.99 3.01 1.12.09 2.22-.56 2.88-1.38z" />
    </svg>
  );
}
