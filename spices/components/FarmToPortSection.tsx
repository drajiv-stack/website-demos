'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FARM_TO_PORT_STEPS } from '@/lib/products';

export function FarmToPortSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (prefersReduced || !isDesktop || !sectionRef.current || !pinTargetRef.current || !('IntersectionObserver' in window)) {
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
            if (!sectionRef.current || !pinTargetRef.current) return;

            ctx = gsap.context(() => {
              ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=160%',
                pin: pinTargetRef.current,
                scrub: 0.35,
                onUpdate: (self) => {
                  const stepIdx = Math.min(
                    FARM_TO_PORT_STEPS.length - 1,
                    Math.floor(self.progress * FARM_TO_PORT_STEPS.length)
                  );
                  setActiveIndex(stepIdx);
                },
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
      aria-labelledby="farm-to-port-heading"
      className="border-b border-sand/60 bg-cream text-espresso"
    >
      <div
        ref={pinTargetRef}
        className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-4 border-b border-sand pb-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-espresso/75">
              Chain of Custody · 4-Stage Traceability
            </p>
            <h2
              id="farm-to-port-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-espresso sm:text-4xl"
            >
              From high-range farm gate to sealed container at Kochi.
            </h2>
          </div>

          {/* Step Counter */}
          <div className="hidden items-center gap-3 lg:flex" aria-live="polite">
            <span className="font-display text-4xl font-semibold text-espresso tabular-nums">
              0{activeIndex + 1}
            </span>
            <span className="text-sm text-espresso/80">/ 0{FARM_TO_PORT_STEPS.length}</span>
          </div>
        </div>

        {/* Desktop Interactive / Pinned Crossfade View */}
        <div className="mt-10 hidden lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center">
          <div className="lg:col-span-5 relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-sand bg-espresso">
            {FARM_TO_PORT_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/90 via-espresso/50 to-transparent p-5 text-cream">
                  <p className="text-xs font-semibold uppercase tracking-wider text-turmeric">
                    Stage {item.step} Verification
                  </p>
                  <p className="mt-1 text-sm font-medium text-cream">{item.metric}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 space-y-4">
            {FARM_TO_PORT_STEPS.map((item, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left rounded-sm border p-6 transition-opacity duration-300 ${
                    isCurrent
                      ? 'border-espresso bg-cream-soft opacity-100 shadow-xs'
                      : 'border-sand/70 bg-cream/60 opacity-65 hover:opacity-95'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-lg font-semibold text-espresso">
                      <span className="mr-2.5 inline-block rounded-sm bg-turmeric px-2 py-0.5 font-sans text-xs font-bold text-espresso tabular-nums">
                        {item.step}
                      </span>
                      {item.title}
                    </span>
                    <span className="text-xs font-medium text-espresso/75">{item.subtitle}</span>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-espresso/85">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile & Reduced-Motion Stacked View (Always readable, no scroll lock) */}
        <ol className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:hidden">
          {FARM_TO_PORT_STEPS.map((item) => (
            <li
              key={item.step}
              className="flex flex-col overflow-hidden rounded-sm border border-sand bg-cream-soft"
            >
              <div className="relative aspect-[4/3] w-full bg-espresso">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 rounded-sm bg-turmeric px-2.5 py-1 text-xs font-bold text-espresso tabular-nums">
                  Step {item.step}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-espresso/80">
                  {item.subtitle}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-espresso">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-espresso/85">
                  {item.description}
                </p>
                <p className="mt-4 border-t border-sand pt-3 text-xs font-semibold text-espresso">
                  {item.metric}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
