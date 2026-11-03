import Link from 'next/link';
import { COMPANY } from '@/lib/products';
import { Monogram } from './Header';

export function Footer() {
  return (
    <footer className="grain-surface border-t border-sand/20 bg-espresso-deep text-cream">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Monogram className="h-8 w-8 text-turmeric" />
              <span className="font-display text-2xl font-semibold tracking-tight text-cream">
                {COMPANY.name}
              </span>
            </Link>
            <p className="mt-3 max-w-md text-sm text-sand/85">
              {COMPANY.location}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-6 text-sm text-sand">
            <Link href="/products" className="transition-colors hover:text-cream">
              Spices
            </Link>
            <Link href="/quality" className="transition-colors hover:text-cream">
              Quality
            </Link>
            <Link href="/about" className="transition-colors hover:text-cream">
              Origin
            </Link>
            <Link href="/contact" className="transition-colors hover:text-cream">
              Request a quote
            </Link>
          </nav>
        </div>

        <div className="mt-10 border-t border-sand/15 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-sand/80">
          <p className="font-medium text-cream">
            Concept design — fictional company. Website by Rajiv Dudeja.
          </p>
          <p>
            † All figures, capacities and lead times shown are sample figures.
          </p>
        </div>
      </div>
    </footer>
  );
}
