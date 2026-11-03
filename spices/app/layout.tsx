import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { COMPANY } from '@/lib/products';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://spices-demo.vercel.app'),
  title: {
    default: `${COMPANY.name} — Kerala Whole & Ground Spice Exporter`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    'Kerala-based exporter of steam-sterilised, lot-tested Malabar black pepper, Alleppey green cardamom, high-curcumin turmeric, cloves, nutmeg, cassia, dry ginger and red chilli for UAE, UK and US buyers.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: `${COMPANY.name} — Kerala Spice Exporter (Concept Demo)`,
    description:
      'Steam-sterilised, lab-tested whole and ground spices sourced from smallholder farms in Idukki and Wayanad, exported from Kochi (INCOK).',
    type: 'website',
    locale: 'en_US',
    siteName: COMPANY.name,
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY.name,
  description:
    'Fictional concept Kerala spice exporter supplying steam-sterilised whole and ground spices from Kochi, India to UAE, UK and USA buyers.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Willingdon Island [fictional]',
    addressLocality: 'Kochi',
    addressRegion: 'Kerala',
    postalCode: '682003',
    addressCountry: 'IN',
  },
  areaServed: ['AE', 'GB', 'US'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-espresso">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-sm focus:bg-turmeric focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:text-espresso"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}
