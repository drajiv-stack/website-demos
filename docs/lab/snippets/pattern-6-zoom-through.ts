/**
 * Pattern 6: Zoom-Through Reveal
 *
 * Usage Note:
 * 1. Animate `transform: scale()` on the GPU; never animate `width`, `height`, `top`, or `left`.
 * 2. Use native CSS Scroll-Driven Animation (`animation-timeline: view()`) inside `@supports`.
 * 3. Provide a lightweight GSAP `transform` scale fallback for Firefox/Safari.
 * 4. Animating layout geometry causes synchronous document reflows (> 50 reflows/sec).
 * 5. Set `transform-origin: center center` to prevent unexpected pivot shifts during zoom.
 */

/* CSS Implementation */
/*
@keyframes card-zoom-grow {
  from { transform: scale(0.65); opacity: 0.5; }
  to { transform: scale(1); opacity: 1; }
}

@supports (animation-timeline: view()) {
  .css-scroll-zoom {
    animation: card-zoom-grow linear both;
    animation-timeline: view();
    animation-range: entry 10% cover 80%;
  }
}
*/

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useZoomThroughFallback(
  containerRef: React.RefObject<HTMLDivElement | null>,
  cardRef: React.RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const supportsCss = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline', 'view()');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (supportsCss || prefersReduced) return;

    const st = gsap.fromTo(
      card,
      { scale: 0.65, opacity: 0.5 },
      {
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.4,
        },
      }
    );

    return () => {
      st.kill();
    };
  }, [containerRef, cardRef]);
}
