'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  COMPANY,
  COUNTRY_SHOWROOMS,
  type Locale,
  type RegionCode,
} from '@/lib/products';
import { useShowroom } from '@/lib/swatch-context';

export function AtelierHeader({ lang }: { lang: Locale }) {
  const pathname = usePathname() || `/${lang}`;
  const { region, setRegion, swatches } = useShowroom();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Compute path when switching between /en and /de
  const getSwitchedPath = (targetLang: Locale, targetRegion: RegionCode) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'en' || segments[0] === 'de') {
      segments[0] = targetLang;
    } else {
      segments.unshift(targetLang);
    }
    const base = '/' + segments.join('/');
    return targetLang === 'en' ? `${base}?region=${targetRegion}` : base;
  };

  const navItems =
    lang === 'de'
      ? [
          { href: `/de/collections`, label: 'Kollektionen' },
          { href: `/de/private-label`, label: 'Eigenmarke & Etiketten' },
          { href: `/de/sustainability`, label: 'Nachhaltigkeit' },
          { href: `/de/about`, label: 'Weberei Karur' },
          { href: `/de/contact`, label: 'Kontakt' },
        ]
      : [
          { href: `/en/collections`, label: 'Collections' },
          { href: `/en/private-label`, label: 'Private Label' },
          { href: `/en/sustainability`, label: 'Compliance' },
          { href: `/en/about`, label: 'Karur Mill' },
          { href: `/en/contact`, label: 'Contact' },
        ];

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '');

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-stone/45 bg-linen/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Brand Wordmark + Woven Loom Monogram */}
          <Link
            href={`/${lang}`}
            className="group flex items-center gap-3 text-ink"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xs border border-ink/20 bg-alabaster transition-colors group-hover:border-indigo"
              aria-hidden="true"
            >
              <svg viewBox="0 0 28 28" className="h-5 w-5 text-indigo">
                <path
                  d="M5 7h18M5 14h18M5 21h18M9 4v20M19 4v20"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle cx="14" cy="14" r="2.5" fill="currentColor" />
              </svg>
            </span>
            <div>
              <span className="block font-display text-xl font-medium tracking-tight text-ink">
                {COMPANY.name}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-stone-dark">
                {lang === 'de' ? 'ATELIER KARUR · SEIT 1998†' : 'KARUR MILL · EXPORT ATELIER'}
              </span>
            </div>
          </Link>

          {/* Desktop Editorial Navigation */}
          <nav
            aria-label={lang === 'de' ? 'Hauptnavigation' : 'Primary navigation'}
            className="hidden items-center gap-8 xl:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-ink/85 transition-colors hover:text-indigo"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Controls: EN/DE Switch + Quote CTA */}
          <div className="flex items-center gap-3">
            {/* Direct EN / DE Language Switcher preserving current route */}
            <div
              role="group"
              aria-label={lang === 'de' ? 'Sprachauswahl' : 'Language switcher'}
              className="inline-flex items-center rounded-full border border-stone/70 bg-alabaster p-0.5 text-xs font-semibold"
            >
              <Link
                href={getSwitchedPath('en', region === 'de' ? 'eu' : region)}
                onClick={() => {
                  if (region === 'de') setRegion('eu');
                }}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  lang === 'en'
                    ? 'bg-indigo text-alabaster'
                    : 'text-ink/75 hover:text-ink'
                }`}
              >
                EN
              </Link>
              <Link
                href={getSwitchedPath('de', 'de')}
                onClick={() => setRegion('de')}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  lang === 'de'
                    ? 'bg-indigo text-alabaster'
                    : 'text-ink/75 hover:text-ink'
                }`}
              >
                DE
              </Link>
            </div>

            {/* Primary Above-the-Fold Request a Quote Button */}
            <Link
              href={`/${lang}#quote`}
              className="inline-flex items-center justify-center rounded-full bg-indigo px-4 py-2 text-xs font-semibold text-alabaster transition-colors hover:bg-indigo-hover sm:px-5 sm:py-2.5 sm:text-sm"
            >
              {lang === 'de' ? 'Angebot & Muster' : 'Request a quote'}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-label={lang === 'de' ? 'Menü öffnen' : 'Toggle menu'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone/70 bg-alabaster text-ink xl:hidden"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-stone/50 bg-alabaster px-4 py-6 xl:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-base font-medium text-ink hover:text-indigo"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sticky Conversion Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center gap-2 border-t border-stone/60 bg-alabaster/95 p-3 shadow-lg backdrop-blur-md md:hidden">
        <Link
          href={`/${lang}#quote`}
          className="flex-1 rounded-full bg-indigo py-3 text-center text-xs font-semibold uppercase tracking-wider text-alabaster"
        >
          {lang === 'de'
            ? `Musterbuch & Angebot (${swatches.length})`
            : `Request Quote & Swatches (${swatches.length})`}
        </Link>
        {whatsappNumber && (
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink/25 bg-linen px-4 py-3 text-xs font-semibold text-ink"
          >
            WhatsApp
          </a>
        )}
      </div>
    </>
  );
}
