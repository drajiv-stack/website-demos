'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  COUNTRY_SHOWROOMS,
  type Locale,
} from '@/lib/products';
import { useShowroom } from '@/lib/swatch-context';

export function Act1AtelierStage({ lang }: { lang: Locale }) {
  const outerRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const macroLayerRef = useRef<HTMLDivElement>(null);
  const roomFrameRef = useRef<HTMLDivElement>(null);
  const { region, setRegion, activeThreadHex } = useShowroom();
  const [mountVideo, setMountVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const activeShowroom =
    COUNTRY_SHOWROOMS.find((c) => c.code === region) ??
    (lang === 'de' ? COUNTRY_SHOWROOMS[0] : COUNTRY_SHOWROOMS[1]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktopMq = window.matchMedia('(min-width: 768px)').matches;
    setIsMobile(!desktopMq);

    if (prefersReduced) return;

    const videoTimer = window.setTimeout(
      () => setMountVideo(true),
      desktopMq ? 150 : 3500
    );

    let ctx: { revert: () => void } | undefined;

    const gsapTimer = window.setTimeout(
      () => {
        Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
          ([{ gsap }, { ScrollTrigger }]) => {
            if (!outerRef.current || !pinWrapRef.current) return;
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: pinWrapRef.current,
                  pin: desktopMq,
                  start: 'top top',
                  end: desktopMq ? '+=110%' : 'bottom top',
                  scrub: 0.45,
                  invalidateOnRefresh: true,
                },
              });

              // Unfold Macro Weave layer (opacity 0.72 -> 0, scale 1 -> 1.16) to reveal the sunlit bedroom video
              if (macroLayerRef.current) {
                tl.fromTo(
                  macroLayerRef.current,
                  { opacity: 0.68, scale: 1 },
                  { opacity: 0, scale: 1.16, duration: 0.7, ease: 'power2.out' },
                  0
                );
              }

              // Subtle zoom on the bedroom frame (starts at scale 1 so initial LCP is never invalidated)
              if (roomFrameRef.current) {
                tl.fromTo(
                  roomFrameRef.current,
                  { scale: 1 },
                  { scale: 1.12, duration: 1, ease: 'none' },
                  0
                );
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
      id="atelier-stage"
      ref={outerRef}
      className="linen-weave-surface relative border-b border-stone/45 bg-linen text-ink lg:pl-16"
    >
      <div
        ref={pinWrapRef}
        className="mx-auto flex min-h-[90svh] max-w-7xl flex-col justify-between px-4 py-8 sm:px-6 lg:py-10 lg:px-8"
      >
        {/* Top Country Showroom Gate with Visual Thumbnails */}
        <div className="mb-6 rounded-sm border border-stone/60 bg-alabaster/90 p-3 shadow-2xs sm:p-4">
          <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: activeThreadHex }}
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-dark">
                {lang === 'de'
                  ? 'AKT I · LÄNDER-SHOWROOM & KONFEKTIONSGRÖSSEN WÄHLEN'
                  : 'ACT I · SELECT COUNTRY SHOWROOM, LANGUAGE & REGIONAL BED SIZING'}
              </span>
            </div>
            <span className="text-xs font-medium text-indigo">
              {lang === 'de'
                ? `Aktiv: ${activeShowroom.country_de} (${activeShowroom.duvet_size})`
                : `Active: ${activeShowroom.country_en} (${activeShowroom.duvet_size})`}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {COUNTRY_SHOWROOMS.map((c) => {
              const isSelected = c.code === region;
              return (
                <Link
                  key={c.code}
                  href={c.href}
                  onClick={() => setRegion(c.code)}
                  className={`group flex items-center gap-3 rounded-xs border p-2 transition-all ${
                    isSelected
                      ? 'border-indigo bg-indigo-soft/60 shadow-2xs'
                      : 'border-stone/45 bg-linen/70 hover:border-indigo/60 hover:bg-alabaster'
                  }`}
                >
                  <div className="relative h-12 w-18 shrink-0 overflow-hidden rounded-xs border border-stone/40">
                    <Image
                      src={c.thumbnail}
                      alt={lang === 'de' ? c.country_de : c.country_en}
                      fill
                      sizes="72px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{c.flag}</span>
                      <span className="truncate text-xs font-semibold text-ink">
                        {lang === 'de' ? c.country_de : c.country_en}
                      </span>
                      <span
                        className={`ml-auto rounded-xs px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                          isSelected
                            ? 'bg-indigo text-alabaster'
                            : 'bg-stone/35 text-ink'
                        }`}
                      >
                        {c.lang.toUpperCase()}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[11px] font-medium text-indigo">
                      {c.duvet_size}
                    </p>
                    <p className="truncate text-[10px] text-stone-dark">
                      {c.incoterm}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Split-Frame Atelier Stage: Left Editorial Column (5 cols) + Right Unfolding Macro-to-Room Viewport (7 cols) */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left 5-Col Editorial Story */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo/30 bg-indigo-soft/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo">
              <span>{activeShowroom.flag}</span>
              <span>
                {lang === 'de'
                  ? `${activeShowroom.city_de} · ${activeShowroom.incoterm}`
                  : `${activeShowroom.city_en} · ${activeShowroom.incoterm}`}
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl font-normal leading-[1.06] tracking-tight text-ink sm:text-5xl xl:text-6xl">
              {lang === 'de' ? (
                <>
                  Gewebt in Karur.{' '}
                  <span className="italic text-indigo">
                    Maßgeschneidert für Europa &amp; Übersee.
                  </span>
                </>
              ) : (
                <>
                  Woven in Karur.{' '}
                  <span className="italic text-indigo">
                    Tailored for Hamburg, Rotterdam &amp; Melbourne.
                  </span>
                </>
              )}
            </h1>

            {/* Max ~40 words body text per Content Diet */}
            <p className="mt-5 max-w-md text-base leading-relaxed text-stone-dark sm:text-lg">
              {lang === 'de'
                ? 'Private-Label-Bettwäsche, Frottier und Tischwäsche aus Bio-Baumwolle und europäischem Flachs – küpengefärbt, konfektioniert und einzelhandelsfertig verpackt.'
                : 'Private-label bed, bath and table linen in organic cotton and European flax, vat-dyed and cut to your country’s retail dimensions.'}
            </p>

            {/* Regional Size Context Pill */}
            <div className="mt-5 rounded-xs border-l-2 border-indigo bg-alabaster px-4 py-2.5 text-xs">
              <span className="font-semibold uppercase tracking-wider text-indigo">
                {lang === 'de' ? 'Standardmaß für Ihren Markt: ' : 'Active Market Cut: '}
              </span>
              <span className="font-medium text-ink">
                {activeShowroom.duvet_size} ({activeShowroom.pillow_size})
              </span>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="#quote"
                className="inline-flex items-center justify-center rounded-full bg-indigo px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-alabaster transition-colors hover:bg-indigo-hover sm:text-sm"
              >
                {lang === 'de' ? 'Angebot & Musterbuch' : 'Request a quote'}
              </Link>
              <Link
                href="#room-explorer"
                className="inline-flex items-center justify-center rounded-full border border-ink/25 bg-alabaster px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-indigo hover:text-indigo sm:text-sm"
              >
                {lang === 'de' ? 'Raum erkunden ↓' : 'Shop the Room ↓'}
              </Link>
            </div>
          </div>

          {/* Right 7-Col Unfolding Macro-to-Room Viewport */}
          <div className="lg:col-span-7">
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-sm border border-stone/60 bg-ink shadow-xl">
              {/* Layer 1: Sunlit Styled Bedroom Poster + Video */}
              <div
                ref={roomFrameRef}
                className="absolute inset-0 will-change-transform"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero/hero-bedroom-poster.webp"
                  alt={
                    lang === 'de'
                      ? 'Sonnendurchflutetes Schlafzimmer mit gewaschener Perkal- und Leinenbettwäsche von NoolWeave Exports'
                      : 'Sunlit bedroom dressed in washed organic percale and European flax linen bedding by NoolWeave Exports'
                  }
                  width={1120}
                  height={720}
                  fetchPriority="high"
                  decoding="sync"
                  className="h-full w-full object-cover object-center"
                />

                {mountVideo && (
                  <video
                    muted
                    playsInline
                    loop
                    autoPlay
                    preload="metadata"
                    poster="/images/hero/hero-bedroom-poster.webp"
                    onLoadedData={() => setVideoReady(true)}
                    onCanPlay={() => setVideoReady(true)}
                    aria-hidden="true"
                    className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                      videoReady ? 'opacity-95' : 'opacity-0'
                    }`}
                  >
                    {isMobile ? (
                      <source src="/video/hero-bedroom-mobile.mp4" type="video/mp4" />
                    ) : (
                      <>
                        <source src="/video/hero-bedroom-desktop.webm" type="video/webm" />
                        <source src="/video/hero-bedroom-desktop.mp4" type="video/mp4" />
                      </>
                    )}
                  </video>
                )}
              </div>

              {/* Layer 2: Unfolding Macro Weave Texture Overlay (fades out on scroll to reveal the room) */}
              <div
                ref={macroLayerRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 overflow-hidden will-change-transform"
                style={{ opacity: 0.65 }}
              >
                <Image
                  src="/images/weaves/macro-linen.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover mix-blend-multiply opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink/55 via-transparent to-indigo/25" />
              </div>

              {/* Layer 3: Floating Macro Thread-Count Reticle Badge (1 number per section: 200 TC†) */}
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 rounded-xs border border-alabaster/30 bg-ink/80 px-4 py-2.5 text-alabaster backdrop-blur-xs">
                <div className="flex items-center gap-2.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-alabaster animate-pulse" />
                  <span className="text-xs font-medium tracking-wide">
                    {lang === 'de'
                      ? 'MAKRO-GEWEBE → RAUMANSICHT (BEIM SCROLLEN)'
                      : 'MACRO WEAVE → SUNLIT ROOM (SCROLL TO UNFOLD)'}
                  </span>
                </div>
                <span className="rounded-xs bg-indigo px-2.5 py-0.5 text-xs font-semibold tracking-wider text-alabaster">
                  200 TC† · LONG-STAPLE PERCALE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
