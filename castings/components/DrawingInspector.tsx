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
  zoomScale: number;
  zoomOrigin: string;
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
    zoomScale: 1.18,
    zoomOrigin: '29% 44%',
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
    zoomScale: 1.24,
    zoomOrigin: '50% 47%',
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
    zoomScale: 1.2,
    zoomOrigin: '42% 62%',
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
    zoomScale: 1.18,
    zoomOrigin: '68% 59%',
  },
];

export function DrawingInspector() {
  const outerRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const viewportFrameRef = useRef<HTMLDivElement>(null);
  const scanBeamRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>('bore');

  const activeZone = CALLOUT_ZONES.find((z) => z.id === activeId) ?? CALLOUT_ZONES[1];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (
      prefersReduced ||
      !outerRef.current ||
      !pinWrapRef.current ||
      !('IntersectionObserver' in window)
    ) {
      return;
    }

    let isMounted = true;
    let ctx: { revert: () => void } | undefined;
    const el = outerRef.current;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
          ([{ gsap }, { ScrollTrigger }]) => {
            if (!isMounted || !pinWrapRef.current || !viewportFrameRef.current) return;
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
                  trigger: pinWrapRef.current,
                  pin: isDesktop,
                  start: isDesktop ? 'top top' : 'top 70%',
                  end: isDesktop ? '+=130%' : 'bottom 50%',
                  scrub: 0.45,
                  invalidateOnRefresh: true,
                },
              });

              // 1. Zoom-in on the CAD viewport frame as it locks into place
              tl.fromTo(
                viewportFrameRef.current,
                { scale: 0.9, opacity: 0.85 },
                { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' },
                0
              );

              // 2. Molten laser scan beam sweeps down the part
              if (scanBeamRef.current) {
                tl.fromTo(
                  scanBeamRef.current,
                  { yPercent: 0, opacity: 0.95 },
                  { yPercent: 5600, opacity: 0.2, duration: 0.85, ease: 'none' },
                  0.05
                );
              }

              // 3. Draw orthographic SVG dimension arrows & concentric bore rings
              tl.to(
                strokePaths,
                {
                  strokeDashoffset: 0,
                  duration: 0.75,
                  stagger: 0.06,
                  ease: 'none',
                },
                0.1
              );

              // 4. Reveal datum callout tags
              tl.fromTo(
                '[data-cad-tag]',
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.35, stagger: 0.08 },
                0.28
              );
            }, outerRef);
          }
        );
      },
      { rootMargin: '0px', threshold: 0.15 }
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
      ref={outerRef}
      aria-labelledby="inspector-heading"
      className="cad-grid-dark relative border-b border-steel/25 bg-graphite-light text-paper"
    >
      {/* Inner pin wrapper so ScrollTrigger's pin-spacer stays strictly inside <section> */}
      <div
        ref={pinWrapRef}
        className="mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-molten">
              01 // X-RAY CAD METROLOGY
            </p>
            <h2
              id="inspector-heading"
              className="mt-2 font-display-expanded text-3xl font-bold uppercase tracking-tight text-paper sm:text-5xl"
            >
              From print to finished bore.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-paper/80 sm:text-base">
            Hover or tap any datum callout to zoom into the casting and inspect how our five-axis
            centres hold sealing surfaces to ±0.03 mm†.
          </p>
        </div>

        {/* Interactive Zoom-In CAD Blueprint Frame */}
        <div
          ref={viewportFrameRef}
          className="mt-7 border border-steel/40 bg-graphite p-3 shadow-[0_24px_80px_rgba(0,0,0,0.65)] will-change-transform sm:p-5"
        >
          {/* Top Engineering Title Strip */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-steel/25 pb-2.5 font-mono text-[11px] uppercase tracking-wider text-steel">
            <span>DWG // KCM-VB-316-REV-C</span>
            <span className="text-molten">
              ACTIVE ZOOM: {activeZone.code} ({activeZone.label})
            </span>
          </div>

          {/* Base Macro Photo (zooms smoothly to active datum target) + Interactive SVG Overlay */}
          <div className="relative aspect-[16/9] max-h-[54svh] w-full overflow-hidden bg-graphite-deep">
            {/* Molten Laser Scan Beam */}
            <div
              ref={scanBeamRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-20 h-2.5 bg-gradient-to-r from-transparent via-molten to-transparent opacity-0 shadow-[0_0_24px_#FF5A1F]"
            />

            {/* Zoomable Macro Photograph */}
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out will-change-transform"
              style={{
                transform: `scale(${activeZone.zoomScale})`,
                transformOrigin: activeZone.zoomOrigin,
              }}
            >
              <Image
                src="/images/products/ss316-valve-body-2.webp"
                alt="Machined 316 stainless steel valve body overlaid with orthographic CAD dimension callouts"
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover opacity-55 contrast-115"
              />
            </div>

            <svg
              viewBox="0 0 1000 560"
              role="img"
              aria-label="Interactive engineering drawing overlay showing four datum callouts on a stainless steel valve body"
              className="relative z-10 h-full w-full"
            >
              {/* Corner registration crosshairs */}
              <g stroke="#8A949C" strokeWidth="1.2" opacity="0.7">
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
              <g stroke="#ECEEF0" strokeWidth="1.5" fill="none">
                <path data-cad-stroke d="M 220 90 V 185 M 770 90 V 185 M 220 102 H 770" />
                <polygon points="220,102 232,98 232,106" fill="#ECEEF0" />
                <polygon points="770,102 758,98 758,106" fill="#ECEEF0" />

                <path data-cad-stroke d="M 815 155 H 895 M 815 395 H 895 M 880 155 V 395" />
                <polygon points="880,155 876,167 884,167" fill="#ECEEF0" />
                <polygon points="880,395 876,383 884,383" fill="#ECEEF0" />

                <circle
                  data-cad-stroke
                  cx="495"
                  cy="265"
                  r="88"
                  stroke="#8A949C"
                  strokeOpacity="0.75"
                  strokeWidth="1.3"
                />
                <circle
                  data-cad-stroke
                  cx="495"
                  cy="265"
                  r="128"
                  stroke="#FF5A1F"
                  strokeOpacity="0.4"
                  strokeWidth="1"
                  strokeDasharray="8 6"
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
                    <path
                      data-cad-stroke
                      d={zone.leaderPath}
                      fill="none"
                      stroke={isActive ? '#FF5A1F' : '#ECEEF0'}
                      strokeWidth={isActive ? '2.4' : '1.4'}
                    />

                    <circle
                      cx={zone.cx}
                      cy={zone.cy}
                      r={zone.r}
                      fill={isActive ? 'rgba(255, 90, 31, 0.22)' : 'rgba(20, 23, 26, 0.3)'}
                      stroke={isActive ? '#FF5A1F' : '#ECEEF0'}
                      strokeWidth={isActive ? '2.6' : '1.4'}
                      className="transition-transform duration-300"
                      style={{
                        transformOrigin: `${zone.cx}px ${zone.cy}px`,
                        transform: isActive ? 'scale(1.12)' : 'scale(1)',
                      }}
                    />

                    <circle
                      cx={zone.cx}
                      cy={zone.cy}
                      r="4.5"
                      fill={isActive ? '#FF5A1F' : '#ECEEF0'}
                    />

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

          {/* Interactive 4-Button Zoom Callout Bar */}
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
                  className={`flex flex-col items-start border p-3 text-left transition-all ${
                    isActive
                      ? 'border-molten bg-graphite-light text-paper shadow-[inset_0_0_20px_rgba(255,90,31,0.12)]'
                      : 'border-steel/25 bg-graphite text-paper/75 hover:border-steel/60'
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-molten">
                    {zone.code} · ZOOM
                  </span>
                  <span className="mt-1 font-mono text-sm font-semibold text-paper">
                    {zone.label}
                  </span>
                  <span className="mt-0.5 text-xs text-steel">
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
