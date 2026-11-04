import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Newsreader, Hanken_Grotesk } from 'next/font/google';
import '../globals.css';
import { ShowroomShell } from '@/components/ShowroomShell';
import { COMPANY } from '@/lib/products';
import { LOCALES, isLocale, siteUrl } from '@/lib/i18n';

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken-grotesk',
  display: 'swap',
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const de = lang === 'de';
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: de
        ? `${COMPANY.name} | Private-Label-Heimtextilien aus Karur`
        : `${COMPANY.name} | Private-Label Home Textiles from Karur`,
      template: `%s | ${COMPANY.name}`,
    },
    description: de
      ? 'Bettwäsche, Frottier und Tischwäsche aus Bio-Baumwolle und Leinen – konfektioniert in deutschen Standardmaßen, CIF Hamburg.'
      : 'Private-label bed, bath and table linen in organic cotton and European flax, cut to German, EU and Australian retail sizes.',
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
    alternates: {
      canonical: `/${lang}`,
      languages: { en: '/en', de: '/de' },
    },
    openGraph: {
      type: 'website',
      locale: de ? 'de_DE' : 'en_GB',
      url: `${siteUrl}/${lang}`,
      siteName: COMPANY.name,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: `${COMPANY.name} (Fictional Concept Demo)`,
    description:
      'Concept design — fictional home-textiles weaving mill in Karur, Tamil Nadu, India. Website by Rajiv Dudeja.',
    url: `${siteUrl}/${lang}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'S.F. No. 218, Vaiyapuri Nagar [fictional]',
      addressLocality: 'Karur',
      addressRegion: 'Tamil Nadu',
      postalCode: '639002',
      addressCountry: 'IN',
    },
    areaServed: ['DE', 'NL', 'AU'],
  };

  return (
    <html lang={lang} className={`${newsreader.variable} ${hanken.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero/hero-bedroom-poster.webp"
          fetchPriority="high"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-linen text-ink selection:bg-indigo selection:text-alabaster">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <ShowroomShell lang={lang}>{children}</ShowroomShell>
      </body>
    </html>
  );
}
