# Review Report — Demo 1: Spices (`Elakkaya Spice Exports`) — Pass 2

Pass 2 review against `AGENTS.md`, `briefs/spices.md`, and `docs/spices/plan.md`.

## Status of Pass 1 Findings
1. `HeroVideo.tsx` (Video on mobile): **FIXED** — Video element no longer mounts on mobile viewports (< 768 px).
2. `ExportRouteMap.tsx` (Card opacity contrast): **FIXED** — `opacity: 0.15` removed; cards remain at 100% opacity with full contrast.
3. `FeaturedProductsReveal.tsx` (Grade contrast): **FIXED** — Changed to `text-espresso/85` (> 7:1 contrast).
4. `Header.tsx` (Label in Name mismatch): **FIXED** — Redundant `aria-label` removed; accessible name matches visible text.
5. `StickyMobileCta.tsx` (BFCache scroll listener): **FIXED** — Removed fallback window scroll listener; uses `IntersectionObserver`.
6. `spices/public/` (Unused starter SVGs): **FIXED** — Removed starter SVG files.

**Accessibility score is now a perfect 100 / 100.**

---

## Pass 2 Findings Table

| Severity | Location (file:line or page/section) | Issue | Fix |
|---|---|---|---|
| **blocker** | `spices/components/HeroVideo.tsx`, `FeaturedProductsReveal.tsx`, `ExportRouteMap.tsx`, `FarmToPortSection.tsx` | **Fails Performance Budget (LCP 4.5 s > 2.5 s; Score 78 < 85)**. While `hero-poster.webp` wins LCP and downloads in 128 ms, Lighthouse reports an **`elementRenderDelay` of 2,154 ms** (FCP 2.2 s, LCP 4.5 s). During initial hydration on simulated 4G mobile CPU, all 4 components concurrently trigger dynamic imports for `gsap` and `ScrollTrigger` and execute synchronous layout measurements, accumulating 2.1 s of main-thread work that delays LCP paint. | 1. Gate below-the-fold GSAP/ScrollTrigger imports (`FeaturedProductsReveal`, `ExportRouteMap`, `FarmToPortSection`) behind an `IntersectionObserver` (`rootMargin: '300px'`) so zero GSAP code executes during initial above-the-fold hydration.<br>2. In `HeroVideo.tsx`, skip GSAP on mobile (< 768 px) and pass `unoptimized` to the pre-compressed 66 KB `hero-poster.webp`.<br>3. Trim `Fraunces` font axes in `app/layout.tsx` to reduce initial font payload. |

---

## Performance & Audit Summary (Pass 2)

- **Lighthouse Scores (Mobile, Throttled 4G)**:
  - **Performance**: 78 / 100 *(Budget: ≥ 85)* — **FAILED (BLOCKER)**
  - **Accessibility**: 100 / 100 — **PERFECT**
  - **Best Practices**: 100 / 100 — **PERFECT**
  - **SEO**: 66 / 100 *(Expected: mandatory `noindex, nofollow`)*
- **Core Web Vitals & Metrics**:
  - **FCP**: 2.2 s
  - **LCP**: 4.5 s *(Budget: ≤ 2.5 s)* — **FAILED (BLOCKER)**
  - **CLS**: 0.00 *(Budget: ≤ 0.1)* — **PASSED**
  - **TBT**: 120 ms — **PASSED**
- **Initial JS Size**: **155.7 KB gzip** *(Budget: ≤ 200 KB gzip)* — **PASSED**
- **Hero Media Size**: **67 KB mobile / ~1.5 MB desktop** *(Budget: ≤ 5 MB)* — **PASSED**

**Verdict: FIX**
