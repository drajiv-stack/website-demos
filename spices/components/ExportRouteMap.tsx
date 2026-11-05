'use client';

import { useEffect, useRef } from 'react';
import {
  MARITIME_PORTS,
  SEA_LANE_ROUTES,
  WORLD_DOTS_PATH,
  WORLD_MAP_VIEWBOX,
} from '@/lib/world-map-data';

export function ExportRouteMap() {
  const sectionRef = useRef<HTMLElement>(null);

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
              const paths = gsap.utils.toArray<SVGPathElement>('[data-sea-route]');
              const vessels = gsap.utils.toArray<SVGCircleElement>('[data-vessel-dot]');

              const lengths = paths.map((p) => p.getTotalLength());

              paths.forEach((path, idx) => {
                const len = lengths[idx];
                gsap.set(path, {
                  strokeDasharray: len,
                  strokeDashoffset: len,
                });
                const startPt = path.getPointAtLength(0);
                if (vessels[idx]) {
                  vessels[idx].setAttribute('transform', `translate(${startPt.x}, ${startPt.y})`);
                }
              });

              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top 75%',
                  end: 'center 40%',
                  scrub: 0.6,
                },
              });

              paths.forEach((path, idx) => {
                const len = lengths[idx];
                const vessel = vessels[idx];
                const dest = endpoints[idx];
                const proxy = { progress: 0 };

                tl.to(
                  proxy,
                  {
                    progress: 1,
                    duration: 1.0,
                    ease: 'power1.out',
                    onUpdate: () => {
                      const p = proxy.progress;
                      path.style.strokeDashoffset = `${Math.max(0, len * (1 - p))}`;
                      if (vessel) {
                        if (p >= 0.995) {
                          // Ensure vessel locks precisely to the destination port coordinate
                          vessel.setAttribute('transform', `translate(${dest.x}, ${dest.y})`);
                        } else {
                          const pt = path.getPointAtLength(Math.min(len, len * p));
                          vessel.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
                        }
                      }
                    },
                  },
                  idx * 0.12
                );
              });
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

  const endpoints = [
    MARITIME_PORTS.jebelAli,
    MARITIME_PORTS.felixstowe,
    MARITIME_PORTS.newark,
  ];

  return (
    <section
      id="export-route-map"
      ref={sectionRef}
      aria-labelledby="export-routes-heading"
      className="grain-surface bg-espresso-deep py-20 text-cream sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="export-routes-heading"
            className="font-display text-3xl font-semibold tracking-tight text-cream sm:text-5xl"
          >
            From Kochi to three continents.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-sand/85 sm:text-lg">
            Direct weekly sailings from Vallarpadam terminal along main maritime corridors to the
            Gulf, Britain and North America.
          </p>
        </div>

        {/* Pre-rendered Natural Earth 110m Dotted World Map + Sea Lanes */}
        <div className="mt-12 overflow-hidden rounded-sm border border-sand/15 bg-espresso p-3 sm:p-8">
          <div className="relative aspect-[16/9] w-full sm:aspect-[20/9]">
            <svg
              viewBox={WORLD_MAP_VIEWBOX}
              role="img"
              aria-label="Dotted world map showing maritime sea lanes from Kochi via the Red Sea and Suez Canal to Jebel Ali, Felixstowe and Newark"
              className="h-full w-full"
            >
              {/* Static Dotted Landmasses (1,883 Natural Earth land coordinates) */}
              <path
                d={WORLD_DOTS_PATH}
                stroke="#D8C7AE"
                strokeOpacity="0.28"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Faint baseline sea tracks so geography reads immediately */}
              {SEA_LANE_ROUTES.map((route) => (
                <path
                  key={`track-${route.id}`}
                  d={route.d}
                  fill="none"
                  stroke="#D9911A"
                  strokeOpacity="0.18"
                  strokeWidth="1.2"
                  strokeDasharray="3 5"
                />
              ))}

              {/* Scroll-drawn active sea lanes */}
              {SEA_LANE_ROUTES.map((route) => (
                <path
                  key={route.id}
                  data-sea-route
                  d={route.d}
                  fill="none"
                  stroke="#D9911A"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              ))}

              {/* Travelling container dots along each route */}
              {SEA_LANE_ROUTES.map((route, idx) => {
                const dest = endpoints[idx];
                return (
                  <circle
                    key={`vessel-${route.id}`}
                    data-vessel-dot
                    r="4.2"
                    fill="#F5EDE0"
                    stroke="#D9911A"
                    strokeWidth="2"
                    transform={`translate(${dest.x}, ${dest.y})`}
                  />
                );
              })}

              {/* Origin Port: Kochi */}
              <g transform={`translate(${MARITIME_PORTS.kochi.x}, ${MARITIME_PORTS.kochi.y})`}>
                <circle r="10" fill="#D9911A" fillOpacity="0.2" />
                <circle r="4.5" fill="#D9911A" />
                <text
                  x="10"
                  y="4"
                  fill="#F5EDE0"
                  fontSize="12"
                  fontWeight="700"
                  letterSpacing="0.04em"
                >
                  Kochi
                </text>
              </g>

              {/* Destination Port: Jebel Ali */}
              <g transform={`translate(${MARITIME_PORTS.jebelAli.x}, ${MARITIME_PORTS.jebelAli.y})`}>
                <circle r="3.8" fill="#F5EDE0" stroke="#D9911A" strokeWidth="2" />
                <text
                  x="9"
                  y="-6"
                  fill="#F5EDE0"
                  fontSize="11.5"
                  fontWeight="600"
                >
                  Jebel Ali
                </text>
                <text
                  x="9"
                  y="7"
                  fill="#D9911A"
                  fontSize="9.5"
                  fontWeight="500"
                >
                  6–9 days†
                </text>
              </g>

              {/* Destination Port: Felixstowe */}
              <g transform={`translate(${MARITIME_PORTS.felixstowe.x}, ${MARITIME_PORTS.felixstowe.y})`}>
                <circle r="3.8" fill="#F5EDE0" stroke="#D9911A" strokeWidth="2" />
                <text
                  x="9"
                  y="-6"
                  fill="#F5EDE0"
                  fontSize="11.5"
                  fontWeight="600"
                >
                  Felixstowe
                </text>
                <text
                  x="9"
                  y="7"
                  fill="#D9911A"
                  fontSize="9.5"
                  fontWeight="500"
                >
                  22–26 days†
                </text>
              </g>

              {/* Destination Port: Newark */}
              <g transform={`translate(${MARITIME_PORTS.newark.x}, ${MARITIME_PORTS.newark.y})`}>
                <circle r="3.8" fill="#F5EDE0" stroke="#D9911A" strokeWidth="2" />
                <text
                  x="-58"
                  y="-8"
                  fill="#F5EDE0"
                  fontSize="11.5"
                  fontWeight="600"
                >
                  Newark
                </text>
                <text
                  x="-62"
                  y="5"
                  fill="#D9911A"
                  fontSize="9.5"
                  fontWeight="500"
                >
                  28–34 days†
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
