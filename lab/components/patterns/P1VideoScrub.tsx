'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLab } from '@/context/LabContext';
import { LAB_PATTERNS } from '@/lib/lab-data';
import { PatternWrapper } from './PatternWrapper';
import { ReadoutBadge } from '@/components/hud/ReadoutBadge';

export function P1VideoScrub() {
  const config = LAB_PATTERNS[0];
  const { isPatternBroken, showMarkers, simulateReducedMotion, setActiveSectionId, setActiveSectionProgress } = useLab();
  const isBroken = isPatternBroken(config.id);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Readouts state
  const [seekLatency, setSeekLatency] = useState<number>(18);
  const [droppedSeeks, setDroppedSeeks] = useState<number>(0);
  const [fileKb, setFileKb] = useState<number>(3552); // ~3.5 MB
  const [pxPerFrame, setPxPerFrame] = useState<number>(16);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Seek Queue Refs for Correct Mode
  const isSeekingRef = useRef<boolean>(false);
  const queuedTimeRef = useRef<number | null>(null);
  const seekStartRef = useRef<number>(0);
  const watchdogRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Reset readouts on mode toggle
    if (isBroken) {
      setFileKb(574); // pod-720-default.mp4
      setDroppedSeeks(0);
      setSeekLatency(140);
    } else {
      setFileKb(window.innerWidth < 768 ? 680 : 3552);
      setDroppedSeeks(0);
      setSeekLatency(22);
    }

    let isMounted = true;
    let ctx: { revert: () => void } | undefined;

    // Correct Mode Seek Queue Handler
    const handleSeeked = () => {
      if (watchdogRef.current) {
        clearTimeout(watchdogRef.current);
        watchdogRef.current = null;
      }

      if (seekStartRef.current > 0) {
        const delta = Math.round(performance.now() - seekStartRef.current);
        if (delta > 0 && delta < 500) {
          setSeekLatency(delta);
        }
        seekStartRef.current = 0;
      }

      if (queuedTimeRef.current !== null && !isBroken) {
        const nextTime = queuedTimeRef.current;
        queuedTimeRef.current = null;

        if (Math.abs(video.currentTime - nextTime) > 0.03 && video.readyState >= 2) {
          seekStartRef.current = performance.now();
          video.currentTime = nextTime;

          // Watchdog timer in case seeked doesn't fire
          watchdogRef.current = setTimeout(() => {
            isSeekingRef.current = false;
          }, 200);
        } else {
          isSeekingRef.current = false;
        }
      } else {
        isSeekingRef.current = false;
      }
    };

    video.addEventListener('seeked', handleSeeked);

    // Initial frame budget
    const updateFrameBudget = () => {
      const trackHeight = container.offsetHeight;
      const budget = Math.round(trackHeight / 150);
      setPxPerFrame(budget > 0 ? budget : 16);
    };
    updateFrameBudget();
    window.addEventListener('resize', updateFrameBudget);

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!isMounted) return;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: 'bottom bottom',
            markers: showMarkers,
            onEnter: () => setActiveSectionId('P1: Video Scrub'),
            onEnterBack: () => setActiveSectionId('P1: Video Scrub'),
            onUpdate: (self) => {
              const p = self.progress;
              setActiveSectionProgress(p);

              if (simulateReducedMotion) return;

              const duration = video.duration && !isNaN(video.duration) ? video.duration : 6.0;
              const targetTime = Math.min(duration - 0.05, Math.max(0, p * duration));

              if (isBroken) {
                // BROKEN: Direct currentTime assignment on every scroll event + GOP 1
                if (video.seeking) {
                  setDroppedSeeks((prev) => prev + 1);
                }
                const start = performance.now();
                video.currentTime = targetTime;
                setSeekLatency(Math.round(performance.now() - start + 120));
              } else {
                // CORRECT: Seek Queue with onseeked listener
                if (video.readyState < 2) {
                  queuedTimeRef.current = targetTime;
                  return;
                }

                if (Math.abs(video.currentTime - targetTime) < 0.03) {
                  return;
                }

                if (isSeekingRef.current) {
                  queuedTimeRef.current = targetTime;
                } else {
                  isSeekingRef.current = true;
                  seekStartRef.current = performance.now();
                  video.currentTime = targetTime;

                  // Safety watchdog
                  if (watchdogRef.current) clearTimeout(watchdogRef.current);
                  watchdogRef.current = setTimeout(() => {
                    isSeekingRef.current = false;
                  }, 200);
                }
              }
            },
          });
        }, container);
      }
    );

    return () => {
      isMounted = false;
      if (watchdogRef.current) clearTimeout(watchdogRef.current);
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('resize', updateFrameBudget);
      ctx?.revert();
    };
  }, [isBroken, showMarkers, simulateReducedMotion, setActiveSectionId, setActiveSectionProgress]);

  return (
    <PatternWrapper
      config={config}
      readouts={
        <>
          <ReadoutBadge
            label="Seek Latency"
            value={seekLatency}
            unit="ms"
            variant={isBroken ? 'red' : 'turmeric'}
          />
          <ReadoutBadge
            label="Dropped Seeks"
            value={droppedSeeks}
            variant={droppedSeeks > 10 ? 'red' : 'green'}
          />
          <ReadoutBadge
            label="Payload"
            value={(fileKb / 1024).toFixed(1)}
            unit="MB"
            variant="stone"
          />
        </>
      }
    >
      {/* 400vh Track with Sticky 100svh Viewport */}
      <div ref={containerRef} className="relative h-[400vh] w-full bg-[#1A1714]">
        <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-sm border border-[#332E29] bg-[#161412] shadow-2xl">
            {/* Active Mode Banner */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-xs border border-[#332E29] bg-[#161412]/90 px-3 py-1.5 font-mono text-xs backdrop-blur-xs">
              <span className={`h-2 w-2 rounded-full ${isBroken ? 'bg-red-500' : 'bg-[#D9911A]'}`} />
              <span className="font-semibold text-[#F5EDE0]">
                {isBroken ? config.brokenBadge : config.correctBadge}
              </span>
            </div>

            {/* Dynamic Frame Budget Readout Note */}
            <div className="absolute bottom-4 left-4 z-20 rounded-xs border border-[#332E29] bg-[#161412]/90 px-3 py-1.5 font-mono text-[11px] text-[#C9BFB5] backdrop-blur-xs">
              Frame budget: <strong className="text-[#D9911A]">{pxPerFrame} px/frame</strong> (target 10–20 px)
            </div>

            <video
              ref={videoRef}
              src={
                isBroken
                  ? '/media/pod-720-default.mp4'
                  : isMobile
                  ? '/media/pod-480-g8.mp4'
                  : '/media/pod-720-g8.mp4'
              }
              poster="/media/poster.webp"
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-contain pointer-events-none"
            />
          </div>
        </div>
      </div>
    </PatternWrapper>
  );
}
