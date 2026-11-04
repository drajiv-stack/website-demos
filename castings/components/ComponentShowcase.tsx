'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { PRODUCTS } from '@/lib/products';

const BENTO_SPANS = [
  'md:col-span-6 lg:col-span-6 aspect-[16/10]',
  'md:col-span-6 lg:col-span-6 aspect-[16/10]',
  'md:col-span-4 lg:col-span-4 aspect-[4/3]',
  'md:col-span-4 lg:col-span-4 aspect-[4/3]',
  'md:col-span-4 lg:col-span-4 aspect-[4/3]',
  'md:col-span-4 lg:col-span-4 aspect-[4/3]',
  'md:col-span-4 lg:col-span-4 aspect-[4/3]',
  'md:col-span-4 lg:col-span-4 aspect-[4/3]',
];

export function ComponentShowcase() {
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
              // Staggered card scale & fade entrance
              const cards = gsap.utils.toArray<HTMLElement>('[data-bento-card]');
              gsap.fromTo(
                cards,
                { y: 36, opacity: 0, scale: 0.96 },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.65,
                  stagger: 0.08,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 78%',
                  },
                }
              );

              // Scroll parallax on each card's inner image
              const parallaxImages = gsap.utils.toArray<HTMLElement>('[data-bento-parallax]');
              parallaxImages.forEach((imgWrap, idx) => {
                const travel = idx % 2 === 0 ? -24 : 24;
                gsap.fromTo(
                  imgWrap,
                  { y: -travel, scale: 1.12 },
                  {
                    y: travel,
                    scale: 1.12,
                    ease: 'none',
                    scrollTrigger: {
                      trigger: imgWrap.parentElement,
                      start: 'top bottom',
                      end: 'bottom top',
                      scrub: 0.4,
                    },
                  }
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

  return (
    <section
      id="components"
      ref={sectionRef}
      aria-labelledby="components-heading"
      className="cad-grid-light border-b border-graphite/15 bg-paper py-20 text-graphite sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-molten-hover">
              02 // MACHINED EXPORT MATRIX
            </p>
            <h2
              id="components-heading"
              className="mt-2 font-display-expanded text-3xl font-bold uppercase tracking-tight text-graphite sm:text-5xl"
            >
              Eight† core export geometries.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-graphite/80 sm:text-base">
            Valve bodies, impellers, flanges and structural brackets poured in stainless steel,
            carbon steel, ductile iron and aluminium.
          </p>
        </div>

        {/* 21st.dev Asymmetric Technical Bento Matrix with Scroll Parallax & Zoom */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12">
          {PRODUCTS.map((product, index) => {
            const spanClass = BENTO_SPANS[index] ?? 'md:col-span-4 aspect-[4/3]';
            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                data-bento-card
                className={`group relative overflow-hidden border border-graphite/25 bg-graphite ${spanClass}`}
              >
                {/* Parallax & Hover-Zoom Image Layer */}
                <div
                  data-bento-parallax
                  className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-120 will-change-transform"
                >
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 560px"
                    className="object-cover opacity-75 transition-opacity duration-500 group-hover:opacity-95"
                  />
                </div>

                {/* Dark Technical Vignette */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute inset-0
                    bg-gradient-to-t from-graphite-deep via-graphite-deep/45 to-transparent
                  "
                />

                {/* Top CAD Telemetry Tag + Crosshair */}
                <div className="relative z-10 flex items-center justify-between p-4 sm:p-5">
                  <span className="border border-steel/40 bg-graphite-deep/85 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-molten backdrop-blur-xs">
                    {product.partNumber}
                  </span>
                  <span className="border border-steel/30 bg-graphite-deep/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-paper/85 backdrop-blur-xs">
                    {product.process}
                  </span>
                </div>

                {/* Bottom Component Title & Slide-Up Spec Strip */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
                    {product.material}
                  </p>
                  <div className="mt-1 flex items-end justify-between gap-3">
                    <h3 className="font-display-expanded text-lg font-bold uppercase leading-tight text-paper sm:text-2xl">
                      {product.name}
                    </h3>
                    <span className="shrink-0 border border-molten bg-molten px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-graphite transition-transform duration-300 group-hover:translate-x-1">
                      Inspect →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
