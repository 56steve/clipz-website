import { StoreBadge } from "./StoreBadge";
import { APP_VERSION } from "@/lib/links";

export function FinalCTA() {
  return (
    <section
      id="download"
      className="border-t border-[var(--border)] section-pad"
    >
      <div className="container-page flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-balance text-[clamp(1.5rem,5vw,2.25rem)] font-semibold leading-[1.25] tracking-[-0.02em]">
          Give your clipboard a home at the top of the screen.
        </h2>
        <div className="mt-10 flex flex-col items-center gap-4">
          <StoreBadge />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/api/download"
              className="inline-flex min-h-11 items-center rounded-full px-5 text-[0.875rem] font-medium text-muted ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.04] hover:text-text"
            >
              Windows installer (.exe)
            </a>
            <a
              href="/api/download?platform=mac"
              className="inline-flex min-h-11 items-center rounded-full px-5 text-[0.875rem] font-medium text-muted ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.04] hover:text-text"
            >
              macOS (.dmg)
            </a>
          </div>
        </div>
        <p className="mt-6 font-mono text-[0.82rem] text-faint">
          {`v${APP_VERSION} · Windows 10/11 · macOS Apple Silicon`}
        </p>
      </div>
    </section>
  );
}
