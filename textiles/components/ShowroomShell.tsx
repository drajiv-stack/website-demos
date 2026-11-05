'use client';

import React, { useEffect } from 'react';
import { ShowroomProvider, useShowroom } from '@/lib/swatch-context';
import { AtelierHeader } from '@/components/AtelierHeader';
import { AtelierFooter } from '@/components/AtelierFooter';
import type { Locale, RegionCode } from '@/lib/products';

// Reads ?region=eu|au from the URL on the client so public pages stay fully static
function RegionSync({ lang }: { lang: Locale }) {
  const { setRegion } = useShowroom();

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('region');
    if (lang === 'de') {
      setRegion('de');
    } else if (param === 'au' || param === 'eu') {
      setRegion(param);
    }
  }, [lang, setRegion]);

  return null;
}

export function ShowroomShell({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  const resolvedRegion: RegionCode = lang === 'de' ? 'de' : 'eu';

  return (
    <ShowroomProvider initialRegion={resolvedRegion}>
      <RegionSync lang={lang} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-indigo focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-alabaster"
      >
        {lang === 'de' ? 'Zum Inhalt springen' : 'Skip to main content'}
      </a>
      <AtelierHeader lang={lang} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <AtelierFooter lang={lang} />
    </ShowroomProvider>
  );
}
