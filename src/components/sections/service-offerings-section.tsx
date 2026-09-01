"use client";

import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ServiceSectionHeader } from "./service-section-header";

export interface ServiceOfferingItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  keyFeatures?: string[];
  tags?: string[];
}

interface ServiceOfferingsSectionProps {
  eyebrow: string;
  title: string;
  description?: string;
  items: ServiceOfferingItem[];
  variant?: "white" | "muted";
}

export function ServiceOfferingsSection({
  eyebrow,
  title,
  description,
  items,
  variant = "muted",
}: ServiceOfferingsSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className={cn(
        "relative py-16 md:py-24 overflow-hidden",
        variant === "muted" ? "bg-silver-50" : "bg-white"
      )}
    >
      <div className="absolute inset-0 pointer-events-none">
        {variant === "muted" ? (
          <>
            <div className="absolute top-0 inset-x-0 h-px hairline" />
            <div className="absolute -bottom-20 right-0 w-64 h-64 rounded-full bg-primary/[0.04] blur-3xl" />
          </>
        ) : (
          <div className="absolute top-1/2 -left-32 w-72 h-72 rounded-full bg-silver-300/25 blur-3xl" />
        )}
      </div>

      <div className="relative container mx-auto px-6 max-w-6xl">
        <div
          className={cn(
            "transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <ServiceSectionHeader eyebrow={eyebrow} title={title} description={description} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "group relative rounded-[1.25rem] p-[1px] bg-gradient-to-br from-silver-200/80 via-white to-silver-200/60 transition-all duration-700 hover:from-primary/30 hover:via-primary/10 hover:to-silver-200/80 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${150 + index * 80}ms` }}
            >
              <div className="relative h-full rounded-[1.2rem] bg-white p-6 sm:p-7 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/[0.06] to-transparent rounded-bl-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/15 group-hover:scale-105 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-black text-silver-300 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-silver-900 mb-2 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-silver-500 leading-relaxed mb-5">{item.description}</p>

                {item.keyFeatures && item.keyFeatures.length > 0 && (
                  <ul className="space-y-2.5">
                    {item.keyFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span className="text-sm text-silver-600 leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-silver-50 border border-silver-200 text-silver-600 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
