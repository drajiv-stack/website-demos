'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { COMPANY } from '@/lib/products';

const NAV_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/quality', label: 'Quality & Lab Testing' },
  { href: '/about', label: 'About & Sourcing' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sand/60 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex flex-col focus-visible:rounded-sm"
        >
          <span className="font-display text-lg font-semibold tracking-tight text-espresso sm:text-xl">
            Elakkaya
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-espresso/75">
            Spice Exports · Kochi
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden md:flex md:items-center md:gap-7">
          {NAV_LINKS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? 'text-espresso underline decoration-turmeric decoration-2 underline-offset-8'
                    : 'text-espresso/80 hover:text-espresso'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/contact#rfq-form"
            className="inline-flex items-center justify-center rounded-sm bg-turmeric px-3.5 py-2 text-xs font-semibold text-espresso shadow-xs transition-colors hover:bg-turmeric-hover sm:px-4 sm:py-2.5 sm:text-sm"
          >
            Request a quote
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-sand text-espresso md:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="border-t border-sand/60 bg-cream px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col space-y-3">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-1 text-base font-medium ${
                      active ? 'font-semibold text-espresso underline decoration-turmeric decoration-2' : 'text-espresso/85'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
