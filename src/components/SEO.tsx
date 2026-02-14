import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/i18n/LanguageContext';
import { siteConfig } from '@/content/site';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}

const SEO = ({ title, description, path = '', ogImage }: SEOProps) => {
  const { lang } = useLanguage();

  const fullTitle = title
    ? `${title} | ${siteConfig.name[lang]}`
    : siteConfig.seo.defaultTitle;

  const desc = description || siteConfig.seo.defaultDescription[lang];
  const url = `${siteConfig.seo.siteUrl}/${lang}${path ? `/${path}` : ''}`;
  const image = ogImage || siteConfig.seo.ogImage;
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.seo.siteUrl}${image}`;

  return (
    <Helmet>
      <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* OpenGraph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name.en} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Alternate language */}
      <link rel="alternate" hrefLang="en" href={`${siteConfig.seo.siteUrl}/en${path ? `/${path}` : ''}`} />
      <link rel="alternate" hrefLang="ar" href={`${siteConfig.seo.siteUrl}/ar${path ? `/${path}` : ''}`} />
    </Helmet>
  );
};

export default SEO;
