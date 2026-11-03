'use client';

import { useActionState, useEffect, useState } from 'react';
import { submitRfqAction, type RfqActionState } from '@/app/actions/rfq';
import { WhatsAppButton } from './WhatsAppButton';

interface RfqFormProps {
  defaultProduct?: string;
  compact?: boolean;
}

const initialState: RfqActionState = {
  status: 'idle',
};

export function RfqForm({ defaultProduct = '', compact = false }: RfqFormProps) {
  const [state, formAction, isPending] = useActionState(submitRfqAction, initialState);
  const [loadedAt, setLoadedAt] = useState<string>('');
  const [productValue, setProductValue] = useState(defaultProduct);

  useEffect(() => {
    setLoadedAt(String(Date.now()));
  }, []);

  useEffect(() => {
    if (defaultProduct) {
      setProductValue(defaultProduct);
    }
  }, [defaultProduct]);

  if (state.status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-sm border border-turmeric/60 bg-espresso p-6 text-cream sm:p-8"
      >
        <span className="inline-block rounded-sm bg-turmeric px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-espresso">
          RFQ Logged · Export Desk
        </span>
        <h3 className="mt-4 font-display text-2xl font-semibold text-cream">
          Thank you. Your inquiry has been received.
        </h3>
        <p className="mt-2 text-base font-medium text-turmeric">
          We reply within 24 hours with price, MOQ and lead time.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-sand">
          Our Kochi export desk will include current crop availability, FOB Kochi / CIF destination
          freight options and a lot-specific sample Certificate of Analysis.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-4">
      {/* Hidden honeypot field for spam protection */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website_url">Company Website (leave blank)</label>
        <input
          id="website_url"
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name="loaded_at" value={loadedAt} />

      {state.status === 'error' && state.message && (
        <div
          role="alert"
          className="rounded-sm border border-turmeric bg-espresso/95 px-4 py-3 text-xs font-medium text-cream"
        >
          {state.message}
        </div>
      )}

      <div className={`grid grid-cols-1 gap-4 ${compact ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        <div>
          <label htmlFor="rfq-name" className="block text-xs font-semibold uppercase tracking-wider text-espresso">
            Your Name <span aria-hidden="true" className="text-turmeric">*</span>
          </label>
          <input
            id="rfq-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g. Tariq Al-Mansoor"
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? 'rfq-name-error' : undefined}
            className="mt-1.5 w-full rounded-sm border border-sand bg-cream-soft px-3.5 py-2.5 text-sm text-espresso placeholder:text-espresso/45 focus:border-espresso"
          />
          {state.fieldErrors?.name && (
            <p id="rfq-name-error" className="mt-1 text-xs font-medium text-espresso underline decoration-turmeric">
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="rfq-email" className="block text-xs font-semibold uppercase tracking-wider text-espresso">
            Business Email <span aria-hidden="true" className="text-turmeric">*</span>
          </label>
          <input
            id="rfq-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="procurement@company.ae"
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? 'rfq-email-error' : undefined}
            className="mt-1.5 w-full rounded-sm border border-sand bg-cream-soft px-3.5 py-2.5 text-sm text-espresso placeholder:text-espresso/45 focus:border-espresso"
          />
          {state.fieldErrors?.email && (
            <p id="rfq-email-error" className="mt-1 text-xs font-medium text-espresso underline decoration-turmeric">
              {state.fieldErrors.email}
            </p>
          )}
        </div>

        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor="rfq-country" className="block text-xs font-semibold uppercase tracking-wider text-espresso">
            Destination Country / Port <span aria-hidden="true" className="text-turmeric">*</span>
          </label>
          <input
            id="rfq-country"
            name="country"
            type="text"
            required
            autoComplete="country-name"
            placeholder="e.g. UAE (Jebel Ali), United Kingdom (Felixstowe), USA (Newark)"
            aria-invalid={Boolean(state.fieldErrors?.country)}
            aria-describedby={state.fieldErrors?.country ? 'rfq-country-error' : undefined}
            className="mt-1.5 w-full rounded-sm border border-sand bg-cream-soft px-3.5 py-2.5 text-sm text-espresso placeholder:text-espresso/45 focus:border-espresso"
          />
          {state.fieldErrors?.country && (
            <p id="rfq-country-error" className="mt-1 text-xs font-medium text-espresso underline decoration-turmeric">
              {state.fieldErrors.country}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="rfq-product-qty" className="block text-xs font-semibold uppercase tracking-wider text-espresso">
          Product, Grade &amp; Quantity <span aria-hidden="true" className="text-turmeric">*</span>
        </label>
        <input
          id="rfq-product-qty"
          name="product_quantity"
          type="text"
          required
          value={productValue}
          onChange={(e) => setProductValue(e.target.value)}
          placeholder="e.g. Black pepper 500 GA, 10 MT, 25 kg PP bags"
          aria-invalid={Boolean(state.fieldErrors?.product_quantity)}
          aria-describedby={state.fieldErrors?.product_quantity ? 'rfq-product-error' : undefined}
          className="mt-1.5 w-full rounded-sm border border-sand bg-cream-soft px-3.5 py-2.5 text-sm text-espresso placeholder:text-espresso/45 focus:border-espresso"
        />
        {state.fieldErrors?.product_quantity && (
          <p id="rfq-product-error" className="mt-1 text-xs font-medium text-espresso underline decoration-turmeric">
            {state.fieldErrors.product_quantity}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="rfq-message" className="block text-xs font-semibold uppercase tracking-wider text-espresso">
          Target Spec, Incoterm or Sample Request <span className="font-normal text-espresso/80">(optional)</span>
        </label>
        <textarea
          id="rfq-message"
          name="message"
          rows={compact ? 2 : 3}
          placeholder="Specify steam sterilisation, mesh size, private-label packing or CIF port..."
          className="mt-1.5 w-full rounded-sm border border-sand bg-cream-soft px-3.5 py-2.5 text-sm text-espresso placeholder:text-espresso/45 focus:border-espresso"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-sm bg-turmeric px-6 py-3 text-sm font-semibold text-espresso shadow-xs transition-colors hover:bg-turmeric-hover disabled:opacity-60"
          >
            {isPending ? 'Sending RFQ...' : 'Send Quote Request'}
          </button>

          <WhatsAppButton
            label="Ask on WhatsApp"
            productName={productValue || undefined}
            className="inline-flex items-center gap-2 rounded-sm border border-espresso/30 bg-cream px-4 py-3 text-xs font-semibold text-espresso transition-colors hover:border-espresso"
          />
        </div>

        <p className="text-xs text-espresso/75">
          Response within 24 hours · FOB Kochi &amp; CIF terms
        </p>
      </div>
    </form>
  );
}
