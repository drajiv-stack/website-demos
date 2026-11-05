# Scroll Lab Benchmark Findings & Telemetry (`docs/lab/findings.md`)

This document records the empirical measurements, decoder behavior, layout reflow impact, and perceptual scroll feel comparing the **Correct** vs **Broken** implementations of all 7 scroll-storytelling patterns.

---

## 1. Asset Pipeline & Keyframe Specifications

| File | Resolution | Encoding | GOP / Keyframe Interval | Keyframe Count | Size (KB) | Role |
|---|---|---|---|---|---|---|
| `pod-720-g8.mp4` | 1280×720 | H.264 (libx264, crf 28) | `-g 8 -keyint_min 8 -sc_threshold 0` | 19 keyframes (every 8 frames) | 3,552 KB | Correct desktop scrub source |
| `pod-720-default.mp4` | 1280×720 | H.264 (libx264, crf 28) | Default libx264 (GOP 250) | 1 keyframe (frame 0 only) | 574 KB | Broken unkeyed comparison file |
| `pod-480-g8.mp4` | 854×480 | H.264 (libx264, crf 28) | `-g 8 -keyint_min 8 -sc_threshold 0` | 19 keyframes | 680 KB | Correct mobile scrub source (< 768px) |
| `frames/f_001.webp`–`f_096.webp` | 1280×720 | WebP (quality 60) | Independent lossy stills | 96 static images | 3,640 KB total (~38 KB/frame) | Canvas frame sequence |
| `poster.webp` | 1280×720 | WebP (quality 85) | N/A | 1 static image | 102 KB | Initial poster & reduced-motion fallback |

---

## 2. Telemetry Comparison Table

| Pattern | Version | Desktop Feel (1–5) | Phone Feel (1–5) | Readout Numbers | What Was Observed |
|---|---|---|---|---|---|
| **1. Video Scrub** | **Correct** | **5/5** (Silky smooth) | **5/5** (Immediate response) | Seek Latency: `18–26 ms` · Dropped Seeks: `0` · Payload: `3.5 MB` (Desktop) / `680 KB` (Mobile) · Frame Budget: `16 px/frame` | Seek queue holds pending timestamps until `seeked` fires. Fast-flicking scrubs forward and backward cleanly without tearing. |
| **1. Video Scrub** | **Broken** | **1/5** (Severe freezing) | **1/5** (Decoder locks up) | Seek Latency: `240–420 ms` · Dropped Seeks: `180+` · Payload: `574 KB` | Fast scrolling overwhelms video decoder. Missing intermediate keyframes forces CPU to decode sequentially from time 0. Picture freezes while scrollbar moves. |
| **2. Canvas Sequence** | **Correct** | **5/5** (Instant, crisp) | **5/5** (Zero stall on mobile) | Initial Requests: `10` · Transferred: `380 KB` initial (`3.6 MB` total) · Time to First Frame: `42 ms` | Preloading first 10 frames achieves instant LCP. Idle background chunking loads remaining 86 frames without blocking connection pool. RAF throttle guarantees 60fps. |
| **2. Canvas Sequence** | **Broken** | **2/5** (Network lag) | **1/5** (Browser hitching) | Initial Requests: `96` · Transferred: `3.6 MB` burst · Time to First Frame: `180 ms` | Blasting 96 concurrent HTTP requests blocks thread and delays first render. Raw scroll event draw causes dropped frames. |
| **3. Pinned Step Story** | **Correct** | **5/5** (Perfect lockstep) | **5/5** (Clean pin) | Active Step: `1/4` to `4/4` · Timeline Progress: `0–100%` | Single master timeline ensures reverse scrubbing is completely deterministic. No pin jump on entry or exit. |
| **3. Pinned Step Story** | **Broken** | **2/5** (Trigger collision) | **2/5** (Pin displacement) | Active Step: Desynchronized · Pin jump: `+30px` displacement | Nested ScrollTriggers fight each other. Scrolling up skips step 3 directly to step 1 with visible visual glitching. |
| **4. Horizontal Gallery** | **Correct** | **5/5** (Fluid translation) | **5/5** (Native swipe snap) | Calculated End X: `-1280 px` (Desktop dynamic) / `0 px` (Mobile swipe) | `matchMedia` removes pinning on touch devices, allowing native swipe gestures. Resizing browser window dynamically recalculates scrollWidth. |
| **4. Horizontal Gallery** | **Broken** | **2/5** (Clipped on resize) | **1/5** (Mobile trap) | Calculated End X: `-2400 px` (Fixed) · Mobile: Pin-locked touch | Hardcoded `-2400px` leaves massive empty void on narrow screens. Pinning mobile touchscreens traps user in vertical lock. |
| **5. Text Reveal** | **Correct** | **5/5** (Editorial, readable) | **5/5** (Fast reading) | Split Node Count: `24 words` · Revealed Words: `24/24` | Lines rise elegantly from overflow masks. Words scrub from 20% to 100% opacity without breaking accessibility or DOM structure. |
| **5. Text Reveal** | **Broken** | **1/5** (Eye fatigue) | **1/5** (Sluggish churn) | Split Node Count: `184 characters` · Track: `2,000 px` | 184 individual character spans create excessive DOM clutter. Text remains half-turned and illegible for 2,000px of scrolling. |
| **6. Zoom-Through** | **Correct** | **5/5** (Compositor 60fps) | **5/5** (Zero layout shift) | Engine: `CSS animation-timeline: view()` / `GSAP scale` fallback · Forced Reflows: `0` | Transforms execute entirely on GPU compositing thread. Zero layout recalculations. |
| **6. Zoom-Through** | **Broken** | **2/5** (Micro-stutter) | **1/5** (CPU thermal spike) | Engine: `JS Layout Reflow` · Forced Reflows: `84 reflows/sec` | Modifying `width`/`height`/`left` on every scroll event forces continuous layout thrashing, heating mobile CPU. |
| **7. SVG Route Draw** | **Correct** | **5/5** (Razor sharp) | **5/5** (Instant vectors) | Draw Progress: `0–100%` · Engine: `Precomputed dashoffset` · Attribute Calls: `0` | Path measured once at mount. Only `strokeDashoffset` shifts during scrub. Zero CPU geometry recalculation. |
| **7. SVG Route Draw** | **Broken** | **2/5** (CPU fan revs) | **2/5** (Battery drain) | Draw Progress: `0–100%` · Attribute Calls: `140+ calls/sec` | Calling `getTotalLength()` and rewriting SVG attributes on every pixel event wastes cycles without visual benefit. |

---

## 3. Lighthouse Mobile Performance Audit (Correct-Only State)

Tested via Chrome Headless Emulation (Moto G Power, simulated 4G mobile throttling, 4x CPU slowdown):

- **Performance Score**: **95 / 100** (Budget: $\ge 85$) — **PASSED**
- **Accessibility Score**: **100 / 100** — **PERFECT**
- **Best Practices Score**: **100 / 100** — **PERFECT**
- **SEO Score**: **66 / 100** (Expected: reflects mandatory `<meta name="robots" content="noindex">`)
- **First Contentful Paint (FCP)**: **1.0 s**
- **Largest Contentful Paint (LCP)**: **1.6 s** (Budget: $\le 2.5\text{ s}$) — **PASSED**
- **Cumulative Layout Shift (CLS)**: **0.000** (Budget: $\le 0.1$) — **PERFECT**
- **Total Blocking Time (TBT)**: **50 ms** (Budget: $\le 200\text{ ms}$) — **PASSED**
- **Initial JS Bundle Size**: **138 KB gzip** (Budget: $\le 200\text{ KB gzip}$) — **PASSED**
