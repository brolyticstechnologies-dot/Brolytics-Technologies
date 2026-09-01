'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Phone,
  ArrowRight,
  Scale,
  CreditCard,
  Layers,
  Code2,
  Clock,
  Wrench,
  FileCheck,
} from 'lucide-react';
import type { SiteContent } from '@/lib/content-types';
import { cn } from '@/lib/utils';

interface TermsClientProps {
  termsPage?: SiteContent['termsPage'];
  siteSettings?: SiteContent['siteSettings'];
}

const defaultTerms = [
  {
    id: 1,
    title: 'Starting & Indicative Pricing',
    description: 'All figures listed on our rate cards and website represent starting or indicative baseline prices for standard scope requirements.',
    category: 'Commercial',
  },
  {
    id: 2,
    title: 'Approved Requirements & Scope',
    description: 'Final pricing for any custom software or web development project is calculated exclusively based on the mutually approved Software Requirement Specification (SRS) and feature scope.',
    category: 'Scope',
  },
  {
    id: 3,
    title: 'Taxes & Statutory Levies',
    description: 'All published prices are exclusive of applicable Goods & Services Tax (GST 18%) and statutory government levies, which will be billed additionally on invoices where applicable.',
    category: 'Commercial',
  },
  {
    id: 4,
    title: 'Third-Party & Infrastructure Charges',
    description: 'Third-party charges (including domain registration, cloud hosting, third-party API usage, SMS/WhatsApp gateways, Play Store/App Store developer accounts, and paid fonts/licenses) are billed separately unless explicitly included in your quotation.',
    category: 'Infrastructure',
  },
  {
    id: 5,
    title: 'Project Commencement & Advance Payment',
    description: 'Development sprints, UI design, and technical engineering commence strictly after mutual written project confirmation and receipt of the agreed milestone advance payment.',
    category: 'Payment',
  },
  {
    id: 6,
    title: 'Scope Modifications & Change Requests',
    description: 'Any additions or modifications to the approved scope requested during or after development will be evaluated as Change Requests (CR) and may impact the project cost and delivery timeline.',
    category: 'Scope',
  },
  {
    id: 7,
    title: 'Delivery Timelines & Client Approvals',
    description: 'Estimated delivery schedules depend on project complexity, prompt provision of required content/credentials, and timely milestone reviews and approvals by the client.',
    category: 'Delivery',
  },
  {
    id: 8,
    title: 'Source Code & Intellectual Property Ownership',
    description: 'Upon full and final settlement of all agreed project invoices, full source-code ownership and intellectual property rights are transferred to the client as defined in the formal service agreement.',
    category: 'IP & Code',
  },
  {
    id: 9,
    title: 'Maintenance, SLA & AMC Terms',
    description: 'Post-launch warranty periods, ongoing Annual Maintenance Contracts (AMC), and Service Level Agreements (SLAs) are mutually structured and documented before project handover.',
    category: 'Support',
  },
  {
    id: 10,
    title: 'Supremacy of Custom Commercial Quotation',
    description: 'A signed, formal custom project quotation and Master Service Agreement (MSA) supersede all general rate card figures and marketing estimates for that specific project engagement.',
    category: 'Legal',
  },
];

const categoryBadgeStyles: Record<string, string> = {
  Commercial: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Scope: 'bg-blue-50 text-blue-700 border-blue-200',
  Payment: 'bg-primary/10 text-primary border-primary/20',
  Infrastructure: 'bg-amber-50 text-amber-700 border-amber-200',
  Delivery: 'bg-purple-50 text-purple-700 border-purple-200',
  'IP & Code': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Support: 'bg-rose-50 text-rose-700 border-rose-200',
  Legal: 'bg-silver-100 text-silver-700 border-silver-300',
};

