import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quality & Lot Traceability',
  description:
    'Steam-sterilised, lab-tested and lot-traced Kerala spices with archived reference samples before container sealing in Kochi.',
  robots: {
    index: false,
    follow: false,
  },
};

const PILLARS = ['Steam-sterilised', 'Lab-tested', 'Lot-traced'] as const;

const SAMPLE_CERTIFICATES = [
  'Food Safety System — Sample certificate',
  'Spice Export Registration — Sample certificate',
  'Batch Analytical Release — Sample certificate',
] as const;

export default function QualityPage() {
  return (
    <>
      <section
        id="site-hero"
        className="grain-surface border-b border-sand/25 bg-espresso py-20 text-cream sm:py-28"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-cream sm:text-6xl">
            Pure by process.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-sand/85 sm:text-lg">
            Every export lot is microbiologically cleared and archived with a 100%† traceable
            retention sample before container sealing in Kochi.
          </p>
        </div>
      </section>

      <section aria-labelledby="pillars-heading" className="bg-cream py-20 text-espresso sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-espresso lg:col-span-6">
              <Image
                src="/images/story/step-lab.webp"
                alt="Laboratory specialist inspecting whole spice samples before export dispatch"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-6">
              <h2
                id="pillars-heading"
                className="font-display text-3xl font-semibold tracking-tight text-espresso sm:text-5xl"
              >
                Three safeguards on every shipment.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-espresso/80 sm:text-lg">
                Each harvest batch passes through gentle steam treatment, laboratory screening and
                sealed sample archiving prior to port loading.
              </p>

              <ul className="mt-10 divide-y divide-sand border-y border-sand">
                {PILLARS.map((label) => (
                  <li
                    key={label}
                    className="py-5 font-display text-2xl font-semibold tracking-tight text-espresso sm:text-4xl"
                  >
                    {label}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="/sample-coa-elakkaya-spices.pdf"
                  download
                  className="inline-flex items-center rounded-sm bg-espresso px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-espresso/90"
                >
                  Download Sample COA (PDF)
                </a>
                <Link
                  href="/contact#rfq-form"
                  className="inline-flex items-center rounded-sm bg-turmeric px-6 py-3.5 text-sm font-semibold text-espresso transition-colors hover:bg-turmeric-hover"
                >
                  Request a quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="sample-certs-heading"
        className="border-t border-sand bg-cream-soft py-16 text-espresso sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="sample-certs-heading"
            className="font-display text-2xl font-semibold tracking-tight text-espresso sm:text-4xl"
          >
            Documentation placeholders.
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-espresso/80">
            Verified export registrations and batch analytical certificates accompany every live
            client shipment.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SAMPLE_CERTIFICATES.map((label) => (
              <li
                key={label}
                className="rounded-sm border border-dashed border-sand-muted bg-cream px-5 py-6 text-sm font-semibold text-espresso"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
