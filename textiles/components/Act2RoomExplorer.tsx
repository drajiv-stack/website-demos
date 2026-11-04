'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  COUNTRY_SHOWROOMS,
  ROOM_HOTSPOTS,
  type Locale,
} from '@/lib/products';
import { useShowroom } from '@/lib/swatch-context';

export function Act2RoomExplorer({ lang }: { lang: Locale }) {
  const [activePinId, setActivePinId] = useState<string>(ROOM_HOTSPOTS[0].id);
  const { region, activeThreadHex, toggleSwatch, hasSwatch } = useShowroom();

  const activePin =
    ROOM_HOTSPOTS.find((h) => h.id === activePinId) ?? ROOM_HOTSPOTS[0];
  const activeShowroom =
    COUNTRY_SHOWROOMS.find((c) => c.code === region) ?? COUNTRY_SHOWROOMS[0];

  const swatchItemId = `room-${activePin.productSlug}`;
  const isPinned = hasSwatch(swatchItemId);

  return (
    <section
      id="room-explorer"
      aria-labelledby="room-explorer-heading"
      className="relative border-b border-stone/45 bg-alabaster py-16 text-ink sm:py-24 lg:pl-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="mb-10 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo">
              {lang === 'de'
                ? 'AKT II · INTERAKTIVES RAUM-PANORAMA'
                : 'ACT II · INTERACTIVE ROOM HOTSPOT SHOWROOM'}
            </p>
            <h2
              id="room-explorer-heading"
              className="mt-2 font-display text-3xl font-normal leading-tight text-ink sm:text-5xl"
            >
              {lang === 'de' ? (
                <>
                  Tippen Sie auf einen <span className="italic text-indigo">Indigo-Knoten</span> im Raum.
                </>
              ) : (
                <>
                  Select any <span className="italic text-indigo">Indigo node</span> inside the room.
                </>
              )}
            </h2>
          </div>
          <div className="lg:col-span-5">
            {/* Max ~40 words body text per Content Diet */}
            <p className="text-sm leading-relaxed text-stone-dark sm:text-base">
              {lang === 'de'
                ? 'Prüfen Sie Gewebestruktur und regionale Maße direkt am bezogenen Bett und fügen Sie Handmuster Ihrem persönlichen Musterbuch hinzu.'
                : 'Inspect weave structure and regional cut dimensions directly on the styled bed, then pin fabric cuttings straight to your sample swatch book.'}
            </p>
          </div>
        </div>

        {/* Split Panorama (8 cols) + Tactile Slide-Over Inspection Card (4 cols) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 8-Col Interactive Room Scene with Pulsing Hotspot Pins & Connecting SVG Thread */}
          <div className="lg:col-span-8">
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-sm border border-stone/60 bg-linen shadow-md">
              <Image
                src="/images/hero/room-panorama.webp"
                alt={
                  lang === 'de'
                    ? 'Eingerichtetes Schlafzimmer mit interaktiven Textil-Hotspots'
                    : 'Styled linen bedroom panorama with interactive textile hotspot pins'
                }
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />

              {/* Subtle vignette so pins stand out clearly */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-ink/15"
              />

              {/* Continuous Indigo Thread connecting the 4 Hotspot Pins inside the room */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <polyline
                  points={ROOM_HOTSPOTS.map((p) => `${p.xPercent},${p.yPercent}`).join(' ')}
                  fill="none"
                  stroke={activeThreadHex}
                  strokeWidth="0.45"
                  strokeDasharray="1.5 1.2"
                />
              </svg>

              {/* 4 Interactive Hotspot Pins */}
              {ROOM_HOTSPOTS.map((pin) => {
                const selected = pin.id === activePin.id;
                return (
                  <button
                    key={pin.id}
                    type="button"
                    onClick={() => setActivePinId(pin.id)}
                    onMouseEnter={() => setActivePinId(pin.id)}
                    style={{
                      left: `${pin.xPercent}%`,
                      top: `${pin.yPercent}%`,
                    }}
                    aria-label={lang === 'de' ? pin.title_de : pin.title_en}
                    aria-pressed={selected}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg transition-transform duration-200 ${
                      selected
                        ? 'scale-110 bg-indigo text-alabaster ring-4 ring-alabaster/80'
                        : 'bg-alabaster/95 text-ink hover:scale-105 hover:bg-indigo hover:text-alabaster'
                    }`}
                  >
                    <span className="font-mono text-[11px] font-bold">
                      {pin.pinNumber}
                    </span>
                    <span className="hidden sm:inline">
                      { (lang === 'de' ? pin.title_de : pin.title_en).split(' ').slice(0, 2).join(' ') }
                    </span>
                  </button>
                );
              })}

              {/* Bottom Room Bar */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 rounded-xs bg-alabaster/95 px-3.5 py-2 text-xs text-ink backdrop-blur-xs">
                <span className="font-medium">
                  {lang === 'de'
                    ? '4 Kollektionsstücke im Raum verknüpft'
                    : '4 textile pieces linked along the Indigo Warp Thread'}
                </span>
                <span className="font-semibold text-indigo">
                  {activeShowroom.flag} {activeShowroom.duvet_size}
                </span>
              </div>
            </div>
          </div>

          {/* Right 4-Col Tactile Inspection Drawer */}
          <div className="flex flex-col justify-between rounded-sm border border-stone/60 bg-linen p-6 shadow-xs lg:col-span-4">
            <div>
              <div className="flex items-center justify-between border-b border-stone/45 pb-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo">
                  PIN {activePin.pinNumber} // {lang === 'de' ? 'AUSGEWÄHLT' : 'INSPECTING'}
                </span>
                <span className="rounded-xs bg-indigo-soft px-2.5 py-0.5 text-xs font-semibold text-indigo">
                  {activePin.metric}
                </span>
              </div>

              <div className="relative mt-4 aspect-4/3 w-full overflow-hidden rounded-xs border border-stone/45">
                <Image
                  src={activePin.image}
                  alt={lang === 'de' ? activePin.title_de : activePin.title_en}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover transition-transform duration-500"
                />
              </div>

              <h3 className="mt-4 font-display text-2xl font-normal text-ink">
                {lang === 'de' ? activePin.title_de : activePin.title_en}
              </h3>

              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-stone-dark">
                {lang === 'de' ? activePin.weave_de : activePin.weave_en}
              </p>

              {/* Regional Size Cut Box */}
              <div className="mt-4 rounded-xs border border-stone/50 bg-alabaster p-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-dark">
                    {lang === 'de' ? 'Markt-Konfektion:' : 'Regional Cut:'}
                  </span>
                  <span className="font-semibold text-ink">
                    {activeShowroom.flag} {activeShowroom.duvet_size.split('·')[0]}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-stone-dark">Incoterm:</span>
                  <span className="font-semibold text-indigo">
                    {activeShowroom.incoterm}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() =>
                  toggleSwatch({
                    id: swatchItemId,
                    label_en: `${activePin.title_en} (${activePin.metric})`,
                    label_de: `${activePin.title_de} (${activePin.metric})`,
                    colour_en: 'Mineral Indigo / Raw Flax',
                    colour_de: 'Mineral-Indigo / Rohleinen',
                    hex: activeThreadHex,
                  })
                }
                className={`w-full rounded-full py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                  isPinned
                    ? 'border border-indigo bg-indigo-soft text-indigo'
                    : 'bg-indigo text-alabaster hover:bg-indigo-hover'
                }`}
              >
                {isPinned
                  ? lang === 'de'
                    ? '✓ Im Musterbuch gespeichert'
                    : '✓ Pinned to My Swatch Book'
                  : lang === 'de'
                    ? '+ Handmuster zum Musterbuch hinzufügen'
                    : '+ Add Cutting to My Swatch Book'}
              </button>

              <Link
                href={`/${lang}/products/${activePin.productSlug}`}
                className="w-full rounded-full border border-ink/25 bg-alabaster py-2.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-indigo hover:text-indigo"
              >
                {lang === 'de'
                  ? 'Spezifikation & Farben öffnen →'
                  : 'Open Full Spec & Colourways →'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
