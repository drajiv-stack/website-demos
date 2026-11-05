'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLab } from '@/context/LabContext';
import { LAB_PATTERNS } from '@/lib/lab-data';
import { PatternWrapper } from './PatternWrapper';
import { ReadoutBadge } from '@/components/hud/ReadoutBadge';

const ROUTE_PATH = 'M 820 460 C 760 380, 680 340, 620 320 C 580 300, 540 280, 510 240 C 470 190, 440 160, 410 130 C 370 100, 320 80, 270 70';

export function P7SvgRouteDraw() {
  const config = LAB_PATTERNS[6];
  const { isPatternBroken, showMarkers, simulateReducedMotion, setActiveSectionId, setActiveSectionProgress } = useLab();
  const isBroken = isPatternBroken(config.id);

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // Readouts state
  const [engineInUse, setEngineInUse] = useState<string>('Static Precomputed');
  const [drawPercent, setDrawPercent] = useState<number>(0);
  const [calcPerSec, setCalcPerSec] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    if (!container || !path) return;

    const totalLength = path.getTotalLength();
    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    if (isBroken) {
      setEngineInUse('Continuous Path Recalculation (JS)');
      setCalcPerSec(0);
    } else {
      setEngineInUse('Precomputed stroke-dashoffset (GSAP / CSS)');
      setCalcPerSec(0);
    }

    let isMounted = true;
    let ctx: { revert: () => void } | undefined;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!isMounted) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          if (isBroken) {
            // BROKEN: Recalculates getTotalLength and re-applies SVG attributes on every scroll tick
            ScrollTrigger.create({
              trigger: container,
              start: 'top 70%',
              end: 'bottom 20%',
              markers: showMarkers,
              onUpdate: (self) => {
                const p = self.progress;
                setActiveSectionId('P7: SVG Route Draw');
                setActiveSectionProgress(p);
                setDrawPercent(Math.round(p * 100));

                // Anti-pattern: continuous synchronous SVG path calculations
                const dynamicLen = path.getTotalLength();
                path.setAttribute('stroke-dasharray', `${dynamicLen}`);
                path.setAttribute('stroke-dashoffset', `${dynamicLen * (1 - p)}`);
                setCalcPerSec((prev) => prev + 1);
              },
            });
          } else {
            // CORRECT: Precalculated static vector offset scrub
            gsap.fromTo(
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
                  markers: showMarkers,
                  onUpdate: (self) => {
                    const p = self.progress;
                    setActiveSectionId('P7: SVG Route Draw');
                    setActiveSectionProgress(p);
                    setDrawPercent(Math.round(p * 100));
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
  }, [isBroken, showMarkers, simulateReducedMotion, setActiveSectionId, setActiveSectionProgress]);

  return (
    <PatternWrapper
      config={config}
      readouts={
        <>
          <ReadoutBadge
            label="Draw Progress"
            value={`${drawPercent}%`}
            variant="turmeric"
          />
          <ReadoutBadge
            label="Engine"
            value={engineInUse}
            variant={isBroken ? 'red' : 'stone'}
          />
          {isBroken && (
            <ReadoutBadge
              label="DOM Attribute Calls"
              value={calcPerSec}
              variant="red"
            />
          )}
        </>
      }
    >
      <div
        ref={containerRef}
        className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-[#1A1714] p-8 sm:p-12"
      >
        {/* Active Mode Banner */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-xs border border-[#332E29] bg-[#161412]/90 px-3 py-1.5 font-mono text-xs">
          <span className={`h-2 w-2 rounded-full ${isBroken ? 'bg-red-500' : 'bg-[#D9911A]'}`} />
          <span className="font-semibold text-[#F5EDE0]">
            {isBroken ? config.brokenBadge : config.correctBadge}
          </span>
        </div>

        {/* Shipping Route SVG Canvas */}
        <div className="relative aspect-16/10 w-full max-w-4xl rounded-sm border border-[#332E29] bg-[#161412] p-6 shadow-2xl">
          <svg
            viewBox="0 0 1000 550"
            className="h-full w-full pointer-events-none"
            role="img"
            aria-label="Maritime shipping vector map from Kochi to Felixstowe"
          >
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#25211D" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1000" height="550" fill="url(#grid)" />

            {/* Inactive Base Path */}
            <path
              d={ROUTE_PATH}
              fill="none"
              stroke="#332E29"
              strokeWidth="3"
              strokeDasharray="6 6"
            />

            {/* Active Scrubbed Path */}
            <path
              ref={pathRef}
              d={ROUTE_PATH}
              fill="none"
              stroke="#D9911A"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Port Waypoints */}
            <g transform="translate(820, 460)">
              <circle r="8" fill="#D9911A" fillOpacity="0.25" />
              <circle r="4" fill="#D9911A" />
              <text x="12" y="4" fill="#F5EDE0" fontSize="12" fontFamily="monospace" fontWeight="bold">
                Kochi (Origin)
              </text>
            </g>

            <g transform="translate(620, 320)">
              <circle r="4" fill="#F5EDE0" />
              <text x="10" y="-4" fill="#8C827A" fontSize="11" fontFamily="monospace">
                Jebel Ali
              </text>
            </g>

            <g transform="translate(510, 240)">
              <circle r="4" fill="#F5EDE0" />
              <text x="10" y="-4" fill="#8C827A" fontSize="11" fontFamily="monospace">
                Suez Canal
              </text>
            </g>

            <g transform="translate(270, 70)">
              <circle r="8" fill="#D9911A" fillOpacity="0.25" />
              <circle r="4" fill="#D9911A" />
              <text x="-120" y="4" fill="#F5EDE0" fontSize="12" fontFamily="monospace" fontWeight="bold">
                Felixstowe (Port)
              </text>
            </g>
          </svg>
        </div>
      </div>
    </PatternWrapper>
  );
}
