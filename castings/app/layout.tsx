import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { COMPANY } from '@/lib/products';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kinesis-castings.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${COMPANY.name} | Investment Castings & 5-Axis CNC Components from Rajkot`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    'Lost-wax investment castings, sand castings and 5-axis CNC-machined components in stainless steel, carbon steel, ductile iron and aluminium from Rajkot, India.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: COMPANY.name,
    title: `${COMPANY.name} | Investment Castings & 5-Axis CNC Machining`,
    description:
      'Precision investment castings and five-axis CNC components shipped FOB Mundra and CIF Hamburg.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: `${COMPANY.name} (Fictional Concept Demo)`,
    description:
      'Concept design — fictional investment casting foundry and 5-axis CNC machine shop in Rajkot, Gujarat, India. Website by Rajiv Dudeja.',
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot 412, GIDC Metoda Industrial Estate [fictional]',
      addressLocality: 'Rajkot',
      addressRegion: 'Gujarat',
      postalCode: '360021',
      addressCountry: 'IN',
    },
  };

  return (
    <html lang="en" className={`${archivo.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-graphite text-paper selection:bg-molten selection:text-graphite">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-none focus:bg-molten focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-graphite"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
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
