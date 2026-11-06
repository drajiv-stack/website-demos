# Build log

| Demo | Stage | Start (date time) | Finish (date time) | Hours | Notes |
|-|-|-|-|-|-|
| spices | plan | 2026-11-03 11:18 | 2026-11-03 12:11 | 0.9 | Plan written; approved with name "Elakkaya Spice Exports" |
| spices | build | 2026-11-03 12:12 | 2026-11-03 12:43 | 0.5 | Next.js 16 SSG (19/19 static routes), 28 assets built & credited |
| spices | review + fixes | 2026-11-03 12:43 | 2026-11-03 13:17 | 0.6 | 3 passes: Perf 88, A11y 100, BP 100, CLS 0.00, TBT 40ms, JS 155.7 KB gzip |
| spices | uplift plan | 2026-11-03 14:29 | 2026-11-03 14:32 | 0.1 | Visual uplift & simplification plan (`docs/spices/uplift-plan.md`) |
| spices | uplift build + review | 2026-11-03 14:31 | 2026-11-03 14:46 | 0.3 | Visual uplift built & reviewed: Perf 85, A11y 100, BP 100, CLS 0.00, JS 165.3 KB gzip |
| castings | plan | 2026-11-03 13:24 | 2026-11-03 15:36 | 0.4 | Plan approved with name "Kinesis Cast & Machine Works" + Content Diet + 21st.dev aesthetic |
| castings | build | 2026-11-03 15:37 | 2026-11-03 15:53 | 0.3 | Next.js 16 SSG (18/18 static routes), 23 WebP images + 9 PDFs built & credited |
| castings | review + fixes | 2026-11-03 15:53 | 2026-11-03 16:08 | 0.25 | 2 passes: Perf 86-94, A11y 100, BP 100, LCP 2.5s, CLS 0.00, TBT 50ms, JS 129.2 KB gzip |
| castings | motion & video uplift | 2026-11-04 17:45 | 2026-11-04 18:16 | 0.5 | Added molten furnace hero video, rising ember particles, rotating CAD HUD reticle, pinned X-Ray CAD zoom inspector with laser scan beam, asymmetric Bento matrix with scroll parallax, and live CNC cutting sparks video (Mobile Perf 95) |
| textiles | plan | 2026-11-03 16:13 | 2026-11-04 20:03 | 0.4 | 5-Act Interactive Showroom & Live Swatch-Book Assembler plan approved for "NoolWeave Exports" |
| textiles | build | 2026-11-04 20:03 | 2026-11-05 00:25 | 0.8 | Next.js 16 SSG (38/38 static routes), 5-Act Showroom, continuous indigo thread, 28 WebP assets + 4 videos encoded |
| textiles | review + fixes | 2026-11-05 00:25 | 2026-11-05 01:10 | 0.7 | 2 review passes: Perf 97, A11y 96+, BP 96+, CLS 0.00, LCP 1.7s, TBT 80ms, JS 129.4 KB gzip; Vercel deployment live |
| all-demos | fix-pass plan | 2026-11-05 07:13 | 2026-11-05 07:28 | 0.25 | Plan written for imagery overhaul, cardamom scrub hero, datum inspector rebuild, textiles de-clutter, UX spacing & content diet; approved |
| all-demos | fix-pass build & reviews | 2026-11-05 07:28 | | | |

Target: under 4-5 hours of your own time per demo for the $150 Basic package to be profitable.
| lab | Prompt B (Build Scroll Lab) | 2026-11-05 09:18 | 2026-11-05 09:18 | 0.5h | Complete build of 7 dual-mode patterns + Lab HUD |
| lab | Troubleshooting & Fix Pass | 2026-11-05 10:35 | 2026-11-05 17:22 | 0.5h | Fixed CSS sticky breaking bug (`overflow-x: clip`, removed wrapper `overflow-hidden`), fixed P1 seek queue deadlock, removed P3 React state vs GSAP conflicts, fixed P4 translate bounds, disabled Vercel SSO deployment protection for public access. Production redeployed and verified. |
| all-demos | Video Integration & Cross-Demo QA Review | 2026-11-06 11:00 | 2026-11-06 11:21 | 0.35h | Full QA audit via reviewer subagent across lab, spices, castings, and textiles. Integrated hero bedroom video loop in textiles, mobile 480p scrub video in spices, and resolved mobile LCP image opacity bug. |
