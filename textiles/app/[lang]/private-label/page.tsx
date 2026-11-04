import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageIntro } from '@/components/PageIntro';
import { CtaBand, EditorialRow } from '@/components/EditorialRow';
import { isLocale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const de = lang === 'de';
  return {
    title: de ? 'Eigenmarke & Verpackung' : 'Private Label & Packaging',
    description: de
      ? 'Laborfärbungen nach Ihrer Farbvorgabe, gewebte Markenetiketten und verkaufsfertige Verpackung.'
      : 'Lab-dips to your shade, woven brand labels and shelf-ready retail packaging.',
    alternates: {
      canonical: `/${lang}/private-label`,
      languages: { en: '/en/private-label', de: '/de/private-label' },
    },
  };
}

export default async function PrivateLabelPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const de = lang === 'de';

  return (
    <>
      <PageIntro
        eyebrow={de ? 'Eigenmarke · Etiketten · Verpackung' : 'Private label · Labels · Packaging'}
        title={de ? 'Ihre Marke,' : 'Your brand,'}
        italic={de ? 'in Karur eingewebt.' : 'woven in at Karur.'}
        lead={
          de
            ? 'Vom ersten Farbabgleich bis zum gescannten Barcode – jede Sendung trifft bereit fürs Regal ein.'
            : 'From the first shade match to the scanned barcode, every shipment arrives ready for the shelf.'
        }
        image="/images/atelier/woven-label-care.webp"
        imageAlt={de ? 'Gewebtes Markenetikett auf Leinen' : 'Woven brand label stitched on linen'}
      />
      <EditorialRow
        index="01"
        eyebrow={de ? 'Laborfärbung' : 'Lab-dip'}
        title={de ? 'Ihr Farbton, abgeglichen in 7 Tagen†.' : 'Your shade, matched in 7 days†.'}
        body={
          de
            ? 'Senden Sie einen Farbstandard oder ein Stoffstück. Wir färben drei Varianten zur Freigabe ein, bevor ein Meter gewebt wird.'
            : 'Send a colour standard or a fabric cutting. We dye three options for approval before a single metre is woven.'
        }
        image="/images/studio/colourway-terracotta.webp"
        imageAlt={de ? 'Terrakotta gefärbte Bettwäsche' : 'Terracotta-dyed bedding'}
      />
      <EditorialRow
        index="02"
        flip
        tone="linen"
        eyebrow={de ? 'Etiketten' : 'Labels'}
        title={de ? 'Gewebte Etiketten, zweisprachige Pflegehinweise.' : 'Woven labels, bilingual care tags.'}
        body={
          de
            ? 'Jacquard-Markenetiketten und Pflegeetiketten auf Deutsch, Englisch und Niederländisch werden direkt in der Konfektion eingenäht.'
            : 'Jacquard brand labels and care tags in German, English and Dutch are sewn in on the cutting floor.'
        }
        image="/images/products/washed-linen-table-runner.webp"
        imageAlt={de ? 'Leinen-Tischläufer mit Briefecke' : 'Linen table runner with mitred corner'}
      />
      <EditorialRow
        index="03"
        tone="warm"
        eyebrow={de ? 'Verpackung' : 'Packaging'}
        title={de ? 'Plastikfrei und regalfertig.' : 'Plastic-free and shelf-ready.'}
        body={
          de
            ? 'Kraftpapier-Banderolen oder Stoffbeutel mit Ihrem Design, Größenaufkleber und EAN-Code – sortiert für Ihr Zentrallager.'
            : 'Kraft belly bands or self-fabric bags with your artwork, size sticker and EAN code — packed by ratio for your warehouse.'
        }
        image="/images/atelier/retail-belly-band.webp"
        imageAlt={de ? 'Gefaltete Textilien mit Banderole' : 'Folded textiles with belly band'}
      />
      <CtaBand lang={lang} href={`/${lang}/contact`} />
    </>
  );
}
