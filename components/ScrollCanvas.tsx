'use client';

import { useEffect, useRef } from 'react';

interface Props {
  frames: HTMLImageElement[];
  progress: number;
}

export default function ScrollCanvas({ frames, progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastFrame = useRef<number>(-1);
  const rafRef = useRef<number>(0);
  const pendingProgress = useRef<number>(progress);

  useEffect(() => {
    pendingProgress.current = progress;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas || frames.length === 0) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const isMobile = window.innerWidth < 768;
      const totalFrames = frames.length;
      let frameIdx = Math.floor(pendingProgress.current * (totalFrames - 1));

      if (isMobile) {
        frameIdx = Math.floor(frameIdx / 2) * 2;
      }

      frameIdx = Math.max(0, Math.min(frameIdx, totalFrames - 1));

      if (frameIdx === lastFrame.current) return;
      lastFrame.current = frameIdx;

      const img = frames[frameIdx];
      if (!img || !img.complete) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh);
    };

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        draw();
      });
    }
  }, [frames, progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      lastFrame.current = -1;
      pendingProgress.current = pendingProgress.current;
      const ctx = canvas.getContext('2d');
      if (!ctx || frames.length === 0) return;

      const frameIdx = Math.floor(pendingProgress.current * (frames.length - 1));
      const img = frames[Math.max(0, Math.min(frameIdx, frames.length - 1))];
      if (!img || !img.complete) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const sw = img.naturalWidth * scale;
      const sh = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [frames]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Warm radial glow behind canvas */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(212,132,10,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'var(--bg-deep)',
          zIndex: 1,
        }}
      />
    </div>
  );
}
