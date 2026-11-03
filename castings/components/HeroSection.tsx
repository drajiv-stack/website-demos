'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export function HeroSection() {
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (prefersReduced || !isDesktop) {
      return;
    }

    let ctx: { revert: () => void } | undefined;
    import('gsap').then(({ gsap }) => {
      if (!copyRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          '[data-hero-line]',
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          }
        );
      }, copyRef);
    });

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="site-hero"
      className="cad-grid-dark relative min-h-[88svh] w-full overflow-hidden border-b border-steel/25 bg-graphite text-paper flex items-end pb-16 pt-28 sm:min-h-[90svh] sm:items-center sm:py-24"
    >
      {/* Full-bleed edge-to-edge precision casting macro */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/valve-body-cad-base.webp"
          alt="Precision 5-axis CNC-machined stainless steel flanged valve body assembly in Rajkot"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/75 to-graphite/40 sm:bg-gradient-to-r sm:from-graphite sm:via-graphite/80 sm:to-graphite/25"
        />
      </div>

      {/* Subtle corner CAD registration marks */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div ref={copyRef} className="pointer-events-auto max-w-3xl border-l-2 border-molten pl-5 sm:pl-8">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-molten">
            Foundry &amp; Five-Axis CNC · Rajkot
          </p>

          <h1 className="mt-4 font-display-expanded text-4xl font-bold uppercase leading-[1.04] tracking-tight text-paper sm:text-6xl lg:text-7xl">
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

          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/85 sm:text-lg">
            Lost-wax investment castings and five-axis CNC components delivered ready for assembly to
            German and North American OEM lines.
          </p>

          <div className="mt-9">
            <Link
              href="#quote"
              className="inline-flex items-center justify-center bg-molten px-7 py-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-graphite transition-colors hover:bg-molten-hover sm:text-sm"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
