import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductColourwaySwitcher } from '@/components/ProductColourwaySwitcher';
import { CtaBand } from '@/components/EditorialRow';
import {
  getPublishedTextilesProducts,
  getTextileProductBySlug,
} from '@/lib/supabase/products-query';
import { LOCALES, isLocale, siteUrl } from '@/lib/i18n';
import { SEEDED_PRODUCTS } from '@/lib/products';

export async function generateStaticParams() {
  const products = await getPublishedTextilesProducts().catch(() => SEEDED_PRODUCTS);
  return LOCALES.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const product = await getTextileProductBySlug(slug);
  if (!product) return {};
  const de = lang === 'de';
  return {
    title: de ? product.name_de : product.name_en,
    description: de ? product.description_de : product.description_en,
    alternates: {
      canonical: `/${lang}/products/${slug}`,
      languages: { en: `/en/products/${slug}`, de: `/de/products/${slug}` },
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const product = await getTextileProductBySlug(slug);
  if (!product) notFound();
  const de = lang === 'de';
  const name = de ? product.name_de : product.name_en;

  const rows: [string, string][] = [
    [de ? 'Faser & Bindung' : 'Fibre & weave', de ? product.specs.fibre_de : product.specs.fibre_en],
    [de ? 'Flächengewicht / Dichte' : 'Weight / density', product.specs.density],
    [
      de ? 'Mindestmenge pro Farbe' : 'MOQ per colourway',
      de ? product.moq.replace('sets per colourway', 'Sets pro Farbe').replace('pcs per colourway', 'Stück pro Farbe') : product.moq,
    ],
    [de ? 'Lieferzeit & Incoterms' : 'Lead time & Incoterms', de ? product.lead_time_de : product.lead_time_en],
  ];

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: de ? product.description_de : product.description_en,
    image: `${siteUrl}${product.image_urls[0]}`,
    category: de ? product.category_de : product.category,
    brand: { '@type': 'Brand', name: 'NoolWeave Exports (Fictional Concept Demo)' },
    material: de ? product.specs.fibre_de : product.specs.fibre_en,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <section className="linen-weave-surface border-b border-stone/45 bg-linen py-10 sm:py-16 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label={de ? 'Brotkrumen' : 'Breadcrumb'} className="mb-6 text-xs text-stone-dark">
            <Link href={`/${lang}/collections`} className="hover:text-indigo">
              {de ? 'Kollektionen' : 'Collections'}
            </Link>{' '}
            / <span className="text-ink">{de ? product.category_de : product.category}</span>
          </nav>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ProductColourwaySwitcher product={product} lang={lang} />
            </div>
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
                {de ? product.category_de : product.category} · HS {product.hs_code}
              </p>
              <h1 className="mt-2 font-display text-4xl font-normal leading-tight text-ink sm:text-5xl">
                {name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-stone-dark">
                {de ? product.description_de : product.description_en}
              </p>

              <table className="mt-7 w-full border-t border-stone/60 text-sm">
                <caption className="sr-only">
                  {de ? 'Spezifikation' : 'Specification'}
                </caption>
                <tbody>
                  {rows.map(([k, v]) => (
                    <tr key={k} className="border-b border-stone/45">
                      <th scope="row" className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-stone-dark">
                        {k}
                      </th>
                      <td className="py-3 text-right font-medium text-ink">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="mt-4 text-xs text-stone-dark">
                🇩🇪 {product.specs.sizes_de} · 🇳🇱 {product.specs.sizes_eu} · 🇦🇺 {product.specs.sizes_au}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/${lang}/contact?product=${product.slug}`}
                  className="inline-flex items-center justify-center rounded-full bg-indigo px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-alabaster transition-colors hover:bg-indigo-hover sm:text-sm"
                >
                  {de ? 'Angebot anfordern' : 'Request a quote'}
                </Link>
                <Link
                  href={`/${lang}/collections`}
                  className="inline-flex items-center justify-center rounded-full border border-ink/25 bg-alabaster px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-indigo hover:text-indigo sm:text-sm"
                >
                  {de ? '← Alle Stücke' : '← All pieces'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand lang={lang} href={`/${lang}/contact`} />
    </>
  );
}
