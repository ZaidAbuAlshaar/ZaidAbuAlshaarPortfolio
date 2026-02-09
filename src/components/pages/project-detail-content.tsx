"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  ImageOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { categoryColors } from "@/content/projects";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/types";

interface ProjectDetailContentProps {
  project: Project;
  locale: Locale;
  dict: Dictionary;
}

function GalleryImage({
  src,
  alt,
  noImageLabel,
}: {
  src: string;
  alt: string;
  noImageLabel: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="aspect-video rounded-xl bg-muted flex flex-col items-center justify-center gap-2 text-muted-foreground">
        <ImageOff className="h-8 w-8" />
        <span className="text-sm">{noImageLabel}</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export function ProjectDetailContent({
  project,
  locale,
  dict,
}: ProjectDetailContentProps) {
  const BackArrow = locale === "ar" ? ArrowRight : ArrowLeft;

  return (
    <div className="pt-24 pb-24 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: locale === "ar" ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={`/${locale}/portfolio`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <BackArrow className="h-4 w-4" />
            {dict.portfolio.backToPortfolio}
          </Link>
        </motion.div>

        {/* Category gradient bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn(
            "h-1.5 w-full rounded-full bg-gradient-to-r mb-8",
            categoryColors[project.category]
          )}
          style={{ transformOrigin: locale === "ar" ? "right" : "left" }}
        />

        {/* Title & tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {project.title[locale]}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {project.summary[locale]}
          </p>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <GalleryImage
            src={project.images.thumbnail}
            alt={project.title[locale]}
            noImageLabel={dict.portfolio.noImage}
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <p className="text-muted-foreground leading-relaxed text-lg">
            {project.description[locale]}
          </p>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold mb-4">
            {dict.portfolio.techStack}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Gallery */}
        {project.images.gallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-xl font-semibold mb-4">
              {dict.portfolio.gallery}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.gallery.map((img, i) => (
                <GalleryImage
                  key={i}
                  src={img}
                  alt={`${project.title[locale]} - ${i + 1}`}
                  noImageLabel={dict.portfolio.noImage}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Links */}
        {(project.links.github || project.links.live) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-4">
              {dict.portfolio.links}
            </h2>
            <div className="flex flex-wrap gap-4">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors font-medium"
                >
                  <Github className="h-5 w-5" />
                  {dict.portfolio.viewGithub}
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium"
                >
                  <ExternalLink className="h-5 w-5" />
                  {dict.portfolio.viewLive}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
