import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n";
import { siteConfig } from "@/content/site";
import { PortfolioPageContent } from "@/components/pages/portfolio-content";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const name = siteConfig.name[locale];

  return {
    title: dict.seo.portfolioTitle,
    description: dict.portfolio.description,
    alternates: {
      canonical: `/${locale}/portfolio`,
      languages: { en: "/en/portfolio", ar: "/ar/portfolio" },
    },
    openGraph: {
      title: `${dict.seo.portfolioTitle} | ${name}`,
      description: dict.portfolio.description,
      url: `${siteConfig.siteUrl}/${locale}/portfolio`,
    },
    twitter: {
      title: `${dict.seo.portfolioTitle} | ${name}`,
      description: dict.portfolio.description,
    },
  };
}

export default async function PortfolioPage({ params }: PageProps) {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return <PortfolioPageContent locale={locale} dict={dict} />;
}
