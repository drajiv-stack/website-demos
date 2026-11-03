'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

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
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-steel/35 bg-graphite/95 px-4 py-3 backdrop-blur-md transition-transform duration-250 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
    >
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <Link
          href="/contact#rfq-form"
          tabIndex={visible ? 0 : -1}
          className="flex-1 bg-molten px-4 py-2.5 text-center font-mono text-xs font-semibold uppercase tracking-wider text-graphite transition-colors hover:bg-molten-hover"
        >
          Request a quote
        </Link>
        {rawWhatsApp ? (
          <a
            href={`https://wa.me/${rawWhatsApp}?text=${encodeURIComponent(
              'Hello Kinesis Cast & Machine Works, I would like to request an export casting quote.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? 0 : -1}
            className="inline-flex items-center justify-center border border-steel/50 px-3.5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-paper hover:border-molten"
          >
            WhatsApp
          </a>
        ) : null}
      </div>
    </div>
  );
}
