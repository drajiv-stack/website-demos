import Image from 'next/image';

const PILLARS = ['Spectro-verified', 'CMM-probed', 'Seaworthy VCI-packed'];

export function QualitySection() {
  return (
    <section
      id="quality"
      aria-labelledby="quality-heading"
      className="cad-grid-light border-b border-graphite/15 bg-paper py-20 text-graphite sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2
              id="quality-heading"
              className="font-display-expanded text-3xl font-bold uppercase tracking-tight text-graphite sm:text-5xl"
            >
              Verified before every pour and pack.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-graphite/80 sm:text-lg">
              Every production heat is checked on our optical spectrometer and coordinate-measured
              on a bridge CMM with 100%† lot traceability to Mundra port.
            </p>

            <ul className="mt-10 flex flex-wrap gap-3">
              {PILLARS.map((label) => (
                <li
                  key={label}
                  className="border border-graphite/35 bg-paper-warm px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-graphite"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-graphite/25 bg-graphite">
              <Image
                src="/images/process/step-05-inspect.webp"
                alt="Coordinate measuring machine spindle inspecting a machined stainless steel casting"
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
}
