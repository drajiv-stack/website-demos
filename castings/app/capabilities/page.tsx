import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Foundry & Five-Axis CNC Capabilities',
  description:
    'Lost-wax investment casting, resin sand casting, five-axis CNC machining, heat treatment and passivation under one roof in Rajkot.',
};

const CAPABILITIES = [
  {
    code: '01 // LOST-WAX',
    title: 'Investment Casting',
    body: 'Silica-sol ceramic shell casting for complex thin-wall stainless and alloy steel valve, pump and marine geometries.',
    metricLabel: 'Max unit weight',
    metricValue: '45 kg†',
    image: '/images/process/step-02-shell.webp',
    alt: 'Robotic ceramic shell dipping for investment castings',
  },
  {
    code: '02 // RESIN SAND',
    title: 'Sand & Shell Casting',
    body: 'Automated resin-sand moulding for heavy ductile iron and carbon steel structural brackets, housings and yokes.',
    metricLabel: 'Max unit weight',
    metricValue: '85 kg†',
    image: '/images/process/step-03-pour.webp',
    alt: 'Molten metal pouring into sand and shell moulds in Rajkot foundry',
  },
  {
    code: '03 // MACHINING',
    title: 'Five-Axis CNC Shop',
    body: 'Simultaneous five-axis milling centres and twin-spindle turning cells holding tight sealing bores in a single setup.',
    metricLabel: 'Bore repeatability',
    metricValue: '±0.02 mm†',
    image: '/images/process/step-04-machine.webp',
    alt: 'Five-axis CNC machining centre finishing a stainless casting',
  },
  {
    code: '04 // METALLURGY',
    title: 'In-House Heat Treatment',
    body: 'Calibrated electric batch furnaces for solution annealing, normalizing and quench-and-temper cycles with digital chart logs.',
    metricLabel: 'Furnace uniformity',
    metricValue: '±5 °C†',
    image: '/images/process/step-01-pattern.webp',
    alt: 'Heat-treated steel castings staged for machining',
  },
  {
    code: '05 // SURFACE',
    title: 'Passivation & Finishing',
    body: 'Stainless steel shot blasting, citric acid passivation, electropolishing and export VCI corrosion-inhibited crating.',
    metricLabel: 'Salt-spray protection',
    metricValue: '500 hrs†',
    image: '/images/process/step-06-pack.webp',
    alt: 'Passivated and VCI-packed castings in seaworthy wooden crates',
  },
];

export default function CapabilitiesPage() {
  return (
    <>
      <section
        id="site-hero"
        className="cad-grid-dark border-b border-steel/25 bg-graphite py-20 text-paper sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-molten">
            Single-Site Accountability
          </p>
          <h1 className="mt-3 max-w-3xl font-display-expanded text-4xl font-bold uppercase tracking-tight text-paper sm:text-6xl">
            Integrated foundry and five-axis shop.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg">
            We pour, heat-treat, machine and pressure-test castings up to 85 kg† on one Rajkot
            campus, eliminating subcontractor handoffs.
          </p>
        </div>
      </section>

      {CAPABILITIES.map((cap, idx) => {
        const isDark = idx % 2 === 1;
        return (
          <section
            key={cap.code}
            className={`border-b py-20 sm:py-24 ${
              isDark
                ? 'cad-grid-dark border-steel/25 bg-graphite text-paper'
                : 'cad-grid-light border-graphite/15 bg-paper text-graphite'
            }`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                <div className={idx % 2 === 1 ? 'lg:order-2 lg:col-span-6' : 'lg:col-span-6'}>
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-molten">
                    {cap.code}
                  </span>
                  <h2 className="mt-2 font-display-expanded text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                    {cap.title}
                  </h2>
                  <p
                    className={`mt-4 max-w-lg text-base leading-relaxed sm:text-lg ${
                      isDark ? 'text-paper/80' : 'text-graphite/80'
                    }`}
                  >
                    {cap.body}
                  </p>

                  <div
                    className={`mt-8 inline-flex items-baseline gap-4 border px-5 py-3 font-mono ${
                      isDark
                        ? 'border-steel/35 bg-graphite-light text-paper'
                        : 'border-graphite/25 bg-paper-warm text-graphite'
                    }`}
                  >
                    <span className="text-xs uppercase tracking-wider opacity-75">
                      {cap.metricLabel}
                    </span>
                    <span className="text-lg font-bold text-molten">
                      {cap.metricValue}
                    </span>
                  </div>
                </div>

                <div className={idx % 2 === 1 ? 'lg:order-1 lg:col-span-6' : 'lg:col-span-6'}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden border border-steel/30 bg-graphite">
                    <Image
                      src={cap.image}
                      alt={cap.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 580px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-graphite-deep py-16 text-paper">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <h2 className="font-display-expanded text-2xl font-bold uppercase tracking-tight text-paper sm:text-3xl">
            Ready to review your part print?
          </h2>
          <Link
            href="/contact#rfq-form"
            className="inline-flex items-center justify-center bg-molten px-7 py-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-graphite transition-colors hover:bg-molten-hover"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}
