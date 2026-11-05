'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLab } from '@/context/LabContext';
import { LAB_PATTERNS } from '@/lib/lab-data';
import { PatternWrapper } from './PatternWrapper';
import { ReadoutBadge } from '@/components/hud/ReadoutBadge';

export function P6ZoomThrough() {
  const config = LAB_PATTERNS[5];
  const { isPatternBroken, showMarkers, simulateReducedMotion, setActiveSectionId, setActiveSectionProgress } = useLab();
  const isBroken = isPatternBroken(config.id);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Readouts state
  const [engineInUse, setEngineInUse] = useState<string>('Detecting...');
  const [reflowCount, setReflowCount] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const supportsCssView = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline', 'view()');

    if (isBroken) {
      setEngineInUse('JS Layout Reflow');
      setReflowCount(0);
    } else {
      setEngineInUse(supportsCssView ? 'CSS animation-timeline: view()' : 'GSAP Transform Fallback');
      setReflowCount(0);
    }

    let isMounted = true;
    let ctx: { revert: () => void } | undefined;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!isMounted) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          if (isBroken) {
            // BROKEN: Animate layout geometry directly (width, height) forcing reflows
            ScrollTrigger.create({
              trigger: container,
              start: 'top top',
              end: 'bottom bottom',
              markers: showMarkers,
              onEnter: () => setActiveSectionId('P6: Zoom-Through'),
              onEnterBack: () => setActiveSectionId('P6: Zoom-Through'),
              onUpdate: (self) => {
                const p = self.progress;
                setActiveSectionProgress(p);

                const baseWidth = 320;
                const targetWidth = Math.min(container.clientWidth * 0.9, 960);
                const currentWidth = baseWidth + (targetWidth - baseWidth) * p;

                card.style.width = `${currentWidth}px`;
                card.style.height = `${currentWidth * 0.5625}px`;

                // Forced synchronous reflow read
                const forced = card.offsetWidth;
                if (forced > 0) {
                  setReflowCount((prev) => prev + 1);
                }
              },
            });
          } else {
            // CORRECT: CSS Scroll-Driven or GSAP Transform Fallback
            if (!supportsCssView || simulateReducedMotion) {
              gsap.fromTo(
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
                    scrub: true,
                    markers: showMarkers,
                    onEnter: () => setActiveSectionId('P6: Zoom-Through'),
                    onEnterBack: () => setActiveSectionId('P6: Zoom-Through'),
                    onUpdate: (self) => {
                      setActiveSectionProgress(self.progress);
                    },
                  },
                }
              );
            } else {
              // Section tracker for HUD when pure CSS animation is handling visual zoom
              ScrollTrigger.create({
                trigger: container,
                start: 'top 80%',
                end: 'bottom 20%',
                onEnter: () => setActiveSectionId('P6: Zoom-Through'),
                onEnterBack: () => setActiveSectionId('P6: Zoom-Through'),
                onUpdate: (self) => {
                  setActiveSectionProgress(self.progress);
                },
              });
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
            label="Engine"
            value={engineInUse}
            variant={isBroken ? 'red' : 'turmeric'}
          />
          {isBroken && (
            <ReadoutBadge
              label="Forced Reflows"
              value={reflowCount}
              variant="red"
            />
          )}
        </>
      }
    >
      <div
        ref={containerRef}
        className="relative flex min-h-[120vh] w-full items-center justify-center overflow-hidden rounded-sm border border-[#332E29] bg-[#161412] py-20"
      >
        {/* Active Mode Banner */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-xs border border-[#332E29] bg-[#161412]/90 px-3 py-1.5 font-mono text-xs backdrop-blur-xs">
          <span className={`h-2 w-2 rounded-full ${isBroken ? 'bg-red-500' : 'bg-[#D9911A]'}`} />
          <span className="font-semibold text-[#F5EDE0]">
            {isBroken ? config.brokenBadge : config.correctBadge}
          </span>
        </div>

        {/* Zoom Card */}
        <div
          ref={cardRef}
          className={`relative aspect-video w-[85vw] max-w-[960px] overflow-hidden rounded-sm border border-[#332E29] bg-[#161412] shadow-2xl ${
            !isBroken && !simulateReducedMotion ? 'css-scroll-zoom' : isBroken ? 'layout-thrash-active' : ''
          }`}
          style={
            isBroken
              ? { width: '320px', height: '180px' }
              : { transformOrigin: 'center center' }
          }
        >
          <Image
            src="/media/poster.webp"
            alt="Cardamom pod macro card zooming to full bleed"
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1714]/90 via-transparent to-transparent flex items-end p-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#D9911A]">
                MACRO FOCUS
              </span>
              <h3 className="font-display text-2xl text-[#F5EDE0]">
                Botanical Cross-Section at Full Bleed
              </h3>
            </div>
          </div>
        </div>
      </div>
    </PatternWrapper>
  );
}
