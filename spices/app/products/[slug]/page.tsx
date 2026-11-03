import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COMPANY, PRODUCTS, getProductBySlug } from '@/lib/products';

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
    title: `${product.name} — Export Specifications`,
    description: product.description,
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

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: `Spices / ${product.category}`,
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

      <section id="site-hero" className="bg-cream py-16 text-espresso sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/products"
              className="text-xs font-semibold uppercase tracking-[0.18em] text-espresso/70 hover:text-espresso"
            >
              ← All Spices
            </Link>
          </div>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Photo */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-espresso lg:col-span-6">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* One Headline, One Paragraph, 4-Row Table, Quote Button */}
            <div className="lg:col-span-6 lg:py-4">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-espresso sm:text-5xl">
                {product.name}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-espresso/85 sm:text-lg">
                {product.description}
              </p>

              {/* 4-Row Specification Table */}
              <dl className="mt-10 divide-y divide-sand border-y border-sand text-sm sm:text-base tabular-nums">
                <div className="grid grid-cols-3 py-4">
                  <dt className="font-semibold text-espresso/70">Grade</dt>
                  <dd className="col-span-2 font-medium text-espresso">{product.specs.grade}</dd>
                </div>
                <div className="grid grid-cols-3 py-4">
                  <dt className="font-semibold text-espresso/70">Packaging</dt>
                  <dd className="col-span-2 font-medium text-espresso">{product.specs.packaging}</dd>
                </div>
                <div className="grid grid-cols-3 py-4">
                  <dt className="font-semibold text-espresso/70">MOQ</dt>
                  <dd className="col-span-2 font-medium text-espresso">{product.specs.moq}</dd>
                </div>
                <div className="grid grid-cols-3 py-4">
                  <dt className="font-semibold text-espresso/70">Lead time</dt>
                  <dd className="col-span-2 font-medium text-espresso">{product.specs.leadTime}</dd>
                </div>
              </dl>

              <div className="mt-10">
                <Link
                  href={`/contact?product=${encodeURIComponent(product.slug)}#rfq-form`}
                  className="inline-flex items-center justify-center rounded-sm bg-turmeric px-7 py-4 text-sm font-semibold text-espresso transition-colors hover:bg-turmeric-hover"
                >
                  Request a quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
