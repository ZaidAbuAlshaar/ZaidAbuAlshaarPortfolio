"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { projects, categoryLabels } from "@/content/projects";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/types";

interface PortfolioPageContentProps {
  locale: Locale;
  dict: Dictionary;
}

const categories = ["all", "ai", "fullstack", "xr", "mobile", "data"] as const;

export function PortfolioPageContent({
  locale,
  dict,
}: PortfolioPageContentProps) {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <>
      <PageHeader
        title={dict.portfolio.allProjects}
        subtitle={dict.portfolio.subtitle}
        description={dict.portfolio.description}
      />

      <section className="pb-24 px-4">
        <div className="mx-auto max-w-7xl">
          {/* Filter bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => {
              const label =
                cat === "all"
                  ? dict.portfolio.filterAll
                  : categoryLabels[cat as Project["category"]][locale];
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Projects grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  locale={locale}
                  dict={dict}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
