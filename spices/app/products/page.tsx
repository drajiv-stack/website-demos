import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Export Spices Collection',
  description:
    'Eight single-origin spices from Kerala: Malabar black pepper, Alleppey green cardamom, turmeric, red chilli, cloves, nutmeg & mace, cassia cinnamon and Cochin ginger.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProductsPage() {
  return (
    <>
      <section
        id="site-hero"
        className="grain-surface border-b border-sand/30 bg-espresso py-20 text-cream sm:py-24"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-cream sm:text-6xl">
            Eight† Kerala harvests.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-sand/85 sm:text-lg">
            Grown across high-altitude estates in Idukki and Wayanad, cleaned and packed in Kochi
            for bulk container export.
          </p>
        </div>
      </section>

      <section aria-label="Spice collection" className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-espresso">
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <h2 className="mt-4 font-display text-xl font-semibold tracking-tight text-espresso group-hover:underline decoration-turmeric decoration-2 underline-offset-4">
                  {product.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
