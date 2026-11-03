'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { FARM_TO_PORT_STEPS } from '@/lib/products';

export function FarmToPortSection() {
  const outerRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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
              const totalPanels = FARM_TO_PORT_STEPS.length;
              gsap.to(trackRef.current, {
                xPercent: -100 * ((totalPanels - 1) / totalPanels),
                ease: 'none',
                scrollTrigger: {
                  trigger: pinWrapRef.current,
                  pin: true,
                  scrub: 0.6,
                  start: 'top top',
                  end: () => `+=${window.innerWidth * 2.4}`,
                  invalidateOnRefresh: true,
                },
              });
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
      ref={outerRef}
      aria-labelledby="farm-to-port-heading"
      className="relative overflow-hidden bg-espresso-deep text-cream"
    >
      <h2 id="farm-to-port-heading" className="sr-only">
        Four steps from hill to hull.
      </h2>

      {/* Inner pin wrapper so ScrollTrigger's pin-spacer stays strictly inside <section> and never conflicts with React's root unmount */}
      <div ref={pinWrapRef} className="w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col md:h-svh md:w-[400vw] md:flex-row"
        >
          {FARM_TO_PORT_STEPS.map((item) => (
            <article
              key={item.step}
              className="relative flex min-h-[72svh] w-full items-end overflow-hidden p-6 sm:p-12 md:h-svh md:w-screen md:shrink-0 lg:p-20"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="100vw"
                className="object-cover brightness-75 contrast-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-espresso-deep via-espresso-deep/55 to-transparent"
              />

              <div className="relative z-10 flex w-full max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <span className="block font-display text-6xl font-semibold leading-none text-turmeric sm:text-8xl lg:text-9xl tabular-nums">
                    {item.step}
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-cream sm:text-5xl">
                    {item.title}
                  </h3>
                </div>

                <p className="max-w-md text-base leading-relaxed text-sand sm:text-xl">
                  {item.line}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
