"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps extends HTMLAttributes<HTMLDivElement> {
  show?: boolean;
  onFinish?: () => void;
}

export function LoadingScreen({ className, show = true, onFinish, ...props }: LoadingScreenProps) {
  const [phase, setPhase] = useState(2); // Start at 2 — everything visible instantly
  const [progress, setProgress] = useState(0);
  const [internalShow, setInternalShow] = useState(show);

  useEffect(() => {
    if (!show) return;

    // Animate progress bar immediately
    let raf: number;
    let start: number | null = null;
    const duration = 1100; // bar fills in 1.1s

    const animateBar = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(animateBar);
      } else {
        // Bar done — trigger exit immediately
        setPhase(3);
      }
    };

    const t3 = setTimeout(() => {
      raf = requestAnimationFrame(animateBar);
    }, 50);

    // Safety exit fallback (in case RAF doesn't fire)
    const t4 = setTimeout(() => setPhase(3), 1300);

    // Unmount
    const t5 = setTimeout(() => {
      sessionStorage.setItem('brolyticsLoadingSeen', 'true');
      setInternalShow(false);
      if (onFinish) onFinish();
    }, 1900);

    return () => {
      clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5);
      cancelAnimationFrame(raf);
    };
  }, [show, onFinish]);

  if (!internalShow) return null;

  const exiting = phase >= 3;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-white",
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
        exiting ? "opacity-0 scale-[1.06] pointer-events-none" : "opacity-100 scale-100",
        className
      )}
      {...props}
    >
      {/* ── Ambient glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] rounded-[100%] blur-[140px] pointer-events-none transition-opacity duration-700"
        style={{
          background: 'radial-gradient(ellipse, hsl(345 63% 34% / 0.08) 0%, transparent 70%)',
          opacity: exiting ? 0 : 1,
        }}
      />

      {/* ── Subtle dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(345 63% 34%) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center gap-3 w-full px-4">

        {/* Logo — pops in on mount */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            maxWidth: '860px',
            height: 'clamp(130px, 26vw, 240px)',
            animation: exiting ? 'none' : 'popIn 0.55s cubic-bezier(0.34,1.56,0.64,1) both',
            opacity: exiting ? 0 : undefined,
            transform: exiting ? 'scale(1.08)' : undefined,
            transition: exiting ? 'opacity 0.6s ease, transform 0.6s ease' : 'none',
          }}
        >
          <Image
            src="/newwblt.png"
            alt="Brolytics"
            fill
            className="object-contain scale-125"
            priority
          />

          {/* Shimmer sweep */}
          {!exiting && (
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
              aria-hidden
            >
              <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-20deg] animate-[shimmerSweep_2.4s_ease-in-out_1.2s_infinite]" />
            </div>
          )}
        </div>

        {/* Tagline — slides up after logo */}
        <p
          className="text-[11px] md:text-[13px] font-semibold tracking-[0.28em] uppercase text-silver-400"
          style={{
            animation: exiting ? 'none' : 'slideUpFade 0.5s ease 0.35s both',
            opacity: exiting ? 0 : undefined,
            transition: exiting ? 'opacity 0.5s ease' : 'none',
          }}
        >
          Crafting Digital Excellence
        </p>

        {/* Progress bar — slides up after tagline */}
        <div
          className="flex flex-col items-center gap-3 w-[clamp(220px,42vw,400px)]"
          style={{
            animation: phase >= 2 && !exiting ? 'slideUpFade 0.45s ease 0s both' : 'none',
            opacity: phase >= 2 && !exiting ? undefined : 0,
            transition: exiting ? 'opacity 0.4s ease' : 'none',
          }}
        >
          {/* Track */}
          <div className="w-full h-[3px] rounded-full bg-silver-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary/70 via-primary to-primary/80"
              style={{
                width: `${progress}%`,
                transition: 'width 0.05s linear',
                boxShadow: '0 0 10px hsl(345 63% 34% / 0.5)',
              }}
            />
          </div>

          {/* Percentage */}
          <span className="text-[11px] font-mono font-semibold text-silver-400 tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.4); }
          70%  { opacity: 1; transform: scale(1.06); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUpFade {
          0%   { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerSweep {
          0%   { left: -40%; }
          60%  { left: 120%; }
          100% { left: 120%; }
        }
      `}</style>
    </div>
  );
}
