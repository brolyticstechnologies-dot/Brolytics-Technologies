"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Globe,
  Server,
  Smartphone,
  Code,
  Database,
  Cloud,
  Bot,
  Wrench,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import type { SiteContent } from '@/lib/content-types';

interface TechnologiesClientProps {
  technologiesPage?: SiteContent['technologiesPage'];
  siteSettings?: SiteContent['siteSettings'];
}

const iconMap: Record<string, any> = {
  globe: Globe,
  server: Server,
  smartphone: Smartphone,
  code: Code,
  database: Database,
  cloud: Cloud,
  bot: Bot,
  wrench: Wrench,
};

export function TechnologiesClient({
  technologiesPage,
}: TechnologiesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = technologiesPage?.categories || [];
  const header = technologiesPage?.header || {
    badge: 'Technology Ecosystem',
    title: 'Modern Engineering &',
    titleAccent: 'Technology Arsenal',
    description:
      'We engineer production-grade digital solutions using battle-tested, modern, and high-performance technologies tailored to your exact business requirements.',
  };

  // Total count of all technologies
  const totalCount = useMemo(() => {
    return categories.reduce((sum, cat) => sum + (cat.items?.length || 0), 0);
  }, [categories]);

  // Pure 0-latency client-side instant filtering across all items and categories
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return categories
      .map((cat) => {
        // Category selection filter
        if (activeCategory !== 'all' && cat.id !== activeCategory) {
          return null;
        }

        // Search query filter
        const matchingItems = (cat.items || []).filter((item) => {
          if (!query) return true;
          return (
            item.name.toLowerCase().includes(query) ||
            (item.subcategory && item.subcategory.toLowerCase().includes(query)) ||
            cat.name.toLowerCase().includes(query)
          );
        });

        if (matchingItems.length === 0) return null;

        return {
          ...cat,
          items: matchingItems,
        };
      })
      .filter(Boolean) as typeof categories;
  }, [categories, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero Section ─────────────────────────────── */}
      <section className="relative pt-28 pb-16 bg-gradient-to-b from-silver-50 via-white to-white border-b border-silver-100 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-silver-200/50 blur-[90px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/[0.04] mb-5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
              {header.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-5">
            <span className="text-silver-900">{header.title}</span>{' '}
            <span className="text-gradient-red">{header.titleAccent}</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-silver-500 max-w-3xl mx-auto leading-relaxed mb-10">
            {header.description}
          </p>

          {/* ── Instant Client-Side Search Bar ────────── */}
          <div className="relative max-w-xl mx-auto mb-8">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-silver-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 100+ technologies (e.g. Next.js, Python, Flutter, AWS, Docker)..."
                className="w-full pl-12 pr-10 py-3.5 rounded-full bg-white border border-silver-200 shadow-lg shadow-silver-900/5 text-silver-900 placeholder:text-silver-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-bold text-silver-400 hover:text-silver-700"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex items-center justify-between text-xs text-silver-400 mt-2 px-2">
              <span>Instant client-side filter</span>
              <span>
                {filteredCategories.reduce((s, c) => s + c.items.length, 0)} of {totalCount} technologies
              </span>
            </div>
          </div>

          {/* ── Category Quick Filters ─────────────────── */}
          <div className="flex items-center justify-center gap-2 flex-wrap max-w-4xl mx-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-silver-100 text-silver-600 hover:bg-silver-200/80 hover:text-silver-900'
              }`}
            >
              All Stack ({totalCount})
            </button>
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Code;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'bg-silver-50 border border-silver-200 text-silver-600 hover:border-primary/30 hover:text-primary hover:bg-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.name} ({cat.items?.length || 0})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Technologies Grid Matrix ─────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredCategories.length === 0 ? (
          <div className="py-20 text-center text-silver-500">
            <Filter className="w-12 h-12 text-silver-300 mx-auto mb-3" />
            <p className="text-lg font-bold text-silver-800">No matching technologies found</p>
            <p className="text-sm text-silver-400 mt-1">
              Try searching with a different term or reset your category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-5 py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-14">
            {filteredCategories.map((cat) => {
              const Icon = iconMap[cat.icon] || Code;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 rounded-3xl border border-silver-200/80 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-silver-100 pb-5 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-primary/10 text-primary flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-silver-900">{cat.name}</h2>
                        <p className="text-xs sm:text-sm text-silver-500 mt-0.5">{cat.description}</p>
                      </div>
                    </div>
                    <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-silver-100 text-silver-600">
                      {cat.items.length} Technologies
                    </span>
                  </div>

                  {/* Technology Badges Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {cat.items.map((item, i) => (
                      <div
                        key={i}
                        className="group relative flex flex-col justify-between p-3.5 rounded-2xl border border-silver-200/70 bg-silver-50/50 hover:bg-white hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-silver-400 group-hover:text-primary transition-colors">
                              {item.subcategory || 'Standard'}
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full bg-silver-300 group-hover:bg-primary transition-colors" />
                          </div>
                          <p className="text-xs sm:text-sm font-bold text-silver-800 group-hover:text-silver-950 transition-colors leading-snug">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Architecture Philosophy Banner ───────────── */}
      <section className="py-16 bg-silver-50 border-t border-silver-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-black text-silver-900 mb-4">
            Technology Selected by Project Purpose — <span className="text-gradient-red">Not Habit</span>
          </h3>
          <p className="text-silver-500 max-w-2xl mx-auto leading-relaxed mb-8 text-sm sm:text-base">
            We don’t force every project into the same framework. We select the best-fit technology stack based on your product’s performance requirements, user scale, budget, and long-term roadmap.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left mb-10">
            <div className="p-4 rounded-2xl bg-white border border-silver-200 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-primary mb-2" />
              <h4 className="font-bold text-sm text-silver-900">Scalable Architecture</h4>
              <p className="text-xs text-silver-500 mt-1">From MVP to enterprise concurrency without costly re-writes.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-silver-200 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-primary mb-2" />
              <h4 className="font-bold text-sm text-silver-900">Modern Code Quality</h4>
              <p className="text-xs text-silver-500 mt-1">Clean TypeScript, automated tests, and strict linting standards.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-silver-200 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-primary mb-2" />
              <h4 className="font-bold text-sm text-silver-900">Zero Vendor Lock-in</h4>
              <p className="text-xs text-silver-500 mt-1">Full source code ownership, clean documentation, and CI/CD setup.</p>
            </div>
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.03]"
          >
            <Sparkles className="w-4 h-4" />
            Discuss Your Project Stack
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
