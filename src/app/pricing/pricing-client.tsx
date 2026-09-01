"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Globe, ShoppingCart, Smartphone, Code, Server, Bot, Cloud,
  Palette, Wrench, Package, ChevronRight, IndianRupee, ArrowRight,
  CheckCircle, Info, Sparkles, Clock, Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { pricingCategories as defaultPricingCategories, type PricingCategory } from "@/data/brolytics-pricing";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-4 h-4" />,
  ShoppingCart: <ShoppingCart className="w-4 h-4" />,
  Smartphone: <Smartphone className="w-4 h-4" />,
  Code: <Code className="w-4 h-4" />,
  Server: <Server className="w-4 h-4" />,
  Bot: <Bot className="w-4 h-4" />,
  Cloud: <Cloud className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  Wrench: <Wrench className="w-4 h-4" />,
  Package: <Package className="w-4 h-4" />,
};

function PriceTag({ price }: { price: string }) {
  const isRange = price.includes("–") || price.includes("+");
  const isNote = price.includes("/") || price.includes("As per") || price.includes("Included") || price.includes("~");
  return (
    <span className={cn(
      "font-bold text-sm tabular-nums whitespace-nowrap",
      isNote ? "text-silver-500 font-medium" : isRange ? "text-amber-600" : "text-primary"
    )}>
      {price}
    </span>
  );
}

