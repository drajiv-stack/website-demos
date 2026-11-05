'use client';

import Image from 'next/image';
import { useState } from 'react';
import { COUNTRY_SHOWROOMS, type Locale } from '@/lib/products';
import { useShowroom } from '@/lib/swatch-context';

type AtelierMode = 'labels' | 'packaging' | 'looms';

export function Act4RetailReadiness({ lang }: { lang: Locale }) {
  const [mode, setMode] = useState<AtelierMode>('labels');
  const { region, activeThreadHex } = useShowroom();

  const activeShowroom =
    COUNTRY_SHOWROOMS.find((c) => c.code === region) ?? COUNTRY_SHOWROOMS[0];

  const tabs: { id: AtelierMode; label_en: string; label_de: string; tag: string }[] = [
    {
      id: 'labels',
      tag: '01',
      label_en: 'Labels & Care Ribbons',
      label_de: 'Etiketten & Pflegebänder',
    },
    {
      id: 'packaging',
      tag: '02',
      label_en: 'Packaging & Barcodes',
      label_de: 'Banderolen & Barcodes',
    },
    {
      id: 'looms',
      tag: '03',
      label_en: 'Loom Hall & Sample Certs',
      label_de: 'Websaal & Muster-Zertifikate',
    },
  ];

  return (
    <section
      id="retail-readiness"
      aria-labelledby="retail-readiness-heading"
      className="linen-weave-surface relative border-b border-stone/45 bg-linen-warm py-20 text-ink sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo">
              {lang === 'de'
                ? 'EIGENMARKEN & WEBSAAL'
                : 'PACKAGING & LOOM HALL'}
            </p>
            <h2
              id="retail-readiness-heading"
              className="mt-2 font-display text-3xl font-normal leading-tight text-ink sm:text-5xl"
            >
              {lang === 'de' ? (
                <>
                  Vom <span className="italic text-indigo">240-Webstuhl-Saal†</span> ins Regal.
                </>
              ) : (
                <>
                  From our <span className="italic text-indigo">240-loom hall†</span> to your shelf.
                </>
              )}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-stone-dark sm:text-base">
              {lang === 'de'
                ? 'Komplett gewebt, genäht und etikettiert nach Ihren Vorgaben.'
                : 'Woven, stitched, and barcoded ready for distribution.'}
            </p>
          </div>
        </div>

        {/* 3-Mode Interactive Switcher Tabs */}
        <div
          role="tablist"
          aria-label={
            lang === 'de'
              ? 'Eigenmarken- und Weberei-Ansichten'
              : 'Private-label and mill views'
          }
          className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {tabs.map((t) => {
            const active = mode === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMode(t.id)}
                className={`flex items-center gap-3 rounded-sm border p-4 text-left transition-all ${
                  active
                    ? 'border-indigo bg-alabaster shadow-sm'
                    : 'border-stone/55 bg-linen/70 hover:border-indigo/50 hover:bg-alabaster/60'
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    active ? 'bg-indigo text-alabaster' : 'bg-stone/40 text-ink'
                  }`}
                >
                  {t.tag}
                </span>
                <span className="text-sm font-semibold text-ink">
                  {lang === 'de' ? t.label_de : t.label_en}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mode Content Panel */}
        <div className="rounded-sm border border-stone/60 bg-alabaster p-6 shadow-sm sm:p-8">
          {mode === 'labels' && (
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="relative aspect-16/10 overflow-hidden rounded-xs border border-stone/50 lg:col-span-7">
                <Image
                  src="/images/atelier/woven-label-care.webp"
                  alt={
                    lang === 'de'
                      ? 'Gewebtes Marken-Halsetikett und zweisprachiges Pflegeetikett'
                      : 'Custom woven jacquard neck label and bilingual wash-care ribbon'
                  }
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Interactive Stitched Care Label Mockup Card */}
              <div className="lg:col-span-5">
                <div
                  className="rounded-xs border-2 border-dashed bg-linen p-6"
                  style={{ borderColor: activeThreadHex }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-indigo">
                    {lang === 'de'
                      ? 'MUSTER-PFLEGEETIKETT · MIT INDIGO-FADEN VERNÄHT'
                      : 'SAMPLE STITCHED CARE LABEL · SEWN ON LINE'}
                  </span>
                  <h3 className="mt-2 font-display text-2xl text-ink">
                    {lang === 'de'
                      ? 'Jacquard-Webetiketten & DE/EN/NL Pflegeband'
                      : 'Jacquard Brand Labels & DE/EN/NL Care Ribbons'}
                  </h3>
                  <div className="mt-4 space-y-2 border-t border-stone/50 pt-4 font-mono text-xs text-ink">
                    <div className="flex justify-between">
                      <span className="text-stone-dark">MARKET CUT:</span>
                      <span className="font-semibold">
                        {activeShowroom.flag} {activeShowroom.duvet_size}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-dark">CARE SYMBOLS:</span>
                      <span className="font-semibold">60°C WASH · TUMBLE LOW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-dark">CLOSURE:</span>
                      <span className="font-semibold">
                        {region === 'de'
                          ? 'VERDECKTER YKK-REISSVERSCHLUSS'
                          : 'HIDDEN ZIP / HOTEL FLAP'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === 'packaging' && (
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="relative aspect-16/10 overflow-hidden rounded-xs border border-stone/50 lg:col-span-7">
                <Image
                  src="/images/atelier/retail-belly-band.webp"
                  alt={
                    lang === 'de'
                      ? 'Gefaltetes Bettwäsche-Set mit Kraftpapier-Banderole und EAN-Barcode'
                      : 'Folded linen bedding set wrapped in kraft belly band with EAN barcode'
                  }
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-5">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
                  {lang === 'de'
                    ? 'PLASTIKFREIE EINZELHANDELS-VERPACKUNG'
                    : 'PLASTIC-FREE SHELF-READY PACKAGING'}
                </span>
                <h3 className="mt-2 font-display text-2xl text-ink">
                  {lang === 'de'
                    ? 'Kraftpapier-Banderolen, Stoffbeutel & EAN-13-Kartons'
                    : 'Kraft Belly Bands, Self-Fabric Bags & EAN-13 Cartons'}
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-3 text-xs">
                  <div className="rounded-xs border border-stone/50 bg-linen p-3.5">
                    <strong className="block text-ink">
                      {lang === 'de'
                        ? '1. Selbststoff-Beutel oder Kraftbanderole'
                        : '1. Self-Fabric Drawstring Bag or Kraft Belly Band'}
                    </strong>
                    <span className="text-stone-dark">
                      {lang === 'de'
                        ? 'Bedruckt mit Ihrem Markenlogo, Maßangabe (z. B. 135×200 cm) und EAN-Barcode.'
                        : 'Printed with your artwork, regional size callout, and scannable EAN-13 barcode.'}
                    </span>
                  </div>
                  <div className="rounded-xs border border-stone/50 bg-linen p-3.5">
                    <strong className="block text-ink">
                      {lang === 'de'
                        ? '2. Feuchtigkeitsgeschützte Export-Umkartons'
                        : '2. Container-Sealed 5-Ply Export Master Cartons'}
                    </strong>
                    <span className="text-stone-dark">
                      {lang === 'de'
                        ? 'Sortenrein oder farbsortiert gepackt für direkte Zentrallager-Anlieferung.'
                        : 'Packed solid-colour or pre-assorted by ratio for direct DC cross-docking.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === 'looms' && (
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              {/* Live Karur Loom Weaving Video Window */}
              <div className="relative aspect-16/10 overflow-hidden rounded-xs border border-stone/50 bg-ink lg:col-span-7">
                <video
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="none"
                  poster="/images/atelier/karur-loom-hall.webp"
                  aria-label={
                    lang === 'de'
                      ? 'Video aus dem Websaal in Karur'
                      : 'Karur loom weaving video'
                  }
                  className="h-full w-full object-cover"
                >
                  <source src="/video/loom-weaving.mp4" type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute bottom-3 left-3 rounded-xs bg-ink/85 px-3 py-1.5 text-xs font-semibold text-linen">
                  {lang === 'de'
                    ? 'LIVE-VIDEO · LUFTDÜSEN- & GREIFERWEBSTÜHLE KARUR'
                    : 'LIVE LOOP · KARUR AIR-JET & RAPIER WEAVING'}
                </div>
              </div>

              {/* 2 Clearly Labelled Sample Certificate Placeholders (Zero real GOTS/OEKO-TEX logos per AGENTS.md) */}
              <div className="space-y-4 lg:col-span-5">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
                  {lang === 'de'
                    ? 'COMPLIANCE & RÜCKVERFOLGBARKEIT (MUSTERPLATZHALTER)'
                    : 'COMPLIANCE & TRACEABILITY (SAMPLE PLACEHOLDERS)'}
                </span>
                <div className="rounded-xs border border-dashed border-indigo/55 bg-linen p-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-xs bg-indigo-soft px-2 py-0.5 text-[10px] font-bold uppercase text-indigo">
                      Sample Certificate — Placeholder Only
                    </span>
                    <span className="font-mono text-xs text-stone-dark">DOC-NW-01</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-ink">
                    {lang === 'de'
                      ? 'Schadstoffgeprüfte Küpenfärbung (Musterzertifikat)'
                      : 'Azo-Free & Skin-Safe Vat Dyeing Audit (Sample Certificate)'}
                  </p>
                  <p className="mt-1 text-xs text-stone-dark">
                    {lang === 'de'
                      ? 'Platzhalter für Laborprüfberichte zur Farb- und Speichelechtheit.'
                      : 'Illustrative placeholder for independent dye-house laboratory test reports.'}
                  </p>
                </div>

                <div className="rounded-xs border border-dashed border-indigo/55 bg-linen p-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-xs bg-indigo-soft px-2 py-0.5 text-[10px] font-bold uppercase text-indigo">
                      Sample Certificate — Placeholder Only
                    </span>
                    <span className="font-mono text-xs text-stone-dark">DOC-NW-02</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-ink">
                    {lang === 'de'
                      ? 'Chargen-Rückverfolgbarkeit Bio-Baumwolle & Flachs (Musterzertifikat)'
                      : 'Lot-Traced Organic Cotton & Flax Chain of Custody (Sample Certificate)'}
                  </p>
                  <p className="mt-1 text-xs text-stone-dark">
                    {lang === 'de'
                      ? 'Platzhalter für Chargen-Zertifikate vom Garnkegel bis zum Exportkarton.'
                      : 'Illustrative placeholder for yarn-lot transaction certificates.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
