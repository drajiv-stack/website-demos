import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageIntro } from '@/components/PageIntro';
import { CollectionsLookbook } from '@/components/CollectionsLookbook';
import { CtaBand } from '@/components/EditorialRow';
import { getPublishedTextilesProducts } from '@/lib/supabase/products-query';
import { isLocale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const de = lang === 'de';
  return {
    title: de ? 'Kollektionen' : 'Collections',
    description: de
      ? 'Bettwäsche, Badtextilien, Tischwäsche und Wohnaccessoires – zehn Eigenmarken-Stücke mit Farbvarianten.'
      : 'Bed, bath, table and living textiles — ten private-label pieces with seasonal colourways.',
    alternates: {
      canonical: `/${lang}/collections`,
      languages: { en: '/en/collections', de: '/de/collections' },
    },
  };
}

export default async function CollectionsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const products = await getPublishedTextilesProducts();
  const de = lang === 'de';

  return (
    <>
      <PageIntro
        eyebrow={de ? 'Lookbook · Bett · Bad · Tisch · Wohnen' : 'Lookbook · Bed · Bath · Table · Living'}
        title={de ? 'Zehn Stücke,' : 'Ten pieces,'}
        italic={de ? 'jede Farbe auf Abruf.' : 'every shade on request.'}
        lead={
          de
            ? 'Wählen Sie Ihren Markt, um Konfektionsmaße zu sehen, und tippen Sie auf eine Farbe, um sie am Produkt zu prüfen.'
            : 'Pick your market to see regional cut sizes, then tap a shade to preview it on the piece.'
        }
      />
      <CollectionsLookbook lang={lang} products={products} />
      <CtaBand lang={lang} href={`/${lang}/contact`} />
    </>
  );
}
