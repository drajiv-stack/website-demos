'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { COMPANY } from '@/lib/products';

const NAV_LINKS = [
  { href: '/products', label: 'Components' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/quality', label: 'Metrology' },
  { href: '/contact', label: 'Contact' },
];

export function CadCrest({ className = 'h-7 w-7 text-molten' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Geometric machined flange + datum crosshair monogram */}
      <rect
        x="3"
        y="3"
        width="26"
        height="26"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="16"
        cy="16"
        r="7.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M16 1V7M16 25V31M1 16H7M25 16H31"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" />
      <circle cx="24.5" cy="7.5" r="1.2" fill="currentColor" />
      <circle cx="7.5" cy="24.5" r="1.2" fill="currentColor" />
      <circle cx="24.5" cy="24.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-steel/25 bg-graphite/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 focus-visible:outline-molten"
        >
          <CadCrest className="h-7 w-7 text-molten transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-display-expanded text-base font-bold uppercase tracking-wider text-paper sm:text-lg">
              {COMPANY.shortName}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-steel">
              Rajkot · Cast &amp; CNC
            </span>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="hidden md:flex md:items-center md:gap-8">
          {NAV_LINKS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`font-mono text-xs uppercase tracking-[0.16em] transition-colors ${
                  active
                    ? 'text-molten font-semibold underline decoration-molten decoration-2 underline-offset-8'
                    : 'text-paper/80 hover:text-paper'
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
            className="inline-flex items-center justify-center bg-molten px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-graphite transition-colors hover:bg-molten-hover sm:px-5 sm:py-2.5"
          >
            Request a quote
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-9 w-9 items-center justify-center border border-steel/40 text-paper md:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
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
          className="border-t border-steel/25 bg-graphite px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col space-y-3">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-1 font-mono text-sm uppercase tracking-wider ${
                      active
                        ? 'font-semibold text-molten underline decoration-molten decoration-2'
                        : 'text-paper/85'
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
