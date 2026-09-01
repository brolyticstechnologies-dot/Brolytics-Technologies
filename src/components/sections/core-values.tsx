"use client";

import { useState, useEffect } from 'react';
import { Award, Target, Users, Lightbulb, Heart, Shield, Sparkles, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';
import type { SiteContent } from '@/lib/content-types';
import { getIcon } from '@/lib/icon-map';


const CoreValueCard = ({ icon: Icon, title, description, index, isVisible }: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), index * 120);
      return () => clearTimeout(timer);
    }
  }, [isVisible, index, hasAnimated]);

  return (
    <div
      className={cn(
        "group relative text-center p-7 card-silver rounded-2xl overflow-hidden transition-all duration-500 transform-gpu hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_20px_40px_-16px_rgba(143,38,71,0.25)]",
        ""
      )}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Red wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Icon */}
      <div className="relative flex justify-center items-center mb-5">
        <div className="relative p-4 bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl border border-primary/15 group-hover:border-primary/40 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
          <Icon className="h-8 w-8 text-primary transition-all duration-500" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 border border-primary/15 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700" />
        </div>
        <div className="absolute top-0 right-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Sparkles className="w-3 h-3 text-primary animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-lg font-black text-silver-900 mb-3 group-hover:text-primary transition-colors duration-500 leading-tight">
          {title}
        </h3>

        <p className="text-sm text-silver-500 group-hover:text-silver-600 transition-colors duration-500 leading-relaxed">
          {description}
        </p>

        {/* Progress bar */}
        <div className="relative mt-5">
          <div className="w-16 h-0.5 bg-silver-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-700 group-hover:w-full w-8" />
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/80 transition-all duration-700" />
    </div>
  );
};

export function CoreValues({ content }: { content: SiteContent['coreValues'] }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const coreValues = content.items.map(item => ({
    ...item,
    icon: getIcon(item.icon),
  }));

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000",
        ""
      )}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-silver-200 bg-white shadow-sm">
          <Star className="w-4 h-4 text-primary" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-silver-600">{content.badge}</span>
        </div>
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-silver tracking-tight leading-tight mb-5">
          {content.title}
        </h3>
        <div className="hairline w-32 h-px mx-auto mb-6" />
        <p className="text-base sm:text-lg text-silver-500 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
          {content.subtitle}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coreValues.map((value, index) => (
          <CoreValueCard
            key={value.title}
            icon={value.icon}
            title={value.title}
            description={value.description}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
}
