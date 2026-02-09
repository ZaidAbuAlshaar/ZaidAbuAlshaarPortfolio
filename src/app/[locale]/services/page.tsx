import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n";
import { siteConfig } from "@/content/site";
import { ServicesPageContent } from "@/components/pages/services-content";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const name = siteConfig.name[locale];

  return {
    title: dict.seo.servicesTitle,
    description: dict.services.description,
    alternates: {
      canonical: `/${locale}/services`,
      languages: { en: "/en/services", ar: "/ar/services" },
    },
    openGraph: {
      title: `${dict.seo.servicesTitle} | ${name}`,
      description: dict.services.description,
      url: `${siteConfig.siteUrl}/${locale}/services`,
    },
    twitter: {
      title: `${dict.seo.servicesTitle} | ${name}`,
      description: dict.services.description,
    },
  };
}

export default async function ServicesPage({ params }: PageProps) {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return <ServicesPageContent locale={locale} dict={dict} />;
}
