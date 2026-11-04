import Link from 'next/link';
import { COMPANY, COUNTRY_SHOWROOMS, type Locale } from '@/lib/products';

export function AtelierFooter({ lang }: { lang: Locale }) {
  return (
    <footer className="border-t border-stone/50 bg-ink-deep pb-24 pt-14 text-linen md:pb-16 lg:pl-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 pb-10 md:grid-cols-12">
          {/* Col 1: Brand & Address */}
          <div className="md:col-span-5">
            <span className="font-display text-2xl text-linen">
              {COMPANY.name}
            </span>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-stone">
              {lang === 'de'
                ? COMPANY.tagline_de
                : COMPANY.tagline_en}
            </p>
            <p className="mt-3 text-xs text-stone">
              {COMPANY.address}
            </p>
            <p className="mt-1 text-xs text-stone">
              {COMPANY.ports.join(' · ')}
            </p>
          </div>

          {/* Col 2: Country Showrooms */}
          <div className="md:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">
              {lang === 'de' ? 'Länder-Showrooms' : 'Country Showrooms'}
            </h2>
            <ul className="mt-3 space-y-2 text-xs">
              {COUNTRY_SHOWROOMS.map((c) => (
                <li key={c.code}>
                  <Link
                    href={c.href}
                    className="flex items-center gap-2 text-linen/85 hover:text-linen"
                  >
                    <span>{c.flag}</span>
                    <span>{lang === 'de' ? c.country_de : c.country_en}</span>
                    <span className="text-stone">({c.duvet_size.split('·')[0]})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Pages & Admin Link */}
          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">
              {lang === 'de' ? 'Atelier & Katalog' : 'Atelier & Catalogue'}
            </h2>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href={`/${lang}/collections`} className="text-linen/85 hover:text-linen">
                  {lang === 'de' ? 'Alle 10 Kollektionsstücke' : 'All 10 Collection Pieces'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/private-label`} className="text-linen/85 hover:text-linen">
                  {lang === 'de' ? 'Eigenmarke & Etiketten' : 'Private Label & Packaging'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/sustainability`} className="text-linen/85 hover:text-linen">
                  {lang === 'de' ? 'Nachhaltigkeit & Musterzertifikate' : 'Sustainability & Compliance'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="text-linen/85 hover:text-linen">
                  {lang === 'de' ? 'Weberei Karur' : 'About Karur Mill'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-linen/85 hover:text-linen">
                  {lang === 'de' ? 'Kontakt & Musterbuch' : 'Contact & Swatch Desk'}
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin/products"
                  className="inline-flex items-center gap-1.5 rounded-xs border border-stone/40 px-2.5 py-1 text-[11px] font-medium text-stone hover:border-linen hover:text-linen"
                >
                  <span>⚙</span>
                  <span>{lang === 'de' ? 'Admin-Katalog (Supabase)' : 'Catalogue Admin (Supabase)'}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footnote for † sample figures + Mandatory Integrity Notice */}
        <div className="border-t border-stone/25 pt-6 text-xs text-stone">
          <p>
            {lang === 'de'
              ? '† Alle angegebenen Zahlen, Kapazitäten, Fadendichten, Flächengewichte (GSM), Mindestmengen und Lieferzeiten sind Beispielwerte.'
              : '† All figures, capacities, thread counts, GSM weights, minimum order quantities and lead times shown are sample figures.'}
          </p>
          <p className="mt-2 font-medium text-linen">
            Concept design — fictional company. Website by Rajiv Dudeja.
          </p>
        </div>
      </div>
    </footer>
  );
}
