# Review 1 — Scroll Lab & Cross-Demo Video Audit

**Date:** 2026-11-06  
**Auditor:** `reviewer` subagent (Independent QA)  
**Scope:** `lab/`, `spices/`, `castings/`, `textiles/`  

---

### Audit Findings

| Severity | Location | Issue | Status |
|---|---|---|---|
| **blocker** | Supabase Project (`supabase/migrations/0002_seed_textiles_products.sql`) | Textiles products not seeded in Supabase database; public pages use static fallback, but admin editing requires DB rows. | Requires user execution of SQL seed in Supabase Dashboard. |
| **blocker** | Vercel Environment Variables (`textiles`) | Missing `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` on Vercel deployment project settings. | Requires user addition of env vars in Vercel project settings. |
| **major** | `textiles/components/Act1AtelierStage.tsx` | Mobile LCP penalty when video mounted and static image opacity changed to 0. | **FIXED.** Kept high-priority static image at `opacity-100` as permanent background; mobile keeps poster only (zero data waste); desktop mounts ambient loop at `opacity-85` with pointer-events-none. |
| **minor** | `spices/components/HeroVideo.tsx` | Mobile screens downloaded 720p scrub video instead of 480p mobile encode. | **FIXED.** Added mobile breakpoint check to serve `cardamom-split-480p.mp4` (680 KB, GOP 8) on screens `< 768px`. |
| **minor** | `spices/components/StickyMobileCta.tsx` | Hardcoded company string in WhatsApp CTA link. | **FIXED.** Replaced with `${COMPANY.name}` interpolation from `@/lib/products`. |
| **minor** | `textiles/app/[lang]/opengraph-image.tsx` | Next.js build warning regarding root `metadataBase`. | **VERIFIED.** Resolved in localized metadata generation. |

---

### Video Implementation Summary Across All 4 Projects

1. **Scroll Lab (`lab/`):**
   - **Pattern 1:** Cardamom pod split scrub over 400vh track. Desktop: `pod-720-g8.mp4` (3.5 MB, GOP 8). Mobile: `pod-480-g8.mp4` (680 KB, GOP 8). Seek queue with `onseeked` listener and 200ms watchdog recovery.
   - **Pattern 2:** 96 WebP frames canvas sequence with 10-frame eager chunk + background lazy-load.
   - **Pattern 3:** Pinned 4-step story master timeline crossfading step photography.
   - **Pattern 4:** Horizontal cultivar gallery with dynamic translation bounds.
   - **Pattern 5:** Line mask reveal + 20%→100% word opacity scrub.
   - **Pattern 6:** Zoom-through card scale via CSS `animation-timeline: view()` and GSAP fallback.
   - **Pattern 7:** SVG Maritime route vector draw from Kochi to Felixstowe.

2. **Spices (`spices/`):**
   - **Hero:** Pinned 400vh scrub video of green cardamom pod cracking and floating seeds. Dual encodes (`cardamom-split-720p.webm` 1.8 MB + `cardamom-split-720p.mp4` 3.6 MB on desktop; `cardamom-split-480p.mp4` 680 KB on mobile). Reduced-motion static fallback.
   - **Signature Route Map:** Animated SVG sea lanes from Kochi to Jebel Ali, Felixstowe, and Newark with arrival locking and transit duration tags.

3. **Castings (`castings/`):**
   - **Hero:** Molten induction furnace ladle crane video loop (`foundry-hero-desktop.webm` 1.78 MB, `foundry-hero-desktop.mp4` 1.65 MB, mobile `foundry-hero-mobile.mp4` 673 KB). LCP poster `foundry-hero-poster.webp`.
   - **Process Stage 04:** Live CNC cutting & welding sparks video (`cnc-sparks.mp4` 2.37 MB) on desktop.

4. **Textiles (`textiles/`):**
   - **Hero (Act 1):** Sunlit bedroom linen video loop (`hero-bedroom-desktop.webm` 275 KB, `hero-bedroom-desktop.mp4` 688 KB). Desktop-only fade-in over static high-priority LCP image `hero-macro-to-room.webp`. Mobile screens display crisp poster only per AGENTS.md performance budget.
   - **Act 4 Retail Readiness:** Live Karur industrial weaving loom video loop (`loom-weaving.mp4` 471 KB) with sample certification compliance badges.
