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

// ── Mega-menu categories ──────────────────────────────────────────────────
const megaMenuCategories = [
  {
    heading: "Web & E-Commerce",
    icon: Globe,
    color: "from-blue-500/20 to-cyan-500/10",
    links: [
      { slug: 'website-development', label: 'Website Development', desc: 'Static, dynamic & corporate sites', icon: Globe },
      { slug: 'website-development', label: 'E-Commerce', desc: 'Online stores & marketplaces', icon: ShoppingCart },
      { slug: 'custom-software-development', label: 'Web Applications', desc: 'CMS, portals & dashboards', icon: Layers },
    ],
  },
  {
    heading: "Mobile Apps",
    icon: Smartphone,
    color: "from-violet-500/20 to-purple-500/10",
    links: [
      { slug: 'mobile-app-development', label: 'Android Development', desc: 'Native & cross-platform apps', icon: Smartphone },
      { slug: 'mobile-app-development', label: 'iOS Development', desc: 'Swift & SwiftUI apps', icon: MonitorSmartphone },
      { slug: 'mobile-app-development', label: 'Flutter / React Native', desc: 'One codebase, both stores', icon: Code },
    ],
  },
  {
    heading: "Enterprise Solutions",
    icon: Building2,
    color: "from-orange-500/20 to-amber-500/10",
    links: [
      { slug: 'custom-software-development', label: 'ERP Development', desc: 'Full enterprise resource planning', icon: Building2 },
      { slug: 'custom-software-development', label: 'CRM Development', desc: 'Sales & customer management', icon: Package },
      { slug: 'custom-software-development', label: 'SaaS Products', desc: 'Multi-tenant cloud platforms', icon: Cloud },
    ],
  },
  {
    heading: "Backend & AI",
    icon: Cpu,
    color: "from-green-500/20 to-emerald-500/10",
    links: [
      { slug: 'ai-services', label: 'AI & Automation', desc: 'LLMs, chatbots & workflows', icon: Bot },
      { slug: 'custom-software-development', label: 'Backend & APIs', desc: 'Node.js, Python, Java & more', icon: Server },
      { slug: 'custom-software-development', label: 'Database & Cloud', desc: 'DevOps, AWS, Docker, CI/CD', icon: Database },
    ],
  },
  {
    heading: "Design & Marketing",
    icon: Palette,
    color: "from-pink-500/20 to-rose-500/10",
    links: [
      { slug: 'graphics-design', label: 'UI/UX & Branding', desc: 'Logos, identity & design systems', icon: Palette },
      { slug: 'seo-and-digital-marketing', label: 'SEO Services', desc: 'Rankings, audits & content', icon: Megaphone },
      { slug: 'seo-and-digital-marketing', label: 'Digital Marketing', desc: 'Social, ads & lead gen', icon: Shield },
    ],
  },
  {
    heading: "Support & Extras",
    icon: Wrench,
    color: "from-slate-500/20 to-gray-500/10",
    links: [
      { slug: 'custom-software-development', label: 'Migration & Modernization', desc: 'Legacy to modern stacks', icon: ArrowRight },
      { slug: 'custom-software-development', label: 'Testing & QA', desc: 'Manual, automated & API tests', icon: Wrench },
      { slug: 'custom-software-development', label: 'Maintenance & AMC', desc: 'Ongoing support & security', icon: Shield },
    ],
  },
];

// All 6 existing service pages (for the footer link at bottom of mega-menu)
const allServices = [
  { slug: 'mobile-app-development',      label: "Mobile App Development", icon: Smartphone },
  { slug: 'website-development',         label: "Website Development",    icon: Globe       },
  { slug: 'custom-software-development', label: "Custom Software",        icon: Code        },
  { slug: 'graphics-design',             label: "Graphics Design",        icon: Palette     },
  { slug: 'seo-and-digital-marketing',   label: "SEO & Marketing",        icon: Megaphone   },
  { slug: 'ai-services',                 label: "AI Services",            icon: Bot         },
];

const navLinks = [
  { href: "/",             label: "Home"       },
  { href: "/book-a-slot",  label: "Book a Slot"},
  { href: "/technologies", label: "Tech Stack" },
  { href: "/our-work",     label: "Our Work"   },
  { href: "/pricing",      label: "Pricing"    },
  { href: "/#contact",     label: "Contact"    },
  { href: "/about-us",     label: "About Us"   },
];

const mobileNavLinks = [
  { href: "/", label: "Home" },
  { href: "/book-a-slot", label: "📅 Book a Strategy Slot" },
  {
    href: "/#services",
    label: "Services",
    children: [
      ...allServices.map(s => ({ href: `/services/${s.slug}`, label: s.label })),
    ],
  },
  { href: "/technologies", label: "Tech Stack" },
  { href: "/our-work",     label: "Our Work"   },
  { href: "/pricing",      label: "Pricing"    },
  { href: "/#contact",     label: "Contact"    },
  { href: "/about-us",     label: "About Us"   },
];

