import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n";
import { siteConfig } from "@/content/site";
import { projects } from "@/content/projects";
import { ProjectDetailContent } from "@/components/pages/project-detail-content";

interface PageProps {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  return projects.flatMap((project) => [
    { locale: "en", slug: project.slug },
    { locale: "ar", slug: project.slug },
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) return {};

  const name = siteConfig.name[locale];
  const title = project.title[locale];
  const description = project.summary[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/portfolio/${params.slug}`,
      languages: {
        en: `/en/portfolio/${params.slug}`,
        ar: `/ar/portfolio/${params.slug}`,
      },
    },
    openGraph: {
      title: `${title} | ${name}`,
      description,
      url: `${siteConfig.siteUrl}/${locale}/portfolio/${params.slug}`,
      images: [{ url: project.images.thumbnail, alt: title }],
    },
    twitter: {
      title: `${title} | ${name}`,
      description,
      images: [project.images.thumbnail],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const locale = params.locale as Locale;
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return <ProjectDetailContent project={project} locale={locale} dict={dict} />;
}
