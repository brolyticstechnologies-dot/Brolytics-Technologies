"use client";

import { useEffect, useRef } from 'react';

export function useScrollAnimation<T extends HTMLElement = any>(options?: IntersectionObserverInit) {
  const elementRef = useRef<T | null>(null);

  // Keep the latest options without making them a re-run dependency,
  // so the observer is created once and never torn down mid-observation.
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If IntersectionObserver isn't available, reveal immediately.
    if (typeof IntersectionObserver === 'undefined') {
      element.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
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
  }, []);

  return { ref: elementRef, isVisible: false }; // Keep isVisible for backwards compatibility during refactor, but it doesn't trigger renders
}
