import type { Metadata } from 'next';
import { ProductsCatalogue } from '@/components/ProductsCatalogue';
import { RfqForm } from '@/components/RfqForm';
import { COMPANY } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Export Spice Catalogue (Whole, Ground, Seeds & Blends)',
  description:
    'Browse 8 export-grade Kerala spices from Elakkaya Spice Exports: Malabar black pepper, Alleppey green cardamom, high-curcumin turmeric, cloves, nutmeg & mace, cassia cinnamon, Cochin dry ginger and Byadgi/Teja red chilli.',
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
        className="border-b border-sand bg-espresso py-16 text-cream sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turmeric">
            {COMPANY.name} · HS Chapters 0904 – 0910
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-cream sm:text-5xl">
            Export spice catalogue: whole, ground, seeds and calibrated blends.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-sand">
            Every grade is steam-sterilised to order, tested for moisture, volatile oil, aflatoxin
            and pesticide MRLs, and packed in 25 kg multi-wall kraft bags, new poly-lined jute sacks
            or nitrogen-flushed barrier cartons ex-Kochi (INCOK).
          </p>
        </div>
      </section>

      <section aria-label="Product catalogue" className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductsCatalogue />
        </div>
      </section>

      <section
        aria-labelledby="catalogue-rfq-heading"
        className="border-t border-sand bg-cream-soft py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-espresso/80">
                Mixed-Container Consolidation
              </p>
              <h2
                id="catalogue-rfq-heading"
                className="mt-2 font-display text-2xl font-semibold text-espresso sm:text-3xl"
              >
                Need a custom mesh, ASTA colour or multi-spice FCL?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-espresso/85">
                We consolidate up to 4 spice grades in a single 20&prime; FCL (sample figure) with
                individual lot COAs and pallet separation. Share your target specification below.
              </p>
            </div>
            <div className="lg:col-span-7">
              <RfqForm compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
