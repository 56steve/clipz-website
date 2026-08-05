import { cn } from "@/lib/cn";

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
  interactive?: boolean;
};

/**
 * Base glass surface used across the site.
 * `interactive` adds a hover glow + lift for cards that respond to pointer.
 */
export function GlassCard({
  as: Tag = "div",
  interactive = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "glass rounded-[var(--radius-lg)]",
        interactive &&
          "group relative transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-expo)] hover:-translate-y-1 hover:border-[var(--border-glow)] hover:glow-violet",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
