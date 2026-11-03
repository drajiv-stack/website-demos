import Image from 'next/image';

const QUALITY_LABELS = ['Steam-sterilised', 'Lab-tested', 'Lot-traced'] as const;

export function QualitySection() {
  return (
    <section
      aria-labelledby="quality-section-heading"
      className="bg-cream py-20 text-espresso sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Large editorial imagery — no cards */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-espresso lg:col-span-6">
            <Image
              src="/images/story/step-lab.webp"
              alt="Laboratory specialist examining whole spice lots prior to container sealing"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6">
            <h2
              id="quality-section-heading"
              className="font-display text-3xl font-semibold tracking-tight text-espresso sm:text-5xl"
            >
              Pure by process.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-espresso/80 sm:text-lg">
              Every export lot is microbiologically cleared and archived with a 100%† traceable
              retention sample before container sealing.
            </p>

            <ul className="mt-10 divide-y divide-sand border-y border-sand">
              {QUALITY_LABELS.map((label) => (
                <li
                  key={label}
                  className="py-5 font-display text-2xl font-semibold tracking-tight text-espresso sm:text-4xl"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
