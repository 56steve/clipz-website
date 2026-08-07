const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#how" },
      { label: "Security", href: "#security" },
      { label: "Shortcuts", href: "#shortcuts" },
      { label: "Download", href: "#download" },
    ],
  },
  {
    title: "Source",
    links: [
      { label: "GitHub", href: "https://github.com/56steve/clipz" },
      { label: "Releases", href: "https://github.com/56steve/clipz/releases" },
      { label: "Issues", href: "https://github.com/56steve/clipz/issues" },
    ],
  },
  {
    title: "Stack",
    links: [
      { label: "Rust + Tauri v2", href: "https://tauri.app" },
      { label: "SQLite FTS5", href: "https://sqlite.org/fts5.html" },
      { label: "Windows DPAPI", href: "https://learn.microsoft.com/windows/win32/seccng/cng-dpapi" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="text-[1.05rem] font-semibold tracking-tight">
              Clipz
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              A Dynamic Island for your Windows clipboard. Local-first, MIT,
              built in Rust.
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-faint">
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

        <div className="mt-16 flex items-center justify-between border-t border-[var(--border)] pt-6 font-mono text-[0.72rem] text-faint">
          <span>&copy; {new Date().getFullYear()} Clipz &middot; MIT</span>
          <span>v2.0.1</span>
        </div>
      </div>
    </footer>
  );
}
