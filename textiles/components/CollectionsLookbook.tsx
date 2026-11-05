'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  COUNTRY_SHOWROOMS,
  type Locale,
  type RegionCode,
  type TextileProduct,
} from '@/lib/products';
import { useShowroom } from '@/lib/swatch-context';

type Filter = 'All' | TextileProduct['category'];

const FILTERS: { id: Filter; en: string; de: string }[] = [
  { id: 'All', en: 'All pieces', de: 'Alle Stücke' },
  { id: 'Bed', en: 'Bed', de: 'Bettwäsche' },
  { id: 'Bath', en: 'Bath', de: 'Badtextilien' },
  { id: 'Kitchen', en: 'Kitchen & Table', de: 'Tisch & Küche' },
  { id: 'Living', en: 'Living', de: 'Wohnen' },
];

// Asymmetric magazine-spread rhythm: wide / narrow offset / narrow / wide …
const SPREAD = [
  'lg:col-span-7',
  'lg:col-span-5 lg:mt-24',
  'lg:col-span-5',
  'lg:col-span-7 lg:-mt-16',
];

function sizeFor(p: TextileProduct, region: RegionCode) {
  if (region === 'de') return p.specs.sizes_de;
  if (region === 'au') return p.specs.sizes_au;
  return p.specs.sizes_eu;
}

function LookbookCard({
  product,
  lang,
  region,
  spreadClass,
  index,
}: {
  product: TextileProduct;
  lang: Locale;
  region: RegionCode;
  spreadClass: string;
  index: number;
}) {
  const [colourIdx, setColourIdx] = useState(0);
  const colour = product.colourways[colourIdx];
  const image =
    colourIdx === 0 ? product.image_urls[0] : colour?.image_url ?? product.image_urls[0];
  const name = lang === 'de' ? product.name_de : product.name_en;

  return (
    <article className={`group ${spreadClass}`}>
      <Link href={`/${lang}/products/${product.slug}`} className="block">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm border border-stone/55 bg-linen-warm">
          <Image
            key={image}
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <span className="absolute left-3 top-3 rounded-full bg-alabaster/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
            {String(index + 1).padStart(2, '0')} · {lang === 'de' ? product.category_de : product.category}
          </span>
        </div>
      </Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-normal leading-snug text-ink">
            <Link href={`/${lang}/products/${product.slug}`} className="hover:text-indigo">
              {name}
            </Link>
          </h2>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-stone-dark">
            {sizeFor(product, region)}
          </p>
        </div>
        <div
          role="radiogroup"
          aria-label={lang === 'de' ? `Farben für ${name}` : `Colourways for ${name}`}
          className="flex items-center gap-1.5"
        >
          {product.colourways.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={i === colourIdx}
              aria-label={lang === 'de' ? c.name_de : c.name_en}
              title={lang === 'de' ? c.name_de : c.name_en}
              onClick={() => setColourIdx(i)}
              className={`h-6 w-6 rounded-full border-2 transition-transform ${
                i === colourIdx ? 'scale-110 border-ink' : 'border-alabaster hover:scale-105'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export function CollectionsLookbook({
  lang,
  products,
}: {
  lang: Locale;
  products: TextileProduct[];
}) {
  const [filter, setFilter] = useState<Filter>('All');
  const { region, setRegion } = useShowroom();
  const visible = filter === 'All' ? products : products.filter((p) => p.category === filter);

  return (
    <section className="bg-alabaster py-14 sm:py-20 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter + Regional size toggle */}
        <div className="mb-12 flex flex-col gap-4 border-b border-stone/45 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label={lang === 'de' ? 'Kategorie filtern' : 'Filter by category'}
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  filter === f.id
                    ? 'border-indigo bg-indigo text-alabaster'
                    : 'border-stone/70 bg-linen text-ink hover:border-indigo'
                }`}
              >
                {lang === 'de' ? f.de : f.en}
              </button>
            ))}
          </div>
          <div
            role="radiogroup"
            aria-label={lang === 'de' ? 'Regionale Maße' : 'Regional sizes'}
            className="flex items-center gap-1 rounded-full border border-stone/70 bg-linen p-1"
          >
            {COUNTRY_SHOWROOMS.map((c) => (
              <button
                key={c.code}
                type="button"
                role="radio"
                aria-checked={region === c.code}
                onClick={() => setRegion(c.code)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  region === c.code ? 'bg-ink text-alabaster' : 'text-ink/80 hover:text-ink'
                }`}
              >
                {c.flag} {c.code.toUpperCase()} {lang === 'de' ? 'Maße' : 'sizes'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12">
          {visible.map((p, i) => (
            <LookbookCard
              key={p.slug}
              product={p}
              lang={lang}
              region={region}
              spreadClass={SPREAD[i % SPREAD.length]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
