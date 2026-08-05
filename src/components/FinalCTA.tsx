import { Github } from "@/components/ui/icons";
import { Reveal } from "./ui/Reveal";
import { Aurora } from "./ui/Aurora";

function WindowsGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm0 13 7.5 1.1v-7H3v5.9Zm8.5 1.2L21 21V12.5h-9.5v7.2Zm0-15.4v7.2H21V3l-9.5 1.3Z" />
    </svg>
  );
}

export function FinalCTA() {
  return (
    <section id="download" className="section-pad relative overflow-hidden">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-gradient-to-b from-[#0e0d1a] to-[#09090f] px-6 py-16 text-center sm:px-16 sm:py-20">
            <Aurora />
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.03] px-3.5 py-1.5 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              v2.0.1 available now
            </span>

            <h2 className="mx-auto mt-6 max-w-2xl text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05]">
              Give your clipboard a{" "}
              <span className="text-gradient">home at the top of your screen</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[1.05rem] text-muted">
              Free, open source, and about 4 MB. Download it, copy something, and watch the
              notch light up.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://github.com/56steve/clipz/releases/latest"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-violet-deep)] px-8 py-4 text-[1rem] font-medium text-white shadow-[0_12px_44px_-10px_rgba(109,92,255,0.9)] transition-all hover:-translate-y-0.5 hover:bg-[var(--color-violet)]"
              >
                <WindowsGlyph className="h-5 w-5" />
                Download for Windows
              </a>
              <a
                href="https://github.com/56steve/clipz"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.02] px-7 py-4 text-[1rem] text-text transition-all hover:-translate-y-0.5 hover:border-[var(--border-glow)]"
              >
                <Github className="h-5 w-5" />
                Star on GitHub
              </a>
            </div>

            <p className="mt-6 font-mono text-xs text-faint">
              clipz-2.0.1-x64-setup.exe &middot; SHA-256 verified &middot; Windows 10 / 11
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
