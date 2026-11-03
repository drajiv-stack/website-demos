import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Metrology & Quality Assurance',
  description:
    'Optical emission spectrochemistry, bridge CMM coordinate verification and hydrostatic pressure testing in Rajkot.',
};

const SAFEGUARDS = ['Melt spectrochemistry', 'Bridge CMM probing', 'Hydrostatic pressure test'];

const SAMPLE_CERTS = [
  {
    code: 'SAMPLE-CERT-01',
    title: 'Quality Management System — Sample Certificate',
    scope: 'Investment casting, sand casting and five-axis CNC machining of industrial components.',
  },
  {
    code: 'SAMPLE-CERT-02',
    title: 'Material Test Report — Sample Certificate',
    scope: 'Heat-level chemical spectro readout, mechanical tensile values and CMM dimensional report.',
  },
];

export default function QualityPage() {
  return (
    <>
      <section
        id="site-hero"
        className="cad-grid-dark border-b border-steel/25 bg-graphite py-20 text-paper sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-molten">
            In-House Metrology Lab
          </p>
          <h1 className="mt-3 max-w-3xl font-display-expanded text-4xl font-bold uppercase tracking-tight text-paper sm:text-6xl">
            Zero-defect metrology in Rajkot.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg">
            Every production heat is verified on our optical spectrometer and coordinate-probed on
            a bridge CMM with 100%† lot traceability before export crating.
          </p>
        </div>
      </section>

      <section className="cad-grid-light border-b border-graphite/15 bg-paper py-20 text-graphite sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="font-display-expanded text-3xl font-bold uppercase tracking-tight text-graphite sm:text-4xl">
                Three† checkpoints on every heat.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-graphite/80 sm:text-lg">
                We qualify first-article samples and serial export batches inside our temperature-controlled
                metrology room before VCI seaworthy packing.
              </p>

              <ul className="mt-8 flex flex-wrap gap-3">
                {SAFEGUARDS.map((item) => (
                  <li
                    key={item}
                    className="border border-graphite/35 bg-paper-warm px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-graphite"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <a
                  href="/sample-cmm-inspection-report.pdf"
                  download
                  className="inline-flex items-center justify-center border border-graphite bg-graphite px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-molten hover:border-molten hover:text-graphite"
                >
                  Download sample CMM report (PDF)
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-graphite/25 bg-graphite">
                <Image
                  src="/images/process/step-05-inspect.webp"
                  alt="Bridge CMM coordinate inspection spindle verifying a machined stainless casting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 580px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Certificate Placeholders (Integrity rule: clearly labelled placeholders, zero real certification marks) */}
      <section className="cad-grid-dark bg-graphite py-20 text-paper sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display-expanded text-2xl font-bold uppercase tracking-tight text-paper sm:text-4xl">
            Sample documentation placeholders.
          </h2>
          <p className="mt-3 max-w-xl text-base text-paper/80">
            Illustrated below are clearly labelled sample certificate placeholders for this concept
            demonstration.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {SAMPLE_CERTS.map((cert) => (
              <div
                key={cert.code}
                className="border border-dashed border-steel/45 bg-graphite-light p-6 sm:p-8"
              >
                <span className="inline-block bg-molten/15 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-molten">
                  Sample Certificate — Placeholder Only
                </span>
                <h3 className="mt-4 font-display-expanded text-xl font-bold uppercase text-paper">
                  {cert.title}
                </h3>
                <p className="mt-2 text-sm text-steel">
                  {cert.scope}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/contact#rfq-form"
              className="inline-flex items-center justify-center bg-molten px-7 py-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-graphite transition-colors hover:bg-molten-hover"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
