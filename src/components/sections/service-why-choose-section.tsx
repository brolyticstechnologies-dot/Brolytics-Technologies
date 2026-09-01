"use client";

import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ServiceSectionHeader } from "./service-section-header";

export interface ServiceWhyChooseItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ServiceWhyChooseSectionProps {
  eyebrow: string;
  title: string;
  description?: string;
  items: ServiceWhyChooseItem[];
  variant?: "white" | "muted";
}

export function ServiceWhyChooseSection({
  eyebrow,
  title,
  description,
  items,
  variant = "muted",
}: ServiceWhyChooseSectionProps) {
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
        <div className="absolute top-0 inset-x-0 h-px hairline" />
        <div className="absolute -bottom-16 left-1/4 w-72 h-72 rounded-full bg-primary/[0.04] blur-3xl" />
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={cn(
                  "group relative rounded-[1.25rem] border border-silver-200/80 bg-white/80 backdrop-blur-sm p-6 sm:p-7 transition-all duration-700 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${150 + index * 70}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-[1.25rem] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-500" />

                <div className="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>

                <h3 className="text-lg font-bold text-silver-900 mb-2 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-silver-500 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
