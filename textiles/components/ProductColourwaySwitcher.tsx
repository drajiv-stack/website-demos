'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Locale, TextileProduct } from '@/lib/products';
import { useShowroom } from '@/lib/swatch-context';

export function ProductColourwaySwitcher({
  product,
  lang,
}: {
  product: TextileProduct;
  lang: Locale;
}) {
  const [idx, setIdx] = useState(0);
  const { setActiveThreadHex, toggleSwatch, hasSwatch } = useShowroom();
  const colour = product.colourways[idx];
  const name = lang === 'de' ? product.name_de : product.name_en;
  const images = product.colourways.map((c, i) =>
    i === 0 ? product.image_urls[0] : c.image_url
  );
  const pinId = `pdp-${product.slug}-${colour?.id ?? 'base'}`;
  const pinned = hasSwatch(pinId);

  return (
    <div>
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm border border-stone/60 bg-linen-warm shadow-md">
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={`absolute inset-0 transition-all duration-500 ${
              i === idx ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'
            }`}
          >
            <Image
              src={src}
              alt={`${name} — ${lang === 'de' ? product.colourways[i].name_de : product.colourways[i].name_en}`}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
        {colour && (
          <div className="absolute bottom-3 right-3 h-20 w-20 overflow-hidden rounded-full border-2 border-alabaster shadow-lg sm:h-24 sm:w-24">
            <Image
              src={colour.image_url}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div
          role="radiogroup"
          aria-label={lang === 'de' ? 'Farbe wählen' : 'Choose colourway'}
          className="flex flex-wrap gap-2"
        >
          {product.colourways.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={i === idx}
              onClick={() => {
                setIdx(i);
                setActiveThreadHex(c.hex);
              }}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                i === idx
                  ? 'border-ink bg-ink text-alabaster'
                  : 'border-stone/70 bg-alabaster text-ink hover:border-indigo'
              }`}
            >
              <span
                className="h-3.5 w-3.5 rounded-full border border-ink/20"
                style={{ backgroundColor: c.hex }}
              />
              {lang === 'de' ? c.name_de : c.name_en}
            </button>
          ))}
        </div>
        {colour && (
          <button
            type="button"
            onClick={() =>
              toggleSwatch({
                id: pinId,
                label_en: product.name_en,
                label_de: product.name_de,
                colour_en: colour.name_en,
                colour_de: colour.name_de,
                hex: colour.hex,
              })
            }
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              pinned
                ? 'border border-indigo bg-indigo-soft text-indigo'
                : 'border border-ink/25 bg-alabaster text-ink hover:border-indigo'
            }`}
          >
            {pinned
              ? lang === 'de'
                ? '✓ Im Musterbuch'
                : '✓ In swatch book'
              : lang === 'de'
                ? '+ Handmuster anfordern'
                : '+ Order swatch cutting'}
          </button>
        )}
      </div>
    </div>
  );
}
