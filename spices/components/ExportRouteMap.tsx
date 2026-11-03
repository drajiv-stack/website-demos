'use client';

import { useEffect, useRef } from 'react';
import { EXPORT_ROUTES } from '@/lib/products';

export function ExportRouteMap() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current || !('IntersectionObserver' in window)) {
      return;
    }

    let ctx: { revert: () => void } | undefined;
    const el = sectionRef.current;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
          ([{ gsap }, { ScrollTrigger }]) => {
            gsap.registerPlugin(ScrollTrigger);
            if (!sectionRef.current) return;

            ctx = gsap.context(() => {
              const paths = gsap.utils.toArray<SVGPathElement>('[data-route-path]');
              const labels = gsap.utils.toArray<HTMLElement>('[data-route-card]');
              const pulseRings = gsap.utils.toArray<SVGCircleElement>('[data-kochi-pulse]');

              paths.forEach((path) => {
                const length = path.getTotalLength();
                gsap.set(path, {
                  strokeDasharray: length,
                  strokeDashoffset: length,
                });
              });

              gsap.set(labels, { y: 14 });

              gsap.fromTo(
                pulseRings,
                { scale: 1, opacity: 0.85, transformOrigin: '50% 50%' },
                {
                  scale: 2.6,
                  opacity: 0,
                  duration: 1.1,
                  repeat: 1,
                  stagger: 0.25,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 72%',
                    once: true,
                  },
                }
              );

              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top 68%',
                  end: 'bottom 55%',
                  scrub: 0.5,
                },
              });

              paths.forEach((path, idx) => {
                tl.to(
                  path,
                  {
                    strokeDashoffset: 0,
                    duration: 1.2,
                    ease: 'none',
                  },
                  idx * 0.35
                );
                if (labels[idx]) {
                  tl.to(
                    labels[idx],
                    {
                      y: 0,
                      duration: 0.35,
                      ease: 'power2.out',
                    },
                    idx * 0.35 + 0.75
                  );
                }
              });
            }, sectionRef);
          }
        );
      },
      { rootMargin: '300px' }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="export-routes-heading"
      className="bg-espresso py-20 text-cream sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-sand/20 pb-10 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turmeric">
              Direct Maritime Corridors · Ex-Kochi (INCOK)
            </p>
            <h2
              id="export-routes-heading"
              className="mt-3 font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl"
            >
              From ICTT Vallarpadam, Kochi to your destination port.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-sand">
            Our grading and steam-sterilisation unit sits 45 km from Kochi container terminal
            (sample figure), enabling weekly feeder and mainline sailings to the Gulf, UK and US
            East Coast.
          </p>
        </div>

        {/* Minimal Editorial SVG World Maritime Map */}
        <div className="mt-10 overflow-hidden rounded-sm border border-sand/25 bg-espresso-deep p-4 sm:p-8">
          <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
            <svg
              viewBox="0 0 1000 440"
              role="img"
              aria-label="Export shipping routes from Kochi Port, India to Jebel Ali (UAE), Felixstowe (UK), and New York/Newark (USA)"
              className="h-full w-full"
            >
              <defs>
                <radialGradient id="oceanGlow" cx="68%" cy="62%" r="60%">
                  <stop offset="0%" stopColor="#2E1F18" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#150E0B" stopOpacity="1" />
                </radialGradient>
              </defs>

              {/* Sea Backdrop */}
              <rect width="1000" height="440" fill="url(#oceanGlow)" />

              {/* Subtle Latitude / Longitude Graticule */}
              <g stroke="#D8C7AE" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="3 6">
                <line x1="0" y1="110" x2="1000" y2="110" />
                <line x1="0" y1="220" x2="1000" y2="220" />
                <line x1="0" y1="330" x2="1000" y2="330" />
                <line x1="220" y1="0" x2="220" y2="440" />
                <line x1="480" y1="0" x2="480" y2="440" />
                <line x1="720" y1="0" x2="720" y2="440" />
              </g>

              {/* Simplified Continental Silhouettes (North America, Europe/UK, Africa, Middle East, India/Asia) */}
              <g fill="#261A14" stroke="#D8C7AE" strokeOpacity="0.24" strokeWidth="1.2">
                {/* North America East Coast */}
                <path d="M 55 70 L 185 65 L 245 110 L 230 162 L 195 195 L 165 245 L 130 265 L 95 235 L 55 180 Z" />
                {/* UK & Ireland */}
                <path d="M 455 102 L 476 96 L 484 124 L 464 134 Z" />
                {/* Continental Europe & Mediterranean */}
                <path d="M 465 140 L 535 105 L 610 115 L 625 168 L 570 190 L 515 185 L 468 172 Z" />
                {/* Africa */}
                <path d="M 462 198 L 560 198 L 605 238 L 635 288 L 595 390 L 535 405 L 495 335 L 450 265 Z" />
                {/* Arabian Peninsula */}
                <path d="M 602 195 L 664 198 L 682 238 L 642 268 L 608 235 Z" />
                {/* India & South Asia */}
                <path d="M 695 185 L 785 180 L 835 215 L 810 265 L 765 255 L 742 308 L 724 295 L 708 235 Z" />
              </g>

              {/* Animated Maritime Route 1: Kochi (732, 294) -> Jebel Ali (662, 224) */}
              <path
                data-route-path
                d="M 732 294 Q 690 272 662 224"
                fill="none"
                stroke="#D9911A"
                strokeWidth="2.75"
                strokeLinecap="round"
              />

              {/* Animated Maritime Route 2: Kochi (732, 294) -> Suez -> Gibraltar -> Felixstowe (476, 120) */}
              <path
                data-route-path
                d="M 732 294 C 660 292, 625 245, 594 202 C 555 182, 480 185, 452 162 C 446 144, 462 128, 476 120"
                fill="none"
                stroke="#D9911A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Animated Maritime Route 3: Kochi (732, 294) -> Suez -> North Atlantic -> New York/Newark (212, 162) */}
              <path
                data-route-path
                d="M 732 294 C 655 298, 620 248, 592 204 C 542 184, 465 188, 438 172 C 355 162, 285 158, 212 162"
                fill="none"
                stroke="#D9911A"
                strokeWidth="2.25"
                strokeLinecap="round"
              />

              {/* Origin Node: Kochi Port (INCOK) */}
              <g transform="translate(732, 294)">
                <circle data-kochi-pulse r="10" fill="none" stroke="#D9911A" strokeWidth="1.8" />
                <circle data-kochi-pulse r="15" fill="none" stroke="#D9911A" strokeWidth="1.2" />
                <circle r="6" fill="#D9911A" />
                <circle r="2.5" fill="#1E1410" />
                <rect x="12" y="-14" width="142" height="28" rx="2" fill="#1E1410" stroke="#D9911A" strokeWidth="1" />
                <text x="20" y="4" fill="#F5EDE0" fontSize="11" fontWeight="700" letterSpacing="0.06em">
                  KOCHI PORT (INCOK)
                </text>
              </g>

              {/* Destination Node 1: Jebel Ali */}
              <g transform="translate(662, 224)">
                <circle r="5" fill="#F5EDE0" stroke="#D9911A" strokeWidth="2.5" />
                <g transform="translate(-18, -44)">
                  <rect width="176" height="34" rx="2" fill="#1E1410" stroke="#D8C7AE" strokeOpacity="0.45" />
                  <text x="8" y="14" fill="#F5EDE0" fontSize="10.5" fontWeight="700">
                    Jebel Ali, UAE
                  </text>
                  <text x="8" y="27" fill="#D9911A" fontSize="9.5" fontWeight="600">
                    6–9 days (sample figure)
                  </text>
                </g>
              </g>

              {/* Destination Node 2: Felixstowe */}
              <g transform="translate(476, 120)">
                <circle r="5" fill="#F5EDE0" stroke="#D9911A" strokeWidth="2.5" />
                <g transform="translate(-85, -48)">
                  <rect width="188" height="34" rx="2" fill="#1E1410" stroke="#D8C7AE" strokeOpacity="0.45" />
                  <text x="8" y="14" fill="#F5EDE0" fontSize="10.5" fontWeight="700">
                    Felixstowe, UK
                  </text>
                  <text x="8" y="27" fill="#D9911A" fontSize="9.5" fontWeight="600">
                    22–26 days (sample figure)
                  </text>
                </g>
              </g>

              {/* Destination Node 3: New York / Newark */}
              <g transform="translate(212, 162)">
                <circle r="5" fill="#F5EDE0" stroke="#D9911A" strokeWidth="2.5" />
                <g transform="translate(-20, -48)">
                  <rect width="200" height="34" rx="2" fill="#1E1410" stroke="#D8C7AE" strokeOpacity="0.45" />
                  <text x="8" y="14" fill="#F5EDE0" fontSize="10.5" fontWeight="700">
                    New York / Newark, USA
                  </text>
                  <text x="8" y="27" fill="#D9911A" fontSize="9.5" fontWeight="600">
                    28–34 days (sample figure)
                  </text>
                </g>
              </g>
            </svg>
          </div>

          {/* Route Detail Cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {EXPORT_ROUTES.map((route, index) => (
              <div
                key={route.id}
                data-route-card
                className="rounded-sm border border-sand/25 bg-espresso p-5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-semibold text-turmeric">
                    0{index + 1} · {route.code}
                  </span>
                  <span className="rounded-sm bg-espresso-deep px-2 py-0.5 text-[11px] text-sand">
                    FOB Kochi / CIF
                  </span>
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold text-cream">
                  {route.port}, {route.country}
                </h3>
                <p className="mt-1 text-sm font-semibold text-turmeric tabular-nums">
                  Typical transit: {route.transitDays}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-sand/90">{route.frequency}</p>
                <p className="mt-2 border-t border-sand/15 pt-2 text-xs text-sand/75">
                  {route.buyers}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
