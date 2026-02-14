import { useState } from 'react';
import { Outlet, useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Download, Menu, X, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { siteConfig } from '@/content/site';
import { Button } from '@/components/ui/button';
import ScrollToTop from '@/components/ScrollToTop';

const navItems = [
  { en: 'Home', ar: 'الرئيسية', path: '' },
  { en: 'Services', ar: 'الخدمات', path: 'services' },
  { en: 'Projects', ar: 'المشاريع', path: 'projects' },
  { en: 'Awards', ar: 'الجوائز', path: 'awards' },
  { en: 'Certs & Experience', ar: 'الشهادات والخبرة', path: 'certifications' },
  { en: 'About', ar: 'عني', path: 'about' },
  { en: 'Contact', ar: 'تواصل', path: 'contact' },
];

const footerLinks = [
  { en: 'Home', ar: 'الرئيسية', path: '' },
  { en: 'Services', ar: 'الخدمات', path: 'services' },
  { en: 'Projects', ar: 'المشاريع', path: 'projects' },
  { en: 'Awards', ar: 'الجوائز', path: 'awards' },
  { en: 'Certifications & Experience', ar: 'الشهادات والخبرة', path: 'certifications' },
  { en: 'About', ar: 'عني', path: 'about' },
  { en: 'Contact', ar: 'تواصل', path: 'contact' },
];

const Layout = () => {
  const { lang: paramLang } = useParams();
  const { lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (paramLang === 'ar' && lang !== 'ar') setLang('ar');
  if (paramLang === 'en' && lang !== 'en') setLang('en');

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    const currentPath = location.pathname.replace(`/${lang}`, '');
    setLang(newLang);
    navigate(`/${newLang}${currentPath}`);
  };

  const isActive = (path: string) => {
    const current = location.pathname.replace(`/${lang}`, '') || '/';
    if (path === '') return current === '/' || current === '';
    return current === `/${path}`;
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16">
          <Link to={`/${lang}`} className="font-heading font-bold text-lg">
            {siteConfig.name[lang]}
          </Link>

          <nav className="hidden lg:flex items-center gap-5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={`/${lang}/${item.path}`}
                className={`text-sm transition-colors whitespace-nowrap ${
                  isActive(item.path)
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item[lang]}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <a href={siteConfig.cvDownloadPath} download>
                <Download className="h-4 w-4" />
                <span className="ms-1">{siteConfig.cta.cv[lang]}</span>
              </a>
            </Button>
            <button
              onClick={toggleLang}
              className="text-sm px-3 py-1.5 rounded-md border border-border hover:border-primary transition-colors"
            >
              {lang === 'en' ? 'عربي' : 'English'}
            </button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-md overflow-hidden"
            >
              <nav className="container flex flex-col py-4 gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={`/${lang}/${item.path}`}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm py-2 transition-colors ${
                      isActive(item.path)
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item[lang]}
                  </Link>
                ))}
                <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                  <Button asChild variant="ghost" size="sm">
                    <a href={siteConfig.cvDownloadPath} download>
                      <Download className="h-4 w-4" />
                      <span className="ms-1">{siteConfig.cta.cv[lang]}</span>
                    </a>
                  </Button>
                  <button
                    onClick={() => { toggleLang(); setMobileOpen(false); }}
                    className="text-sm px-3 py-1.5 rounded-md border border-border hover:border-primary transition-colors"
                  >
                    {lang === 'en' ? 'عربي' : 'English'}
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40 bg-card/30">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Col 1: Identity */}
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-lg">{siteConfig.name[lang]}</h3>
              <p className="text-sm text-muted-foreground">{siteConfig.headline[lang]}</p>
              <p className="text-sm text-muted-foreground">{siteConfig.location[lang]}</p>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm">
                {lang === 'en' ? 'Quick Links' : 'روابط سريعة'}
              </h4>
              <nav className="flex flex-col gap-1.5">
                {footerLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={`/${lang}/${item.path}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item[lang]}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Col 3: Social */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm">
                {lang === 'en' ? 'Connect' : 'تواصل'}
              </h4>
              <div className="flex flex-col gap-2">
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" /> {siteConfig.email}
                </a>
                <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Col 4: CV */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm">
                {lang === 'en' ? 'Resources' : 'موارد'}
              </h4>
              <Button asChild variant="outline" size="sm">
                <a href={siteConfig.cvDownloadPath} download>
                  <Download className="h-4 w-4" />
                  <span className="ms-1">{siteConfig.cta.cv[lang]}</span>
                </a>
              </Button>
            </div>
          </div>

          <div className="border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name.en}.{' '}
            {lang === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
};

export default Layout;
