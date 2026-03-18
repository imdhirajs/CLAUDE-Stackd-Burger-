'use client';

import { useEffect, useState, useCallback } from 'react';

interface Props {
  totalFrames: number;
  onLoaded: (images: HTMLImageElement[]) => void;
}

export default function LoadingScreen({ totalFrames, onLoaded }: Props) {
  const [loaded, setLoaded] = useState(0);
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);

  const startLoad = useCallback(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const num = String(i).padStart(4, '0');
      img.src = `/frames/frame_${num}.webp`;
      img.onload = img.onerror = () => {
        loadedCount++;
        setLoaded(loadedCount);
        if (loadedCount === totalFrames) {
          setFading(true);
          setTimeout(() => {
            setVisible(false);
            onLoaded(images);
          }, 600);
        }
      };
      images[i - 1] = img;
    }
  }, [totalFrames, onLoaded]);

  useEffect(() => {
    startLoad();
  }, [startLoad]);

  if (!visible) return null;

  const pct = Math.round((loaded / totalFrames) * 100);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-deep)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99990,
        gap: 20,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Brand */}
      <span
        className="font-bebas"
        style={{
          fontSize: 18,
          letterSpacing: 8,
          color: 'var(--toasted)',
          userSelect: 'none',
        }}
      >
        STACK&apos;D
      </span>

      {/* Loading label */}
      <span
        style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: 10,
          letterSpacing: 3,
          color: 'var(--cream-muted)',
          textTransform: 'uppercase',
        }}
      >
        Loading the good stuff...
      </span>

      {/* Progress bar */}
      <div
        style={{
          width: 240,
          height: 2,
          background: 'rgba(255,255,255,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #D4840A, #F0A830)',
            transition: 'width 0.1s ease',
          }}
        />
      </div>

      {/* Percentage */}
      <span
        style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: 11,
          color: 'var(--cream-muted)',
        }}
      >
        {pct}%
      </span>
    </div>
  );
}
