function WindowsGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm0 13 7.5 1.1v-7H3v5.9Zm8.5 1.2L21 21V12.5h-9.5v7.2Zm0-15.4v7.2H21V3l-9.5 1.3Z" />
    </svg>
  );
}

export function FinalCTA() {
  return (
    <section
      id="download"
      className="border-t border-[var(--border)] py-32"
    >
      <div className="container-page flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-balance text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
          Give your clipboard a home at the top of the screen.
        </h2>
        <a
          href="https://github.com/56steve/clipz/releases/latest"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-violet-deep)] px-7 py-3.5 text-[0.98rem] font-medium text-white transition-colors hover:bg-[var(--color-violet)]"
        >
          <WindowsGlyph className="h-4 w-4" />
          Download for Windows
        </a>
        <p className="mt-6 font-mono text-[0.72rem] text-faint">
          clipz-2.0.1-x64-setup.exe &middot; 4 MB &middot; SHA-256 verified
        </p>
      </div>
    </section>
  );
}
