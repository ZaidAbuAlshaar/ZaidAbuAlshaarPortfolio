import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Brain, Palette, Glasses, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/i18n/LanguageContext';
import { services } from '@/content/services';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import SEO from '@/components/SEO';

const serviceIcons = { Code, Brain, Palette, Glasses };

const Services = () => {
  const { lang } = useLanguage();

  const t = {
    en: {
      title: 'Services',
      subtitle: 'Here is what I can help you build.',
      cta: 'Have a project in mind?',
      ctaBtn: 'Get in Touch',
      seeWork: 'See related projects',
      pricing: 'Pricing is discussed after reviewing the project scope and requirements.',
    },
    ar: {
      title: 'الخدمات',
      subtitle: 'إليك ما يمكنني مساعدتك في بنائه.',
      cta: 'لديك مشروع في ذهنك؟',
      ctaBtn: 'تواصل معي',
      seeWork: 'عرض مشاريع ذات صلة',
      pricing: 'يتم مناقشة الأسعار بعد مراجعة نطاق المشروع ومتطلباته.',
    },
  };

  return (
    <div className="py-20">
      <SEO title={lang === 'en' ? 'Services' : 'الخدمات'} description={lang === 'en' ? 'Zaid Abu Alshaar offers Full-Stack Web Apps, AI Integration, UI/UX Design, and XR/3D experiences.' : 'يقدم زيد أبو الشعر تطبيقات ويب متكاملة وتكامل ذكاء اصطناعي وتصميم واجهات وتجارب واقع ممتد.'} path="services" />
      <div className="container max-w-5xl">
        <motion.div {...fadeUp} className="text-center mb-12 space-y-3">
          <h1 className="text-4xl font-bold">{t[lang].title}</h1>
          <p className="text-muted-foreground">{t[lang].subtitle}</p>
        </motion.div>

        <motion.div {...staggerContainer} className="grid md:grid-cols-2 gap-6 mb-12">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon as keyof typeof serviceIcons];
            const highlightParam = service.linkedProjectSlugs.join(',');
            return (
              <motion.div key={service.id} {...staggerItem}>
                <Card className="hover-lift glass-border h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold">{service.title[lang]}</h3>
                    <p className="text-sm text-muted-foreground">{service.desc[lang]}</p>
                    <Link
                      to={`/${lang}/projects?highlight=${highlightParam}`}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      {t[lang].seeWork} <ArrowRight className="h-3 w-3" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div {...fadeUp} className="text-center space-y-4">
          <p className="text-sm text-muted-foreground italic">{t[lang].pricing}</p>
          <h3 className="text-xl font-bold">{t[lang].cta}</h3>
          <Button asChild size="lg">
            <Link to={`/${lang}/contact`}>{t[lang].ctaBtn} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
