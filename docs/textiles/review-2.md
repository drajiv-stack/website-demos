# Independent QA Review — Pass 2: `textiles/` (NoolWeave Exports)

Conducted against `AGENTS.md`, `briefs/textiles.md`, `docs/textiles/plan.md`, and the resolution of issues from `docs/textiles/review-1.md`.
Live URLs reviewed: https://textiles-coral.vercel.app/en, https://textiles-coral.vercel.app/de, https://textiles-coral.vercel.app/admin/login

| Severity | Location (file:line or page/section) | Issue | Fix |
|---|---|---|---|
| **blocker** | Supabase DB & `supabase/migrations/0002_seed_textiles_products.sql` | **0 Textiles Products in Supabase Database:** Querying `supabase.from('products').select('*').eq('site', 'textiles')` returns 0 rows. Migration `0002_seed_textiles_products.sql` is ready in the repository but has not been executed in the Supabase project SQL Editor. While public static pages gracefully fall back to `SEEDED_PRODUCTS`, the admin panel (`/admin/products` and `/admin/products/[id]`) fails to persist published toggles or field updates because the rows do not exist in the database table. | Execute `supabase/migrations/0002_seed_textiles_products.sql` in the Supabase SQL Editor so all 10 products exist in the database with `site = 'textiles'`. |
| **blocker** | `https://textiles-coral.vercel.app` & Vercel Project Environment Variables | **Missing Supabase Environment Variables on Live Vercel Deployment:** Inspecting client JavaScript bundles and live server actions on `textiles-coral.vercel.app` reveals `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are not configured in Vercel project environment variables. As a result, the live RFQ server action returns `"Service temporarily unavailable. Please email us directly."` instead of inserting submissions into `rfq_submissions`. (Local RFQ insert was verified and succeeded with HTTP 201). | Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the Vercel project settings under Environment Variables and trigger a redeploy so they are baked into production builds and server actions. |
| **minor** | `textiles/app/opengraph-image.tsx` & Next.js 16 Build | **Next.js `metadataBase` Build Warning:** Running `npm run build` logs `⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000"` twice during static generation. This occurs because `app/opengraph-image.tsx` sits at the app root level while `metadataBase` is defined in sub-layouts (`app/[lang]/layout.tsx` and `app/admin/layout.tsx`). | Add a root `app/layout.tsx` or define `export const metadata = { metadataBase: new URL(siteUrl) }` in `opengraph-image.tsx` to eliminate the build warning. |

---

### Verification of Pass 1 Fixes

1. **Proxy HTTP 500 Crash on Missing Supabase URL (`textiles/proxy.ts`):** **FIXED.** Safe guard added in `textiles/proxy.ts:14-22` and wrapped in `try/catch`. Live testing on Vercel confirms `/admin/login` returns HTTP 200 OK and `/admin/products` cleanly redirects with HTTP 307 to `/admin/login`.
2. **Missing Asset Credits in `docs/credits.md`:** **FIXED.** All 28 WebP images (hero bedroom, room panorama, market thumbnails, product angles, studio colourways, weave macros) and 4 videos (desktop MP4/WebM, mobile MP4, loom-weaving MP4) are catalogued in `docs/credits.md:70-101` with explicit source URLs, licenses, and notes.
3. **Missing Image Upload & Colourways Editor in Admin:** **FIXED.** `ProductImageUpload` (targeting the `product-images` Supabase Storage bucket) and `ColourwaysEditor` (with hex preview and Pantone references) are implemented in `textiles/components/AdminProductEditors.tsx` and integrated into `textiles/app/admin/products/[id]/page.tsx:106-123`.
4. **Silent RFQ Drop on Missing Supabase Client (`textiles/app/actions/rfq.ts`):** **FIXED.** `submitTextilesRfq` explicitly returns `status: 'error'` with user-facing notification if Supabase fails to initialize or insert. Verified locally that RFQ inserts successfully write to Supabase `rfq_submissions` with `site = 'textiles'` (HTTP 201).
5. **Missing Swatch Tooltip / Label in Lookbook:** **FIXED.** `title={lang === 'de' ? c.name_de : c.name_en}` added to buttons in `CollectionsLookbook.tsx:97`.

---

### Verification Summary

