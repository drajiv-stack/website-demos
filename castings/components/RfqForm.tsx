'use client';

import { useActionState, useEffect, useState } from 'react';
import { submitRfqAction, type RfqActionState } from '@/app/actions/rfq';

const initialState: RfqActionState = {
  status: 'idle',
};

export function RfqForm({ defaultProduct = '' }: { defaultProduct?: string }) {
  const [state, formAction, isPending] = useActionState(submitRfqAction, initialState);
  const [loadedAt, setLoadedAt] = useState<number>(0);

  useEffect(() => {
    setLoadedAt(Date.now());
  }, []);

  if (state.status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-molten bg-graphite-light p-8 text-paper"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-molten">
          RFQ LOGGED // KINESIS DESK
        </p>
        <h3 className="mt-2 font-display-expanded text-2xl font-bold uppercase text-paper">
          Inquiry received.
        </h3>
        <p className="mt-3 text-base text-paper/85">
          {state.message ?? 'We reply within 24 hours with price, MOQ and lead time.'}
        </p>
      </div>
    );
  }

  return (
    <form
      id="rfq-form"
      action={formAction}
      noValidate
      className="border border-steel/35 bg-graphite-light p-6 sm:p-10"
    >
      {/* Hidden Honeypot Field */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website_url">Company Website</label>
        <input
          id="website_url"
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Time-gate timestamp */}
      <input type="hidden" name="loaded_at" value={loadedAt} />

      {state.status === 'error' && state.message && (
        <div
          role="alert"
          className="mb-6 border border-molten bg-graphite p-4 font-mono text-xs text-molten"
        >
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="rfq-name"
            className="block font-mono text-xs uppercase tracking-wider text-paper/90"
          >
            Full name *
          </label>
          <input
            id="rfq-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Lukas Weber"
            className="mt-2 w-full border border-steel/40 bg-graphite px-4 py-3 text-sm text-paper placeholder:text-steel/60 focus:border-molten focus:outline-none"
          />
          {state.fieldErrors?.name && (
            <p className="mt-1 font-mono text-xs text-molten">{state.fieldErrors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="rfq-email"
            className="block font-mono text-xs uppercase tracking-wider text-paper/90"
          >
            Business email *
          </label>
          <input
            id="rfq-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="l.weber@fluidtechnik.de"
            className="mt-2 w-full border border-steel/40 bg-graphite px-4 py-3 text-sm text-paper placeholder:text-steel/60 focus:border-molten focus:outline-none"
          />
          {state.fieldErrors?.email && (
            <p className="mt-1 font-mono text-xs text-molten">{state.fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="rfq-country"
            className="block font-mono text-xs uppercase tracking-wider text-paper/90"
          >
            Destination country *
          </label>
          <input
            id="rfq-country"
            name="country"
            type="text"
            required
            autoComplete="country-name"
            placeholder="Germany"
            className="mt-2 w-full border border-steel/40 bg-graphite px-4 py-3 text-sm text-paper placeholder:text-steel/60 focus:border-molten focus:outline-none"
          />
          {state.fieldErrors?.country && (
            <p className="mt-1 font-mono text-xs text-molten">{state.fieldErrors.country}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="rfq-product"
            className="block font-mono text-xs uppercase tracking-wider text-paper/90"
          >
            Component &amp; annual quantity *
          </label>
          <input
            id="rfq-product"
            name="product_quantity"
            type="text"
            required
            defaultValue={defaultProduct}
            placeholder="e.g. SS316 valve body, 2,000 pcs/yr, drawing available"
            className="mt-2 w-full border border-steel/40 bg-graphite px-4 py-3 text-sm text-paper placeholder:text-steel/60 focus:border-molten focus:outline-none"
          />
          {state.fieldErrors?.product_quantity && (
            <p className="mt-1 font-mono text-xs text-molten">
              {state.fieldErrors.product_quantity}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="rfq-message"
          className="block font-mono text-xs uppercase tracking-wider text-paper/90"
        >
          Machining notes or target Incoterms (optional)
        </label>
        <textarea
          id="rfq-message"
          name="message"
          rows={3}
          placeholder="CIF Hamburg or FOB Mundra, required delivery schedule..."
          className="mt-2 w-full border border-steel/40 bg-graphite px-4 py-3 text-sm text-paper placeholder:text-steel/60 focus:border-molten focus:outline-none"
        />
        {state.fieldErrors?.message && (
          <p className="mt-1 font-mono text-xs text-molten">{state.fieldErrors.message}</p>
        )}
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-mono text-xs text-steel">
          Drawings: after we reply, we send a secure upload link.
        </p>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center bg-molten px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-graphite transition-colors hover:bg-molten-hover disabled:opacity-60 sm:w-auto"
        >
          {isPending ? 'Sending...' : 'Request a quote'}
        </button>
      </div>
    </form>
  );
}
