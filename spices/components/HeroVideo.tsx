'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { WhatsAppButton } from './WhatsAppButton';

export function HeroVideo() {
  const [videoReady, setVideoReady] = useState(false);
  const [mountVideo, setMountVideo] = useState(false);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (prefersReduced || !isDesktop) {
      // On mobile (< 768px) or reduced-motion, serve static HTML + preloaded WebP poster with zero main-thread JS work
      return;
    }

    let ctx: { revert: () => void } | undefined;
    const timer = window.setTimeout(() => {
      setMountVideo(true);
      import('gsap').then(({ gsap }) => {
        if (!copyRef.current) return;
        ctx = gsap.context(() => {
          gsap.fromTo(
            '[data-hero-reveal]',
            { y: 8 },
            {
              y: 0,
              duration: 0.45,
              stagger: 0.06,
              ease: 'power2.out',
              clearProps: 'transform',
            }
          );
        }, copyRef);
      });
    }, 1200);

    return () => {
      window.clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="site-hero"
      className="relative min-h-[82svh] w-full overflow-hidden bg-espresso-deep text-cream flex items-center"
    >
      {/* LCP Poster Image — pre-compressed 66 KB WebP served directly */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/story/hero-poster.webp"
          alt="Whole Malabar black peppercorns, green cardamom pods and dried red chillies tumbling in warm light"
          width={1920}
          height={1080}
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
            poster="/images/story/hero-poster.webp"
            onCanPlay={() => setVideoReady(true)}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-600 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src="/video/hero-desktop.webm" type="video/webm" />
            <source src="/video/hero-desktop.mp4" type="video/mp4" />
          </video>
        )}

        {/* Left-weighted editorial gradient so headline has crisp AA contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-espresso-deep/95 via-espresso/85 to-espresso/35"
        />
      </div>

      <div
        ref={copyRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        <div className="max-w-2xl">
          <p
            data-hero-reveal
            className="inline-flex items-center gap-2 rounded-sm border border-sand/30 bg-espresso/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-turmeric"
          >
            <span>Kochi Port (INCOK) · Idukki &amp; Wayanad Origin</span>
          </p>

          <h1
            data-hero-reveal
            className="mt-5 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-cream sm:text-5xl lg:text-[3.35rem]"
          >
            Whole and ground spices from Kerala&rsquo;s high ranges, lab-tested lot by lot.
          </h1>

          <p
            data-hero-reveal
            className="mt-5 max-w-xl text-base leading-relaxed text-sand sm:text-lg"
          >
            Direct from smallholder collection centres in Idukki and Wayanad to importers,
            private-label packers and food manufacturers across the UAE, UK and USA. Every shipment
            clears steam sterilisation, aflatoxin HPLC and 500+ pesticide residue screening before
            container sealing.
          </p>

          <div data-hero-reveal className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="/contact#rfq-form"
              className="inline-flex items-center justify-center rounded-sm bg-turmeric px-6 py-3.5 text-sm font-semibold text-espresso shadow-sm transition-colors hover:bg-turmeric-hover"
            >
              Request a quote
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-sm border border-sand/50 bg-espresso/70 px-5 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-cream"
            >
              Explore 8 export grades
            </Link>

            <WhatsAppButton
              label="WhatsApp Export Desk"
              className="inline-flex items-center gap-2 rounded-sm border border-turmeric/50 bg-espresso/80 px-4 py-3.5 text-xs font-semibold text-turmeric transition-colors hover:bg-espresso"
            />
          </div>

          <dl
            data-hero-reveal
            className="mt-10 grid grid-cols-2 gap-4 border-t border-sand/25 pt-6 sm:grid-cols-3"
          >
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-sand">
                Standard Lead Time
              </dt>
              <dd className="mt-1 font-display text-xl font-semibold text-cream tabular-nums">
                14–18 Days{' '}
                <span className="block font-sans text-[11px] font-normal text-sand">
                  FOB Kochi (sample figure)
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-sand">
                Pesticide &amp; Mycotoxin
              </dt>
              <dd className="mt-1 font-display text-xl font-semibold text-cream tabular-nums">
                500+ MRL Screen{' '}
                <span className="block font-sans text-[11px] font-normal text-sand">
                  EU / UK / FDA (sample figure)
                </span>
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-sand">
                Container Loadings
              </dt>
              <dd className="mt-1 font-display text-xl font-semibold text-cream tabular-nums">
                LCL &amp; 20&prime;/40&prime; FCL{' '}
                <span className="block font-sans text-[11px] font-normal text-sand">
                  2.2k MT/yr capacity (sample figure)
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