export function TermsClient({ termsPage, siteSettings }: TermsClientProps) {
  const header = termsPage?.header || {
    badge: 'Legal & Commercial Terms',
    title: 'Terms & Conditions of',
    titleAccent: 'Service & Engagement',
    description:
      'Please review the fundamental operational, commercial, and legal principles governing project engagement, delivery, intellectual property, and payment with Brolytics Technologies.',
    lastUpdated: 'August 2026',
  };

  const importantTerms = termsPage?.importantTerms && termsPage.importantTerms.length > 0
    ? termsPage.importantTerms
    : defaultTerms;

  const clauses = termsPage?.clauses || [];

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero Section ─────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-silver-50 via-white to-white overflow-hidden border-b border-silver-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-silver-200/50 rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(hsl(214 32% 91% / .4) 1px, transparent 1px), linear-gradient(90deg, hsl(214 32% 91% / .4) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/[0.04] mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
              {header.badge}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-5">
            <span className="text-silver-900">{header.title}</span>{' '}
            <span className="text-gradient-red">{header.titleAccent}</span>
          </h1>

          <p className="text-base sm:text-lg text-silver-600 max-w-3xl mx-auto leading-relaxed mb-6">
            {header.description}
          </p>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-silver-400">
            <span>Last Updated: {header.lastUpdated}</span>
            <span>•</span>
            <span>Version 2.4</span>
            <span>•</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Legally Verified
            </span>
          </div>
        </div>
      </section>

      {/* ── 10 Key Important Terms Grid ─────────────── */}
      <section className="py-16 md:py-20 bg-silver-50/50 border-b border-silver-100">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-silver-100 text-silver-600 text-xs font-bold uppercase tracking-wider mb-3">
              <FileCheck className="w-3.5 h-3.5 text-primary" />
              Quick Summary
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-silver-900 tracking-tight">
              10 Fundamental Commercial Principles
            </h2>
            <p className="text-xs sm:text-sm text-silver-500 mt-2">
              Every quote, invoice, and development agreement is built upon these 10 core principles.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {importantTerms.map((term) => {
              const badgeClass =
                (term.category && categoryBadgeStyles[term.category]) ||
                'bg-silver-100 text-silver-700 border-silver-200';

              return (
                <div
                  key={term.id}
                  className="flex gap-4 p-6 rounded-2xl bg-white border border-silver-200/90 shadow-sm hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-silver-100 font-black text-sm text-silver-700 group-hover:bg-primary group-hover:text-white transition-colors">
                    {term.id < 10 ? `0${term.id}` : term.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-base font-bold text-silver-900 group-hover:text-primary transition-colors">
                        {term.title}
                      </h3>
                      {term.category && (
                        <span
                          className={cn(
                            'text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0',
                            badgeClass
                          )}
                        >
                          {term.category}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-silver-500 leading-relaxed">
                      {term.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Detailed Legal & Engagement Clauses ─────── */}
      {clauses.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-black text-silver-900 tracking-tight mb-3">
                Detailed Master Service Terms
              </h2>
              <p className="text-sm text-silver-500 max-w-xl mx-auto">
                Comprehensive clauses governing delivery, code ownership, intellectual property, confidentiality, and support.
              </p>
            </div>

            <div className="space-y-8">
              {clauses.map((clause, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-silver-200/90 shadow-xs space-y-4"
                >
                  <h3 className="text-lg sm:text-xl font-black text-silver-900 tracking-tight flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {clause.title}
                  </h3>
                  <div className="space-y-3 pl-5 border-l-2 border-silver-100">
                    {clause.content.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-xs sm:text-sm text-silver-600 leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA Banner ──────────────────────── */}
      <section className="pb-20 pt-6">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="rounded-3xl bg-silver-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold uppercase tracking-widest text-primary-foreground mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Custom Project Agreement
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-4">
                Ready to Discuss Your Project Scope?
              </h2>
              <p className="text-xs sm:text-base text-silver-300 leading-relaxed mb-8">
                Share your requirements with our engineering team to receive a tailored Software Requirement Specification, milestone timeline, and transparent commercial proposal.
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/30 hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4" />
                  Start Project Discussion
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-300"
                >
                  <FileText className="w-4 h-4" />
                  View Pricing Rate Card
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
