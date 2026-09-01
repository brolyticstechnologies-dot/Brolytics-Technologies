"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ServiceSectionHeader } from "./service-section-header";

export interface ServiceProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ServiceProcessSectionProps {
  eyebrow: string;
  title: string;
  description?: string;
  steps: ServiceProcessStep[];
  variant?: "white" | "muted";
}

export function ServiceProcessSection({
  eyebrow,
  title,
  description,
  steps,
  variant = "white",
}: ServiceProcessSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.08 });

  return (
    <section
      ref={ref}
      className={cn(
        "relative py-16 md:py-24 overflow-hidden",
        variant === "white" ? "bg-white" : "bg-silver-50"
      )}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px hairline" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-silver-300/20 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 max-w-5xl">
        <div
          className={cn(
            "transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <ServiceSectionHeader eyebrow={eyebrow} title={title} description={description} />
        </div>

        <div className="relative">
          <div className="absolute left-[1.35rem] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-primary/25 to-transparent" />

          <div className="space-y-6 md:space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={cn(
                  "relative flex flex-col md:flex-row md:items-center gap-4 md:gap-8 transition-all duration-1000",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  index % 2 !== 0 && "md:flex-row-reverse"
                )}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="flex-1 w-full">
                  <div className="group relative rounded-[1.25rem] p-[1px] bg-gradient-to-br from-silver-200/70 via-white to-silver-200/50 hover:from-primary/25 hover:via-white hover:to-primary/10 transition-all duration-500">
                    <div className="rounded-[1.2rem] bg-white p-5 sm:p-6 md:p-7">
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/15 flex-shrink-0">
                          {step.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary/70">
                              Step {step.number}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-silver-900 mb-2">{step.title}</h3>
                          <p className="text-sm sm:text-base text-silver-500 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex-shrink-0 pl-0 md:pl-0">
                  <div className="relative w-11 h-11 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-primary/15 animate-pulse" />
                    <div className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-primary/40 text-sm font-black text-primary shadow-sm">
                      {step.number}
                    </div>
                  </div>
                </div>

                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
