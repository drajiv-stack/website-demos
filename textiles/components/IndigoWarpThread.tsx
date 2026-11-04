'use client';

import { useEffect, useState } from 'react';
import { useShowroom } from '@/lib/swatch-context';
import type { Locale } from '@/lib/products';

const ACT_LABELS_EN = [
  'I · Showroom Gate',
  'II · Room Panorama',
  'III · Weave Loupe',
  'IV · Retail & Loom',
  'V · Swatch Desk',
];

const ACT_LABELS_DE = [
  'I · Showroom-Eingang',
  'II · Raum-Panorama',
  'III · Gewebelupe',
  'IV · Konfektion & Websaal',
  'V · Musterbuch-Tisch',
];

export function IndigoWarpThread({ lang }: { lang: Locale }) {
  const { activeThreadHex } = useShowroom();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setProgress(1);
      return;
    }

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - window.innerHeight);
        const pct = Math.min(1, Math.max(0, window.scrollY / max));
        setProgress(pct);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const actIndex = Math.min(4, Math.floor(progress * 5));
  const labels = lang === 'de' ? ACT_LABELS_DE : ACT_LABELS_EN;

  return (
    <>
      {/* Fixed Left Vertical Loom-Rail (Desktop Architectural Spine) */}
      <aside
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 bottom-0 z-30 hidden w-16 flex-col items-center justify-between border-r border-stone/40 bg-linen/90 py-6 backdrop-blur-xs lg:flex"
      >
        {/* Top SVG Yarn Cone Origin */}
        <div className="flex flex-col items-center gap-1.5">
          <svg
            viewBox="0 0 36 36"
            className="h-7 w-7 transition-colors duration-300"
            style={{ color: activeThreadHex }}
          >
            <path
              d="M14 5h8l4 24H10L14 5z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M12 11l12 4M11 17l14 4M11 23l14 4"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <circle cx="18" cy="31" r="2" fill="currentColor" />
          </svg>
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-stone-dark">
            NOOL
          </span>
        </div>

        {/* Continuous Vertical Indigo Warp Thread + Travelling Shuttle Node */}
        <div className="relative my-4 flex-1 w-6 flex justify-center">
          {/* Background un-drawn stone track */}
          <div className="h-full w-[1.5px] bg-stone/45" />

          {/* Active drawn warp thread */}
          <div
            className="absolute top-0 left-1/2 w-[2px] -translate-x-1/2 origin-top transition-colors duration-300"
            style={{
              height: '100%',
              backgroundColor: activeThreadHex,
              transform: `translateX(-50%) scaleY(${Math.max(0.04, progress)})`,
            }}
          />

          {/* Travelling Loom Shuttle Node */}
          <div
            className="absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-alabaster shadow-xs transition-colors duration-300"
            style={{
              top: `${Math.min(96, Math.max(2, progress * 96))}%`,
              backgroundColor: activeThreadHex,
            }}
          />
        </div>

        {/* Bottom Active Act Indicator */}
        <div className="flex flex-col items-center gap-2">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider text-alabaster transition-colors duration-300"
            style={{ backgroundColor: activeThreadHex }}
          >
            0{actIndex + 1}
          </span>
          <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-dark">
            {labels[actIndex]}
          </span>
        </div>
      </aside>
    </>
  );
}

/* Inline Section-to-Section Woven Thread Bridge */
export function SectionThreadBridge({
  actNumber,
  label,
}: {
  actNumber: string;
  label: string;
}) {
  const { activeThreadHex } = useShowroom();

  return (
    <div
      aria-hidden="true"
      className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8"
    >
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full transition-colors duration-300"
          style={{ backgroundColor: activeThreadHex }}
        />
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-dark">
          {actNumber} — {label}
        </span>
      </div>
      <svg className="h-4 flex-1" preserveAspectRatio="none" viewBox="0 0 600 16">
        <path
          d="M 0 8 Q 150 1, 300 8 T 600 8"
          fill="none"
          stroke={activeThreadHex}
          strokeWidth="1.25"
          strokeDasharray="6 5"
        />
      </svg>
    </div>
  );
}
