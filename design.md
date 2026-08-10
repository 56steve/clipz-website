# Clipz, Design System

The Dynamic Island clipboard hub for Windows.
This document is the single source of truth for the visual language, motion, and
component decisions behind the marketing site. If a choice is not written here,
derive it from the principles here rather than invent one.

---

## 1. Point of view

Clipz is a power-user tool. The site should feel like a well-set piece of
technical writing, not a neon showcase. Three rules override everything else:

1. **Restraint over decoration.** A near-black canvas, off-white text, one violet
   accent used maybe three times on the page. When in doubt, remove.
2. **The product is the visual.** The interactive notch is the hero. Every other
   section is prose and diagrams that support it. No stock illustration, no
   generative texture masquerading as content.
3. **Type is the design.** Tight display type, comfortable body measure, mono
   for spec captions and shortcuts. Section headers sit above hairline rules
   with a mono counter on the right (`Three parts`, `Four mechanisms`).

Anti-patterns the site deliberately avoids: drifting conic-gradient blobs,
rainbow gradient headlines, glowing "bento" cards, and eyebrow icons with
decorative sparkles.

---

## 2. Color

The canvas is monochrome. Color is functional.

### Base
| Token            | Hex        | Use                                    |
|------------------|------------|----------------------------------------|
| `--color-bg`     | `#060609`  | Page background                        |
| `--color-bg-elevated` | `#0b0b12` | Contrast section (Security)         |
| `--color-surface` | `#111119` | Card / glass base (notch drawer only)  |
| `--color-surface-2` | `#16161f` | Raised glass (kbd caps)              |
| `--border`       | rgba white 0.08 | Hairline dividers                 |
| `--border-strong`| rgba white 0.14 | Emphasis rules                    |

### Text
| Token           | Hex      | Use                             |
|-----------------|----------|---------------------------------|
| `--color-text`  | `#f4f5fb`| Primary                         |
| `--color-muted` | `#9a9ab0`| Body copy                       |
| `--color-faint` | `#5b5b70`| Captions, mono metadata         |

### Accent (single)
`--color-violet: #8b7cff`, deep variant `#6d5cff`.
Used on: the primary Download CTA, the eyebrow labels above section headings,
the classifier legend in HowItWorks. Nowhere else.

