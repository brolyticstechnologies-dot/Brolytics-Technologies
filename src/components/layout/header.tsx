"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MobileNav } from '@/components/layout/mobile-nav';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  ChevronDown, Smartphone, Globe, Code, Palette, Megaphone, Bot,
  ArrowRight, Sparkles, ShoppingCart, Server, Cloud, Wrench, Package,
  Database, Cpu, Shield, Layers, MonitorSmartphone, Building2,
} from 'lucide-react';

// ── 6 Main Services ──────────────────────────────────────────────────
const mainServices = [
  {
    slug: 'website-development',
    title: 'Website Development',
    description: 'Modern, high-performance corporate sites & web apps',
    icon: Globe,
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    description: 'Native iOS, Android & cross-platform mobile apps',
    icon: Smartphone,
  },
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    description: 'Scalable enterprise ERP, CRM & cloud SaaS platforms',
    icon: Code,
  },
  {
    slug: 'graphics-design',
    title: 'Graphics Design',
    description: 'Modern UI/UX, brand identity & digital visual assets',
    icon: Palette,
  },
  {
    slug: 'seo-and-digital-marketing',
    title: 'SEO & Digital Marketing',
    description: 'Organic search rankings, audits & growth marketing',
    icon: Megaphone,
  },
  {
    slug: 'ai-services',
    title: 'AI Services',
    description: 'LLM agents, intelligent workflows & smart AI tools',
    icon: Bot,
  },
];

const navLinks = [
  { href: "/",             label: "Home"       },
  { href: "/technologies", label: "Tech Stack" },
  { href: "/our-work",     label: "Our Work"   },
  { href: "/pricing",      label: "Pricing"    },
  { href: "/about-us",     label: "About Us"   },
  { href: "/#contact",     label: "Contact"    },
];

const mobileNavLinks = [
  { href: "/", label: "Home" },
  { href: "/book-a-slot", label: "📅 Book a Strategy Slot" },
  {
    href: "/#services",
    label: "Services",
    children: [
      ...mainServices.map(s => ({ href: `/services/${s.slug}`, label: s.title })),
    ],
  },
  { href: "/technologies", label: "Tech Stack" },
  { href: "/our-work",     label: "Our Work"   },
  { href: "/pricing",      label: "Pricing"    },
  { href: "/about-us",     label: "About Us"   },
  { href: "/#contact",     label: "Contact"    },
];

