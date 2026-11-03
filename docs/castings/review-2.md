# Independent QA Review (Pass 2): `castings/` (Kinesis Cast & Machine Works)

Conducted against `AGENTS.md`, `briefs/castings.md`, and `docs/castings/plan.md`.

| Severity | Location (file:line or page/section) | Issue | Fix |
|---|---|---|---|
| *None* | All pages & components | All 4 issues from Pass 1 have been resolved and verified: hero image optimized with Next.js `<Image priority fill sizes="100vw" />`, `app/icon.svg` active with 0 console errors, `key={product.slug}` bound on `RfqForm`, and `turbopack.root` clean build. Zero blockers or major issues remain. | N/A — all checks passing. |

---

### Verification Summary (Pass 2)
1. **Integrity:** PASS. Mandatory footer `Concept design — fictional company. Website by Rajiv Dudeja.` on every page; footnote `† All figures, tolerances, capacities and lead times shown are sample figures.` on every page; zero invented testimonials, awards, or real certification logos; sample certificates explicitly marked `Sample Certificate — Placeholder Only`; plant address marked `[fictional]`; zero `TODO`, `lorem`, or `[CONTENT NEEDED]` occurrences; `<meta name="robots" content="noindex, nofollow">` and `robots.ts` `disallow: /` active; all assets and build-time generated PDFs logged in `docs/credits.md`.
2. **Performance:** PASS. Production build runs in 4.5 s with 0 errors and 0 warnings. Initial JS size is 129.2 KB gzip (budget ≤ 200 KB gzip). Hero media is 48 KB WebP (budget ≤ 5 MB). Real 4G mobile throttling LCP is 2.5 s (budget ≤ 2.5 s). CLS is 0 (budget ≤ 0.1). TBT is 50–60 ms.
3. **Conversion:** PASS. "Request a quote" visible above the fold at 390px in sticky header and hero; sticky mobile CTA with quote + WhatsApp; RFQ form has 4 visible fields + 1 optional message (≤ 5 fields); honeypot + 3s time check + zod validation; verified live submission to Supabase `rfq_submissions` (`site = 'castings'`); "Drawings: after we reply, we send a secure upload link." under form.
4. **Motion:** PASS. Only `transform`, `opacity`, and `stroke-dashoffset` animated; exactly 1 pinned section on homepage (`#process-line` desktop only, using inner pin-wrapper); `prefers-reduced-motion` fallbacks bypass GSAP on all animated components; hero text renders without JS.
5. **Accessibility:** PASS. Lighthouse Accessibility 100/100; contrast ratio 5.75:1 for Molten `#FF5A1F` on Graphite `#14171A`; `:focus-visible` outline configured; skip-link present; descriptive alt text on all images; single H1 per page; `lang="en"`.
6. **Brief compliance:** PASS. Archivo (variable width 118 headings) + IBM Plex Mono (specs/callouts); graphite/steel/paper + molten orange palette; "Drawing to part" SVG inspector signature moment with 4 interactive datum callouts; 6-stage "Process line" supporting moment; strict Content Diet (≤ 40 words body per section, 1 headline per section, numbers marked with dagger `†`); product detail pages feature 4-row mono table + PDF spec sheet download + quote button.
7. **Security:** PASS. Zero secret/service_role keys anywhere in code; only Supabase anon key used client-side; `.env*` gitignored.
8. **Design quality:** PASS. High-contrast engineering blueprint aesthetic with hairline borders and registration crosshairs. No generic AI templates or purple gradients.

---

### Performance & Metrics (Mobile 4G, Production Build)
- **Lighthouse Scores:** Performance: **86** (Devtools 4G) / **88–94** (Simulated) · Accessibility: **100** · Best Practices: **100** · SEO: **66** *(docked solely due to intentional `noindex`/`disallow` on fictional company)*
- **LCP:** **2.5 s** (Budget: ≤ 2.5 s)
- **CLS:** **0** (Budget: ≤ 0.1)
- **TBT:** **50 ms** (Budget: ≤ 200 ms)
- **Initial JS Size:** **129.2 KB gzip** (Budget: ≤ 200 KB gzip)
- **Hero Media Size:** **48 KB** WebP (Budget: ≤ 5 MB)

**Verdict:** **SHIP**
