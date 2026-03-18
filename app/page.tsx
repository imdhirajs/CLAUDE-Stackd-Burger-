'use client';

import { useState, useCallback } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import ScrollCanvas from '@/components/ScrollCanvas';
import TextOverlay from '@/components/TextOverlay';
import IngredientsSection from '@/components/IngredientsSection';
import StatsSection from '@/components/StatsSection';
import LocationsSection from '@/components/LocationsSection';

const TOTAL_FRAMES = 240;

export default function Home() {
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { progress, scrollY } = useScrollProgress();

  const handleLoaded = useCallback((images: HTMLImageElement[]) => {
    setFrames(images);
    setLoaded(true);
  }, []);

  // Canvas progress: normalize scrollY within the 500vh sticky section
  // Sticky section = 500vh container, but sticky element is 100vh, so it scrolls for 400vh
  // canvasProgress = scrollY / (400vh) clamped to [0,1]
  // We use a fixed calc; window.innerHeight is available on client since this is 'use client'
  const stickyScrollRange = typeof window !== 'undefined' ? 4 * window.innerHeight : 0;
  const canvasProgress =
    stickyScrollRange > 0 ? Math.min(scrollY / stickyScrollRange, 1) : 0;

  return (
    <>
      <LoadingScreen totalFrames={TOTAL_FRAMES} onLoaded={handleLoaded} />

      {loaded && (
        <>
          <Navbar scrollY={scrollY} />
          <ScrollProgressBar progress={progress} />

          {/* 500vh scroll container — sticky canvas zone */}
          <main style={{ height: '500vh', position: 'relative' }}>
            <div
              style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflow: 'hidden',
              }}
            >
              <ScrollCanvas frames={frames} progress={canvasProgress} />
              <TextOverlay progress={canvasProgress} />
            </div>
          </main>

          {/* Below-fold sections */}
          <IngredientsSection />
          <StatsSection />
          <LocationsSection />

          {/* Footer spacer */}
          <div
            style={{
              background: 'var(--bg-deep)',
              padding: '40px 5%',
              textAlign: 'center',
            }}
          >
            <span
              className="font-bebas"
              style={{
                fontSize: 14,
                letterSpacing: 4,
                color: 'var(--cream-muted)',
              }}
            >
              © 2026 STACK&apos;D — BUILT DIFFERENT.
            </span>
          </div>
        </>
      )}
    </>
  );
}
