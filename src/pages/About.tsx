import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, MapPin, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/i18n/LanguageContext';
import { siteConfig } from '@/content/site';
import { handleImageError } from '@/lib/images';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import SEO from '@/components/SEO';

const About = () => {
  const { lang } = useLanguage();

  const t = {
    en: {
      title: 'About Me',
      skillsTitle: 'Skills & Tools',
      expTitle: 'Experience',
      eduTitle: 'Education',
      invTitle: 'Involvement',
      cta: "Let's Work Together",
    },
    ar: {
      title: 'عني',
      skillsTitle: 'المهارات والأدوات',
      expTitle: 'الخبرة',
      eduTitle: 'التعليم',
      invTitle: 'الأنشطة',
      cta: 'لنعمل معًا',
    },
  };

  const c = t[lang];

  return (
    <div className="py-12 sm:py-20">
      <SEO title={lang === 'en' ? 'About' : 'عني'} description={lang === 'en' ? 'Learn about Zaid Abu Alshaar — CS honors student, full-stack developer, AI & AR/VR specialist based in Amman, Jordan.' : 'تعرّف على زيد أبو الشعر — طالب علوم حاسوب متفوق ومطوّر متكامل ومتخصص في الذكاء الاصطناعي والواقع المعزز من عمّان.'} path="about" />
      <div className="container max-w-4xl space-y-10 sm:space-y-16">
        {/* Bio */}
        <motion.div {...fadeUp} className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold">{c.title}</h1>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col items-center gap-3">
              <img src={siteConfig.portrait} alt={siteConfig.name[lang]} onError={handleImageError}
                className="w-48 h-48 rounded-2xl object-cover border-2 border-primary/20" />
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {siteConfig.location[lang]}
              </div>
              <Button asChild variant="outline" size="sm">
                <a href={siteConfig.cvDownloadPath} download>
                  <Download className="h-4 w-4" />
                  <span className="ms-1">{siteConfig.cta.cv[lang]}</span>
                </a>
              </Button>
            </div>
            <div className="md:w-2/3 space-y-4">
              {siteConfig.bio[lang].map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div {...fadeUp} className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">{c.eduTitle}</h2>
          <Card className="glass-border">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold">{siteConfig.education[lang].degree}</h3>
                <p className="text-sm text-muted-foreground">{siteConfig.education[lang].university}</p>
                <p className="text-sm text-primary">{siteConfig.education[lang].period}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills */}
        <motion.div {...fadeUp} className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold">{c.skillsTitle}</h2>
          <motion.div {...staggerContainer} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {siteConfig.skills.map((skill) => (
              <motion.div key={skill} {...staggerItem}
                className="px-4 py-3 rounded-lg glass-border text-sm text-center font-medium hover-lift">
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Experience */}
        <motion.div {...fadeUp} className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold">{c.expTitle}</h2>
          <div className="space-y-4">
            {siteConfig.experiences[lang].map((exp, i) => (
              <motion.div key={i} {...staggerItem}>
                <Card className="glass-border hover-lift">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="font-heading font-semibold">{exp.role}</h3>
                      <span className="text-sm text-primary">{exp.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1 font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Involvement */}
        <motion.div {...fadeUp} className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">{c.invTitle}</h2>
          <ul className="space-y-2">
            {siteConfig.involvement[lang].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeUp} className="text-center">
          <Button asChild size="lg">
            <Link to={`/${lang}/contact`}>{c.cta} <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
