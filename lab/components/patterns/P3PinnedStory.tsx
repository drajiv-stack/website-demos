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
          const slides = gsap.utils.toArray<HTMLElement>('.story-slide');
          const texts = gsap.utils.toArray<HTMLElement>('.story-text');

          if (isBroken) {
            // BROKEN: Separate ScrollTriggers on nested tweens inside one timeline
            // Causes stutter, desync between text and image, and pin collisions
            const tl = gsap.timeline();

            slides.forEach((slide, idx) => {
              // Anti-pattern: scrollTrigger placed on nested child tween
              tl.to(slide, {
                opacity: 1,
                scrollTrigger: {
                  trigger: container,
                  start: `top+=${idx * 400} top`,
                  end: `top+=${(idx + 1) * 400} top`,
                  scrub: true,
                  markers: showMarkers,
                  onEnter: () => setActiveStepIndex(idx + 1),
                  onEnterBack: () => setActiveStepIndex(idx + 1),
                  onUpdate: (self) => {
                    setTimelineProgress(self.progress);
                    setActiveSectionProgress(self.progress);
                  },
                },
              });
            });

            // Independent pin on stage
            ScrollTrigger.create({
              trigger: stage,
              pin: true,
              start: 'top top',
              end: '+=1600',
              markers: showMarkers,
              onEnter: () => setActiveSectionId('P3: Pinned Story'),
              onEnterBack: () => setActiveSectionId('P3: Pinned Story'),
            });
          } else {
            // CORRECT: Single master timeline with one ScrollTrigger pin
            // Initialize initial states
            gsap.set(slides, { opacity: 0, scale: 1.05 });
            gsap.set(texts, { opacity: 0, y: 30 });
            gsap.set(slides[0], { opacity: 1, scale: 1 });
            gsap.set(texts[0], { opacity: 1, y: 0 });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: container,
                pin: stage,
                start: 'top top',
                end: '+=300%',
                scrub: 0.5,
                markers: showMarkers,
                invalidateOnRefresh: true,
                onEnter: () => setActiveSectionId('P3: Pinned Story'),
                onEnterBack: () => setActiveSectionId('P3: Pinned Story'),
                onUpdate: (self) => {
                  const p = self.progress;
                  setTimelineProgress(p);
                  setActiveSectionProgress(p);

                  const currentIdx = Math.min(STEPS.length, Math.floor(p * STEPS.length) + 1);
                  setActiveStepIndex(currentIdx);
                },
              },
            });

            // Sequence steps 1 -> 2 -> 3 -> 4
            for (let i = 1; i < STEPS.length; i++) {
              tl.to(slides[i - 1], { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.inOut' }, `step-${i}`)
                .to(texts[i - 1], { opacity: 0, y: -25, duration: 0.5, ease: 'power2.in' }, `step-${i}`)
                .to(slides[i], { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, `step-${i}+=0.2`)
                .to(texts[i], { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, `step-${i}+=0.3`);
            }
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
      <div ref={containerRef} className="relative h-[300vh] w-full bg-[#1A1714]">
        <div
          ref={stageRef}
          className="flex h-[100svh] w-full items-center justify-center p-4 sm:p-6 lg:p-8"
        >
          <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-sm border border-[#332E29] bg-[#161412] p-6 sm:p-10 shadow-2xl flex items-center">
            {/* Active Mode Banner */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-xs border border-[#332E29] bg-[#161412]/90 px-3 py-1.5 font-mono text-xs backdrop-blur-xs">
              <span className={`h-2 w-2 rounded-full ${isBroken ? 'bg-red-500' : 'bg-[#D9911A]'}`} />
              <span className="font-semibold text-[#F5EDE0]">
                {isBroken ? config.brokenBadge : config.correctBadge}
              </span>
            </div>

            <div className="grid h-full w-full grid-cols-1 items-center gap-8 lg:grid-cols-12 pt-6">
              {/* Left 5-Col: Step Text Stack */}
              <div className="relative z-10 lg:col-span-5 h-[200px] flex items-center">
                {STEPS.map((step, idx) => (
                  <div
                    key={step.id}
                    className="story-text absolute inset-x-0"
                  >
                    <div className="inline-flex items-center gap-2 font-mono text-xs text-[#D9911A]">
                      <span>STAGE 0{step.id}</span>
                      <span>/</span>
                      <span>04</span>
                    </div>
                    <h3 className="mt-2 font-display text-2xl sm:text-3xl font-normal text-[#F5EDE0] leading-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#C9BFB5]">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right 7-Col: Photo Crossfade Stack */}
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-xs border border-[#332E29] bg-[#161412] shadow-xl lg:col-span-7 h-full max-h-[360px]">
                {STEPS.map((step) => (
                  <div
                    key={step.id}
                    className="story-slide absolute inset-0 h-full w-full"
                  >
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1714]/70 via-transparent to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PatternWrapper>
  );
}
