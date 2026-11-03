import { HeroSection } from '@/components/HeroSection';
import { DrawingInspector } from '@/components/DrawingInspector';
import { ComponentShowcase } from '@/components/ComponentShowcase';
import { ProcessLineSection } from '@/components/ProcessLineSection';
import { QualitySection } from '@/components/QualitySection';
import { RfqForm } from '@/components/RfqForm';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DrawingInspector />
      <ComponentShowcase />
      <ProcessLineSection />
      <QualitySection />

      {/* Section 6: Quote Form */}
      <section
        id="quote"
        aria-labelledby="quote-heading"
        className="cad-grid-dark bg-graphite py-20 text-paper sm:py-28"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2
              id="quote-heading"
              className="font-display-expanded text-3xl font-bold uppercase tracking-tight text-paper sm:text-5xl"
            >
              Send your part requirement.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-paper/80 sm:text-lg">
              We reply within 24† hours with unit price, tooling timeline and FOB Mundra or CIF
              Hamburg freight.
            </p>
          </div>

          <div className="mt-10">
            <RfqForm />
          </div>
        </div>
      </section>
    </>
  );
}
