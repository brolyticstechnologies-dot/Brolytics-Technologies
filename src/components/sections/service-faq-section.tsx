"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ServiceSectionHeader } from "./service-section-header";

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

interface ServiceFaqSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  faqs: ServiceFaqItem[];
}

export function ServiceFaqSection({
  eyebrow = "Got Questions?",
  title = "Frequently Asked Questions",
  description,
  faqs,
}: ServiceFaqSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px hairline" />
        <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-silver-300/25 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 max-w-3xl">
        <div
          className={cn(
            "transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <ServiceSectionHeader eyebrow={eyebrow} title={title} description={description} />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = expandedFaq === index;
            return (
              <div
                key={faq.question}
                className={cn(
                  "rounded-[1.1rem] border transition-all duration-500 overflow-hidden",
                  isOpen
                    ? "border-primary/25 bg-white shadow-md shadow-primary/5"
                    : "border-silver-200/80 bg-white/80 hover:border-primary/15",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
                style={{ transitionDelay: `${120 + index * 60}ms` }}
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-start gap-4"
                  aria-expanded={isOpen}
                >
                  <div
                    className={cn(
                      "mt-0.5 p-2 rounded-lg flex-shrink-0 transition-colors duration-300",
                      isOpen ? "bg-primary/10 text-primary" : "bg-silver-100 text-silver-500"
                    )}
                  >
                    <HelpCircle className="w-4 h-4" aria-hidden="true" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={cn(
                        "text-base sm:text-lg font-semibold pr-6 transition-colors duration-300",
                        isOpen ? "text-primary" : "text-silver-900"
                      )}
                    >
                      {faq.question}
                    </h3>

                    <div
                      className={cn(
                        "grid transition-all duration-500 ease-out",
                        isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm sm:text-base text-silver-500 leading-relaxed border-t border-silver-100 pt-3">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>

                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-primary flex-shrink-0 mt-1 transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
