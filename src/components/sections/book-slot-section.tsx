'use client';

import {
  Calendar,
  Sparkles,
  ShieldCheck,
  Zap,
  Users,
  Clock,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { BookSlotForm } from '@/components/booking/book-slot-form';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

export function BookSlotSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      id="book-slot"
      className="relative py-20 sm:py-28 bg-gradient-to-b from-silver-50/80 via-white to-white overflow-hidden border-t border-silver-200/80"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-silver-200/40 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(hsl(214 32% 91% / .35) 1px, transparent 1px), linear-gradient(90deg, hsl(214 32% 91% / .35) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Value Props */}
          <div
            className={cn(
              'lg:col-span-5 transition-all duration-1000 space-y-6',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            )}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/[0.05] shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-black uppercase tracking-wider text-primary">
                Direct Founder Consultation
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-silver-900 tracking-tight leading-[1.1]">
              Skip The Wait. <br />
              <span className="text-gradient-red">Reserve Your 30-Min Strategy Slot.</span>
            </h2>

            <p className="text-base sm:text-lg text-silver-600 leading-relaxed">
              Book a live consultation call directly with our technical leadership. We will analyze your project requirements, recommend the most cost-effective tech stack, and outline a delivery roadmap.
            </p>

            {/* 4 Core Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white border border-silver-200/90 shadow-xs flex items-start gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-silver-900">With Tech Leads</h3>
                  <p className="text-[11px] text-silver-500">Direct architecture discussion</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-silver-200/90 shadow-xs flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-silver-900">100% Free & NDA</h3>
                  <p className="text-[11px] text-silver-500">Your ideas stay confidential</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-silver-200/90 shadow-xs flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-silver-900">Instant Estimate</h3>
                  <p className="text-[11px] text-silver-500">Ballpark cost & timeline</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-silver-200/90 shadow-xs flex items-start gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-silver-900">Google Meet Link</h3>
                  <p className="text-[11px] text-silver-500">Automated calendar invite</p>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp fallback card */}
            <div className="p-4 rounded-2xl bg-silver-100/70 border border-silver-200/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-silver-900">Need an immediate answer?</p>
                  <p className="text-[11px] text-silver-500">Chat with us on WhatsApp</p>
                </div>
              </div>
              <a
                href="https://wa.me/918507507173?text=Hi%20Brolytics%2C%20I%20would%20like%20to%20discuss%20a%20new%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shrink-0 shadow-sm transition-all hover:scale-105"
              >
                Chat Now
              </a>
            </div>
          </div>

          {/* Right Column: Live Booking Form */}
          <div
            className={cn(
              'lg:col-span-7 transition-all duration-1000 delay-200',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            )}
          >
            <BookSlotForm />
          </div>
        </div>
      </div>
    </section>
  );
}
