"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  ShoppingCart,
  Smartphone,
  Code,
  Server,
  Bot,
  Cloud,
  Palette,
  Wrench,
  Package,
  ChevronRight,
  IndianRupee,
  ArrowRight,
  CheckCircle2,
  Info,
  Sparkles,
  Clock,
  Phone,
  Menu,
  X,
  FileCheck,
  Quote,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { pricingCategories as defaultPricingCategories } from "@/data/brolytics-pricing";
import type { PricingCategory, SiteContent } from "@/lib/content-types";

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
    <span
      className={cn(
        "inline-flex items-center gap-1 font-bold text-xs sm:text-sm px-2.5 py-1 rounded-lg shrink-0",
        isRange
          ? "bg-primary/10 text-primary border border-primary/20"
          : isNote
          ? "bg-silver-100 text-silver-700"
          : "bg-silver-900 text-white"
      )}
    >
      <IndianRupee className="w-3 h-3 shrink-0" />
      {price}
    </span>
  );
}

function SectionCard({ section }: { section: PricingCategory["sections"][0] }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-2xl border border-silver-200/90 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:border-silver-300 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-silver-50/60 hover:bg-silver-50 transition-colors"
      >
        <div className="min-w-0 pr-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base sm:text-lg text-silver-900 leading-tight">
              {section.title}
            </h3>
          </div>
          {section.subtitle && (
            <p className="text-xs sm:text-sm text-silver-500 mt-0.5 leading-relaxed">
              {section.subtitle}
            </p>
          )}
        </div>
        <ChevronRight
          className={cn(
            "w-5 h-5 text-silver-400 shrink-0 transition-transform duration-200",
            open && "rotate-90 text-primary"
          )}
        />
      </button>

      {open && (
        <div className="p-4 sm:p-5 pt-2 border-t border-silver-100 divide-y divide-silver-100">
          {section.tables?.map((table, tIdx) => (
            <div key={tIdx} className={cn("py-3 first:pt-1 last:pb-1", table.heading && "space-y-2")}>
              {table.heading && (
                <div className="flex items-center justify-between gap-2 pt-1 pb-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    {table.heading}
                  </p>
                  {table.note && (
                    <span className="text-[11px] text-silver-400 italic">
                      {table.note}
                    </span>
                  )}
                </div>
              )}
              <div className="space-y-1.5">
                {table.rows.map((row, rIdx) => (
                  <div
                    key={rIdx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 py-2 px-3 rounded-xl hover:bg-silver-50/80 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-silver-800 leading-snug">
                        {row.item}
                      </p>
                      {row.note && (
                        <p className="text-[11px] text-silver-400 mt-0.5 leading-tight">
                          {row.note}
                        </p>
                      )}
                    </div>
                    <PriceTag price={row.price} />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {section.lists?.map((list, lIdx) => {
            const isNoteList = list.heading?.toLowerCase().includes("note") || list.heading?.toLowerCase().includes("important");
            return (
              <div
                key={lIdx}
                className={cn(
                  "mt-3 p-3.5 rounded-xl text-xs space-y-1.5",
                  isNoteList ? "bg-amber-500/[0.06] border border-amber-500/20 text-amber-900" : "bg-silver-50 text-silver-700"
                )}
              >
                {list.heading && (
                  <p className="font-bold flex items-center gap-1.5 text-xs">
                    <Info className="w-3.5 h-3.5 shrink-0 text-primary" />
                    {list.heading}
                  </p>
                )}
                <ul className="space-y-1 pl-4 list-disc text-silver-600">
                  {list.items.map((item, iIdx) => (
                    <li key={iIdx} className="leading-relaxed text-[11px] sm:text-xs">
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
  commercialFramework,
  termsPage,
}: {
  pricingCategories?: PricingCategory[];
  pricingHero?: PricingHeroProps;
  commercialFramework?: SiteContent["commercialFramework"];
  termsPage?: SiteContent["termsPage"];
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
            className="w-full flex items-center justify-between p-4 rounded-2xl border border-silver-200 bg-silver-50 text-silver-800 font-semibold text-sm shadow-sm"
          >
            <span className="flex items-center gap-2">
              <span className="text-primary">{iconMap[activeData.icon]}</span>
              {activeData.label}
            </span>
            <span className="text-xs text-silver-400 flex items-center gap-1">
              Change category <ChevronRight className="w-4 h-4" />
            </span>
          </button>

          {mobileOpen && (
            <div className="mt-2 rounded-2xl border border-silver-200 bg-white p-2 shadow-xl space-y-1 z-30">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setMobileOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm transition-colors",
                    activeCategory === cat.id
                      ? "bg-primary text-white font-semibold shadow-sm"
                      : "text-silver-700 hover:bg-silver-100"
                  )}
                >
                  <span className={activeCategory === cat.id ? "text-white" : "text-primary"}>
                    {iconMap[cat.icon]}
                  </span>
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-8 items-start">
          {/* ── Desktop Sidebar ──────────────────────── */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-28">
            <div className="rounded-2xl border border-silver-200/90 bg-white p-2 shadow-sm overflow-hidden">
              <p className="text-[11px] font-bold uppercase tracking-wider text-silver-400 px-3 py-2">
                Categories
              </p>
              <nav className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all duration-200",
                      activeCategory === cat.id
                        ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.01]"
                        : "text-silver-600 hover:bg-silver-100 hover:text-silver-900"
                    )}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <span className={activeCategory === cat.id ? "text-white" : "text-primary shrink-0"}>
                        {iconMap[cat.icon]}
                      </span>
                      <span className="truncate">{cat.label}</span>
                    </span>
                    <ChevronRight
                      className={cn(
                        "w-3.5 h-3.5 shrink-0 transition-transform",
                        activeCategory === cat.id ? "text-white/80 translate-x-0.5" : "text-silver-300"
                      )}
                    />
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

            {/* ══════ SECTION 56: IMPORTANT COMMERCIAL TERMS (10 POINTS) ══════ */}
            <div className="mt-14 rounded-3xl border border-silver-200/90 bg-white p-8 sm:p-10 relative overflow-hidden shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-3 w-fit">
                    <Shield className="w-3.5 h-3.5" />
                    Commercial Governance
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-silver-900 tracking-tight">
                    Important Terms & <span className="text-gradient-red">Operational Principles</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-silver-500 mt-1">
                    Fundamental commercial, scope, advance payment, and intellectual property terms.
                  </p>
                </div>

                <Link
                  href="/terms"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-silver-200 hover:border-primary/40 bg-silver-50 hover:bg-white text-xs font-bold text-silver-800 hover:text-primary transition-all duration-300 shadow-xs shrink-0 self-start sm:self-center"
                >
                  <FileCheck className="w-3.5 h-3.5 text-primary" />
                  Read Full Terms (MSA)
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                {(termsPage?.importantTerms || [
                  { id: 1, title: 'Starting & Indicative Pricing', description: 'All prices are starting/indicative prices for baseline features.' },
                  { id: 2, title: 'Approved Requirements & Scope', description: 'Final pricing is based exclusively on approved requirements and scope.' },
                  { id: 3, title: 'GST & Statutory Taxes', description: 'GST/taxes are additional where applicable.' },
                  { id: 4, title: 'Third-Party Charges', description: 'Third-party charges are separate unless explicitly included.' },
                  { id: 5, title: 'Advance Payment & Sprints', description: 'Development begins after project confirmation and agreed advance payment.' },
                  { id: 6, title: 'Scope Changes & CR Policy', description: 'Major scope changes may affect cost and delivery timeline.' },
                  { id: 7, title: 'Delivery Timeline', description: 'Delivery timeline depends on project complexity and client approvals.' },
                  { id: 8, title: 'Source-Code Ownership', description: 'Source-code ownership and licensing terms are defined in the project agreement.' },
                  { id: 9, title: 'Maintenance & AMC Terms', description: 'Maintenance and AMC terms are mutually agreed before commencement.' },
                  { id: 10, title: 'Custom Quotation Supremacy', description: 'Final commercial quotation supersedes this general rate card for the specific project.' },
                ]).map((term) => (
                  <div
                    key={term.id}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-silver-50/60 border border-silver-200/80 hover:bg-white hover:border-primary/30 transition-colors"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-white border border-silver-200 text-xs font-black text-silver-700 shrink-0 mt-0.5">
                      {term.id}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-silver-900 leading-snug">{term.title}</p>
                      <p className="text-[11px] text-silver-500 leading-relaxed mt-0.5">{term.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ══════ SECTION 55: COMMERCIAL FRAMEWORK CARD ══════ */}
            {commercialFramework && (
              <div className="mt-8 rounded-3xl border border-silver-200/90 bg-silver-50/60 p-8 sm:p-10 relative overflow-hidden shadow-sm">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-4 w-fit">
                  <FileCheck className="w-3.5 h-3.5" />
                  {commercialFramework.badge}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-silver-900 tracking-tight mb-3">
                  {commercialFramework.title}{" "}
                  <span className="text-gradient-red">{commercialFramework.titleAccent}</span>
                </h3>

                <p className="text-silver-600 text-sm sm:text-base max-w-3xl leading-relaxed mb-8">
                  {commercialFramework.description}
                </p>

                {/* 13-Point Quotation Breakdown */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
                  {commercialFramework.quotationPoints.map((point, pi) => (
                    <div
                      key={pi}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-silver-200/80 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-xs font-semibold text-silver-800">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Our Commitment Banner */}
                <div className="rounded-2xl bg-silver-900 text-white p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                  <Quote className="w-8 h-8 text-primary mb-3" />
                  <h4 className="text-lg sm:text-xl font-bold mb-2">
                    "{commercialFramework.commitmentQuote}"
                  </h4>
                  <p className="text-xs sm:text-sm text-silver-300 leading-relaxed max-w-2xl mb-6">
                    {commercialFramework.commitmentText}
                  </p>

                  <Link
                    href={commercialFramework.ctaLink || "/#contact"}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/30 hover:scale-[1.02]"
                  >
                    <Sparkles className="w-4 h-4" />
                    {commercialFramework.ctaText || "Request a Custom Quotation"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-8 rounded-3xl bg-gradient-to-br from-silver-50 via-white to-primary/[0.04] border border-silver-200/90 p-8 sm:p-10 relative overflow-hidden shadow-sm">
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
