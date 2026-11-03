import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { COMPANY } from '@/lib/products';
import { RfqForm } from '@/components/RfqForm';

export const metadata: Metadata = {
  title: 'About & Smallholder Farm Sourcing in Idukki & Wayanad',
  description:
    'How Elakkaya Spice Exports partners with smallholder spice growers in Idukki and Wayanad, Kerala, and operates its grading and steam-sterilisation facility near Kochi port.',
  robots: {
    index: false,
    follow: false,
  },
};

const REGIONS = [
  {
    name: 'Idukki High Ranges (Cardamom Hills & Nedumkandam)',
    elevation: '850 – 1,350 m ASL (sample figure)',
    crops: 'Malabar Black Pepper (MG1 / 550 GL), Alleppey Green Cardamom (AGEB / AGB), Cloves',
    notes:
      'Shade-grown perennial pepper vines and monsoon-fed cardamom valleys with cool night temperatures that slow berry maturation and concentrate volatile oils.',
  },
  {
    name: 'Wayanad Plateau (Kalpetta & Pulpally)',
    elevation: '700 – 1,100 m ASL (sample figure)',
    crops: 'Alleppey High-Curcumin Turmeric, Cochin Unbleached Dry Ginger, Cassia Bark',
    notes:
      'Deep forest-loam soils rich in organic matter producing high-curcuminoid turmeric rhizomes and low-fibre, citrus-forward Cochin ginger.',
  },
  {
    name: 'Periyar & Chalakudy River Valleys (Kalady / Kottayam)',
    elevation: '40 – 300 m ASL (sample figure)',
    crops: 'Kalady Nutmeg Kernels (ABCD) & Crimson Mace Arils',
    notes:
      'Humid riverine homestead gardens famous for thin-shelled, high-myristicin nutmeg and bright scarlet mace blades.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section
        id="site-hero"
        className="border-b border-sand bg-espresso py-16 text-cream sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turmeric">
            Origin &amp; Infrastructure · Kerala, India
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-cream sm:text-5xl">
            Built between the Western Ghats high ranges and Kochi container terminal.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-sand">
            {COMPANY.name} was conceived around a single operational principle: overseas spice buyers
            should not have to choose between authentic farm-gate Kerala provenance and modern
            European/US microbiological and residue compliance.
          </p>
        </div>
      </section>

      {/* Origin Story + Hills Photo */}
      <section aria-labelledby="origin-story-heading" className="border-b border-sand bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-espresso/80">
                Why Direct Farm-Gate Collection Matters
              </p>
              <h2
                id="origin-story-heading"
                className="font-display text-3xl font-semibold text-espresso sm:text-4xl"
              >
                No anonymous auction commingling.
              </h2>
              <p className="text-sm leading-relaxed text-espresso/85">
                Conventional spice trading passes through three or four district dealers before
                reaching a coastal exporter. By the time a container is stuffed, single-origin bags
                from disciplined hill growers have been blended with high-moisture or pesticide-heavy
                lots from unknown yards.
              </p>
              <p className="text-sm leading-relaxed text-espresso/85">
                We operate direct collection points in Idukki and Wayanad, buying directly from
                380+ smallholder farm families (sample figure) during the peak harvest windows. Each
                intake lot is tagged by panchayat, drying method and harvest week before moving down
                the ghat road to our Thodupuzha cleaning, steam-sterilisation and cryogenic-milling
                unit.
              </p>

              <dl className="grid grid-cols-2 gap-4 border-t border-sand pt-6 sm:grid-cols-3 tabular-nums">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-espresso/80">
                    Partner Growers
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-espresso">
                    380+ Farms
                  </dd>
                  <dd className="text-[11px] text-espresso/80">sample figure</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-espresso/80">
                    Plant to Port
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-espresso">
                    45 km
                  </dd>
                  <dd className="text-[11px] text-espresso/80">to INCOK (sample figure)</dd>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-espresso/80">
                    Batch Retention
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-espresso">
                    18 Months
                  </dd>
                  <dd className="text-[11px] text-espresso/80">archive sample figure</dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-6">
              <figure className="overflow-hidden rounded-sm border border-sand bg-cream-soft">
                <div className="relative aspect-[3/2] w-full bg-espresso">
                  <Image
                    src="/images/story/region-hills.webp"
                    alt="Misty green spice and tea hills of Idukki in the Western Ghats of Kerala"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-4 py-3 text-xs text-espresso/80">
                  High-elevation monsoon slopes in the Western Ghats (700–1,350 m ASL, sample
                  figure) where slow berry maturation builds piperine and volatile oil density.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Kerala Sourcing Regions Map + Breakdown */}
      <section
        aria-labelledby="sourcing-map-heading"
        className="border-b border-sand bg-espresso py-20 text-cream"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Simple SVG Map of Kerala Highlighting Wayanad, Idukki, Periyar & Kochi Port */}
            <div className="lg:col-span-5">
              <div className="rounded-sm border border-sand/25 bg-espresso-deep p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-turmeric">
                  Kerala Origin Map
                </p>
                <svg
                  viewBox="0 0 360 520"
                  role="img"
                  aria-label="Map of Kerala showing Wayanad plateau in the north, Periyar valley and Kochi Port in the centre, and Idukki high ranges in the east"
                  className="mt-4 h-auto w-full max-w-xs mx-auto"
                >
                  {/* Stylized Silhouette of Kerala Coast & Western Ghats */}
                  <path
                    d="M 78 34 L 132 46 L 166 88 L 178 134 L 204 182 L 238 242 L 254 308 L 258 378 L 244 446 L 218 492 L 188 476 L 166 420 L 146 352 L 134 282 L 118 214 L 96 142 L 74 82 Z"
                    fill="#261A14"
                    stroke="#D8C7AE"
                    strokeWidth="1.5"
                    strokeOpacity="0.45"
                  />

                  {/* Wayanad Node */}
                  <g transform="translate(154, 112)">
                    <circle r="7" fill="#D9911A" />
                    <line x1="10" y1="0" x2="48" y2="-12" stroke="#D9911A" strokeWidth="1.2" />
                    <text x="54" y="-14" fill="#F5EDE0" fontSize="12" fontWeight="700">
                      Wayanad Plateau
                    </text>
                    <text x="54" y="0" fill="#D8C7AE" fontSize="10">
                      Turmeric · Dry Ginger
                    </text>
                  </g>

                  {/* Periyar / Kalady Node */}
                  <g transform="translate(176, 266)">
                    <circle r="6" fill="#D9911A" />
                    <line x1="8" y1="0" x2="46" y2="-10" stroke="#D9911A" strokeWidth="1.2" />
                    <text x="52" y="-12" fill="#F5EDE0" fontSize="12" fontWeight="700">
                      Periyar Basin
                    </text>
                    <text x="52" y="2" fill="#D8C7AE" fontSize="10">
                      Nutmeg · Crimson Mace
                    </text>
                  </g>

                  {/* Kochi Port Node */}
                  <g transform="translate(138, 286)">
                    <circle r="8" fill="#F5EDE0" stroke="#D9911A" strokeWidth="3" />
                    <line x1="-10" y1="0" x2="-48" y2="12" stroke="#F5EDE0" strokeWidth="1.2" />
                    <text x="-126" y="10" fill="#F5EDE0" fontSize="12" fontWeight="700">
                      Kochi Port
                    </text>
                    <text x="-126" y="24" fill="#D9911A" fontSize="10" fontWeight="600">
                      INCOK Dispatch
                    </text>
                  </g>

                  {/* Idukki High Ranges Node */}
                  <g transform="translate(226, 326)">
                    <circle r="8" fill="#D9911A" />
                    <line x1="10" y1="0" x2="34" y2="14" stroke="#D9911A" strokeWidth="1.2" />
                    <text x="16" y="34" fill="#F5EDE0" fontSize="12" fontWeight="700">
                      Idukki High Ranges
                    </text>
                    <text x="16" y="48" fill="#D8C7AE" fontSize="10">
                      Black Pepper · Green Cardamom
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turmeric">
                  Agro-Climatic Zones
                </p>
                <h2
                  id="sourcing-map-heading"
                  className="mt-2 font-display text-3xl font-semibold text-cream sm:text-4xl"
                >
                  Three distinct Kerala micro-climates, one unified export desk.
                </h2>
              </div>

              <div className="space-y-4">
                {REGIONS.map((region) => (
                  <div
                    key={region.name}
                    className="rounded-sm border border-sand/25 bg-espresso-deep p-5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-xl font-semibold text-cream">
                        {region.name}
                      </h3>
                      <span className="text-xs font-semibold text-turmeric tabular-nums">
                        {region.elevation}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-sand">
                      Key Crops: {region.crops}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-sand/85">{region.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Photos */}
      <section aria-labelledby="facility-heading" className="border-b border-sand bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-espresso/80">
              Drying, Cleaning &amp; Warehousing
            </p>
            <h2
              id="facility-heading"
              className="mt-2 font-display text-3xl font-semibold text-espresso sm:text-4xl"
            >
              Inside our curing yards and palletised port warehouse.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            <figure className="overflow-hidden rounded-sm border border-sand bg-cream-soft">
              <div className="relative aspect-[3/2] w-full bg-espresso">
                <Image
                  src="/images/story/facility-drying-yard.webp"
                  alt="Elevated view of a clean Kerala spice drying yard with black pepper and golden turmeric spread on mats"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="p-5">
                <strong className="block font-display text-lg font-semibold text-espresso">
                  Raised-Mat Sun Curing &amp; Pre-Cleaning Yard
                </strong>
                <span className="mt-1 block text-xs leading-relaxed text-espresso/80">
                  Spices are dried on food-grade raised mats off the soil to prevent stone, dust and
                  mycotoxin contamination before entering mechanical cleaning.
                </span>
              </figcaption>
            </figure>

            <figure className="overflow-hidden rounded-sm border border-sand bg-cream-soft">
              <div className="relative aspect-[3/2] w-full bg-espresso">
                <Image
                  src="/images/story/facility-warehouse.webp"
                  alt="Clean organised spice export warehouse with palletised unbranded sacks on racking"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="p-5">
                <strong className="block font-display text-lg font-semibold text-espresso">
                  Humidity-Controlled Finished Lot Warehouse
                </strong>
                <span className="mt-1 block text-xs leading-relaxed text-espresso/80">
                  Cleared 25 kg kraft and poly-lined jute bags are stored on heat-treated ISPM-15
                  pallets segregated by lot code prior to Kochi container stuffing.
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* RFQ Band */}
      <section className="bg-cream-soft py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl font-semibold text-espresso sm:text-3xl">
                Plan your next Kerala spice shipment.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-espresso/85">
                Request current crop specifications, harvest calendar updates or a pre-shipment
                sample pack from our Kochi export desk.
              </p>
              <Link
                href="/products"
                className="mt-5 inline-block text-xs font-semibold uppercase tracking-wider text-espresso underline decoration-turmeric decoration-2 underline-offset-4"
              >
                Browse all 8 products →
              </Link>
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
