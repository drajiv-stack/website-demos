import type { Metadata } from 'next';
import { ProductCatalogueClient } from '@/components/ProductCatalogueClient';

export const metadata: Metadata = {
  title: 'Export Component Catalogue',
  description:
    'Eight precision investment-cast, sand-cast and 5-axis CNC-machined export components in stainless steel, carbon steel, ductile iron and aluminium.',
};

export default function ProductsPage() {
  return (
    <>
      <section
        id="site-hero"
        className="cad-grid-dark border-b border-steel/25 bg-graphite py-16 text-paper sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-molten">
            Cast &amp; CNC Machined
          </p>
          <h1 className="mt-3 font-display-expanded text-4xl font-bold uppercase tracking-tight text-paper sm:text-6xl">
            Export component catalogue.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg">
            Eight† standard export geometries poured and machined to buyer drawing specifications in
            Rajkot.
          </p>
        </div>
      </section>

      <section className="cad-grid-light bg-paper py-16 text-graphite sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductCatalogueClient />
        </div>
      </section>
    </>
  );
}
