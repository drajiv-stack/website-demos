import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RfqForm } from '@/components/RfqForm';
import { COMPANY, PRODUCTS } from '@/lib/products';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    return { title: 'Component Not Found' };
  }
  return {
    title: `${product.name} (${product.partNumber})`,
    description: product.summary,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.name} (${product.partNumber})`,
    description: product.summary,
    sku: product.partNumber,
    material: product.materialGrade,
    brand: {
      '@type': 'Brand',
      name: `${COMPANY.name} (Fictional Concept Demo)`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <section
        id="site-hero"
        className="cad-grid-light border-b border-graphite/15 bg-paper py-16 text-graphite sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 font-mono text-xs uppercase tracking-wider text-graphite/65">
            <Link href="/products" className="hover:text-molten-hover">
              ← Back to Components
            </Link>
          </div>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            {/* Component Photo */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-graphite/25 bg-graphite">
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 580px"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 bg-graphite/90 px-3 py-1 font-mono text-xs uppercase tracking-wider text-molten">
                  {product.partNumber}
                </span>
              </div>
            </div>

            {/* 1 Headline + 1 Paragraph + 4-Row Table + Quote/PDF Actions */}
            <div className="lg:col-span-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-molten-hover">
                {product.process} · HS {product.hsCode}
              </p>
              <h1 className="mt-2 font-display-expanded text-3xl font-bold uppercase tracking-tight text-graphite sm:text-5xl">
                {product.name}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-graphite/80 sm:text-lg">
                {product.summary}
              </p>

              {/* Strict 4-Row Monospace Table */}
              <div className="mt-8 border border-graphite/25 bg-paper-warm">
                <dl className="divide-y divide-graphite/15 font-mono text-sm">
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <dt className="text-xs uppercase tracking-wider text-graphite/70">Material</dt>
                    <dd className="font-semibold text-graphite">{product.materialGrade}</dd>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <dt className="text-xs uppercase tracking-wider text-graphite/70">Unit weight</dt>
                    <dd className="font-semibold text-graphite">{product.weight}</dd>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <dt className="text-xs uppercase tracking-wider text-graphite/70">Minimum order</dt>
                    <dd className="font-semibold text-graphite">{product.moq}</dd>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <dt className="text-xs uppercase tracking-wider text-graphite/70">Lead time</dt>
                    <dd className="font-semibold text-graphite">{product.leadTime}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#component-quote"
                  className="inline-flex items-center justify-center bg-molten px-7 py-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-graphite transition-colors hover:bg-molten-hover"
                >
                  Request a quote
                </a>
                <a
                  href={product.specPdf}
                  download
                  className="inline-flex items-center justify-center border border-graphite px-6 py-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-graphite transition-colors hover:bg-graphite hover:text-paper"
                >
                  Download spec sheet (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-filled Component Quote Section */}
      <section
        id="component-quote"
        aria-labelledby="component-quote-heading"
        className="cad-grid-dark bg-graphite py-20 text-paper sm:py-24"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2
            id="component-quote-heading"
            className="font-display-expanded text-2xl font-bold uppercase tracking-tight text-paper sm:text-4xl"
          >
            Quote {product.name}.
          </h2>
          <p className="mt-3 text-base text-paper/80">
            We reply within 24† hours with tooling cost, piece price and freight.
          </p>

          <div className="mt-8">
            <RfqForm
              key={product.slug}
              defaultProduct={`${product.name} (${product.partNumber}), ${product.moq.replace('†', '')}`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
