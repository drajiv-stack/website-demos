import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageIntro } from '@/components/PageIntro';
import { CtaBand, EditorialRow } from '@/components/EditorialRow';
import { COUNTRY_SHOWROOMS } from '@/lib/products';
import { isLocale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const de = lang === 'de';
  return {
    title: de ? 'Weberei Karur' : 'About the Karur Mill',
    description: de
      ? 'Eine vertikal integrierte Heimtextilweberei in Karur, Tamil Nadu.'
      : 'A vertically integrated home-textiles mill in Karur, Tamil Nadu.',
    alternates: {
      canonical: `/${lang}/about`,
      languages: { en: '/en/about', de: '/de/about' },
    },
  };
}

export default async function AboutPage({
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
        eyebrow={de ? 'Über uns · Karur, Tamil Nadu' : 'About · Karur, Tamil Nadu'}
        title={de ? 'Nool heißt Faden.' : 'Nool means thread.'}
        italic={de ? 'Wir folgen ihm bis ins Regal.' : 'We follow it to the shelf.'}
        lead={
          de
            ? 'Garnfärbung, Weberei, Konfektion und Verpackung unter einem Dach – im Herzen von Indiens Heimtextil-Region.'
            : 'Yarn dyeing, weaving, cut-and-sew and packing under one roof, in the heart of India’s home-textile belt.'
        }
      />

      <section className="bg-ink py-14 text-linen sm:py-20 lg:pl-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="relative aspect-video overflow-hidden rounded-sm border border-stone/30 lg:col-span-7">
            <video
              muted
              playsInline
              loop
              autoPlay
              preload="none"
              poster="/images/atelier/karur-loom-hall.webp"
              aria-label={de ? 'Webstühle in Bewegung' : 'Looms weaving in motion'}
              className="h-full w-full object-cover"
            >
              <source src="/video/loom-weaving.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">
              {de ? 'Der Websaal' : 'The loom hall'}
            </p>
            <h2 className="mt-2 font-display text-3xl font-normal leading-tight sm:text-4xl">
              {de ? '240 Luftdüsen- und Greiferwebstühle†.' : '240 air-jet and rapier looms†.'}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone">
              {de
                ? 'Perkal, Leinen, Waffelpiqué und Jacquard laufen nebeneinander, damit gemischte Programme in einem Container reisen.'
                : 'Percale, linen, waffle and jacquard run side by side, so mixed programmes travel in one container.'}
            </p>
          </div>
        </div>
      </section>

      <EditorialRow
        index="01"
        tone="linen"
        eyebrow={de ? 'Konfektion' : 'Cut & sew'}
        title={de ? 'Geschnitten nach Ihrem Markt.' : 'Cut to your market.'}
        body={
          de
            ? 'Deutsche, europäische und australische Bettmaße sind feste Schnittmuster – kein Umrechnen, keine Überraschungen bei der Wareneingangskontrolle.'
            : 'German, EU and Australian bed sizes are standing patterns — no conversions and no surprises at goods-in inspection.'
        }
        image="/images/products/washed-percale-duvet-set.webp"
        imageAlt={de ? 'Perkal-Bettwäsche' : 'Percale duvet set'}
      />

      <section className="bg-alabaster py-14 sm:py-20 lg:pl-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-normal text-ink sm:text-4xl">
            {de ? 'Drei Exportkorridore.' : 'Three export lanes.'}
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {COUNTRY_SHOWROOMS.map((c) => (
              <li key={c.code} className="rounded-sm border border-stone/55 bg-linen p-5">
                <span className="text-2xl" aria-hidden="true">{c.flag}</span>
                <p className="mt-2 font-display text-xl text-ink">
                  {de ? c.country_de : c.country_en}
                </p>
                <p className="mt-1 text-sm font-medium text-indigo">{c.incoterm}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand lang={lang} href={`/${lang}/contact`} />
    </>
  );
}
