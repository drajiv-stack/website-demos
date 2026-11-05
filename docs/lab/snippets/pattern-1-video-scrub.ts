/**
 * Pattern 1: Scroll-Scrubbed Video
 *
 * Usage Note:
 * 1. Pin 100svh viewport over a 300-400vh track (target 10-20 px per video frame).
 * 2. Encode video with `-g 8 -keyint_min 8 -sc_threshold 0` for dense keyframe seeking.
 * 3. Never set video.currentTime directly on raw scroll events; queue targets behind the `seeked` event.
 * 4. Serve a lightweight 480p encode or static poster for mobile viewports (< 768px).
 * 5. Provide an immediate static poster fallback when `prefers-reduced-motion` is active.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useVideoScrub(
  containerRef: React.RefObject<HTMLDivElement | null>,
  videoRef: React.RefObject<HTMLVideoElement | null>
) {
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let isSeeking = false;
    let queuedTime: number | null = null;

    const handleSeeked = () => {
      if (queuedTime !== null) {
        const nextTime = queuedTime;
        queuedTime = null;
        video.currentTime = nextTime;
      } else {
        isSeeking = false;
      }
    };

    video.addEventListener('seeked', handleSeeked);

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const duration = video.duration || 5;
        const targetTime = Math.min(duration - 0.05, Math.max(0, self.progress * duration));

        if (isSeeking) {
          queuedTime = targetTime;
        } else {
          isSeeking = true;
          video.currentTime = targetTime;
        }
      },
    });

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      st.kill();
    };
  }, [containerRef, videoRef]);
}
