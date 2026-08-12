"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Play, RotateCcw, Search, ShieldCheck } from "@/components/ui/icons";

type Step = {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  specs: string[];
  visual: React.ReactNode;
  reverse?: boolean;
};

const STEPS: Step[] = [
  {
    index: "01",
    eyebrow: "Capture",
    title: "Every copy, without the overhead.",
    body: "A native Rust process listens directly to Win32 clipboard events. Text, links, code, and credentials are picked up the instant they land, then classified before they hit disk.",
    specs: [
      "Win32 AddClipboardFormatListener",
      "Rust core, <1% idle CPU",
      "Auto-classified: text / code / link / secret",
    ],
    visual: <CaptureVisual />,
  },
  {
    index: "02",
    eyebrow: "Recall",
    title: "Sub-millisecond search over your history.",
    body: "Everything you copy is indexed in a local SQLite FTS5 table. Type in the notch and results narrow as fast as you can press keys, across 100k rows without a spinner.",
    specs: [
      "SQLite FTS5 full-text index",
      "Category filter tabs, keyboard-driven",
      "Paste back with Enter or Ctrl+1..9",
    ],
    visual: <RecallVisual />,
    reverse: true,
  },
  {
    index: "03",
    eyebrow: "Protect",
    title: "Credentials that clean up after themselves.",
    body: "Anything the classifier marks as sensitive is sealed with the native Windows Data Protection API and dropped from RAM 60 seconds after capture. No cloud, no account, no telemetry.",
    specs: [
      "Windows DPAPI, keyed to user account",
      "Plaintext scrubbed from RAM after 60s",
      "Local-only SQLite DB, no network",
    ],
    visual: <ProtectVisual />,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="section-pad">
      <div className="container-page">
        <div className="mb-24 flex items-baseline justify-between gap-6 border-b border-[var(--border)] pb-6">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-[-0.02em]">
            How it works
          </h2>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-faint">
            Three parts
          </span>
        </div>

        <div className="flex flex-col gap-32">
          {STEPS.map((s) => (
            <div
              key={s.index}
              className={cn(
                "grid items-center gap-14 lg:grid-cols-2",
                s.reverse && "lg:[&>*:first-child]:order-2"
              )}
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-faint">{s.index}</span>
                  <span className="h-px w-8 bg-[var(--border-strong)]" />
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-violet">
                    {s.eyebrow}
                  </span>
                </div>
                <h3 className="mt-5 max-w-md text-[clamp(1.6rem,2.6vw,2.15rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                  {s.title}
                </h3>
                <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-muted">
                  {s.body}
                </p>
                <ul className="mt-7 flex flex-col gap-2 border-l border-[var(--border)] pl-4">
                  {s.specs.map((spec) => (
                    <li
                      key={spec}
                      className="font-mono text-[0.78rem] leading-relaxed text-faint"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div>{s.visual}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------- Visuals ---------- */

function CaptureVisual() {
  const [stream, setStream] = useState([
    { c: "var(--color-muted)", label: "text", value: "Meeting notes copied from Notion" },
    { c: "var(--color-blue)", label: "code", value: "const fetchUser = async (id) => {" },
    { c: "var(--color-cyan)", label: "link", value: "https://vercel.com/dashboard" },
    { c: "var(--color-amber)", label: "secret", value: "sk-live-•••••••••••••••" },
  ]);

  function triggerWin32Event() {
    const samples = [
      { c: "var(--color-blue)", label: "code", value: "git commit -m 'feat: dynamic island'" },
      { c: "var(--color-cyan)", label: "link", value: "https://tauri.app/v2" },
      { c: "var(--color-amber)", label: "secret", value: "ghp_••••••••••••••••••••" },
      { c: "var(--color-muted)", label: "text", value: "Design system tokens synced" },
    ];
    const next = samples[Math.floor(Math.random() * samples.length)];
    setStream((prev) => [next, ...prev.slice(0, 3)]);
  }

  return (
    <div className="matte-card relative rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.16em] text-faint">
        <span>clipboard stream</span>
        <button
          onClick={triggerWin32Event}
          className="flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-white/[0.04] px-2.5 py-1 text-[0.65rem] text-text transition-colors hover:bg-white/[0.08] cursor-pointer"
        >
          <Play className="h-2.5 w-2.5" />
          Simulate Win32 event
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {stream.map((e, i) => (
          <div
            key={`${e.value}-${i}`}
            className={cn(
              "flex items-center gap-3 rounded-lg border border-[var(--border-subtle)] bg-[#0d0f17] px-3 py-2.5 transition-all duration-300",
              i === 0 && "border-[var(--border-strong)] bg-white/[0.03]"
            )}
          >
            <span
              className="w-16 shrink-0 font-mono text-[0.68rem] uppercase tracking-wider font-medium"
              style={{ color: e.c }}
            >
              {e.label}
            </span>
            <span className="truncate font-mono text-[0.78rem] text-muted">
              {e.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecallVisual() {
  const [query, setQuery] = useState("fetchUser");
  const [activeTab, setActiveTab] = useState("Code");

  const database = [
    { cat: "Code", text: "const fetchUser = async (id) => {" },
    { cat: "Code", text: "fetchUser(currentUser.id)" },
    { cat: "Code", text: "// TODO: retry fetchUser on 5xx" },
    { cat: "Text", text: "User fetch query optimization" },
    { cat: "Links", text: "https://api.github.com/users/steve" },
  ];

  const filtered = database.filter(
    (item) =>
      (activeTab === "All" || item.cat === activeTab) &&
      item.text.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="matte-card rounded-xl p-5">
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[#0d0f17] px-3 py-2 font-mono text-[0.78rem] text-text">
        <Search className="h-3.5 w-3.5 text-faint" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter FTS5 database..."
          className="w-full bg-transparent text-[0.78rem] font-mono text-text focus:outline-none placeholder:text-faint"
        />
        <span className="ml-auto rounded border border-[var(--border)] px-1.5 py-0.5 text-[0.62rem] text-faint">
          FTS5
        </span>
      </div>
      <div className="mb-3 flex gap-1.5">
        {["All", "Code", "Links", "Text"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={cn(
              "rounded-md px-2.5 py-0.5 font-mono text-[0.66rem] transition-colors cursor-pointer",
              activeTab === t
                ? "bg-white/[0.1] text-text font-semibold border border-white/10"
                : "text-faint hover:text-muted"
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-1 min-h-[96px]">
        {filtered.length === 0 ? (
          <div className="py-6 text-center font-mono text-xs text-faint">
            No matches for &ldquo;{query}&rdquo;
          </div>
        ) : (
          filtered.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-white/[0.03]"
            >
              <span className="font-mono text-[0.62rem] text-faint">0{i + 1}</span>
              <span className="truncate font-mono text-[0.78rem] text-muted">
                {item.text}
              </span>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3 font-mono text-[0.66rem] text-faint">
        <span>{filtered.length} matches</span>
        <span className="text-emerald font-medium">0.3 ms FTS5</span>
      </div>
    </div>
  );
}

function ProtectVisual() {
  const [ramState, setRamState] = useState<"normal" | "wiping" | "wiped">("normal");
  const [elapsed, setElapsed] = useState("0.02s");

  function triggerWipe() {
    setRamState("wiping");
    setElapsed("15.00s");
    setTimeout(() => {
      setElapsed("60.00s");
      setRamState("wiped");
    }, 1200);
  }

  function resetWipe() {
    setRamState("normal");
    setElapsed("0.02s");
  }

  return (
    <div className="matte-card rounded-xl p-5 font-mono text-[0.78rem]">
      <div className="mb-4 flex items-center justify-between text-[0.68rem] uppercase tracking-[0.16em] text-faint">
        <span>lifecycle simulator</span>
        {ramState === "normal" ? (
          <button
            onClick={triggerWipe}
            className="flex items-center gap-1 rounded-md border border-[var(--border)] bg-white/[0.04] px-2 py-0.5 text-amber transition-colors hover:bg-white/[0.08] cursor-pointer"
          >
            <ShieldCheck className="h-3 w-3" />
            Fast-forward 60s RAM TTL
          </button>
        ) : (
          <button
            onClick={resetWipe}
            className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-white/[0.05] px-2 py-0.5 text-faint transition-colors hover:text-text cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            Reset State
          </button>
        )}
      </div>
      <ol className="flex flex-col">
        {[
          { t: "0.00s", label: "captured", desc: "Win32 clipboard event", c: "text-muted" },
          { t: "0.01s", label: "classified", desc: "matches secret heuristic", c: "text-amber" },
          { t: "0.02s", label: "sealed", desc: "DPAPI encrypt to disk", c: "text-amber" },
          {
            t: elapsed,
            label: ramState === "wiped" ? "RAM scrubbed" : "60s RAM TTL",
            desc:
              ramState === "wiped"
                ? "0x00 zeroed from process RAM"
                : ramState === "wiping"
                ? "Scrubbing memory buffers..."
                : "Plaintext active in buffer",
            c: ramState === "wiped" ? "text-emerald font-semibold" : "text-emerald",
          },
        ].map((step, i, arr) => (
          <li key={i} className="relative flex gap-4 pb-4 last:pb-0">
            {i < arr.length - 1 && (
              <span className="absolute left-[38px] top-4 h-full w-px bg-[var(--border)]" />
            )}
            <span className="w-14 shrink-0 pt-0.5 text-[0.7rem] text-faint">
              {step.t}
            </span>
            <span
              className={cn(
                "relative z-10 mt-1 h-2 w-2 shrink-0 rounded-full transition-all duration-300",
                step.c.includes("emerald")
                  ? "bg-emerald shadow-[0_0_8px_rgba(56,224,165,0.6)]"
                  : step.c.includes("amber")
                  ? "bg-amber"
                  : "bg-white/30"
              )}
            />
            <div className="min-w-0 flex-1">
              <div className={cn("text-[0.82rem]", step.c)}>{step.label}</div>
              <div className="text-[0.7rem] text-faint">{step.desc}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

