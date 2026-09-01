"use client";

import { useEffect, useState } from 'react';
import type { SiteContent } from '@/lib/content-types';

export function useSiteContent(initial?: SiteContent) {
  const [content, setContent] = useState<SiteContent | null>(initial ?? null);

  useEffect(() => {
    if (initial) {
      setContent(initial);
      return;
    }

    let isMounted = true;
    fetch('/api/content', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data: SiteContent) => {
        if (isMounted) setContent(data);
      })
      .catch(console.error);

    return () => {
      isMounted = false;
    };
  }, [initial]);

  return content;
}