function SectionCard({ section }: { section: PricingCategory["sections"][number] }) {
  const tables = section.tables || [];
  const lists = section.lists || [];

  return (
    <div className="mb-10 last:mb-0">
      <h3 className="text-xl font-bold text-silver-900 mb-1">{section.title}</h3>
      {section.subtitle && (
        <p className="text-sm text-silver-500 mb-4 leading-relaxed flex gap-2 items-start">
          <Info className="w-4 h-4 mt-0.5 text-silver-400 shrink-0" />
          {section.subtitle}
        </p>
      )}
      {tables.map((table, ti) => {
        const rows = table.rows || [];
        return (
          <div key={ti} className="mb-6">
            {table.heading && (
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                {table.heading}
              </p>
            )}
            {rows.length > 0 && (
              <div className="rounded-xl border border-silver-200 overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <tbody>
                    {rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className={cn(
                          "border-b border-silver-100 last:border-0 transition-colors duration-150",
                          ri % 2 === 0 ? "bg-white" : "bg-silver-50/60"
                        )}
                      >
                        <td className="px-4 py-3 text-silver-700 leading-snug w-full">
                          {row.item}
                          {row.note && <span className="ml-2 text-xs text-silver-400">({row.note})</span>}
                        </td>
                        <td className="px-4 py-3 text-right shrink-0">
                          <PriceTag price={row.price} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {table.note && (
              <p className="mt-2 text-xs text-silver-400 italic flex gap-1.5 items-center">
                <Info className="w-3 h-3 shrink-0" /> {table.note}
              </p>
            )}
          </div>
        );
      })}
      {lists.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4 mt-2">
          {lists.map((list, li) => {
            const items = list.items || [];
            return (
              <div
                key={li}
                className={cn(
                  "rounded-xl border border-silver-200 p-4",
                  list.heading === "Note" ? "bg-amber-50 border-amber-200" : "bg-silver-50"
                )}
              >
                {list.heading && (
                  <p className={cn(
                    "text-xs font-bold uppercase tracking-widest mb-2",
                    list.heading === "Note" ? "text-amber-600" : "text-silver-500"
                  )}>
                    {list.heading}
                  </p>
                )}
                <ul className="space-y-1.5">
                  {items.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-silver-700">
                      <CheckCircle className={cn("w-3.5 h-3.5 mt-0.5 shrink-0",
                        list.heading === "Note" ? "text-amber-500" : "text-primary"
                      )} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface PricingHeroProps {
  badge?: string;
  title?: string;
  titleAccent?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  phoneText?: string;
  phoneLink?: string;
  disclaimer?: string;
}

export function PricingClient({
  pricingCategories,
  pricingHero,
}: {
  pricingCategories?: PricingCategory[];
  pricingHero?: PricingHeroProps;
}) {
  const categories = pricingCategories && pricingCategories.length > 0 ? pricingCategories : defaultPricingCategories;
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const heroBadge = pricingHero?.badge || "Complete Pricing";
  const heroTitle = pricingHero?.title || "Transparent Pricing —";
  const heroTitleAccent = pricingHero?.titleAccent || "No Hidden Costs.";
  const heroSubtitle = pricingHero?.subtitle || "Exact prices straight from our founder. Browse by category, choose your service and get a clear picture before you talk to us.";
  const heroCtaText = pricingHero?.ctaText || "Get a Custom Quote";
  const heroCtaLink = pricingHero?.ctaLink || "/#contact";
  const heroPhoneText = pricingHero?.phoneText || "+91 85075 07173";
  const heroPhoneLink = pricingHero?.phoneLink || "tel:+918507507173";
  const heroDisclaimer = pricingHero?.disclaimer || "All prices are starting prices in Indian Rupees (INR) and exclude GST, domain, hosting, third-party API costs and government charges unless specified.";

  const activeData = categories.find((c) => c.id === activeCategory) || categories[0];

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeCategory]);

  if (!categories || categories.length === 0 || !activeData) {
    return (
      <div className="py-20 text-center text-silver-500">
        <p>No pricing information currently available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative pt-28 pb-14 bg-gradient-to-b from-silver-50 to-white border-b border-silver-100 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/[0.05] blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-silver-200/40 blur-[80px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {heroBadge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/[0.04] mb-5">
              <IndianRupee className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                {heroBadge}
              </span>
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-5">
            <span className="text-silver-900">{heroTitle}</span>{" "}
            <span className="text-gradient-red">{heroTitleAccent}</span>
          </h1>
          {heroSubtitle && (
            <p className="text-lg text-silver-500 max-w-2xl mx-auto leading-relaxed mb-8">
              {heroSubtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {heroCtaText && (
              <Link
                href={heroCtaLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                {heroCtaText}
              </Link>
            )}
            {heroPhoneText && (
              <Link
                href={heroPhoneLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-silver-200 text-silver-700 font-semibold text-sm hover:border-primary/30 hover:text-primary transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                {heroPhoneText}
              </Link>
            )}
          </div>
          {/* Disclaimer */}
          {heroDisclaimer && (
            <p className="mt-6 text-xs text-silver-400 max-w-xl mx-auto">
              {heroDisclaimer}
            </p>
          )}
        </div>
      </section>

      {/* ── Main Layout ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Mobile category selector */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-silver-200 bg-white text-silver-800 font-semibold text-sm shadow-sm"
          >
            <span className="flex items-center gap-2">
              {iconMap[activeData.icon]}
              {activeData.label}
            </span>
            <ChevronRight className={cn("w-4 h-4 transition-transform", mobileOpen && "rotate-90")} />
          </button>
          {mobileOpen && (
            <div className="mt-2 rounded-xl border border-silver-200 bg-white shadow-xl overflow-hidden">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setMobileOpen(false); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium border-b border-silver-100 last:border-0 transition-colors",
                    cat.id === activeCategory ? "bg-primary/[0.07] text-primary" : "text-silver-700 hover:bg-silver-50"
                  )}
                >
                  {iconMap[cat.icon]}
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-8 items-start">
          {/* ── Sidebar ──────────────────────────────── */}
          <aside className="hidden lg:block w-60 shrink-0 sticky top-28">
            <div className="rounded-2xl border border-silver-200 bg-white shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-silver-100 bg-silver-50">
                <p className="text-[10px] font-bold uppercase tracking-widest text-silver-400">
                  Categories
                </p>
              </div>
              <nav className="p-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left mb-0.5 last:mb-0",
                      cat.id === activeCategory
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-silver-600 hover:bg-silver-100 hover:text-silver-900"
                    )}
                  >
                    <span className={cat.id === activeCategory ? "text-white" : "text-silver-400"}>
                      {iconMap[cat.icon]}
                    </span>
                    {cat.label}
                    {cat.id === activeCategory && (
                      <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                    )}
                  </button>
                ))}
              </nav>

              {/* CTA card */}
              <div className="m-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-4">
                <p className="text-xs font-bold text-primary mb-1">Need a custom quote?</p>
                <p className="text-xs text-silver-600 mb-3 leading-relaxed">
                  Complex projects get personalised pricing.
                </p>
                <Link
                  href="/#contact"
                  className="flex items-center gap-1.5 text-xs font-bold text-primary hover:gap-2.5 transition-all duration-200"
                >
                  Contact Us <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </aside>

          {/* ── Content area ─────────────────────────── */}
          <main ref={contentRef} className="flex-1 min-w-0">
            {/* Category header */}
            <div className="mb-8 pb-6 border-b border-silver-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/[0.08] text-primary">
                  {iconMap[activeData.icon] && (
                    <span className="[&>svg]:w-5 [&>svg]:h-5">{iconMap[activeData.icon]}</span>
                  )}
                </div>
                <h2 className="text-2xl font-black text-silver-900">{activeData.label}</h2>
              </div>
              <div className="flex gap-2 flex-wrap">
                {activeData.sections.map((s) => (
                  <span key={s.id} className="px-3 py-1 rounded-full bg-silver-100 text-silver-600 text-xs font-medium">
                    {s.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-2">
              {activeData.sections.map((section) => (
                <SectionCard key={section.id} section={section} />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 rounded-3xl bg-gradient-to-br from-silver-50 via-white to-primary/[0.04] border border-silver-200/90 p-8 sm:p-10 relative overflow-hidden shadow-sm">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/[0.06] rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-3.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Ready to Start?
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-silver-900 mb-3 tracking-tight">
                  Don't see your exact requirement?
                </h3>
                <p className="text-silver-600 text-sm sm:text-base mb-6 max-w-2xl leading-relaxed">
                  Every project is custom. Share your idea and we'll prepare a detailed scope, feature breakdown, transparent pricing, milestones and timeline — before any commitment.
                </p>
                <div className="flex flex-col sm:flex-row gap-3.5">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02]"
                  >
                    <Sparkles className="w-4 h-4" />
                    Start Your Project
                  </Link>
                  <Link
                    href="tel:+918507507173"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-silver-300 bg-white text-silver-800 font-semibold text-sm hover:border-primary/40 hover:text-primary hover:bg-primary/[0.02] transition-all duration-300 shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-primary" />
                    Call: +91 85075 07173
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
