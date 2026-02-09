"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, BookOpen, Trophy, Medal, ExternalLink } from "lucide-react";
import type { Achievement } from "@/content/achievements";
import type { Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/types";

const iconMap = {
  certification: Award,
  course: BookOpen,
  competition: Trophy,
  award: Medal,
};

interface AchievementCardProps {
  achievement: Achievement;
  locale: Locale;
  dict: Dictionary;
  index: number;
}

export function AchievementCard({
  achievement,
  locale,
  dict,
  index,
}: AchievementCardProps) {
  const Icon = iconMap[achievement.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="shrink-0 p-3 rounded-lg bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold group-hover:text-primary transition-colors">
                {achievement.title[locale]}
              </h3>
              {achievement.image && (
                <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={achievement.image}
                    alt={achievement.title[locale]}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
            <p className="text-sm text-primary/80 font-medium mt-1">
              {achievement.issuer[locale]}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {achievement.date}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {achievement.description[locale]}
            </p>
            {achievement.credential && (
              <a
                href={achievement.credential}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {dict.achievements.viewCredential}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
