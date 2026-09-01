"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Sparkles,
  Users,
  Briefcase,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ServiceHeroProps {
  badge: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
  icon: LucideIcon;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  highlights?: string[];
}

function renderSplitColorTitle(title: string) {
  const words = title.split(" ");
  const midPoint = Math.ceil(words.length / 2);
  return (
    <>
      <span className="text-silver">{words.slice(0, midPoint).join(" ")}</span>
      <span className="text-gradient-red">{" " + words.slice(midPoint).join(" ")}</span>
    </>
  );
}

const proofPoints = [
  { icon: Users, value: "26+", label: "Happy Clients" },
  { icon: Briefcase, value: "50+", label: "Projects Delivered" },
];

export function ServiceHero({
  badge,
  title,
  description,
  image,
  icon: Icon,
  primaryCta,
  secondaryCta,
  highlights = ["On-time delivery", "Dedicated support", "Quality guaranteed"],
}: ServiceHeroProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes shine {
          from { transform: translateX(-150%) skewX(-20deg); }
          to { transform: translateX(250%) skewX(-20deg); }
        }
        .service-cta-shine::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 40%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
          transform: translateX(-150%) skewX(-20deg);
        }
        .service-cta-shine:hover::after {
          animation: shine 0.8s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .service-cta-shine:hover::after { animation: none; }
        }
      `}</style>

      <section className="relative min-h-[88vh] flex items-center overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-silver-50 to-white" />
          <div className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-silver-300/35 blur-[120px] animate-aurora-drift" />
          <div className="absolute top-1/3 -left-40 w-[480px] h-[480px] rounded-full bg-primary/[0.06] blur-[120px] animate-aurora-drift" style={{ animationDelay: "5s" }} />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `linear-gradient(hsl(214 32% 91% / .45) 1px, transparent 1px), linear-gradient(90deg, hsl(214 32% 91% / .45) 1px, transparent 1px)`,
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse 75% 55% at 50% 35%, black, transparent)",
              WebkitMaskImage: "radial-gradient(ellipse 75% 55% at 50% 35%, black, transparent)",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center">
            {/* Left — copy */}
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              {loaded && (
                <div
                  className="animate-fade-up inline-flex items-center gap-2.5 px-4 py-2 mb-7 rounded-full border border-silver-200 bg-white/75 backdrop-blur-md shadow-sm"
                  style={{ animationDelay: "0.05s" }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-silver-600">{badge}</span>
                </div>
              )}

              {loaded && (
                <h1
                  className="animate-fade-up text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.4rem] font-black tracking-tight leading-[1.08] mb-6"
                  style={{ animationDelay: "0.12s" }}
                >
                  {renderSplitColorTitle(title)}
                </h1>
              )}

              {loaded && (
                <p
                  className="animate-fade-up text-base md:text-lg text-silver-500 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9"
                  style={{ animationDelay: "0.22s" }}
                >
                  {description}
                </p>
              )}

              {loaded && (
                <div
                  className="animate-fade-up flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
                  style={{ animationDelay: "0.32s" }}
                >
                  <Button
                    size="lg"
                    asChild
                    className="service-cta-shine group relative overflow-hidden bg-primary hover:bg-primary text-white font-bold px-7 sm:px-8 py-6 text-base rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/35"
                  >
                    <Link href={primaryCta.href} className="flex items-center gap-2.5">
                      <Sparkles className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      <span>{primaryCta.label}</span>
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </Button>

                  {secondaryCta && (
                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="group border border-silver-300 hover:border-primary/40 bg-white/75 hover:bg-white text-silver-800 font-bold px-7 sm:px-8 py-6 text-base rounded-2xl transition-all duration-300 hover:scale-[1.03] backdrop-blur-sm shadow-sm"
                    >
                      <Link href={secondaryCta.href} className="flex items-center gap-2">
                        <span>{secondaryCta.label}</span>
                        <ArrowUpRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </Link>
                    </Button>
                  )}
                </div>
              )}

              {loaded && (
                <div
                  className="animate-fade-up flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-4"
                  style={{ animationDelay: "0.42s" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2.5">
                      {["from-silver-300 to-silver-500", "from-primary/70 to-primary", "from-silver-400 to-silver-600"].map(
                        (g, i) => (
                          <span
                            key={i}
                            className={cn("h-8 w-8 rounded-full ring-2 ring-white bg-gradient-to-br shadow-sm", g)}
                          />
                        )
                      )}
                      <span className="h-8 w-8 rounded-full ring-2 ring-white bg-silver-900 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                        26+
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-0.5">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <Star key={i} className="h-3 w-3 fill-primary text-primary" aria-hidden="true" />
                        ))}
                      </div>
                      <p className="text-[11px] text-silver-500 mt-0.5">
                        <span className="font-bold text-silver-900">4.9/5</span> client rating
                      </p>
                    </div>
                  </div>

                  {proofPoints.map((s, i) => {
                    const ProofIcon = s.icon;
                    return (
                      <div key={i} className="flex items-center gap-2.5 pl-6 border-l border-silver-200">
                        <div className="p-1.5 rounded-lg bg-primary/10">
                          <ProofIcon className="h-4 w-4 text-primary" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-base font-black text-silver-900 leading-none">{s.value}</p>
                          <p className="text-[10px] text-silver-400 uppercase tracking-wider font-medium mt-0.5">{s.label}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right — visual */}
            {loaded && (
              <div className="animate-fade-up relative mx-auto w-full max-w-[460px] lg:max-w-none" style={{ animationDelay: "0.25s" }}>
                <div className="relative mx-auto max-w-[460px]">
                  <div className="absolute -inset-5 rounded-[2.25rem] bg-silver-200/40 blur-2xl pointer-events-none" />
                  <div className="absolute -inset-2 rounded-[1.85rem] bg-gradient-to-br from-silver-200/50 to-transparent rotate-2" />
                  <div className="absolute -inset-1 rounded-[1.65rem] bg-gradient-to-tr from-primary/[0.08] via-transparent to-silver-200/40 -rotate-1" />

                  <div className="relative rounded-[1.5rem] p-[2px] bg-gradient-to-br from-silver-300 via-white to-silver-300 shadow-2xl shadow-silver-900/12">
                    <div className="relative overflow-hidden rounded-[1.45rem] bg-silver-100 aspect-[4/5] sm:aspect-[5/6]">
                      <Image src={image.src} alt={image.alt} fill className="object-cover" priority />
                      <div className="absolute inset-0 bg-gradient-to-t from-silver-900/45 via-transparent to-transparent" />

                      {/* Service icon chip */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-xl glass-light px-3 py-2 shadow-md">
                        <div className="p-1.5 rounded-lg bg-primary/10">
                          <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                        </div>
                        <span className="text-xs font-semibold text-silver-800">{badge}</span>
                      </div>

                      {/* Highlight pills */}
                      <div className="absolute bottom-4 left-4 right-4 rounded-2xl glass-light px-4 py-3 shadow-lg">
                        <div className="flex flex-wrap gap-2">
                          {highlights.map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 border border-silver-200 text-[11px] font-semibold text-silver-700"
                            >
                              <ShieldCheck className="h-3 w-3 text-primary flex-shrink-0" aria-hidden="true" />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating stat card — kept inside frame to avoid overlap with intro */}
                  <div
                    className="absolute bottom-4 left-4 rounded-2xl glass-light px-4 py-3 shadow-xl border border-white/60 animate-float-y hidden sm:block"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <p className="text-2xl font-black text-silver-900 leading-none">98%</p>
                    <p className="text-[10px] text-silver-500 uppercase tracking-wider font-semibold mt-1">Client Satisfaction</p>
                  </div>

                  {/* Floating accent dot */}
                  <div className="absolute -top-3 -right-3 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30 rotate-6">
                    <Sparkles className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>
    </>
  );
}
