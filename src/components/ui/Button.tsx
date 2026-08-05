import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline";

type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
};

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "px-6 py-3 text-[0.95rem] transition-all duration-300 ease-[var(--ease-expo)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-violet)]";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[var(--color-violet-deep)] shadow-[0_8px_30px_-8px_rgba(109,92,255,0.7)] " +
    "hover:bg-[var(--color-violet)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgba(139,124,255,0.85)]",
  outline:
    "text-text border border-[var(--border-strong)] bg-white/[0.02] backdrop-blur-md " +
    "hover:border-[var(--border-glow)] hover:bg-white/[0.05] hover:-translate-y-0.5",
  ghost: "text-muted hover:text-text hover:bg-white/[0.04]",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
