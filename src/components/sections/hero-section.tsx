"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Github, Linkedin, Twitter } from "lucide-react";
import { FloatingCard } from "@/components/floating-card";
import { siteConfig } from "@/content/site";
import type { Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/types";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Diagonal background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute inset-0 diagonal-clip bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-60" />

      {/* Animated particles / decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 start-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 end-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: locale === "ar" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-medium mb-4 text-lg"
            >
              {dict.hero.greeting}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              <span className="gradient-text">{siteConfig.name[locale]}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-2"
            >
              {dict.hero.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground mb-8 max-w-lg"
            >
              {dict.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Link
                href={`/${locale}/portfolio`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-gold text-white font-medium hover:opacity-90 transition-opacity"
              >
                {dict.hero.cta}
                <Arrow className="h-4 w-4" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-secondary transition-colors font-medium"
              >
                {dict.hero.ctaSecondary}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-3"
            >
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-secondary hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-secondary hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-secondary hover:bg-primary/20 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Visual / Portrait + floating cards */}
          <motion.div
            initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Portrait */}
            <div className="relative mx-auto w-80 h-80 rounded-2xl overflow-hidden border-2 border-primary/20">
              <Image
                src={siteConfig.portrait}
                alt={siteConfig.name[locale]}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            {/* Floating cards */}
            <FloatingCard
              className="absolute -top-4 -end-4"
              delay={0.5}
            >
              <div className="glass rounded-xl p-3 text-sm font-medium shadow-lg">
                <span className="text-primary">7+</span>{" "}
                {locale === "ar" ? "مشاريع" : "Projects"}
              </div>
            </FloatingCard>

            <FloatingCard
              className="absolute top-1/2 -start-8"
              delay={0.8}
            >
              <div className="glass rounded-xl p-3 text-sm font-medium shadow-lg">
                <span className="text-gold">AI</span> &{" "}
                <span className="text-primary">Full-Stack</span>
              </div>
            </FloatingCard>

            <FloatingCard
              className="absolute -bottom-4 end-8"
              delay={1.1}
            >
              <div className="glass rounded-xl p-3 text-sm font-medium shadow-lg">
                <span className="text-emerald-500">XR</span>{" "}
                {locale === "ar" ? "خبرة" : "Experience"}
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
