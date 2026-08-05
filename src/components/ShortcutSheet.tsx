import { Kbd } from "./ui/Kbd";
import { SectionHeading } from "./ui/SectionHeading";
import { GlassCard } from "./ui/GlassCard";
import { Reveal } from "./ui/Reveal";

type Shortcut = { keys: React.ReactNode; label: string };

const GROUPS: { title: string; items: Shortcut[] }[] = [
  {
    title: "Navigation",
    items: [
      { keys: <Kbd>↑</Kbd>, label: "Move selection up" },
      { keys: <Kbd>↓</Kbd>, label: "Move selection down" },
      { keys: <Kbd>Tab</Kbd>, label: "Cycle category filters" },
    ],
  },
  {
    title: "Actions",
    items: [
      { keys: <Kbd>Enter</Kbd>, label: "Copy / paste selection" },
      {
        keys: (
          <span className="flex items-center gap-1">
            <Kbd>Ctrl</Kbd>
            <span className="text-faint">+</span>
            <Kbd>F</Kbd>
          </span>
        ),
        label: "Focus search",
      },
      { keys: <Kbd>Esc</Kbd>, label: "Close the drawer" },
    ],
  },
  {
    title: "Global",
    items: [
      {
        keys: (
          <span className="flex items-center gap-1">
            <Kbd>Ctrl</Kbd>
            <span className="text-faint">+</span>
            <Kbd>Shift</Kbd>
            <span className="text-faint">+</span>
            <Kbd>V</Kbd>
          </span>
        ),
        label: "Summon Clipz anywhere",
      },
      {
        keys: (
          <span className="flex items-center gap-1">
            <Kbd>Ctrl</Kbd>
            <span className="text-faint">+</span>
            <Kbd>1..9</Kbd>
          </span>
        ),
        label: "Paste nth recent clip",
      },
      { keys: <Kbd>Del</Kbd>, label: "Remove highlighted clip" },
    ],
  },
];

export function ShortcutSheet() {
  return (
    <section id="shortcuts" className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="For power users"
          title={
            <>
              Every action, one <span className="text-gradient">keystroke</span> away
            </>
          }
          description="Clipz is built to be driven entirely from the keyboard. Learn six shortcuts and you will never reach for the mouse again."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {GROUPS.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.08}>
              <GlassCard className="h-full p-6">
                <h3 className="mb-5 text-sm font-medium uppercase tracking-[0.14em] text-faint">
                  {g.title}
                </h3>
                <ul className="flex flex-col gap-4">
                  {g.items.map((it, i) => (
                    <li key={i} className="flex items-center justify-between gap-4">
                      <span className="text-[0.95rem] text-muted">{it.label}</span>
                      <span className="shrink-0">{it.keys}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
