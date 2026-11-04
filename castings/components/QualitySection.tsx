'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

const PILLARS = ['Spectro-verified', 'CMM-probed', 'Seaworthy VCI-packed'];

export function QualitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainImgRef = useRef<HTMLDivElement>(null);
  const floatCardRef = useRef<HTMLDivElement>(null);

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
              if (mainImgRef.current) {
                gsap.fromTo(
                  mainImgRef.current,
                  { scale: 1.14, y: -20 },
                  {
                    scale: 1,
                    y: 20,
                    ease: 'none',
                    scrollTrigger: {
                      trigger: sectionRef.current,
                      start: 'top bottom',
                      end: 'bottom top',
                      scrub: 0.45,
                    },
                  }
                );
              }

              if (floatCardRef.current) {
                gsap.fromTo(
                  floatCardRef.current,
                  { y: 35 },
                  {
                    y: -35,
                    ease: 'none',
                    scrollTrigger: {
                      trigger: sectionRef.current,
                      start: 'top bottom',
                      end: 'bottom top',
                      scrub: 0.45,
                    },
                  }
                );
              }
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
      id="quality"
      ref={sectionRef}
      aria-labelledby="quality-heading"
      className="cad-grid-light border-b border-graphite/15 bg-paper py-20 text-graphite sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-molten-hover">
              03 // IN-HOUSE METROLOGY
            </p>
            <h2
              id="quality-heading"
              className="mt-2 font-display-expanded text-3xl font-bold uppercase tracking-tight text-graphite sm:text-5xl"
            >
              Verified before every pour and pack.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-graphite/80 sm:text-lg">
              Every production heat is checked on our optical spectrometer and coordinate-measured
              on a bridge CMM with 100%† lot traceability to Mundra port.
            </p>

            <ul className="mt-10 flex flex-wrap gap-3">
              {PILLARS.map((label) => (
                <li
                  key={label}
                  className="border border-graphite/35 bg-paper-warm px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-graphite"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:col-span-6">
            {/* Primary Parallax Metrology Frame */}
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-graphite/30 bg-graphite shadow-xl">
              <div ref={mainImgRef} className="absolute inset-0 will-change-transform">
                <Image
                  src="/images/process/step-05-inspect.webp"
                  alt="Coordinate measuring machine spindle inspecting a machined stainless steel casting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 580px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Counter-Parallax Floating Telemetry Readout Card */}
            <div
              ref={floatCardRef}
              className="mt-4 border border-molten bg-graphite p-5 text-paper shadow-2xl will-change-transform sm:absolute sm:-bottom-8 sm:-left-8 sm:mt-0 sm:w-72"
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-molten">
                <span>CMM PROBE // PASS</span>
                <span className="h-2 w-2 rounded-full bg-molten animate-ping" />
              </div>
              <p className="mt-2 font-display-expanded text-lg font-bold uppercase text-paper">
                Zero-Defect Gate
              </p>
              <p className="mt-1 font-mono text-xs text-steel">
                Spectro melt log + 3D coordinate report archived per lot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
