"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/content/projects";
import type { Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/types";

interface FeaturedProjectsProps {
  locale: Locale;
  dict: Dictionary;
}

export function FeaturedProjects({ locale, dict }: FeaturedProjectsProps) {
  const featured = projects.filter((p) => p.featured);
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-primary font-medium mb-2">
              {dict.portfolio.subtitle}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {dict.portfolio.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {dict.portfolio.description}
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              dict={dict}
              index={index}
            />
          ))}
        </div>

        <SectionReveal className="text-center mt-12">
          <Link
            href={`/${locale}/portfolio`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition-colors"
          >
            {dict.portfolio.viewAll}
            <Arrow className="h-4 w-4" />
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
