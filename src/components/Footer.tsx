import Link from "next/link";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "Security", href: "/#security" },
      { label: "Shortcuts", href: "/#shortcuts" },
      { label: "Download", href: "/#download" },
      { label: "Changelog", href: "/changelog" },
      { label: "Privacy Policy", href: "/privacy" },
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
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="container-page py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-[1.05rem] font-semibold tracking-tight">
              Clipz
            </Link>
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
                    {l.href.startsWith("/") ? (
                      <Link
                        href={l.href}
                        className="text-sm text-muted transition-colors hover:text-text"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        className="text-sm text-muted transition-colors hover:text-text"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-6 font-mono text-[0.72rem] text-faint">
          <div className="flex items-center gap-3">
            <span>&copy; {new Date().getFullYear()} Clipz &middot; MIT</span>
            <span>&middot;</span>
            <Link href="/changelog" className="transition-colors hover:text-text">
              Changelog
            </Link>
            <span>&middot;</span>
            <Link href="/privacy" className="transition-colors hover:text-text">
              Privacy Policy
            </Link>
          </div>
          <span>v2.0.1</span>
        </div>
      </div>
    </footer>
  );
}
