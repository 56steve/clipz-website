import { Kbd } from "./ui/Kbd";
import { Reveal } from "./motion/Reveal";
import { WordReveal } from "./motion/WordReveal";
import { ArrowDown, ArrowUp } from "@/components/ui/icons";
import {
  AppleGlyph,
  CommandKeyGlyph,
  ShiftKeyGlyph,
  WindowsGlyph,
} from "@/components/ui/PlatformGlyphs";

type Row = { label: string; keys: React.ReactNode };

const ICON = "h-4 w-4";

/** A platform logo followed by its key combo, e.g. [Windows] Alt + C. */
function PlatformKeys({
  logo,
  name,
  children,
}: {
  logo: React.ReactNode;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-3">
      <span className="text-muted" role="img" aria-label={name}>
        {logo}
      </span>
      <span className="flex items-center gap-1.5">{children}</span>
    </span>
  );
}

const ROWS: Row[] = [
  {
    label: "Open Clipz from anywhere",
    keys: (
      <span className="flex flex-wrap items-center justify-end gap-x-8 gap-y-3">
        <PlatformKeys logo={<WindowsGlyph className="h-5 w-5" />} name="Windows">
          <Kbd>Alt</Kbd>
          <Kbd>C</Kbd>
        </PlatformKeys>
        <PlatformKeys logo={<AppleGlyph className="h-5 w-5" />} name="macOS">
          <Kbd>
            <CommandKeyGlyph className={ICON} />
          </Kbd>
          <Kbd>
            <ShiftKeyGlyph className={ICON} />
          </Kbd>
          <Kbd>C</Kbd>
        </PlatformKeys>
      </span>
    ),
  },
  {
    label: "Move through clips",
    keys: (
      <span className="flex items-center gap-1.5">
        <Kbd>
          <ArrowUp className={ICON} />
        </Kbd>
        <Kbd>
          <ArrowDown className={ICON} />
        </Kbd>
      </span>
    ),
  },
  { label: "Paste the selected clip", keys: <Kbd>Enter</Kbd> },
  { label: "Close the notch", keys: <Kbd>Esc</Kbd> },
];

export function ShortcutSheet() {
  return (
    <section
      id="shortcuts"
      className="section-pad border-t border-[var(--border)]"
    >
      <div className="container-page">
        <h2 className="mb-8 text-[clamp(1.5rem,5vw,2.25rem)] font-light leading-[1.25] tracking-[-0.02em] sm:mb-12">
          <WordReveal lines={["Keyboard first."]} />
        </h2>

        <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {ROWS.map((row, i) => (
            <li key={row.label} className="group">
              <Reveal
                delay={i * 0.08}
                y={16}
                className="flex flex-wrap items-center justify-between gap-4 py-5 transition-transform duration-300 group-hover:translate-x-1"
              >
                <span className="text-[1.125rem] text-text">{row.label}</span>
                {row.keys}
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-[0.875rem] text-faint">
          You can change the global shortcut in Preferences.
        </p>
      </div>
    </section>
  );
}
