import { NotchSimulator } from "./NotchSimulator";

export function InteractiveDemo() {
  return (
    <section id="demo" className="section-pad border-t border-[var(--border)]">
      <div className="container-page">
        <div className="mb-16 flex items-baseline justify-between gap-6 border-b border-[var(--border)] pb-6">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-[-0.02em]">
            Try it, right here.
          </h2>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-faint">
            Live component
          </span>
        </div>

        <p className="mb-14 max-w-2xl text-[1rem] leading-relaxed text-muted">
          The notch below is the same component that ships in the app. Hover to
          expand, type to search, use{" "}
          <span className="font-mono text-text">arrows</span> and{" "}
          <span className="font-mono text-text">enter</span> to navigate. Nothing
          about it is a screenshot.
        </p>

        <figure className="relative overflow-hidden rounded-[20px] border border-[var(--border)] bg-[#08080d]">
          {/* soft ceiling light, static */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-64"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 0%, rgba(255,255,255,0.05), transparent 70%)",
            }}
          />
          <div className="relative flex min-h-[500px] items-start justify-center px-4 pt-8">
            <div className="absolute inset-x-0 top-6 z-10">
              <NotchSimulator defaultExpanded />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
