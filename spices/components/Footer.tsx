import Link from 'next/link';
import { COMPANY, PRODUCTS } from '@/lib/products';
import { WhatsAppButton } from './WhatsAppButton';

export function Footer() {
  return (
    <footer className="border-t border-sand/40 bg-espresso text-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-semibold tracking-tight text-cream">
              {COMPANY.name}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-sand">
              Whole and ground Kerala spices sourced from smallholder farms in Idukki and Wayanad.
              Steam-sterilised, lot-coded and tested before container stuffing at Kochi port.
            </p>
            <dl className="mt-6 space-y-2 text-xs text-sand/90">
              <div>
                <dt className="font-semibold uppercase tracking-wider text-cream/80">Export Office</dt>
                <dd>{COMPANY.location}</dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-wider text-cream/80">Processing & Grading Unit</dt>
                <dd>{COMPANY.processingUnit}</dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-wider text-cream/80">Port of Loading</dt>
                <dd>{COMPANY.portOfLoading} · FOB &amp; CIF Jebel Ali, Felixstowe, Newark</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contact#rfq-form"
                className="inline-flex items-center rounded-sm bg-turmeric px-4 py-2.5 text-xs font-semibold text-espresso transition-colors hover:bg-turmeric-hover"
              >
                Request a quote
              </Link>
              <WhatsAppButton
                label="WhatsApp Export Desk"
                className="inline-flex items-center gap-2 rounded-sm border border-sand/40 px-4 py-2.5 text-xs font-semibold text-cream transition-colors hover:border-turmeric hover:text-turmeric"
              />
            </div>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-turmeric">
              Export Range (HS 0904 – 0910)
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              {PRODUCTS.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-sand transition-colors hover:text-cream"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-turmeric">
              Buyer Documentation
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/products" className="text-sand transition-colors hover:text-cream">
                  Full Spice Catalogue
                </Link>
              </li>
              <li>
                <Link href="/quality" className="text-sand transition-colors hover:text-cream">
                  Quality &amp; Laboratory Testing
                </Link>
              </li>
              <li>
                <a
                  href="/sample-coa-elakkaya-spices.pdf"
                  download
                  className="text-sand transition-colors hover:text-cream"
                >
                  Download Sample COA (PDF)
                </a>
              </li>
              <li>
                <Link href="/about" className="text-sand transition-colors hover:text-cream">
                  Idukki &amp; Wayanad Sourcing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sand transition-colors hover:text-cream">
                  Request a Quote / Samples
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-sand/20 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-sand/85">
          <p className="font-medium text-cream">
            Concept design — fictional company. Website by Rajiv Dudeja.
          </p>
          <p>
            All capacity, laboratory, transit and grade figures shown are labelled sample figures for portfolio demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
}
