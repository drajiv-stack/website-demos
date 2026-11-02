# Brief — Demo 3: Home textiles mill (folder: `textiles/`)

Status: APPROVED. Stage 0 complete. Fiverr mapping: **Premium package** (10 pages, 2 languages, admin panel). This demo must prove the admin panel promise in the gig and FAQ.

## Company (fictional)
- Karur/Panipat-style home-textiles mill: bed linen, towels, kitchen linen, cushion covers, throws. Cotton, linen, recycled cotton blends. Private label and custom colourways.
- **Name:** propose 3 invented names in the plan. Do not use until approved.
- Markets: Germany, Netherlands, Australia. Buyers: home-goods retail buyers, private-label brands, importers.

## Goal and conversion
- Goal: a retail buyer in Hamburg browses collections in German, sees colourways and compliance, and requests samples/quote.
- Conversion action: RFQ form. Product + quantity placeholder: "e.g. Percale duvet set, 3 colourways, 1,500 sets".
- Secondary: "Request a sample swatch book" (same form, prefilled message).

## Tone (3 adjectives)
Tactile · calm · considered.

## Look
- Type: **Newsreader** (display/editorial) + **Hanken Grotesk** (body/UI).
- Palette: linen `#F4F1EA`, ink `#1F2430`, stone `#B9B2A5`; ONE accent indigo `#2E3A8C`.
- Imagery: macro fabric weaves, folded stacks, styled bedrooms with soft daylight, looms. Lots of white space.

## Signature moment (the "wow")
**Colourway switcher with macro texture.** On collection and product pages, swatches switch the product image with a smooth crossfade. Hero is a macro fabric close-up that slowly scales and reveals the styled room on scroll (transform only).
Supporting: EN/DE language toggle that preserves the current page.

## Pages (10 per language, EN + DE)
1. **Home** — macro-to-room hero, quote CTA · collections · colourway switcher showcase · compliance strip (sample) · private-label band · RFQ band.
2. **Collections** — Bed, Bath, Kitchen, Living.
3. **Product detail** (template, 10 products from Supabase) — colourway switcher, specs: fibre, weave, thread count/GSM, sizes (EU/AU), MOQ per colourway, packaging, HS code, lead time, Incoterms (FOB Chennai/Tuticorin, CIF Rotterdam).
4. **Private label & custom** — process from swatch to shipment, MOQ logic, labelling and packaging options.
5. **Sustainability & compliance** — fibre sourcing, testing, sample certificate placeholders (no real GOTS/OEKO-TEX logos).
6. **About & mill** — looms, capacity ("sample figure"), team.
7. **Contact / RFQ.**
8. **Admin: login** (Supabase Auth, email + password).
9. **Admin: products list** — search, published toggle.
10. **Admin: product edit** — EN + DE name and description, specs (key/value editor), MOQ, HS code, lead time, Incoterms, image upload to the `product-images` bucket, colourways.

## Data
- Public pages read published products from Supabase `products` (site = `textiles`) at build time with on-demand revalidation when an admin saves (`revalidatePath`). Public pages must stay static and fast.
- Seed 10 products via a seed script or SQL insert (no real brands).
- Admin access: only users in the `admins` table (RLS enforces this; UI checks are not enough).
- RFQ → `rfq_submissions` (site = `textiles`).
- Admin routes are excluded from the sitemap and protected by middleware.

## Demo video (for Fiverr gallery)
After ship, record a 30–60 s browser recording: log in → edit a product's DE description and add a colourway image → save → public page updates → submit an RFQ. No real personal data on screen.

## Out of scope
Prices, cart, customer accounts, blog.
