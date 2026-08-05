import {
  Activity,
  Filter,
  History,
  LayoutPanelTop,
  Search,
  ShieldCheck,
} from "lucide-react";
import { GlassCard } from "./ui/GlassCard";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { cn } from "@/lib/cn";

type Feature = {
  icon: typeof Search;
  title: string;
  body: string;
  accent: string;
  span: string;
  big?: boolean;
};

const FEATURES: Feature[] = [
  {
    icon: LayoutPanelTop,
    title: "The Dynamic Island notch",
    body: "A floating, glassmorphic notch sits at the top center of your screen. Hover to expand the drawer, glance at your latest clips, and dismiss it without ever breaking flow.",
    accent: "var(--color-violet)",
    span: "lg:col-span-4 lg:row-span-2",
    big: true,
  },
  {
    icon: Search,
    title: "SQLite FTS5 search",
    body: "Full-text search across your entire history with sub-millisecond results. No lag, no waiting.",
    accent: "var(--color-cyan)",
    span: "lg:col-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Encrypted at rest",
    body: "Sensitive clips are sealed with native Windows DPAPI and wiped from RAM after 60 seconds.",
    accent: "var(--color-amber)",
    span: "lg:col-span-2",
  },
  {
    icon: Activity,
    title: "Win32 real-time capture",
    body: "A lean Rust backend listens to clipboard events natively, capturing text, URLs, code, and snippets the instant you copy them, at under 1% idle CPU.",
    accent: "var(--color-blue)",
    span: "lg:col-span-3",
  },
  {
    icon: Filter,
    title: "Smart categorization",
    body: "Every clip is auto-detected and sorted into Text, Code, Links, and Sensitive, with instant filter tabs to narrow the list.",
    accent: "var(--color-emerald)",
    span: "lg:col-span-3",
  },
  {
    icon: History,
    title: "Paste tracking",
    body: "Clipz remembers the source application a snippet came from and the window you pasted it into, so your history stays contextual.",
    accent: "var(--color-violet)",
    span: "lg:col-span-6",
  },
];

export function BentoFeatures() {
  return (
    <section id="features" className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="Everything, in one notch"
          title={
            <>
              Built for people who <span className="text-gradient">copy for a living</span>
            </>
          }
          description="Six pieces of engineering that turn the clipboard from a black hole into a searchable, secure, contextual workspace."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.06} className={cn(f.span)}>
              <GlassCard
                interactive
                className={cn(
                  "relative flex h-full flex-col overflow-hidden p-6",
                  f.big && "min-h-[300px]"
                )}
              >
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ background: `${f.accent}1a`, color: f.accent }}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[1.2rem]">{f.title}</h3>
                <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-muted">
                  {f.body}
                </p>

                {f.big && <BigCardVisual accent={f.accent} />}

                {/* hover bloom */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: f.accent }}
                />
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Decorative mini notch drawer for the large feature card. */
function BigCardVisual({ accent }: { accent: string }) {
  return (
    <div className="mask-fade-b mt-auto pt-8">
      <div className="mx-auto max-w-sm rounded-2xl border border-[var(--border)] bg-black/30 p-3">
        <div className="mb-2.5 flex gap-1.5">
          {["All", "Code", "Links", "Text"].map((t, i) => (
            <span
              key={t}
              className={cn(
                "rounded-full px-2 py-0.5 text-[0.65rem]",
                i === 0 ? "text-text" : "text-faint"
              )}
              style={i === 0 ? { boxShadow: `inset 0 0 0 1px ${accent}66` } : undefined}
            >
              {t}
            </span>
          ))}
        </div>
        {[
          { c: "var(--color-blue)", w: "w-4/5" },
          { c: "var(--color-cyan)", w: "w-3/5" },
          { c: "var(--color-amber)", w: "w-2/3" },
        ].map((row, i) => (
          <div
            key={i}
            className="mb-1.5 flex items-center gap-2.5 rounded-lg px-2 py-2"
            style={i === 0 ? { background: "rgba(255,255,255,0.05)" } : undefined}
          >
            <span
              className="h-5 w-5 shrink-0 rounded-md"
              style={{ background: `${row.c}22` }}
            />
            <span className={cn("h-2 rounded-full", row.w)} style={{ background: "rgba(255,255,255,0.09)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
