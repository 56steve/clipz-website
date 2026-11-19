import type { SVGProps } from "react";

type GlyphProps = SVGProps<SVGSVGElement>;

/** Windows four-pane logo. */
export function WindowsGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm0 13 7.5 1.1v-7H3v5.9Zm8.5 1.2L21 21V12.5h-9.5v7.2Zm0-15.4v7.2H21V3l-9.5 1.3Z" />
    </svg>
  );
}

/** Apple logo. */
export function AppleGlyph(props: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.11-1 .04-2.19.67-2.88 1.48-.62.72-1.15 1.88-.99 3.01 1.12.09 2.22-.56 2.88-1.38z" />
    </svg>
  );
}

const STROKE: GlyphProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

/** Mac Command key symbol, drawn as a shape so it never depends on a font. */
export function CommandKeyGlyph(props: GlyphProps) {
  return (
    <svg {...STROKE} {...props}>
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  );
}

/** Mac Shift key symbol. */
export function ShiftKeyGlyph(props: GlyphProps) {
  return (
    <svg {...STROKE} {...props}>
      <path d="M12 3.5 4 11.5h4.5v7.5h7v-7.5H20z" />
    </svg>
  );
}
