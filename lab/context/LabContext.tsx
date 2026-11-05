'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface LabContextType {
  // Global Toggles
  showMarkers: boolean;
  setShowMarkers: (v: boolean) => void;
  enableLenis: boolean;
  setEnableLenis: (v: boolean) => void;
  simulateReducedMotion: boolean;
  setSimulateReducedMotion: (v: boolean) => void;
  globalBreakIt: boolean;
  setGlobalBreakIt: (v: boolean) => void;

  // Live Telemetry
  fps: number;
  setFps: (v: number) => void;
  pageScrollPercent: number;
  setPageScrollPercent: (v: number) => void;
  activeSectionId: string;
  setActiveSectionId: (id: string) => void;
  activeSectionProgress: number;
  setActiveSectionProgress: (p: number) => void;

  // Local Overrides: key is pattern id (e.g. 'p1', 'p2'), value is boolean (true = broken, false = correct, undefined = use global)
  patternOverrides: Record<string, boolean | undefined>;
  setPatternOverride: (id: string, broken: boolean | undefined) => void;
  isPatternBroken: (id: string) => boolean;
}

const LabContext = createContext<LabContextType | null>(null);

export function LabProvider({ children }: { children: React.ReactNode }) {
  const [showMarkers, setShowMarkers] = useState(false);
  const [enableLenis, setEnableLenis] = useState(false);
  const [simulateReducedMotion, setSimulateReducedMotion] = useState(false);
  const [globalBreakIt, setGlobalBreakIt] = useState(false);

  // Sync initial system reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq.matches) {
        setSimulateReducedMotion(true);
      }
      const handler = (e: MediaQueryListEvent) => setSimulateReducedMotion(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  const [fps, setFps] = useState(60);
  const [pageScrollPercent, setPageScrollPercent] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState('p1');
  const [activeSectionProgress, setActiveSectionProgress] = useState(0);

  const [patternOverrides, setPatternOverrides] = useState<Record<string, boolean | undefined>>({});

  const setPatternOverride = (id: string, broken: boolean | undefined) => {
    setPatternOverrides((prev) => ({ ...prev, [id]: broken }));
  };

  const isPatternBroken = (id: string): boolean => {
    if (patternOverrides[id] !== undefined) {
      return patternOverrides[id]!;
    }
    return globalBreakIt;
  };

  // Live Scroll Percentage Listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalDoc = document.documentElement.scrollHeight - window.innerHeight;
      const pct = totalDoc > 0 ? Math.min(100, Math.max(0, Math.round((scrollY / totalDoc) * 100))) : 0;
      setPageScrollPercent(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optional Lenis Integration (Desktop only, never on touch/reduced motion)
  useEffect(() => {
    if (!enableLenis || simulateReducedMotion || window.innerWidth < 768) return;

    let isMounted = true;
    let lenisInstance: any = null;
    let tickerCb: ((time: number) => void) | null = null;

    Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
        if (!isMounted) return;
        gsap.registerPlugin(ScrollTrigger);

        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        lenisInstance.on('scroll', ScrollTrigger.update);

        tickerCb = (time: number) => {
          lenisInstance.raf(time * 1000);
        };

        gsap.ticker.add(tickerCb);
        gsap.ticker.lagSmoothing(0);
      }
    );

    return () => {
      isMounted = false;
      if (tickerCb) {
        import('gsap').then(({ gsap }) => gsap.ticker.remove(tickerCb!));
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, [enableLenis, simulateReducedMotion]);

  return (
    <LabContext.Provider
      value={{
        showMarkers,
        setShowMarkers,
        enableLenis,
        setEnableLenis,
        simulateReducedMotion,
        setSimulateReducedMotion,
        globalBreakIt,
        setGlobalBreakIt,
        fps,
        setFps,
        pageScrollPercent,
        setPageScrollPercent,
        activeSectionId,
        setActiveSectionId,
        activeSectionProgress,
        setActiveSectionProgress,
        patternOverrides,
        setPatternOverride,
        isPatternBroken,
      }}
    >
      {children}
    </LabContext.Provider>
  );
}

export function useLab() {
  const ctx = useContext(LabContext);
  if (!ctx) throw new Error('useLab must be used within LabProvider');
  return ctx;
}
