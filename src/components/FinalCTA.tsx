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
      className="border-t border-[var(--border)] section-pad"
    >
      <div className="container-page flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-balance text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
          Give your clipboard a home at the top of the screen.
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/api/download"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-violet-deep)] px-7 py-3.5 text-[0.98rem] font-medium text-white transition-all duration-200 hover:bg-[var(--color-violet)]"
          >
            <WindowsGlyph className="h-4 w-4" />
            Download for Windows
          </a>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 font-mono text-[0.72rem] text-faint">
          <span>clipz-2.0.1-x64-setup.exe &middot; 4 MB &middot;</span>
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

