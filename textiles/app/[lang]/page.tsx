import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Act1AtelierStage } from '@/components/Act1AtelierStage';
import { Act2RoomExplorer } from '@/components/Act2RoomExplorer';
import { Act3WeaveWorkbench } from '@/components/Act3WeaveWorkbench';
import { Act4RetailReadiness } from '@/components/Act4RetailReadiness';
import { Act5SwatchDesk } from '@/components/Act5SwatchDesk';
import { isLocale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:
      lang === 'de'
        ? { absolute: 'NoolWeave Exports | Heimtextilien-Showroom aus Karur' }
        : { absolute: 'NoolWeave Exports | Home Textiles Showroom from Karur' },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <Act1AtelierStage lang={lang} />
      <Act2RoomExplorer lang={lang} />
      <Act3WeaveWorkbench lang={lang} />
      <Act4RetailReadiness lang={lang} />
      <Act5SwatchDesk lang={lang} />
    </>
  );
}