export function Header({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const light = variant === 'light';
  const [scrolled,      setScrolled]      = useState(false);
  const [progress,      setProgress]      = useState(0);
  const [megaOpen,      setMegaOpen]      = useState(false);
  const [megaVisible,   setMegaVisible]   = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navLinkClass = light
    ? "relative px-4 py-2 text-sm font-semibold text-silver-600 hover:text-silver-900 transition-all duration-300 group rounded-full hover:bg-white/80"
    : "relative px-4 py-2 text-sm font-semibold text-white/70 hover:text-white transition-all duration-300 group rounded-full hover:bg-white/[0.05]";

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
              ? "bg-white/70 backdrop-blur-xl border-white/40 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.1)] py-2 sm:py-0 border-b-silver-200"
              : "bg-[#0a0a0a]/70 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.5)] py-2 sm:py-0"
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
                className="relative object-contain w-32 sm:w-40 md:w-[180px] h-auto transition-all duration-500 group-hover:scale-105 drop-shadow-2xl"
              />
            </Link>

            {/* ── Desktop nav ── */}
            <nav className={cn(
              "hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full shadow-sm",
              light
                ? "bg-white/40 backdrop-blur-md border border-white/60"
                : "bg-white/[0.03] backdrop-blur-md border border-white/5"
            )}>
              {/* Home */}
              <Link href="/" className={navLinkClass}>
                <span className="relative z-10">Home</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-6 rounded-full bg-primary transition-all duration-300" />
              </Link>

              {/* ── Services mega-menu trigger ── */}
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

                {/* ── Mega-menu panel ── */}
                {megaOpen && (
                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[860px] transition-all duration-200",
                      megaVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                    )}
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                  >
                    <div className={cn(
                      "rounded-3xl shadow-2xl border overflow-hidden",
                      light
                        ? "bg-white/98 border-silver-200"
                        : "bg-[#0d0d0d]/99 border-white/[0.08]"
                    )}>
                      {/* Top gradient bar */}
                      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                      {/* Grid of categories */}
                      <div className="grid grid-cols-3 gap-0 p-6">
                        {megaMenuCategories.map((cat, ci) => {
                          const CatIcon = cat.icon;
                          return (
                            <div key={ci} className="p-3">
                              <div className="flex items-center gap-2 mb-3">
                                <div className={cn("p-1.5 rounded-lg bg-gradient-to-br", cat.color)}>
                                  <CatIcon className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <p className={cn(
                                  "text-[10px] font-black uppercase tracking-widest",
                                  light ? "text-silver-500" : "text-neutral-500"
                                )}>
                                  {cat.heading}
                                </p>
                              </div>
                              <div className="space-y-1">
                                {cat.links.map((link, li) => {
                                  const LinkIcon = link.icon;
                                  return (
                                    <Link
                                      key={li}
                                      href={`/services/${link.slug}`}
                                      onClick={() => setMegaOpen(false)}
                                      className="flex items-start gap-2.5 p-2 rounded-xl transition-all duration-200 group hover:bg-primary hover:shadow-md hover:scale-[1.02]"
                                    >
                                      <div className={cn(
                                        "p-1.5 rounded-lg shrink-0 mt-0.5 transition-colors duration-200",
                                        light
                                          ? "bg-silver-100 group-hover:bg-white/20"
                                          : "bg-white/[0.05] group-hover:bg-white/20"
                                      )}>
                                        <LinkIcon className={cn(
                                          "w-3 h-3 transition-colors duration-200",
                                          light
                                            ? "text-silver-600 group-hover:text-white"
                                            : "text-neutral-400 group-hover:text-white"
                                        )} />
                                      </div>
                                      <div className="min-w-0">
                                        <p className={cn(
                                          "text-[13px] font-semibold leading-tight transition-colors duration-200",
                                          light
                                            ? "text-silver-800 group-hover:text-white"
                                            : "text-neutral-200 group-hover:text-white"
                                        )}>
                                          {link.label}
                                        </p>
                                        <p className={cn(
                                          "text-[11px] mt-0.5 leading-tight transition-colors duration-200",
                                          light
                                            ? "text-silver-500 group-hover:text-white/85"
                                            : "text-neutral-400 group-hover:text-white/85"
                                        )}>
                                          {link.desc}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer row */}
                      <div className={cn(
                        "px-6 py-3 border-t flex items-center justify-between",
                        light ? "border-silver-100 bg-silver-50/60" : "border-white/[0.05] bg-white/[0.02]"
                      )}>
                        <div className="flex items-center gap-1 flex-wrap">
                          {allServices.map(s => {
                            const Icon = s.icon;
                            return (
                              <Link
                                key={s.slug}
                                href={`/services/${s.slug}`}
                                onClick={() => setMegaOpen(false)}
                                className={cn(
                                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all duration-200",
                                  light
                                    ? "border-silver-200 text-silver-600 hover:border-primary/30 hover:text-primary hover:bg-primary/[0.04]"
                                    : "border-white/10 text-neutral-500 hover:border-primary/30 hover:text-primary hover:bg-primary/[0.06]"
                                )}
                              >
                                <Icon className="w-3 h-3" />
                                {s.label}
                              </Link>
                            );
                          })}
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-3">
                          <Link
                            href="/book-a-slot"
                            onClick={() => setMegaOpen(false)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-bold transition-all duration-200"
                          >
                            <span>📅 Book Strategy Call</span>
                          </Link>
                          <Link
                            href="/pricing"
                            onClick={() => setMegaOpen(false)}
                            className="flex items-center gap-1 text-xs font-bold text-silver-600 hover:text-primary transition-colors"
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
                className="flex items-center gap-1 sm:gap-2 relative overflow-hidden bg-primary hover:bg-primary/90 text-white font-bold px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.03] group">
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
