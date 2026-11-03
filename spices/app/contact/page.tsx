import type { Metadata } from 'next';
import { Suspense } from 'react';
import { COMPANY } from '@/lib/products';
import { PrefilledRfqForm } from '@/components/PrefilledRfqForm';
import { RfqForm } from '@/components/RfqForm';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Request an Export Spice Quote (RFQ) & Samples',
  description:
    'Contact Elakkaya Spice Exports in Kochi, Kerala for FOB Kochi or CIF Jebel Ali, Felixstowe and Newark spice quotes, MOQ, lead times and pre-shipment samples.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactPage() {
  return (
    <>
      <section
        id="site-hero"
        className="border-b border-sand bg-espresso py-16 text-cream sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turmeric">
            {COMPANY.name} · Export Desk
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-cream sm:text-5xl">
            Request an export quote or pre-shipment lot sample.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-sand">
            We reply within 24 hours with current crop pricing (FOB Kochi or CIF destination port),
            MOQ, packing specifications and a sample Certificate of Analysis.
          </p>
        </div>
      </section>

      <section id="rfq-form" className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: RFQ Form */}
            <div className="lg:col-span-7">
              <div className="rounded-sm border border-sand bg-cream-soft p-6 sm:p-10">
                <h2 className="font-display text-2xl font-semibold text-espresso">
                  Export Inquiry (RFQ)
                </h2>
                <p className="mt-1 text-xs text-espresso/75">
                  5 fields · Direct to our Kochi export desk · Response within 24 hours
                </p>

                <div className="mt-6">
                  <Suspense fallback={<RfqForm />}>
                    <PrefilledRfqForm />
                  </Suspense>
                </div>
              </div>
            </div>

            {/* Right Column: Office Address, Direct Channels & Response Promise */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-sm border border-sand bg-cream-soft p-6">
                <span className="inline-block rounded-sm bg-turmeric px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-espresso">
                  24-Hour Response Promise
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-espresso">
                  What happens after you submit:
                </h3>
                <ol className="mt-4 space-y-3 text-sm text-espresso/85">
                  <li className="flex gap-3">
                    <span className="font-mono font-bold text-espresso">01.</span>
                    <span>
                      <strong>Grade &amp; Crop Verification:</strong> We match your target bulk
                      density, volatile oil, ASTA colour or mesh spec against current Idukki and
                      Wayanad stock lots.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono font-bold text-espresso">02.</span>
                    <span>
                      <strong>FOB / CIF Quotation:</strong> Within 24 hours, you receive a formal
                      quote stating FOB Kochi (INCOK) or CIF destination price, MOQ, container
                      stuffing capacity and dispatch lead time.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono font-bold text-espresso">03.</span>
                    <span>
                      <strong>COA &amp; Courier Samples:</strong> Upon request, we dispatch 250 g
                      reference samples (sample figure) along with the lot&rsquo;s analytical report.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="rounded-sm border border-sand bg-espresso p-6 text-cream">
                <h3 className="font-display text-xl font-semibold text-cream">
                  Direct Export Channels
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-turmeric">
                      Export Office (Fictional)
                    </dt>
                    <dd className="mt-0.5 text-sand">{COMPANY.location}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-turmeric">
                      Processing &amp; Steam-Sterilisation Unit (Fictional)
                    </dt>
                    <dd className="mt-0.5 text-sand">{COMPANY.processingUnit}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-turmeric">
                      Export Desk Email
                    </dt>
                    <dd className="mt-0.5 text-sand">{COMPANY.email}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-turmeric">
                      Port of Loading
                    </dt>
                    <dd className="mt-0.5 text-sand">
                      {COMPANY.portOfLoading} · ICTT Vallarpadam Container Terminal
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 border-t border-sand/20 pt-5">
                  <WhatsAppButton
                    label="Message Export Desk on WhatsApp"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-turmeric px-4 py-3 text-xs font-semibold text-espresso transition-colors hover:bg-turmeric-hover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
