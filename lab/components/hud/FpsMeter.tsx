'use client';

import React, { useEffect, useRef } from 'react';
import { useLab } from '@/context/LabContext';

export function FpsMeter() {
  const { fps, setFps } = useLab();
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const loop = (now: number) => {
      frameCountRef.current++;
      const delta = now - lastTimeRef.current;

      if (delta >= 500) {
        const calculated = Math.round((frameCountRef.current * 1000) / delta);
        setFps(calculated);
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [setFps]);

  const colorClass =
    fps >= 55
      ? 'text-emerald-400'
      : fps >= 40
      ? 'text-[#D9911A]'
      : 'text-red-400 font-bold animate-pulse';

  return (
    <div className="flex items-center gap-1.5 font-mono text-xs">
      <span className="text-[#8C827A]">FPS:</span>
      <span className={colorClass}>{fps}</span>
    </div>
  );
}
