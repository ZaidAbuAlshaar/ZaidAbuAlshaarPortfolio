"use client";

import { motion } from "framer-motion";
import {
  Code,
  Brain,
  Glasses,
  Smartphone,
  Plug,
  Lightbulb,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
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

interface ServicesPageContentProps {
  locale: Locale;
  dict: Dictionary;
}

export function ServicesPageContent({ locale, dict }: ServicesPageContentProps) {
  void locale; // used for future locale-specific logic
  return (
    <>
      <PageHeader
        title={dict.services.title}
        subtitle={dict.services.subtitle}
        description={dict.services.description}
      />

      <section className="pb-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dict.services.items.map((service, index) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group p-8 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="p-4 rounded-xl bg-primary/10 text-primary w-fit mb-6">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
