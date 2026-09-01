"use client";

import { CheckCircle2, Quote, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export interface ServiceIntroHighlight {
  icon: LucideIcon;
  label: string;
  description: string;
}

export interface ServiceIntroSectionProps {
  eyebrow: string;
  title: string;
  content: string;
  highlights?: ServiceIntroHighlight[];
}

export function ServiceIntroSection({
  eyebrow,
  title,
  content,
  highlights = [],
}: ServiceIntroSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  const titleWords = title.split(" ");
  const splitAt = Math.ceil(titleWords.length / 2);

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-silver-50 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-silver-50 to-silver-50" />
        <div className="absolute top-0 inset-x-0 h-px hairline" />
        <div className="absolute -top-24 right-0 w-72 h-72 rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-silver-300/30 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 max-w-6xl">
        <div
          className={cn(
            "grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-start transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Left — headline + highlights */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-silver-200 bg-white/80 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-silver-500">{eyebrow}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-black tracking-tight leading-[1.12] mb-8">
              <span className="text-silver">{titleWords.slice(0, splitAt).join(" ")}</span>
              {titleWords.length > splitAt && (
                <span className="text-gradient-red">{" " + titleWords.slice(splitAt).join(" ")}</span>
              )}
            </h2>

            {highlights.length > 0 && (
              <div className="space-y-3">
                {highlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={cn(
                        "group flex items-start gap-4 p-4 rounded-2xl border border-silver-200/80 bg-white/70 backdrop-blur-sm transition-all duration-500 hover:border-primary/25 hover:shadow-md hover:shadow-primary/5",
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      )}
                      style={{ transitionDelay: `${200 + index * 100}ms` }}
                    >
                      <div className="flex-shrink-0 p-2.5 rounded-xl bg-primary/10 text-primary group-hover:scale-105 transition-transform duration-300">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-bold text-silver-900 text-sm sm:text-base">{item.label}</p>
                        <p className="text-sm text-silver-500 mt-0.5 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right — editorial quote card */}
          <div
            className={cn(
              "relative transition-all duration-1000 delay-150",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-primary/[0.06] via-transparent to-silver-200/40 blur-sm pointer-events-none" />

            <div className="relative rounded-[1.5rem] p-[1px] bg-gradient-to-br from-silver-300/80 via-white to-primary/20 shadow-xl shadow-silver-900/8">
              <div className="relative rounded-[1.45rem] bg-white p-7 sm:p-9 md:p-10 overflow-hidden">
                {/* Decorative quote */}
                <Quote
                  className="absolute top-5 right-6 h-16 w-16 text-primary/[0.08] rotate-180"
                  aria-hidden="true"
                />
                <div className="absolute left-0 top-8 bottom-8 w-1 rounded-full bg-gradient-to-b from-primary via-primary/60 to-primary/20" />

                <p className="relative pl-5 text-base sm:text-lg md:text-xl text-silver-600 leading-[1.75]">
                  {content}
                </p>

                <div className="relative pl-5 mt-8 pt-6 border-t border-silver-100 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {["Trusted by 26+ clients", "On-time delivery", "Dedicated support"].map((item) => (
                    <span key={item} className="inline-flex items-center gap-1.5 text-xs font-semibold text-silver-500">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" aria-hidden="true" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
