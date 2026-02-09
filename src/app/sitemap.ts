import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { projects } from "@/content/projects";
import { locales } from "@/i18n";

const pages = ["", "/services", "/portfolio", "/about", "/achievements", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${siteConfig.siteUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: page === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${siteConfig.siteUrl}/${l}${page}`])
          ),
        },
      });
    }

    for (const project of projects) {
      entries.push({
        url: `${siteConfig.siteUrl}/${locale}/portfolio/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              `${siteConfig.siteUrl}/${l}/portfolio/${project.slug}`,
            ])
          ),
        },
      });
    }
  }

  return entries;
}
