"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface ServiceCtaSectionProps {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
}

export function ServiceCtaSection({
  title,
  description,
  ctaLabel,
  ctaHref = "/#contact",
}: ServiceCtaSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const titleWords = title.split(" ");
  const splitAt = Math.ceil(titleWords.length / 2);

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-silver-50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px hairline" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/[0.06] blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 max-w-4xl">
        <div
          className={cn(
            "relative rounded-[1.75rem] p-[1px] bg-gradient-to-br from-primary/30 via-silver-200/60 to-primary/20 shadow-2xl shadow-silver-900/8 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="relative rounded-[1.7rem] bg-white px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-14 text-center overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/[0.05] blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-silver-200/40 blur-2xl pointer-events-none" />

            <div className="relative inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-primary/15 bg-primary/[0.05]">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/80">Ready to Start?</span>
            </div>

            <h2 className="relative text-3xl sm:text-4xl md:text-[2.6rem] font-black tracking-tight leading-[1.1] mb-5">
              <span className="text-silver">{titleWords.slice(0, splitAt).join(" ")}</span>
              {titleWords.length > splitAt && (
                <span className="text-gradient-red">{" " + titleWords.slice(splitAt).join(" ")}</span>
              )}
            </h2>

            <p className="relative text-base md:text-lg text-silver-500 leading-relaxed max-w-2xl mx-auto mb-8">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Button
                size="lg"
                asChild
                className="relative group bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-base rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/35 w-full sm:w-auto"
              >
                <Link href="/book-a-slot" className="flex items-center justify-center gap-2.5">
                  <span>📅 Book a 30-Min Strategy Slot</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="relative group border-silver-300 hover:border-primary/40 bg-white hover:bg-silver-50 text-silver-800 font-bold px-7 py-6 text-base rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-xs w-full sm:w-auto"
              >
                <Link href={ctaHref} className="flex items-center justify-center gap-2">
                  <span>{ctaLabel}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
