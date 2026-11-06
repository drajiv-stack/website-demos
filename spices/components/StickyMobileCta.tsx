'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { COMPANY } from '@/lib/products';

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById('site-hero');
    if (!heroEl || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.08 }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const rawWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') ?? '';

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-sand/40 bg-espresso/95 px-4 py-3 backdrop-blur-sm transition-transform duration-250 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
    >
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <Link
          href="/contact#rfq-form"
          tabIndex={visible ? 0 : -1}
          className="flex-1 rounded-sm bg-turmeric px-4 py-2.5 text-center text-xs font-semibold text-espresso shadow-xs transition-colors hover:bg-turmeric-hover"
        >
          Request a quote
        </Link>
        {rawWhatsApp ? (
          <a
            href={`https://wa.me/${rawWhatsApp}?text=${encodeURIComponent(
              `Hello ${COMPANY.name}, I would like to request an export quote.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? 0 : -1}
            className="inline-flex items-center justify-center rounded-sm border border-sand/50 px-3.5 py-2.5 text-xs font-semibold text-cream hover:border-turmeric"
          >
            WhatsApp
          </a>
        ) : null}
      </div>
    </div>
  );
}
