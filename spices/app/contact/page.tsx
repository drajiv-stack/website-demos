import type { Metadata } from 'next';
import { Suspense } from 'react';
import { COMPANY } from '@/lib/products';
import { PrefilledRfqForm } from '@/components/PrefilledRfqForm';
import { RfqForm } from '@/components/RfqForm';

export const metadata: Metadata = {
  title: 'Request an Export Quote',
  description:
    'Contact Elakkaya Spice Exports in Kochi, Kerala for bulk spice pricing, MOQ and lead times.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactPage() {
  return (
    <section
      id="site-hero"
      className="grain-surface bg-espresso py-20 text-cream sm:py-28"
    >
      <div id="rfq-form" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-5">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-cream sm:text-6xl">
              Request an export quote.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-sand/85 sm:text-lg">
              Share your destination port and volume; our Kochi export desk replies within
              24 hours† with pricing and lead time.
            </p>
            <p className="mt-8 text-xs text-sand/70">
              {COMPANY.location}
            </p>
          </div>

          <div className="lg:col-span-7">
            <Suspense fallback={<RfqForm dark />}>
              <PrefilledRfqForm dark />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
