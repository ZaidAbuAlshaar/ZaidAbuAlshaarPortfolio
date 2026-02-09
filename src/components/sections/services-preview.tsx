"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code,
  Brain,
  Glasses,
  Smartphone,
  Plug,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import type { Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  brain: Brain,
  glasses: Glasses,
  smartphone: Smartphone,
  plug: Plug,
  lightbulb: Lightbulb,
};

interface ServicesPreviewProps {
  locale: Locale;
  dict: Dictionary;
}

export function ServicesPreview({ locale, dict }: ServicesPreviewProps) {
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-primary font-medium mb-2">
              {dict.services.subtitle}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {dict.services.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {dict.services.description}
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.services.items.slice(0, 3).map((service, index) => {
            const Icon = iconMap[service.icon] || Code;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <SectionReveal className="text-center mt-12">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            {dict.common.learnMore}
            <Arrow className="h-4 w-4" />
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
