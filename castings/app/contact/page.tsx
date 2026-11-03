import type { Metadata } from 'next';
import { RfqForm } from '@/components/RfqForm';
import { COMPANY } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Request an Export Quote',
  description:
    'Send your casting or 5-axis CNC machining requirement to Kinesis Cast & Machine Works in Rajkot.',
};

export default function ContactPage() {
  const rawWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') ?? '';

  return (
    <section
      id="site-hero"
      className="cad-grid-dark bg-graphite py-16 text-paper sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-molten">
              Direct Foundry Desk
            </p>
            <h1 className="mt-3 font-display-expanded text-4xl font-bold uppercase tracking-tight text-paper sm:text-5xl">
              Request an export quote.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-paper/80 sm:text-lg">
              We reply within 24† hours with unit price, tooling timeline and FOB Mundra or CIF
              Hamburg freight.
            </p>

            <div className="mt-10 space-y-6 border-t border-steel/25 pt-8 font-mono text-xs">
              <div>
                <p className=" uppercase tracking-wider text-molten">Plant Address</p>
                <p className="mt-1.5 text-sm text-paper/90">{COMPANY.address}</p>
              </div>
              <div>
                <p className="uppercase tracking-wider text-molten">Export Corridors</p>
                <p className="mt-1.5 text-sm text-paper/90">
                  FOB {COMPANY.port} · CIF {COMPANY.destPorts}
                </p>
              </div>
              {rawWhatsApp ? (
                <div>
                  <p className="uppercase tracking-wider text-molten">Direct WhatsApp Desk</p>
                  <a
                    href={`https://wa.me/${rawWhatsApp}?text=${encodeURIComponent(
                      'Hello Kinesis Cast & Machine Works, I would like to request an export casting quote.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center border border-steel/50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-paper hover:border-molten hover:text-molten"
                  >
                    Message on WhatsApp →
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-7">
            <RfqForm />
          </div>
        </div>
      </div>
    </section>
  );
}
