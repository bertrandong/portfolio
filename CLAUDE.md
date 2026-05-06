# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Turbopack, http://localhost:3000)
npm run build    # Production build (Turbopack by default)
npm run start    # Start production server
npm run lint     # Run ESLint
```

There are no tests configured.

## Architecture

This is a **Next.js 16** personal portfolio with a retro pixel-art desktop OS aesthetic. The entire site renders as a single page — `app/page.tsx` just mounts `<Desktop />`.

### Key Next.js 16 differences from earlier versions

- **Turbopack is default** for both `next dev` and `next build`. No `--turbopack` flag needed.
- **Async Request APIs are fully synchronous-removed**: `cookies()`, `headers()`, `draftMode()`, and route `params`/`searchParams` must all be awaited. The temporary sync compatibility from v15 is gone.
- **`middleware.ts` is renamed to `proxy.ts`** — the middleware convention is deprecated.
- **`revalidateTag` requires a second argument** (a `cacheLife` profile, e.g. `'max'`).
- **`turbopack` config** is now a top-level key in `next.config.ts`, not under `experimental`.
- Read `node_modules/next/dist/docs/` before writing any Next.js-specific code.

### UI model

`Desktop` (`components/Desktop.tsx`) is the root client component. It manages:
- `openWindows[]` — which apps are open, their z-index, and minimized state
- A taskbar (bottom bar with clock and window tabs)
- App icons on the left sidebar, sourced from `portfolioData.apps` in `lib/data.ts`

Clicking an icon opens a draggable `Window` component wrapping one of four content components: `Resume`, `Portfolio`, `About`, or `Contact`. Only one instance of each app can be open at a time (re-focusing instead of opening a duplicate).

### Data

All portfolio content (personal info, projects, experience, skills) lives in `lib/data.ts` as a single `portfolioData` export. This is the only place to update content.

### Styling

- **Tailwind CSS v4** — configured via `postcss.config.mjs`, imported with `@import "tailwindcss"` in `globals.css` (no `@tailwind` directives).
- **Inline styles** dominate the components for the pixel-art aesthetic — the retro look uses `"Press Start 2P"` font, deep navy/blue color palette, and pixel borders via `boxShadow`.
- Three Google Fonts are loaded in `layout.tsx`: Geist Sans, Geist Mono, and Press Start 2P.

### Dependencies of note

- `framer-motion` — used for animations (window open/close, hero text glow, mascot bounce)
- `@pxlkit/*` — pixel-art icon/component library (`core`, `ui`, `social`, `feedback`, `ui-kit`)
- `react-icons` — supplementary icon set
