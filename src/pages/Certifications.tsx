import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/i18n/LanguageContext';
import { siteConfig } from '@/content/site';
import { getAchievementsByCategory } from '@/content/achievements';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import SEO from '@/components/SEO';

const Certifications = () => {
  const { lang } = useLanguage();
  const certs = getAchievementsByCategory('certification');
  const experiences = getAchievementsByCategory('experience');

  const t = {
    en: {
      title: 'Certifications & Experience',
      subtitle: 'My professional certifications and experience highlights.',
      certsHeading: 'Certifications',
      expHeading: 'Experience',
      comingSoon: 'Coming Soon',
      comingSoonTitle: 'New Certifications In Progress',
      comingSoonDesc: 'Working towards advanced certifications in cloud computing and AI specializations.',
      workExpTitle: 'Work Experience',
    },
    ar: {
      title: 'الشهادات والخبرة',
      subtitle: 'شهاداتي المهنية وأبرز خبراتي.',
      certsHeading: 'الشهادات',
      expHeading: 'الخبرة',
      comingSoon: 'قريبًا',
      comingSoonTitle: 'شهادات جديدة قيد الإنجاز',
      comingSoonDesc: 'أعمل على الحصول على شهادات متقدمة في الحوسبة السحابية وتخصصات الذكاء الاصطناعي.',
      workExpTitle: 'الخبرة العملية',
    },
  };

  const c = t[lang];

  return (
    <div className="py-20">
      <SEO
        title={lang === 'en' ? 'Certifications & Experience' : 'الشهادات والخبرة'}
        description={
          lang === 'en'
            ? "Zaid Abu Alshaar's certifications, experience, and professional development."
            : 'شهادات وخبرات زيد أبو الشعر والتطوير المهني.'
        }
        path="certifications"
      />
      <div className="container max-w-5xl">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-3">
          <h1 className="text-4xl font-bold">{c.title}</h1>
          <p className="text-muted-foreground">{c.subtitle}</p>
        </motion.div>

        {/* Work Experience Timeline */}
        <motion.div {...fadeUp} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">{c.workExpTitle}</h2>
          </div>
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

        {/* Experience Highlights from Achievements */}
        {experiences.length > 0 && (
          <motion.div {...fadeUp} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">{c.expHeading}</h2>
            </div>
            <motion.div {...staggerContainer} className="grid sm:grid-cols-2 gap-4">
              {experiences.map((item) => (
                <motion.div key={item.id} {...staggerItem}>
                  <Card className="glass-border hover-lift h-full">
                    <CardContent className="p-5 space-y-2">
                      <h4 className="font-heading text-sm font-semibold">{item.title[lang]}</h4>
                      <p className="text-xs text-muted-foreground">
                        {item.issuer[lang]} &middot; {item.year}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.description[lang]}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Certifications */}
        <motion.div {...fadeUp} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">{c.certsHeading}</h2>
          </div>
          <motion.div {...staggerContainer} className="grid sm:grid-cols-2 gap-4">
            {certs.map((item) => (
              <motion.div key={item.id} {...staggerItem}>
                <Card className="glass-border hover-lift h-full">
                  <CardContent className="p-5 space-y-2">
                    <h4 className="font-heading text-sm font-semibold">{item.title[lang]}</h4>
                    <p className="text-xs text-muted-foreground">
                      {item.issuer[lang]} &middot; {item.year}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.description[lang]}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Coming Soon Card */}
            <motion.div {...staggerItem}>
              <Card className="glass-border h-full border-dashed border-2 border-primary/20">
                <CardContent className="p-5 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-heading text-sm font-semibold">{c.comingSoonTitle}</h4>
                  <p className="text-xs text-muted-foreground">{c.comingSoonDesc}</p>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {c.comingSoon}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certifications;
