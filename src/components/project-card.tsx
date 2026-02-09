"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/content/projects";
import { categoryColors } from "@/content/projects";
import type { Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/types";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  dict: Dictionary;
  index: number;
}

export function ProjectCard({ project, locale, dict, index }: ProjectCardProps) {
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, rotateX: 2, rotateY: locale === "ar" ? -2 : 2 }}
      className="group"
      style={{ perspective: 1000 }}
    >
      <Link href={`/${locale}/portfolio/${project.slug}`}>
        <div className="relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
          {/* Category gradient bar */}
          <div
            className={cn(
              "h-1 w-full bg-gradient-to-r",
              categoryColors[project.category]
            )}
          />

          {/* Thumbnail */}
          <div className="relative aspect-video bg-muted overflow-hidden">
            <Image
              src={project.images.thumbnail}
              alt={project.title[locale]}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {project.title[locale]}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {project.summary[locale]}
            </p>
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <span>{dict.portfolio.viewProject}</span>
              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
