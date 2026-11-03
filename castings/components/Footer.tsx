import Link from 'next/link';
import { CadCrest } from '@/components/Header';
import { COMPANY } from '@/lib/products';

export function Footer() {
  return (
    <footer className="border-t border-steel/25 bg-graphite-deep text-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 border-b border-steel/20 pb-10 md:flex-row md:items-end">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <CadCrest className="h-7 w-7 text-molten" />
              <span className="font-display-expanded text-xl font-bold uppercase tracking-wider text-paper">
                {COMPANY.name}
              </span>
            </Link>
            <p className="mt-3 max-w-md text-sm text-steel">
              {COMPANY.address}
            </p>
            <p className="mt-1 font-mono text-xs text-steel">
              FOB {COMPANY.port} · CIF {COMPANY.destPorts}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-wider">
            <Link href="/products" className="text-paper/80 hover:text-molten">
              Components
            </Link>
            <Link href="/capabilities" className="text-paper/80 hover:text-molten">
              Capabilities
            </Link>
            <Link href="/quality" className="text-paper/80 hover:text-molten">
              Metrology
            </Link>
            <Link href="/contact" className="text-paper/80 hover:text-molten">
              Request a Quote
            </Link>
          </nav>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 text-xs text-steel sm:flex-row sm:items-center">
          <p>
            † All figures, tolerances, capacities and lead times shown are sample figures.
          </p>
          <p className="font-mono text-paper/90">
            Concept design — fictional company. Website by Rajiv Dudeja.
          </p>
        </div>
      </div>
    </footer>
  );
}
