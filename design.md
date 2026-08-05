# Clipz — Design System & Art Direction

> The Dynamic Island Clipboard Hub for Windows.
> This document is the single source of truth for the visual language, motion, and
> component decisions behind the Clipz marketing site. If a choice isn't written
> here, it should be derived from the principles here — not invented ad-hoc.

---

## 1. Design Principles

1. **Precision over decoration.** Clipz is a power-user tool. Every pixel should feel
   engineered — tight tracking, deliberate spacing, no filler ornament.
2. **Show, don't tell.** The hero *is* the product. We simulate the real Dynamic Island
   notch so visitors feel the interaction before they download.
3. **Restrained neon.** The canvas is near-black and monochrome. Color (violet → cyan)
   is a spotlight, not wallpaper. If everything glows, nothing glows.
4. **Depth through glass, not gradients.** Layering, blur, and 1px light borders create
   hierarchy. Avoid the generic "purple blob" gradient-soup look.
5. **Motion with intent.** Animation communicates state (expand, copy, filter). Nothing
   moves just to move. Respect `prefers-reduced-motion`.

---

## 2. Color System

All colors are defined as CSS custom properties / Tailwind theme tokens.

### Base (dark canvas)
| Token            | Hex        | Use                                   |
|------------------|------------|---------------------------------------|
| `--bg`           | `#060609`  | Page background (near-black, blue-cast)|
| `--bg-elevated`  | `#0B0B12`  | Section contrast                       |
| `--surface`      | `#111119`  | Card / glass base                      |
| `--surface-2`    | `#16161F`  | Raised glass                           |
| `--border`       | `rgba(255,255,255,0.08)` | Hairline dividers        |
| `--border-glow`  | `rgba(139,124,255,0.35)` | Focused / hover borders  |

### Text
| Token          | Hex        | Use                    |
|----------------|------------|------------------------|
| `--text`       | `#F4F5FB`  | Primary                |
| `--text-muted` | `#9A9AB0`  | Secondary / body       |
| `--text-faint` | `#5B5B70`  | Captions, labels       |

### Accent (the spotlight)
| Token           | Hex        | Role                          |
|-----------------|------------|-------------------------------|
| `--violet`      | `#8B7CFF`  | Primary brand accent          |
| `--violet-deep` | `#6D5CFF`  | Buttons, active states        |
| `--cyan`        | `#3DE0F0`  | Secondary accent / search     |
| `--blue`        | `#4C7DFF`  | Links / code category         |
| `--emerald`     | `#38E0A5`  | Success / "copied"            |
| `--amber`       | `#FFC24B`  | Sensitive / credentials       |

**Signature gradient:** `linear-gradient(120deg, #8B7CFF 0%, #4C7DFF 45%, #3DE0F0 100%)`
Used sparingly for the wordmark, primary CTA sheen, and key underlines.

### Category color mapping (used across UI demo & filters)
- Plain Text → `--text-muted` / slate
- Code Snippets → `--blue`
- Web Links → `--cyan`
- Sensitive Credentials → `--amber`

---

## 3. Typography

- **Display / Headings:** `Outfit` (600–700). Geometric, modern, confident.
- **Body / UI:** `Inter` (400–500). Neutral, legible at small sizes.
- **Mono / code & shortcuts:** `JetBrains Mono` (or `Geist Mono` fallback).

Loaded via `next/font/google` (self-hosted, zero layout shift).

### Scale (fluid, clamp-based)
| Role        | Size (clamp)                         | Tracking | Weight |
|-------------|--------------------------------------|----------|--------|
| Display XL  | `clamp(2.75rem, 6vw, 5.25rem)`       | -0.03em  | 700    |
| H2          | `clamp(2rem, 4vw, 3.25rem)`          | -0.02em  | 600    |
| H3          | `clamp(1.25rem, 2vw, 1.6rem)`        | -0.01em  | 600    |
| Body Lg     | `1.125rem` / 1.6                      | 0        | 400    |
| Body        | `1rem` / 1.65                         | 0        | 400    |
| Label/Eyebrow | `0.8125rem` uppercase              | 0.14em   | 500    |
| Mono kbd    | `0.8125rem`                          | 0        | 500    |

---

## 4. Spacing, Radius, Grid

