import { Kbd } from "./ui/Kbd";

type Row = { keys: React.ReactNode; label: string };

const ROWS: { title: string; items: Row[] }[] = [
  {
    title: "Navigation",
    items: [
      { keys: <Kbd>↑</Kbd>, label: "Move up" },
      { keys: <Kbd>↓</Kbd>, label: "Move down" },
      { keys: <Kbd>Tab</Kbd>, label: "Cycle category" },
    ],
  },
  {
    title: "Actions",
    items: [
      { keys: <Kbd>Enter</Kbd>, label: "Paste selection" },
      { keys: <Combo keys={["Ctrl", "F"]} />, label: "Focus search" },
      { keys: <Kbd>Esc</Kbd>, label: "Close drawer" },
    ],
  },
  {
    title: "Global",
    items: [
      { keys: <Combo keys={["Ctrl", "Shift", "V"]} />, label: "Summon Clipz" },
      { keys: <Combo keys={["Ctrl", "1..9"]} />, label: "Paste nth recent" },
      { keys: <Kbd>Del</Kbd>, label: "Remove highlighted" },
    ],
  },
];

function Combo({ keys }: { keys: string[] }) {
  return (
    <span className="flex items-center gap-1">
      {keys.map((k, i) => (
        <span key={k} className="flex items-center gap-1">
          <Kbd>{k}</Kbd>
          {i < keys.length - 1 && <span className="text-faint">+</span>}
        </span>
      ))}
    </span>
  );
}

export function ShortcutSheet() {
  return (
    <section id="shortcuts" className="section-pad border-t border-[var(--border)]">
      <div className="container-page">
        <div className="mb-16 flex items-baseline justify-between gap-6 border-b border-[var(--border)] pb-6">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-[-0.02em]">
            Keyboard first.
          </h2>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-faint">
            Nine shortcuts
          </span>
        </div>

        <div className="grid gap-x-12 gap-y-12 md:grid-cols-3">
          {ROWS.map((g) => (
            <div key={g.title}>
              <h3 className="mb-6 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-violet">
                {g.title}
              </h3>
              <ul className="flex flex-col divide-y divide-[var(--border)]">
                {g.items.map((it, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-4 py-3.5"
                  >
                    <span className="text-[0.95rem] text-muted">{it.label}</span>
                    <span className="shrink-0">{it.keys}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
