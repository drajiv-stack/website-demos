'use client';

import { useActionState, useEffect, useState } from 'react';
import {
  submitTextilesRfq,
  type RfqActionState,
} from '@/app/actions/rfq';
import {
  COUNTRY_SHOWROOMS,
  SEEDED_PRODUCTS,
  type Locale,
} from '@/lib/products';
import { useShowroom } from '@/lib/swatch-context';

const initialState: RfqActionState = { status: 'idle' };

export function Act5SwatchDesk({
  lang,
  defaultProductText,
}: {
  lang: Locale;
  defaultProductText?: string;
}) {
  const [state, formAction, isPending] = useActionState(
    submitTextilesRfq,
    initialState
  );
  const { region, swatches, toggleSwatch, activeThreadHex } = useShowroom();
  const [loadedAt, setLoadedAt] = useState<string>('0');
  const [requestSwatchBook, setRequestSwatchBook] = useState<boolean>(true);
  const [customMessage, setCustomMessage] = useState<string>('');
  const [queryProduct, setQueryProduct] = useState<string>('');

  useEffect(() => {
    setLoadedAt(String(Date.now()));
    const slug = new URLSearchParams(window.location.search).get('product');
    const match = slug ? SEEDED_PRODUCTS.find((p) => p.slug === slug) : undefined;
    if (match) {
      setQueryProduct(
        lang === 'de'
          ? `${match.name_de} · 3 Farben · 1.500 Sets`
          : `${match.name_en} · 3 colourways · 1,500 sets`
      );
    }
  }, [lang]);

  const activeShowroom =
    COUNTRY_SHOWROOMS.find((c) => c.code === region) ?? COUNTRY_SHOWROOMS[0];

  const compiledSwatchSummary =
    defaultProductText ||
    queryProduct ||
    (swatches.length > 0
      ? swatches
          .map((s) =>
            lang === 'de'
              ? `${s.label_de} (${s.colour_de})`
              : `${s.label_en} (${s.colour_en})`
          )
          .join(' + ') + (lang === 'de' ? ' · 1.500 Sets' : ' · 1,500 sets')
      : '');

  const swatchBookPrefill =
    lang === 'de'
      ? `Bitte senden Sie uns das physische NoolWeave-Musterbuch & Farbkarten für ${activeShowroom.country_de} (${activeShowroom.duvet_size}, ${activeShowroom.incoterm}).`
      : `Please courier the physical NoolWeave Swatch Book & shade cards tailored for ${activeShowroom.country_en} (${activeShowroom.duvet_size}, ${activeShowroom.incoterm}).`;

  return (
    <section
      id="quote"
      aria-labelledby="quote-desk-heading"
      className="relative bg-linen py-20 text-ink sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left 5-Col: Bound Physical Swatch Book Card */}
          <div className="lg:col-span-5">
            <div
              className="relative rounded-sm border border-stone/70 bg-alabaster p-6 shadow-md sm:p-8"
              style={{
                borderLeftWidth: '6px',
                borderLeftColor: activeThreadHex,
              }}
            >
              {/* Stitched Thread Binding Badge */}
              <div className="flex items-center justify-between border-b border-stone/45 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo">
                  {lang === 'de'
                    ? 'MUSTERBUCH'
                    : 'SWATCH BOOK'}
                </span>
                <span className="rounded-full bg-indigo-soft px-2.5 py-0.5 text-xs font-semibold text-indigo">
                  {swatches.length}{' '}
                  {lang === 'de' ? 'Muster' : 'Cuttings'}
                </span>
              </div>

              <h2
                id="quote-desk-heading"
                className="mt-4 font-display text-3xl font-normal leading-tight text-ink sm:text-4xl"
              >
                {lang === 'de' ? (
                  <>
                    Musterbuch &amp; <span className="italic text-indigo">Angebot</span>.
                  </>
                ) : (
                  <>
                    Request <span className="italic text-indigo">swatches</span> &amp; quote.
                  </>
                )}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-stone-dark">
                {lang === 'de'
                  ? 'Antwort binnen 24 Std.† mit Preisen und Musterversand.'
                  : 'FOB/CIF pricing and courier dispatch within 24 hours†.'}
              </p>

              {/* Pinned Swatches List */}
              <div className="mt-5 space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-dark">
                  {lang === 'de'
                    ? 'Ausgewählte Gewebe & Farben:'
                    : 'Pinned Fabrics & Shades in Your Tray:'}
                </p>
                {swatches.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between gap-2 rounded-xs border border-stone/50 bg-linen px-3 py-2 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="h-4 w-4 shrink-0 rounded-full border border-ink/20"
                        style={{ backgroundColor: s.hex }}
                      />
                      <span className="truncate font-medium text-ink">
                        {lang === 'de'
                          ? `${s.label_de} · ${s.colour_de}`
                          : `${s.label_en} · ${s.colour_en}`}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSwatch(s)}
                      aria-label={lang === 'de' ? 'Entfernen' : 'Remove swatch'}
                      className="text-stone-dark hover:text-indigo"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Secondary Conversion Action: "Request a sample swatch book" prefill toggle */}
              <div className="mt-5 border-t border-stone/45 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    const next = !requestSwatchBook;
                    setRequestSwatchBook(next);
                    if (next && !customMessage) {
                      setCustomMessage(swatchBookPrefill);
                    }
                  }}
                  className={`w-full rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    requestSwatchBook
                      ? 'border-indigo bg-indigo-soft text-indigo'
                      : 'border-stone/70 bg-linen text-ink hover:border-indigo'
                  }`}
                >
                  {requestSwatchBook
                    ? lang === 'de'
                      ? '✓ Musterbuch inklusive'
                      : '✓ Swatch Book Included'
                    : lang === 'de'
                      ? '+ Musterbuch anfordern'
                      : '+ Request Swatch Book'}
                </button>
              </div>
            </div>
          </div>

          {/* Right 7-Col: 5-Field RFQ Form */}
          <div className="lg:col-span-7">
            <div className="rounded-sm border border-stone/65 bg-alabaster p-6 shadow-sm sm:p-8">
              {state.status === 'success' ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-sm border border-indigo/40 bg-indigo-soft/45 p-8 text-ink"
                >
                  <span className="inline-block rounded-full bg-indigo px-3 py-1 text-xs font-semibold uppercase tracking-wider text-alabaster">
                    {lang === 'de' ? 'Anfrage eingegangen' : 'Inquiry Received'}
                  </span>
                  <h3 className="mt-4 font-display text-3xl text-ink">
                    {lang === 'de'
                      ? 'Wir antworten innerhalb von 24 Stunden mit Preis, MOQ und Lieferzeit.'
                      : 'We reply within 24 hours with price, MOQ and lead time.'}
                  </h3>
                  <p className="mt-2 text-sm text-stone-dark">
                    {lang === 'de'
                      ? `Unser Export-Team in Karur bereitet Ihre Kalkulation (${activeShowroom.incoterm}) sowie den Versand Ihres Musterbuchs vor.`
                      : `Our Karur export desk is preparing your costing (${activeShowroom.incoterm}) and scheduling your physical swatch book dispatch.`}
                  </p>
                </div>
              ) : (
                <form action={formAction} className="space-y-4" noValidate>
                  {/* Hidden honeypot & timestamp */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_honeypot">Website</label>
                    <input
                      id="website_honeypot"
                      name="website_honeypot"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <input type="hidden" name="loaded_at" value={loadedAt} />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Field 1: Name */}
                    <div>
                      <label
                        htmlFor="rfq-name"
                        className="block text-xs font-semibold uppercase tracking-wider text-ink"
                      >
                        {lang === 'de' ? 'Name *' : 'Name *'}
                      </label>
                      <input
                        id="rfq-name"
                        name="name"
                        type="text"
                        required
                        placeholder={
                          lang === 'de' ? 'Sabine Lindner' : 'Sabine Lindner'
                        }
                        className="mt-1.5 w-full rounded-xs border border-stone/80 bg-linen px-3.5 py-2.5 text-sm text-ink placeholder:text-stone-dark/60 focus:border-indigo"
                      />
                    </div>

                    {/* Field 2: Business Email */}
                    <div>
                      <label
                        htmlFor="rfq-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-ink"
                      >
                        {lang === 'de'
                          ? 'E-Mail *'
                          : 'Email *'}
                      </label>
                      <input
                        id="rfq-email"
                        name="email"
                        type="email"
                        required
                        placeholder="buying@retail.com"
                        className="mt-1.5 w-full rounded-xs border border-stone/80 bg-linen px-3.5 py-2.5 text-sm text-ink placeholder:text-stone-dark/60 focus:border-indigo"
                      />
                    </div>
                  </div>

                  {/* Field 3: Country */}
                  <div>
                    <label
                      htmlFor="rfq-country"
                      className="block text-xs font-semibold uppercase tracking-wider text-ink"
                    >
                      {lang === 'de'
                        ? 'Zielhafen *'
                        : 'Destination Port *'}
                    </label>
                    <input
                      id="rfq-country"
                      name="country"
                      type="text"
                      required
                      defaultValue={
                        lang === 'de'
                          ? `${activeShowroom.country_de} (${activeShowroom.incoterm})`
                          : `${activeShowroom.country_en} (${activeShowroom.incoterm})`
                      }
                      key={activeShowroom.code}
                      className="mt-1.5 w-full rounded-xs border border-stone/80 bg-linen px-3.5 py-2.5 text-sm text-ink focus:border-indigo"
                    />
                  </div>

                  {/* Field 4: Product + Colourways + Quantity */}
                  <div>
                    <label
                      htmlFor="rfq-product-qty"
                      className="block text-xs font-semibold uppercase tracking-wider text-ink"
                    >
                      {lang === 'de'
                        ? 'Artikel & Menge *'
                        : 'Products & Volume *'}
                    </label>
                    <input
                      id="rfq-product-qty"
                      name="product_quantity"
                      type="text"
                      required
                      defaultValue={compiledSwatchSummary}
                      key={compiledSwatchSummary}
                      placeholder={
                        lang === 'de'
                          ? 'z. B. Perkal-Bettwäsche, 3 Farben, 1.500 Sets'
                          : 'e.g. Percale duvet set, 3 colourways, 1,500 sets'
                      }
                      className="mt-1.5 w-full rounded-xs border border-stone/80 bg-linen px-3.5 py-2.5 text-sm text-ink placeholder:text-stone-dark/60 focus:border-indigo"
                    />
                  </div>

                  {/* Field 5: Optional Message */}
                  <div>
                    <label
                      htmlFor="rfq-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-ink"
                    >
                      {lang === 'de'
                        ? 'Nachricht (optional)'
                        : 'Message (optional)'}
                    </label>
                    <textarea
                      id="rfq-message"
                      name="message"
                      rows={3}
                      value={
                        customMessage ||
                        (requestSwatchBook ? swatchBookPrefill : '')
                      }
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder={
                        lang === 'de'
                          ? 'Gewünschte Konfektionsmaße, Eigenmarken-Etiketten oder Lieferadresse für das Musterbuch…'
                          : 'Regional sizes, custom packaging notes, or courier address for the physical swatch book…'
                      }
                      className="mt-1.5 w-full rounded-xs border border-stone/80 bg-linen px-3.5 py-2.5 text-sm text-ink placeholder:text-stone-dark/60 focus:border-indigo"
                    />
                  </div>

                  {state.status === 'error' && state.message && (
                    <p
                      role="alert"
                      className="rounded-xs border border-red-700/40 bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-900"
                    >
                      {state.message}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <span className="text-xs text-stone-dark">
                      {lang === 'de'
                        ? 'Antwort innerhalb von 24 Std. · FOB Tuticorin / CIF Hamburg & Rotterdam'
                        : '24-hour export desk response · FOB Tuticorin / CIF Rotterdam & Melbourne'}
                    </span>
                    <button
                      type="submit"
                      disabled={isPending}
                      className="inline-flex items-center justify-center rounded-full bg-indigo px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-alabaster transition-colors hover:bg-indigo-hover disabled:opacity-60 sm:text-sm"
                    >
                      {isPending
                        ? lang === 'de'
                          ? 'Wird gesendet…'
                          : 'Sending…'
                        : lang === 'de'
                          ? 'Angebot & Musterbuch anfordern'
                          : 'Request Quote & Swatch Book'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
