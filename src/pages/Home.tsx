import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Phone, Code, Brain, Palette, Glasses, ArrowRight, Trophy, GraduationCap, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/i18n/LanguageContext';
import { siteConfig } from '@/content/site';
import { services } from '@/content/services';
import { projects } from '@/content/projects';
import { faq } from '@/content/faq';
import { getProjectImage, handleImageError } from '@/lib/images';
import { fadeUp, staggerContainer, staggerItem, scaleIn } from '@/lib/animations';
import SEO from '@/components/SEO';

const socialIcons = { Github, Linkedin, Phone, Mail };
const serviceIcons = { Code, Brain, Palette, Glasses };

const Home = () => {
  const { lang } = useLanguage();

  const t = {
    en: {
      servicesTitle: 'What I Do',
      featuredTitle: 'Featured Projects',
      viewAll: 'View All Projects',
      processTitle: 'How I Work',
      awardsTitle: 'Awards & Certifications',
      awardsDesc: 'Recognized for excellence in development and innovation.',
      viewAwards: 'View All Awards',
      faqTitle: 'Frequently Asked Questions',
      finalCta: 'Ready to Build Something Great?',
      finalCtaDesc: "Let's turn your idea into a reality. Fast, polished, and AI-powered.",
      getStarted: 'Get Started',
    },
    ar: {
      servicesTitle: 'ما أقدمه',
      featuredTitle: 'مشاريع مميزة',
      viewAll: 'عرض جميع المشاريع',
      processTitle: 'كيف أعمل',
      awardsTitle: 'الجوائز والشهادات',
      awardsDesc: 'معترف به للتميز في التطوير والابتكار.',
      viewAwards: 'عرض جميع الجوائز',
      faqTitle: 'الأسئلة الشائعة',
      finalCta: 'مستعد لبناء شيء رائع؟',
      finalCtaDesc: 'لنحوّل فكرتك إلى واقع. سريع، أنيق، ومدعوم بالذكاء الاصطناعي.',
      getStarted: 'ابدأ الآن',
    },
  };

  return (
    <>
      <SEO />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-16 py-20 relative z-10">
          <motion.p {...fadeUp} className="text-primary font-medium mb-3 text-sm tracking-widest uppercase">
            {siteConfig.availability[lang]}
          </motion.p>
          <motion.h1 {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            {siteConfig.name[lang]}
          </motion.h1>
          <motion.p {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-muted-foreground mb-2">
            {siteConfig.title[lang]}
          </motion.p>
          <motion.p {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }} className="text-muted-foreground max-w-lg mb-8">
            {siteConfig.tagline[lang]}
          </motion.p>
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap gap-3 mb-4">
            <Button asChild size="lg">
              <Link to={`/${lang}/contact`}>{siteConfig.cta.primary[lang]}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to={`/${lang}/contact`}>{siteConfig.cta.secondary[lang]}</Link>
            </Button>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.45 }} className="mb-8">
            <Button asChild variant="ghost" size="sm">
              <a href={siteConfig.cvDownloadPath} download>
                <Download className="h-4 w-4" />
                <span className="ms-1">{siteConfig.cta.cv[lang]}</span>
              </a>
            </Button>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.5 }} className="flex gap-3">
            {siteConfig.socialLinks.map(({ icon, url, platform }) => {
              const Icon = socialIcons[icon as keyof typeof socialIcons];
              return (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </motion.div>
        </div>
        <div className="hidden lg:flex flex-1 items-center justify-center relative bg-primary/5"
          style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0 100%)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
          <motion.div {...scaleIn}>
            <img src={siteConfig.portrait} alt={siteConfig.name.en} onError={handleImageError}
              className="w-72 h-72 lg:w-80 lg:h-80 object-cover rounded-2xl border-2 border-primary/20 shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border/40 bg-card/50">
        <div className="container">
          <motion.div {...staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {siteConfig.stats.map((stat, i) => (
              <motion.div key={i} {...staggerItem} className="space-y-1">
                <div className="text-3xl font-heading font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat[lang]}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container">
          <motion.h2 {...fadeUp} className="text-3xl font-bold text-center mb-12">{t[lang].servicesTitle}</motion.h2>
          <motion.div {...staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon as keyof typeof serviceIcons];
              return (
                <motion.div key={service.id} {...staggerItem}>
                  <Link to={`/${lang}/services`}>
                    <Card className="hover-lift glass-border h-full">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className="mx-auto w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="h-7 w-7 text-primary" />
                        </div>
                        <h3 className="font-heading text-lg font-semibold">{service.title[lang]}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">{service.desc[lang]}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <motion.h2 {...fadeUp} className="text-3xl font-bold text-center mb-12">{t[lang].featuredTitle}</motion.h2>
          <motion.div {...staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => p.featured).slice(0, 6).map((project) => (
              <motion.div key={project.slug} {...staggerItem}>
                <Link to={`/${lang}/projects`}>
                  <Card className="hover-lift glass-border overflow-hidden group cursor-pointer">
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img src={getProjectImage(project.slug)} alt={project.title[lang]} onError={handleImageError}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-5 space-y-3">
                      <h3 className="font-heading font-semibold">{project.title[lang]}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.description[lang]}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{tag}</span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div {...fadeUp} className="text-center mt-10">
            <Button asChild variant="outline">
              <Link to={`/${lang}/projects`}>{t[lang].viewAll} <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container">
          <motion.h2 {...fadeUp} className="text-3xl font-bold text-center mb-12">{t[lang].processTitle}</motion.h2>
          <motion.div {...staggerContainer} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {siteConfig.process.map((step, i) => (
              <motion.div key={i} {...staggerItem} className="flex items-center gap-3 md:flex-col md:text-center flex-1">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <span className="font-medium text-sm">{step[lang]}</span>
                {i < siteConfig.process.length - 1 && (
                  <ArrowRight className="hidden md:block h-4 w-4 text-muted-foreground mx-auto" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards Preview */}
      <section className="py-16 bg-card/30">
        <div className="container">
          <motion.div {...fadeUp} className="text-center space-y-4">
            <h2 className="text-3xl font-bold">{t[lang].awardsTitle}</h2>
            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span>5+ {lang === 'en' ? 'Certificates' : 'شهادة'}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Trophy className="h-5 w-5 text-primary" />
                <span>3 {lang === 'en' ? 'Awards' : 'جوائز'}</span>
              </div>
            </div>
            <p className="text-muted-foreground">{t[lang].awardsDesc}</p>
            <Button asChild variant="outline">
              <Link to={`/${lang}/awards`}>
                {t[lang].viewAwards} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <motion.h2 {...fadeUp} className="text-3xl font-bold text-center mb-12">{t[lang].faqTitle}</motion.h2>
          <motion.div {...fadeUp}>
            <Accordion type="single" collapsible className="space-y-2">
              {faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4 glass-border">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">{item[lang].q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{item[lang].a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
        <div className="container relative text-center space-y-6">
          <motion.h2 {...fadeUp} className="text-3xl sm:text-4xl font-bold">{t[lang].finalCta}</motion.h2>
          <motion.p {...fadeUp} className="text-muted-foreground max-w-md mx-auto">{t[lang].finalCtaDesc}</motion.p>
          <motion.div {...fadeUp}>
            <Button asChild size="lg">
              <Link to={`/${lang}/contact`}>{t[lang].getStarted} <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
