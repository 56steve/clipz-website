"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "#how", label: "How it works" },
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
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "flex w-full max-w-[1120px] items-center gap-6 rounded-2xl px-5 py-3 transition-all duration-300",
          scrolled
            ? "border border-[var(--border)] bg-[rgba(11,11,18,0.72)] backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <a href="#top" className="text-[0.98rem] font-semibold tracking-tight">
          Clipz
          <span className="ml-1.5 font-mono text-[0.68rem] font-normal text-faint">
            v2.0.1
          </span>
        </a>

        <ul className="ml-6 hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-text"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#download"
          className="ml-auto rounded-full bg-white/[0.06] px-4 py-1.5 text-sm font-medium text-text ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.1]"
        >
          Download
        </a>
      </nav>
    </header>
  );
}
