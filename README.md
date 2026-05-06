# Wilson — Design Agency Site

A 5-page Next.js (App Router) site built to feel premium and bold.
Stack: **Next.js 14** · **React 18** · **TypeScript** · **Three.js** · **GSAP + ScrollTrigger** · **Lenis** smooth scroll · **Poppins** via `next/font`.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Pages

| Path        | What's there                                                     |
|-------------|------------------------------------------------------------------|
| `/`         | Hero with 3D shader-distorted icosahedron, services teaser, marquee, parallax work strip, CTA |
| `/services` | All four services with 3D-tilt cards, full process steps, marquee, CTA |
| `/work`     | Title, filter chips, six-card project grid with hover overlay, parallax editorial block, CTA |
| `/about`    | Manifesto, scroll-triggered count-up stats, team grid, stacked testimonials, CTA |
| `/contact`  | Project brief form (chip budget picker), contact column, availability banner |

## Brand tokens

Edit in [`app/globals.css`](app/globals.css) under `:root`:

```css
--bg: #0a0a0a;
--fg: #ffffff;
--accent: #ff2d2d;
--accent-glow: rgba(255, 45, 45, 0.45);
```

## Where to edit content

- **Hero copy & headlines** → [`app/page.tsx`](app/page.tsx)
- **Services list** → top of [`app/services/page.tsx`](app/services/page.tsx)
- **Projects** → top of [`components/ProjectGrid.tsx`](components/ProjectGrid.tsx) (each item has `art:` — any CSS background works)
- **Process steps** → top of [`components/ProcessSteps.tsx`](components/ProcessSteps.tsx)
- **Stats** → top of [`components/StatsSection.tsx`](components/StatsSection.tsx)
- **Testimonials** → top of [`components/Testimonials.tsx`](components/Testimonials.tsx)
- **Team** → top of [`app/about/page.tsx`](app/about/page.tsx)
- **Footer columns / socials** → [`components/Footer.tsx`](components/Footer.tsx)

## Interaction reference

| Effect | Component |
|---|---|
| Smooth scroll w/ momentum | [`LenisProvider.tsx`](components/LenisProvider.tsx) |
| Custom morphing cursor | [`CustomCursor.tsx`](components/CustomCursor.tsx) — add `data-cursor="link\|cta\|view"` to any element |
| Magnetic hover on buttons | [`MagneticButton.tsx`](components/MagneticButton.tsx) |
| Mask/clip-path text reveal | [`RevealText.tsx`](components/RevealText.tsx) |
| Infinite marquee | [`Marquee.tsx`](components/Marquee.tsx) |
| 3D tilt service card | [`ServiceCard.tsx`](components/ServiceCard.tsx) |
| Parallax depth | [`ParallaxBlock.tsx`](components/ParallaxBlock.tsx) |
| Three.js hero shader | [`HeroScene.tsx`](components/HeroScene.tsx) — vertex displacement + fresnel + mouse warp |
| Scroll count-up | [`StatsSection.tsx`](components/StatsSection.tsx) |
| Stacked testimonial slider | [`Testimonials.tsx`](components/Testimonials.tsx) |
