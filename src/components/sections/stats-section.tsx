"use client";

import { useEffect, useRef } from "react";
import { TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";
import type { SiteContent } from "@/lib/content-types";
import { getIcon } from "@/lib/icon-map";

interface StatsSectionProps {
  content: SiteContent['stats'];
}

function StatItem({
  end,
  label,
  hint,
  Icon,
  plus = true,
  isVisible,
  index,
}: {
  end: number;
  label: string;
  hint: string;
  Icon: React.ElementType;
  plus?: boolean;
  isVisible: boolean;
  index: number;
}) {
  const { count, startAnimation } = useCountUp(end, 2000);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      const timer = setTimeout(() => startAnimation(), index * 120);
      hasAnimated.current = true;
      return () => clearTimeout(timer);
    }
  }, [isVisible, startAnimation, index]);

  return (
    <div
      className={cn(
        "group relative h-full transition-all duration-500 transform-gpu",
        ""
      )}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div
        className={cn(
          "relative flex h-full flex-col rounded-2xl bg-white overflow-hidden",
          "shadow-[0_4px_24px_-6px_rgba(0,0,0,0.18),0_12px_40px_-16px_rgba(0,0,0,0.12)]",
          "transition-all duration-400 hover:-translate-y-2",
          "hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.28),0_0_0_1px_rgba(255,255,255,0.08)]"
        )}
      >
        <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-primary via-[hsl(345,58%,38%)] to-primary/60 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative flex flex-1 flex-col items-center text-center px-4 pt-6 pb-5 sm:px-5 sm:pt-7 sm:pb-6">
          <div className="mb-4 sm:mb-5 inline-flex p-3 rounded-xl bg-gradient-to-br from-primary to-[hsl(345,58%,32%)] text-white shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/35 group-hover:scale-105 transition-all duration-400">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </div>

          <p className="text-3xl sm:text-4xl font-black text-silver-900 tracking-tight tabular-nums leading-none mb-2 group-hover:text-primary transition-colors duration-400">
            {count}
            {plus && <span className="text-primary">+</span>}
          </p>

          <p className="text-[10px] sm:text-[11px] font-bold text-silver-800 uppercase tracking-[0.14em] leading-snug mb-3 px-1">
            {label}
          </p>

          <div className="mt-auto w-full pt-3 border-t border-silver-100">
            <p className="text-[11px] sm:text-xs text-silver-400 leading-snug group-hover:text-silver-500 transition-colors duration-300">
              {hint}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsSection({ content }: StatsSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
  const stats = content.items.map(item => ({ ...item, Icon: getIcon(item.icon) }));
  const { header } = content;

  return (
    <section
      ref={ref}
      id="stats"
      className="relative py-16 sm:py-24 md:py-28 overflow-hidden bg-gradient-to-br from-[hsl(345,68%,18%)] via-primary to-[hsl(345,55%,32%)]"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[130px] animate-aurora-drift" />
        <div
          className="absolute top-1/3 right-0 w-[420px] h-[420px] bg-white/[0.05] rounded-full blur-[120px] animate-aurora-drift"
          style={{ animationDelay: "5s" }}
        />
        <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(hsl(0_0%_100%/.1)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_45%,black,transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-12 sm:mb-14 md:mb-16 max-w-3xl mx-auto transition-all duration-1000",
            ""
          )}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-6 rounded-full border border-white/25 bg-white/10 backdrop-blur-md shadow-[0_4px_24px_-4px_rgba(0,0,0,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white/50 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-white/90" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/90">
              {header.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.08] mb-5">
            <span className="text-white">{header.title}</span>
            <span className="bg-gradient-to-r from-white via-white/95 to-white/75 bg-clip-text text-transparent">
              {" "}{header.titleAccent}
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            {header.subtitle}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                index === stats.length - 1 && stats.length % 2 !== 0 &&
                  "col-span-2 sm:col-span-1 max-w-[300px] sm:max-w-none mx-auto sm:mx-0 w-full"
              )}
            >
              <StatItem {...stat} isVisible={isVisible} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
