import { StoreBadge } from "./StoreBadge";
import { Reveal } from "./motion/Reveal";
import { WordReveal } from "./motion/WordReveal";
import Link from "next/link";
import { APP_VERSION, FEEDBACK_PATH, STORE_URL } from "@/lib/links";

export function FinalCTA() {
  return (
    <section
      id="download"
      className="border-t border-[var(--border)] section-pad"
    >
      <div className="container-page flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-balance text-[clamp(1.5rem,5vw,2.25rem)] font-light leading-[1.25] tracking-[-0.02em]">
          <WordReveal
            lines={["Give your clipboard a home", "at the top of the screen."]}
          />
        </h2>
        <Reveal delay={0.3} className="mt-10 flex flex-col items-center gap-4">
          <StoreBadge />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/api/download"
              className="btn-depth-soft inline-flex min-h-11 items-center px-5 text-[0.875rem] font-medium"
            >
              Windows installer (.exe)
            </a>
            <a
              href="/api/download?platform=mac"
              className="btn-depth-soft inline-flex min-h-11 items-center px-5 text-[0.875rem] font-medium"
            >
              macOS (.dmg)
            </a>
          </div>
        </Reveal>
        <p className="mt-6 text-[0.875rem] text-faint">
          {`v${APP_VERSION} · Windows 10/11 · macOS Apple Silicon`}
        </p>
        <p className="mt-3 text-[0.875rem] text-faint">
          Enjoying Clipz?{" "}
          <a
            href={STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="link-underline text-muted transition-colors hover:text-text"
          >
            Rate it on the Microsoft Store
          </a>{" "}
          or{" "}
          <Link
            href={FEEDBACK_PATH}
            className="link-underline text-muted transition-colors hover:text-text"
          >
            tell me what to build next
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
