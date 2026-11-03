import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Origin & Kerala Estates',
  description:
    'Direct farm-gate sourcing across the high ranges of Idukki and Wayanad, processed and container-sealed near Kochi port.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AboutPage() {
  return (
    <>
      <section
        id="site-hero"
        className="grain-surface border-b border-sand/25 bg-espresso py-20 text-cream sm:py-28"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-cream sm:text-6xl">
            From the Western Ghats to Kochi port.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-sand/85 sm:text-lg">
            We partner directly with 380† smallholder estates across Idukki and Wayanad, keeping
            every harvest lot single-origin from hill to container.
          </p>
        </div>
      </section>

      <section aria-labelledby="estates-heading" className="bg-cream py-20 text-espresso sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm bg-espresso lg:col-span-7">
              <Image
                src="/images/story/region-hills.webp"
                alt="Misty spice hills of Idukki in the Western Ghats of Kerala"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-5">
              <h2
                id="estates-heading"
                className="font-display text-3xl font-semibold tracking-tight text-espresso sm:text-5xl"
              >
                High-altitude slow maturation.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-espresso/80 sm:text-lg">
                Cool mountain nights and monsoon-fed forest loam across Kerala&rsquo;s high ranges
                concentrate essential oils in every peppercorn and cardamom pod.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="facility-heading"
        className="border-t border-sand bg-cream-soft py-20 text-espresso sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2
                id="facility-heading"
                className="font-display text-3xl font-semibold tracking-tight text-espresso sm:text-5xl"
              >
                Cleaned and packed near Vallarpadam.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-espresso/80 sm:text-lg">
                Our curing yards and humidity-controlled warehouse sit 45 km† from Kochi container
                terminal for rapid vessel loading.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact#rfq-form"
                  className="inline-flex items-center rounded-sm bg-turmeric px-7 py-4 text-sm font-semibold text-espresso transition-colors hover:bg-turmeric-hover"
                >
                  Request a quote
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-espresso">
                <Image
                  src="/images/story/facility-drying-yard.webp"
                  alt="Raised-mat spice drying yard in Kerala"
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-espresso">
                <Image
                  src="/images/story/facility-warehouse.webp"
                  alt="Palletised export spice sacks in clean Kochi warehouse"
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
