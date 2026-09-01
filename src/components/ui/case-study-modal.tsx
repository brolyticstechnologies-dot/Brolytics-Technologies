"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  TrendingUp,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Quote,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/lib/content-types";

interface CaseStudyModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CaseStudyModal({ project, isOpen, onClose }: CaseStudyModalProps) {
  if (!project) return null;

  const impactMetric = project.impact?.metric || project.results || "100%";
  const impactLabel = project.impact?.label || "Key Impact Delivered";
  const impactSubtext = project.impact?.subtext || "";
  const yearText = project.year || "2024";
  const techList = project.technologies || [];
  const descriptionText =
    project.detailedDescription || project.description || project.shortDescription || "";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[94vw] max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-2xl sm:rounded-3xl border border-silver-200 bg-white shadow-2xl focus:outline-none">
        {/* Modal Header Image Banner */}
        <div className="relative w-full h-56 sm:h-72 md:h-80 overflow-hidden bg-silver-900">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-silver-950/90 via-silver-950/40 to-transparent" />

          {/* Badges on top of image */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider shadow-lg">
              {project.category}
            </span>
            {project.duration && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-silver-800 shadow-sm border border-white/60">
                <Clock className="w-3.5 h-3.5 text-primary" />
                {project.duration}
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-medium text-white/90">
              <Calendar className="w-3.5 h-3.5 text-white/70" />
              {yearText}
            </span>
          </div>

          {/* Title & subtitle overlaid on banner bottom */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10">
            <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight drop-shadow-md">
              {project.title}
            </DialogTitle>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-7 md:p-9 space-y-7">
          {/* Overview Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-silver-400 mb-2">
              Project Overview
            </h4>
            <DialogDescription className="text-sm sm:text-base text-silver-600 leading-relaxed">
              {descriptionText}
            </DialogDescription>
          </div>

          {/* Impact Highlight Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-primary/[0.07] via-primary/[0.03] to-transparent border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-primary text-white shadow-md shadow-primary/25">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-primary leading-none mb-1">
                  {impactMetric}
                </p>
                <p className="text-xs sm:text-sm font-bold text-silver-800">{impactLabel}</p>
                {impactSubtext && (
                  <p className="text-xs text-silver-500 mt-0.5">{impactSubtext}</p>
                )}
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-primary/20 text-primary text-xs font-bold shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Metric
            </div>
          </div>

          {/* Challenge & Solution Grid */}
          {(project.challenge || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.challenge && (
                <div className="p-5 rounded-2xl bg-silver-50 border border-silver-200/80">
                  <div className="flex items-center gap-2 mb-2.5 text-silver-800 font-bold text-sm">
                    <AlertCircle className="w-4 h-4 text-silver-500" />
                    <span>The Challenge</span>
                  </div>
                  <p className="text-xs sm:text-sm text-silver-600 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-5 rounded-2xl bg-primary/[0.04] border border-primary/15">
                  <div className="flex items-center gap-2 mb-2.5 text-primary font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Our Solution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-silver-600 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tech Stack */}
          {techList.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-silver-400 mb-3">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {techList.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl bg-silver-50 border border-silver-200 text-xs font-semibold text-silver-700 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Client Testimonial if present */}
          {project.testimonial && (
            <div className="p-5 rounded-2xl bg-silver-50 border border-silver-200 relative overflow-hidden">
              <Quote className="absolute right-4 top-4 w-12 h-12 text-silver-200/60 pointer-events-none" />
              <p className="relative z-10 text-xs sm:text-sm italic text-silver-700 leading-relaxed mb-3">
                &ldquo;{project.testimonial.quote}&rdquo;
              </p>
              <div className="relative z-10 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">
                  {project.testimonial.name.charAt(0)}
                </span>
                <div>
                  <p className="text-xs font-bold text-silver-900">
                    {project.testimonial.name}
                  </p>
                  <p className="text-[11px] text-silver-500">
                    {project.testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-silver-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-silver-400 text-center sm:text-left">
              Want a customized solution tailored for your team?
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="flex-1 sm:flex-none border-silver-200 rounded-xl text-xs"
              >
                Close
              </Button>
              <Button
                size="sm"
                asChild
                className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-bold shadow-md shadow-primary/20"
              >
                <Link href="/#contact" onClick={onClose} className="flex items-center gap-1.5">
                  <span>Start Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
