import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageIntro } from '@/components/PageIntro';
import { CtaBand, EditorialRow } from '@/components/EditorialRow';
import { isLocale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const de = lang === 'de';
  return {
    title: de ? 'Nachhaltigkeit & Compliance' : 'Sustainability & Compliance',
    description: de
      ? 'Wasserrecycling in der Färberei, rückverfolgbare Garne und Musterzertifikate.'
      : 'Recycled dye-house water, traceable yarns and sample certificate placeholders.',
    alternates: {
      canonical: `/${lang}/sustainability`,
      languages: { en: '/en/sustainability', de: '/de/sustainability' },
    },
  };
}

function SampleCertificate({ code, title, note }: { code: string; title: string; note: string }) {
  return (
    <div className="flex aspect-[3/4] flex-col justify-between rounded-sm border-2 border-dashed border-indigo/50 bg-alabaster p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-xs bg-indigo-soft px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo">
          Sample certificate — placeholder only
        </span>
        <span className="font-mono text-xs text-stone-dark">{code}</span>
      </div>
      <div>
        <p className="font-display text-2xl text-ink">{title}</p>
        <p className="mt-2 text-xs text-stone-dark">{note}</p>
      </div>
      <div className="h-px w-full bg-stone/60" />
    </div>
  );
}

export default async function SustainabilityPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const de = lang === 'de';

  return (
    <>
      <PageIntro
        eyebrow={de ? 'Nachhaltigkeit · Rückverfolgbarkeit' : 'Sustainability · Traceability'}
        title={de ? 'Ruhiges Wasser,' : 'Quiet water,'}
        italic={de ? 'klare Herkunft.' : 'clear origins.'}
        lead={
          de
            ? 'Unsere Färberei bereitet ihr Prozesswasser auf, und jede Garncharge ist bis zum Exportkarton nachverfolgbar.'
            : 'Our dye house recycles its process water, and every yarn lot is traceable to the export carton.'
        }
      />
      <EditorialRow
        index="01"
        eyebrow={de ? 'Färberei' : 'Dye house'}
        title={de ? '92 % des Wassers kehren in den Kreislauf zurück†.' : '92% of process water returns to the loop†.'}
        body={
          de
            ? 'Küpenfärbung mit geschlossenem Wasserkreislauf und Solarvorwärmung – ohne Abwassereinleitung in den Amaravathi-Fluss.'
            : 'Closed-loop vat dyeing with solar pre-heating, and no effluent released to the Amaravathi river.'
        }
        image="/images/weaves/macro-linen.webp"
        imageAlt={de ? 'Nahaufnahme von Leinengewebe' : 'Macro view of linen weave'}
      />
      <section className="bg-linen py-14 sm:py-20 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-normal text-ink sm:text-4xl">
            {de ? 'Zertifikate auf Anfrage.' : 'Certificates on request.'}
          </h2>
          <p className="mt-3 max-w-xl text-base text-stone-dark">
            {de
              ? 'Die folgenden Karten sind gekennzeichnete Platzhalter. Echte Prüfberichte werden mit jedem Angebot geteilt.'
              : 'The cards below are labelled placeholders. Real test reports are shared with every quotation.'}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-3xl">
            <SampleCertificate
              code="DOC-NW-01"
              title={de ? 'Schadstoffgeprüfte Färbung' : 'Restricted-substance dye audit'}
              note={de ? 'Musterdokument zur Veranschaulichung.' : 'Illustrative sample document.'}
            />
            <SampleCertificate
              code="DOC-NW-02"
              title={de ? 'Chargen-Rückverfolgung Faser' : 'Fibre lot chain of custody'}
              note={de ? 'Musterdokument zur Veranschaulichung.' : 'Illustrative sample document.'}
            />
          </div>
        </div>
      </section>
      <CtaBand lang={lang} href={`/${lang}/contact`} />
    </>
  );
}
