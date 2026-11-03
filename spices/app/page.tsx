import { HeroVideo } from '@/components/HeroVideo';
import { SpiceShowcase } from '@/components/SpiceShowcase';
import { ExportRouteMap } from '@/components/ExportRouteMap';
import { FarmToPortSection } from '@/components/FarmToPortSection';
import { QualitySection } from '@/components/QualitySection';
import { RfqForm } from '@/components/RfqForm';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroVideo />

      {/* 2. Spices (8 photos with names only; desktop hover reveal, mobile swipe row) */}
      <SpiceShowcase />

      {/* 3. Export Map (Signature dotted world map + realistic sea lanes) */}
      <ExportRouteMap />

      {/* 4. Farm to Port (Pinned horizontal scroll, 4 full-bleed panels) */}
      <FarmToPortSection />

      {/* 5. Quality (Large imagery, one sentence, three labels) */}
      <QualitySection />

      {/* 6. Quote Form */}
      <section
        id="quote"
        aria-labelledby="home-rfq-heading"
        className="grain-surface bg-espresso py-20 text-cream sm:py-28"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <div className="lg:col-span-5">
              <h2
                id="home-rfq-heading"
                className="font-display text-3xl font-semibold tracking-tight text-cream sm:text-5xl"
              >
                Request an export quote.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-sand/85 sm:text-lg">
                Tell us your destination port and volume; our Kochi export desk replies within
                24 hours†.
              </p>
            </div>

            <div className="lg:col-span-7">
              <RfqForm dark />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
