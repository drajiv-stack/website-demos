# Export Demo Sites — Project Rules

## What this repo is
Three portfolio demo websites for **fictional** Indian export companies. They sell our "export website that gets buyer RFQs" service on Fiverr and in outreach.
The prospect is an Indian manufacturer or exporter. They must look at a demo and think: "this would make overseas buyers take us seriously."
The selling point is the combination: **premium, cinematic feel + loads fast on a mid-range Android over 4G + obvious path to an RFQ.** A slow beautiful site fails the brief.

## Repo layout
- `spices/`, `castings/`, `textiles/` — each a standalone Next.js app, deployed as its own Vercel project (Root Directory = that folder).
- `supabase/migrations/` — shared database schema (one Supabase project for all three demos).
- `briefs/` — approved briefs. Stage 0 (grilling) is already done. Do not re-ask what a brief answers; ask only about genuine gaps.
- `docs/<demo>/` — plan, review reports, Lighthouse output. `docs/build-log.md` — time log. `docs/credits.md` — asset sources.

## Stack (fixed unless the plan justifies a change in one sentence)
- Next.js (App Router) + TypeScript + Tailwind. Static generation for every public page.
- GSAP + ScrollTrigger for motion. Client components only, register plugins once, import only what is used.
- `next/font` (self-hosted Google Fonts), `next/image` (AVIF/WebP, explicit sizes).
- Supabase (`@supabase/supabase-js`, `@supabase/ssr`): RFQ submissions for all demos; products + admin panel for `textiles` only.
- No component libraries or UI kits. No smooth-scroll libraries that take over native scrolling.
- Three.js / React Three Fiber only if the plan justifies it in one sentence, lazy-loaded, below the fold, with an image fallback.

## Workflow for every demo
1. **Plan** — read `briefs/<demo>.md`, write `docs/<demo>/plan.md`: sitemap; every section with its one job; motion plan table (element | trigger | duration | what it communicates); data flow as a Mermaid diagram; asset list with sources. **Stop and wait for approval.**
2. **Build** — follow the approved plan exactly. Write start and finish time in `docs/build-log.md`.
3. **Review** — invoke the `reviewer` subagent. It never edits files. Save its findings to `docs/<demo>/review-<n>.md`, fix them, re-run. Maximum 3 loops, then stop and list open items.
4. **Ship** — commit and push to `main` (Vercel deploys). Then capture gallery screenshots (below) and report the live URL.

## Integrity (non-negotiable)
- Footer on every page: `Concept design — fictional company. Website by [STUDIO NAME].`
- Never invent client logos, testimonials, awards, real buyer names or real certification marks (ISO, APEDA, Spices Board, CE, BIS, OEKO-TEX, GOTS logos). Certificate sections show clearly labelled "Sample certificate" placeholders.
- Any number shown (capacity, years, volumes) carries a visible "sample figure" label.
- No TODOs, stubs, "rest of code here" or lorem ipsum. Missing content is shown as `[CONTENT NEEDED: …]` — and none may remain at ship time.
- Images and video: licensed stock (Pexels, Unsplash, Coverr) or AI-generated only. Log every asset's source URL and licence in `docs/credits.md`.
- Add `<meta name="robots" content="noindex">` to every page. Fictional companies must not appear in search results.

## Design
- Avoid generic AI defaults: centred hero + 3-card grid, purple/blue gradients, Inter/Roboto everywhere, emoji icons, glassmorphism, stock-illustration people.
- Use the type pairing, palette (neutrals + ONE accent) and signature moment defined in each brief. The three demos must look clearly different from each other.
- **One signature moment per site** carries the "wow". Everything else is calm, precise and fast. Cut any animation without a stated purpose.
- All text is real HTML (never baked into images, video or canvas).

## Motion and media
- Animate `transform` and `opacity` only. No layout shift. Max 2 pinned sections per page. Never block reading.
- `prefers-reduced-motion`: static fallback for every animation.
- Hero headline and CTA render without JavaScript; GSAP enhances after first paint.
- Video: `muted playsinline loop autoplay`, `poster`, `preload="metadata"` (and `none` below the fold), MP4 (H.264) + WebM, hero ≤ 4 MB. Screens < 768 px get a smaller encode or the poster only.

## Performance budget (mobile, 4G) — a miss is a blocker
Lighthouse Performance ≥ 85 (aim 90+) · LCP ≤ 2.5 s · CLS ≤ 0.1 · INP ≤ 200 ms · initial JS ≤ 200 KB gzip · hero media ≤ 5 MB total.

## Conversion
- "Request a quote" visible above the fold on mobile; sticky bottom CTA on mobile after the hero.
- RFQ form, max 5 fields: name, business email, country, product + quantity, message (optional).
- Spam protection: hidden honeypot field + reject submissions made < 3 s after page load + zod validation in a server action/route.
- On success, show what happens next ("We reply within 24 hours with price, MOQ and lead time").
- Insert into Supabase `rfq_submissions` with `site` = demo folder name.
- WhatsApp click-to-chat button using `NEXT_PUBLIC_WHATSAPP_NUMBER`; hide the button if the variable is empty.

## Accessibility and SEO quality
WCAG 2.1 AA contrast, keyboard navigation, visible focus states, alt text, one H1 per page, semantic headings, correct `lang` (German pages `lang="de"`). Unique titles and meta descriptions, OG image, sitemap.xml, schema.org `Organization` and `Product` JSON-LD (shows SEO craft even though pages are noindex).

## Security
- Supabase Row Level Security on every table (see `supabase/migrations/0001_init.sql`). Never disable it.
- Frontend uses only the publishable/anon key via env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Never put a service_role / secret key in code, the repo or the client. `.env*` stays in `.gitignore`.

## Gallery screenshots (after ship)
Use the browser to capture, per demo, into `docs/gallery/<demo>/`:
1. Desktop 1280×769 — hero.
2. Desktop 1280×769 — signature section mid-animation (best frame).
3. Mobile 390×844 — hero with sticky CTA.
No browser chrome, no cookie banners, no personal data.
