'use client';

import { useActionState, useEffect, useState } from 'react';
import { submitRfqAction, type RfqActionState } from '@/app/actions/rfq';

interface RfqFormProps {
  defaultProduct?: string;
  dark?: boolean;
}

const initialState: RfqActionState = {
  status: 'idle',
};

export function RfqForm({ defaultProduct = '', dark = false }: RfqFormProps) {
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
        <h3 className="font-display text-2xl font-semibold text-cream">
          Thank you.
        </h3>
        <p className="mt-2 text-base font-medium text-turmeric">
          We reply within 24 hours† with price, MOQ and lead time.
        </p>
      </div>
    );
  }

  const labelClass = dark
    ? 'block text-xs font-semibold uppercase tracking-wider text-sand'
    : 'block text-xs font-semibold uppercase tracking-wider text-espresso';
  const inputClass = dark
    ? 'mt-1.5 w-full rounded-sm border border-sand/30 bg-espresso-deep px-3.5 py-3 text-sm text-cream placeholder:text-sand/45 focus:border-turmeric'
    : 'mt-1.5 w-full rounded-sm border border-sand bg-cream-soft px-3.5 py-3 text-sm text-espresso placeholder:text-espresso/45 focus:border-espresso';
  const errorClass = dark
    ? 'mt-1 text-xs font-medium text-turmeric'
    : 'mt-1 text-xs font-medium text-espresso underline decoration-turmeric';

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="rfq-name" className={labelClass}>
            Name <span aria-hidden="true" className="text-turmeric">*</span>
          </label>
          <input
            id="rfq-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Tariq Al-Mansoor"
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? 'rfq-name-error' : undefined}
            className={inputClass}
          />
          {state.fieldErrors?.name && (
            <p id="rfq-name-error" className={errorClass}>
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="rfq-email" className={labelClass}>
            Business Email <span aria-hidden="true" className="text-turmeric">*</span>
          </label>
          <input
            id="rfq-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="buyer@company.com"
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? 'rfq-email-error' : undefined}
            className={inputClass}
          />
          {state.fieldErrors?.email && (
            <p id="rfq-email-error" className={errorClass}>
              {state.fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="rfq-country" className={labelClass}>
          Country <span aria-hidden="true" className="text-turmeric">*</span>
        </label>
        <input
          id="rfq-country"
          name="country"
          type="text"
          required
          autoComplete="country-name"
          placeholder="e.g. UAE, United Kingdom, United States"
          aria-invalid={Boolean(state.fieldErrors?.country)}
          aria-describedby={state.fieldErrors?.country ? 'rfq-country-error' : undefined}
          className={inputClass}
        />
        {state.fieldErrors?.country && (
          <p id="rfq-country-error" className={errorClass}>
            {state.fieldErrors.country}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="rfq-product-qty" className={labelClass}>
          Product and Quantity <span aria-hidden="true" className="text-turmeric">*</span>
        </label>
        <input
          id="rfq-product-qty"
          name="product_quantity"
          type="text"
          required
          value={productValue}
          onChange={(e) => setProductValue(e.target.value)}
          placeholder="e.g. Malabar Black Pepper, 10 MT, 25 kg bags"
          aria-invalid={Boolean(state.fieldErrors?.product_quantity)}
          aria-describedby={state.fieldErrors?.product_quantity ? 'rfq-product-error' : undefined}
          className={inputClass}
        />
        {state.fieldErrors?.product_quantity && (
          <p id="rfq-product-error" className={errorClass}>
            {state.fieldErrors.product_quantity}
          </p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-sm bg-turmeric px-7 py-3.5 text-sm font-semibold text-espresso transition-colors hover:bg-turmeric-hover disabled:opacity-60 sm:w-auto"
        >
          {isPending ? 'Sending...' : 'Request a quote'}
        </button>
      </div>
    </form>
  );
}
