'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface Props {
  totalFrames: number;
  onLoaded: (images: HTMLImageElement[]) => void;
}

export default function LoadingScreen({ totalFrames, onLoaded }: Props) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);
  const startedRef = useRef(false);

  const startLoad = useCallback(() => {
    // Guard against double-invoke (React StrictMode double-effect)
    if (startedRef.current) return;
    startedRef.current = true;

    const images: HTMLImageElement[] = new Array(totalFrames);
    let count = 0;

    const onSettle = () => () => {
      count++;
      setLoadedCount(count);
      if (count === totalFrames) {
        setFading(true);
        setTimeout(() => {
          setVisible(false);
          onLoaded(images);
        }, 600);
      }
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      // IMPORTANT: set onload / onerror BEFORE setting src
      img.onload = onSettle();
      img.onerror = onSettle();
      img.src = `/frames/frame_${String(i + 1).padStart(4, '0')}.webp`;
      images[i] = img;
    }
  }, [totalFrames, onLoaded]);

  useEffect(() => {
    startLoad();
  }, [startLoad]);

  if (!visible) return null;

  const pct = Math.round((loadedCount / totalFrames) * 100);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#080400',
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
      <span
        className="font-bebas"
        style={{ fontSize: 18, letterSpacing: 8, color: '#D4840A', userSelect: 'none' }}
      >
        STACK&apos;D
      </span>

      <span
        style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: 10,
          letterSpacing: 3,
          color: '#C8A870',
          textTransform: 'uppercase',
        }}
      >
        Loading the good stuff...
      </span>

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
            inset: '0 auto 0 0',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #D4840A, #F0A830)',
            transition: 'width 0.12s ease',
          }}
        />
      </div>

      <span
        style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: 11,
          color: '#C8A870',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {pct}%
      </span>
    </div>
  );
}
