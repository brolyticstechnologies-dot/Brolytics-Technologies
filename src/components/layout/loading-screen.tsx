"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Skip splash if already seen in current browser session
    try {
      if (sessionStorage.getItem('brolytics_splash_seen') === 'true') {
        setVisible(false);
        return;
      }
    } catch {
      // Storage unavailable or disabled
    }

    const duration = 1200; // Total 1.2s load animation
    const startTime = performance.now();
    let animFrame: number;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        // Progress reached 100% — trigger exit fade
        setExiting(true);
        setTimeout(() => {
          try {
            sessionStorage.setItem('brolytics_splash_seen', 'true');
          } catch {}
          setVisible(false);
        }, 450);
      }
    };

    animFrame = requestAnimationFrame(updateProgress);

    // Hard fallback timeout: guaranteed to never stay open longer than 1.8s
    const hardTimeout = setTimeout(() => {
      setProgress(100);
      setExiting(true);
      setTimeout(() => setVisible(false), 400);
    }, 1800);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(hardTimeout);
    };
  }, []);

  // Don't render if not visible
  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-white",
        "transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
        exiting ? "opacity-0 scale-[1.05] pointer-events-none" : "opacity-100 scale-100"
      )}
    >
      {/* ── Ambient Background Glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[800px] h-[50vh] rounded-[100%] blur-[140px] pointer-events-none transition-opacity duration-500"
        style={{
          background: 'radial-gradient(ellipse, hsl(345 63% 34% / 0.12) 0%, transparent 70%)',
          opacity: exiting ? 0 : 1,
        }}
      />

      {/* ── Subtle Geometric Dot Grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(345 63% 34%) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Central Content ── */}
      <div className="relative z-10 flex flex-col items-center gap-4 w-full px-6 max-w-lg mx-auto">
        
        {/* Brand Logo */}
        <div
          className="relative w-full overflow-hidden flex items-center justify-center"
          style={{
            height: 'clamp(110px, 22vw, 190px)',
            animation: 'logoPopIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both',
          }}
        >
          <Image
            src="/newwblt.png"
            alt="Brolytics Technologies"
            fill
            className="object-contain scale-110"
            priority
          />
        </div>

        {/* Tagline */}
        <p
          className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-silver-500 text-center"
          style={{
            animation: 'fadeInUp 0.5s ease 0.2s both',
          }}
        >
          Crafting Digital Excellence
        </p>

        {/* Progress Bar Container */}
        <div
          className="flex flex-col items-center gap-2.5 w-full max-w-[320px] sm:max-w-[360px] mt-3"
          style={{
            animation: 'fadeInUp 0.5s ease 0.3s both',
          }}
        >
          {/* Progress Bar Track */}
          <div className="w-full h-2 rounded-full bg-silver-100 border border-silver-200/80 p-[1px] overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary/80 via-primary to-primary shadow-sm"
              style={{
                width: `${progress}%`,
                transition: 'width 0.05s linear',
                boxShadow: '0 0 12px hsl(345 63% 34% / 0.45)',
              }}
            />
          </div>

          {/* Percentage Counter */}
          <div className="flex items-center justify-between w-full px-1">
            <span className="text-[11px] font-bold tracking-wider text-silver-400 uppercase">
              Loading Experience
            </span>
            <span className="text-xs font-mono font-bold text-silver-700 tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* ── Keyframe Animations ── */}
      <style jsx global>{`
        @keyframes logoPopIn {
          0% { opacity: 0; transform: scale(0.6); }
          70% { opacity: 1; transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
