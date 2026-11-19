import Image from "next/image";
import { HeroAtmosphericBackground } from "./HeroAtmosphericBackground";
import { HeroSmoke } from "./HeroSmoke";
import { StoreBadge } from "./StoreBadge";
import { Reveal } from "./motion/Reveal";
import { TiltFrame } from "./motion/TiltFrame";
import { Typewriter } from "./motion/Typewriter";
import { APP_VERSION, GITHUB_URL } from "@/lib/links";

const PILL =
  "btn-depth-soft inline-flex min-h-11 items-center gap-2 px-5 text-[0.875rem] font-medium";

export function Hero() {
  return (
    <HeroAtmosphericBackground>
      <section id="top" className="relative px-4 pb-10 pt-28 sm:pt-32">
        <HeroSmoke />
        <div className="container-page relative z-10 flex flex-col items-center text-center">
          <Reveal onLoad delay={0.05} y={16}>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.875rem] text-muted ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.04] hover:text-text"
            >
              Free &amp; open source
              <span aria-hidden>&rarr;</span>
            </a>
          </Reveal>

          <div className="mx-auto grid max-w-4xl">
            <h1 className="text-balance text-[clamp(2.19rem,9vw,3.75rem)] font-light leading-[1.04] tracking-[-0.04em] [grid-area:1/1]">
              <Typewriter
                lines={["Your clipboard,", "living in the notch."]}
                startMs={350}
                stepMs={48}
              />
            </h1>
            {/* Same text, drawn only where the smoke's colour passes over it. */}
            <div
              aria-hidden="true"
              data-smoke-tint
              className="hero-tint pointer-events-none select-none text-balance text-[clamp(2.19rem,9vw,3.75rem)] font-light leading-[1.04] tracking-[-0.04em] [grid-area:1/1]"
            >
              <span className="block">Your clipboard,</span>
              <span className="block">living in the notch.</span>
            </div>
          </div>

          <Reveal onLoad delay={1.8} y={18}>
            <p className="mx-auto mt-6 max-w-lg text-pretty text-[1.125rem] leading-[1.56] text-muted">
              Everything you copy, captured, searchable and encrypted. For
              Windows and macOS.
            </p>
          </Reveal>

          <Reveal onLoad delay={1.95} y={18}>
            <div className="mt-9 flex flex-col items-center gap-4">
              <StoreBadge />
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="/api/download" className={PILL}>
                  <WindowsGlyph className="h-4 w-4" />
                  Windows installer
                </a>
                <a href="/api/download?platform=mac" className={PILL}>
                  <AppleGlyph className="h-4 w-4" />
                  macOS (.dmg)
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal onLoad delay={2.1} y={12}>
            <p className="mt-6 text-[0.875rem] text-faint">
              {`v${APP_VERSION} · Windows 10/11 · macOS Apple Silicon · MIT`}
            </p>
          </Reveal>
        </div>

        <div className="container-page relative z-10 mt-10">
          <TiltFrame delay={2} className="mx-auto max-w-[1040px]">
            <Image
              src="/screenshots/drawer.png"
              alt="The Clipz notch drawer listing recent clips with search and filters"
              width={1440}
              height={1000}
              priority
              sizes="(min-width: 1080px) 1040px, 100vw"
              className="relative h-auto w-full rounded-2xl border border-[var(--border-strong)]"
            />
          </TiltFrame>
        </div>
      </section>
    </HeroAtmosphericBackground>
  );
}

function WindowsGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm0 13 7.5 1.1v-7H3v5.9Zm8.5 1.2L21 21V12.5h-9.5v7.2Zm0-15.4v7.2H21V3l-9.5 1.3Z" />
    </svg>
  );
}

function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.11-1 .04-2.19.67-2.88 1.48-.62.72-1.15 1.88-.99 3.01 1.12.09 2.22-.56 2.88-1.38z" />
    </svg>
  );
}
