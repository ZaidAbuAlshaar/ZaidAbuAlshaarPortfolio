import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesPreview } from "@/components/sections/services-preview";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { CtaSection } from "@/components/sections/cta-section";

interface PageProps {
  params: { locale: string };
}

export default async function HomePage({ params }: PageProps) {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <HeroSection locale={locale} dict={dict} />
      <ServicesPreview locale={locale} dict={dict} />
      <FeaturedProjects locale={locale} dict={dict} />
      <CtaSection locale={locale} dict={dict} />
    </>
  );
}
