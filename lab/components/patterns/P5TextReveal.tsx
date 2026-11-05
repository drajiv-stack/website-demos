'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLab } from '@/context/LabContext';
import { LAB_PATTERNS } from '@/lib/lab-data';
import { PatternWrapper } from './PatternWrapper';
import { ReadoutBadge } from '@/components/hud/ReadoutBadge';

const SAMPLE_TEXT =
  'From the misty rainforest slopes of the Western Ghats, ancient green cardamom pods are selectively hand-harvested at peak maturity, dried under indirect solar heat, and graded by precise diameter.';

export function P5TextReveal() {
  const config = LAB_PATTERNS[4];
  const { isPatternBroken, showMarkers, simulateReducedMotion, setActiveSectionId, setActiveSectionProgress } = useLab();
  const isBroken = isPatternBroken(config.id);

  const containerRef = useRef<HTMLDivElement>(null);
  const headlineMaskRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  // Readouts state
  const [splitNodeCount, setSplitNodeCount] = useState<number>(24);
  const [activeWordsCount, setActiveWordsCount] = useState<number>(0);

  const words = SAMPLE_TEXT.split(' ');
  const characters = SAMPLE_TEXT.split('');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isBroken) {
      setSplitNodeCount(characters.length); // ~180 individual spans
    } else {
      setSplitNodeCount(words.length); // ~24 words
    }

    let isMounted = true;
    let ctx: { revert: () => void } | undefined;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!isMounted) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          if (isBroken) {
            // BROKEN: Scrubbing 180+ individual character spans across 2,000px
            const charNodes = gsap.utils.toArray<HTMLElement>('[data-char-node]');
            gsap.fromTo(
              charNodes,
              { opacity: 0.1, rotateX: 90, y: 15 },
              {
                opacity: 1,
                rotateX: 0,
                y: 0,
                stagger: 0.05,
                ease: 'none',
                scrollTrigger: {
                  trigger: container,
                  start: 'top 70%',
                  end: '+=2000',
                  scrub: 0.5,
                  markers: showMarkers,
                  onUpdate: (self) => {
                    setActiveSectionId('P5: Text Reveal');
                    setActiveSectionProgress(self.progress);
                    setActiveWordsCount(Math.round(self.progress * words.length));
                  },
                },
              }
            );
          } else {
            // CORRECT:
            // (a) Headline: Masked line rise from overflow hidden
            if (headlineMaskRef.current) {
              gsap.fromTo(
                headlineMaskRef.current.querySelectorAll('.line-inner'),
                { y: '100%' },
                {
                  y: '0%',
                  duration: 0.8,
                  stagger: 0.15,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: headlineMaskRef.current,
                    start: 'top 85%',
                    markers: showMarkers,
                  },
                }
              );
            }

            // (b) Paragraph: Words scrubbed from 20% to 100% opacity
            const wordNodes = gsap.utils.toArray<HTMLElement>('[data-word-node]');
            gsap.fromTo(
              wordNodes,
              { opacity: 0.2 },
              {
                opacity: 1,
                stagger: 0.1,
                ease: 'none',
                scrollTrigger: {
                  trigger: container,
                  start: 'top 60%',
                  end: 'bottom 40%',
                  scrub: 0.4,
                  markers: showMarkers,
                  onUpdate: (self) => {
                    setActiveSectionId('P5: Text Reveal');
                    setActiveSectionProgress(self.progress);
                    setActiveWordsCount(Math.round(self.progress * words.length));
                  },
                },
              }
            );
          }
        }, container);
      }
    );

    return () => {
      isMounted = false;
      ctx?.revert();
    };
  }, [isBroken, showMarkers, simulateReducedMotion, setActiveSectionId, setActiveSectionProgress, words.length, characters.length]);

  return (
    <PatternWrapper
      config={config}
      readouts={
        <>
          <ReadoutBadge
            label="Split Node Count"
            value={splitNodeCount}
            variant={isBroken ? 'red' : 'turmeric'}
          />
          <ReadoutBadge
            label="Revealed Words"
            value={`${activeWordsCount} / ${words.length}`}
            variant="stone"
          />
        </>
      }
    >
      <div
        ref={containerRef}
        className={`relative flex flex-col justify-center px-6 py-24 sm:px-16 ${
          isBroken ? 'min-h-[2200px]' : 'min-h-[80vh]'
        }`}
      >
        {/* Active Mode Banner */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-xs border border-[#332E29] bg-[#161412]/90 px-3 py-1.5 font-mono text-xs w-fit">
          <span className={`h-2 w-2 rounded-full ${isBroken ? 'bg-red-500' : 'bg-[#D9911A]'}`} />
          <span className="font-semibold text-[#F5EDE0]">
            {isBroken ? config.brokenBadge : config.correctBadge}
          </span>
        </div>

        {/* Headline Line-Masked Container */}
        <h3
          ref={headlineMaskRef}
          className="font-display text-3xl sm:text-5xl font-normal leading-[1.15] text-[#F5EDE0]"
        >
          <span className="block overflow-hidden">
            <span className="line-inner block">Preserving Botanical Essence</span>
          </span>
          <span className="block overflow-hidden">
            <span className="line-inner block italic text-[#D9911A]">Through Measured Solar Desiccation</span>
          </span>
        </h3>

        {/* Paragraph: Word Scrolled Scrub (Correct) vs 200+ Character Blast (Broken) */}
        <div className="mt-8 max-w-3xl">
          {/* Accessible screen reader announcement so unrevealed opacity words don't cause a11y contrast failure */}
          <p className="sr-only">{SAMPLE_TEXT}</p>

          {isBroken ? (
            /* Broken Mode: individual characters split over 2000px */
            <p aria-hidden="true" className="font-sans text-xl leading-relaxed text-[#C9BFB5] flex flex-wrap">
              {characters.map((ch, idx) => (
                <span
                  key={idx}
                  data-char-node
                  className="inline-block transform-gpu"
                  style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
                >
                  {ch}
                </span>
              ))}
            </p>
          ) : (
            /* Correct Mode: clean words scrubbed from 20% to 100% opacity */
            <p
              ref={paragraphRef}
              aria-hidden="true"
              className="font-sans text-xl sm:text-2xl leading-relaxed text-[#C9BFB5]"
            >
              {words.map((word, idx) => (
                <span
                  key={idx}
                  data-word-node
                  className="inline-block mr-2 transition-opacity duration-75"
                >
                  {word}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </PatternWrapper>
  );
}
