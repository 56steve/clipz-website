/**
 * Hero backdrop, matched to the reference recording: near-black with a faint
 * lighter sheen on the left that falls away to the right, and a soft vignette.
 * All the colour comes from the cursor smoke (HeroSmoke) drawn on top.
 */
export function HeroAtmosphericBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden bg-[var(--color-bg)] text-white">
      {/* Diagonal sheen: lighter on the left, darker on the right. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.018) 38%, rgba(0,0,0,0.34) 100%)",
        }}
      />

      {/* Soft vignette: the edges fall away darker than the centre. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 50% 30%, transparent 35%, rgba(0,0,0,0.38) 100%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
