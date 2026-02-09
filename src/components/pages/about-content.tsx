"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionReveal } from "@/components/section-reveal";
import { siteConfig } from "@/content/site";
import type { Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/types";

const skills = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "TensorFlow", "PyTorch", "PostgreSQL", "MongoDB", "Docker",
  "AWS", "Unity", "Three.js", "WebXR", "GraphQL",
  "Redis", "Tailwind CSS", "Git",
];

interface AboutPageContentProps {
  locale: Locale;
  dict: Dictionary;
}

export function AboutPageContent({ locale, dict }: AboutPageContentProps) {
  return (
    <>
      <PageHeader
        title={dict.about.title}
        subtitle={dict.about.subtitle}
      />

      <section className="pb-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Portrait + download */}
            <SectionReveal className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="relative w-full aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-primary/20 mb-6">
                  <Image
                    src={siteConfig.portrait}
                    alt={siteConfig.name[locale]}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-1">
                    {siteConfig.name[locale]}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {siteConfig.title[locale]}
                  </p>
                  <a
                    href={siteConfig.resumeUrl}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-gold text-white font-medium hover:opacity-90 transition-opacity"
                    download
                  >
                    <Download className="h-4 w-4" />
                    {dict.about.downloadResume}
                  </a>
                </div>
              </div>
            </SectionReveal>

            {/* Bio + skills */}
            <div className="lg:col-span-3 space-y-12">
              {/* Bio */}
              <SectionReveal>
                <div className="space-y-4">
                  {dict.about.bio.map((paragraph, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="text-muted-foreground leading-relaxed text-lg"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </SectionReveal>

              {/* Skills */}
              <SectionReveal>
                <h2 className="text-2xl font-bold mb-6">
                  {dict.about.skills}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                      className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
