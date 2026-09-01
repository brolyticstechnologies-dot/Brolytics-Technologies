"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { TrendingUp, Clock, CheckCircle2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/lib/content-types";

interface CaseStudyCardProps {
  project: ProjectItem;
  index: number;
  isVisible: boolean;
}

function useCountUp(target: string, active: boolean) {
  const [display, setDisplay] = useState("0");
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const raw = target.replace(/[^0-9.]/g, "");
    const numEnd = parseFloat(raw);
    if (isNaN(numEnd)) { setDisplay(target); return; }
    const suffix = target.replace(/^[\d,]+/, "");
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * numEnd);
      setDisplay(current.toLocaleString() + suffix);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target]);

  return display;
}

export function CaseStudyCard({ project, index, isVisible }: CaseStudyCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [impactVisible, setImpactVisible] = useState(false);
  const impactRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const projectId = project.id || project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const impactMetric = project.impact?.metric || project.results || "100%";
  const impactLabel = project.impact?.label || "Key Impact Delivered";
  const impactSubtext = project.impact?.subtext || "";
  const yearText = project.year || "2024";
  const techList = project.technologies || [];
  const descriptionText = project.detailedDescription || project.description || "";

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const t = setTimeout(() => setHasAnimated(true), index * 150);
      return () => clearTimeout(t);
    }
  }, [isVisible, index, hasAnimated]);

  // Impact counter trigger
  useEffect(() => {
    const el = impactRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setImpactVisible(true); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const metricDisplay = useCountUp(impactMetric, impactVisible);

  return (
    <article
      id={`case-study-${projectId}`}
      className={cn(
        "group relative transition-all duration-700",
        hasAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden",
        "border border-silver-200 bg-white",
        "hover:shadow-xl hover:border-silver-300 transition-all duration-500",
      )}>
        {/* Image — alternates left/right */}
        <div className={cn(
          "relative min-h-[260px] lg:min-h-[420px] overflow-hidden",
          !isEven && "lg:order-2"
        )}>
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-silver-900/60 via-silver-900/10 to-transparent" />

          {/* Category + Year badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-silver-700 border border-white/60">
              <Clock className="w-3 h-3 text-primary" />
              {project.duration}
            </span>
          </div>

          {/* Year watermark */}
          <span className="absolute bottom-4 right-4 text-[11px] font-black text-white/40 tracking-widest">
            {yearText}
          </span>
        </div>

        {/* Content */}
        <div className={cn(
          "relative flex flex-col p-7 lg:p-8",
          !isEven && "lg:order-1"
        )}>
          {/* Title */}
          <h3 className="text-xl lg:text-2xl font-black text-silver-900 leading-tight mb-2 group-hover:text-primary transition-colors duration-400">
            {project.title}
          </h3>
          <p className="text-sm text-silver-500 leading-relaxed mb-5">
            {descriptionText}
          </p>

          {/* Expand/Collapse: Challenge + Solution */}
          {(project.challenge || project.solution) && (
            <div className="mb-4">
              <button
                onClick={() => setExpanded((e) => !e)}
                className="flex items-center gap-2 text-xs font-bold text-silver-400 hover:text-primary transition-colors duration-300 mb-3"
                aria-expanded={expanded}
              >
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", expanded && "rotate-180")} />
                {expanded ? "Hide Details" : "Read Full Case Study"}
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-500",
                  expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="space-y-4 pb-4">
                  {project.challenge && (
                    <div className="pl-3 border-l-2 border-silver-200">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-silver-400 mb-1">The Challenge</p>
                      <p className="text-xs text-silver-600 leading-relaxed">{project.challenge}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div className="pl-3 border-l-2 border-primary/50">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mb-1">Our Solution</p>
                      <p className="text-xs text-silver-600 leading-relaxed">{project.solution}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Impact Box */}
          <div
            ref={impactRef}
            className="flex items-center gap-4 p-4 rounded-xl bg-primary/[0.05] border border-primary/12 mb-4 group-hover:border-primary/25 transition-colors duration-400"
          >
            <div className="flex-shrink-0 p-2.5 rounded-xl bg-primary/10">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-black text-primary leading-none">{metricDisplay}</p>
              <p className="text-xs font-bold text-silver-800 leading-tight">{impactLabel}</p>
              {impactSubtext && (
                <p className="text-[10px] text-silver-400 mt-0.5">{impactSubtext}</p>
              )}
            </div>
          </div>

          {/* Tech Stack */}
          {techList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {techList.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-silver-50 border border-silver-200 text-[10px] font-semibold text-silver-500 group-hover:border-primary/15 transition-colors duration-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Testimonial */}
          {project.testimonial && (
            <blockquote className="mt-auto pl-3 border-l-2 border-primary/40 mb-4">
              <p className="text-xs italic text-silver-500 leading-relaxed mb-1">
                &ldquo;{project.testimonial.quote}&rdquo;
              </p>
              <footer className="text-[10px] font-bold text-silver-400">
                — {project.testimonial.name}, {project.testimonial.role}
              </footer>
            </blockquote>
          )}

          {/* CTA */}
          <div className="mt-auto pt-4 border-t border-silver-100 group-hover:border-primary/10 transition-colors duration-400">
            <a
              href={`#case-study-${projectId}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:gap-3 transition-all duration-300"
            >
              <CheckCircle2 className="w-4 h-4" />
              Case Study Verified
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
