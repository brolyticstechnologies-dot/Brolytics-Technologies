"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Cpu, Layers } from 'lucide-react';
import type { SiteContent } from '@/lib/content-types';

interface TechStackTeaserProps {
  curatedTech?: string[];
}

const defaultCuratedTech = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Flutter",
  "React Native",
  "Swift",
  "Kotlin",
  "Docker",
  "Kubernetes",
  "AWS",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
  "Generative AI & LLMs",
  "Firebase",
  "Figma"
];

export function TechStackTeaser({ curatedTech }: TechStackTeaserProps) {
  const techList = curatedTech && curatedTech.length > 0 ? curatedTech : defaultCuratedTech;

  return (
    <section className="py-20 bg-white border-b border-silver-100 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-primary/[0.03] blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/[0.04] mb-3">
              <Cpu className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                Engineering Stack
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-silver-900 tracking-tight">
              Modern Tech Ecosystem. <span className="text-gradient-red">Zero Compromise.</span>
            </h2>
            <p className="text-sm sm:text-base text-silver-500 max-w-2xl mt-2">
              We build with modern, high-performance frameworks and battle-tested cloud platforms tailored to your business needs.
            </p>
          </div>

          <Link
            href="/technologies"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-primary/80 transition-colors shrink-0 group self-start md:self-auto"
          >
            Explore all 100+ Technologies & Frameworks
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Curated 18 Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {techList.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 p-3.5 rounded-2xl border border-silver-200/80 bg-silver-50/50 hover:bg-white hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors flex-shrink-0" />
              <span className="text-xs sm:text-[13px] font-bold text-silver-800 group-hover:text-silver-950 transition-colors truncate">
                {tech}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Banner Strip */}
        <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-silver-50 via-white to-silver-50 border border-silver-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Layers className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-silver-600 font-medium">
              Need a specialized stack or legacy framework? We support polyglot enterprise architectures.
            </p>
          </div>
          <Link
            href="/technologies"
            className="px-4 py-2 rounded-full bg-silver-900 text-white text-xs font-bold hover:bg-primary transition-colors shrink-0"
          >
            View Complete Matrix
          </Link>
        </div>
      </div>
    </section>
  );
}
