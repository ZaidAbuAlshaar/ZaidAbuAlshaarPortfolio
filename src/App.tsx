import { Routes, Route, Navigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Projects from '@/pages/Projects';
import Awards from '@/pages/Awards';
import Certifications from '@/pages/Certifications';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import Layout from '@/components/Layout';

const App = () => {
  const { lang } = useLanguage();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${lang}`} replace />} />
      <Route path="/:lang" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="projects" element={<Projects />} />
        <Route path="awards" element={<Awards />} />
        <Route path="certifications" element={<Certifications />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
