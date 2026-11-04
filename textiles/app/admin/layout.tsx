import type { Metadata } from 'next';
import { Newsreader, Hanken_Grotesk } from 'next/font/google';
import '../globals.css';
import { siteUrl } from '@/lib/i18n';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-hanken-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Catalogue Admin', template: '%s | NoolWeave Admin' },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${hanken.variable}`}>
      <body className="flex min-h-screen flex-col bg-linen text-ink">
        <main className="flex-1">{children}</main>
        <footer className="border-t border-stone/50 bg-ink-deep px-6 py-5 text-xs text-stone">
          <p>† All figures shown are sample figures.</p>
          <p className="mt-1 font-medium text-linen">
            Concept design — fictional company. Website by Rajiv Dudeja.
          </p>
        </footer>
      </body>
    </html>
  );
}
