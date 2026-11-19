"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Github } from "@/components/ui/icons";
import { GITHUB_URL, STORE_URL } from "@/lib/links";

function WindowsGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm0 13 7.5 1.1v-7H3v5.9Zm8.5 1.2L21 21V12.5h-9.5v7.2Zm0-15.4v7.2H21V3l-9.5 1.3Z" />
    </svg>
  );
}

const LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/#demo", label: "Playground" },
  { href: "/#security", label: "Security" },
  { href: "/#shortcuts", label: "Shortcuts" },
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
            setActiveHash(`/#${entry.target.id}`);
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
        <Link href="/" className="flex items-center gap-2.5 text-[1.05rem] font-semibold tracking-tight">
          <Image
            src="/app-icon.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-md"
          />
          <span>Clipz</span>
        </Link>

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

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Clipz on GitHub"
            className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm text-muted transition-colors hover:bg-white/[0.06] hover:text-text"
          >
            <Github className="h-5 w-5" />
            <span className="hidden sm:inline">Star</span>
          </a>
          <a
            href={STORE_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Get Clipz on the Microsoft Store"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-white/[0.06] px-3 text-sm font-medium text-text ring-1 ring-inset ring-white/10 transition-all hover:bg-white/[0.12] hover:ring-white/20 sm:px-4"
          >
            <WindowsGlyph className="h-4 w-4" />
            <span className="hidden lg:inline">Get on Microsoft Store</span>
            <span className="hidden sm:inline lg:hidden">Store</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--border)] bg-white/[0.03] text-muted md:hidden"
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

