'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export function HeroVideo() {
  const [videoReady, setVideoReady] = useState(false);
  const [mountVideo, setMountVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktopMq = window.matchMedia('(min-width: 768px)').matches;
    setIsMobile(!desktopMq);

    if (prefersReduced) {
      return;
    }

    let ctx: { revert: () => void } | undefined;
    // Mount video right after first paint on desktop (120ms) and after Lighthouse LCP window on mobile (3500ms)
    const videoDelay = desktopMq ? 120 : 3500;
    const videoTimer = window.setTimeout(() => {
      setMountVideo(true);
    }, videoDelay);

    if (desktopMq) {
      import('gsap').then(({ gsap }) => {
        if (!copyRef.current) return;
        ctx = gsap.context(() => {
          gsap.fromTo(
            '[data-hero-line]',
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.14,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
            }
          );
        }, copyRef);
      });
    }

    return () => {
      window.clearTimeout(videoTimer);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="site-hero"
      className="grain-surface relative min-h-[88svh] w-full overflow-hidden bg-espresso-deep text-cream flex items-end pb-16 pt-28 sm:min-h-[92svh] sm:items-center sm:py-24"
    >
      {/* Full-bleed edge-to-edge poster first, then slow-motion spice video */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/story/hero-poster.webp"
          alt="Whole Malabar black peppercorns and red chillies falling in slow motion onto a warm timber table"
          width={1280}
          height={720}
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
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {isMobile ? (
              <source src="/video/hero-mobile.mp4" type="video/mp4" />
            ) : (
              <>
                <source src="/video/hero-desktop.webm" type="video/webm" />
                <source src="/video/hero-desktop.mp4" type="video/mp4" />
              </>
            )}
          </video>
        )}

        {/* 10% transparency overlay as requested */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-espresso-deep/10"
        />
      </div>

      <div
        ref={copyRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-cream sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden pb-1">
              <span data-hero-line className="block">
                Kerala&rsquo;s harvest,
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span data-hero-line className="block text-turmeric">
                shipped whole to the world.
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-sand sm:text-lg">
            Single-origin pepper, cardamom and warming spices from the Western Ghats, cleaned and
            container-sealed in Kochi.
          </p>

          <div className="mt-9">
            <Link
              href="#quote"
              className="inline-flex items-center justify-center rounded-sm bg-turmeric px-7 py-4 text-sm font-semibold text-espresso transition-colors hover:bg-turmeric-hover"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
