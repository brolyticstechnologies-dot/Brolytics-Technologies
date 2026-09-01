"use client";

import { useState, useEffect, useRef } from 'react';

export function useScrollAnimation(options?: IntersectionObserverInit) {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  // Keep the latest options without making them a re-run dependency,
  // so the observer is created once and never torn down mid-observation.
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    if (!element) return;

    // If IntersectionObserver isn't available, reveal immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        ...optionsRef.current,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [element]);

  return { ref: setElement as any, isVisible };
}
