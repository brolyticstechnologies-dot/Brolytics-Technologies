"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  TrendingUp,
  Star,
  Globe,
  Smartphone,
  BarChart3,
  Clock,
  Target,
  Palette,
  Briefcase,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import type { SiteContent } from "@/lib/content-types";
import { getIcon } from "@/lib/icon-map";
import { useSiteContent } from "@/hooks/use-site-content";

interface OurWorkProps {
  content?: SiteContent['ourWork'];
}

interface ProjectCardProps {
  imageUrl: string;
  aiHint?: string;
  category: string;
  title: string;
  description?: string;
  results?: string;
  impact?: { metric: string; label: string; subtext?: string };
  technologies?: string[];
  duration?: string;
  href?: string;
  index: number;
  isVisible: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageUrl,
  aiHint = '',
  category,
  title,
  description = '',
  results = '',
  impact,
  technologies = [],
  duration = '',
  href = '/our-work',
  index,
  isVisible,
}) => {
  const displayResults = results || (impact ? `${impact.metric} ${impact.label}` : 'Verified Outcome');
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), index * 120);
      return () => clearTimeout(timer);
    }
  }, [isVisible, index, hasAnimated]);

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "web application":
        return Globe;
      case "mobile development":
        return Smartphone;
      case "windows application":
        return BarChart3;
      case "digital marketing":
        return TrendingUp;
      case "graphic design":
        return Palette;
      default:
        return Award;
    }
  };

  const CategoryIcon = getCategoryIcon(category);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className={cn(
        "group relative rounded-[1.35rem] p-[1px] transition-all duration-500 transform-gpu",
        "bg-gradient-to-br from-silver-200/70 via-white to-silver-200/50",
        "hover:from-primary/35 hover:via-primary/10 hover:to-silver-200/60",
        "hover:shadow-xl hover:-translate-y-1",
        ""
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative flex h-full flex-col rounded-[1.3rem] bg-white overflow-hidden">
        {/* Image */}
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            data-ai-hint={aiHint}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-silver-900/55 via-silver-900/10 to-transparent" />

          <div className="absolute top-3.5 left-3.5 z-10">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary rounded-full shadow-lg shadow-primary/25">
              <CategoryIcon className="w-3.5 h-3.5 text-white flex-shrink-0" aria-hidden="true" />
              <p className="text-[10px] font-bold text-white uppercase tracking-wider leading-none whitespace-nowrap">
                {category}
              </p>
            </div>
          </div>

          <div className="absolute top-3.5 right-3.5 z-10">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/92 backdrop-blur-md rounded-full border border-white/60 shadow-md">
              <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" aria-hidden="true" />
              <p className="text-[10px] text-silver-700 font-semibold leading-none whitespace-nowrap">{duration}</p>
            </div>
          </div>

          <span className="absolute bottom-3.5 right-3.5 z-10 text-[10px] font-black text-white/50 tabular-nums tracking-wider">
            {num}
          </span>
        </div>

        {/* Content */}
        <div className="relative flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-lg font-black text-silver-900 leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-400 mb-2">
            {title}
          </h3>

          <p className="text-sm text-silver-500 leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>

          {/* Impact */}
          <div className="p-3 rounded-xl bg-primary/[0.05] border border-primary/10 group-hover:border-primary/20 transition-colors duration-400 mb-4">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 bg-primary/12 rounded-lg flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-primary" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold text-silver-400 uppercase tracking-wider mb-0.5">Impact</p>
                <p className="text-xs font-bold text-silver-800 leading-snug line-clamp-2">{displayResults}</p>
              </div>
            </div>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-silver-50 border border-silver-200 text-[11px] font-semibold text-silver-500 group-hover:border-primary/15 transition-colors duration-400"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Footer link */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-silver-100 group-hover:border-primary/10 transition-colors duration-400">
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-silver-400 group-hover:text-primary transition-colors duration-400"
            >
              View Details
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              href={href}
              className="p-2 rounded-full border border-silver-200 bg-silver-50 group-hover:bg-primary group-hover:border-primary transition-all duration-400 group-hover:scale-110"
              aria-label={`View ${title}`}
            >
              <ArrowUpRight className="h-4 w-4 text-silver-500 group-hover:text-white transition-colors duration-400" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  icon: Icon,
  value,
  label,
  description,
  isVisible,
  index,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  description: string;
  isVisible: boolean;
  index: number;
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), index * 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, index, hasAnimated]);

  return (
    <div
      className={cn(
        "group relative rounded-[1.2rem] p-[1px] transition-all duration-500 transform-gpu",
        "bg-gradient-to-br from-silver-200/70 via-white to-silver-200/50",
        "hover:from-primary/30 hover:via-primary/8 hover:to-silver-200/60",
        "hover:shadow-lg hover:-translate-y-1",
        ""
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative text-center rounded-[1.15rem] bg-white px-4 py-5 sm:py-6 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

        <div className="relative inline-flex p-3 mb-3 rounded-xl bg-gradient-to-br from-primary/12 to-primary/5 border border-primary/15 group-hover:scale-105 transition-transform duration-400">
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>

        <p className="text-2xl font-black text-silver-900 group-hover:text-primary transition-colors duration-400 leading-none mb-1">
          {value}
        </p>
        <p className="text-xs font-bold text-silver-800 mb-0.5">{label}</p>
        <p className="text-[11px] text-silver-400 leading-tight">{description}</p>
      </div>
    </div>
  );
};

export function OurWork({ content: contentProp }: OurWorkProps = {}) {
  const siteContent = useSiteContent();
  const content = contentProp ?? siteContent?.ourWork;
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  if (!content) return null;

  const { header } = content;
  const achievementStats = content.achievementStats.map(s => ({ ...s, icon: getIcon(s.icon) }));
  const projectsData = content.projects;
  const projectCount = content.homeProjectCount;

  return (
    <section ref={ref} id="our-work" className="relative py-16 sm:py-24 md:py-28 bg-silver-50 text-silver-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-silver-50 via-white to-silver-50" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-silver-300/30 rounded-full blur-[130px] animate-aurora-drift" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-primary/[0.04] rounded-full blur-[130px] animate-aurora-drift"
          style={{ animationDelay: "5s" }}
        />
        <div className="absolute inset-0 opacity-55 bg-[linear-gradient(hsl(214_32%_91%/.35)_1px,transparent_1px),linear-gradient(90deg,hsl(214_32%_91%/.35)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_50%,black,transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px hairline" />
        <div className="absolute bottom-0 inset-x-0 h-px hairline" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-14 md:mb-16 max-w-3xl mx-auto transition-all duration-1000",
            ""
          )}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-6 rounded-full border border-silver-200 bg-white/80 backdrop-blur-sm shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary/50 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <Briefcase className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-silver-600">
              {header.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.08] mb-5">
            <span className="text-silver">{header.title}</span>
            <span className="text-gradient-red"> {header.titleAccent}</span>
          </h2>

          <p className="text-base md:text-lg text-silver-500 leading-relaxed">
            {header.subtitle}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-12 md:mb-14">
          {achievementStats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} isVisible={isVisible} index={index} />
          ))}
        </div>

        {/* Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {projectsData.slice(0, projectCount).map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
