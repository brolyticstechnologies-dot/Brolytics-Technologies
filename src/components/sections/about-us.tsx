"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Rocket } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';
import { CoreValues } from './core-values';
import type { SiteContent } from '@/lib/content-types';

interface AboutUsProps {
  content: SiteContent['aboutUs'];
  coreValues: SiteContent['coreValues'];
}

export function AboutUs({ content, coreValues }: AboutUsProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { header } = content;

  return (
    <section
      id="about-us"
      ref={ref}
      className="relative py-16 sm:py-24 bg-white text-silver-900 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-silver-50/60 to-white" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-silver-300/45 rounded-full blur-[120px] animate-aurora-drift" />
        <div className="absolute bottom-1/3 right-1/4 w-[420px] h-[420px] bg-silver-200/60 rounded-full blur-[120px] animate-aurora-drift" style={{ animationDelay: '5s' }} />
        <div className="absolute inset-0 opacity-70 bg-[linear-gradient(hsl(214_32%_91%/.4)_1px,transparent_1px),linear-gradient(90deg,hsl(214_32%_91%/.4)_1px,transparent_1px)] bg-[size:90px_90px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className={cn(
          "text-center mb-16 max-w-3xl mx-auto transition-all duration-1000",
          ""
        )}>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-6 rounded-full border border-silver-200 bg-white/80 backdrop-blur-sm shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary/50 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <Rocket className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-silver-600">{header.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.08] mb-5">
            <span className="text-silver">{header.title}</span>
            <span className="text-gradient-red"> {header.titleAccent}</span>
          </h2>
          <p className="text-base md:text-lg text-silver-500 leading-relaxed">
            {header.subtitle}
          </p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-24">
          {/* Image side */}
          <div className={cn(
            "relative transition-all duration-1000 delay-300",
            ""
          )}>
            <div className="relative group max-w-[560px] mx-auto px-2 sm:px-0">
              {/* Offset panels */}
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-silver-200/60 to-transparent rotate-2" />
              <div className="absolute -inset-1 rounded-[1.75rem] bg-gradient-to-tr from-silver-200/60 via-transparent to-silver-200/40 -rotate-1" />

              <div className="relative rounded-[1.6rem] p-[2px] bg-gradient-to-br from-silver-300 via-white to-silver-300 shadow-2xl shadow-silver-900/15">
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={content.image}
                    alt={content.imageAlt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-silver-900/15 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute top-2 right-2 sm:-top-5 sm:-right-5 animate-float-y">
                <div className="flex items-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl bg-white border border-silver-200 px-2.5 py-2 sm:px-4 sm:py-3 shadow-xl shadow-silver-900/10">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-[10px] sm:text-xs font-bold text-silver-800">{content.badge1}</span>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 sm:-bottom-5 sm:-left-5 animate-float-slow">
                <div className="flex items-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl bg-silver-900 px-2.5 py-2 sm:px-4 sm:py-3 shadow-xl shadow-silver-900/25">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-[10px] sm:text-xs font-bold text-white">{content.badge2}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className={cn(
            "space-y-8 transition-all duration-1000 delay-500",
            ""
          )}>
            <div className="space-y-6">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                <span className="text-silver">{content.heading}{' '}</span>
                <span className="text-gradient-red">{content.headingAccent}</span>
              </h3>

              <div className="space-y-5">
                {content.paragraphs.map((paragraph, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-primary/30 hover:border-primary/70 transition-all duration-500">
                    <div className="absolute -left-1.5 top-2 w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: `${idx * 0.5}s` }} />
                    <p className="text-base text-silver-600 leading-relaxed">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Button
                size="lg"
                className="group relative w-full sm:w-auto bg-primary hover:bg-primary text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/35 overflow-hidden rounded-2xl"
                asChild
              >
                <Link href="/about-us" className="flex items-center justify-center gap-3 px-6 sm:px-8 py-5 sm:py-6">
                  <span className="font-bold text-base sm:text-lg">{content.ctaText}</span>
                  <ArrowRight className="h-6 w-6 transition-all duration-500 group-hover:translate-x-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <CoreValues content={coreValues} />
      </div>
    </section>
  );
}
