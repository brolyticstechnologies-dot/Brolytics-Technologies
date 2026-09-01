'use client';

import {
  Sparkles,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Video,
  Clock,
  Zap,
  Users,
} from 'lucide-react';
import { BookSlotForm } from '@/components/booking/book-slot-form';
import type { SiteContent } from '@/lib/content-types';

export function BookSlotClient({
  siteSettings,
}: {
  siteSettings?: SiteContent['siteSettings'];
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero & Booking Area ─────────────────────── */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-28 bg-gradient-to-b from-silver-50 via-white to-white overflow-hidden border-b border-silver-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[130px]" />
          <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-silver-200/50 rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(hsl(214 32% 91% / .4) 1px, transparent 1px), linear-gradient(90deg, hsl(214 32% 91% / .4) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 max-w-5xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/[0.04] mb-5 shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                Free 30-Min Strategy Call
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-5">
              <span className="text-silver-900">Schedule a 1-on-1</span>{' '}
              <span className="text-gradient-red">Project Discovery Slot</span>
            </h1>

            <p className="text-base sm:text-lg text-silver-600 max-w-2xl mx-auto leading-relaxed">
              Pick a date and time slot below. We will discuss your project scope, recommend the best tech stack, and share a transparent milestone roadmap.
            </p>
          </div>

          {/* Value Props Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-silver-200/90 shadow-xs">
              <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-silver-900">With Tech Founders</p>
                <p className="text-[10px] text-silver-500">Direct senior insight</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-silver-200/90 shadow-xs">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-silver-900">100% Free & NDA</p>
                <p className="text-[10px] text-silver-500">Your IP is protected</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-silver-200/90 shadow-xs">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-silver-900">Architecture Advice</p>
                <p className="text-[10px] text-silver-500">Stack & scaling plan</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-silver-200/90 shadow-xs">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-silver-900">Instant Confirmation</p>
                <p className="text-[10px] text-silver-500">Google Meet invite</p>
              </div>
            </div>
          </div>

          {/* Interactive Booking Form */}
          <div className="max-w-3xl mx-auto">
            <BookSlotForm />
          </div>
        </div>
      </section>
    </div>
  );
}
