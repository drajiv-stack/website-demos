import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { COMPANY, QUALITY_PARAMETERS } from '@/lib/products';
import { RfqForm } from '@/components/RfqForm';

export const metadata: Metadata = {
  title: 'Quality Control, Steam Sterilisation & Laboratory Testing',
  description:
    'Lot-by-lot spice testing protocol at Elakkaya Spice Exports: moisture, aflatoxin B1/total by HPLC, 500+ pesticide residue LC-MS/MS, Salmonella clearance and downloadable sample Certificate of Analysis.',
  robots: {
    index: false,
    follow: false,
  },
};

const QUALITY_STEPS = [
  {
    step: '01',
    title: 'Raw Lot Intake & Quarantine',
    detail:
      'Every farm-gate delivery is assigned a 10-digit lot code at intake, sampled per ISO 948 spear protocol, and held in quarantine until preliminary moisture, bulk density and visual extraneous matter checks pass.',
  },
  {
    step: '02',
    title: 'Mechanical Cleaning & Optical Sorting',
    detail:
      'Multi-deck aspiration, specific-gravity tables, de-stoners and bichromatic CCD optical sorters remove light berries, stalks, stones and discoloured seeds to < 0.2% extraneous matter (sample figure).',
  },
  {
    step: '03',
    title: 'Validated HTST Steam Sterilisation',
    detail:
      'Dry saturated steam treatment achieves a validated 5-log reduction (sample figure) in total plate count, yeasts, moulds and pathogens without stripping volatile essential oils or darkening ground colour.',
  },
  {
    step: '04',
    title: 'HPLC, GC-MS/MS & Microbiological Release',
    detail:
      'Composite finished-lot samples undergo in-house physical/chemical testing plus external testing for aflatoxin B1/total, ochratoxin A, 500+ pesticide MRLs, Sudan dyes and Salmonella in 25 g / 375 g.',
  },
  {
    step: '05',
    title: 'Metal Detection & Container Stuffing',
    detail:
      'Every 25 kg bag passes through 12,000-Gauss rare-earth magnets and balanced-coil metal detectors (Fe 1.0 mm, Non-Fe 1.2 mm, SS 1.5 mm — sample figure) before desiccant-protected container loading.',
  },
];

const SAMPLE_CERTIFICATES = [
  {
    code: 'DOC-01',
    title: 'Food Safety Management System',
    scope: 'Processing, steam sterilisation, grinding and barrier packing of whole and ground spices.',
    note: 'Sample certificate — placeholder for client’s actual food safety registration.',
  },
  {
    code: 'DOC-02',
    title: 'Indian Spice Export Registration',
    scope: 'Registered merchant-exporter and processing facility certificate placeholder for Kerala shipments.',
    note: 'Sample certificate — placeholder for client’s actual export board certificate.',
  },
  {
    code: 'DOC-03',
    title: 'External Laboratory Analytical Protocol',
    scope: 'Batch-specific multi-residue pesticide, mycotoxin and microbiological clearance report.',
    note: 'Sample certificate — placeholder for third-party lab report per shipment.',
  },
];

