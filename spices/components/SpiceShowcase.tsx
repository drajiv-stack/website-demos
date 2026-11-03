'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PRODUCTS } from '@/lib/products';

export function SpiceShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      aria-labelledby="spices-heading"
      className="bg-cream py-20 text-espresso sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="spices-heading"
            className="font-display text-3xl font-semibold tracking-tight text-espresso sm:text-5xl"
          >
            Eight† whole harvests.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-espresso/80 sm:text-lg">
            Grown across high-altitude estates in Idukki and Wayanad, graded for bulk export.
          </p>
        </div>

        {/* Desktop: Interactive Hover List + Large Photo Reveal (transform & opacity only) */}
        <div className="mt-12 hidden md:grid md:grid-cols-12 md:items-center md:gap-12">
          <ul className="col-span-7 divide-y divide-sand/60 border-y border-sand/60">
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
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono text-xs text-espresso/55 tabular-nums">
                        0{index + 1}
                      </span>
                      <span
                        className={`font-display text-2xl font-semibold tracking-tight transition-transform duration-300 lg:text-3xl ${
                          isActive
                            ? 'translate-x-2 text-espresso'
                            : 'text-espresso/65 group-hover:translate-x-2 group-hover:text-espresso'
                        }`}
                      >
                        {product.name}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-semibold uppercase tracking-[0.18em] transition-opacity duration-300 ${
                        isActive ? 'opacity-100 text-espresso' : 'opacity-0 group-hover:opacity-100 text-espresso/70'
                      }`}
                    >
                      View →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-espresso">
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
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso-deep/90 via-espresso-deep/40 to-transparent p-6">
                      <p className="font-display text-xl font-semibold text-cream">
                        {product.name}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Swipe Row of Equal-Height Cards */}
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:hidden">
          {PRODUCTS.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group relative aspect-[3/4] w-[72vw] max-w-[280px] shrink-0 snap-start overflow-hidden rounded-sm bg-espresso"
            >
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                sizes="72vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso-deep/90 via-espresso-deep/45 to-transparent p-4">
                <p className="font-display text-lg font-semibold text-cream">
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
