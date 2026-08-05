import { Reveal } from "./ui/Reveal";

const STACK = [
  { name: "Tauri v2", note: "App shell" },
  { name: "Rust", note: "Backend core" },
  { name: "Win32 API", note: "Clipboard hooks" },
  { name: "SQLite FTS5", note: "Search index" },
  { name: "TypeScript", note: "UI layer" },
  { name: "Windows DPAPI", note: "Encryption" },
];

export function TechStack() {
  return (
    <section className="border-y border-[var(--border)] bg-white/[0.01] py-16">
      <div className="container-page">
        <Reveal>
          <p className="text-center text-sm font-medium uppercase tracking-[0.14em] text-faint">
            Engineered on a modern native stack
          </p>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {STACK.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05}>
              <div className="group flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-white/[0.02] px-4 py-2.5 transition-colors hover:border-[var(--border-glow)]">
                <span className="h-1.5 w-1.5 rounded-full bg-violet transition-transform group-hover:scale-125" />
                <span className="text-[0.95rem] font-medium text-text">{s.name}</span>
                <span className="text-xs text-faint">{s.note}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
