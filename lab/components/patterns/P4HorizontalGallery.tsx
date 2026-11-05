'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLab } from '@/context/LabContext';
import { LAB_PATTERNS } from '@/lib/lab-data';
import { PatternWrapper } from './PatternWrapper';
import { ReadoutBadge } from '@/components/hud/ReadoutBadge';

const CULTIVARS = [
  {
    code: 'AGEB',
    name: 'Alleppey Green Extra Bold',
    spec: '8.0 mm+ Diameter · Min 435 g/L bulk density',
    origin: 'Idukki Western Ghats, Kerala',
    notes: 'Premium commercial export standard with deep chlorophyll retention.',
    image: '/media/steps/step-03-sorting.webp',
  },
  {
    code: 'AGB',
    name: 'Alleppey Green Bold',
    spec: '7.5 mm+ Diameter · Min 415 g/L bulk density',
    origin: 'Vandanmedu Plateaus',
    notes: 'Uniform longitudinal ribs with intact aromatic seed cavities.',
    image: '/media/steps/step-01-vine.webp',
  },
  {
    code: 'AGS',
    name: 'Alleppey Green Superior',
    spec: '7.0 mm+ Diameter · Min 385 g/L bulk density',
    origin: 'Nedumkandam Slopes',
    notes: 'Rich essential cineole and terpinyl acetate profile for extraction.',
    image: '/media/steps/step-02-drying.webp',
  },
  {
    code: 'AGSPL',
    name: 'Split Husk Selection',
    spec: 'Natural Dehiscence · High Volatile Oil',
    origin: 'Kumily Spice Valleys',
    notes: 'Hand-separated dehiscent pods ready for whole gourmet distillation.',
    image: '/media/steps/step-04-packed.webp',
  },
];

export function P4HorizontalGallery() {
  const config = LAB_PATTERNS[3];
  const { isPatternBroken, showMarkers, simulateReducedMotion, setActiveSectionId, setActiveSectionProgress } = useLab();
  const isBroken = isPatternBroken(config.id);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Readouts state
  const [activePanelIndex, setActivePanelIndex] = useState<number>(1);
  const [endDistancePx, setEndDistancePx] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let isMounted = true;
    let ctx: { revert: () => void } | undefined;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!isMounted) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const mm = gsap.matchMedia();

          if (isBroken) {
            // BROKEN: Fixed hardcoded pixel value (e.g. -2400px) + pin on mobile
            // Breaks responsive resizing and traps mobile touch scrolling
            const hardcodedDistance = -2400;
            setEndDistancePx(hardcodedDistance);

            gsap.to(track, {
              x: hardcodedDistance,
              ease: 'none',
              scrollTrigger: {
                trigger: container,
                pin: true,
                start: 'top top',
                end: '+=2500',
                scrub: 0.5,
                markers: showMarkers,
                onUpdate: (self) => {
                  setActiveSectionId('P4: Horizontal Gallery');
                  setActiveSectionProgress(self.progress);
                  const idx = Math.min(CULTIVARS.length, Math.floor(self.progress * CULTIVARS.length) + 1);
                  setActivePanelIndex(idx);
                },
              },
            });
          } else {
            // CORRECT: Desktop matchMedia with function-based dynamic end value + invalidateOnRefresh
            // Mobile uses native CSS swipe with scroll snap, no pinning!
            mm.add('(min-width: 768px)', () => {
              const calculateDistance = () => -(track.scrollWidth - window.innerWidth + 96);
              setEndDistancePx(calculateDistance());

              gsap.to(track, {
                x: calculateDistance,
                ease: 'none',
                scrollTrigger: {
                  trigger: container,
                  pin: true,
                  start: 'top top',
                  end: () => `+=${track.scrollWidth - window.innerWidth + 96}`,
                  scrub: 0.5,
                  markers: showMarkers,
                  invalidateOnRefresh: true,
                  onUpdate: (self) => {
                    setActiveSectionId('P4: Horizontal Gallery');
                    setActiveSectionProgress(self.progress);
                    const idx = Math.min(CULTIVARS.length, Math.floor(self.progress * CULTIVARS.length) + 1);
                    setActivePanelIndex(idx);
                  },
                },
              });
            });

            mm.add('(max-width: 767px)', () => {
              // Mobile: native swipe scroll snap, zero GSAP pin
              setEndDistancePx(0);
              ScrollTrigger.create({
                trigger: container,
                start: 'top center',
                end: 'bottom center',
                onUpdate: (self) => {
                  setActiveSectionId('P4: Horizontal Gallery');
                  setActiveSectionProgress(self.progress);
                },
              });
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
            label="Active Panel"
            value={`${activePanelIndex} / 4`}
            variant="turmeric"
          />
          <ReadoutBadge
            label="Calculated End X"
            value={endDistancePx}
            unit="px"
            variant={isBroken ? 'red' : 'stone'}
          />
        </>
      }
    >
      <div
        ref={containerRef}
        className={`relative w-full bg-[#1A1714] ${
          isBroken ? 'h-[300vh]' : 'md:h-[300vh] h-auto'
        }`}
      >
        <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">
          {/* Active Mode Banner */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-xs border border-[#332E29] bg-[#161412]/90 px-3 py-1.5 font-mono text-xs">
            <span className={`h-2 w-2 rounded-full ${isBroken ? 'bg-red-500' : 'bg-[#D9911A]'}`} />
            <span className="font-semibold text-[#F5EDE0]">
              {isBroken ? config.brokenBadge : config.correctBadge}
            </span>
          </div>

          {/* Cards Track Container */}
          <div
            ref={trackRef}
            className={`flex items-center gap-8 px-6 sm:px-12 ${
              !isBroken ? 'max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:py-8' : ''
            }`}
          >
            {CULTIVARS.map((item, idx) => (
              <div
                key={item.code}
                className="w-[85vw] max-w-[420px] shrink-0 snap-center rounded-sm border border-[#332E29] bg-[#221F1B] p-6 shadow-xl"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-xs border border-[#332E29]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="420px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 rounded-xs bg-[#161412]/90 px-2.5 py-1 font-mono text-[11px] font-bold text-[#D9911A]">
                    {item.code}
                  </div>
                </div>

                <div className="mt-5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#8C827A]">
                    {item.origin}
                  </span>
                  <h3 className="mt-1 font-display text-xl text-[#F5EDE0]">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs font-mono text-[#D9911A]">
                    {item.spec}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#C9BFB5]">
                    {item.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PatternWrapper>
  );
}
