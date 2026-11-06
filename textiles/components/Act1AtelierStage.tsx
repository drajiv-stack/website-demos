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

    const videoTimer = window.setTimeout(
      () => setMountVideo(true),
      desktopMq ? 120 : 3500
    );

    if (prefersReduced || !desktopMq) return () => window.clearTimeout(videoTimer);

    let ctx: { revert: () => void } | undefined;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!outerRef.current || !pinWrapRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinWrapRef.current,
              pin: true,
              start: 'top top',
              end: '+=110%',
              scrub: 0.45,
              invalidateOnRefresh: true,
            },
          });

          // Unfold Macro Weave layer to reveal the sunlit bedroom on scroll
          if (macroLayerRef.current) {
            tl.fromTo(
              macroLayerRef.current,
              { opacity: 0.68, scale: 1 },
              { opacity: 0, scale: 1.16, duration: 0.7, ease: 'power2.out' },
              0
            );
          }

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

    return () => {
      window.clearTimeout(videoTimer);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="atelier-stage"
      ref={outerRef}
      className="linen-weave-surface relative border-b border-stone/45 bg-linen py-16 text-ink sm:py-24"
    >
      <div
        ref={pinWrapRef}
        className="mx-auto flex min-h-[85svh] max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8"
      >
        {/* Split-Frame Atelier Stage: Left Editorial Column (5 cols) + Right Unfolding Macro-to-Room Viewport (7 cols) */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left 5-Col Editorial Story */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo/30 bg-indigo-soft/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo">
              <span>{activeShowroom.flag}</span>
              <span>
                {lang === 'de'
                  ? activeShowroom.city_de
                  : activeShowroom.city_en}
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl font-normal leading-[1.06] tracking-tight text-ink sm:text-5xl xl:text-6xl">
              {lang === 'de' ? (
                <>
                  Gewebt in Karur.{' '}
                  <span className="italic text-indigo">
                    Für Übersee.
                  </span>
                </>
              ) : (
                <>
                  Woven in Karur.{' '}
                  <span className="italic text-indigo">
                    Tailored for Overseas Retail.
                  </span>
                </>
              )}
            </h1>

            {/* Strict Content Diet: under 35 words */}
            <p className="mt-5 max-w-md text-base leading-relaxed text-stone-dark sm:text-lg">
              {lang === 'de'
                ? 'Bio-Baumwolle und Reinleinen – küpengefärbt und verkaufsfertig konfektioniert.'
                : 'Organic cotton and pure flax bedding – vat-dyed and cut to your store sizes.'}
            </p>

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
              {/* Layer 1: Macro-to-Room Photography Visual */}
              <div
                ref={roomFrameRef}
                className="absolute inset-0 will-change-transform"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero/hero-macro-to-room.webp"
                  alt={
                    lang === 'de'
                      ? 'Reine Leinenbettwäsche von NoolWeave Exports in sonnigem Schlafzimmer'
                      : 'Belgian flax linen bedding and weave detail by NoolWeave Exports'
                  }
                  width={1280}
                  height={720}
                  fetchPriority="high"
                  decoding="sync"
                  className={`h-full w-full object-cover object-center transition-opacity duration-700 ${
                    videoReady ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                {mountVideo && (
                  <video
                    muted
                    playsInline
                    loop
                    autoPlay
                    preload="metadata"
                    poster="/images/hero/hero-macro-to-room.webp"
                    onLoadedData={() => setVideoReady(true)}
                    onCanPlay={() => setVideoReady(true)}
                    aria-hidden="true"
                    className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                      videoReady ? 'opacity-100' : 'opacity-0'
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
                style={{ opacity: 0.55 }}
              >
                <Image
                  src="/images/weaves/macro-linen.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover mix-blend-multiply opacity-65"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink/40 via-transparent to-indigo/20" />
              </div>

              {/* Bottom Telemetry Strip */}
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 rounded-xs border border-alabaster/30 bg-ink/80 px-4 py-2.5 text-alabaster backdrop-blur-xs">
                <div className="flex items-center gap-2.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-alabaster animate-pulse" />
                  <span className="text-xs font-medium tracking-wide">
                    {lang === 'de'
                      ? 'MAKRO-GEWEBE → RAUMANSICHT'
                      : 'MACRO WEAVE → SUNLIT ROOM'}
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
