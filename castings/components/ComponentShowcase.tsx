'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PRODUCTS } from '@/lib/products';

export function ComponentShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="components"
      aria-labelledby="components-heading"
      className="cad-grid-light border-b border-graphite/15 bg-paper py-20 text-graphite sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="components-heading"
            className="font-display-expanded text-3xl font-bold uppercase tracking-tight text-graphite sm:text-5xl"
          >
            Eight† core export geometries.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-graphite/80 sm:text-lg">
            Valve bodies, impellers, flanges and structural brackets poured in stainless steel,
            carbon steel, ductile iron and aluminium.
          </p>
        </div>

        {/* Desktop: Interactive CAD Index List + Large Studio Photo Reveal (transform & opacity only) */}
        <div className="mt-12 hidden md:grid md:grid-cols-12 md:items-center md:gap-12">
          <ul className="col-span-7 divide-y divide-graphite/15 border-y border-graphite/20">
            {PRODUCTS.map((product, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className="group flex items-baseline justify-between py-4 transition-opacity"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs font-semibold text-graphite/55 tabular-nums">
                        {product.partNumber}
                      </span>
                      <span
                        className={`font-display-expanded text-xl font-bold uppercase tracking-tight transition-transform duration-300 lg:text-2xl ${
                          isActive
                            ? 'translate-x-2 text-graphite'
                            : 'text-graphite/65 group-hover:translate-x-2 group-hover:text-graphite'
                        }`}
                      >
                        {product.name}
                      </span>
                    </div>
                    <span
                      className={`font-mono text-xs font-semibold uppercase tracking-[0.16em] transition-opacity duration-300 ${
                        isActive
                          ? 'opacity-100 text-molten-hover'
                          : 'opacity-0 group-hover:opacity-100 text-graphite/70'
                      }`}
                    >
                      {product.process} →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-graphite/25 bg-graphite">
              {PRODUCTS.map((product, index) => {
                const isActive = index === activeIndex;
                return (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    tabIndex={-1}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 block transition-all duration-500 ease-out ${
                      isActive
                        ? 'z-10 scale-100 opacity-100'
                        : 'z-0 scale-105 opacity-0 pointer-events-none'
                    }`}
                  >
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      fill
                      sizes="(max-width: 1280px) 40vw, 480px"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 border-t border-steel/30 bg-graphite/90 p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-molten">
                        {product.partNumber} · {product.material}
                      </p>
                      <p className="mt-1 font-display-expanded text-lg font-bold uppercase text-paper">
                        {product.name}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Swipe Row of Equal-Height Technical Cards */}
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:hidden">
          {PRODUCTS.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group relative aspect-[3/4] w-[74vw] max-w-[280px] shrink-0 snap-start overflow-hidden border border-graphite/25 bg-graphite"
            >
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                sizes="74vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 border-t border-steel/30 bg-graphite/90 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-molten">
                  {product.partNumber}
                </p>
                <p className="mt-0.5 font-display-expanded text-base font-bold uppercase text-paper">
                  {product.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