### Category colors (functional only)
The four clipboard categories carry their own hue so the eye can pick them out
in the notch drawer and the "capture" diagram. They are **not** used as
decoration elsewhere.
- Plain text: `--color-muted`
- Code: `--color-blue` (#4c7dff)
- Links: `--color-cyan` (#3de0f0)
- Sensitive: `--color-amber` (#ffc24b)

There is **no** gradient utility. Do not add one.

---

## 3. Typography

- **Display / headings:** `Outfit` (600). Tight tracking, `-0.02em` to `-0.03em`.
- **Body / UI:** `Inter` (400 / 500).
- **Mono:** `JetBrains Mono` (400 / 500). Used for eyebrows, spec bullets,
  keyboard caps, footer counters, and any numeric metadata.

Loaded via `next/font/google`, self-hosted, no layout shift.

### Scale
| Role         | Size                                | Weight |
|--------------|-------------------------------------|--------|
| Display XL   | `clamp(2.75rem, 6vw, 5rem)`         | 600    |
| Section H2   | `clamp(1.75rem, 3.2vw, 2.5rem)`     | 600    |
| Sub H3       | `clamp(1.6rem, 2.6vw, 2.15rem)`     | 600    |
| Body         | `1rem` / 1.65                       | 400    |
| Body large   | `1.075rem` / 1.6                    | 400    |
| Mono caption | `0.72rem`, uppercase, `0.18em`      | 500    |
| Mono spec    | `0.78rem`                            | 400    |

---

## 4. Layout

- **Base spacing:** 8px scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128).
- **Section rhythm:** `padding-block: clamp(6rem, 12vw, 10rem)`.
- **Container:** `max-width: 1200px`, gutter `clamp(1.25rem, 5vw, 2rem)`.
- **Radii:** small `10px`, medium `16px`, large `24px`. The notch drawer uses `22px`.
- **Section separators:** a hairline `border-t` at the top of each section
  reads as an editorial rule; no card wrappers.
- **Section heading pattern:**
  ```
  Section title                              THREE PARTS
  ─────────────────────────────────────────────────────
  ```
  H2 on the left, mono counter on the right, hairline rule under both.

---

## 5. Backgrounds and depth

The page background is a flat `--color-bg`. No animated aurora. No conic
gradient. No cursor-follow glow.

Depth comes from three quiet sources:

1. **Film grain** at 3% opacity across the whole document. Kills banding on
   dark surfaces and adds analog texture. Applied via `.grain` on `<body>`.
2. **Product stages** (Hero and InteractiveDemo) are lit with a single soft
   near-white radial from above and a very faint 28px dot grid, masked to the
   top of the frame. The product is the subject, not the light.
3. **Glass** is reserved for the notch pill and drawer. It exists because it
   reflects what the real Windows app looks like. It is not used anywhere else
   on the page.

---

## 6. Motion

Restrained. If motion does not communicate state, remove it.

- **Library:** `motion` (Framer Motion successor).
- **Easings:** `cubic-bezier(0.22, 1, 0.36, 1)` for reveals and layout;
  spring `{ stiffness: 260, damping: 30 }` for the notch expansion.
- **Durations:** micro 150ms, standard 350-400ms, hero fade 800ms.
- **Signature moment:** the notch pill springs open into the drawer.
- **Copy ping:** a 1.4s emerald "Copied" chip appears next to the selected row.
- **Everything else** (heading pops, per-card fades, scroll parallax) is
  deliberately absent. The whole layout is not going to slide up on scroll.
- **`prefers-reduced-motion`** is honored globally; the hero fade and the notch
  spring both fall back to instant when set.

---

## 7. Sections in order

1. **Navbar**, text wordmark `Clipz` with mono `v2.0.1`, three anchor
   links, subtle Download pill. Glass background appears only after scroll.
2. **Hero**, mono eyebrow, one-line display heading, one-paragraph body,
   two CTAs (primary Download + text "View source"), mono spec line, then the
   product stage with the live NotchSimulator.
3. **HowItWorks** (`#how`), three numbered spreads (`01 / 02 / 03`),
   alternating left/right. Each spread has a title, body, mono spec bullets on
   a hairline rule, and a small custom diagram: the capture stream, the search
   result panel, the sensitive-clip lifecycle.
4. **InteractiveDemo** (`#demo`), a single product stage that says "this
   is the real component, not a screenshot", with the NotchSimulator inside.
5. **SecuritySection** (`#security`), a short editorial preface on the
   left with a mono spec grid (`Storage`, `Network`, `Sensitive TTL`,
   `License`) and a numbered `i / ii / iii / iv` list on the right.
6. **ShortcutSheet** (`#shortcuts`), nine shortcuts in three groups,
   rendered as a dense mono table with `<kbd>` caps.
7. **FinalCTA** (`#download`), one sentence, one button, one mono
   caption with the installer filename and hash line.
8. **Footer**, wordmark, three link columns, mono copyright and version.

---

## 8. Component inventory

Live modules:
- `Navbar`, `Hero`, `HowItWorks`, `InteractiveDemo`, `SecuritySection`,
  `ShortcutSheet`, `FinalCTA`, `Footer`.
- `NotchSimulator`, the interactive centerpiece, reused in Hero and
  InteractiveDemo.
- `ui/icons.tsx`, bespoke stroke SVGs. No icon-font dependency.
- `ui/Kbd.tsx`, keyboard cap primitive.
- `lib/clips.ts`, the seed data driving the notch demo.
- `lib/cn.ts`, classname joiner.

There is no `GlassCard`, `Reveal`, `SectionHeading`, `Aurora`, or `Button`
primitive. Sections compose their own headings and stages inline because each
one has a specific editorial voice; abstracting them would flatten the layout
back into "cards on a page".

---

## 9. Copy voice

Confident, technical, concrete. Lead with the benefit, back it with the spec.

- Numbers beat adjectives: "sub-millisecond FTS5 search", "cleared from RAM
  after 60s", "under 1% idle CPU".
- Never say "revolutionary", "game-changing", "seamless", "leverage".
- No em dashes. Use commas, periods, colons, or parentheses.
- Mono captions are lowercase (`hover to expand`), uppercase mono is reserved
  for eyebrow labels (`CAPTURE`, `THREE PARTS`).

---

## 10. Accessibility bar

- WCAG AA contrast for every text-on-background pair.
- Full keyboard operability. The notch drawer takes focus when expanded and
  responds to Arrow/Enter/Escape.
- Semantic landmarks (`header / main / section / footer`), one `<h1>`.
- Focus rings visible in violet, offset 2px.
- Responsive from 360px to 1440px+.
- `prefers-reduced-motion` disables the hero fade and the notch spring.

---

## 11. Anti-slop checklist (before shipping any change)

- [ ] No gradient text.
- [ ] No conic-gradient or aurora backgrounds.
- [ ] No glowing bento cards or `box-shadow` rainbows.
- [ ] No sparkle / decorative icons in eyebrows.
- [ ] Every color is either monochrome, functional (the four category hues),
      or the one violet accent.
- [ ] Animation is either the notch spring, the hero fade-up, or absent.
- [ ] Copy contains real numbers and no em dashes.
- [ ] The product carries the visual weight of the page.
