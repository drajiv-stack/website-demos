# Brief — Demo 2: Precision castings & machined components (folder: `castings/`)

Status: APPROVED. Stage 0 complete. Fiverr mapping: **Standard package** plus spec-sheet downloads.

## Company (fictional)
- Rajkot-based investment-casting and CNC-machining unit: valve bodies, pump impellers, flanges, brackets, automotive and agricultural parts. Materials: SS 304/316, carbon steel, ductile iron, aluminium.
- **Name:** propose 3 invented names in the plan. Do not use until approved.
- Markets: Germany, USA. Buyers: OEM procurement and sourcing engineers, distributors. They read drawings, tolerances and material grades before they read marketing copy.

## Goal and conversion
- Goal: a sourcing engineer in Stuttgart sees the capability, tolerances and inspection process, and sends an RFQ.
- Conversion action: RFQ form. Product + quantity placeholder: "e.g. SS316 valve body, 2,000 pcs/yr, drawing available".
- Under the form: "Drawings: after we reply, we send a secure upload link." (No file upload in this demo.)
- Secondary: spec-sheet PDF downloads per product.

## Tone (3 adjectives)
Precise · engineered · no-nonsense.

## Look
- Type: **Archivo** (use the width axis for expanded headings) + **IBM Plex Mono** for specs, tolerances and labels.
- Palette: graphite `#14171A`, steel `#8A949C`, paper `#ECEEF0`; ONE accent molten orange `#FF5A1F`.
- Imagery: machined metal macro shots, foundry glow, CMM inspection, clean product shots on neutral backgrounds.
- Engineering-drawing details: thin hairlines, dimension arrows, grid backgrounds used sparingly.

## Signature moment (the "wow")
**"Drawing to part" inspector.** A hero product image with SVG dimension lines and callouts that draw in on scroll (stroke animation), as if a technical drawing is being overlaid on the real part. Callouts show material grade, tolerance (e.g. ±0.05 mm, "sample figure"), surface finish (Ra) and weight. Hover/tap on a callout highlights the region.
Supporting moment: "Process line" — a horizontal, scroll-linked sequence (Pattern → Shell → Pour → Machine → Inspect → Pack) with a progress bar. Counts toward the 2-pinned limit.
3D (React Three Fiber) is allowed only if a free CC0 model of a flange or impeller is found and it beats the SVG version. Otherwise skip it.

## Pages (6)
1. **Home** — hero (H1 on capability, quote CTA) · drawing-to-part inspector · capability numbers (weight range, tolerances, annual capacity; "sample") · process line · industries served · RFQ band.
2. **Capabilities** — investment casting, sand casting, CNC machining, heat treatment, surface finishing; each with a capability table.
3. **Products** — filterable catalogue: material, process, weight range, industry.
4. **Product detail** (template, 8 products) — specs table in mono type: material grade (ASTM/EN/DIN equivalents), weight, dimensions, tolerance, surface finish, MOQ, lead time, HS code, Incoterms (FOB Mundra, CIF Hamburg), packaging. "Download spec sheet (PDF)" generated from the same data.
5. **Quality & inspection** — CMM, spectro analysis, radiography, PPAP/FAI capability, sample certificate placeholders, inspection report sample (marked sample).
6. **Contact / RFQ** — form, response promise, plant address "[fictional]".

## Product list (8)
SS316 valve body · Pump impeller · Weld-neck flange · Ductile iron bracket · Aluminium housing · Tractor linkage part · Marine fitting · Machined shaft coupling. HS codes at 4-digit level (7325, 7326, 8481, 8413, 7307, 8483).

## Data
Products as static TypeScript/JSON. Spec-sheet PDFs generated at build time from the same data (no runtime PDF library in the client bundle). RFQ → Supabase `rfq_submissions` (site = `castings`).

## Out of scope
Prices, file upload, login, blog.
