"use client";

import {
  ArrowRight,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import type { SiteContent, ServiceItem } from "@/lib/content-types";
import { getIcon } from "@/lib/icon-map";

interface ServicesOverviewProps {
  services: ServiceItem[];
  overview: SiteContent['servicesOverview'];
}

const ServiceCard = ({
  service,
  index,
  isVisible,
}: {
  service: ServiceItem & { icon: ReturnType<typeof getIcon> };
  index: number;
  isVisible: boolean;
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), index * 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, index, hasAnimated]);

  const Icon = service.icon;
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className={cn(
        "group relative h-full transition-all duration-500 transform-gpu",
        ""
      )}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <Link
        href={`/services/${service.slug}`}
        className={cn(
          "relative flex h-full min-h-[280px] flex-col rounded-2xl border border-silver-200/90 bg-white p-6 sm:p-7 overflow-hidden outline-none",
          "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]",
          "transition-all duration-400 hover:-translate-y-1.5 hover:border-primary/20",
          "hover:shadow-[0_24px_48px_-20px_rgba(143,38,71,0.22)]",
          "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
        )}
        aria-label={`Learn more about ${service.title}`}
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/70 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <span
          aria-hidden="true"
          className="absolute -top-1 right-4 text-[4.5rem] font-black leading-none text-silver-100/90 select-none pointer-events-none group-hover:text-primary/[0.07] transition-colors duration-500"
        >
          {num}
        </span>

        <div className="relative mb-5">
          <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary to-[hsl(345,58%,32%)] text-white shadow-md shadow-primary/25 group-hover:shadow-lg group-hover:shadow-primary/30 group-hover:scale-105 transition-all duration-400">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>

        <div className="relative flex flex-1 flex-col min-w-0">
          <h3 className="text-lg sm:text-xl font-black text-silver-900 group-hover:text-primary transition-colors duration-300 mb-2.5 leading-snug pr-6">
            {service.title}
          </h3>

          <p className="text-sm text-silver-500 leading-relaxed line-clamp-3 mb-5">
            {service.description}
          </p>

          {service.tags && service.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-silver-50 text-[10px] font-bold uppercase tracking-[0.08em] text-silver-500 border border-silver-200/80 group-hover:border-primary/15 group-hover:bg-primary/[0.04] group-hover:text-silver-600 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="relative mt-6 pt-4 border-t border-silver-100 group-hover:border-primary/10 transition-colors duration-300 flex items-center justify-between gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-silver-400 group-hover:text-primary transition-colors duration-300">
            Explore service
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-silver-500 group-hover:text-primary transition-colors duration-300">
            Learn more
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </div>
  );
};

export function ServicesOverview({ services: serviceItems, overview }: ServicesOverviewProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
  const services = serviceItems.map(s => ({ ...s, icon: getIcon(s.icon) } as any));
  const { header } = overview;

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-16 sm:py-24 md:py-28 bg-white text-silver-900 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-silver-50/80 to-white" />
        <div className="absolute top-1/4 -right-20 w-[560px] h-[560px] bg-silver-300/30 rounded-full blur-[130px] animate-aurora-drift" />
        <div
          className="absolute bottom-1/4 -left-20 w-[480px] h-[480px] bg-primary/[0.04] rounded-full blur-[130px] animate-aurora-drift"
          style={{ animationDelay: "6s" }}
        />
        <div className="absolute inset-0 opacity-60 bg-[linear-gradient(hsl(214_32%_91%/.35)_1px,transparent_1px),linear-gradient(90deg,hsl(214_32%_91%/.35)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_45%,black,transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px hairline" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-14 md:mb-16 max-w-3xl mx-auto transition-all duration-1000",
            ""
          )}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-6 rounded-full border border-silver-200 bg-white/80 backdrop-blur-sm shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary/50 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <Zap className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-silver-600">
              {header.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.08] mb-5">
            <span className="text-silver">{header.title}</span>
            <span className="text-gradient-red"> {header.titleAccent}</span>
          </h2>

          <p className="text-base md:text-lg text-silver-500 leading-relaxed">
            {header.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
