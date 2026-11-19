import { Github, Lock, ShieldCheck, Timer } from "@/components/ui/icons";
import { IconTile, type TileTone } from "@/components/ui/IconTile";
import { Reveal } from "./motion/Reveal";
import { WordReveal } from "./motion/WordReveal";

const POINTS: { title: string; body: string; Icon: typeof Lock; tone: TileTone }[] = [
  {
    title: "Encrypted at rest",
    body: "Sensitive clips are sealed with DPAPI on Windows and AES-256-GCM on macOS.",
    Icon: Lock,
    tone: "blue",
  },
  {
    title: "Wiped from memory",
    body: "Secrets leave RAM after 60 seconds.",
    Icon: Timer,
    tone: "orange",
  },
  {
    title: "Stays on your device",
    body: "No cloud, no account, and no telemetry in the app.",
    Icon: ShieldCheck,
    tone: "green",
  },
  {
    title: "Open source",
    body: "MIT licensed. Read every line.",
    Icon: Github,
    tone: "graphite",
  },
];

export function SecuritySection() {
  return (
    <section
      id="security"
      className="section-pad border-t border-[var(--border)]"
    >
      <div className="container-page">
        <h2 className="mb-8 text-[clamp(1.5rem,5vw,2.25rem)] font-light leading-[1.25] tracking-[-0.02em] sm:mb-12">
          <WordReveal lines={["Private by design."]} />
        </h2>

        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map(({ title, body, Icon, tone }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.1}>
                <IconTile tone={tone}>
                  <Icon className="h-6 w-6" />
                </IconTile>
                <h3 className="mt-4 text-[1.125rem] font-medium">{title}</h3>
                <p className="mt-1.5 text-[1rem] leading-[1.5] text-muted">{body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