- **Spacing scale:** 8px base (4, 8, 12, 16, 24, 32, 48, 64, 96, 128).
- **Section rhythm:** vertical padding `clamp(6rem, 12vw, 10rem)`.
- **Container:** max-width `1200px`, gutter `clamp(1.25rem, 5vw, 2rem)`.
- **Radius:** sm `10px`, md `16px`, lg `24px`, pill `999px`. Glass cards use `lg`.
- **Grid:** 12-col mental model; feature grid is a bento (asymmetric) layout, not 3 equal cards.

---

## 5. Glassmorphism Recipe

```
background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
backdrop-filter: blur(20px) saturate(140%);
border: 1px solid var(--border);
box-shadow:
  0 1px 0 0 rgba(255,255,255,0.06) inset,   /* top light edge */
  0 20px 60px -20px rgba(0,0,0,0.7);         /* soft drop */
```
Hover adds a `--border-glow` border and a faint radial accent bloom behind the card.

**Texture:** a subtle SVG grain/noise overlay at ~3% opacity on the page root adds
analog depth and kills gradient banding. This is a key anti-"AI-slop" detail.

---

## 6. Motion

- **Library:** `motion` (Framer Motion) + CSS for ambient loops.
- **Easing:** primary `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out) for reveals;
  spring `{ stiffness: 260, damping: 30 }` for the notch expand.
- **Durations:** micro 150ms, standard 400ms, expressive 600–800ms.
- **Scroll reveals:** fade + 16px rise, staggered 60–80ms, trigger once at 20% in view.
- **Signature moments:**
  - Notch pill → drawer spring expansion.
  - "Copied" ping (emerald ring + checkmark) on paste.
  - Cursor-follow radial glow in hero (desktop only).
  - Ambient conic-gradient aurora drifting behind hero, very low opacity.
- **Accessibility:** all non-essential motion gated behind `prefers-reduced-motion`.

---

## 7. Component Inventory

- `Navbar` — sticky glass bar, wordmark, anchor links, GitHub star pill, Download CTA.
- `Hero` — headline, tagline, dual CTA, GitHub release badge, live **NotchSimulator**.
- `NotchSimulator` — the centerpiece. Pill collapses/expands, tabbed categories,
  fake-live clipboard feed, keyboard-navigable list, copy ping. Reused in hero + demo.
- `StatStrip` — sub-ms search, <1% CPU, AES/DPAPI, 60s TTL — animated counters.
- `BentoFeatures` — asymmetric glowing cards for the 6 core features.
- `ShortcutSheet` — keyboard cheat-sheet grid with rendered `<kbd>` keys.
- `TechStack` — minimalist badge strip (Tauri v2, Rust, Win32, SQLite FTS5, TypeScript).
- `SecuritySection` — DPAPI + RAM TTL deep dive with a small animated diagram.
- `FinalCTA` — download conversion block.
- `Footer` — links, GitHub, MIT badge, copyright.
- Primitives: `GlassCard`, `GradientText`, `Kbd`, `Button`, `SectionHeading`, `Badge`.

---

## 8. Copy Voice

Confident, technical, concrete. Lead with the benefit, back it with the spec.
Avoid hype adjectives ("revolutionary", "game-changing"). Numbers beat adjectives:
"sub-millisecond FTS5 search", "cleared from RAM after 60s", "<1% idle CPU".

---

## 9. Accessibility & Quality Bar

- WCAG AA contrast for all text on their backgrounds.
- Full keyboard operability; visible focus rings (violet).
- Semantic landmarks (`header/main/section/footer`), single `h1`.
- `prefers-reduced-motion` fully honored.
- Responsive from 360px → 1440px+; the notch demo degrades gracefully on mobile.
- Lighthouse targets: Performance ≥ 90, A11y ≥ 95, Best Practices ≥ 95.

---

## 10. Anti-Slop Checklist

- [ ] No rainbow gradient soup — accent is spotlight only.
- [ ] The hero demo is genuinely interactive, not a static screenshot.
- [ ] Asymmetric bento layout, not 3 identical cards.
- [ ] Real product copy with real numbers.
- [ ] Grain texture + considered shadows for depth.
- [ ] Consistent 8px spacing rhythm.
- [ ] Custom, cohesive iconography treatment.
- [ ] Motion respects reduced-motion.
