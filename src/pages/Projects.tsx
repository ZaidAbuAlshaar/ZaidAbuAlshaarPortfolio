import { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Github, ExternalLink, ChevronDown, ChevronUp, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/i18n/LanguageContext';
import { projects, allTags } from '@/content/projects';
import Gallery from '@/components/Gallery';
import { getProjectImage, handleImageError } from '@/lib/images';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import SEO from '@/components/SEO';

const Projects = () => {
  const { lang } = useLanguage();
  const location = useLocation();
  const [activeTag, setActiveTag] = useState('All');
  const [search, setSearch] = useState('');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [galleryProject, setGalleryProject] = useState<string | null>(null);
  const [highlightedSlugs, setHighlightedSlugs] = useState<string[]>([]);

  // Handle service links: ?highlight=slug1,slug2 or ?service=fullstack
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const highlight = params.get('highlight');
    if (highlight) {
      setHighlightedSlugs(highlight.split(','));
    }
  }, [location.search]);

  const filtered = useMemo(() => {
    let result = projects;
    if (activeTag !== 'All') {
      result = result.filter((p) => p.tags.includes(activeTag));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title[lang].toLowerCase().includes(q) ||
          p.description[lang].toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeTag, search, lang]);

  const t = {
    en: {
      title: 'Projects',
      subtitle: 'Real projects I have built — from AI-powered apps to immersive AR/VR experiences.',
      searchPlaceholder: 'Search projects...',
      noResults: 'No projects match your search.',
      requestDemo: 'Request a Demo',
      viewGallery: 'View Gallery',
      hideGallery: 'Hide Gallery',
    },
    ar: {
      title: 'المشاريع',
      subtitle: 'مشاريع حقيقية بنيتها — من تطبيقات الذكاء الاصطناعي إلى تجارب الواقع المعزز الغامرة.',
      searchPlaceholder: 'ابحث في المشاريع...',
      noResults: 'لا توجد مشاريع تطابق بحثك.',
      requestDemo: 'اطلب عرضًا تجريبيًا',
      viewGallery: 'عرض المعرض',
      hideGallery: 'إخفاء المعرض',
    },
  };

  const c = t[lang];

  return (
    <div className="py-20">
      <SEO
        title={lang === 'en' ? 'Projects' : 'المشاريع'}
        description={
          lang === 'en'
            ? "Explore Zaid Abu Alshaar's projects — AI, AR/VR, full-stack web apps, and more."
            : 'استعرض مشاريع زيد أبو الشعر — ذكاء اصطناعي وواقع معزز وتطبيقات ويب متكاملة.'
        }
        path="projects"
      />
      <div className="container max-w-6xl">
        <motion.div {...fadeUp} className="text-center mb-12 space-y-3">
          <h1 className="text-4xl font-bold">{c.title}</h1>
          <p className="text-muted-foreground">{c.subtitle}</p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div {...fadeUp} className="space-y-4 mb-10">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={c.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-10"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTag === tag
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTag}-${search}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">{c.noResults}</p>
            ) : (
              <motion.div {...staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project) => {
                  const isExpanded = expandedProject === project.slug;
                  const showGallery = galleryProject === project.slug;
                  const isHighlighted = highlightedSlugs.includes(project.slug);

                  return (
                    <motion.div key={project.slug} {...staggerItem} id={`project-${project.slug}`} className="flex">
                      <Card
                        className={`glass-border overflow-hidden flex flex-col w-full transition-all ${
                          isHighlighted ? 'ring-2 ring-primary' : ''
                        }`}
                      >
                        {/* Card Image */}
                        <div className="aspect-video bg-muted relative overflow-hidden">
                          <img
                            src={getProjectImage(project.slug)}
                            alt={project.title[lang]}
                            onError={handleImageError}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <CardContent className="p-5 flex flex-col flex-1">
                          <h3 className="font-heading font-semibold mb-2">{project.title[lang]}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{project.description[lang]}</p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.tags.map((tag) => (
                              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Expand / Collapse Button */}
                          <div className="mt-auto space-y-3">
                            <button
                              onClick={() => setExpandedProject(isExpanded ? null : project.slug)}
                              className="flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                              {isExpanded
                                ? lang === 'en'
                                  ? 'Less details'
                                  : 'تفاصيل أقل'
                                : lang === 'en'
                                  ? 'More details'
                                  : 'تفاصيل أكثر'}
                              {isExpanded ? (
                                <ChevronUp className="h-3 w-3" />
                              ) : (
                                <ChevronDown className="h-3 w-3" />
                              )}
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="space-y-4 pt-3 border-t border-border/40">
                                    <p className="text-sm text-muted-foreground">{project.summary[lang]}</p>

                                    <div>
                                      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">
                                        {lang === 'en' ? 'Role' : 'الدور'}
                                      </h4>
                                      <p className="text-sm">{project.role[lang]}</p>
                                    </div>

                                    <div>
                                      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">
                                        {lang === 'en' ? 'Tech Stack' : 'التقنيات'}
                                      </h4>
                                      <div className="flex flex-wrap gap-1.5">
                                        {project.techStack.map((tech) => (
                                          <span
                                            key={tech}
                                            className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
                                          >
                                            {tech}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">
                                        {lang === 'en' ? 'Key Outcomes' : 'النتائج الرئيسية'}
                                      </h4>
                                      <ul className="space-y-1">
                                        {project.outcomes[lang].map((outcome, i) => (
                                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="text-primary mt-0.5">&#10003;</span>
                                            {outcome}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* View Gallery Button */}
                                    <button
                                      onClick={() => setGalleryProject(showGallery ? null : project.slug)}
                                      className="flex items-center gap-1 text-sm text-primary hover:underline"
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
                                          <Gallery
                                            basePath={`/images/projects/${project.slug}`}
                                            alt={project.title[lang]}
                                          />
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Links */}
                            <div className="flex gap-2">
                              {project.github && (
                                <Button asChild variant="outline" size="sm" className="flex-1">
                                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4" /> GitHub
                                  </a>
                                </Button>
                              )}
                              {project.live ? (
                                <Button asChild size="sm" className="flex-1">
                                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4" /> Live
                                  </a>
                                </Button>
                              ) : (
                                <Button asChild variant="secondary" size="sm" className="flex-1">
                                  <Link to={`/${lang}/contact`}>{c.requestDemo}</Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
