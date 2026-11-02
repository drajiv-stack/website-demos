# Brief — Demo 1: Spice exporter (folder: `spices/`)

Status: APPROVED. Stage 0 complete. Fiverr mapping: **Standard package** (6 pages).

## Company (fictional)
- Kerala-based whole and ground spice exporter, sourcing from smallholder farms in Idukki and Wayanad. Steam-sterilised, lab-tested lots.
- **Name:** propose 3 invented names in the plan. Do not use until approved (the owner checks them against real companies first).
- Markets: UAE, UK, USA. Buyers: importers, wholesalers, private-label packers, food manufacturers.

## Goal and conversion
- Goal: a procurement manager in Dubai trusts this supplier within 30 seconds and asks for a quote.
- Conversion action: RFQ form. Product + quantity field placeholder: "e.g. Black pepper 500 GA, 10 MT, 25 kg PP bags".
- Secondary: WhatsApp button.

## Tone (3 adjectives)
Warm · traceable · confident.

## Look
- Type: **Fraunces** (display, use its soft optical sizes) + **Manrope** (body/UI).
- Palette: espresso `#1E1410`, cream `#F5EDE0`, sand `#D8C7AE`; ONE accent turmeric `#D9911A` (CTAs and highlights only).
- Imagery: close-up spice textures, drying yards, hands sorting, sacks at port. Warm grade, real photography or AI-generated that looks photographic.

## Signature moment (the "wow")
**Animated export-route map.** A minimal SVG map: Kochi port draws animated route lines (stroke-dashoffset, scroll-triggered) to Jebel Ali, Felixstowe and New York/Newark, each ending in a label with typical transit time (marked "sample figure").
Supporting moment: full-bleed hero video (slow-motion spices, ≤ 4 MB, poster first) with headline over the poster.
Optional second: pinned 4-step "Farm → Port" story (Sourcing → Cleaning & sorting → Lab testing → Packing & dispatch), images crossfade, step counter. Counts toward the 2-pinned-sections limit.

## Pages (6)
1. **Home** — hero (video, H1, quote CTA) · proof strip (markets served, lot traceability, lab testing; all "sample") · featured products (4) · export-route map · Farm → Port · quality teaser · RFQ band.
2. **Products** — catalogue grid with category filter (Whole, Ground, Seeds, Blends).
3. **Product detail** (template, 8 products) — gallery, specs table: grade, moisture %, volatile oil %, origin, MOQ, packaging options, HS code, lead time, Incoterms (FOB Kochi, CIF), port of loading. "Request a quote for this product" pre-fills the form.
4. **Quality & lab testing** — process, test parameters (moisture, aflatoxin, pesticide residue, Salmonella), sample certificate placeholders, sample COA download (clearly marked sample PDF).
5. **About & sourcing** — origin story, farm regions map, facility photos.
6. **Contact / RFQ** — form, response promise, office address "[fictional]", WhatsApp.

## Product list (8)
Black pepper (Malabar Garbled, 500 GA, 550 GA) · Cardamom (green, 7–8 mm) · Turmeric fingers & powder · Cloves · Nutmeg & mace · Cinnamon (cassia) · Dry ginger · Chilli (Teja, Byadgi). HS codes: 0904, 0908, 0910, 0906, 0907 (state at 4-digit level).

## Data
Products as static TypeScript/JSON in the app (no DB reads). RFQ → Supabase `rfq_submissions` (site = `spices`).

## Out of scope
Blog, e-commerce, prices, login.
