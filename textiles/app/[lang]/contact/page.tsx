import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageIntro } from '@/components/PageIntro';
import { Act5SwatchDesk } from '@/components/Act5SwatchDesk';
import { COMPANY } from '@/lib/products';
import { isLocale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const de = lang === 'de';
  return {
    title: de ? 'Kontakt & Musterbuch' : 'Contact & Swatch Book',
    description: de
      ? 'Fordern Sie ein Angebot und ein physisches Musterbuch beim Export-Team in Karur an.'
      : 'Request a quote and a physical swatch book from our Karur export desk.',
    alternates: {
      canonical: `/${lang}/contact`,
      languages: { en: '/en/contact', de: '/de/contact' },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const de = lang === 'de';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '');

  return (
    <>
      <PageIntro
        eyebrow={de ? 'Kontakt · Export-Team Karur' : 'Contact · Karur export desk'}
        title={de ? 'Erzählen Sie uns' : 'Tell us about'}
        italic={de ? 'von Ihrer Kollektion.' : 'your collection.'}
        lead={
          de
            ? `${COMPANY.address}. Wir antworten auf Deutsch oder Englisch.`
            : `${COMPANY.address}. We reply in English or German.`
        }
      />
      <Act5SwatchDesk lang={lang} />
      {whatsapp && (
        <section className="border-t border-stone/45 bg-alabaster py-10 lg:pl-16">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <p className="font-display text-2xl text-ink">
              {de ? 'Lieber direkt schreiben?' : 'Prefer to message directly?'}
            </p>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/25 bg-linen px-6 py-3 text-xs font-semibold uppercase tracking-wider text-ink hover:border-indigo hover:text-indigo"
            >
              {de ? 'WhatsApp Export-Team' : 'WhatsApp export desk'}
            </a>
          </div>
        </section>
      )}
    </>
  );
}
