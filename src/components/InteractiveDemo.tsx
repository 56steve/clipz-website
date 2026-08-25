"use client";

import { useState } from "react";
import { NotchSimulator } from "./NotchSimulator";
import { CLIPS, type Clip } from "@/lib/clips";
import { Code2, Link2, Lock, Type, RefreshCw, Check } from "@/components/ui/icons";

const DEMO_PRESETS: Omit<Clip, "id" | "time">[] = [
  {
    category: "code",
    lang: "ts",
    preview: "const { data } = await supabase.from('clips').select('*');",
    value: "const { data } = await supabase.from('clips').select('*');",
    source: "VS Code",
  },
  {
    category: "secret",
    preview: "whsec_•••••••••••••••• (Stripe Webhook Secret)",
    value: "whsec_9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d",
    source: "Stripe Dashboard",
  },
  {
    category: "link",
    preview: "https://github.com/56steve/clipz/releases",
    value: "https://github.com/56steve/clipz/releases",
    source: "Browser",
  },
  {
    category: "text",
    preview: "Review Q3 release notes & changelog before deploy.",
    value: "Review Q3 release notes & changelog before deploy.",
    source: "Notion",
  },
];

export function InteractiveDemo() {
  const [clips, setClips] = useState<Clip[]>(CLIPS);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);

  function simulateCopy(preset: Omit<Clip, "id" | "time">) {
    const newId = `custom-${clips.length + 1}-${preset.category}`;
    const newClip: Clip = {
      ...preset,
      id: newId,
      time: "just now",
    };

    try {
      navigator.clipboard?.writeText(preset.value);
    } catch {
      /* ignore if permissions denied */
    }

    setClips((prev) => [newClip, ...prev]);
    setHighlightId(newId);
    setLastAction(`Captured [${preset.category.toUpperCase()}] to notch!`);

    setTimeout(() => {
      setLastAction(null);
    }, 2500);
  }

  function resetClips() {
    setClips(CLIPS);
    setHighlightId(null);
    setLastAction("Reset to default clips");
    setTimeout(() => setLastAction(null), 2000);
  }

  return (
    <section id="demo" className="section-pad border-t border-[var(--border)]">
      <div className="container-page">
        <div className="mb-16 flex items-baseline justify-between gap-6 border-b border-[var(--border)] pb-6">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-[-0.02em]">
            Try it, right here.
          </h2>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-faint">
            Live playground
          </span>
        </div>

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-xl text-[1rem] leading-relaxed text-muted">
            The notch below is the exact component running live. Click any action
            button below to simulate a Win32 clipboard event and watch it get captured,
            classified, and indexed instantly.
          </p>

          <div className="flex items-center gap-3">
            {lastAction && (
              <span className="flex items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 font-mono text-xs text-emerald transition-all">
                <Check className="h-3.5 w-3.5" />
                {lastAction}
              </span>
            )}
            <button
              onClick={resetClips}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-faint transition-colors hover:bg-white/[0.08] hover:text-text cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" /> Reset
            </button>
          </div>
        </div>

        {/* Interactive copy actions bar */}
        <div className="mb-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {DEMO_PRESETS.map((p, idx) => {
            const Icon =
              p.category === "code"
                ? Code2
                : p.category === "secret"
                ? Lock
                : p.category === "link"
                ? Link2
                : Type;

            const accentColor =
              p.category === "code"
                ? "var(--color-blue)"
                : p.category === "secret"
                ? "var(--color-amber)"
                : p.category === "link"
                ? "var(--color-cyan)"
                : "var(--color-muted)";

            return (
              <button
                key={idx}
                onClick={() => simulateCopy(p)}
                className="group relative flex flex-col items-start gap-2 rounded-xl border border-[var(--border)] bg-black/40 p-3.5 text-left transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-white/[0.04] cursor-pointer"
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-wider font-medium"
                    style={{ color: accentColor }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    Simulate {p.category}
                  </span>
                  <span className="font-mono text-[0.65rem] text-faint opacity-0 transition-opacity group-hover:opacity-100">
                    + Copy
                  </span>
                </div>
                <span className="line-clamp-1 w-full font-mono text-[0.78rem] text-text">
                  {p.preview}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Stage */}
        <figure className="relative overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[#0d0f17]">
          <div className="flex items-center justify-between border-b border-[var(--border)] bg-[#12151f] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>
            <div className="font-mono text-[0.72rem] text-faint">
              Interactive Component Sandbox
            </div>
            <div className="w-12" />
          </div>
          <div className="relative flex min-h-[500px] items-start justify-center bg-[#090a0f] px-4 pt-8 pb-12">
            <div className="absolute inset-x-0 top-6 z-10">
              <NotchSimulator
                defaultExpanded
                customClips={clips}
                highlightId={highlightId}
              />
            </div>
          </div>
          <figcaption className="border-t border-[var(--border)] bg-[#11131a] py-3 text-center font-mono text-[0.72rem] text-faint">
            Interactive live notch instance &middot; Try typing to search or click simulation pills above
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

