# Review Report — Demo 1: Spices (`Elakkaya Spice Exports`) — Pass 1

Conducted independent code & build review against `AGENTS.md`, `briefs/spices.md`, and `docs/spices/plan.md`.

## Findings

| Severity | Location (file:line or page/section) | Issue | Fix |
|---|---|---|---|
| **blocker** | `spices/components/HeroVideo.tsx:19-22, 67-85` | **Fails Performance Budget (LCP 4.8 s > 2.5 s; Score 75 < 85)**. The component mounts the autoplay `<video>` element on all viewports via a 150 ms `setTimeout`. Under simulated 4G mobile throttling in Lighthouse, Chrome replaces the preloaded LCP poster image with the `<video>` element once it buffers/starts, delaying LCP to 4.75 s. | Per `AGENTS.md` ("Screens < 768 px get a smaller encode or the poster only"): Restrict video mounting to viewports `window.matchMedia('(min-width: 768px)').matches`, serving only the preloaded WebP poster (`fetchpriority="high"`) on mobile screens (< 768 px) so mobile LCP completes at ~1.1 s. |
| **major** | `spices/components/ExportRouteMap.tsx:35` | **Fails WCAG 2.1 AA Contrast (1.23:1)**. `gsap.set(labels, { opacity: 0.15, y: 12 })` sets 15% opacity on `[data-route-card]`, dimming all route card typography against `#160f0c` on initial load. Lighthouse measures text contrast as 1.23:1 (threshold is 4.5:1), failing Accessibility audit. | Remove the 15% opacity dimming on the text cards. Keep cards at full opacity (`opacity: 1`) and animate `transform` (`y`) only. |
| **major** | `spices/components/FeaturedProductsReveal.tsx:110, 114` | **Fails WCAG 2.1 AA Contrast (4.11:1 < 4.5:1)**. `<span className="font-semibold uppercase tracking-wider text-espresso/65">Grade: </span>` on `#FAF5EC` cream-soft background gives 4.11:1 contrast, falling short of the 4.5:1 requirement for 12px text. | Change `text-espresso/65` to `text-espresso/80` or `text-espresso` (contrast > 7:1) to satisfy WCAG AA contrast. |
| **major** | `spices/components/Header.tsx:22-26` | **Fails WCAG 2.5.3 (Label in Name)**. `<Link aria-label="Elakkaya Spice Exports — Home" href="/">` omits the visible text `"· Kochi"` present in the child span `"Spice Exports · Kochi"`. Accessible name must include the visible text string. | Remove the redundant `aria-label` (the child spans already provide the full accessible text "Elakkaya Spice Exports · Kochi"). |
| **minor** | `spices/components/StickyMobileCta.tsx:26` | **BFCache Restoration Warning**. Window scroll event listener advisory. | Rely purely on `IntersectionObserver` observing `#site-hero`. |
| **minor** | `spices/public/` | **Unused Template Artifacts**. Default Next.js template SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) remain in `spices/public/`. | Remove unused starter SVG files from `spices/public/`. |

---

## Performance & Audit Summary

- **Lighthouse Scores (Mobile)**:
  - **Performance**: 75 / 100 *(Budget: ≥ 85)* — **FAILED**
  - **Accessibility**: 97 / 100
  - **Best Practices**: 100 / 100
  - **SEO**: 66 / 100 *(Expected: mandatory `noindex, nofollow` per AGENTS.md)*
- **Core Web Vitals & Metrics**:
  - **FCP**: 1.1 s
  - **LCP**: 4.8 s *(Budget: ≤ 2.5 s)* — **FAILED**
  - **CLS**: 0.00 *(Budget: ≤ 0.1)* — **PASSED**
  - **TBT**: 260 ms
- **Initial JS Size**: **155.7 KB gzip** *(Budget: ≤ 200 KB gzip)* — **PASSED**
- **Hero Media Size**: **~1.2 MB mobile / ~1.5 MB desktop** *(Budget: ≤ 5 MB)* — **PASSED**

**Verdict: FIX**
