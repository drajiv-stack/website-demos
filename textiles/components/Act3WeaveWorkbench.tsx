'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  SEASONAL_COLOURWAYS,
  type Locale,
} from '@/lib/products';
import { useShowroom } from '@/lib/swatch-context';

interface WeaveCard {
  id: string;
  code: string;
  name_en: string;
  name_de: string;
  spec_en: string;
  spec_de: string;
  macro_url: string;
  rotateDeg: number;
  shiftX: number;
  shiftY: number;
}

const WEAVE_FAN_CARDS: WeaveCard[] = [
  {
    id: 'percale',
    code: '01',
    name_en: 'Cotton Percale',
    name_de: 'Perkal-Baumwolle',
    spec_en: '1-over-1 matte plain weave',
    spec_de: '1:1 mattes Leinwandgewebe',
    macro_url: '/images/weaves/macro-percale.webp',
    rotateDeg: -9,
    shiftX: -18,
    shiftY: 8,
  },
  {
    id: 'linen',
    code: '02',
    name_en: 'European Flax',
    name_de: 'Europäisches Leinen',
    spec_en: 'Slub yarn with enzyme tumble',
    spec_de: 'Flachsgarn enzymgewaschen',
    macro_url: '/images/weaves/macro-linen.webp',
    rotateDeg: -3,
    shiftX: -6,
    shiftY: 2,
  },
  {
    id: 'waffle',
    code: '03',
    name_en: 'Waffle Piqué',
    name_de: 'Waffelpikée',
    spec_en: 'Cellular pocket weave',
    spec_de: 'Waffel-Strukturgewebe',
    macro_url: '/images/weaves/macro-waffle.webp',
    rotateDeg: 3,
    shiftX: 6,
    shiftY: 2,
  },
  {
    id: 'boucle',
    code: '04',
    name_en: 'Slub Bouclé',
    name_de: 'Bouclé-Gewebe',
    spec_en: 'Looped rapier weave',
    spec_de: 'Schlingengewebe',
    macro_url: '/images/weaves/macro-boucle.webp',
    rotateDeg: 9,
    shiftX: 18,
    shiftY: 8,
  },
];

