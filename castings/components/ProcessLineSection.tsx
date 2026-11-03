'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { PROCESS_STAGES } from '@/lib/products';

export function ProcessLineSection() {
  const outerRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (
      prefersReduced ||
      !isDesktop ||
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
            if (!isMounted || !pinWrapRef.current || !trackRef.current) return;
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
              const totalPanels = PROCESS_STAGES.length;
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: pinWrapRef.current,
                  pin: true,
                  scrub: 0.6,
                  start: 'top top',
                  end: () => `+=${window.innerWidth * 3.2}`,
                  invalidateOnRefresh: true,
                },
              });

              tl.to(
                trackRef.current,
                {
                  xPercent: -100 * ((totalPanels - 1) / totalPanels),
                  ease: 'none',
                },
                0
              );

              if (progressRef.current) {
                tl.fromTo(
                  progressRef.current,
                  { scaleX: 1 / totalPanels },
                  { scaleX: 1, ease: 'none' },
                  0
                );
              }
            }, outerRef);
          }
        );
      },
      { rootMargin: '300px' }
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
      id="process-line"
      ref={outerRef}
      aria-labelledby="process-line-heading"
      className="relative overflow-hidden border-b border-steel/25 bg-graphite text-paper"
    >
      <h2 id="process-line-heading" className="sr-only">
        One roof from wax to crate.
      </h2>

      {/* Inner pin wrapper so ScrollTrigger's pin-spacer stays strictly inside <section> and never conflicts with React's root unmount */}
      <div ref={pinWrapRef} className="relative w-full overflow-hidden">
        {/* Top Molten Progress Bar (Desktop) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden h-1 bg-steel/20 md:block"
        >
          <div
            ref={progressRef}
            className="h-full w-full origin-left scale-x-[0.166] bg-molten"
          />
        </div>

        <div
          ref={trackRef}
          className="flex flex-col md:h-svh md:w-[600vw] md:flex-row"
        >
          {PROCESS_STAGES.map((stage) => (
            <article
              key={stage.step}
              className="relative flex min-h-[68svh] w-full items-end overflow-hidden border-b border-steel/20 p-6 sm:p-12 md:h-svh md:w-screen md:shrink-0 md:border-b-0 md:border-r lg:p-20"
            >
              <Image
                src={stage.image}
                alt={stage.alt}
                fill
                sizes="100vw"
                className="object-cover opacity-55 contrast-110"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/60 to-transparent"
              />

              <div className="relative z-10 flex w-full max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <span className="block font-mono text-6xl font-semibold leading-none text-molten sm:text-8xl lg:text-9xl tabular-nums">
                    {stage.step}
                  </span>
                  <h3 className="mt-4 font-display-expanded text-3xl font-bold uppercase tracking-tight text-paper sm:text-5xl">
                    {stage.title}
                  </h3>
                </div>

                <p className="max-w-md text-base leading-relaxed text-paper/85 sm:text-xl">
                  {stage.line}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
