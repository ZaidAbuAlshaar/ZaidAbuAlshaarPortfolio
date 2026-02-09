"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/types";

interface CtaSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function CtaSection({ locale, dict }: CtaSectionProps) {
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {dict.contact.subtitle}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            {dict.contact.description}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-gold text-white font-medium hover:opacity-90 transition-opacity text-lg"
          >
            {dict.hero.ctaSecondary}
            <Arrow className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
