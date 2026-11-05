/**
 * Pattern 7: SVG Route Draw
 *
 * Usage Note:
 * 1. Measure path length once on mount via `path.getTotalLength()`; never inside the scroll loop.
 * 2. Scrub `strokeDashoffset` from `totalLength` to `0` while keeping vector path data static.
 * 3. Never recalculate coordinates or call `setAttribute` on raw scroll (causes continuous CPU spikes).
 * 4. Pair with decorative background grid patterns for an authentic maritime chart feel.
 * 5. On `prefers-reduced-motion`, set `strokeDashoffset = 0` immediately to reveal the whole route.
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSvgRouteDraw(
  containerRef: React.RefObject<HTMLDivElement | null>,
  pathRef: React.RefObject<SVGPathElement | null>
) {
  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    if (!container || !path) return;

    const totalLength = path.getTotalLength();
    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      path.style.strokeDashoffset = '0';
      return;
    }

    const st = gsap.fromTo(
      path,
      { strokeDashoffset: totalLength },
      {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 70%',
          end: 'bottom 20%',
          scrub: 0.4,
        },
      }
    );

    return () => {
      st.kill();
    };
  }, [containerRef, pathRef]);
}
