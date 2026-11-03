import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COMPANY, PRODUCTS, getProductBySlug } from '@/lib/products';
import { WhatsAppButton } from '@/components/WhatsAppButton';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return {
      title: 'Product Not Found',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${product.name} (HS ${product.specs.hsCode}) — Export Specifications`,
    description: `${product.shortSummary} Origin: ${product.specs.origin}. MOQ: ${product.specs.moq}. Incoterms: ${product.specs.incoterms}.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: `Spices / ${product.category} (HS ${product.specs.hsCode})`,
    brand: {
      '@type': 'Brand',
      name: COMPANY.name,
    },
    manufacturer: {
      '@type': 'Organization',
      name: COMPANY.name,
    },
    countryOfOrigin: 'IN',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Breadcrumb & Hero Header */}
      <section
        id="site-hero"
        className="border-b border-sand bg-espresso py-12 text-cream sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-xs text-sand">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-cream">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/products" className="hover:text-cream">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-turmeric">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-sm bg-turmeric px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-espresso tabular-nums">
              HS Code {product.specs.hsCode}
            </span>
            <span className="rounded-sm border border-sand/40 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-cream">
              {product.category}
            </span>
            <span className="text-xs italic text-sand">{product.botanicalName}</span>
          </div>

          <h1 className="mt-4 max-w-4xl font-display text-3xl font-semibold tracking-tight text-cream sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-sand">
            {product.shortSummary}
          </p>
        </div>
      </section>

      {/* Main Gallery + Specs Table */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: Image Gallery & Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {product.images.map((img, index) => (
                  <figure
                    key={img.src}
                    className="overflow-hidden rounded-sm border border-sand bg-cream-soft"
                  >
                    <div className="relative aspect-[4/3] w-full bg-espresso">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="px-4 py-3 text-xs text-espresso/80">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="rounded-sm border border-sand bg-cream-soft p-6">
                <h2 className="font-display text-xl font-semibold text-espresso">
                  Sourcing, Curing &amp; Export Processing
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-espresso/85">
                  {product.description}
                </p>

                <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-espresso/80">
                  Standard Export Grades Available
                </h3>
                <ul className="mt-2.5 space-y-1.5 text-sm text-espresso">
                  {product.gradesAvailable.map((grade) => (
                    <li key={grade} className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-turmeric font-bold">
                        •
                      </span>
                      <span>{grade}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Technical Specification Table + Direct Quote CTA */}
            <div className="lg:col-span-6">
              <div className="rounded-sm border border-sand bg-cream-soft p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-sand pb-4">
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-espresso">
                      Technical Export Specifications
                    </h2>
                    <p className="mt-1 text-xs text-espresso/80">
                      Values represent typical export lot parameters (labelled sample figures).
                    </p>
                  </div>
                  <span className="rounded-sm bg-espresso px-3 py-1 text-xs font-semibold text-cream tabular-nums">
                    HS {product.specs.hsCode}
                  </span>
                </div>

                <dl className="mt-4 divide-y divide-sand/80 text-sm tabular-nums">
                  <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-3">
                    <dt className="font-semibold text-espresso/75">Grade Options</dt>
                    <dd className="sm:col-span-2 font-medium text-espresso">{product.specs.grade}</dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-3">
                    <dt className="font-semibold text-espresso/75">Moisture %</dt>
                    <dd className="sm:col-span-2 font-medium text-espresso">{product.specs.moisture}</dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-3">
                    <dt className="font-semibold text-espresso/75">Volatile Oil / Active</dt>
                    <dd className="sm:col-span-2 font-medium text-espresso">
                      {product.specs.volatileOil}
                    </dd>
                  </div>
                  {product.specs.extraLabel && (
                    <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-3">
                      <dt className="font-semibold text-espresso/75">{product.specs.extraLabel}</dt>
                      <dd className="sm:col-span-2 font-medium text-espresso">
                        {product.specs.extraValue}
                      </dd>
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-3">
                    <dt className="font-semibold text-espresso/75">Origin</dt>
                    <dd className="sm:col-span-2 font-medium text-espresso">{product.specs.origin}</dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-3">
                    <dt className="font-semibold text-espresso/75">Minimum Order (MOQ)</dt>
                    <dd className="sm:col-span-2 font-medium text-espresso">{product.specs.moq}</dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-3">
                    <dt className="font-semibold text-espresso/75">Packaging Options</dt>
                    <dd className="sm:col-span-2 font-medium text-espresso">
                      {product.specs.packaging}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-3">
                    <dt className="font-semibold text-espresso/75">HS Code (4-digit)</dt>
                    <dd className="sm:col-span-2 font-mono font-semibold text-espresso">
                      {product.specs.hsCode}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-3">
                    <dt className="font-semibold text-espresso/75">Lead Time</dt>
                    <dd className="sm:col-span-2 font-medium text-espresso">{product.specs.leadTime}</dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-3">
                    <dt className="font-semibold text-espresso/75">Incoterms</dt>
                    <dd className="sm:col-span-2 font-medium text-espresso">
                      {product.specs.incoterms}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-3">
                    <dt className="font-semibold text-espresso/75">Port of Loading</dt>
                    <dd className="sm:col-span-2 font-medium text-espresso">
                      {product.specs.portOfLoading}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-3">
                    <dt className="font-semibold text-espresso/75">Harvest Window</dt>
                    <dd className="sm:col-span-2 font-medium text-espresso">
                      {product.harvestWindow}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-3">
                    <dt className="font-semibold text-espresso/75">Sterilisation</dt>
                    <dd className="sm:col-span-2 font-medium text-espresso">
                      {product.sterilisationMethod}
                    </dd>
                  </div>
                </dl>

                {/* Primary Conversion Action: Pre-fills Contact RFQ Form */}
                <div className="mt-8 rounded-sm bg-espresso p-6 text-cream">
                  <h3 className="font-display text-xl font-semibold text-cream">
                    Ready for FOB Kochi or CIF destination pricing?
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-sand">
                    Click below to pre-fill our quote form with <strong className="text-cream">{product.name}</strong>.
                    We respond within 24 hours with current crop pricing, MOQ and lead time.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/contact?product=${encodeURIComponent(product.slug)}#rfq-form`}
                      className="inline-flex items-center justify-center rounded-sm bg-turmeric px-5 py-3 text-sm font-semibold text-espresso transition-colors hover:bg-turmeric-hover"
                    >
                      Request a quote for this product
                    </Link>
                    <WhatsAppButton
                      label="Ask on WhatsApp"
                      productName={product.name}
                      className="inline-flex items-center gap-2 rounded-sm border border-sand/40 px-4 py-3 text-xs font-semibold text-cream transition-colors hover:border-turmeric"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products (3) */}
      <section
        aria-labelledby="related-products-heading"
        className="border-t border-sand bg-cream-soft py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b border-sand pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-espresso/80">
                Container Consolidation Options
              </p>
              <h2
                id="related-products-heading"
                className="mt-1 font-display text-2xl font-semibold text-espresso sm:text-3xl"
              >
                Other Kerala export spices
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-semibold uppercase tracking-wider text-espresso underline decoration-turmeric decoration-2 underline-offset-4"
            >
              All 8 products →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedProducts.map((rel) => (
              <article
                key={rel.slug}
                className="flex flex-col overflow-hidden rounded-sm border border-sand bg-cream"
              >
                <Link href={`/products/${rel.slug}`} className="relative aspect-[4/3] w-full bg-espresso">
                  <Image
                    src={rel.images[0].src}
                    alt={rel.images[0].alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-espresso/80">
                    {rel.category} · HS {rel.specs.hsCode}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-semibold text-espresso">
                    <Link href={`/products/${rel.slug}`} className="hover:underline decoration-turmeric">
                      {rel.name}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-espresso/80">
                    {rel.shortSummary}
                  </p>
                  <Link
                    href={`/products/${rel.slug}`}
                    className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-espresso underline decoration-turmeric decoration-2 underline-offset-4"
                  >
                    View specifications →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
