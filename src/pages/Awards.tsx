import { motion } from 'framer-motion';
import { Trophy, Clock, Image } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/i18n/LanguageContext';
import { getAchievementsByCategory } from '@/content/achievements';
import MediaGallery from '@/components/MediaGallery';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import SEO from '@/components/SEO';

const comingSoonItems = [
  {
    title: { en: 'More Awards Coming Soon', ar: 'المزيد من الجوائز قريبًا' },
    description: {
      en: 'Currently participating in new competitions and hackathons. Stay tuned for updates!',
      ar: 'أشارك حاليًا في مسابقات وهاكاثونات جديدة. ترقبوا التحديثات!',
    },
  },
];

const Awards = () => {
  const { lang } = useLanguage();
  const [galleryItem, setGalleryItem] = useState<string | null>(null);
  const awards = getAchievementsByCategory('award');

  const t = {
    en: {
      title: 'Awards & Competitions',
      subtitle: 'Milestones and recognitions that define my journey.',
      comingSoon: 'Coming Soon',
      viewGallery: 'View Gallery',
      hideGallery: 'Hide Gallery',
    },
    ar: {
      title: 'الجوائز والمسابقات',
      subtitle: 'معالم وتكريمات ترسم مسيرتي المهنية.',
      comingSoon: 'قريبًا',
      viewGallery: 'عرض المعرض',
      hideGallery: 'إخفاء المعرض',
    },
  };

  const c = t[lang];

  return (
    <div className="py-20">
      <SEO
        title={lang === 'en' ? 'Awards & Competitions' : 'الجوائز والمسابقات'}
        description={
          lang === 'en'
            ? "Explore Zaid Abu Alshaar's awards and competition achievements."
            : 'استعرض جوائز وإنجازات زيد أبو الشعر في المسابقات.'
        }
        path="awards"
      />
      <div className="container max-w-5xl">
        <motion.div {...fadeUp} className="text-center mb-16 space-y-3">
          <h1 className="text-4xl font-bold">{c.title}</h1>
          <p className="text-muted-foreground">{c.subtitle}</p>
        </motion.div>

        <motion.div {...fadeUp} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">{c.title}</h2>
          </div>
          <motion.div {...staggerContainer} className="grid sm:grid-cols-2 gap-4">
            {awards.map((item) => {
              const showGallery = galleryItem === item.id;
              const hasMedia = item.media && item.media.length > 0;
              return (
                <motion.div key={item.id} {...staggerItem}>
                  <Card className="glass-border hover-lift h-full">
                    <CardContent className="p-5 space-y-2">
                      <h4 className="font-heading text-sm font-semibold">{item.title[lang]}</h4>
                      <p className="text-xs text-muted-foreground">
                        {item.issuer[lang]} &middot; {item.year}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.description[lang]}</p>

                      {hasMedia && (
                        <>
                          <button
                            onClick={() => setGalleryItem(showGallery ? null : item.id)}
                            className="flex items-center gap-1 text-xs text-primary hover:underline pt-1"
                          >
                            <Image className="h-3 w-3" />
                            {showGallery ? c.hideGallery : c.viewGallery}
                          </button>

                          <AnimatePresence>
                            {showGallery && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <MediaGallery items={item.media!} alt={item.title[lang]} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            {/* Coming Soon Cards */}
            {comingSoonItems.map((cs, i) => (
              <motion.div key={`cs-${i}`} {...staggerItem}>
                <Card className="glass-border h-full border-dashed border-2 border-primary/20">
                  <CardContent className="p-5 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-heading text-sm font-semibold">{cs.title[lang]}</h4>
                    <p className="text-xs text-muted-foreground">{cs.description[lang]}</p>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {c.comingSoon}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Awards;
