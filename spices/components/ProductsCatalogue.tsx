'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PRODUCTS, type SpiceCategory } from '@/lib/products';

const CATEGORIES: Array<'All' | SpiceCategory> = ['All', 'Whole', 'Ground', 'Seeds', 'Blends'];

export function ProductsCatalogue() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | SpiceCategory>('All');

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter(
          (product) =>
            product.category === selectedCategory || product.tags.includes(selectedCategory)
        );

  return (
    <div>
      {/* Accessible Category Filter Buttons */}
      <div
        role="group"
        aria-label="Filter spices by category"
        className="flex flex-wrap items-center gap-2 border-b border-sand pb-6"
      >
        {CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={active}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                active
                  ? 'bg-espresso text-cream shadow-xs'
                  : 'border border-sand bg-cream-soft text-espresso hover:border-espresso'
              }`}
            >
              {category}
            </button>
          );
        })}
        <span className="ml-auto text-xs font-medium text-espresso/75 tabular-nums">
          Showing {filteredProducts.length} of {PRODUCTS.length} export products
        </span>
      </div>

      {/* Product Grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <article
            key={product.slug}
            className="group flex flex-col overflow-hidden rounded-sm border border-sand bg-cream-soft transition-opacity duration-200"
          >
            <Link
              href={`/products/${product.slug}`}
              className="relative aspect-[4/3] w-full overflow-hidden bg-espresso"
            >
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="rounded-sm bg-espresso/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream">
                  {product.category}
                </span>
                <span className="rounded-sm bg-turmeric px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-espresso tabular-nums">
                  HS {product.specs.hsCode}
                </span>
              </div>
            </Link>

            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs italic text-espresso/80">{product.botanicalName}</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-espresso">
                <Link href={`/products/${product.slug}`} className="hover:underline decoration-turmeric">
                  {product.name}
                </Link>
              </h2>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-espresso/85">
                {product.shortSummary}
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-sand/80 pt-4 text-xs tabular-nums">
                <div>
                  <dt className="font-semibold uppercase tracking-wider text-espresso/80">
                    Volatile Oil / Spec
                  </dt>
                  <dd className="mt-0.5 font-medium text-espresso">{product.specs.volatileOil}</dd>
                </div>
                <div>
                  <dt className="font-semibold uppercase tracking-wider text-espresso/80">
                    Min. Order (MOQ)
                  </dt>
                  <dd className="mt-0.5 font-medium text-espresso">{product.specs.moq}</dd>
                </div>
              </dl>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-sand/80 pt-4">
                <Link
                  href={`/products/${product.slug}`}
                  className="text-xs font-semibold uppercase tracking-wider text-espresso underline decoration-turmeric decoration-2 underline-offset-4 hover:text-espresso/80"
                >
                  Full specs &amp; grades
                </Link>
                <Link
                  href={`/contact?product=${encodeURIComponent(product.slug)}#rfq-form`}
                  className="rounded-sm bg-turmeric px-3.5 py-2 text-xs font-semibold text-espresso transition-colors hover:bg-turmeric-hover"
                >
                  Request quote
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
