# Clipz Website

The marketing landing page for **Clipz**, the Dynamic Island clipboard hub for Windows.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Motion. The visual
language, tokens, and motion rules live in [`design.md`](./design.md).

## Highlights

- **Interactive notch simulator** that expands, filters, searches, and responds to the
  keyboard, the same interaction model as the real app.
- **Bespoke inline icon set** (`src/components/ui/icons.tsx`), no icon-font dependency.
- **Restrained neon-on-black** glassmorphism with a single ambient aurora and film grain.
- **Accessible by default**: semantic landmarks, focus rings, and full
  `prefers-reduced-motion` support.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script          | Description                     |
|-----------------|---------------------------------|
| `npm run dev`   | Start the dev server            |
| `npm run build` | Production build                |
| `npm run start` | Serve the production build      |
| `npm run lint`  | Run ESLint                      |

## Project structure

```
src/
  app/                 Next.js App Router (layout, page, global styles)
  components/          Section components (Hero, BentoFeatures, ...)
    NotchSimulator     The interactive Dynamic Island centerpiece
    ui/                Primitives (GlassCard, Kbd, icons, Reveal, ...)
  lib/                 Mock clipboard data + helpers
design.md              Design system and art direction
```

## License

MIT
