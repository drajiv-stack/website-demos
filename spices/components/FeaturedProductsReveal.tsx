'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { PRODUCTS } from '@/lib/products';

export function FeaturedProductsReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const featured = PRODUCTS.filter((p) => p.featured);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current || !('IntersectionObserver' in window)) {
      return;
    }

    let ctx: { revert: () => void } | undefined;
    const el = containerRef.current;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
          ([{ gsap }, { ScrollTrigger }]) => {
            gsap.registerPlugin(ScrollTrigger);
            if (!containerRef.current) return;

            ctx = gsap.context(() => {
              gsap.fromTo(
                '[data-featured-item]',
                { y: 18 },
                {
                  y: 0,
                  duration: 0.6,
                  stagger: 0.08,
                  ease: 'power2.out',
                  clearProps: 'transform',
                }
              );
            }, containerRef);
          }
        );
      },
      { rootMargin: '200px' }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12"
    >
      {featured.map((product, index) => {
        // Editorial asymmetric 12-column spans (not a generic 3-card grid)
        const spanClass =
          index === 0
            ? 'md:col-span-7'
            : index === 1
            ? 'md:col-span-5'
            : index === 2
            ? 'md:col-span-5'
            : 'md:col-span-7';

        return (
          <article
            key={product.slug}
            data-featured-item
            className={`${spanClass} group flex flex-col overflow-hidden rounded-sm border border-sand bg-cream-soft`}
          >
            <Link
              href={`/products/${product.slug}`}
              className="relative aspect-[16/10] w-full overflow-hidden bg-espresso"
            >
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="rounded-sm bg-espresso/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream">
                  {product.category}
                </span>
                <span className="rounded-sm bg-turmeric px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-espresso tabular-nums">
                  HS {product.specs.hsCode}
                </span>
              </div>
            </Link>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <p className="text-xs italic text-espresso/80">{product.botanicalName}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-espresso">
                  <Link href={`/products/${product.slug}`} className="hover:underline decoration-turmeric">
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso/90">
                  {product.shortSummary}
                </p>
              </div>

              <div className="mt-5 border-t border-sand/80 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="tabular-nums text-espresso">
                  <span className="font-semibold uppercase tracking-wider text-espresso/85">
                    Grade:{' '}
                  </span>
                  {product.specs.grade}
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="font-semibold uppercase tracking-wider text-espresso underline decoration-turmeric decoration-2 underline-offset-4"
                  >
                    Specs
                  </Link>
                  <Link
                    href={`/contact?product=${encodeURIComponent(product.slug)}#rfq-form`}
                    className="rounded-sm bg-turmeric px-3.5 py-2 font-semibold text-espresso transition-colors hover:bg-turmeric-hover"
                  >
                    Quote
                  </Link>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
