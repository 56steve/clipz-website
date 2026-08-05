import { cn } from "@/lib/cn";

/**
 * Ambient background: two low-opacity color fields that drift slowly,
 * plus a faint dot-grid. Purely decorative, pointer-events none.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div
        className="absolute left-1/2 top-[-10%] h-[520px] w-[720px] -translate-x-1/2 rounded-full opacity-[0.28] blur-[110px]"
        style={{
          background:
            "conic-gradient(from 120deg at 50% 50%, #6d5cff, #4c7dff, #3de0f0, #6d5cff)",
          animation: "aurora-drift 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute right-[-8%] top-[30%] h-[380px] w-[380px] rounded-full opacity-[0.16] blur-[100px]"
        style={{
          background: "radial-gradient(circle, #3de0f0, transparent 70%)",
          animation: "aurora-drift 28s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />
    </div>
  );
}
