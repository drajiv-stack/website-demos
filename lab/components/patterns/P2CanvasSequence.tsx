'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLab } from '@/context/LabContext';
import { LAB_PATTERNS } from '@/lib/lab-data';
import { PatternWrapper } from './PatternWrapper';
import { ReadoutBadge } from '@/components/hud/ReadoutBadge';

const TOTAL_FRAMES = 96;

export function P2CanvasSequence() {
  const config = LAB_PATTERNS[1];
  const { isPatternBroken, showMarkers, simulateReducedMotion, setActiveSectionId, setActiveSectionProgress } = useLab();
  const isBroken = isPatternBroken(config.id);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Readouts state
  const [totalKb, setTotalKb] = useState<number>(380);
  const [requestsCount, setRequestsCount] = useState<number>(10);
  const [timeToFirstFrame, setTimeToFirstFrame] = useState<number>(45);

  const currentFrameRef = useRef<number>(1);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isMounted = true;
    const startTime = performance.now();

    // Reset arrays
    imagesRef.current = new Array(TOTAL_FRAMES);

    const drawFrame = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex - 1];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // Center contain draw
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = displayWidth / displayHeight;
      let drawW = displayWidth;
      let drawH = displayHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasAspect > imgAspect) {
        drawW = displayHeight * imgAspect;
        offsetX = (displayWidth - drawW) / 2;
      } else {
        drawH = displayWidth / imgAspect;
        offsetY = (displayHeight - drawH) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      ctx.restore();
    };

    if (isBroken) {
      // BROKEN: Eager 96-image blast all at once on mount
      setRequestsCount(96);
      setTotalKb(3640);

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `/media/frames/f_${String(i).padStart(3, '0')}.webp`;
        imagesRef.current[i - 1] = img;
        if (i === 1) {
          img.onload = () => {
            if (isMounted) {
              setTimeToFirstFrame(Math.round(performance.now() - startTime));
              drawFrame(1);
            }
          };
        }
      }
    } else {
      // CORRECT: Preload first 10, lazy-load remaining 86 in chunks
      setRequestsCount(10);
      setTotalKb(380);

      // 1. Initial 10 frames
      for (let i = 1; i <= 10; i++) {
        const img = new Image();
        img.src = `/media/frames/f_${String(i).padStart(3, '0')}.webp`;
        imagesRef.current[i - 1] = img;
        if (i === 1) {
          img.onload = () => {
            if (isMounted) {
              setTimeToFirstFrame(Math.round(performance.now() - startTime));
              drawFrame(1);
            }
          };
        }
      }

      // 2. Progressive background idle chunking for remaining frames
      const loadRemaining = () => {
        if (!isMounted) return;
        let loaded = 10;
        const chunkInterval = setInterval(() => {
          if (!isMounted || loaded >= TOTAL_FRAMES) {
            clearInterval(chunkInterval);
            return;
          }
          const batch = Math.min(TOTAL_FRAMES, loaded + 10);
          for (let i = loaded + 1; i <= batch; i++) {
            const img = new Image();
            img.src = `/media/frames/f_${String(i).padStart(3, '0')}.webp`;
            imagesRef.current[i - 1] = img;
          }
          loaded = batch;
          setRequestsCount(loaded);
          setTotalKb(Math.round((loaded / TOTAL_FRAMES) * 3640));
        }, 120);
      };

      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(loadRemaining);
      } else {
        setTimeout(loadRemaining, 300);
      }
    }

    let gsapCtx: { revert: () => void } | undefined;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!isMounted) return;
        gsap.registerPlugin(ScrollTrigger);

        gsapCtx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: 'bottom bottom',
            markers: showMarkers,
            onUpdate: (self) => {
              const p = self.progress;
              setActiveSectionId('P2: Canvas Sequence');
              setActiveSectionProgress(p);

              if (simulateReducedMotion) return;

              const targetFrame = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(p * (TOTAL_FRAMES - 1)) + 1));
              currentFrameRef.current = targetFrame;

              if (isBroken) {
                // BROKEN: Unthrottled draw directly in scroll event
                drawFrame(targetFrame);
              } else {
                // CORRECT: Throttled to requestAnimationFrame
                if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = requestAnimationFrame(() => drawFrame(targetFrame));
              }
            },
          });
        }, container);
      }
    );

    return () => {
      isMounted = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      gsapCtx?.revert();
    };
  }, [isBroken, showMarkers, simulateReducedMotion, setActiveSectionId, setActiveSectionProgress]);

  return (
    <PatternWrapper
      config={config}
      readouts={
        <>
          <ReadoutBadge
            label="Initial Requests"
            value={requestsCount}
            variant={requestsCount > 20 ? 'red' : 'green'}
          />
          <ReadoutBadge
            label="Transferred"
            value={(totalKb / 1024).toFixed(2)}
            unit="MB"
            variant="stone"
          />
          <ReadoutBadge
            label="Time to First Frame"
            value={timeToFirstFrame}
            unit="ms"
            variant={timeToFirstFrame > 100 ? 'red' : 'turmeric'}
          />
        </>
      }
    >
      <div ref={containerRef} className="relative h-[300vh] w-full bg-[#1A1714]">
        <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
          {/* Active Mode Banner */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-xs border border-[#332E29] bg-[#161412]/90 px-3 py-1.5 font-mono text-xs">
            <span className={`h-2 w-2 rounded-full ${isBroken ? 'bg-red-500' : 'bg-[#D9911A]'}`} />
            <span className="font-semibold text-[#F5EDE0]">
              {isBroken ? config.brokenBadge : config.correctBadge}
            </span>
          </div>

          <canvas
            ref={canvasRef}
            className="h-full w-full object-contain"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </PatternWrapper>
  );
}
