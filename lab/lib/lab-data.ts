export interface PatternConfig {
  id: string;
  number: number;
  title: string;
  headline: string;
  copy: string;
  correctBadge: string;
  brokenBadge: string;
  howItWorks: string[];
  whyBrokenFails: string[];
}

export const LAB_PATTERNS: PatternConfig[] = [
  {
    id: 'p1',
    number: 1,
    title: 'Scroll-Scrubbed Video',
    headline: 'Cardamom Pod Natural Dehiscence',
    copy: 'A single green cardamom pod unseals along its longitudinal seam, parting its husks to disperse dark brown volatile oil-rich seeds into air.',
    correctBadge: 'Correct: Seek Queue + GOP 8',
    brokenBadge: 'Broken: Raw Scroll Assignment + GOP 1',
    howItWorks: [
      'Encodes video with keyframe interval -g 8 so decoders seek within ~260ms without whole-file rewinds.',
      'Implements a requestAnimationFrame seek queue listening for onseeked before updating video.currentTime.',
      'Sticky 100svh viewport pinned across 400vh scroll track yields an optimal 15–20px per frame budget.',
    ],
    whyBrokenFails: [
      'Sets video.currentTime directly on every scroll event, flooding the browser decode pipeline with 100+ seeks/sec.',
      'Default GOP has only 1 keyframe, forcing the CPU/GPU to decode every frame sequentially from time 0 upon fast scroll.',
    ],
  },
  {
    id: 'p2',
    number: 2,
    title: 'Canvas Image Sequence',
    headline: 'Multi-Frame Canvas Extraction',
    copy: 'High-density HTML5 Canvas rendering replaces video decoding, projecting 96 individual WebP photographic frames of pod split geometry.',
    correctBadge: 'Correct: 10-Frame Initial Preload + Lazy Rest',
    brokenBadge: 'Broken: 96-Image Simultaneous Burst',
    howItWorks: [
      'Preloads only first 10 frames for instant initial paint, loading remaining 86 frames progressively in idle background chunks.',
      'Canvas draw executes strictly inside requestAnimationFrame synchronized with devicePixelRatio scaling.',
      'Guarantees zero dropped seeks or video decoder stalls on low-end Android mobile chipsets.',
    ],
    whyBrokenFails: [
      'Fires 96 simultaneous Image() HTTP network requests on mount, completely saturating browser connection pools.',
      'Executes ctx.drawImage directly on raw scroll events without RAF gating, causing severe canvas paint stutter.',
    ],
  },
  {
    id: 'p3',
    number: 3,
    title: 'Pinned Step Story',
    headline: 'Seed to Export Procession',
    copy: 'Four agricultural phases unfold across a single pinned stage: shaded mountain vine, solar drying yard, optical size grading, and breathable jute packing.',
    correctBadge: 'Correct: Single Synchronized GSAP Timeline',
    brokenBadge: 'Broken: Independent Nested ScrollTriggers',
    howItWorks: [
      'Pins the 100svh stage once over a 300vh scroll span using a single master GSAP timeline.',
      'All 4 step transitions are sequenced via relative time offsets, ensuring rock-solid bidirectional scrubbing.',
      'ScrollTrigger.refresh() registers layout bounds in clean document order with zero pin jump.',
    ],
    whyBrokenFails: [
      'Attaches independent ScrollTriggers to nested sub-tweens inside the timeline, causing competing trigger collisions.',
      'Reverse scrolling desynchronizes text from imagery and produces jarring pin displacement jumps.',
    ],
  },
  {
    id: 'p4',
    number: 4,
    title: 'Horizontal Gallery',
    headline: 'Regional Cardamom Cultivars',
    copy: 'Inspect Alleppey Green Extra Bold, Mysore Grade 1, and Cardamom Malabar varieties through responsive viewport-adapted horizontal progression.',
    correctBadge: 'Correct: matchMedia + Function End-Value',
    brokenBadge: 'Broken: Hardcoded px End + Mobile Pin',
    howItWorks: [
      'Desktop computes x: () => -(scrollWidth - innerWidth) dynamically with invalidateOnRefresh: true.',
      'Mobile viewports (< 768px) bypass GSAP pinning entirely using native CSS scroll-snap (overflow-x: auto).',
      'Browser resizes immediately recalculate translation bounds without truncation or overflow gaps.',
    ],
    whyBrokenFails: [
      'Uses fixed hardcoded translation (e.g. x: -2400px), clipping content on narrow screens and leaving void space on ultrawides.',
      'Forces pinning on mobile touchscreens, intercepting natural vertical flick gestures and trapping users.',
    ],
  },
  {
    id: 'p5',
    number: 5,
    title: 'Text Reveal',
    headline: 'Masked Line & Word Typography',
    copy: 'Observe editorial headlines rise from subtle line masks on viewport entry, followed by progressive word opacity scrub that retains full accessibility.',
    correctBadge: 'Correct: Masked Lines + Word Opacity Scrub',
    brokenBadge: 'Broken: 200+ Character Split Scrub Over 2000px',
    howItWorks: [
      'Headlines wrap in line-height overflow-hidden containers and translate from translateY(100%) on entry.',
      'Paragraph scrubs word opacity from 0.2 to 1.0 while preserving underlying text nodes and ARIA flow.',
      'Keeps DOM node count minimal (4 lines, 22 words) with zero layout reflow overhead.',
    ],
    whyBrokenFails: [
      'Splits entire paragraph into 200+ individual <span> characters, inflating the DOM and destroying screen-reader flow.',
      'Scrubs individual character 3D rotations over a bloated 2,000px track, rendering the text illegible for seconds.',
    ],
  },
  {
    id: 'p6',
    number: 6,
    title: 'Zoom-Through Reveal',
    headline: 'Macro to Full-Bleed Scaling',
    copy: 'A centered macro card expands smoothly to full viewport bleed, utilizing modern CSS scroll-driven animation with robust GSAP transform fallback.',
    correctBadge: 'Correct: CSS view() + Transform Fallback',
    brokenBadge: 'Broken: Reflowing Width / Height / Offsets',
    howItWorks: [
      'Uses CSS animation-timeline: view() with transform: scale() inside @supports for zero-JS 60fps compositor thread zooming.',
      'Gracefully falls back to GSAP transform on browsers without scroll-driven animation support (Firefox/Safari).',
      'Transforms execute entirely on GPU compositing layers without triggering document layout or paint passes.',
    ],
    whyBrokenFails: [
      'Animates layout geometry (width, height, left, margin) on every scroll frame.',
      'Triggers synchronous document reflow and layout thrashing (50+ forced reflows/second), tanking framerates.',
    ],
  },
  {
    id: 'p7',
    number: 7,
    title: 'SVG Route Draw',
    headline: 'Maritime Spice Route Coordinates',
    copy: 'The spice clipper voyage from Kochi through Jebel Ali to Felixstowe traces along maritime vector waypoints using optimized stroke-dashoffset progression.',
    correctBadge: 'Correct: Precomputed Dashoffset Scrub',
    brokenBadge: 'Broken: Continuous Path Length Recalculation',
    howItWorks: [
      'Measures path length once on mount or build, applying strokeDasharray and scrubbed strokeDashoffset.',
      'Vector coordinates stay completely static in memory; only CSS dashoffset updates along the scroll vector.',
      'Integrates seamlessly with prefers-reduced-motion to display the complete route instantly.',
    ],
    whyBrokenFails: [
      'Calls path.getTotalLength() and recreates SVG path coordinate strings repeatedly inside raw scroll listener.',
      'Forces constant CPU path recalculation (120+ calls/second) and continuous SVG DOM attribute invalidation.',
    ],
  },
];
