import { Copy, Keyboard, MousePointerClick, Search } from "lucide-react";
import { NotchSimulator } from "./NotchSimulator";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const STEPS = [
  {
    icon: Copy,
    title: "Copy anything",
    body: "Text, a URL, a code block, or a password. Clipz captures it the moment it hits the clipboard.",
  },
  {
    icon: MousePointerClick,
    title: "Glance at the notch",
    body: "Hover the floating notch and the drawer springs open with your most recent clips, already categorized.",
  },
  {
    icon: Search,
    title: "Search or filter",
    body: "Type to run an instant FTS5 search, or tap a category tab to narrow to code, links, or sensitive items.",
  },
  {
    icon: Keyboard,
    title: "Paste without the mouse",
    body: "Arrow keys to move, Enter to copy the selection back, Esc to dismiss. Your hands never leave the keyboard.",
  },
];

export function InteractiveDemo() {
  return (
    <section id="demo" className="section-pad bg-bg-elevated">
      <div className="container-page">
        <SectionHeading
          eyebrow="Try it right here"
          title={
            <>
              This is the <span className="text-gradient">real interaction</span>, not a
              screenshot
            </>
          }
          description="The notch below behaves exactly like the app. Expand it, search, filter, and navigate with your keyboard."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <ol className="flex flex-col gap-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <li className="flex gap-4 rounded-2xl border border-[var(--border)] bg-white/[0.015] p-5 transition-colors hover:border-[var(--border-strong)]">
                  <div className="flex flex-col items-center">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--color-violet-deep)]/15 text-violet">
                      <s.icon className="h-[18px] w-[18px]" />
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-faint">
                        0{i + 1}
                      </span>
                      <h3 className="text-[1.05rem]">{s.title}</h3>
                    </div>
                    <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">
                      {s.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.1}>
            <div className="relative flex min-h-[440px] items-start justify-center overflow-hidden rounded-[24px] border border-[var(--border)] bg-[radial-gradient(120%_100%_at_50%_-10%,#161327_0%,#0a0a12_60%)] px-4 pt-6">
              <div className="absolute inset-x-0 top-4 z-10">
                <NotchSimulator defaultExpanded />
              </div>
              <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-xs text-faint">
                click the notch to collapse or expand it
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
