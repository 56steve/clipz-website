import { Github, Scissors } from "@/components/ui/icons";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Live demo", href: "#demo" },
      { label: "Shortcuts", href: "#shortcuts" },
      { label: "Download", href: "#download" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "GitHub", href: "https://github.com/56steve/clipz" },
      { label: "Releases", href: "https://github.com/56steve/clipz/releases" },
      { label: "Issues", href: "https://github.com/56steve/clipz/issues" },
      { label: "Changelog", href: "https://github.com/56steve/clipz/releases" },
    ],
  },
  {
    title: "Security",
    links: [
      { label: "DPAPI encryption", href: "#security" },
      { label: "RAM TTL", href: "#security" },
      { label: "Local-first", href: "#security" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-bg-elevated">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--color-violet-deep)] text-white">
                <Scissors className="h-4 w-4" />
              </span>
              <span className="text-[1.05rem] font-semibold">Clipz</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              The Dynamic Island clipboard hub for Windows. Fast, secure, and open source.
            </p>
            <a
              href="https://github.com/56steve/clipz"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-3.5 py-2 text-sm text-muted transition-colors hover:border-[var(--border-glow)] hover:text-text"
            >
              <Github className="h-4 w-4" /> github.com/56steve/clipz
            </a>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-medium uppercase tracking-[0.12em] text-faint">
                {c.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-text"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-6 sm:flex-row">
          <p className="text-sm text-faint">
            &copy; {new Date().getFullYear()} Clipz. Released under the MIT License.
          </p>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs text-faint">
              MIT
            </span>
            <span className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs text-faint">
              v2.0.1
            </span>
            <span className="text-sm text-faint">Built for Windows</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
