'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FloatingBookSlotBtn() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show after scrolling a little bit or after 1.5 seconds
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Hide on /book-a-slot and /admin pages
  if (pathname === '/book-a-slot' || pathname?.startsWith('/admin') || dismissed || !visible) {
    return null;
  }

  return (
    <aside
      aria-label="Book a strategy call"
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center animate-fade-up"
    >
      <div className="relative group">
        {/* Glowing aura */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-primary/70 to-primary/40 opacity-70 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-300 pointer-events-none" />

        {/* Floating Button */}
        <Link
          href="/book-a-slot"
          className="relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-silver-950/95 text-white border border-white/20 shadow-2xl hover:bg-black transition-all duration-300 hover:scale-[1.04] backdrop-blur-md"
        >
          {/* Pulsing live dot */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>

          <Calendar className="w-4 h-4 text-primary shrink-0" />

          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-black tracking-tight leading-tight flex items-center gap-1">
              Book a Strategy Slot
              <Sparkles className="w-3 h-3 text-primary animate-pulse hidden sm:inline" />
            </span>
            <span className="text-[10px] text-silver-400 leading-tight hidden sm:inline font-medium">
              Free 30-min founder call
            </span>
          </div>
        </Link>

        {/* Close / Dismiss pill */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDismissed(true);
          }}
          aria-label="Dismiss floating booking button"
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-silver-800 text-silver-300 hover:text-white hover:bg-silver-700 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md border border-white/10"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
}
