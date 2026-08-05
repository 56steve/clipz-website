"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Code2,
  CornerDownLeft,
  Link2,
  Lock,
  Scissors,
  Search,
  Type,
} from "@/components/ui/icons";
import { CATEGORIES, CLIPS, type Clip, type ClipCategory } from "@/lib/clips";
import { cn } from "@/lib/cn";

const CAT_ICON: Record<ClipCategory, typeof Type> = {
  text: Type,
  code: Code2,
  link: Link2,
  secret: Lock,
};

const CAT_COLOR: Record<ClipCategory, string> = {
  text: "var(--color-muted)",
  code: "var(--color-blue)",
  link: "var(--color-cyan)",
  secret: "var(--color-amber)",
};

export function NotchSimulator({
  defaultExpanded = false,
  className,
}: {
  defaultExpanded?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [cat, setCat] = useState<ClipCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const clips = useMemo<Clip[]>(() => {
    const q = query.trim().toLowerCase();
    return CLIPS.filter((c) => (cat === "all" ? true : c.category === cat)).filter(
      (c) =>
        q === "" ||
        c.preview.toLowerCase().includes(q) ||
        c.source.toLowerCase().includes(q)
    );
  }, [cat, query]);

  // Keep selection in range when the filtered list changes.
  useEffect(() => {
    setSelected((s) => Math.min(s, Math.max(0, clips.length - 1)));
  }, [clips.length]);

  // Focus the panel when it expands so keyboard nav works immediately.
  useEffect(() => {
    if (expanded && panelRef.current) panelRef.current.focus({ preventScroll: true });
  }, [expanded]);

  function copy(clip: Clip | undefined) {
    if (!clip) return;
    setCopiedId(clip.id);
    try {
      navigator.clipboard?.writeText(clip.value);
    } catch {
      /* demo: ignore if blocked */
    }
    window.setTimeout(() => setCopiedId(null), 1400);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, clips.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      copy(clips[selected]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setExpanded(false);
    }
  }

  // Scroll the selected row into view within the list.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${selected}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 30 };

  return (
    <div className={cn("flex w-full justify-center", className)}>
      <motion.div
        layout
        transition={spring}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className="relative"
        style={{ width: expanded ? "min(440px, 92vw)" : "min(300px, 84vw)" }}
      >
        {/* Collapsed pill */}
        <motion.button
          layout
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label="Toggle Clipz clipboard drawer"
          className={cn(
            "glass flex w-full items-center gap-3 overflow-hidden rounded-[22px] px-4",
            expanded ? "h-12 rounded-b-none border-b-0" : "h-12"
          )}
        >
          <span className="grid h-6 w-6 place-items-center rounded-md bg-[var(--color-violet-deep)]/90 text-white">
            <Scissors className="h-3.5 w-3.5" />
          </span>
          <span className="flex-1 text-left text-sm font-medium text-text">Clipz</span>
          <AnimatePresence mode="wait" initial={false}>
            {!expanded ? (
              <motion.span
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-xs text-faint"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
                </span>
                {CLIPS.length} clips
              </motion.span>
            ) : (
              <motion.span
                key="live"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[0.7rem] font-medium uppercase tracking-wider text-violet"
              >
                Live
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Expanded drawer */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              ref={panelRef}
              tabIndex={0}
              onKeyDown={onKeyDown}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass absolute left-0 right-0 top-12 z-20 overflow-hidden rounded-b-[22px] rounded-t-none border-t-0 outline-none"
            >
              <div className="p-3">
                {/* Search */}
                <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-black/30 px-3 py-2">
                  <Search className="h-4 w-4 shrink-0 text-faint" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search clipboard history..."
                    className="w-full bg-transparent text-sm text-text placeholder:text-faint focus:outline-none"
                  />
                  <span className="shrink-0 rounded-md border border-[var(--border)] px-1.5 py-0.5 font-mono text-[0.65rem] text-faint">
                    FTS5
                  </span>
                </div>

                {/* Category tabs */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {CATEGORIES.map((c) => {
                    const active = cat === c.key;
                    return (
                      <button
                        key={c.key}
                        onClick={() => {
                          setCat(c.key);
                          setSelected(0);
                        }}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                          active
                            ? "bg-white/[0.08] text-text"
                            : "text-faint hover:text-muted"
                        )}
                        style={active ? { boxShadow: `inset 0 0 0 1px ${c.color}55` } : undefined}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>

                {/* List */}
                <div
                  ref={listRef}
                  className="mt-2 max-h-[236px] space-y-1 overflow-y-auto pr-1"
                >
                  {clips.length === 0 && (
                    <p className="px-3 py-8 text-center text-sm text-faint">
                      No clips match &ldquo;{query}&rdquo;
                    </p>
                  )}
                  {clips.map((clip, i) => {
                    const Icon = CAT_ICON[clip.category];
                    const color = CAT_COLOR[clip.category];
                    const isSel = i === selected;
                    const isCopied = copiedId === clip.id;
                    return (
                      <button
                        key={clip.id}
                        data-idx={i}
                        onMouseEnter={() => setSelected(i)}
                        onClick={() => copy(clip)}
                        className={cn(
                          "relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                          isSel ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                        )}
                      >
                        {isSel && (
                          <motion.span
                            layoutId="row-accent"
                            className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full"
                            style={{ background: color }}
                          />
                        )}
                        <span
                          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg"
                          style={{ background: `${color}1a`, color }}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              "block truncate text-[0.82rem] leading-tight",
                              clip.category === "secret"
                                ? "font-mono text-amber"
                                : "text-text"
                            )}
                          >
                            {clip.preview}
                          </span>
                          <span className="mt-0.5 block truncate text-[0.7rem] text-faint">
                            {clip.source} &middot; {clip.time}
                          </span>
                        </span>
                        <AnimatePresence mode="wait">
                          {isCopied ? (
                            <motion.span
                              key="copied"
                              initial={{ opacity: 0, scale: 0.6 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex shrink-0 items-center gap-1 text-[0.7rem] font-medium text-emerald"
                            >
                              <Check className="h-3.5 w-3.5" /> Copied
                            </motion.span>
                          ) : (
                            isSel && (
                              <motion.span
                                key="enter"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="shrink-0 text-faint"
                              >
                                <CornerDownLeft className="h-3.5 w-3.5" />
                              </motion.span>
                            )
                          )}
                        </AnimatePresence>
                      </button>
                    );
                  })}
                </div>

                {/* Footer legend */}
                <div className="mt-2 flex items-center justify-between border-t border-[var(--border)] px-1 pt-2.5 text-[0.68rem] text-faint">
                  <span className="flex items-center gap-1.5">
                    <ArrowUp className="h-3 w-3" />
                    <ArrowDown className="h-3 w-3" /> navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CornerDownLeft className="h-3 w-3" /> copy
                  </span>
                  <span>esc to close</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
