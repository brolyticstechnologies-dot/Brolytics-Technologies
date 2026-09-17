"use client";

import { ReactLenis } from '@studio-freight/react-lenis';
import { useEffect, useState } from 'react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Respect prefers-reduced-motion: skip Lenis entirely
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,           // Snappy, responsive inertia
        duration: 1.2,         // Natural momentum duration
        smoothWheel: true,     // Smooth mouse-wheel scrolling
        syncTouch: false,      // Preserve native 120Hz touch scrolling on mobile
      }}
    >
      {children}
    </ReactLenis>
  );
}
