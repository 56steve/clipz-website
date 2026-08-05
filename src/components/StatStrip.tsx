"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

type Stat = {
  to: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  label: string;
};

const STATS: Stat[] = [
  { to: 1, prefix: "<", suffix: " ms", label: "FTS5 search latency" },
  { to: 1, prefix: "<", suffix: " %", label: "Idle CPU usage" },
  { to: 60, suffix: " s", label: "Sensitive RAM TTL" },
  { to: 4, suffix: " MB", label: "Installer footprint" },
];

function AnimatedNumber({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, stat.to, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, stat.to]);

  return (
    <span ref={ref}>
      {stat.prefix}
      {val.toFixed(stat.decimals ?? 0)}
      {stat.suffix}
    </span>
  );
}

export function StatStrip() {
  return (
    <section className="container-page">
      <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] md:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center gap-1.5 bg-white/[0.01] px-6 py-8 text-center"
          >
            <span className="text-[clamp(1.9rem,3vw,2.6rem)] font-semibold tracking-tight text-gradient">
              <AnimatedNumber stat={s} />
            </span>
            <span className="text-sm text-muted">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
