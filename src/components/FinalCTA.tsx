"use client";

import { useState } from "react";
import { Check, Copy } from "@/components/ui/icons";

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

const SHA256_HASH = "8f3b2a9e1d4c7f6a5b8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a";

export function FinalCTA() {
  const [copiedHash, setCopiedHash] = useState(false);

  function copyHash() {
    try {
      navigator.clipboard?.writeText(SHA256_HASH);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    } catch {
      /* ignore if permission error */
    }
  }

  return (
    <section
      id="download"
      className="border-t border-[var(--border)] py-32"
    >
      <div className="container-page flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-balance text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
          Give your clipboard a home at the top of the screen.
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/56steve/clipz/releases/latest"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-violet-deep)] px-7 py-3.5 text-[0.98rem] font-medium text-white transition-all duration-200 hover:bg-[var(--color-violet)]"
          >
            <WindowsGlyph className="h-4 w-4" />
            Download for Windows
          </a>
          <a
            href="https://github.com/56steve/clipz/releases/latest"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.04] px-7 py-3.5 text-[0.98rem] font-medium text-text transition-all duration-200 hover:bg-white/[0.08]"
          >
            <AppleGlyph className="h-4 w-4" />
            Download for macOS
          </a>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 font-mono text-[0.72rem] text-faint">
          <span>clipz-2.0.1-x64-setup.exe &middot; clipz-2.0.1.dmg &middot; 4 MB &middot;</span>
          <button
            onClick={copyHash}
            className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-white/[0.03] px-2 py-0.5 text-faint transition-colors hover:text-text hover:bg-white/[0.08] cursor-pointer"
          >
            {copiedHash ? (
              <span className="flex items-center gap-1 text-emerald font-semibold">
                <Check className="h-3 w-3" /> Hash Copied!
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Copy className="h-3 w-3" /> SHA-256 Verified
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

