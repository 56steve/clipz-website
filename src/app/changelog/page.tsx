import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Release notes and version history for Clipz.",
};

const RELEASES = [
  {
    version: "v2.0.1",
    date: "August 26, 2026",
    badge: "Latest",
    summary: "On-device OCR engine, clip favorites, and Win32 performance enhancements.",
    changes: [
      {
        tag: "Feature",
        color: "text-violet border-violet/20 bg-violet/10",
        items: [
          "Added on-device OCR engine for instant text extraction from copied screenshots and images.",
          "Added Star Favorites tab to keep key snippets and credentials permanently pinned.",
          "Indexed OCR extracted text inside SQLite FTS5 for sub-millisecond full-text search.",
        ],
      },
      {
        tag: "Improvement",
        color: "text-cyan border-cyan/20 bg-cyan/10",
        items: [
          "Optimized Win32 clipboard format listener CPU consumption to under 1% idle.",
          "Reduced Dynamic Island notch expand animation latency down to 12ms.",
          "Improved category auto-classifier precision for multi-line JSON and SQL queries.",
        ],
      },
      {
        tag: "Security",
        color: "text-amber border-amber/20 bg-amber/10",
        items: [
          "Hardened DPAPI key derivation routines for user-scoped encrypted disk storage.",
          "Guaranteed 60-second RAM zeroing for plaintext secret clips.",
        ],
      },
    ],
  },
  {
    version: "v2.0.0",
    date: "August 10, 2026",
    summary: "Complete Rust + Tauri v2 rewrite introducing the floating Dynamic Island notch UI.",
    changes: [
      {
        tag: "Feature",
        color: "text-violet border-violet/20 bg-violet/10",
        items: [
          "Redesigned desktop interface into a floating Dynamic Island notch positioned at the top of the display.",
          "Migrated storage engine to SQLite FTS5 for zero-latency searching across 100,000+ clips.",
          "Added custom clip reminders with timed desktop notifications.",
        ],
      },
      {
        tag: "Keyboard",
        color: "text-emerald border-emerald/20 bg-emerald/10",
        items: [
          "Added Ctrl + Shift + V global shortcut to summon the notch instantly.",
          "Added Ctrl + 1..9 shortcuts to quick-paste recent items.",
        ],
      },
    ],
  },
  {
    version: "v1.9.0",
    date: "July 2, 2026",
    summary: "Initial desktop clip manager with local DPAPI protection.",
    changes: [
      {
        tag: "Core",
        color: "text-faint border-white/10 bg-white/5",
        items: [
          "Implemented local clipboard capture for text, links, and code snippets.",
          "Added native Windows DPAPI encryption layer for private clip storage.",
        ],
      },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main className="container-page pb-24 pt-36 sm:pt-44">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Changelog
          </h1>
          <p className="mt-3 text-pretty text-base text-muted">
            New features, fixes, and performance updates shipped to Clipz.
          </p>

          <div className="mt-12 space-y-16">
            {RELEASES.map((rel) => (
              <article
                key={rel.version}
                className="relative border-t border-[var(--border)] pt-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <h2 className="font-mono text-2xl font-semibold text-text">
                      {rel.version}
                    </h2>
                    {rel.badge && (
                      <span className="rounded-full border border-emerald/30 bg-emerald/10 px-2.5 py-0.5 font-mono text-[0.68rem] font-medium text-emerald">
                        {rel.badge}
                      </span>
                    )}
                  </div>
                  <time className="font-mono text-[0.75rem] text-faint">
                    {rel.date}
                  </time>
                </div>

                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
                  {rel.summary}
                </p>

                <div className="mt-8 space-y-6">
                  {rel.changes.map((grp) => (
                    <div key={grp.tag} className="space-y-3">
                      <span
                        className={`inline-block rounded-md border px-2 py-0.5 font-mono text-[0.68rem] font-semibold uppercase tracking-wider ${grp.color}`}
                      >
                        {grp.tag}
                      </span>
                      <ul className="space-y-2 border-l border-[var(--border)] pl-4">
                        {grp.items.map((item) => (
                          <li
                            key={item}
                            className="text-sm leading-relaxed text-muted"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
