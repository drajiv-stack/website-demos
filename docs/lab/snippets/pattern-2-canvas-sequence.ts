/**
 * Pattern 2: Canvas Image Sequence
 *
 * Usage Note:
 * 1. Superior to video scrub on low-tier mobile devices where hardware video decoders choke.
 * 2. Preload the first 5-10 frames for instant initial paint, lazy-loading the remainder in background chunks.
 * 3. Draw strictly within requestAnimationFrame to eliminate scroll jank and render duplicate calls.
 * 4. Scale canvas context with `window.devicePixelRatio` for retina-sharp photographic rendering.
 * 5. Handle window resize and aspect ratio letterboxing with clean containment logic.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useCanvasSequence(
  containerRef: React.RefObject<HTMLDivElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  totalFrames: number,
  framePathFn: (idx: number) => string
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const images: HTMLImageElement[] = new Array(totalFrames);
    let rafId: number | null = null;

    const drawFrame = (index: number) => {
      const img = images[index - 1];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = w / h;
      let drawW = w;
      let drawH = h;
      let offX = 0;
      let offY = 0;

      if (canvasAspect > imgAspect) {
        drawW = h * imgAspect;
        offX = (w - drawW) / 2;
      } else {
        drawH = w / imgAspect;
        offY = (h - drawH) / 2;
      }

      ctx.drawImage(img, offX, offY, drawW, drawH);
      ctx.restore();
    };

    // Preload initial 10 frames
    for (let i = 1; i <= Math.min(10, totalFrames); i++) {
      const img = new Image();
      img.src = framePathFn(i);
      images[i - 1] = img;
      if (i === 1) img.onload = () => drawFrame(1);
    }

    if (prefersReduced) return;

    // Progressive background chunking for remainder
    setTimeout(() => {
      for (let i = 11; i <= totalFrames; i++) {
        const img = new Image();
        img.src = framePathFn(i);
        images[i - 1] = img;
      }
    }, 200);

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const target = Math.min(totalFrames, Math.max(1, Math.round(self.progress * (totalFrames - 1)) + 1));
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => drawFrame(target));
      },
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      st.kill();
    };
  }, [containerRef, canvasRef, totalFrames, framePathFn]);
}
