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
  const { region, setRegion, swatches, activeThreadHex } = useShowroom();
  const [countryDrawerOpen, setCountryDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeShowroom =
    COUNTRY_SHOWROOMS.find((c) => c.code === region) ??
    (lang === 'de' ? COUNTRY_SHOWROOMS[0] : COUNTRY_SHOWROOMS[1]);

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
      <header className="sticky top-0 z-40 border-b border-stone/45 bg-linen/95 backdrop-blur-md lg:pl-16">
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
            className="hidden items-center gap-6 xl:flex"
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

          {/* Right Controls: Country Showroom Thumbnail Pill + EN/DE Switch + Quote CTA */}
          <div className="flex items-center gap-2.5">
            {/* Country Showroom Trigger Pill */}
            <button
              type="button"
              onClick={() => setCountryDrawerOpen((v) => !v)}
              aria-expanded={countryDrawerOpen}
              className="hidden items-center gap-2 rounded-full border border-stone/70 bg-alabaster px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-indigo sm:inline-flex"
            >
              <span>{activeShowroom.flag}</span>
              <span className="font-semibold">
                {lang === 'de' ? activeShowroom.country_de : activeShowroom.country_en}
              </span>
              <span className="text-stone-dark">· {activeShowroom.duvet_size.split('·')[0]}</span>
              <span className="text-[10px] text-indigo">▾</span>
            </button>

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

        {/* Expandable Country Showroom Thumbnail Drawer */}
        {countryDrawerOpen && (
          <div className="border-t border-stone/50 bg-alabaster px-4 py-5 shadow-lg sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-dark">
                  {lang === 'de'
                    ? 'Länder-Showroom & Regionale Konfektionsmaße wählen'
                    : 'Select Country Showroom, Language & Regional Bed Sizing'}
                </p>
                <button
                  type="button"
                  onClick={() => setCountryDrawerOpen(false)}
                  className="text-xs font-medium text-indigo hover:underline"
                >
                  {lang === 'de' ? 'Schließen ✕' : 'Close ✕'}
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {COUNTRY_SHOWROOMS.map((c) => {
                  const isSelected = c.code === region;
                  return (
                    <Link
                      key={c.code}
                      href={getSwitchedPath(c.lang, c.code)}
                      onClick={() => {
                        setRegion(c.code);
                        setCountryDrawerOpen(false);
                      }}
                      className={`group flex items-center gap-3.5 rounded-sm border p-2.5 transition-all ${
                        isSelected
                          ? 'border-indigo bg-indigo-soft/55 shadow-xs'
                          : 'border-stone/50 bg-linen hover:border-indigo/60'
                      }`}
                    >
                      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xs">
                        <Image
                          src={c.thumbnail}
                          alt={lang === 'de' ? c.country_de : c.country_en}
                          fill
                          sizes="96px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span>{c.flag}</span>
                          <span className="truncate text-sm font-semibold text-ink">
                            {lang === 'de' ? c.country_de : c.country_en}
                          </span>
                          <span className="ml-auto rounded-xs bg-indigo px-1.5 py-0.5 text-[10px] font-bold uppercase text-alabaster">
                            {c.lang.toUpperCase()}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs font-medium text-indigo">
                          {c.duvet_size} · {c.incoterm}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-stone-dark">
                          {lang === 'de' ? c.transit_note_de : c.transit_note_en}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-stone/50 bg-alabaster px-4 py-5 xl:hidden">
            <div className="flex flex-col gap-3">
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
              <div className="mt-2 border-t border-stone/40 pt-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-dark">
                  {lang === 'de' ? 'Länder-Showrooms' : 'Country Showrooms'}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {COUNTRY_SHOWROOMS.map((c) => (
                    <Link
                      key={c.code}
                      href={getSwitchedPath(c.lang, c.code)}
                      onClick={() => {
                        setRegion(c.code);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-between rounded-xs border border-stone/50 bg-linen px-3 py-2 text-xs font-medium text-ink"
                    >
                      <span>
                        {c.flag} {lang === 'de' ? c.country_de : c.country_en} ({c.lang.toUpperCase()})
                      </span>
                      <span className="text-indigo">{c.duvet_size.split('·')[0]}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Desktop Floating Bottom "My Swatch Book" Quick Dock */}
      <div className="fixed bottom-5 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-stone/70 bg-alabaster/95 px-4 py-2 shadow-lg backdrop-blur-md md:flex">
        <span
          className="h-2.5 w-2.5 rounded-full transition-colors duration-300"
          style={{ backgroundColor: activeThreadHex }}
          aria-hidden="true"
        />
        <Link
          href={`/${lang}#room-explorer`}
          className="px-2.5 py-1 text-xs font-medium text-ink hover:text-indigo"
        >
          {lang === 'de' ? 'Raum-Panorama' : 'Shop the Room'}
        </Link>
        <span className="text-stone">·</span>
        <Link
          href={`/${lang}#weave-workbench`}
          className="px-2.5 py-1 text-xs font-medium text-ink hover:text-indigo"
        >
          {lang === 'de' ? 'Farben & Lupe' : 'Weave Loupe'}
        </Link>
        <span className="text-stone">·</span>
        <Link
          href={`/${lang}#retail-readiness`}
          className="px-2.5 py-1 text-xs font-medium text-ink hover:text-indigo"
        >
          {lang === 'de' ? 'Etiketten & Websaal' : 'Labels & Looms'}
        </Link>
        <Link
          href={`/${lang}#quote`}
          className="ml-2 inline-flex items-center gap-2 rounded-full bg-indigo px-4 py-1.5 text-xs font-semibold text-alabaster transition-colors hover:bg-indigo-hover"
        >
          <span>
            {lang === 'de'
              ? `Musterbuch (${swatches.length})`
              : `My Swatch Book (${swatches.length})`}
          </span>
          <span>→</span>
        </Link>
      </div>

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
