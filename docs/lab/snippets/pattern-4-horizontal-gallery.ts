/**
 * Pattern 4: Horizontal Gallery
 *
 * Usage Note:
 * 1. Desktop: Calculate `x: () => -(track.scrollWidth - window.innerWidth)` dynamically.
 * 2. Set `invalidateOnRefresh: true` so window resize automatically recalculates translation bounds.
 * 3. Mobile (< 768px): Use `gsap.matchMedia` to skip pinning entirely and use native CSS scroll-snap.
 * 4. Never hardcode pixel end values (e.g. `x: -2400`) which break responsive viewports.
 * 5. Wrap cards with `shrink-0 snap-center` for fluid touch swipe gestures.
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useHorizontalGallery(
  containerRef: React.RefObject<HTMLDivElement | null>,
  trackRef: React.RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const mm = gsap.matchMedia();

    // Desktop: Pin & dynamic horizontal translate
    mm.add('(min-width: 768px)', () => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 96),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 96}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    });

    // Mobile: Native horizontal swipe with zero pinning
    mm.add('(max-width: 767px)', () => {
      // Free native touch scroll
    });

    return () => {
      mm.revert();
    };
  }, [containerRef, trackRef]);
}
