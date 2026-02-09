import { siteConfig } from "@/content/site";
import type { Locale } from "@/i18n";

export function JsonLd({ locale }: { locale: Locale }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name[locale],
    jobTitle: siteConfig.title[locale],
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location[locale],
    },
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
    ],
    image: `${siteConfig.siteUrl}${siteConfig.portrait}`,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name[locale],
    url: siteConfig.siteUrl,
    description: siteConfig.description[locale],
    inLanguage: locale === "ar" ? "ar" : "en",
    author: {
      "@type": "Person",
      name: siteConfig.name[locale],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
