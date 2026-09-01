"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, BadgeIndianRupee, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { pricingTiers as defaultPricingTiers } from "@/data/pricing";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useSiteContent } from "@/hooks/use-site-content";
import type { PricingTier } from "@/lib/content-types";

type BillingMode = "oneTime" | "monthly";

export function PricingSection({ pricing: customPricing }: { pricing?: PricingTier[] }) {
  const siteContent = useSiteContent();
  const tiers: PricingTier[] = customPricing || siteContent?.pricing || defaultPricingTiers;

  const [billing, setBilling] = useState<BillingMode>("oneTime");
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative py-16 sm:py-24 bg-white overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-primary/[0.04] blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-silver-300/20 blur-[100px]" />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(hsl(214_32%_91%/.3)_1px,transparent_1px),linear-gradient(90deg,hsl(214_32%_91%/.3)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-12 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full border border-silver-200 bg-silver-50 shadow-sm">
            <BadgeIndianRupee className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-silver-600">
              Transparent Pricing
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[2.8rem] font-black tracking-tight leading-tight mb-4">
            <span className="text-silver">Invest in Quality.</span>{" "}
            <span className="text-gradient-red">See Real ROI.</span>
          </h2>
          <p className="text-base text-silver-500 max-w-lg mx-auto leading-relaxed mb-8">
            No hidden fees. No surprises. Choose the engagement model that works for your
            business.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-silver-50 border border-silver-200 rounded-full p-1">
            <button
              onClick={() => setBilling("oneTime")}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300",
                billing === "oneTime"
                  ? "bg-white text-silver-900 shadow-sm border border-silver-200"
                  : "text-silver-500 hover:text-silver-700"
              )}
            >
              One-time Project
            </button>
            <button
              onClick={() => setBilling("monthly")}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300",
                billing === "monthly"
                  ? "bg-white text-silver-900 shadow-sm border border-silver-200"
                  : "text-silver-500 hover:text-silver-700"
              )}
            >
              Monthly Retainer
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {tiers.map((tier) => {
            const priceInfo = tier.pricing[billing] || tier.pricing.oneTime;
            return (
              <div
                key={tier.id}
                className={cn(
                  "relative rounded-2xl p-[1.5px] transition-all duration-500 hover:-translate-y-1",
                  tier.isPopular
                    ? "bg-gradient-to-br from-primary/60 via-primary/30 to-primary/60 shadow-xl shadow-primary/15"
                    : "bg-gradient-to-br from-silver-200/80 via-white to-silver-200/50 hover:shadow-lg"
                )}
              >
                {/* Most Popular Badge */}
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg animate-pulse-soft">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div
                  className={cn(
                    "relative flex flex-col h-full rounded-[calc(1rem-1.5px)] p-7 overflow-hidden",
                    tier.isPopular
                      ? "bg-gradient-to-br from-[hsl(345_63%_34%_/_0.04)] to-white"
                      : "bg-white"
                  )}
                >
                  {/* Tier header */}
                  <div className="mb-6">
                    <h3 className="text-xl font-black text-silver-900 mb-1">{tier.name}</h3>
                    <p className="text-sm text-silver-500">{tier.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-7 pb-7 border-b border-silver-100">
                    <div
                      key={billing}
                      className="animate-fade-in"
                    >
                      <p className="text-4xl font-black text-silver-900 leading-none mb-1">
                        {priceInfo.amount}
                      </p>
                      {priceInfo.label && (
                        <p className="text-sm text-silver-400 font-medium">{priceInfo.label}</p>
                      )}
                      {priceInfo.sublabel && (
                        <p className="text-xs text-silver-400 mt-1">{priceInfo.sublabel}</p>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {(tier.features || []).map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <span className={cn(
                          "flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center",
                          feature.included
                            ? "bg-primary/10 text-primary"
                            : "bg-silver-100 text-silver-300"
                        )}>
                          {feature.included
                            ? <Check className="w-2.5 h-2.5" />
                            : <X className="w-2.5 h-2.5" />
                          }
                        </span>
                        <span className={cn(
                          "text-sm leading-snug",
                          feature.included ? "text-silver-700 font-medium" : "text-silver-400"
                        )}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={tier.ctaHref || "/#contact"}
                    className={cn(
                      "flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md",
                      tier.isPopular
                        ? "bg-primary text-white hover:shadow-primary/30"
                        : "bg-silver-900 text-white hover:bg-silver-800"
                    )}
                  >
                    {tier.cta || "Get Started"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Custom CTA Banner */}
        <div
          className={cn(
            "relative rounded-2xl overflow-hidden transition-all duration-700 delay-400",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="relative bg-silver-900 px-8 py-10 text-center overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
                Custom Project
              </p>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                Have something specific in mind?
              </h3>
              <p className="text-silver-400 text-sm mb-7 max-w-md mx-auto">
                Tell us what you&apos;re building — we&apos;ll scope it, plan it, and get back to you
                within 24 hours.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/30"
              >
                Book a Free Discovery Call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
