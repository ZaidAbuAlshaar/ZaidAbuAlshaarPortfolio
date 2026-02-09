import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AiAssistantButton } from "@/components/ai-assistant-button";
import { locales, isValidLocale, getDirection, getDictionary } from "@/i18n";
import type { Locale } from "@/i18n";
import { siteConfig } from "@/content/site";
import { JsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  const name = siteConfig.name[locale];

  return {
    title: {
      default: `${name} | ${dict.seo.homeTitle}`,
      template: `%s | ${name}`,
    },
    description: siteConfig.description[locale],
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      title: `${name} | ${dict.seo.homeTitle}`,
      description: siteConfig.description[locale],
      url: `${siteConfig.siteUrl}/${locale}`,
      siteName: name,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | ${dict.seo.homeTitle}`,
      description: siteConfig.description[locale],
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const dir = getDirection(locale);
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${
          locale === "ar" ? "font-arabic" : "font-sans"
        } min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd locale={locale} />
          <Navbar locale={locale} dict={dict} />
          <main className="min-h-screen">{children}</main>
          <Footer locale={locale} dict={dict} />
          <AiAssistantButton dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  );
}
