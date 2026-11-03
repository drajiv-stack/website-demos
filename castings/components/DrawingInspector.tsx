'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface CalloutZone {
  id: string;
  code: string;
  label: string;
  detail: string;
  cx: number;
  cy: number;
  r: number;
  leaderPath: string;
  tagX: number;
  tagY: number;
}

const CALLOUT_ZONES: CalloutZone[] = [
  {
    id: 'alloy',
    code: 'DATUM A',
    label: '316 Stainless',
    detail: 'Silica-sol lost-wax shell body',
    cx: 290,
    cy: 245,
    r: 36,
    leaderPath: 'M 290 209 L 235 125 L 115 125',
    tagX: 110,
    tagY: 118,
  },
  {
    id: 'bore',
    code: 'DATUM B',
    label: 'Bore ±0.03 mm†',
    detail: 'Five-axis interpolated sealing bore',
    cx: 495,
    cy: 265,
    r: 52,
    leaderPath: 'M 532 228 L 620 130 L 760 130',
    tagX: 765,
    tagY: 123,
  },
  {
    id: 'seat',
    code: 'DATUM C',
    label: 'Mirror Seat',
    detail: 'Lapped spiral-wound gasket face',
    cx: 420,
    cy: 350,
    r: 34,
    leaderPath: 'M 392 372 L 295 445 L 145 445',
    tagX: 140,
    tagY: 438,
  },
  {
    id: 'flange',
    code: 'DATUM D',
    label: '5-Axis Milled',
    detail: 'Single-fixture bolt circle & bosses',
    cx: 675,
    cy: 330,
    r: 42,
    leaderPath: 'M 708 358 L 785 435 L 885 435',
    tagX: 880,
    tagY: 428,
  },
];

