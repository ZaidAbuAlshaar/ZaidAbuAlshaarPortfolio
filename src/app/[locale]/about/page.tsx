import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n";
import { siteConfig } from "@/content/site";
import { AboutPageContent } from "@/components/pages/about-content";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const name = siteConfig.name[locale];

  return {
    title: dict.seo.aboutTitle,
    description: dict.about.bio[0],
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: "/en/about", ar: "/ar/about" },
    },
    openGraph: {
      title: `${dict.seo.aboutTitle} | ${name}`,
      description: dict.about.bio[0],
      url: `${siteConfig.siteUrl}/${locale}/about`,
    },
    twitter: {
      title: `${dict.seo.aboutTitle} | ${name}`,
      description: dict.about.bio[0],
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return <AboutPageContent locale={locale} dict={dict} />;
}
