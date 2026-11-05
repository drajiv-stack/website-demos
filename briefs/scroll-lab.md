# Brief — Scroll Lab (folder: `lab/`)

Status: APPROVED. Internal learning demo. Same repo (`website-demos`), its own Vercel project (Root Directory = `lab`), `noindex`.

## Purpose
Learn the scroll-storytelling patterns by building each one **twice: the right way and the common broken way**, side by side, with measurements.
The output is not a pretty site. It is (1) a working reference of every pattern and (2) `docs/lab/findings.md`, which becomes the `scroll-storytelling` skill.

## One subject for every pattern
A single **green cardamom pod** (ties to the Elakkaya demo; the best asset becomes its hero).
- Page background: **#1A1714** (charcoal). The video background must match it exactly.
- Fonts: Fraunces (display) + Manrope (UI). Accent: turmeric #D9911A.
- Copy: one headline + max 25 words per section, plus a collapsible "How it works" (3 bullets).

---

## Step 0 — Assets (done by user, not the agent; about 1 hour)

### 0.1 Base image (Google AI Studio, Gemini image model; set aspect ratio to 16:9 in settings panel)
```
Studio macro product photograph. A single fresh green cardamom pod lying horizontally, centred, filling about 80 percent of the frame width. Fine ridges and seam clearly visible, slight natural sheen. Seamless matte charcoal background, colour #1A1714, no texture, no horizon. Soft large key light from upper left, gentle fill from right, faint contact shadow. Razor sharp focus, neutral colour, no text, no props.
```
Save as `plate.png`.

### 0.2 Video (Veo image-to-video, cheapest tier, 8 s, 16:9, upload plate.png as starting image)
```
From the very first frame the cardamom pod begins to split open along its seam. The two husk halves part slowly and stay in frame. The small dark brown seeds lift out and float apart, each keeping its shape, spreading evenly and hanging suspended in mid-air. By the final frame the open husk sits in the centre with the seeds widely spaced around it. The camera holds steady with a very slow push-in. The background stays seamless matte charcoal and the lighting does not change.
```
Save as `pod.mp4`.

### 0.3 Encode
- `pod-720-g8.mp4`: 720p, keyframe every 8 frames, no audio (`-g 8 -keyint_min 8 -sc_threshold 0`)
- `pod-720-default.mp4`: same, default keyframes (usually 1)
- `pod-480-g8.mp4`: 480p, keyframe every 8 frames
- `frames/f_%03d.webp`: 96 WebP frames (12 fps)
- `poster.webp`: first frame
All in `lab/public/media/`.

---

## Step 1 — The app

Next.js + Tailwind + GSAP (ScrollTrigger, SplitText) + Lenis (optional toggle). One long page, one section per pattern, plus a Lab HUD.

### Lab HUD (fixed, bottom-right, collapsible on mobile)
Shows live: page scroll %, current section, section progress 0–1, FPS, engine in use (CSS / GSAP / JS), reduced-motion state.
Toggles: **Markers** (ScrollTrigger markers on/off) · **Smooth scroll** (Lenis on/off, desktop only) · **Simulate reduced motion** · **Break it** (global: switch every pattern to its broken version).

### Each pattern section contains
1. The live demo.
2. A per-section **Correct / Broken** switch (overrides the global toggle).
3. A collapsible "How it works" (3 bullets) and "Why the broken one fails" (1–2 bullets).
4. A small readout of the pattern's own numbers.

---

## The 7 patterns

| # | Pattern | Correct version | Broken version (the common mistake) | Readout |
|-|-|-|-|-|
| 1 | **Scroll-scrubbed video** | 400vh track, sticky 100svh stage, `pod-720-g8.mp4` (mobile: `pod-480-g8.mp4`), store target time and apply it on `seeked` (seek queue), rAF gate, passive listener, `muted playsinline`, poster | Sets `currentTime` directly on every scroll event and uses `pod-720-default.mp4` | Median seek time (ms), dropped seeks count, file KB |
| 2 | **Canvas image sequence** | Same clip as 96 WebP frames on canvas; preload first 10, lazy-load the rest; one draw per animation frame; devicePixelRatio-aware | Draws on every scroll event and loads all frames up front | Total KB, requests, time to first frame (ms) |
| 3 | **Pinned step story** | Sticky stage, 4 steps (vine → drying → sorting → packed); text swaps, images crossfade; built with GSAP pin + one timeline | Separate ScrollTriggers on tweens nested inside one timeline | Step index, progress |
| 4 | **Horizontal gallery** | Desktop: GSAP pin + x translate with function-based end value and `invalidateOnRefresh`. Mobile (via `gsap.matchMedia`): native horizontal swipe with scroll-snap, no pin | Hard-coded end value; resize the window to see it break | Panel index, end distance (px) |
| 5 | **Text reveal** | (a) SplitText lines rise from a mask on enter; (b) a paragraph where words go from 20% to 100% opacity as you scroll (scrub); `aria` handled by SplitText | Splits into characters and animates each one with scrub over 2,000 px (sluggish, illegible mid-way) | Split count |
| 6 | **Zoom-through reveal** | A card image scales to full-bleed. Uses CSS scroll-driven animation (`animation-timeline: view()`) inside `@supports`; GSAP fallback for browsers without support (Firefox) | Animates `width/height/top/left` instead of `transform` (layout thrash) | Engine in use (CSS/GSAP) |
| 7 | **SVG route draw** | Kochi → Jebel Ali → Suez → Felixstowe line drawn with stroke-dashoffset on scroll; CSS scroll-driven with GSAP fallback | Line drawn with JS that recalculates path length on every scroll event | Engine in use, draw % |

Also show, below pattern 1: a **frame budget note** computed live: `track scroll height ÷ frame count = px per frame` (target 10–20 px).
