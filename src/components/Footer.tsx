import Link from "next/link";
import {
  APP_VERSION,
  BUG_REPORT_URL,
  FEATURE_REQUEST_URL,
  FEEDBACK_PATH,
  STORE_URL,
} from "@/lib/links";

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
    title: "Support",
    links: [
      { label: "Send feedback", href: FEEDBACK_PATH },
      { label: "Rate on Microsoft Store", href: STORE_URL },
      { label: "Report a bug", href: BUG_REPORT_URL },
      { label: "Request a feature", href: FEATURE_REQUEST_URL },
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
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-x-10">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-[1.05rem] font-semibold tracking-tight"
            >
              Clipz
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              A clipboard manager that lives in your notch, for Windows and
              macOS. Local-first, MIT, built in Rust.
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="text-[0.875rem] font-medium text-text">
                {c.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") ? (
                      <Link
                        href={l.href}
                        className="link-underline text-sm text-muted transition-colors hover:text-text"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline text-sm text-muted transition-colors hover:text-text"
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

        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-6 text-[0.875rem] text-faint">
          <div className="flex items-center gap-3">
            <span>&copy; {new Date().getFullYear()} Clipz &middot; MIT</span>
            <span>&middot;</span>
            <Link
              href="/changelog"
              className="link-underline transition-colors hover:text-text"
            >
              Changelog
            </Link>
            <span>&middot;</span>
            <Link
              href="/privacy"
              className="link-underline transition-colors hover:text-text"
            >
              Privacy Policy
            </Link>
          </div>
          <span>v{APP_VERSION}</span>
        </div>
      </div>
    </footer>
  );
}
