import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { fadeUp } from '@/lib/animations';
import SEO from '@/components/SEO';

const NotFound = () => {
  const { lang } = useLanguage();

  const t = {
    en: { title: 'Page Not Found', desc: "The page you're looking for doesn't exist or has been moved.", btn: 'Back to Home' },
    ar: { title: 'الصفحة غير موجودة', desc: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.', btn: 'العودة للرئيسية' },
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <SEO title="404" />
      <motion.div {...fadeUp} className="text-center space-y-6">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-bold">{t[lang].title}</h2>
        <p className="text-muted-foreground max-w-md mx-auto">{t[lang].desc}</p>
        <Button asChild size="lg">
          <Link to={`/${lang}`}>
            <Home className="h-4 w-4" /> {t[lang].btn}
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
