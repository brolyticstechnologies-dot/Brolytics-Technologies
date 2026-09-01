"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, LayoutGrid, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects as defaultProjects, PROJECT_CATEGORIES, type ProjectCategory } from "@/data/projects";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useSiteContent } from "@/hooks/use-site-content";
import { CaseStudyModal } from "@/components/ui/case-study-modal";
import type { ProjectItem } from "@/lib/content-types";

type FilterTab = "All" | string;

const CATEGORY_COLORS: Record<string, string> = {
  "Website Development": "bg-blue-50 text-blue-700 border-blue-200",
  "Mobile App": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Custom Software": "bg-violet-50 text-violet-700 border-violet-200",
  "AI Solutions": "bg-amber-50 text-amber-700 border-amber-200",
  "Graphic Design": "bg-pink-50 text-pink-700 border-pink-200",
  "SEO & Marketing": "bg-cyan-50 text-cyan-700 border-cyan-200",
};

function ThumbnailCard({
  project,
  index,
  isFlagship,
  onSelect,
}: {
  project: ProjectItem;
  index: number;
  isFlagship?: boolean;
  onSelect: (project: ProjectItem) => void;
}) {
  const impactMetric = project.impact?.metric || project.results || "100%";
  const impactLabel = project.impact?.label || "Key Impact";
  const shortDesc = project.shortDescription || project.description || "";
  const yearText = project.year || "2024";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      className="group cursor-pointer rounded-2xl overflow-hidden border border-silver-200 bg-white hover:border-primary/40 hover:shadow-[0_20px_40px_-15px_rgba(143,38,71,0.2)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full animate-fade-up text-left"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      aria-label={`View case study: ${project.title}`}
    >
      {/* Image with hover reveal overlay */}
      <div className="relative overflow-hidden aspect-[16/10] bg-silver-100">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-silver-950/60 via-transparent to-transparent" />

        {/* Category badge (left) */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={cn(
              "inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md shadow-sm",
              CATEGORY_COLORS[project.category] || "bg-white/90 text-silver-800 border-white/60"
            )}
          >
            {project.category}
          </span>
        </div>

        {/* Flagship ribbon (top-right corner) */}
        {isFlagship && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-bold shadow-lg border border-primary/30 backdrop-blur-md">
              <Sparkles className="w-2.5 h-2.5" />
              Flagship
            </span>
          </div>
        )}

        {/* Hover reveal overlay — slides up from bottom */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out bg-primary/95 backdrop-blur-md p-4 z-20">
          <p className="text-white text-xs font-bold mb-1 line-clamp-1">
            {impactMetric} {impactLabel}
          </p>
          <span className="inline-flex items-center gap-1 text-white/90 text-xs font-semibold">
            <span>View Full Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-bold text-primary flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {project.duration || "Delivered"}
          </span>
          <span className="text-[10px] font-semibold text-silver-400">{yearText}</span>
        </div>

        <h3 className="text-base font-black text-silver-900 leading-snug mb-2 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-xs text-silver-500 leading-relaxed line-clamp-2 mb-4">
          {shortDesc}
        </p>

        {/* Tech pills preview */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-auto pt-3 border-t border-silver-100 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md bg-silver-50 border border-silver-200 text-[10px] font-semibold text-silver-600"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-1.5 py-0.5 rounded-md bg-silver-50 text-[10px] font-bold text-silver-400">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function PortfolioGallery({ projects: customProjects }: { projects?: ProjectItem[] }) {
  const siteContent = useSiteContent();
  const allProjects: ProjectItem[] = customProjects || siteContent?.ourWork.projects || defaultProjects;

  const [active, setActive] = useState<FilterTab>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  // Get dynamic category list based on current projects + default categories
  const dynamicCategories = Array.from(
    new Set([...PROJECT_CATEGORIES, ...allProjects.map((p) => p.category).filter(Boolean)])
  );
  const TABS: FilterTab[] = ["All", ...dynamicCategories];

  const filtered =
    active === "All" ? allProjects : allProjects.filter((p) => p.category.trim().toLowerCase() === active.trim().toLowerCase());

  // Sliding indicator position
  useEffect(() => {
    const el = tabRefs.current[active];
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicatorStyle({
      left: elRect.left - parentRect.left,
      width: elRect.width,
    });
  }, [active, allProjects]);

  return (
    <section
      id="portfolio-gallery"
      ref={ref}
      className="relative py-16 sm:py-24 bg-white overflow-hidden"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(hsl(214_32%_91%/.4)_1px,transparent_1px),linear-gradient(90deg,hsl(214_32%_91%/.4)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black,transparent)]" />

      <div className="relative container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section header */}
        <div
          className={cn(
            "text-center mb-12 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full border border-silver-200 bg-silver-50 shadow-sm">
            <LayoutGrid className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-silver-600">
              Portfolio Gallery
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[2.8rem] font-black tracking-tight leading-tight mb-4">
            <span className="text-silver">{allProjects.length} Projects.</span>{" "}
            <span className="text-gradient-red">Real Results.</span>
          </h2>
          <p className="text-base text-silver-500 max-w-xl mx-auto leading-relaxed">
            Click any project to view its full case study — including challenges, technical architecture, and verified business results.
          </p>
        </div>

        {/* Filter Tabs with sliding indicator */}
        <div
          className={cn(
            "mb-10 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <div className="relative flex items-center justify-center flex-wrap gap-y-2 gap-x-0">
            <div className="relative flex items-center flex-wrap justify-center gap-1 bg-silver-50 rounded-full border border-silver-200 p-1.5 shadow-sm">
              {/* Sliding indicator */}
              <div
                className="absolute h-8 rounded-full bg-primary transition-all duration-300 ease-out pointer-events-none"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
              />
              {TABS.map((tab) => {
                const count =
                  tab === "All"
                    ? allProjects.length
                    : allProjects.filter((p) => p.category.trim().toLowerCase() === tab.trim().toLowerCase()).length;
                const isActive = active === tab;
                return (
                  <button
                    key={tab}
                    ref={(el) => { tabRefs.current[tab] = el; }}
                    onClick={() => setActive(tab)}
                    className={cn(
                      "relative z-10 px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-colors duration-200 whitespace-nowrap",
                      isActive ? "text-white" : "text-silver-500 hover:text-silver-800"
                    )}
                  >
                    {tab}
                    <span
                      className={cn(
                        "ml-1.5 text-[9px] font-bold tabular-nums",
                        isActive ? "text-white/80" : "text-silver-400"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Result count */}
        <p className="text-center text-xs text-silver-400 mb-8">
          Showing{" "}
          <span className="font-bold text-silver-700">{filtered.length}</span>{" "}
          project{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Responsive Grid */}
        <div key={active} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => {
            // Track the original position in allProjects to determine flagship status
            const globalIndex = allProjects.indexOf(project);
            return (
              <ThumbnailCard
                key={project.id || i}
                project={project}
                index={i}
                isFlagship={globalIndex < 3}
                onSelect={(p) => setSelectedProject(p)}
              />
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

