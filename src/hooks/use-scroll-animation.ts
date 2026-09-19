"use client";

import { useEffect, useRef, useState, useTransition } from 'react';

export function useScrollAnimation<T extends HTMLElement = any>(options?: IntersectionObserverInit) {
  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [, startTransition] = useTransition();

  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTransition(() => {
            setIsVisible(true);
          });
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

  return { ref: elementRef, isVisible };
}
