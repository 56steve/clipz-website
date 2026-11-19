import { cn } from "@/lib/cn";

export type TileTone = "blue" | "violet" | "green" | "orange" | "pink" | "graphite";

/** iOS-style app-icon gradients (top light to bottom saturated). */
const TONES: Record<TileTone, string> = {
  blue: "linear-gradient(160deg, #5ac8fa 0%, #0a84ff 100%)",
  violet: "linear-gradient(160deg, #a5a6ff 0%, #5e5ce6 100%)",
  green: "linear-gradient(160deg, #6ee7a0 0%, #30d158 100%)",
  orange: "linear-gradient(160deg, #ffc15a 0%, #ff9f0a 100%)",
  pink: "linear-gradient(160deg, #ff8fa8 0%, #ff375f 100%)",
  graphite: "linear-gradient(160deg, #6b6b73 0%, #2c2c31 100%)",
};

/** A squircle app-icon tile with a white glyph, like the iOS Settings list. */
export function IconTile({
  tone,
  children,
  className,
}: {
  tone: TileTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid h-12 w-12 shrink-0 place-items-center rounded-[27%] text-white",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(0,0,0,0.15),0_6px_14px_-4px_rgba(0,0,0,0.55)]",
        className
      )}
      style={{ backgroundImage: TONES[tone] }}
    >
      {children}
    </span>
  );
}
