# Khushi Rana — Portfolio v2

World-class editorial light-theme portfolio. Built with React 18, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Design Concept

**"The Brief"** — Editorial, typographically-led. Warm off-white paper, deep ink-black type, gold accent. Inspired by Stripe, Linear, and premium editorial design — NOT a typical dark developer portfolio.

**Color Palette:**
- `#FAFAF7` — warm paper white (background)
- `#0D0D0D` — near-black ink (text)
- `#C9A84C` — saffron gold (accent — distinctive, non-generic)
- `#E2E2DC` — warm rule/border gray
- `#2E7D52` — forest green (positive metrics)

**Typography:**
- Display: Space Grotesk — geometric, engineered feel
- Serif: Playfair Display italic — premium editorial contrast
- Body: Inter — clean, readable
- Mono: JetBrains Mono — data, labels, metrics

## Features

- ⌘K Command palette (keyboard navigable)
- Custom gold cursor with hover states
- Reading progress bar
- Typewriter hero with 5 rotating phrases
- Filterable project grid with full case study modals
- Interactive skills table with animated bars
- Experience accordion with impact callouts
- Engineering process section (impresses senior engineers)
- Recruiter section (maximises interview conversion)
- Responsive: mobile → tablet → desktop
- Code-split lazy sections for performance
- SEO meta tags

## Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 + TypeScript (strict) |
| Build | Vite 5 |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| Icons | Lucide React |

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx      ← filterable + case study modal
│   │   ├── About.tsx         ← editorial pull quote + timeline
│   │   ├── Skills.tsx        ← animated table
│   │   ├── Experience.tsx    ← tabbed accordion
│   │   ├── Process.tsx       ← 6-phase engineering process
│   │   ├── Recruiter.tsx     ← hiring manager section
│   │   └── Contact.tsx       ← form + closing quote
│   └── ui/
│       ├── Cursor.tsx        ← custom gold cursor + progress bar
│       └── CommandPalette.tsx
├── data/portfolio.ts         ← ALL content lives here
├── hooks/
│   ├── useTypewriter.ts
│   ├── useInView.ts
│   ├── useScrollProgress.ts
│   └── useCommandPalette.ts
├── types/index.ts
└── styles/globals.css
```

## Quick Start

```bash
npm install
npm run dev
```

## Customise Before Deploying

1. **Your content** — edit `src/data/portfolio.ts` with real projects & experience
2. **Your email** — search `khushi@example.com` and replace throughout
3. **Your links** — search `khushirana` and update GitHub/LinkedIn URLs
4. **Your resume** — place PDF at `public/resume.pdf`
5. **OG image** — place `public/og-image.jpg` (1200×630) for social previews

## Deploy to Vercel

```bash
# Option 1: CLI
npm i -g vercel
vercel --prod

# Option 2: GitHub → vercel.com/new → import repo
# Framework auto-detected as Vite. Click Deploy.
```

## Lighthouse Targets

| Metric | Target |
|--------|--------|
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

**Optimisations included:**
- React.lazy() + Suspense for below-fold sections
- Framer Motion tree-shaken
- Google Fonts with `display=swap` + preconnect
- Long-term cache headers on assets (vercel.json)
- Zero unused CSS (Tailwind purge in prod)
