import Link from 'next/link';
import { HeroVideo } from '@/components/HeroVideo';
import { FeaturedProductsReveal } from '@/components/FeaturedProductsReveal';
import { ExportRouteMap } from '@/components/ExportRouteMap';
import { FarmToPortSection } from '@/components/FarmToPortSection';
import { RfqForm } from '@/components/RfqForm';
import { QUALITY_PARAMETERS } from '@/lib/products';

const PROOF_ITEMS = [
  {
    label: 'Core Destination Markets',
    value: 'UAE · UK · USA',
    detail: 'Weekly container sailings ex-Kochi (INCOK) (sample figure)',
  },
  {
    label: 'Farm-Gate Traceability',
    value: '100% Lot-Coded',
    detail: '380+ partner smallholders in Idukki & Wayanad (sample figure)',
  },
  {
    label: 'Microbial & MRL Clearance',
    value: '5-Log Steam + HPLC',
    detail: 'Aflatoxin & 500+ pesticide panel on every lot (sample figure)',
  },
  {
    label: 'Annual Export Capacity',
    value: '2,200 MT / Year',
    detail: 'Whole, cryogenic-ground & custom blends (sample figure)',
  },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroVideo />

      {/* 2. Proof Strip */}
      <section
        aria-label="Export capability and quality verification highlights"
        className="border-b border-sand bg-espresso text-cream"
      >
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROOF_ITEMS.map((item) => (
              <div key={item.label} className="border-l-2 border-turmeric pl-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-sand">
                  {item.label}
                </dt>
                <dd className="mt-1.5 font-display text-2xl font-semibold text-cream tabular-nums">
                  {item.value}
                </dd>
                <dd className="mt-1 text-xs leading-relaxed text-sand/85">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3. Featured Products (4) — Asymmetric Editorial Row */}
      <section
        aria-labelledby="featured-products-heading"
        className="border-b border-sand/70 bg-cream py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-sand pb-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-espresso/80">
                Primary Export Grades · HS 0904 – 0910
              </p>
              <h2
                id="featured-products-heading"
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-espresso sm:text-4xl"
              >
                Core whole, ground and custom-calibrated spices.
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-espresso underline decoration-turmeric decoration-2 underline-offset-8 hover:text-espresso/75"
            >
              <span>View all 8 export spices</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <FeaturedProductsReveal />
        </div>
      </section>

      {/* 4. Signature Moment: Animated Export-Route Map */}
      <ExportRouteMap />

      {/* 5. Supporting Pinned Story: Farm -> Port */}
      <FarmToPortSection />

      {/* 6. Quality & Laboratory Teaser */}
      <section
        aria-labelledby="quality-teaser-heading"
        className="border-b border-sand/70 bg-cream-soft py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-espresso/80">
                Compliance Before Container Sealing
              </p>
              <h2
                id="quality-teaser-heading"
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-espresso sm:text-4xl"
              >
                Built for EU, UK and US FDA import clearance.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-espresso/85">
                Overseas spice buyers lose time and margin when shipments are detained at destination
                ports for aflatoxin, ethylene oxide or undeclared pesticide residues. We test every
                lot before stuffing and share the full analytical pack alongside pre-shipment
                samples.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/quality"
                  className="inline-flex items-center rounded-sm bg-espresso px-5 py-3 text-xs font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-espresso/90"
                >
                  Inspect Lab Parameters
                </Link>
                <a
                  href="/sample-coa-elakkaya-spices.pdf"
                  download
                  className="inline-flex items-center rounded-sm border border-espresso/40 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-espresso transition-colors hover:border-espresso"
                >
                  Download Sample COA (PDF)
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {QUALITY_PARAMETERS.slice(0, 4).map((param) => (
                <div
                  key={param.parameter}
                  className="rounded-sm border border-sand bg-cream p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-espresso/80">
                    {param.method}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-espresso">
                    {param.parameter}
                  </h3>
                  <p className="mt-2 text-xs font-semibold text-espresso tabular-nums">
                    Target: {param.typicalLimit}
                  </p>
                  <p className="mt-1 text-xs text-espresso/75">{param.frequency}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. RFQ Conversion Band */}
      <section
        id="rfq-band"
        aria-labelledby="home-rfq-heading"
        className="bg-cream py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 rounded-sm border border-sand bg-cream-soft p-6 sm:p-10 lg:grid-cols-12 lg:p-12">
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-espresso/80">
                  Direct Export Desk · Kochi, Kerala
                </p>
                <h2
                  id="home-rfq-heading"
                  className="mt-2 font-display text-3xl font-semibold tracking-tight text-espresso sm:text-4xl"
                >
                  Request pricing, MOQ and current crop samples.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-espresso/85">
                  Tell us your target grade, mesh size, steam-sterilisation requirement and
                  destination port. Our export team responds within 24 hours with FOB Kochi or CIF
                  pricing, packing specifications and lead time.
                </p>
              </div>

              <dl className="mt-8 space-y-3 border-t border-sand pt-6 text-xs text-espresso/85">
                <div className="flex justify-between">
                  <dt className="font-semibold">Incoterms Supported</dt>
                  <dd>FOB Kochi (INCOK) · CIF · CFR · CIP</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-semibold">Pre-Shipment Samples</dt>
                  <dd>250 g – 500 g air-couriered via DHL (sample figure)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-semibold">Payment Terms</dt>
                  <dd>Irrevocable L/C at Sight · CAD · TT</dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7">
              <RfqForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
