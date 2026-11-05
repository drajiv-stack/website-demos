/**
 * Pattern 3: Pinned Step Story
 *
 * Usage Note:
 * 1. Build multistage storytelling using a single GSAP master timeline and one pin.
 * 2. Never attach individual ScrollTriggers to nested child tweens (causes pin jitter).
 * 3. Use labeled timeline positions (e.g. `tl.to(..., 'step-2')`) for rock-solid scrub timing.
 * 4. Crossfade between slides using `opacity` and subtle `scale` (e.g. 1.05 -> 1.0) on the GPU.
 * 5. Call `ScrollTrigger.refresh()` after media load to calibrate trigger heights.
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function usePinnedStepStory(
  containerRef: React.RefObject<HTMLDivElement | null>,
  stageRef: React.RefObject<HTMLDivElement | null>,
  slidesSelector: string,
  textsSelector: string
) {
  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const slides = gsap.utils.toArray<HTMLElement>(slidesSelector);
    const texts = gsap.utils.toArray<HTMLElement>(textsSelector);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: stage,
        start: 'top top',
        end: '+=300%',
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });

    slides.forEach((slide, idx) => {
      if (idx > 0) {
        tl.fromTo(slide, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1 }, `step-${idx}`);
        tl.fromTo(texts[idx], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, `step-${idx}`);
        if (idx > 1) {
          tl.to(slides[idx - 1], { opacity: 0, duration: 0.6 }, `step-${idx}`);
          tl.to(texts[idx - 1], { opacity: 0, y: -20, duration: 0.6 }, `step-${idx}`);
        }
      }
    });

    return () => {
      tl.kill();
    };
  }, [containerRef, stageRef, slidesSelector, textsSelector]);
}
