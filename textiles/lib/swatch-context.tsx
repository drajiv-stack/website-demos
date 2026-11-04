'use client';

import React, { createContext, useContext, useState } from 'react';
import type { RegionCode } from '@/lib/products';

export interface PinnedSwatch {
  id: string;
  label_en: string;
  label_de: string;
  colour_en: string;
  colour_de: string;
  hex: string;
}

interface ShowroomContextValue {
  region: RegionCode;
  setRegion: (r: RegionCode) => void;
  activeThreadHex: string;
  setActiveThreadHex: (hex: string) => void;
  swatches: PinnedSwatch[];
  toggleSwatch: (s: PinnedSwatch) => void;
  hasSwatch: (id: string) => boolean;
}

const DEFAULT_SWATCHES: PinnedSwatch[] = [
  {
    id: 'washed-percale-indigo',
    label_en: 'Washed Organic Percale (200 TC†)',
    label_de: 'Bio-Perkal Bettwäsche (200 TC†)',
    colour_en: 'Mineral Indigo',
    colour_de: 'Mineral-Indigo',
    hex: '#2E3A8C',
  },
  {
    id: 'flax-linen-raw',
    label_en: 'European Flax Linen (170 GSM†)',
    label_de: 'Europäisches Reinleinen (170 GSM†)',
    colour_en: 'Undyed Raw Flax',
    colour_de: 'Ungefärbtes Rohleinen',
    hex: '#D4C8B4',
  },
];

const ShowroomContext = createContext<ShowroomContextValue | null>(null);

export function ShowroomProvider({
  initialRegion = 'de',
  children,
}: {
  initialRegion?: RegionCode;
  children: React.ReactNode;
}) {
  const [region, setRegion] = useState<RegionCode>(initialRegion);
  const [activeThreadHex, setActiveThreadHex] = useState<string>('#2E3A8C');
  const [swatches, setSwatches] = useState<PinnedSwatch[]>(DEFAULT_SWATCHES);

  const toggleSwatch = (item: PinnedSwatch) => {
    setSwatches((prev) => {
      const exists = prev.some((x) => x.id === item.id);
      if (exists) {
        return prev.filter((x) => x.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const hasSwatch = (id: string) => swatches.some((x) => x.id === id);

  return (
    <ShowroomContext.Provider
      value={{
        region,
        setRegion,
        activeThreadHex,
        setActiveThreadHex,
        swatches,
        toggleSwatch,
        hasSwatch,
      }}
    >
      {children}
    </ShowroomContext.Provider>
  );
}

export function useShowroom() {
  const ctx = useContext(ShowroomContext);
  if (!ctx) {
    throw new Error('useShowroom must be used within ShowroomProvider');
  }
  return ctx;
}