export function Header({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const light = variant === 'light';
  const [scrolled,      setScrolled]      = useState(false);
  const [progress,      setProgress]      = useState(0);
  const [megaOpen,      setMegaOpen]      = useState(false);
  const [megaVisible,   setMegaVisible]   = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navLinkClass = light
    ? "relative px-3 py-1.5 xl:px-4 xl:py-2 text-[13px] xl:text-sm font-semibold text-silver-700 hover:text-silver-950 transition-all duration-200 group rounded-full hover:bg-silver-100/80 whitespace-nowrap flex-shrink-0"
    : "relative px-3 py-1.5 xl:px-4 xl:py-2 text-[13px] xl:text-sm font-semibold text-white/80 hover:text-white transition-all duration-200 group rounded-full hover:bg-white/[0.08] whitespace-nowrap flex-shrink-0";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(window.scrollY / total, 1) : 0);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openMega  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMegaOpen(true); setMegaVisible(true); };
  const closeMega = () => { closeTimer.current = setTimeout(() => { setMegaOpen(false); setMegaVisible(false); }, 120); };

  return (
    <>
      <header className={cn(
        "fixed top-0 sm:top-4 inset-x-0 z-50 flex justify-center px-0 sm:px-4 transition-all duration-500",
      )}>
        <div className={cn(
          "w-full max-w-6xl sm:rounded-full transition-all duration-500 border",
          scrolled
            ? light
              ? "bg-white/95 backdrop-blur-xl border-silver-200 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.12)] py-2 sm:py-0"
              : "bg-[#0a0a0a]/95 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.6)] py-2 sm:py-0"
            : "bg-transparent py-4 sm:py-2 border-transparent"
        )}>
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">

            {/* ── Logo ── */}
            <Link href="/" className="relative group flex-shrink-0">
              <div className="absolute -inset-3 rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 pointer-events-none" />
              <Image
                src="/newwblt.png"
                alt="Brolytics Technologies"
                width={210}
                height={75}
                priority
                className="relative object-contain w-32 sm:w-40 md:w-[170px] h-auto transition-all duration-500 group-hover:scale-105 drop-shadow-2xl"
              />
            </Link>

            {/* ── Desktop nav ── */}
            <nav className={cn(
              "hidden lg:flex items-center gap-0.5 xl:gap-1 px-2.5 py-1.5 rounded-full shadow-sm whitespace-nowrap",
              light
                ? "bg-white/80 border border-silver-200/80 shadow-xs"
                : "bg-[#141416]/80 border border-white/10 shadow-xs"
            )}>
              {/* Home */}
              <Link href="/" className={navLinkClass}>
                <span className="relative z-10">Home</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-6 rounded-full bg-primary transition-all duration-300" />
              </Link>

              {/* ── Services dropdown trigger ── */}
              <div
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                <button className={cn(navLinkClass, "flex items-center gap-1.5 outline-none")}>
                  <span className="relative z-10">Services</span>
                  <ChevronDown className={cn("h-3.5 w-3.5 text-primary/70 transition-transform duration-300", megaOpen && "rotate-180")} />
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-8 rounded-full bg-primary transition-all duration-300" />
                </button>

                {/* ── Services Dropdown Panel (100% Solid Opaque & Direct Links) ── */}
                {megaOpen && (
                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[660px] transition-all duration-200 z-50",
                      megaVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                    )}
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                  >
                    <div className={cn(
                      "rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.25)] border overflow-hidden",
                      light
                        ? "bg-white border-silver-200"
                        : "bg-[#121215] border-white/15 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)]"
                    )}>
                      {/* Top gradient bar */}
                      <div className="h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

                      {/* Header label */}
                      <div className="px-6 pt-5 pb-2 flex items-center justify-between">
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-[0.2em]",
                          light ? "text-silver-400" : "text-neutral-500"
                        )}>
                          Our Core Capabilities
                        </span>
                        <span className="text-[11px] font-semibold text-primary">
                          6 Specialized Practice Areas
                        </span>
                      </div>

                      {/* Grid of 6 Main Services */}
                      <div className="grid grid-cols-2 gap-2 p-4 pt-1">
                        {mainServices.map((service) => {
                          const Icon = service.icon;
                          return (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={() => setMegaOpen(false)}
                              className={cn(
                                "group relative flex items-start gap-3.5 p-3.5 rounded-2xl transition-all duration-200 border",
                                light
                                  ? "bg-silver-50/60 border-silver-200/80 hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                                  : "bg-white/[0.03] border-white/[0.06] hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/25"
                              )}
                            >
                              <div className={cn(
                                "p-2.5 rounded-xl shrink-0 transition-colors duration-200",
                                light
                                  ? "bg-white text-primary border border-silver-200/90 group-hover:bg-white/20 group-hover:text-white group-hover:border-transparent"
                                  : "bg-white/10 text-primary group-hover:bg-white/20 group-hover:text-white"
                              )}>
                                <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className={cn(
                                  "text-sm font-bold leading-tight transition-colors duration-200",
                                  light
                                    ? "text-silver-900 group-hover:text-white"
                                    : "text-white group-hover:text-white"
                                )}>
                                  {service.title}
                                </p>
                                <p className={cn(
                                  "text-xs mt-1 leading-snug transition-colors duration-200 line-clamp-2",
                                  light
                                    ? "text-silver-500 group-hover:text-white/90"
                                    : "text-neutral-400 group-hover:text-white/90"
                                )}>
                                  {service.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Dropdown Footer Row */}
                      <div className={cn(
                        "px-6 py-3.5 border-t flex items-center justify-between",
                        light ? "border-silver-100 bg-silver-50" : "border-white/10 bg-[#0d0d10]"
                      )}>
                        <Link
                          href="/#services"
                          onClick={() => setMegaOpen(false)}
                          className={cn(
                            "flex items-center gap-1.5 text-xs font-semibold transition-colors",
                            light ? "text-silver-600 hover:text-primary" : "text-neutral-400 hover:text-white"
                          )}
                        >
                          <span>Explore Overview Matrix</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <div className="flex items-center gap-3">
                          <Link
                            href="/book-a-slot"
                            onClick={() => setMegaOpen(false)}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-bold transition-all duration-200 hover:bg-primary/90 shadow-sm"
                          >
                            <span>📅 Book Strategy Call</span>
                          </Link>
                          <Link
                            href="/pricing"
                            onClick={() => setMegaOpen(false)}
                            className={cn(
                              "flex items-center gap-1 text-xs font-bold transition-colors",
                              light ? "text-silver-700 hover:text-primary" : "text-neutral-300 hover:text-white"
                            )}
                          >
                            <span>Pricing</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Remaining nav links */}
              {navLinks.filter(l => l.label !== 'Home').map(l => (
                <Link key={l.href} href={l.href} className={navLinkClass}>
                  <span className="relative z-10">{l.label}</span>
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-6 rounded-full bg-primary transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* ── Right CTA ── */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Button size="sm" asChild
                className="flex items-center gap-1 sm:gap-2 relative overflow-hidden bg-primary hover:bg-primary/90 text-white font-bold px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.03] group whitespace-nowrap">
                <Link href="/book-a-slot" className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span>Book a Slot</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              </Button>
              <div className="md:hidden">
                <MobileNav navLinks={mobileNavLinks}
                  triggerClassName={light
                    ? "text-silver-700 bg-white/50 backdrop-blur-sm border border-silver-200 hover:border-primary/40 hover:text-primary rounded-full shadow-sm"
                    : "text-white bg-white/10 backdrop-blur-sm border border-white/15 hover:border-white/30 rounded-full shadow-sm"} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Scroll progress bar */}
      <div className={cn("fixed top-0 inset-x-0 h-px z-50 pointer-events-none", light ? "bg-silver-200/60" : "bg-white/[0.04]")}>
        <div
          className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 transition-all duration-150 origin-left"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </>
  );
}
