"use client";

import { useEffect, useState } from "react";
import { Github, Scissors, Download } from "lucide-react";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Live Demo" },
  { href: "#security", label: "Security" },
  { href: "#shortcuts", label: "Shortcuts" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3">
      <nav
        className={cn(
          "flex w-full max-w-[1120px] items-center gap-4 rounded-full px-4 py-2.5 transition-all duration-300",
          scrolled ? "glass" : "bg-transparent"
        )}
      >
        <a href="#top" className="flex items-center gap-2 pl-1">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--color-violet-deep)] text-white">
            <Scissors className="h-4 w-4" />
          </span>
          <span className="text-[1.05rem] font-semibold tracking-tight">Clipz</span>
        </a>

        <ul className="ml-2 hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:bg-white/[0.05] hover:text-text"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <a
            href="https://github.com/56steve/clipz"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-[var(--border-strong)] px-3.5 py-2 text-sm text-muted transition-colors hover:border-[var(--border-glow)] hover:text-text sm:flex"
          >
            <Github className="h-4 w-4" />
            <span>Star</span>
            <span className="rounded-full bg-white/[0.06] px-1.5 py-0.5 text-xs text-faint">
              2.4k
            </span>
          </a>
          <a
            href="#download"
            className="flex items-center gap-2 rounded-full bg-[var(--color-violet-deep)] px-4 py-2 text-sm font-medium text-white shadow-[0_6px_24px_-8px_rgba(109,92,255,0.8)] transition-all hover:-translate-y-0.5 hover:bg-[var(--color-violet)]"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
