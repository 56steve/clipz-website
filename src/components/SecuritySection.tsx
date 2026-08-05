"use client";

import { useEffect, useState } from "react";
import { KeyRound, Lock, ShieldCheck, Timer } from "@/components/ui/icons";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { cn } from "@/lib/cn";

const POINTS = [
  {
    icon: KeyRound,
    title: "Sealed with Windows DPAPI",
    body: "Sensitive clips are encrypted at rest using the native Data Protection API, keyed to your Windows user account. No master password to leak, no keys to manage.",
  },
  {
    icon: Timer,
    title: "60-second RAM TTL",
    body: "Anything flagged as sensitive is purged from memory 60 seconds after capture. Passwords and tokens do not linger where they can be scraped.",
  },
  {
    icon: ShieldCheck,
    title: "Local-first, always",
    body: "Your history lives in a local SQLite database on your machine. No cloud sync, no telemetry, no account required.",
  },
];

export function SecuritySection() {
  return (
    <section id="security" className="section-pad bg-bg-elevated">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Security &amp; privacy"
              title={
                <>
                  Sensitive data that{" "}
                  <span className="text-gradient">cleans up after itself</span>
                </>
              }
              description="Clipz treats credentials differently from everything else, because they are."
            />
            <div className="mt-9 flex flex-col gap-6">
              {POINTS.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06}>
                  <div className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-amber)]/12 text-amber">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-[1.05rem]">{p.title}</h3>
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <TtlVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Animated lifecycle: a sensitive clip is captured, sealed, then wiped after its TTL. */
function TtlVisual() {
  const TTL = 60;
  const [t, setT] = useState(TTL);
  const [wiped, setWiped] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setT((prev) => {
        if (prev <= 1) {
          setWiped(true);
          window.setTimeout(() => setWiped(false), 900);
          return TTL;
        }
        return prev - 1;
      });
    }, 60); // sped up for the demo
    return () => window.clearInterval(id);
  }, []);

  const pct = t / TTL;
  const R = 52;
  const C = 2 * Math.PI * R;

  return (
    <div className="glass relative overflow-hidden rounded-[24px] p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm text-muted">
          <Lock className="h-4 w-4 text-amber" /> Sensitive clip
        </span>
        <span className="rounded-full border border-[var(--color-amber)]/30 bg-[var(--color-amber)]/10 px-2.5 py-1 font-mono text-xs text-amber">
          DPAPI sealed
        </span>
      </div>

      <div className="flex items-center gap-8">
        <div className="relative grid h-32 w-32 shrink-0 place-items-center">
          <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
            <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
            <circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke="var(--color-amber)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - pct)}
              style={{ transition: "stroke-dashoffset 60ms linear" }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-mono text-2xl font-semibold text-text">{t}s</span>
            <span className="text-[0.65rem] uppercase tracking-wider text-faint">
              in RAM
            </span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div
            className={cn(
              "rounded-xl border p-3 font-mono text-sm transition-all duration-500",
              wiped
                ? "border-emerald/30 bg-emerald/5 text-emerald"
                : "border-[var(--border)] bg-black/30 text-amber"
            )}
          >
            {wiped ? "memory wiped ✓" : "sk-live-••••••••••••••"}
          </div>
          <p className="mt-3 text-[0.85rem] leading-relaxed text-faint">
            After the TTL elapses, the plaintext is scrubbed from memory. Only the
            DPAPI-encrypted record remains on disk.
          </p>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-20 -right-20 h-52 w-52 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--color-amber)" }}
      />
    </div>
  );
}