export function DrawingInspector() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string>('bore');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current || !('IntersectionObserver' in window)) {
      return;
    }

    let isMounted = true;
    let ctx: { revert: () => void } | undefined;
    const el = sectionRef.current;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
          ([{ gsap }, { ScrollTrigger }]) => {
            if (!isMounted || !sectionRef.current) return;
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
              const strokePaths = gsap.utils.toArray<SVGGeometryElement>('[data-cad-stroke]');
              strokePaths.forEach((p) => {
                const len = p.getTotalLength();
                gsap.set(p, {
                  strokeDasharray: len,
                  strokeDashoffset: len,
                });
              });

              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top 70%',
                  end: 'bottom 55%',
                  scrub: 0.4,
                },
              });

              tl.to(strokePaths, {
                strokeDashoffset: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'none',
              });

              tl.fromTo(
                '[data-cad-tag]',
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
                0.2
              );
            }, sectionRef);
          }
        );
      },
      { rootMargin: '250px' }
    );

    io.observe(el);

    return () => {
      isMounted = false;
      io.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="drawing-inspector"
      ref={sectionRef}
      aria-labelledby="inspector-heading"
      className="cad-grid-dark relative border-b border-steel/25 bg-graphite-light py-20 text-paper sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="inspector-heading"
            className="font-display-expanded text-3xl font-bold uppercase tracking-tight text-paper sm:text-5xl"
          >
            From print to finished bore.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-paper/80 sm:text-lg">
            Hover or tap any datum callout to inspect how our foundry and five-axis machining centres
            hold critical sealing surfaces to ±0.03 mm†.
          </p>
        </div>

        {/* Interactive CAD Blueprint Frame */}
        <div className="mt-10 border border-steel/35 bg-graphite p-3 sm:p-6">
          {/* Top Engineering Title Strip */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-steel/25 pb-2.5 font-mono text-[11px] uppercase tracking-wider text-steel">
            <span>DWG // KCM-VB-316-REV-C</span>
            <span className="text-molten">PROJECTION: ISO-E ORTHOGRAPHIC OVERLAY</span>
          </div>

          {/* Base Macro Photo + Interactive SVG Dimension Overlay */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-graphite-deep">
            <Image
              src="/images/products/ss316-valve-body-2.webp"
              alt="Machined 316 stainless steel valve body overlaid with orthographic CAD dimension callouts"
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover opacity-50 contrast-115"
            />

            <svg
              viewBox="0 0 1000 560"
              role="img"
              aria-label="Interactive engineering drawing overlay showing four datum callouts on a stainless steel valve body"
              className="relative z-10 h-full w-full"
            >
              {/* Corner registration crosshairs */}
              <g stroke="#8A949C" strokeWidth="1" opacity="0.6">
                <path d="M 20 30 H 45 M 30 20 V 45" />
                <path d="M 955 30 H 980 M 970 20 V 45" />
                <path d="M 20 530 H 45 M 30 515 V 540" />
                <path d="M 955 530 H 980 M 970 515 V 540" />
              </g>

              {/* Orthographic centreline axes */}
              <line
                x1="140"
                y1="265"
                x2="860"
                y2="265"
                stroke="#8A949C"
                strokeOpacity="0.45"
                strokeWidth="1"
                strokeDasharray="12 6 3 6"
              />
              <line
                x1="495"
                y1="70"
                x2="495"
                y2="490"
                stroke="#8A949C"
                strokeOpacity="0.45"
                strokeWidth="1"
                strokeDasharray="12 6 3 6"
              />

              {/* Outer envelope dimension lines (scroll-drawn) */}
              <g stroke="#ECEEF0" strokeWidth="1.4" fill="none">
                {/* Horizontal face-to-face dimension line */}
                <path data-cad-stroke d="M 220 90 V 185 M 770 90 V 185 M 220 102 H 770" />
                {/* Arrowheads */}
                <polygon points="220,102 232,98 232,106" fill="#ECEEF0" />
                <polygon points="770,102 758,98 758,106" fill="#ECEEF0" />

                {/* Vertical flange OD dimension line */}
                <path data-cad-stroke d="M 815 155 H 895 M 815 395 H 895 M 880 155 V 395" />
                <polygon points="880,155 876,167 884,167" fill="#ECEEF0" />
                <polygon points="880,395 876,383 884,383" fill="#ECEEF0" />

                {/* Concentric CAD bore rings */}
                <circle
                  data-cad-stroke
                  cx="495"
                  cy="265"
                  r="88"
                  stroke="#8A949C"
                  strokeOpacity="0.7"
                  strokeWidth="1.2"
                />
                <circle
                  data-cad-stroke
                  cx="495"
                  cy="265"
                  r="122"
                  stroke="#8A949C"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                />
              </g>

              {/* Callout Zones, Leader Lines & Labels */}
              {CALLOUT_ZONES.map((zone) => {
                const isActive = activeId === zone.id;
                return (
                  <g
                    key={zone.id}
                    onMouseEnter={() => setActiveId(zone.id)}
                    onClick={() => setActiveId(zone.id)}
                    className="cursor-pointer"
                  >
                    {/* Leader line */}
                    <path
                      data-cad-stroke
                      d={zone.leaderPath}
                      fill="none"
                      stroke={isActive ? '#FF5A1F' : '#ECEEF0'}
                      strokeWidth={isActive ? '2.2' : '1.4'}
                    />

                    {/* Target inspection ring */}
                    <circle
                      cx={zone.cx}
                      cy={zone.cy}
                      r={zone.r}
                      fill={isActive ? 'rgba(255, 90, 31, 0.18)' : 'rgba(20, 23, 26, 0.25)'}
                      stroke={isActive ? '#FF5A1F' : '#ECEEF0'}
                      strokeWidth={isActive ? '2.4' : '1.4'}
                      className="transition-transform duration-200"
                      style={{
                        transformOrigin: `${zone.cx}px ${zone.cy}px`,
                        transform: isActive ? 'scale(1.08)' : 'scale(1)',
                      }}
                    />

                    {/* Center target dot */}
                    <circle
                      cx={zone.cx}
                      cy={zone.cy}
                      r="4"
                      fill={isActive ? '#FF5A1F' : '#ECEEF0'}
                    />

                    {/* SVG Tag Label */}
                    <g data-cad-tag>
                      <text
                        x={zone.tagX}
                        y={zone.tagY - 12}
                        fill="#FF5A1F"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="600"
                        letterSpacing="0.12em"
                      >
                        {zone.code}
                      </text>
                      <text
                        x={zone.tagX}
                        y={zone.tagY + 4}
                        fill="#ECEEF0"
                        fontSize="13.5"
                        fontFamily="monospace"
                        fontWeight="700"
                      >
                        {zone.label}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive 4-Button Callout Bar below the blueprint */}
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {CALLOUT_ZONES.map((zone) => {
              const isActive = activeId === zone.id;
              return (
                <button
                  key={zone.id}
                  type="button"
                  onMouseEnter={() => setActiveId(zone.id)}
                  onFocus={() => setActiveId(zone.id)}
                  onClick={() => setActiveId(zone.id)}
                  aria-pressed={isActive}
                  className={`flex flex-col items-start border p-3 text-left transition-colors ${
                    isActive
                      ? 'border-molten bg-graphite-light text-paper'
                      : 'border-steel/25 bg-graphite text-paper/75 hover:border-steel/60'
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-molten">
                    {zone.code}
                  </span>
                  <span className="mt-1 font-mono text-sm font-semibold text-paper">
                    {zone.label}
                  </span>
                  <span className="mt-1 text-xs text-steel">
                    {zone.detail}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