export function Act3WeaveWorkbench({ lang }: { lang: Locale }) {
  const outerRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const [selectedColourId, setSelectedColourId] = useState<string>(
    SEASONAL_COLOURWAYS[0].id
  );
  const [selectedWeaveId, setSelectedWeaveId] = useState<string>(
    WEAVE_FAN_CARDS[1].id
  );
  const [loupePos, setLoupePos] = useState<{ x: number; y: number }>({
    x: 62,
    y: 48,
  });

  const { setActiveThreadHex, toggleSwatch, hasSwatch } = useShowroom();

  const activeColour =
    SEASONAL_COLOURWAYS.find((c) => c.id === selectedColourId) ??
    SEASONAL_COLOURWAYS[0];
  const activeWeave =
    WEAVE_FAN_CARDS.find((w) => w.id === selectedWeaveId) ??
    WEAVE_FAN_CARDS[1];

  const swatchPinId = `workbench-${activeWeave.id}-${activeColour.id}`;
  const isPinned = hasSwatch(swatchPinId);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (
      prefersReduced ||
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
            if (!isMounted || !pinWrapRef.current) return;
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
              const cards = gsap.utils.toArray<HTMLElement>('[data-fan-card]');
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: pinWrapRef.current,
                  pin: isDesktop,
                  start: isDesktop ? 'top top' : 'top 75%',
                  end: isDesktop ? '+=115%' : 'bottom 40%',
                  scrub: 0.45,
                  invalidateOnRefresh: true,
                },
              });

              cards.forEach((card, idx) => {
                const cfg = WEAVE_FAN_CARDS[idx];
                if (!cfg) return;
                tl.fromTo(
                  card,
                  { rotation: 0, x: 0, y: 0 },
                  {
                    rotation: cfg.rotateDeg,
                    x: cfg.shiftX,
                    y: cfg.shiftY,
                    duration: 0.7,
                    ease: 'power2.out',
                  },
                  0
                );
              });
            }, outerRef);
          }
        );
      },
      { rootMargin: '0px', threshold: 0.15 }
    );

    io.observe(el);

    return () => {
      isMounted = false;
      io.disconnect();
      ctx?.revert();
    };
  }, []);

  const handleColourSelect = (c: (typeof SEASONAL_COLOURWAYS)[number]) => {
    setSelectedColourId(c.id);
    setActiveThreadHex(c.hex);
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(86, Math.max(14, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(84, Math.max(16, ((e.clientY - rect.top) / rect.height) * 100));
    setLoupePos({ x, y });
  };

  return (
    <section
      id="weave-workbench"
      ref={outerRef}
      aria-labelledby="weave-workbench-heading"
      className="ink-weave-surface relative border-b border-stone/35 bg-ink text-linen"
    >
      <div
        ref={pinWrapRef}
        className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:py-20 lg:px-8"
      >
        {/* Header */}
        <div className="mb-10 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone">
              {lang === 'de'
                ? 'FARBKARTEN & 4× GEWEBELUPE'
                : 'VAT-DYED SHADES & 4× LOUPE'}
            </p>
            <h2
              id="weave-workbench-heading"
              className="mt-2 font-display text-3xl font-normal leading-tight text-linen sm:text-5xl"
            >
              {lang === 'de' ? (
                <>
                  Sechs Küpenfarben.{' '}
                  <span className="italic text-stone">Vier Bindungen.</span>
                </>
              ) : (
                <>
                  Six vat-dyed shades.{' '}
                  <span className="italic text-stone">Four weaves.</span>
                </>
              )}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-stone sm:text-base">
              {lang === 'de'
                ? 'Küpengefärbte Töne ab 300 Sets† pro Farbe.'
                : 'Seasonal vat-dyed shades from 300 sets† per colourway.'}
            </p>
          </div>
        </div>

        {/* Split Workbench: Left Fanning Fabric Hanger (5 cols) + Right Colourway Stage & 4x Macro Loupe (7 cols) */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left 5-Col Fanning Fabric Swatch Stack */}
          <div className="lg:col-span-5">
            <div className="rounded-sm border border-stone/25 bg-ink-deep/90 p-5">
              {/* Top Brass/Indigo Binding Ring */}
              <div className="mb-4 flex items-center justify-between border-b border-stone/20 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3.5 w-3.5 rounded-full border-2 border-linen"
                    style={{ backgroundColor: activeColour.hex }}
                  />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">
                    {lang === 'de' ? 'GEWEBE-FÄCHER' : 'SWATCH HANGER'}
                  </span>
                </div>
                <span className="text-[11px] text-stone">
                  {activeColour.pantone_ref}
                </span>
              </div>

              {/* Fanning Cards Container */}
              <div className="relative mx-auto my-4 flex flex-col gap-2.5">
                {WEAVE_FAN_CARDS.map((card) => {
                  const isSelected = card.id === activeWeave.id;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      data-fan-card
                      onClick={() => setSelectedWeaveId(card.id)}
                      aria-pressed={isSelected}
                      className={`group flex items-center gap-3.5 rounded-xs border p-3 text-left transition-colors will-change-transform ${
                        isSelected
                          ? 'border-linen bg-linen text-ink shadow-lg'
                          : 'border-stone/25 bg-ink/80 text-linen hover:border-stone/60'
                      }`}
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xs border border-stone/40">
                        <Image
                          src={card.macro_url}
                          alt={lang === 'de' ? card.name_de : card.name_en}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                        <div
                          className="absolute inset-0 mix-blend-multiply opacity-55"
                          style={{ backgroundColor: activeColour.hex }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span
                          className={`block text-[10px] font-bold uppercase tracking-[0.18em] ${
                            isSelected ? 'text-indigo' : 'text-stone'
                          }`}
                        >
                          {card.code}
                        </span>
                        <span className="block truncate font-display text-lg font-medium">
                          {lang === 'de' ? card.name_de : card.name_en}
                        </span>
                        <span
                          className={`block truncate text-xs ${
                            isSelected ? 'text-stone-dark' : 'text-stone'
                          }`}
                        >
                          {lang === 'de' ? card.spec_de : card.spec_en}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 7-Col Colourway Crossfader + Interactive 4x Macro Weave Loupe */}
          <div className="lg:col-span-7">
            {/* Main Draped Fabric Viewport with Interactive 4x Loupe */}
            <div
              onMouseMove={handlePointerMove}
              className="relative aspect-16/10 w-full cursor-crosshair overflow-hidden rounded-sm border border-stone/35 bg-ink-deep shadow-2xl"
            >
              {SEASONAL_COLOURWAYS.map((c) => {
                const isCurrent = c.id === activeColour.id;
                return (
                  <div
                    key={c.id}
                    className={`absolute inset-0 transition-all duration-500 ${
                      isCurrent ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                    }`}
                  >
                    <Image
                      src={c.image_url}
                      alt={lang === 'de' ? c.name_de : c.name_en}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                );
              })}

              {/* Interactive Circular 4x Macro Weave Magnifier Loupe (transform only) */}
              <div
                aria-hidden="true"
                style={{
                  left: `${loupePos.x}%`,
                  top: `${loupePos.y}%`,
                  borderColor: activeColour.hex,
                }}
                className="pointer-events-none absolute h-36 w-36 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 bg-ink shadow-[0_12px_40px_rgba(0,0,0,0.65)] ring-2 ring-linen/80 sm:h-44 sm:w-44"
              >
                <Image
                  src={activeWeave.macro_url}
                  alt=""
                  fill
                  sizes="180px"
                  className="scale-150 object-cover"
                />
                {/* Crosshair inside the 4x Loupe */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-[1px] bg-linen/45" />
                  <div className="absolute h-[1px] w-full bg-linen/45" />
                </div>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-ink/85 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-linen">
                  4× LOUPE
                </span>
              </div>

              {/* Bottom Telemetry Strip */}
              <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 rounded-xs bg-ink/85 px-4 py-2 text-xs text-linen backdrop-blur-xs">
                <span>
                  {lang === 'de' ? activeWeave.name_de : activeWeave.name_en} ·{' '}
                  <strong>{lang === 'de' ? activeColour.name_de : activeColour.name_en}</strong>
                </span>
                <span className="text-stone">
                  {activeColour.pantone_ref} · MOQ 300 sets†
                </span>
              </div>
            </div>

            {/* 6 Seasonal Vat-Dyed Colourway Swatch Bar + Pin Button */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-stone/25 bg-ink-deep/90 p-4">
              <div
                role="radiogroup"
                aria-label={lang === 'de' ? 'Farbton wählen' : 'Select colourway'}
                className="flex flex-wrap items-center gap-2.5"
              >
                {SEASONAL_COLOURWAYS.map((c) => {
                  const selected = c.id === activeColour.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => handleColourSelect(c)}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                        selected
                          ? 'border-linen bg-linen text-ink shadow-sm'
                          : 'border-stone/35 bg-ink text-linen hover:border-stone'
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-ink/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{lang === 'de' ? c.name_de : c.name_en}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() =>
                  toggleSwatch({
                    id: swatchPinId,
                    label_en: `${activeWeave.name_en}`,
                    label_de: `${activeWeave.name_de}`,
                    colour_en: activeColour.name_en,
                    colour_de: activeColour.name_de,
                    hex: activeColour.hex,
                  })
                }
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isPinned
                    ? 'border border-linen bg-linen/15 text-linen'
                    : 'bg-linen text-ink hover:bg-stone'
                }`}
              >
                {isPinned
                  ? lang === 'de'
                    ? '✓ Im Musterbuch'
                    : '✓ In Swatch Book'
                  : lang === 'de'
                    ? '+ Farbton zum Musterbuch'
                    : '+ Pin Shade to Swatch Book'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
