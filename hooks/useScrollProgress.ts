'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollProgress {
  progress: number;
  scrollY: number;
}

export function useScrollProgress(): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({ progress: 0, scrollY: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
      setState({ progress, scrollY });
      rafRef.current = 0;
    };

    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return state;
}
