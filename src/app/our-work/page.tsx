"use client";

import { useState, useEffect } from "react";
import { Briefcase, Users, Star, Target } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OurClients } from "@/components/sections/our-clients";
import { PortfolioGallery } from "@/components/sections/portfolio-gallery";
import { PageNav } from "@/components/ui/page-nav";
import { cn } from "@/lib/utils";

const heroStats = [
  { icon: Briefcase, value: "50+", label: "Projects Delivered" },
  { icon: Users, value: "26+", label: "Happy Clients" },
  { icon: Star, value: "4.9", label: "Client Rating" },
  { icon: Target, value: "98%", label: "Success Rate" },
];

function StatCard({
  icon: Icon,
  value,
  label,
  delay,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <div
      className="group relative rounded-[1.2rem] p-[1px] bg-gradient-to-br from-silver-200/70 via-white to-silver-200/50 hover:from-primary/30 hover:via-primary/8 hover:to-silver-200/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative flex items-center gap-3 rounded-[1.15rem] bg-white px-4 py-4 sm:py-5">
        <div className="p-2.5 rounded-xl bg-primary/10 group-hover:scale-105 transition-transform duration-400">
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xl sm:text-2xl font-black text-silver-900 group-hover:text-primary transition-colors duration-400 leading-none">
            {value}
          </p>
          <p className="text-[10px] sm:text-[11px] text-silver-400 uppercase tracking-wider font-medium mt-1">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OurWorkPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-white text-silver-900">
      <Header variant="light" />
      <PageNav />

      <main>
        {/* ── HERO ─────────────────────────────────────── */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-silver-50 to-white" />
            <div className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-silver-300/35 blur-[120px] animate-aurora-drift" />
            <div
              className="absolute top-1/3 -left-40 w-[480px] h-[480px] rounded-full bg-primary/[0.06] blur-[120px] animate-aurora-drift"
              style={{ animationDelay: "5s" }}
            />
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: `linear-gradient(hsl(214 32% 91% / .45) 1px, transparent 1px), linear-gradient(90deg, hsl(214 32% 91% / .45) 1px, transparent 1px)`,
                backgroundSize: "56px 56px",
                maskImage:
                  "radial-gradient(ellipse 75% 55% at 50% 35%, black, transparent)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 75% 55% at 50% 35%, black, transparent)",
              }}
            />
          </div>

          <div className="relative container mx-auto px-6 max-w-4xl text-center">
            {loaded && (
              <div
                className="animate-fade-up inline-flex items-center gap-2.5 px-4 py-2 mb-7 rounded-full border border-silver-200 bg-white/75 backdrop-blur-md shadow-sm"
                style={{ animationDelay: "0.05s" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <Briefcase className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-silver-600">
                  Our Portfolio
                </span>
              </div>
            )}

            {loaded && (
              <h1
                className="animate-fade-up text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.4rem] font-black tracking-tight leading-[1.08] mb-6"
                style={{ animationDelay: "0.12s" }}
              >
                <span className="text-silver-900">Work That</span>
                <span className="block text-gradient-red">Delivers Results.</span>
              </h1>
            )}

            {loaded && (
              <p
                className="animate-fade-up text-base md:text-lg text-silver-500 leading-relaxed max-w-2xl mx-auto mb-10"
                style={{ animationDelay: "0.22s" }}
              >
                A selection of projects showcasing our commitment to innovation, quality, and
                measurable client success — across web, mobile, AI, and beyond.
              </p>
            )}

            {loaded && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
                {heroStats.map((s, i) => (
                  <StatCard key={s.label} {...s} delay={300 + i * 80} />
                ))}
              </div>
            )}
          </div>

          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-silver-300 to-transparent" />
        </section>

        {/* ── PORTFOLIO GALLERY ─────────────────────────── */}
        <PortfolioGallery />

        {/* ── CLIENTS / TESTIMONIALS ────────────────────── */}
        <OurClients />
      </main>

      <Footer />
    </div>
  );
}
