# Spices Demo Uplift Plan — Visual Simplification & Editorial Polish (`spices/`)

**Status:** Awaiting User Approval  
**Goal:** Show prospects what is visually possible — less content, higher visual impact, zero clutter, strictly adhering to [AGENTS.md](file:///c:/Users/dudej/Projects/website-demos/AGENTS.md) (performance budget, max 2 pinned sections, `transform`/`opacity` + approved route `stroke-dashoffset`, `prefers-reduced-motion` fallbacks, integrity footer).

---

## 1. Content & Editorial Rules Applied Across the Entire Site

1. **Brevity:** Maximum **~40 words of body copy per section**. Strictly **one headline per section**.
2. **Zero Technical Clutter:** Strip out all grade codes (`TGSEB`, `AGEB`, `ASTA`, `SHU`), ISO/ASTA standard citations, HPLC/GC-MS test methods, payment terms, lab parameter cards, the homepage stats band, and the duplicate stats row under the hero.
3. **Dagger (`†`) Footnote Rule:** Maximum **one number per section**. Any number carries a clean `†` dagger mark (`14–18 days†`, `500 kg†`, `1987†`) that references a single footnote line in `Footer.tsx`:
   - `† All figures, capacities and transit times shown are sample figures.`
   - `Concept design — fictional company. Website by Rajiv Dudeja.`
4. **Polish & Layout Rhythm:**
   - **SVG Monogram:** Bespoke minimalist cardamom-pod / geometric `E` SVG monogram beside the `Elakkaya` wordmark in `Header.tsx` and `Footer.tsx`.
   - **Subtle Grain:** Lightweight CSS SVG noise overlay (`opacity: 0.035`, `pointer-events: none`) on dark `#1E1410` / `#150E0B` sections.
   - **Layout Variety:** Every consecutive section uses a distinct spatial structure (Full-bleed viewport video → Split interactive hover list + large portrait reveal → Full-width dark maritime radar canvas → Pinned 400vw horizontal full-bleed filmstrip → Editorial split triptych with giant typography → Minimal two-column conversion studio).

---

## 2. Home Page (`app/page.tsx`) — 6 Distinct Sections

| # | Section | Layout & Visual Architecture | Copy & Content Cap (≤ 40 words) | Max 1 Number (`†`) |
|---|---|---|---|---|
| **1** | **Hero (`HeroVideo.tsx`)** | Full-bleed edge-to-edge video (`100svh`), deeper dark espresso vignette grade (`#150E0B`), pre-compressed 66 KB WebP poster first. No badge pills, no stats row, no secondary or WhatsApp buttons in the hero. | **H1 (2 short lines, revealed line by line):** *"Kerala’s harvest, / shipped whole to the world."*<br>**1 sentence (~18 words):** *"Single-origin pepper, cardamom and warming spices from the Western Ghats, cleaned and container-sealed in Kochi."*<br>**1 CTA Button:** `"Request a quote"` (scrolls to `#quote` / `/contact`). *(WhatsApp appears only in the sticky mobile bottom bar).* | None (0 numbers in hero) |
| **2** | **Spices (`SpiceShowcase.tsx`)** | **Cream `#F5EDE0` surface.**<br>• **Desktop:** Asymmetric 12-column split — left column lists the 8 spice names in oversized `Fraunces` display type (`01 Malabar Black Pepper` … `08 Whole Cloves`); hovering/focusing a name crossfades & scales (`transform: scale(1.04 -> 1)`, `opacity`) that spice's large portrait photo on the right.<br>• **Mobile:** Native horizontal CSS scroll-snap swipe row of equal-height photo cards (`aspect-[3/4]`) with spice name + link to `/products/[slug]`. | **Headline:** *"Eight whole harvests."*<br>**1 sentence (~14 words):** *"Grown across high-altitude estates in Idukki and Wayanad, graded for bulk export."*<br>**Items:** 8 product photos + names only (no HS codes, no spec pills, no grade jargon). | **8** whole spices |
| **3** | **Export Map — Signature (`ExportRouteMap.tsx`)** | **Deep Espresso `#150E0B` + subtle grain.**<br>• Replaces the coarse 6-polygon map with an **accurate dotted world map** pre-rendered at build time (via `world-atlas` / Natural Earth `110m` land geometry rasterized to a static `<svg>` dot grid in `scripts/generate-world-map.mjs` — **0 KB map library shipped to browser**).<br>• Realistic maritime sea lanes from **Kochi** across the Arabian Sea to **Jebel Ali**, and through the **Bab-el-Mandeb → Red Sea → Suez Canal → Mediterranean → Gibraltar** to **Felixstowe** and across the North Atlantic to **Newark**.<br>• Labels show **port names only** (`Kochi`, `Jebel Ali`, `Felixstowe`, `Newark`). No route cards below. | **Headline:** *"From Kochi to three continents."*<br>**1 sentence (~18 words):** *"Direct weekly sailings from Vallarpadam terminal along main maritime corridors to the Gulf, Britain and North America."* | None (port names only) |
| **4** | **Farm to Port (`FarmToPortSection.tsx`)** | **Pinned Horizontal Scroll (1 of max 2 pinned sections).**<br>• Desktop: Pinned `100vh` viewport scrubbing horizontally (`translateX`) across **4 full-bleed image panels** (`100vw` each).<br>• Mobile / Reduced Motion: Vertical stack of 4 full-bleed panels.<br>• Each panel features a full-bleed background photograph, dark editorial gradient, oversized `Fraunces` numeral (`01`–`04`), short title, and **one short line** of copy. | **Headline (Intro overlay / SR):** *"Four steps from hill to hull."*<br>• `01 Estate Harvest` — *"Hand-picked at peak volatile oil maturity in the Western Ghats."*<br>• `02 Optical Grading` — *"Gravity-separated and colour-sorted by density and size."*<br>• `03 Steam & Lab` — *"Steam-sterilised and screened lot by lot before release."*<br>• `04 Kochi Loading` — *"Sealed in moisture-locked liners at Vallarpadam port within 14 days†."* | **14 days†** |
| **5** | **Quality (`QualitySection.tsx`)** | **Warm Cream `#F5EDE0` asymmetric editorial spread — large imagery, no cards.**<br>• Left: Oversized full-height macro photograph (`step-lab.webp` + `facility-drying-yard.webp` offset overlap).<br>• Right: Headline, one concise sentence, and **three large typographic labels** separated by thin horizontal hairlines: **`Steam-sterilised`** · **`Lab-tested`** · **`Lot-traced`**. | **Headline:** *"Pure by process."*<br>**1 sentence (~17 words):** *"Every export lot is microbiologically cleared and archived with a traceable retention sample before container sealing."*<br>**3 Labels:** `Steam-sterilised` · `Lab-tested` · `Lot-traced` | **100%†** lot retention |
| **6** | **Quote Form (`#quote` / `RfqForm.tsx`)** | **Deep Espresso `#1E1410` + subtle grain.**<br>• Clean 2-column split: left side has headline + one sentence; right side has the **4-field visible form** (`Name`, `Business email`, `Country`, `Product and quantity`) + hidden honeypot + 3s timer.<br>• Short success state: *"Thank you. We will reply within 24 hours† with pricing and lead time."* | **Headline:** *"Request an export quote."*<br>**1 sentence (~15 words):** *"Tell us your destination port and volume; we respond within 24 hours†."* | **24 hours†** |

---

## 3. Inner Pages — Simplified to the Same Rules

All inner pages retain their routes (`/products`, `/products/[slug]`, `/quality`, `/about`, `/contact`) so navigation and SEO structure remain complete, but every page is stripped down to match the new visual-first rules:

1. **`/products` (Catalogue):**
   - One headline (*"Export collection."*), one sentence (~16 words), clean 2-column editorial photo grid of the 8 spices (large image + spice name + botanical subtitle). No filter dropdowns, no HS codes, no spec badges.
2. **`/products/[slug]` (8 Product Detail Pages):**
   - **Photo:** Large studio portrait (`aspect-[4/5]`) + secondary texture photo.
   - **One Headline:** Spice name (`Malabar Black Pepper`).
   - **One Paragraph:** Max ~35 words on origin and aroma profile.
   - **4-Row Table Only:**
     1. `Grade` (e.g., *Bold Whole Berry*)
     2. `Packaging` (e.g., *25 kg multi-wall kraft or jute bags†*)
     3. `MOQ` (e.g., *1,000 kg†*)
     4. `Lead time` (e.g., *14–18 days†*)
   - **One Button:** `"Request a quote"` (links to `/contact?product=...#rfq-form`).
3. **`/quality`:**
   - Editorial hero + large photography showcase built around the three pillars (`Steam-sterilised`, `Lab-tested`, `Lot-traced`), one sample COA download button, and the 3 required `"Sample certificate"` placeholders (kept minimal, zero technical parameter tables).
4. **`/about`:**
   - 3 visual sections (≤ 40 words each): Western Ghats origin photography, Kochi processing facility photography, and a quote CTA.
5. **`/contact`:**
   - Focused single-screen layout with the 4-field RFQ form (`Name`, `Business email`, `Country`, `Product and quantity`), fictional Kochi address (`Willingdon Island, Kochi [fictional]`), and short response promise.

---

## 4. Motion Plan Table

| Element | Trigger | Duration / Easing | Properties Animated | What It Communicates |
|---|---|---|---|---|
| **1. Hero H1 Line-by-Line Reveal (`HeroVideo.tsx`)** | Desktop after first paint (`requestAnimationFrame`); static visible HTML before JS & on `< 768px` | `0.65s power3.out`, `0.12s` stagger | `transform: translateY(100% -> 0)` inside overflow-hidden line masks, `opacity` | Editorial cinema title entrance without blocking mobile LCP. |
| **2. Spice Hover Photo Reveal (`SpiceShowcase.tsx`)** | Desktop `mouseenter` / `focus` on any of the 8 spice names | `0.45s cubic-bezier(0.22, 1, 0.36, 1)` | `transform: scale(1.05 -> 1)`, `opacity: 0 -> 1` | Tactile, lookbook-style interaction that lets the photography carry the section. |
| **3. Dotted World Map Sea-Lane Draw + Travelling Container Dot (`ExportRouteMap.tsx`)** *(Signature)* | `ScrollTrigger` (`start: 'top 65%'`, `end: 'bottom 45%'`, `scrub: 0.5`), gated by `IntersectionObserver` | Scrub-linked across the 3 maritime routes | `stroke-dashoffset` on the 3 sea-lane `<path>` elements + `transform: translate3d(x, y, 0)` on the 3 container `<circle>` dots along path coordinates | Shows realistic maritime shipping from Kochi through the Red Sea & Suez to Jebel Ali, Felixstowe, and Newark. |
| **4. Farm to Port Pinned Horizontal Filmstrip (`FarmToPortSection.tsx`)** | `ScrollTrigger` (`pin: true` on `>= 768px`, `scrub: 0.6`, travel `300vw`, **1 pinned section total on page**) | Scrub-linked across 4 full-bleed `100vw` panels | `transform: translateX(0 -> -300vw)` on the 4-panel track + subtle `transform: scale(1.06 -> 1)` on panel image | Immersive, high-ticket agency showcase of the 4-stage journey from hill estate to Kochi port. |
| **5. Sticky Mobile Bar (`StickyMobileCta.tsx`)** | `IntersectionObserver` on `#site-hero` (`!isIntersecting`) | `0.25s ease-out` | `transform: translateY(100% -> 0)` | Surfaces `"Request a quote"` + `"WhatsApp"` once the user scrolls past the hero on mobile. |

*`prefers-reduced-motion: reduce` fallback:* All lines, photos, map routes, and container dots render in their final state immediately; Farm to Port unpins and stacks cleanly.

---

## 5. Initial JS & Performance Budget Estimate

| Metric | Estimate | Budget (`AGENTS.md`) | How Guaranteed |
|---|---|---|---|
| **Initial JS (gzip)** | **~152 KB gzip** | `≤ 200 KB gzip` | Zero map runtime library (world map dots are pre-computed at build time into static SVG circles/path); GSAP + ScrollTrigger dynamically imported behind `IntersectionObserver`. |
| **Hero Media Total** | **66 KB** (mobile poster) / **1.07 MB** (desktop poster + WebM/MP4) | `≤ 5 MB` | Native `<img fetchPriority="high" decoding="sync">` poster first; `<video>` mounted only on `>= 768px` after first paint. |
| **Mobile Lighthouse Perf** | **90+ / 100** | `≥ 85` (aim `90+`) | Simpler DOM, fewer text nodes, zero above-the-fold JS animation on mobile. |
| **CLS** | **0.00** | `≤ 0.1` | Explicit aspect ratios and `100svh` / `100vw` dimensions on all media. |

---

Please confirm if you approve `docs/spices/uplift-plan.md` so I can build the uplift, run the independent reviewer (including mobile Lighthouse), redeploy `elakkaya-spices.vercel.app`, and refresh the gallery screenshots.
