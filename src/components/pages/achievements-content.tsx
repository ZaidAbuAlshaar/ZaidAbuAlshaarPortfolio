"use client";

import { PageHeader } from "@/components/page-header";
import { AchievementCard } from "@/components/achievement-card";
import { SectionReveal } from "@/components/section-reveal";
import { achievements, achievementTypeLabels } from "@/content/achievements";
import type { Achievement } from "@/content/achievements";
import type { Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/types";

interface AchievementsPageContentProps {
  locale: Locale;
  dict: Dictionary;
}

const types: Achievement["type"][] = [
  "certification",
  "course",
  "competition",
  "award",
];

export function AchievementsPageContent({
  locale,
  dict,
}: AchievementsPageContentProps) {
  return (
    <>
      <PageHeader
        title={dict.achievements.title}
        subtitle={dict.achievements.subtitle}
        description={dict.achievements.description}
      />

      <section className="pb-24 px-4">
        <div className="mx-auto max-w-4xl space-y-16">
          {types.map((type) => {
            const items = achievements.filter((a) => a.type === type);
            if (items.length === 0) return null;

            return (
              <SectionReveal key={type}>
                <h2 className="text-2xl font-bold mb-6">
                  {achievementTypeLabels[type][locale]}
                </h2>
                <div className="space-y-4">
                  {items.map((achievement, index) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                      locale={locale}
                      dict={dict}
                      index={index}
                    />
                  ))}
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
