# Independent QA Review — Pass 1: `castings/` (Kinesis Cast & Machine Works)

Conducted against `AGENTS.md`, `briefs/castings.md`, and `docs/castings/plan.md`.

| Severity | Location (file:line or page/section) | Issue | Fix |
|---|---|---|---|
| **blocker** | `castings/components/HeroSection.tsx:48-56` | **Mobile LCP exceeds budget:** Measured mobile LCP is **3.1 s** (budget is ≤ 2.5 s). The hero background image (`valve-body-cad-base.webp`) is rendered using a raw `<img>` tag with fixed `width={1440} height={810}` and no `<link rel="preload">` in the document head or Next.js image optimization. Under Lighthouse mobile 4G throttling, this causes a 3.1 s LCP. | Replace raw `<img>` with Next.js `<Image priority fill sizes="100vw" ... />` or supply a dedicated mobile crop (`≤ 768px`) with `<link rel="preload" as="image" href="/images/hero/valve-body-cad-base.webp">` to reduce fetch latency. |
| **major** | `castings/public/favicon.ico` | **Console error on page load (404 Not Found):** Lighthouse `errors-in-console` failed (score 0) because Chrome requests `http://localhost:3000/favicon.ico` and receives a 404, generating browser console errors and dropping Best Practices. | Add `castings/public/favicon.ico` or `castings/app/icon.png` using the Kinesis CAD crest monogram. |
| **minor** | `castings/app/products/[slug]/page.tsx:161` & `castings/components/RfqForm.tsx:145` | **Uncontrolled `defaultProduct` does not update on client route transitions:** `RfqForm` uses `defaultValue={defaultProduct}`. If a buyer clicks from one product detail page to another using `next/link`, the form remains mounted and does not update the pre-filled component name. | Pass `key={product.slug}` to `<RfqForm key={product.slug} defaultProduct="..." />` in `app/products/[slug]/page.tsx` so the form instance remounts with the current product upon client navigation. |
| **minor** | `castings/next.config.ts:7-15` | **Turbopack root workspace notice during build:** Next.js logs `Warning: Next.js ignored package-lock.json in C:\Users\dudej because it is outside the current Git repository...`. | Set `turbopack: { root: path.resolve(__dirname, '..') }` in `next.config.ts` to silence the warning. |

---

### Verification Summary
- **Integrity:** PASS. Mandatory footer `Concept design — fictional company. Website by Rajiv Dudeja.` on every page; footnote `† All figures, tolerances, capacities and lead times shown are sample figures.` on every page; zero invented testimonials, awards, or real certification logos; sample certificates explicitly marked `Sample Certificate — Placeholder Only`; plant address includes `[fictional]`; zero `TODO`, `lorem`, or `[CONTENT NEEDED]` occurrences; `<meta name="robots" content="noindex, nofollow">` and `robots.ts` `disallow: /` active; all 8 products, 6 process stages, hero image, and 9 PDFs fully logged in `docs/credits.md`.
- **Conversion:** PASS. "Request a quote" visible above the fold at 390px in sticky header and hero; sticky mobile CTA with quote + WhatsApp (hides when env var empty); RFQ form has 4 visible fields + 1 optional message (≤ 5 fields); honeypot + 3s time check + zod validation implemented; submission tested and successfully written to Supabase `rfq_submissions` with `site = 'castings'`.
- **Motion:** PASS. Only `transform`, `opacity`, and `stroke-dashoffset` animated; exactly 1 pinned section on homepage (`#process-line` desktop only, using inner pin-wrapper); `prefers-reduced-motion` fallbacks bypass GSAP on all animated components; hero text renders without JS.
- **Accessibility:** PASS. Lighthouse Accessibility 100/100; contrast ratio 5.75:1 for Molten `#FF5A1F` on Graphite `#14171A`; `:focus-visible` outline configured; skip to main content link; all images have descriptive alt text; single H1 per page.
- **Content Diet:** PASS. Max ~40 words body per section strictly adhered to across all 6 pages; one headline per section; numbers marked with dagger `†`; product detail pages feature strict 4-row mono table + PDF spec download + quote CTA; no raw standards or test methods in body copy.
- **Security:** PASS. Zero secret/service_role keys anywhere in code; only Supabase anon key used client-side; `.env*` gitignored.

---

### Performance & Metrics (Mobile, Production Build)
- **Lighthouse Scores:** Performance: **93** · Accessibility: **100** · Best Practices: **96** · SEO: **66** *(SEO score is docked exclusively due to mandatory `noindex`/`disallow` on fictional company)*
- **LCP:** **3.1 s** (Budget: ≤ 2.5 s — **FAILS BUDGET**)
- **CLS:** **0** (Budget: ≤ 0.1)
- **TBT:** **80 ms** (Budget: ≤ 200 ms)
- **Initial JS Size:** **129.3 KB gzip** (Budget: ≤ 200 KB gzip)
- **Hero Media Size:** **48 KB** WebP (Budget: ≤ 5 MB)

**Verdict:** **FIX**
