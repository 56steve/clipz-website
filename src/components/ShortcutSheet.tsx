"use client";

import { useState } from "react";
import { Kbd } from "./ui/Kbd";
import { cn } from "@/lib/cn";

type Row = { keys: React.ReactNode; label: string };

const ROWS: { title: string; items: Row[] }[] = [
  {
    title: "Navigation",
    items: [
      { keys: <Combo keys={["↑", "↓"]} />, label: "Navigate clips" },
      { keys: <Kbd>Tab</Kbd>, label: "Cycle category filter" },
      { keys: <Combo keys={["Ctrl / ⌘", "F"]} />, label: "Focus instant search" },
      { keys: <Kbd>Esc</Kbd>, label: "Collapse notch" },
    ],
  },
  {
    title: "Actions",
    items: [
      { keys: <Kbd>Enter</Kbd>, label: "Paste selection" },
      { keys: <Combo keys={["Ctrl / ⌘", "R"]} />, label: "Set clip reminder" },
      { keys: <Combo keys={["Ctrl / ⌘", "P"]} />, label: "Pin snippet to top" },
      { keys: <Combo keys={["Del / ⌥", "⌫"]} />, label: "Delete item" },
    ],
  },
  {
    title: "Global",
    items: [
      { keys: <Combo keys={["Ctrl / ⌘", "Shift", "V"]} />, label: "Summon Clipz notch" },
      { keys: <Combo keys={["Ctrl / ⌘", "1..9"]} />, label: "Quick-paste nth item" },
      { keys: <Combo keys={["Ctrl / ⌘", "Shift", "R"]} />, label: "Open Reminders list" },
      { keys: <Combo keys={["Ctrl / ⌘", ","]} />, label: "Preferences" },
    ],
  },
];

function Combo({ keys }: { keys: string[] }) {
  return (
    <span className="flex items-center gap-1">
      {keys.map((k, i) => (
        <span key={k} className="flex items-center gap-1">
          <Kbd>{k}</Kbd>
          {i < keys.length - 1 && <span className="text-faint">+</span>}
        </span>
      ))}
    </span>
  );
}

export function ShortcutSheet() {
  const [filter, setFilter] = useState("All");

  const visibleGroups = ROWS.filter(
    (g) => filter === "All" || g.title === filter
  );

  return (
    <section id="shortcuts" className="section-pad border-t border-[var(--border)]">
      <div className="container-page">
        <div className="mb-10 flex items-baseline justify-between gap-6 border-b border-[var(--border)] pb-6">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-[-0.02em]">
            Keyboard first.
          </h2>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-faint">
            Twelve shortcuts
          </span>
        </div>

        {/* Filter controls */}
        <div className="mb-10 flex gap-2">
          {["All", "Navigation", "Actions", "Global"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full px-3 py-1 font-mono text-xs transition-colors cursor-pointer",
                filter === cat
                  ? "bg-white/[0.1] text-text font-medium ring-1 ring-white/20"
                  : "text-faint hover:text-muted hover:bg-white/[0.04]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={cn(
          "grid gap-x-12 gap-y-12",
          filter === "All" ? "md:grid-cols-3" : "grid-cols-1 max-w-lg"
        )}>
          {visibleGroups.map((g) => (
            <div key={g.title} className="matte-card rounded-xl p-5">
              <h3 className="mb-6 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-violet">
                {g.title}
              </h3>
              <ul className="flex flex-col divide-y divide-[var(--border)]">
                {g.items.map((it, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-4 py-3.5 transition-colors hover:bg-white/[0.02] px-2 rounded-lg"
                  >
                    <span className="text-[0.95rem] text-muted">{it.label}</span>
                    <span className="shrink-0">{it.keys}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

