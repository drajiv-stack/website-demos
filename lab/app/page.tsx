'use client';

import React from 'react';
import Link from 'next/link';
import { P1VideoScrub } from '@/components/patterns/P1VideoScrub';
import { P2CanvasSequence } from '@/components/patterns/P2CanvasSequence';
import { P3PinnedStory } from '@/components/patterns/P3PinnedStory';
import { P4HorizontalGallery } from '@/components/patterns/P4HorizontalGallery';
import { P5TextReveal } from '@/components/patterns/P5TextReveal';
import { P6ZoomThrough } from '@/components/patterns/P6ZoomThrough';
import { P7SvgRouteDraw } from '@/components/patterns/P7SvgRouteDraw';

export default function LabPage() {
  return (
    <main className="relative min-h-screen bg-[#1A1714] text-[#F5EDE0]">
      {/* Editorial Lab Hero */}
      <header className="relative border-b border-[#332E29] bg-[#161412] px-6 py-20 sm:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9911A]/40 bg-[#D9911A]/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-[#D9911A]">
            <span>🔬</span>
            <span>SCROLL LAB // BENCHMARK WORKBENCH</span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-normal leading-[1.08] tracking-tight text-[#F5EDE0] sm:text-6xl max-w-4xl">
            The 7 Scroll Patterns Built Twice:{' '}
            <span className="italic text-[#D9911A]">The Right Way vs The Broken Way.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#C9BFB5] sm:text-lg">
            An engineering sandbox measuring seek queues, canvas chunking, timeline synchronization, responsive translation bounds, and layout thrashing side-by-side.
          </p>

          {/* Quick Jump Bar */}
          <nav aria-label="Pattern Jump Bar" className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-[#8C827A] mr-2">PATTERNS:</span>
            {[
              { id: 'p1', label: '01 Video Scrub' },
              { id: 'p2', label: '02 Canvas Sequence' },
              { id: 'p3', label: '03 Pinned Story' },
              { id: 'p4', label: '04 Horizontal Gallery' },
              { id: 'p5', label: '05 Text Reveal' },
              { id: 'p6', label: '06 Zoom Through' },
              { id: 'p7', label: '07 SVG Route Draw' },
            ].map((p) => (
              <Link
                key={p.id}
                href={`#${p.id}`}
                className="rounded-xs border border-[#332E29] bg-[#221F1B] px-3 py-1.5 text-[#C9BFB5] hover:border-[#D9911A] hover:text-[#D9911A] transition-colors"
              >
                {p.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* The 7 Interactive Pattern Sections */}
      <P1VideoScrub />
      <P2CanvasSequence />
      <P3PinnedStory />
      <P4HorizontalGallery />
      <P5TextReveal />
      <P6ZoomThrough />
      <P7SvgRouteDraw />

      {/* Footer */}
      <footer className="border-t border-[#332E29] bg-[#161412] px-6 py-12 text-center font-mono text-xs text-[#8C827A]">
        <p>Concept design — internal learning lab. Website by Rajiv Dudeja.</p>
        <p className="mt-1 text-[11px] text-[#554D45]">
          Telemetry measurements recorded live from browser DOM, requestAnimationFrame delta, and HTMLMediaElement events.
        </p>
      </footer>
    </main>
  );
}
