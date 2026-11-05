/**
 * Pattern 5: Text Reveal
 *
 * Usage Note:
 * 1. Headlines: Wrap lines in overflow-hidden containers and translate lines from `y: 100%`.
 * 2. Paragraphs: Scrub opacity from 0.2 to 1.0 across words, never individual characters.
 * 3. Never split into 200+ characters or scrub over 2,000px (illegible mid-way).
 * 4. Maintain screen reader semantic hierarchy and accessible DOM reading flow.
 * 5. Provides instant 100% opacity and `y: 0` when `prefers-reduced-motion` is active.
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useTextReveal(
  containerRef: React.RefObject<HTMLDivElement | null>,
  headlineRef: React.RefObject<HTMLElement | null>,
  wordsSelector: string
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Headline Line Mask
    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current.querySelectorAll('.line-inner'),
        { y: '100%' },
        {
          y: '0%',
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    // Word Opacity Scrub
    const words = gsap.utils.toArray<HTMLElement>(wordsSelector);
    gsap.fromTo(
      words,
      { opacity: 0.2 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 65%',
          end: 'bottom 35%',
          scrub: 0.4,
        },
      }
    );
  }, [containerRef, headlineRef, wordsSelector]);
}
