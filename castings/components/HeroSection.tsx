'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// 28 deterministic ember particles rising across the foundry viewport (transform & opacity only)
const EMBER_PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 96}%`,
  bottom: `${(i * 19) % 35}%`,
  size: i % 3 === 0 ? 4 : i % 2 === 0 ? 3 : 2,
  delay: (i * 0.27) % 4.2,
  duration: 2.8 + ((i * 0.43) % 2.6),
  driftX: ((i % 5) - 2) * 28,
}));

export function HeroSection() {
  const outerRef = useRef<HTMLElement>(null);
  const bgScaleRef = useRef<HTMLDivElement>(null);
  const copyWrapRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<SVGSVGElement>(null);
  const [mountVideo, setMountVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktopMq = window.matchMedia('(min-width: 768px)').matches;
    setIsMobile(!desktopMq);

    if (prefersReduced) {
      return;
    }

    // Mount video right after first paint on desktop (120ms) and after mobile LCP window (3500ms)
    const videoTimer = window.setTimeout(
      () => setMountVideo(true),
      desktopMq ? 120 : 3500
    );

    let ctx: { revert: () => void } | undefined;

    const gsapTimer = window.setTimeout(
      () => {
        Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
          ([{ gsap }, { ScrollTrigger }]) => {
            if (!outerRef.current) return;
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
              // 1. Staggered expanded headline reveal (desktop only so mobile H1 paints immediately for <2.5s LCP)
              if (desktopMq) {
                gsap.fromTo(
                  '[data-hero-line]',
                  { yPercent: 105, opacity: 0 },
                  {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.75,
                    stagger: 0.14,
                    ease: 'power3.out',
                    clearProps: 'transform,opacity',
                  }
                );
              }

              // 2. Continuous rising molten ember particle animation (transform & opacity only)
              const embers = gsap.utils.toArray<HTMLElement>('[data-ember]');
              embers.forEach((el, idx) => {
                const p = EMBER_PARTICLES[idx];
                if (!p) return;
                gsap.fromTo(
                  el,
                  { y: 0, x: 0, opacity: 0, scale: 0.6 },
                  {
                    y: -260 - (idx % 4) * 55,
                    x: p.driftX,
                    opacity: 0.9,
                    scale: 1.25,
                    duration: p.duration,
                    delay: p.delay,
                    repeat: -1,
                    ease: 'power1.out',
                    yoyo: false,
                  }
                );
              });

              // 3. Slow rotation of the CAD telemetry reticle
              if (reticleRef.current) {
                gsap.to(reticleRef.current, {
                  rotation: 360,
                  duration: 48,
                  repeat: -1,
                  ease: 'none',
                });
              }

              // 4. Scroll-linked Zoom & Parallax depth as user scrolls down (starts at scale 1 so initial LCP is never invalidated)
              if (bgScaleRef.current && copyWrapRef.current) {
                gsap.fromTo(
                  bgScaleRef.current,
                  { scale: 1 },
                  {
                    scale: 1.16,
                    ease: 'none',
                    scrollTrigger: {
                      trigger: outerRef.current,
                      start: 'top top',
                      end: 'bottom top',
                      scrub: 0.5,
                    },
                  }
                );

                gsap.to(copyWrapRef.current, {
                  y: -75,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: outerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5,
                  },
                });
              }
            }, outerRef);
          }
        );
      },
      desktopMq ? 0 : 1200
    );

    return () => {
      window.clearTimeout(videoTimer);
      window.clearTimeout(gsapTimer);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="site-hero"
      ref={outerRef}
      className="cad-grid-dark relative min-h-[92svh] w-full overflow-hidden border-b border-steel/30 bg-graphite-deep text-paper flex items-end pb-16 pt-28 sm:min-h-[94svh] sm:items-center sm:py-24"
    >
      {/* Zoom-in / Zoom-out Parallax Video & Poster Backdrop */}
      <div
        ref={bgScaleRef}
        className="absolute inset-0 z-0 will-change-transform"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/foundry-hero-poster.webp"
          alt="Glowing molten induction furnace and overhead ladle crane inside Kinesis Cast & Machine Works in Rajkot"
          width={1440}
          height={810}
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {mountVideo && (
          <video
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
            poster="/images/hero/foundry-hero-poster.webp"
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {isMobile ? (
              <source src="/video/foundry-hero-mobile.mp4" type="video/mp4" />
            ) : (
              <>
                <source src="/video/foundry-hero-desktop.webm" type="video/webm" />
                <source src="/video/foundry-hero-desktop.mp4" type="video/mp4" />
              </>
            )}
          </video>
        )}

        {/* Cinematic dark gradient on the left so molten furnace glow shines on the right & copy stays AA legible */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-graphite-deep via-graphite-deep/65 to-graphite-deep/20 sm:bg-gradient-to-r sm:from-graphite-deep/90 sm:via-graphite-deep/55 sm:to-transparent"
        />
      </div>

      {/* Live Molten Ember Particle Field (GPU transform & opacity only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      >
        {EMBER_PARTICLES.map((p) => (
          <span
            key={p.id}
            data-ember
            style={{
              left: p.left,
              bottom: p.bottom,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            className="absolute rounded-full bg-molten opacity-0 shadow-[0_0_10px_#FF5A1F]"
          />
        ))}
      </div>

      {/* Rotating CAD Telemetry HUD Reticle on Right Side (Desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 lg:block xl:right-20"
      >
        <div className="relative h-80 w-80 xl:h-96 xl:w-96">
          <svg
            ref={reticleRef}
            viewBox="0 0 320 320"
            className="h-full w-full opacity-55"
          >
            <circle
              cx="160"
              cy="160"
              r="148"
              fill="none"
              stroke="#ECEEF0"
              strokeWidth="1"
              strokeDasharray="6 10"
            />
            <circle
              cx="160"
              cy="160"
              r="116"
              fill="none"
              stroke="#FF5A1F"
              strokeWidth="1.5"
              strokeDasharray="48 18 12 18"
            />
            <circle
              cx="160"
              cy="160"
              r="76"
              fill="none"
              stroke="#8A949C"
              strokeWidth="1"
            />
            <path
              d="M 160 0 V 36 M 160 284 V 320 M 0 160 H 36 M 284 160 H 320"
              stroke="#FF5A1F"
              strokeWidth="1.8"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-mono">
            <span className="text-[10px] uppercase tracking-[0.22em] text-molten">
              INDUCTION MELT // LIVE
            </span>
            <span className="mt-1 text-2xl font-bold text-paper tabular-nums">
              1,580 °C†
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-steel">
              SILICA-SOL &amp; 5-AXIS CNC
            </span>
          </div>
        </div>
      </div>

      {/* Foreground Parallax Copy & CTA */}
      <div
        ref={copyWrapRef}
        className="relative z-20 mx-auto w-full max-w-7xl px-4 will-change-transform sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl border-l-2 border-molten pl-5 sm:pl-8">
          <div className="inline-flex items-center gap-2.5 border border-molten/40 bg-graphite-deep/80 px-3 py-1 backdrop-blur-xs">
            <span className="h-2 w-2 rounded-full bg-molten animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-molten">
              Foundry &amp; Five-Axis CNC · Rajkot
            </span>
          </div>

          <h1 className="mt-5 font-display-expanded text-4xl font-bold uppercase leading-[1.03] tracking-tight text-paper sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden pb-1">
              <span data-hero-line className="block">
                Cast in Rajkot.
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span data-hero-line className="block text-molten">
                Machined for Stuttgart.
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/90 sm:text-lg">
            Lost-wax investment castings and five-axis CNC components delivered ready for assembly to
            German and North American OEM lines.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="#quote"
              className="inline-flex items-center justify-center bg-molten px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-graphite shadow-[0_0_30px_rgba(255,90,31,0.35)] transition-all hover:bg-molten-hover sm:text-sm"
            >
              Request a quote
            </Link>
            <Link
              href="#drawing-inspector"
              className="inline-flex items-center justify-center border border-paper/35 bg-graphite-deep/70 px-6 py-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-paper backdrop-blur-xs transition-colors hover:border-molten hover:text-molten sm:text-sm"
            >
              Inspect CAD Bore ↓
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
