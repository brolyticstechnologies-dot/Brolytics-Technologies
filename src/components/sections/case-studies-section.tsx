"use client";

import { useState } from "react";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects as defaultProjects } from "@/data/projects";
import { CaseStudyCard } from "@/components/ui/case-study-card";
import { CaseStudyModal } from "@/components/ui/case-study-modal";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useSiteContent } from "@/hooks/use-site-content";
import { Button } from "@/components/ui/button";
import type { ProjectItem } from "@/lib/content-types";

export function CaseStudiesSection({ projects: customProjects }: { projects?: ProjectItem[] }) {
  const siteContent = useSiteContent();
  const allProjects: ProjectItem[] = customProjects || siteContent?.ourWork.projects || defaultProjects;
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Pick top 3 flagship / featured projects
  const featuredProjects = allProjects.slice(0, 3);

  const scrollToGallery = () => {
    document.getElementById("portfolio-gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="case-studies"
      ref={ref}
      className="relative py-16 sm:py-24 bg-silver-50 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-silver-50 via-white to-silver-50" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-silver-300/20 rounded-full blur-[140px] animate-aurora-drift" />
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(hsl(214_32%_91%/.3)_1px,transparent_1px),linear-gradient(90deg,hsl(214_32%_91%/.3)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full border border-silver-200 bg-white/80 backdrop-blur-sm shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-silver-600">
              Featured Case Studies
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[2.8rem] font-black tracking-tight leading-tight mb-4">
            <span className="text-silver">Flagship Work —</span>{" "}
            <span className="text-gradient-red">In Detail.</span>
          </h2>
          <p className="text-base text-silver-500 max-w-xl mx-auto leading-relaxed">
            A closer look at 3 of our standout projects — the exact challenges faced, architecture delivered, and verified outcomes.
          </p>
        </div>

        {/* Timeline connector line (desktop only) */}
        <div
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-silver-300 to-transparent"
          style={{ top: "220px", height: "calc(100% - 320px)" }}
        />

        {/* Featured Case study cards */}
        <div className="space-y-10 lg:space-y-16">
          {featuredProjects.map((project, index) => {
            const projectId = project.id || index;
            return (
              <div key={projectId} className="relative">
                {/* Timeline dot */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-silver-300 shadow-sm top-1/2">
                  <span className="text-[9px] font-black text-primary tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <CaseStudyCard project={project} index={index} isVisible={isVisible} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to explore all projects in gallery */}
        <div className="mt-14 sm:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 p-6 rounded-3xl bg-white border border-silver-200 shadow-md">
            <div className="text-center sm:text-left">
              <p className="text-sm font-black text-silver-900">Want to explore all {allProjects.length} projects?</p>
              <p className="text-xs text-silver-500">Filter by category and view full case study breakdowns.</p>
            </div>
            <Button
              onClick={scrollToGallery}
              className="bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-bold px-5 py-2.5 shadow-md shadow-primary/20 flex items-center gap-1.5"
            >
              <span>Browse Portfolio Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <CaseStudyModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

