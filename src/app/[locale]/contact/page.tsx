import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n";
import { siteConfig } from "@/content/site";
import { ContactPageContent } from "@/components/pages/contact-content";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const name = siteConfig.name[locale];

  return {
    title: dict.seo.contactTitle,
    description: dict.contact.description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { en: "/en/contact", ar: "/ar/contact" },
    },
    openGraph: {
      title: `${dict.seo.contactTitle} | ${name}`,
      description: dict.contact.description,
      url: `${siteConfig.siteUrl}/${locale}/contact`,
    },
    twitter: {
      title: `${dict.seo.contactTitle} | ${name}`,
      description: dict.contact.description,
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return <ContactPageContent locale={locale} dict={dict} />;
}
