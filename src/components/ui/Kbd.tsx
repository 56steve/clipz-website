import { cn } from "@/lib/cn";

export function Kbd({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        "inline-flex min-w-[2rem] items-center justify-center rounded-lg border border-[var(--border-strong)]",
        "bg-surface-2 px-2.5 py-1.5 font-mono text-[0.8125rem] font-medium text-text",
        "shadow-[0_2px_0_0_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
        className
      )}
    >
      {children}
    </kbd>
  );
}
