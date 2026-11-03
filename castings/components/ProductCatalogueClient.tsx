'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PRODUCTS, type CastingProduct } from '@/lib/products';

const MATERIALS: Array<'All' | CastingProduct['material']> = [
  'All',
  'Stainless Steel',
  'Carbon Steel',
  'Ductile Iron',
  'Aluminium',
];

const PROCESSES: Array<'All' | CastingProduct['process']> = [
  'All',
  'Investment Cast',
  'Sand Cast',
  'CNC Turned',
];

export function ProductCatalogueClient() {
  const [selectedMaterial, setSelectedMaterial] = useState<'All' | CastingProduct['material']>('All');
  const [selectedProcess, setSelectedProcess] = useState<'All' | CastingProduct['process']>('All');

  const filtered = PRODUCTS.filter((p) => {
    const matchMat = selectedMaterial === 'All' || p.material === selectedMaterial;
    const matchProc = selectedProcess === 'All' || p.process === selectedProcess;
    return matchMat && matchProc;
  });

  return (
    <div>
      {/* Filter Controls */}
      <div className="mb-10 flex flex-col gap-4 border border-graphite/20 bg-paper-warm p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-xs font-semibold uppercase tracking-wider text-graphite/70">
            Alloy:
          </span>
          {MATERIALS.map((mat) => {
            const active = selectedMaterial === mat;
            return (
              <button
                key={mat}
                type="button"
                onClick={() => setSelectedMaterial(mat)}
                aria-pressed={active}
                className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  active
                    ? 'bg-graphite font-semibold text-molten'
                    : 'border border-graphite/25 bg-paper text-graphite hover:border-graphite'
                }`}
              >
                {mat}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-xs font-semibold uppercase tracking-wider text-graphite/70">
            Process:
          </span>
          {PROCESSES.map((proc) => {
            const active = selectedProcess === proc;
            return (
              <button
                key={proc}
                type="button"
                onClick={() => setSelectedProcess(proc)}
                aria-pressed={active}
                className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  active
                    ? 'bg-graphite font-semibold text-molten'
                    : 'border border-graphite/25 bg-paper text-graphite hover:border-graphite'
                }`}
              >
                {proc}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalogue Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product) => (
          <article
            key={product.slug}
            className="group flex flex-col border border-graphite/25 bg-paper transition-colors hover:border-graphite"
          >
            <Link
              href={`/products/${product.slug}`}
              className="relative aspect-[4/3] w-full overflow-hidden bg-graphite"
            >
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-graphite/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-molten">
                {product.partNumber}
              </span>
            </Link>

            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-graphite/65">
                  {product.material} · {product.process}
                </p>
                <h2 className="mt-1.5 font-display-expanded text-lg font-bold uppercase tracking-tight text-graphite">
                  <Link href={`/products/${product.slug}`} className="hover:text-molten-hover">
                    {product.name}
                  </Link>
                </h2>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-graphite/15 pt-3 font-mono text-xs">
                <Link
                  href={`/products/${product.slug}`}
                  className="font-semibold uppercase tracking-wider text-graphite hover:text-molten-hover"
                >
                  Specs →
                </Link>
                <a
                  href={product.specPdf}
                  download
                  className="text-graphite/70 underline decoration-graphite/40 underline-offset-4 hover:text-graphite"
                >
                  PDF
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
