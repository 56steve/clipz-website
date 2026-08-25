"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#demo", label: "Playground" },
  { href: "#security", label: "Security" },
  { href: "#shortcuts", label: "Shortcuts" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["how", "demo", "security", "shortcuts"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "flex w-full max-w-[1120px] items-center justify-between gap-6 rounded-2xl px-5 py-3 transition-all duration-300",
          scrolled
            ? "border border-[var(--border)] bg-[rgba(11,11,18,0.85)] backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <a href="#top" className="flex items-center gap-2 text-[0.98rem] font-semibold tracking-tight">
          <span>Clipz</span>
          {/* <span className="flex items-center gap-1 rounded-md border border-[var(--border)] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[0.68rem] font-normal text-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
            v2.0.1
          </span> */}
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => {
            const isActive = activeHash === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    "relative text-sm transition-colors py-1",
                    isActive ? "text-text font-medium" : "text-muted hover:text-text"
                  )}
                >
                  {l.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-violet" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/56steve/clipz/releases/download/main/Clipz_0.1.0_x64-setup.exe"
            className="rounded-full bg-white/[0.06] px-4 py-1.5 text-sm font-medium text-text ring-1 ring-inset ring-white/10 transition-all hover:bg-white/[0.12] hover:ring-white/20"
          >
            Download
          </a >

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] bg-white/[0.03] text-muted md:hidden"
          >
            <svg
              className="h-4 w-4 stroke-current"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-4 right-4 z-40 rounded-2xl border border-[var(--border)] bg-[rgba(11,11,18,0.95)] p-4 backdrop-blur-2xl md:hidden">
          <ul className="flex flex-col gap-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-white/[0.05] hover:text-text"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

