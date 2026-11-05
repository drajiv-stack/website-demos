'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLab } from '@/context/LabContext';
import { LAB_PATTERNS } from '@/lib/lab-data';
import { PatternWrapper } from './PatternWrapper';
import { ReadoutBadge } from '@/components/hud/ReadoutBadge';

const STEPS = [
  {
    id: 1,
    title: 'High-Altitude Shaded Vine',
    detail: 'Cultivated under native Western Ghats canopy at 1,100 m elevation with high humidity.',
    image: '/media/steps/step-01-vine.webp',
  },
  {
    id: 2,
    title: 'Controlled Solar Drying Yard',
    detail: 'Husk moisture reduced from 80% to 10% in Kerala drying sheds under regulated temperature.',
    image: '/media/steps/step-02-drying.webp',
  },
  {
    id: 3,
    title: 'Optical Diameter Sorting',
    detail: 'Triple mechanical sieving isolates 8 mm+ bold green pods from smaller whole grades.',
    image: '/media/steps/step-03-sorting.webp',
  },
  {
    id: 4,
    title: 'Hermetic Jute Export Pack',
    detail: 'Vacuum poly-lined food-grade jute packaging sealed for containerized sea shipment.',
    image: '/media/steps/step-04-packed.webp',
  },
];

export function P3PinnedStory() {
  const config = LAB_PATTERNS[2];
  const { isPatternBroken, showMarkers, simulateReducedMotion, setActiveSectionId, setActiveSectionProgress } = useLab();
  const isBroken = isPatternBroken(config.id);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Readouts state
  const [activeStepIndex, setActiveStepIndex] = useState<number>(1);
  const [timelineProgress, setTimelineProgress] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    let isMounted = true;
    let ctx: { revert: () => void } | undefined;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!isMounted) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          if (isBroken) {
            // BROKEN: Multiple independent ScrollTriggers attached to child tweens
            // Nested inside a non-synchronized parent, causing pin collisions and desync
            const stepCards = gsap.utils.toArray<HTMLElement>('[data-step-card]');
            stepCards.forEach((card, idx) => {
              ScrollTrigger.create({
                trigger: card,
                start: 'top 60%',
                end: 'bottom 40%',
                markers: showMarkers,
                onEnter: () => setActiveStepIndex(idx + 1),
                onEnterBack: () => setActiveStepIndex(idx + 1),
              });
            });

            // Stage pinned independently causing stutter
            ScrollTrigger.create({
              trigger: stage,
              pin: true,
              start: 'top top',
              end: '+=200%',
              markers: showMarkers,
              onUpdate: (self) => {
                setTimelineProgress(self.progress);
                setActiveSectionId('P3: Pinned Story');
                setActiveSectionProgress(self.progress);
              },
            });
          } else {
            // CORRECT: Single synchronized GSAP Timeline with one pin
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: container,
                pin: stage,
                start: 'top top',
                end: '+=300%',
                scrub: 0.5,
                markers: showMarkers,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  const p = self.progress;
                  setTimelineProgress(p);
                  setActiveSectionId('P3: Pinned Story');
                  setActiveSectionProgress(p);

                  // Update active step cleanly
                  const currentIdx = Math.min(STEPS.length, Math.floor(p * STEPS.length) + 1);
                  setActiveStepIndex(currentIdx);
                },
              },
            });

            const slides = gsap.utils.toArray<HTMLElement>('[data-story-slide]');
            const texts = gsap.utils.toArray<HTMLElement>('[data-story-text]');

            slides.forEach((slide, idx) => {
              if (idx > 0) {
                tl.fromTo(
                  slide,
                  { opacity: 0, scale: 1.05 },
                  { opacity: 1, scale: 1, duration: 1, ease: 'power2.inOut' },
                  `step-${idx}`
                );
                tl.fromTo(
                  texts[idx],
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
                  `step-${idx}`
                );
                if (idx > 1) {
                  tl.to(
                    slides[idx - 1],
                    { opacity: 0, duration: 0.6 },
                    `step-${idx}`
                  );
                  tl.to(
                    texts[idx - 1],
                    { opacity: 0, y: -20, duration: 0.6 },
                    `step-${idx}`
                  );
                }
              }
            });
          }
        }, container);
      }
    );

    return () => {
      isMounted = false;
      ctx?.revert();
    };
  }, [isBroken, showMarkers, simulateReducedMotion, setActiveSectionId, setActiveSectionProgress]);

  return (
    <PatternWrapper
      config={config}
      readouts={
        <>
          <ReadoutBadge
            label="Active Step"
            value={`${activeStepIndex} / 4`}
            variant="turmeric"
          />
          <ReadoutBadge
            label="Timeline Progress"
            value={`${(timelineProgress * 100).toFixed(0)}%`}
            variant={isBroken ? 'red' : 'stone'}
          />
        </>
      }
    >
      <div ref={containerRef} className="relative h-[350vh] w-full bg-[#1A1714]">
        <div
          ref={stageRef}
          className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden"
        >
          {/* Active Mode Banner */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-xs border border-[#332E29] bg-[#161412]/90 px-3 py-1.5 font-mono text-xs">
            <span className={`h-2 w-2 rounded-full ${isBroken ? 'bg-red-500' : 'bg-[#D9911A]'}`} />
            <span className="font-semibold text-[#F5EDE0]">
              {isBroken ? config.brokenBadge : config.correctBadge}
            </span>
          </div>

          <div className="grid h-full w-full grid-cols-1 items-center gap-8 px-6 lg:grid-cols-12 lg:px-12">
            {/* Left 6-Col: Step Text Stack */}
            <div className="relative z-10 lg:col-span-5">
              {STEPS.map((step, idx) => (
                <div
                  key={step.id}
                  data-story-text
                  data-step-card
                  className={`transition-all duration-300 ${
                    idx + 1 === activeStepIndex ? 'block' : 'hidden lg:block'
                  }`}
                  style={{
                    opacity: idx + 1 === activeStepIndex ? 1 : 0.2,
                  }}
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D9911A]">
                    PHASE 0{step.id}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-normal text-[#F5EDE0] sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#C9BFB5]">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Right 7-Col: Pinned Photo Crossfade Stack */}
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-sm border border-[#332E29] bg-[#161412] shadow-xl lg:col-span-7">
              {STEPS.map((step, idx) => (
                <div
                  key={step.id}
                  data-story-slide
                  className="absolute inset-0 h-full w-full transition-opacity duration-300"
                  style={{
                    opacity: idx + 1 === activeStepIndex ? 1 : 0,
                    zIndex: idx + 1 === activeStepIndex ? 2 : 1,
                  }}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1714]/80 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PatternWrapper>
  );
}