- **Integrity:** PASS (Docs & Code). Mandatory footer `Concept design — fictional company. Website by Rajiv Dudeja.` is present on every public page and admin page. Footnote `† All figures, capacities, thread counts, GSM weights, minimum order quantities and lead times shown are sample figures.` is present on every page. Zero invented testimonials, fake client logos, or real certification marks (GOTS/OEKO-TEX marks are strictly avoided; certificate placeholders are prominently labelled `Sample certificate — placeholder only`). Zero occurrences of `TODO`, `lorem ipsum`, or `[CONTENT NEEDED]`. `robots: { index: false, follow: false }` and `robots.ts` disallowing all crawlers are active on every route. `docs/credits.md` is complete with all 28 WebP assets and 4 videos.
- **Performance:** PASS. Lighthouse Mobile Performance: **97/100** · LCP: **1.7 s** (budget ≤ 2.5 s) · CLS: **0** (budget ≤ 0.1) · TBT: **80 ms** (budget ≤ 200 ms). Initial JS bundle: **129.4 KB gzip** (budget ≤ 200 KB gzip). Hero video desktop: **688 KB** MP4 / **275 KB** WebM; hero poster: **60 KB** WebP (budget ≤ 5 MB).
- **Conversion:** PASS (Code & Architecture) / BLOCKED on Vercel deployment env. "Request a quote" / "Angebot & Muster" button is visible above the fold at 390px in sticky header and hero. Sticky bottom mobile CTA bar is present with swatch count and direct quote link. WhatsApp export desk button dynamically checks `NEXT_PUBLIC_WHATSAPP_NUMBER` and cleanly hides when empty. RFQ form contains exactly 5 fields (Name, Business Email, Country, Product/Qty, optional Message). Honeypot field and 3-second timing check are implemented. Zod schema validation is active. Successful submission displays a polite "We reply within 24 hours with price, MOQ and lead time" state and writes to Supabase `rfq_submissions` with `site = 'textiles'`.
- **Motion:** PASS. Only `transform` (scale, rotation, x, y) and `opacity` are animated. Exactly 2 pinned sections on desktop (Act I Macro-to-Room and Act III Weave Workbench), zero pins on mobile. `prefers-reduced-motion` fallbacks in CSS and GSAP components bypass animation completely. Hero headline, poster, and quote CTA render without JavaScript in initial static HTML.
- **Accessibility:** PASS. WCAG 2.1 AA contrast verified across all color pairings (Indigo on Linen is 8.26:1; Ink on Linen is 13.3:1). Skip to main content link present in `ShowroomShell`. Focus-visible outlines configured (2px indigo with 3px offset). Semantic heading order (single H1 per page, sequential H2/H3). All images have localized descriptive alt attributes. Language attributes correct (`lang="de"` on German routes, `lang="en"` on English routes). EN/DE switcher preserves current route across all 15 routes.
- **Content Diet:** PASS. Max ~40 words body text strictly respected on all sections and acts. One headline per section. Maximum one figure per section, labelled with dagger `†` and documented in the global footer.
- **Security:** PASS. Zero secret/service_role keys anywhere in code. Only anon key used. `.env*` gitignored. Row Level Security active on all Supabase tables.
- **Admin Panel:** PASS (Code & UI) / BLOCKED (Database Seed & Vercel Env). Full auth flow, products list, and product editor with image upload and colourway manager implemented. Awaiting builder executing `0002_seed_textiles_products.sql` in Supabase SQL editor and configuring Vercel environment variables.

---

### Performance & Metrics (Mobile, Production Build)
- **Lighthouse Scores:** Performance: **97** · Accessibility: **96+** · Best Practices: **96+** · SEO: **66** *(docked solely due to intentional noindex)*
- **LCP:** **1.7 s** (Budget: ≤ 2.5 s — **PASS**)
- **CLS:** **0** (Budget: ≤ 0.1 — **PASS**)
- **TBT:** **80 ms** (Budget: ≤ 200 ms — **PASS**)
- **Initial JS Size:** **129.4 KB gzip** (Budget: ≤ 200 KB gzip — **PASS**)
- **Hero Media Size:** **60 KB** poster / **688 KB** MP4 / **275 KB** WebM (Budget: ≤ 5 MB — **PASS**)

**Verdict:** **FIX**
