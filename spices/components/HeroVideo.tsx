'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export function HeroVideo() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isSeekingRef = useRef(false);
  const targetTimeRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsReducedMotion(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    // Handle seeked event queue to eliminate browser decode lag during scroll
    const onSeeked = () => {
      isSeekingRef.current = false;
      const target = targetTimeRef.current;
      if (video && Math.abs(video.currentTime - target) > 0.04) {
        isSeekingRef.current = true;
        video.currentTime = target;
      }
    };

    video.addEventListener('seeked', onSeeked);

    const requestSeek = (time: number) => {
      targetTimeRef.current = time;
      if (!isSeekingRef.current && video && !isNaN(video.duration) && video.readyState >= 2) {
        isSeekingRef.current = true;
        video.currentTime = time;
      }
    };

    let isMounted = true;
    let ctx: { revert: () => void } | undefined;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!isMounted || !containerRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              setScrollProgress(p);
              const dur = video.duration || 5.0;
              const targetTime = Math.min(dur - 0.05, Math.max(0, p * dur));
              requestSeek(targetTime);
            },
          });
        }, containerRef);
      }
    );

    return () => {
      isMounted = false;
      video.removeEventListener('seeked', onSeeked);
      ctx?.revert();
    };
  }, []);

  if (isReducedMotion) {
    return (
      <section
        id="site-hero"
        aria-labelledby="hero-heading"
        className="grain-surface relative flex min-h-[85svh] w-full items-center overflow-hidden bg-espresso-deep py-24 text-cream"
      >
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/story/hero-poster.webp"
            alt="Single whole green cardamom pod centered on dark espresso surface"
            width={1280}
            height={720}
            fetchPriority="high"
            decoding="sync"
            className="h-full w-full object-cover object-center"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-espresso-deep/15" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-turmeric">
              WESTERN GHATS ORIGIN · SINGLE-ESTATE LOTS
            </p>
            <h1
              id="hero-heading"
              className="mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-cream sm:text-6xl lg:text-7xl"
            >
              Kerala&rsquo;s harvest,{' '}
              <span className="text-turmeric">shipped whole to the world.</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-sand sm:text-lg">
              Single-origin green cardamom, Malabar pepper and warming spices, cleaned, lab-tested and
              container-sealed in Kochi.
            </p>
            <div className="mt-8">
              <Link
                href="#quote"
                className="inline-flex items-center justify-center rounded-sm bg-turmeric px-7 py-3.5 text-sm font-semibold text-espresso transition-colors hover:bg-turmeric-hover"
              >
                Request an export quote ↘
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Active Scrub Stages
  const isStage1 = scrollProgress < 0.35;
  const isStage2 = scrollProgress >= 0.35 && scrollProgress < 0.7;
  const isStage3 = scrollProgress >= 0.7;

  return (
    <section
      id="site-hero"
      ref={containerRef}
      aria-label="Interactive cardamom harvest exploration"
      className="relative h-[400vh] bg-espresso-deep"
    >
      {/* Pinned Viewport */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Cardamom Pod Scrubbed Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster="/images/story/hero-poster.webp"
            onLoadedData={() => setVideoLoaded(true)}
            onCanPlay={() => setVideoLoaded(true)}
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          >
            <source src="/video/cardamom-split-720p.webm" type="video/webm" />
            <source src="/video/cardamom-split-720p.mp4" type="video/mp4" />
          </video>

          {/* 10% dark veil over video for contrast */}
          <div aria-hidden="true" className="absolute inset-0 bg-espresso-deep/10" />
        </div>

        {/* Content Overlays dynamically transitioning on scroll */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Stage 1: Opening Hero (0% - 35% scroll) */}
          <div
            className={`max-w-2xl transition-all duration-500 ease-out ${
              isStage1 ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-8 opacity-0 pointer-events-none absolute'
            }`}
          >
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-turmeric">
              WESTERN GHATS ORIGIN · SINGLE-ESTATE LOTS
            </p>
            <h1
              id="hero-heading"
              className="mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-cream sm:text-6xl lg:text-7xl"
            >
              Kerala&rsquo;s harvest,{' '}
              <span className="text-turmeric">shipped whole to the world.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-sand/90 sm:text-lg">
              Single-origin green cardamom, Malabar pepper and warming spices, cleaned, lab-tested and
              container-sealed in Kochi.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#quote"
                className="inline-flex items-center justify-center rounded-sm bg-turmeric px-7 py-3.5 text-sm font-semibold text-espresso transition-colors hover:bg-turmeric-hover"
              >
                Request an export quote ↘
              </Link>
              <span className="text-xs font-mono uppercase tracking-widest text-sand/60">
                ↓ Scroll to crack pod &amp; inspect seed density
              </span>
            </div>
          </div>

          {/* Stage 2: Pod Cracking / Seed Reveal (35% - 70% scroll) */}
          <div
            className={`max-w-xl rounded-sm border border-sand/20 bg-espresso/80 p-6 backdrop-blur-md transition-all duration-500 ease-out sm:p-8 ${
              isStage2 ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-8 opacity-0 pointer-events-none absolute'
            }`}
          >
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-turmeric">
              GRADE 1 ALLEPPEY EXTRA BOLD (AGEB)
            </span>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-cream sm:text-4xl">
              Whole pods. Fragrant black seeds.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-sand sm:text-base">
              Sun-cured on raised bamboo beds to lock in volatile oils. Pods split under gentle thumb pressure to reveal oily, aromatic seeds.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-sand/15 pt-4 text-center">
              <div>
                <p className="font-mono text-lg font-bold text-turmeric sm:text-xl">8.0 mm+†</p>
                <p className="text-[11px] uppercase tracking-wider text-sand/75">Pod Calibre</p>
              </div>
              <div>
                <p className="font-mono text-lg font-bold text-turmeric sm:text-xl">≥ 6.5%†</p>
                <p className="text-[11px] uppercase tracking-wider text-sand/75">Volatile Oil</p>
              </div>
              <div>
                <p className="font-mono text-lg font-bold text-turmeric sm:text-xl">430 g/L†</p>
                <p className="text-[11px] uppercase tracking-wider text-sand/75">Bulk Density</p>
              </div>
            </div>
          </div>

          {/* Stage 3: Seeds Floating / Container Sealing (70% - 100% scroll) */}
          <div
            className={`max-w-xl rounded-sm border border-sand/25 bg-espresso/85 p-6 backdrop-blur-md transition-all duration-500 ease-out sm:p-8 ${
              isStage3 ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-8 opacity-0 pointer-events-none absolute'
            }`}
          >
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-turmeric">
              CONTAINER SEALING · COLD DRY FREIGHT
            </span>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-cream sm:text-4xl">
              Sampled at source. Ready for sea freight.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-sand sm:text-base">
              Every container lot is fumigated, nitrogen-flushed and accompanied by our batch Certificate of Analysis.
            </p>
            <div className="mt-6">
              <Link
                href="#quote"
                className="inline-flex items-center justify-center rounded-sm bg-turmeric px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-turmeric-hover"
              >
                Request lot pricing &amp; sample COA ↘
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar at Bottom of Pinned Viewport */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 inset-x-0 h-1 bg-sand/15"
        >
          <div
            className="h-full bg-turmeric transition-all duration-100"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
