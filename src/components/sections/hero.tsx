"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MobileNav } from '@/components/layout/mobile-nav';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  ArrowRight, ArrowUpRight, Star, ChevronDown, Sparkles,
  Smartphone, Globe, Code, Palette, Megaphone, Bot,
  Users, Briefcase,
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { SiteContent, ServiceItem } from '@/lib/content-types';
import { getIcon } from '@/lib/icon-map';

const navLinks = [
  { href: "/technologies", label: "Tech Stack" },
  { href: "/our-work", label: "Our Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
  { href: "/about-us", label: "About Us" },
];

interface HeroProps {
  content: SiteContent['hero'];
  services: ServiceItem[];
  siteSettings: SiteContent['siteSettings'];
}

export function Hero({ content, services: serviceItems, siteSettings }: HeroProps) {
  const slides = content.slides || [];
  const services = serviceItems.map(s => ({ ...s, icon: getIcon(s.icon) }));
  const mobileNavLinks = [
    { href: "/", label: "Home" },
    { 
      href: "/#services", 
      label: "Services",
      children: services.map(s => ({ href: `/services/${s.slug}`, label: s.title }))
    },
    { href: "/technologies", label: "Tech Stack" },
    { href: "/our-work", label: "Our Work" },
    { href: "/pricing", label: "Pricing" },
    { href: "/#contact", label: "Contact" },
    { href: "/about-us", label: "About Us" },
  ];
  const proofPoints = content.proofPoints?.map(p => ({ ...p, icon: getIcon(p.icon) })) || [];
  
  // Fallback slide if none provided
  const fallbackSlide = {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    alt: "Brolytics Technologies - Innovation at work",
    word: "Innovation"
  };
  
  const allSlides = slides.length > 0 ? slides : [fallbackSlide];
  const [slideIdx, setSlideIdx] = useState(0);
  const [slideIn,  setSlideIn]  = useState(true);
  const [scrolled, setScrolled] = useState(false);
  

  

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Cycle the accent word + showcase image together
  useEffect(() => {
    if (!allSlides || allSlides.length === 0) return;
    const id = setInterval(() => {
      setSlideIn(false);
      setTimeout(() => {
        setSlideIdx(i => (i + 1) % allSlides.length);
        setSlideIn(true);
      }, 320);
    }, 4200);
    return () => clearInterval(id);
  }, [allSlides]);

  return (
    <>
      <style jsx>{`
        @keyframes wordIn {
          from { opacity: 0; transform: translateY(20%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wordOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-20%); }
        }
        @keyframes shine {
          from { transform: translateX(-150%) skewX(-20deg); }
          to { transform: translateX(250%) skewX(-20deg); }
        }
        @keyframes marquee  { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        .word-in { animation: wordIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .word-out { animation: wordOut 0.3s cubic-bezier(0.55, 0, 1, 0.45) forwards; }
        .marquee-track { animation: marquee 32s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
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
          .word-in, .word-out, .marquee-track, .service-cta-shine:hover::after { animation: none; }
        }
      `}</style>

       <section className="relative min-h-screen flex flex-col bg-white overflow-hidden">

        {/* ── Ambient background ── */}
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

        {/* ══════ NAVBAR ══════ */}
        <header className={cn(
          "fixed top-0 sm:top-4 inset-x-0 z-50 flex justify-center px-0 sm:px-4 transition-all duration-500",
        )}>
          <div className={cn(
            "w-full max-w-6xl sm:rounded-full transition-all duration-500 border border-transparent",
            scrolled
              ? "bg-white/70 backdrop-blur-xl sm:border-white/40 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.1)] py-2 sm:py-0 border-b-silver-200"
              : "bg-transparent py-4 sm:py-2"
          )}>
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">

              {/* ── Logo ── */}
              <Link href="/" className="relative group flex-shrink-0">
                <div className="absolute -inset-3 rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 pointer-events-none" />
                <Image
                  src={siteSettings.logo}
                  alt={siteSettings.logoAlt}
                  width={200}
                  height={72}
                  className="relative object-contain w-32 sm:w-40 md:w-[180px] h-auto transition-all duration-500 group-hover:scale-105"
                  priority
                />
              </Link>

              {/* ── Desktop nav ── */}
              <nav className="hidden md:flex items-center gap-1 bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 shadow-sm">
                <Link href="/"
                  className="relative px-4 py-2 text-sm font-semibold text-silver-600 hover:text-silver-900 transition-all duration-300 group rounded-full hover:bg-white/80">
                  <span className="relative z-10">Home</span>
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-6 rounded-full bg-primary transition-all duration-300" />
                </Link>

                {/* Services dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-silver-600 hover:text-silver-900 transition-all duration-300 group rounded-full hover:bg-white/80 outline-none">
                      <span className="relative z-10">Services</span>
                      <ChevronDown className="h-3.5 w-3.5 text-primary transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-8 rounded-full bg-primary transition-all duration-300" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[420px] bg-white/95 backdrop-blur-2xl border border-silver-200 rounded-3xl p-3 mt-4 shadow-2xl shadow-silver-900/10"
                    sideOffset={8}
                  >
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-t-3xl" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-silver-400 px-3 mb-2">What We Do</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {services.map(s => {
                        const Icon = s.icon;
                        return (
                          <DropdownMenuItem key={s.slug} asChild>
                            <Link href={`/services/${s.slug}`}
                              className="flex items-start gap-3 p-3 rounded-2xl border border-transparent hover:border-primary hover:bg-primary transition-all duration-200 cursor-pointer group hover:shadow-md hover:shadow-primary/20">
                              <div className="p-2 bg-silver-100 rounded-xl group-hover:bg-white/20 transition-colors duration-200 flex-shrink-0">
                                <Icon className="h-4 w-4 text-silver-600 group-hover:text-white transition-colors duration-200" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-silver-900 group-hover:text-white transition-colors duration-200 leading-tight">{s.title}</p>
                                <p className="text-[11px] text-silver-500 mt-0.5 group-hover:text-white/85 transition-colors duration-200">{s.description}</p>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </div>
                    <div className="mt-3 pt-3 border-t border-silver-200">
                      <Link href="/#services"
                        className="flex items-center justify-center gap-2 py-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors duration-200 rounded-xl hover:bg-primary/[0.06] group">
                        Browse All Services
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {navLinks.map(l => (
                  <Link key={l.href} href={l.href}
                    className="relative px-4 py-2 text-sm font-semibold text-silver-600 hover:text-silver-900 transition-all duration-300 group rounded-full hover:bg-white/80">
                    <span className="relative z-10">{l.label}</span>
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-6 rounded-full bg-primary transition-all duration-300" />
                  </Link>
                ))}
              </nav>

              {/* ── Right side CTA ── */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Button size="sm" asChild
                  className="flex items-center gap-1 sm:gap-2 relative overflow-hidden bg-primary hover:bg-primary text-white font-bold px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.03] group">
                  <Link href="#contact">
                    <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                    <span>{content.navCta}</span>
                  </Link>
                </Button>

                <div className="md:hidden">
                  <MobileNav navLinks={mobileNavLinks}
                    triggerClassName="text-silver-700 bg-white/50 backdrop-blur-sm border border-silver-200 hover:border-primary/40 hover:text-primary rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </header>

         {/* ══════ HERO CONTENT ══════ */}
         <div className="relative z-10 flex-1 flex items-center overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-14 md:pt-28 md:pb-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-10 lg:gap-12 items-center">

              {/* ── Left column ── */}
              <div className="w-full max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
               <div
                 className={cn(
                   "inline-flex items-center gap-2.5 px-4 py-2 mb-7 rounded-full border border-silver-200 bg-white/75 backdrop-blur-md shadow-sm",
                   ""
                 )}
                 
               >
                 <span className="relative flex h-2 w-2">
                   <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
                   <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                 </span>
                    <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-silver-600">
                      {content.badge}
                    </span>
                  </div>
               <motion.h1
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                 className={cn(
                   "font-black tracking-tight mb-7",
                   ""
                 )}
               >
                 <span className="block text-[1.75rem] min-[480px]:text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.35rem] leading-[1.05] text-silver-900 text-balance">
                       {content.titleLine1}
                     </span>

                     <span
                       aria-live="polite"
                       className="relative block h-[1.1em] sm:h-[1.12em] overflow-hidden text-[1.75rem] min-[480px]:text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.35rem] leading-[1.05]"
                     >
                       <span
                         key={slideIdx}
                         className={cn(
                           "block text-silver-400",
                           slideIn ? "word-in" : "word-out"
                         )}
                       >
                         {allSlides[slideIdx]?.word || "Innovation"}
                       </span>
                     </span>

                     <span className="block text-[1.75rem] min-[480px]:text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.35rem] leading-[1.08] sm:leading-[1.05] text-gradient-red text-balance">
                   {content.titleLine3}
                     </span>
                    </motion.h1>

                 <p
                   className={cn(
                     "text-sm sm:text-[15px] md:text-[17px] text-silver-500 leading-[1.7] sm:leading-[1.75] max-w-[34rem] mx-auto lg:mx-0 mb-8 sm:mb-9 px-1 sm:px-0",
                     ""
                   )}
                   
                 >
                   {content.description}
                 </p>

                <div
                  className={cn(
                    "flex flex-col min-[480px]:flex-row flex-wrap items-stretch min-[480px]:items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10 w-full min-[480px]:w-auto",
                    ""
                  )}
                  
                >
                  <Button
                      size="lg"
                      asChild
                      className="service-cta-shine group relative overflow-hidden bg-primary hover:bg-primary text-white font-bold w-full min-[480px]:w-auto px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-[15px] rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/35"
                    >
                      <Link href="#contact" className="flex items-center gap-2.5">
                        <Sparkles className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        <span>{content.primaryCta}</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="group border border-silver-300 hover:border-primary/40 bg-white hover:bg-white text-silver-800 font-bold w-full min-[480px]:w-auto px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-[15px] rounded-full transition-all duration-300 hover:scale-[1.03] shadow-sm"
                    >
                      <Link href="/our-work" className="flex items-center gap-2">
                        <span>{content.secondaryCta}</span>
                        <ArrowUpRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
               <div
                 className={cn(
                   "w-full mx-auto lg:mx-0 rounded-2xl border border-silver-200/90 bg-white/75 backdrop-blur-sm shadow-sm overflow-hidden",
                   ""
                 )}
                 
               >
                    {/* Mobile + tablet: stacked | Desktop: single row */}
                    <div className="flex flex-col lg:flex-row lg:items-stretch">
                      {/* Avatars + rating */}
                      <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 px-4 py-3.5 sm:px-5 sm:py-4 lg:shrink-0 border-b lg:border-b-0 lg:border-r border-silver-200">
                        <div className="flex -space-x-2 shrink-0">
                          {[
                            "from-sky-200 to-sky-400",
                            "from-primary/80 to-primary",
                            "from-silver-300 to-silver-500",
                          ].map((g, i) => (
                            <span
                              key={i}
                              className={cn("h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-white bg-gradient-to-br shadow-sm", g)}
                            />
                          ))}
                          <span className="h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-white bg-silver-900 flex items-center justify-center text-[8px] sm:text-[9px] font-bold text-white shadow-sm">
                            {content.clientCount}
                          </span>
                        </div>
                        <div className="text-left shrink-0">
                          <div className="flex items-center gap-0.5">
                            {[0, 1, 2, 3, 4].map(i => (
                              <Star key={i} className="h-3 w-3 fill-primary text-primary" aria-hidden="true" />
                            ))}
                          </div>
                          <p className="text-[10px] sm:text-[11px] text-silver-500 mt-0.5 whitespace-nowrap">
                            <span className="font-bold text-silver-900">{content.rating}</span> client rating
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 lg:flex lg:flex-nowrap lg:items-center lg:flex-1 min-w-0">
                        {proofPoints.map((s, i) => {
                          const Icon = s.icon;
                          return (
                            <div
                              key={i}
                              className={cn(
                                "flex items-center justify-center lg:justify-start gap-2 sm:gap-2.5 px-3 py-3 sm:px-4 sm:py-3.5 lg:px-5 lg:py-4 min-w-0",
                                i > 0 && "lg:border-l border-silver-200",
                                i >= 2 && "max-lg:border-t border-silver-200"
                              )}
                            >
                              <div className="p-1.5 rounded-full bg-primary/10 shrink-0">
                                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" aria-hidden="true" />
                              </div>
                              <div className="text-left min-w-0">
                                <p className="text-sm sm:text-base font-black text-silver-900 leading-none">{s.value}</p>
                                <p className="text-[9px] sm:text-[10px] text-silver-400 uppercase tracking-wide sm:tracking-wider font-semibold mt-1 leading-tight">
                                  {s.label}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                   </div>
                 </div>
              </div>

               {/* ── Right column — service-hero style visual ── */}
               <div className={cn(
                 "relative mx-auto w-full max-w-[300px] min-[480px]:max-w-[340px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px] mt-4 lg:mt-0",
                 ""
               )}
               >
                  <div className="relative mx-auto w-full">
                    <div className="absolute -inset-3 sm:-inset-5 rounded-[2.25rem] bg-silver-200/40 blur-2xl pointer-events-none" />
                    <div className="absolute -inset-1.5 sm:-inset-2 rounded-[1.85rem] bg-gradient-to-br from-silver-200/50 to-transparent rotate-2" />
                    <div className="absolute -inset-1 rounded-[1.65rem] bg-gradient-to-tr from-primary/[0.08] via-transparent to-silver-200/40 -rotate-1" />

                    <div className="relative rounded-[1.5rem] p-[2px] bg-gradient-to-br from-silver-300 via-white to-silver-300 shadow-2xl shadow-silver-900/12">
                      <div className="relative overflow-hidden rounded-[1.45rem] bg-silver-100 aspect-[4/5] sm:aspect-[5/6] min-h-[320px] sm:min-h-0">
                         {allSlides.map((slide, i) => (
                           <Image
                             key={i}
                             src={slide.src}
                             alt={slide.alt}
                             fill
                             priority={i === 0}
                             className="object-cover transition-opacity duration-700"
                             style={{ opacity: i === slideIdx ? (slideIn ? 1 : 0) : 0 }}
                           />
                         ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-silver-900/55 via-silver-900/10 to-transparent" />

                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl glass-light px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-md max-w-[calc(100%-4rem)]">
                          <div className="p-1 sm:p-1.5 rounded-lg bg-primary/10 shrink-0">
                            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" aria-hidden="true" />
                          </div>
                           <span className="text-[10px] sm:text-xs font-semibold text-silver-800 truncate">{allSlides[slideIdx]?.word || "Innovation"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30 rotate-6 z-10">
                      <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>

        {/* ══════ SERVICES MARQUEE ══════ */}
        {(() => {
          const marqueeList = content.marqueeItems && content.marqueeItems.length > 0
            ? content.marqueeItems
            : services.map(s => s.title);

          if (!marqueeList || marqueeList.length === 0) return null;

          return (
            <div className="relative z-10 border-t border-silver-200 bg-white/60 backdrop-blur-sm overflow-hidden">
              <div className="marquee-track flex w-max items-center py-4">
                {[0, 1].map(copy => (
                  <div key={copy} className="flex items-center flex-shrink-0" aria-hidden={copy === 1}>
                    {marqueeList.map((item, idx) => (
                      <span key={`${copy}-${idx}-${item}`} className="flex items-center">
                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-silver-400 whitespace-nowrap px-8">{item}</span>
                        <Sparkles className="h-3 w-3 text-primary/50 flex-shrink-0" />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

      </section>
    </>
  );
}
