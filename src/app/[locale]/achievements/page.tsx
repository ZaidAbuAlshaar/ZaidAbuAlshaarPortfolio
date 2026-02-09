import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n";
import { siteConfig } from "@/content/site";
import { AchievementsPageContent } from "@/components/pages/achievements-content";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const name = siteConfig.name[locale];

  return {
    title: dict.seo.achievementsTitle,
    description: dict.achievements.description,
    alternates: {
      canonical: `/${locale}/achievements`,
      languages: { en: "/en/achievements", ar: "/ar/achievements" },
    },
    openGraph: {
      title: `${dict.seo.achievementsTitle} | ${name}`,
      description: dict.achievements.description,
      url: `${siteConfig.siteUrl}/${locale}/achievements`,
    },
    twitter: {
      title: `${dict.seo.achievementsTitle} | ${name}`,
      description: dict.achievements.description,
    },
  };
}

export default async function AchievementsPage({ params }: PageProps) {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return <AchievementsPageContent locale={locale} dict={dict} />;
}
