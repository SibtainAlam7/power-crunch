# POWER CRUNCH — Protein Energy Bar Landing Page

An interactive, scroll-driven D2C product landing page for **Power Crunch Protein Energy Bars** (Red Velvet, Peanut Butter Fudge, and Triple Chocolate), built with **React 19**, **Vite**, and **Tailwind CSS v4**.

## Features

- **Scroll-Driven Canvas Hero:** Full-bleed `object-fit: cover` 60–120fps WebP frame scrubbing across all 3 flavours with progressive priority preloading and 100% viewport-height mobile framing.
- **Dynamic Multi-Flavour Theme System:** Seamlessly switches accent colors, imagery, nutrition facts, ingredients, and checkout drawer styling between **Red Velvet** (default), **Peanut Butter Fudge**, and **Triple Chocolate**.
- **Express Checkout Drawer:** Interactive `"Claim My Box"` CTAs with pack upsell tiers (`1 Box`, `2 Boxes · Save 10%`, `3-Flavour Pack · Save 15%`), free-shipping progress bar, quantity stepper, and instant order reservation feedback.
- **Responsive Navigation:** Transparent-to-frosted scroll-reactive header, reading-progress hairline, clean-URL smooth scrolling, and a mobile hamburger slide-down drawer (`< 768px`).

## Run Locally

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this repository to GitHub (ignoring `node_modules/` and `dist/` via `.gitignore`).
2. Import the repository on [Vercel](https://vercel.com/new) — `vercel.json` is pre-configured with Vite build settings and immutable CDN caching for `/frames/*` and `/images/*`.
3. Click **Deploy**.