export default function QualityPage() {
  return (
    <>
      <section
        id="site-hero"
        className="border-b border-sand bg-espresso py-16 text-cream sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turmeric">
            {COMPANY.name} · Zero-Detention Export Protocol
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-cream sm:text-5xl">
            Every lot cleared for moisture, mycotoxins, pesticide MRLs and microbiology before dispatch.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-sand">
            We do not treat laboratory testing as a post-production formality. Raw material only
            enters our Thodupuzha processing line after intake screening, and no container is sealed
            for Kochi port until the finished batch Certificate of Analysis is signed off.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="/sample-coa-elakkaya-spices.pdf"
              download
              className="inline-flex items-center rounded-sm bg-turmeric px-5 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-turmeric-hover"
            >
              Download Sample COA (PDF)
            </a>
            <Link
              href="/contact#rfq-form"
              className="inline-flex items-center rounded-sm border border-sand/40 px-5 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream"
            >
              Request Lot Sample &amp; Spec
            </Link>
          </div>
        </div>
      </section>

      {/* 5-Stage Quality Process + Lab Image */}
      <section aria-labelledby="process-heading" className="border-b border-sand bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-espresso/80">
                5-Gate Quality Architecture
              </p>
              <h2
                id="process-heading"
                className="mt-2 font-display text-3xl font-semibold text-espresso sm:text-4xl"
              >
                Designed to meet EU, UK and US FDA import inspections.
              </h2>

              <ol className="mt-8 space-y-4">
                {QUALITY_STEPS.map((item) => (
                  <li
                    key={item.step}
                    className="rounded-sm border border-sand bg-cream-soft p-5"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="rounded-sm bg-turmeric px-2 py-0.5 text-xs font-bold text-espresso tabular-nums">
                        {item.step}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-espresso">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-espresso/85">{item.detail}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <figure className="overflow-hidden rounded-sm border border-sand bg-cream-soft">
                <div className="relative aspect-[4/5] w-full bg-espresso">
                  <Image
                    src="/images/story/step-lab.webp"
                    alt="Gloved laboratory technician inspecting spice samples in petri dishes beside test tubes"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-4 text-xs text-espresso/80">
                  Pre-shipment composite lot retention: we archive 500 g sealed reference samples from
                  every export batch for 18 months (sample figure).
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Analytical Parameters Table */}
      <section
        aria-labelledby="test-parameters-heading"
        className="border-b border-sand bg-cream-soft py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-espresso/80">
              Standard Analytical Panel
            </p>
            <h2
              id="test-parameters-heading"
              className="mt-2 font-display text-3xl font-semibold text-espresso sm:text-4xl"
            >
              Laboratory test parameters and target limits.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-espresso/85">
              All numerical limits below are marked as sample figures and can be calibrated to your
              destination market regulation or private-label specification sheet.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-sm border border-sand bg-cream">
            <table className="w-full text-left text-sm tabular-nums">
              <thead className="border-b border-sand bg-espresso text-xs uppercase tracking-wider text-cream">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Parameter
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Analytical Method
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Target Export Limit (Sample Figure)
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Testing Frequency
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/80">
                {QUALITY_PARAMETERS.map((row) => (
                  <tr key={row.parameter} className="hover:bg-cream-soft/70">
                    <th scope="row" className="px-5 py-4 font-semibold text-espresso">
                      {row.parameter}
                    </th>
                    <td className="px-5 py-4 text-espresso/85">{row.method}</td>
                    <td className="px-5 py-4 font-medium text-espresso">{row.typicalLimit}</td>
                    <td className="px-5 py-4 text-espresso/80">{row.frequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sample Certificate Placeholders + Sample COA Download */}
      <section
        aria-labelledby="certificates-heading"
        className="border-b border-sand bg-cream py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 border-b border-sand pb-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-espresso/80">
                Compliance Documentation Pack
              </p>
              <h2
                id="certificates-heading"
                className="mt-2 font-display text-3xl font-semibold text-espresso sm:text-4xl"
              >
                Sample certificate placeholders &amp; downloadable COA.
              </h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-espresso/75">
              Because {COMPANY.name} is a fictional concept exporter, no real certification marks or
              third-party logos are displayed. In a live client build, verified certificates are
              mounted here.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {SAMPLE_CERTIFICATES.map((cert) => (
              <div
                key={cert.code}
                className="flex flex-col justify-between rounded-sm border-2 border-dashed border-sand-muted bg-cream-soft p-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-sm bg-espresso px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-turmeric">
                      Sample certificate
                    </span>
                    <span className="font-mono text-xs text-espresso/80">{cert.code}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-espresso">
                    {cert.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-espresso/85">{cert.scope}</p>
                </div>
                <p className="mt-6 border-t border-sand pt-3 text-xs italic text-espresso/80">
                  {cert.note}
                </p>
              </div>
            ))}
          </div>

          {/* Sample COA Download Banner */}
          <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-sm bg-espresso p-6 text-cream sm:flex-row sm:items-center sm:p-8">
            <div>
              <span className="rounded-sm bg-turmeric px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-espresso">
                Sample PDF Artifact
              </span>
              <h3 className="mt-2 font-display text-2xl font-semibold text-cream">
                Sample Certificate of Analysis — Malabar Black Pepper 550 GL
              </h3>
              <p className="mt-1 text-sm text-sand">
                Inspect our standard COA layout showing physical, chemical, mycotoxin, pesticide and
                microbiological test lines (watermarked SAMPLE — fictional company).
              </p>
            </div>
            <a
              href="/sample-coa-elakkaya-spices.pdf"
              download
              className="shrink-0 rounded-sm bg-turmeric px-5 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-turmeric-hover"
            >
              Download Sample COA (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* RFQ Band */}
      <section className="bg-cream-soft py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl font-semibold text-espresso sm:text-3xl">
                Send us your QA specification sheet.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-espresso/85">
                Need a custom steam-sterilisation log level, specific mesh sieve distribution or
                375 g Salmonella composite sampling? Include your requirement in the form.
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
