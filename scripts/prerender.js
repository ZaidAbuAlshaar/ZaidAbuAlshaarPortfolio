/**
 * prerender.js — post-build static HTML generation
 *
 * Runs after `vite build`. For each language route it:
 *  1. Reads the Vite-built dist/index.html (which has the correct hashed JS/CSS assets)
 *  2. Injects route-specific lang, dir, title, description, canonical, hreflang, JSON-LD
 *  3. Adds a pre-rendered <main> block inside #root with real Arabic/English text so
 *     Googlebot sees actual content on the FIRST crawl wave (before JS executes)
 *  4. Writes the result to dist/<lang>/index.html (and sub-routes)
 *
 * Usage:  node scripts/prerender.js
 * Called by: npm run build  (via "build": "tsc -b && vite build && node scripts/prerender.js")
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir   = path.resolve(__dirname, '../dist');
const SITE_URL  = 'https://zaiddev.com';

// ---------------------------------------------------------------------------
// Route definitions
// ---------------------------------------------------------------------------
const ROUTES = [
  // ── English ──────────────────────────────────────────────────────────────
  {
    outDir: 'en',
    lang: 'en', dir: 'ltr',
    canonical: `${SITE_URL}/en`,
    hreflangPath: '',
    title: 'Zaid Abu Alshaar — Full-Stack Developer & AI Specialist',
    description: 'Zaid Abu Alshaar — Full-Stack Developer, AI Integration Specialist, and AR/VR Creator based in Amman, Jordan. Building web apps, AI agents, and immersive experiences.',
    h1: 'Zaid Abu Alshaar — Full-Stack Developer & AI Specialist',
    p: 'CS honors student turning ideas into polished web apps, AI agents, and immersive AR/VR experiences — fast, with measurable results.',
    nav: [
      { href: '/en/',               label: 'Home'         },
      { href: '/en/about',          label: 'About'        },
      { href: '/en/services',       label: 'Services'     },
      { href: '/en/projects',       label: 'Projects'     },
      { href: '/en/awards',         label: 'Awards'       },
      { href: '/en/certifications', label: 'Certifications'},
      { href: '/en/contact',        label: 'Contact'      },
    ],
  },
  {
    outDir: 'en/about',
    lang: 'en', dir: 'ltr',
    canonical: `${SITE_URL}/en/about`,
    hreflangPath: 'about',
    title: 'About | Zaid Abu Alshaar',
    description: 'About Zaid Abu Alshaar — Full-Stack Developer, AI Specialist, and AR/VR Creator based in Amman, Jordan.',
    h1: 'About Zaid Abu Alshaar',
    p: 'Computer Science honors student at the University of Petra, specializing in AR/VR, AI integration, and full-stack web development.',
    nav: [],
  },
  {
    outDir: 'en/services',
    lang: 'en', dir: 'ltr',
    canonical: `${SITE_URL}/en/services`,
    hreflangPath: 'services',
    title: 'Services | Zaid Abu Alshaar',
    description: 'Full-Stack Web Development, AI Integration, AR/VR, and UI/UX Design services by Zaid Abu Alshaar.',
    h1: 'Services',
    p: 'Full-Stack Web Development · AI & ML Integration · Extended Reality (XR) · UI/UX Design',
    nav: [],
  },
  {
    outDir: 'en/projects',
    lang: 'en', dir: 'ltr',
    canonical: `${SITE_URL}/en/projects`,
    hreflangPath: 'projects',
    title: 'Projects | Zaid Abu Alshaar',
    description: 'Portfolio of web applications, AI agents, and AR/VR experiences built by Zaid Abu Alshaar.',
    h1: 'Projects',
    p: 'Web apps, AI agents, AR/VR experiences — browse all projects by Zaid Abu Alshaar.',
    nav: [],
  },
  {
    outDir: 'en/awards',
    lang: 'en', dir: 'ltr',
    canonical: `${SITE_URL}/en/awards`,
    hreflangPath: 'awards',
    title: 'Awards & Certifications | Zaid Abu Alshaar',
    description: 'Awards and certifications earned by Zaid Abu Alshaar, including hackathon victories and professional certificates.',
    h1: 'Awards & Certifications',
    p: '1st Place — IEEE Sustainable Tech Hackathon and multiple professional certifications.',
    nav: [],
  },
  {
    outDir: 'en/certifications',
    lang: 'en', dir: 'ltr',
    canonical: `${SITE_URL}/en/certifications`,
    hreflangPath: 'certifications',
    title: 'Certifications & Experience | Zaid Abu Alshaar',
    description: 'Professional certifications and work experience of Zaid Abu Alshaar.',
    h1: 'Certifications & Experience',
    p: 'AR/VR Developer & AI Intern at BMB Group · IEEE Vice Chair · Freelance Full-Stack Developer',
    nav: [],
  },
  {
    outDir: 'en/contact',
    lang: 'en', dir: 'ltr',
    canonical: `${SITE_URL}/en/contact`,
    hreflangPath: 'contact',
    title: 'Get in Touch | Zaid Abu Alshaar',
    description: 'Contact Zaid Abu Alshaar for web development, AI integration, or AR/VR project inquiries.',
    h1: 'Get in Touch',
    p: 'Available for freelance & remote work. Reach out via the form, WhatsApp, or email.',
    nav: [],
  },

  // ── Arabic ───────────────────────────────────────────────────────────────
  {
    outDir: 'ar',
    lang: 'ar', dir: 'rtl',
    canonical: `${SITE_URL}/ar`,
    hreflangPath: '',
    title: 'زيد أبو الشعر — مطوّر متكامل ومتخصص في الذكاء الاصطناعي والواقع المعزز',
    description: 'زيد أبو الشعر — مطوّر متكامل ومتخصص في الذكاء الاصطناعي والواقع المعزز من عمّان، الأردن. بناء تطبيقات ويب ووكلاء ذكاء اصطناعي وتجارب غامرة.',
    h1: 'زيد أبو الشعر — مطوّر متكامل ومتخصص في الذكاء الاصطناعي والواقع المعزز',
    p: 'طالب علوم حاسوب متفوق يحوّل الأفكار إلى تطبيقات ويب احترافية ووكلاء ذكاء اصطناعي وتجارب واقع معزز — بسرعة ونتائج ملموسة.',
    nav: [
      { href: '/ar/',               label: 'الرئيسية'      },
      { href: '/ar/about',          label: 'عني'            },
      { href: '/ar/services',       label: 'الخدمات'       },
      { href: '/ar/projects',       label: 'المشاريع'      },
      { href: '/ar/awards',         label: 'الجوائز'       },
      { href: '/ar/certifications', label: 'الشهادات والخبرة'},
      { href: '/ar/contact',        label: 'تواصل'          },
    ],
  },
  {
    outDir: 'ar/about',
    lang: 'ar', dir: 'rtl',
    canonical: `${SITE_URL}/ar/about`,
    hreflangPath: 'about',
    title: 'عني | زيد أبو الشعر',
    description: 'تعرّف على زيد أبو الشعر — مطوّر متكامل ومتخصص في الذكاء الاصطناعي والواقع المعزز من عمّان، الأردن.',
    h1: 'عن زيد أبو الشعر',
    p: 'طالب علوم حاسوب متفوق في جامعة البتراء متخصص في الواقع المعزز والافتراضي وتكامل الذكاء الاصطناعي وتطوير الويب المتكامل.',
    nav: [],
  },
  {
    outDir: 'ar/services',
    lang: 'ar', dir: 'rtl',
    canonical: `${SITE_URL}/ar/services`,
    hreflangPath: 'services',
    title: 'الخدمات | زيد أبو الشعر',
    description: 'خدمات تطوير الويب المتكامل والذكاء الاصطناعي والواقع المعزز وتصميم واجهات المستخدم بقلم زيد أبو الشعر.',
    h1: 'الخدمات',
    p: 'تطوير الويب المتكامل · الذكاء الاصطناعي والتعلم الآلي · الواقع الممتد (XR) · تصميم واجهات المستخدم',
    nav: [],
  },
  {
    outDir: 'ar/projects',
    lang: 'ar', dir: 'rtl',
    canonical: `${SITE_URL}/ar/projects`,
    hreflangPath: 'projects',
    title: 'المشاريع | زيد أبو الشعر',
    description: 'معرض مشاريع تطبيقات الويب ووكلاء الذكاء الاصطناعي وتجارب الواقع المعزز من إنجاز زيد أبو الشعر.',
    h1: 'المشاريع',
    p: 'تطبيقات ويب ووكلاء ذكاء اصطناعي وتجارب واقع معزز — تصفّح جميع مشاريع زيد أبو الشعر.',
    nav: [],
  },
  {
    outDir: 'ar/awards',
    lang: 'ar', dir: 'rtl',
    canonical: `${SITE_URL}/ar/awards`,
    hreflangPath: 'awards',
    title: 'الجوائز والشهادات | زيد أبو الشعر',
    description: 'الجوائز والشهادات التي حصل عليها زيد أبو الشعر، بما في ذلك الفوز في الهاكاثونات والشهادات المهنية.',
    h1: 'الجوائز والشهادات',
    p: 'المركز الأول — هاكاثون IEEE للتقنيات المستدامة وشهادات مهنية متعددة.',
    nav: [],
  },
  {
    outDir: 'ar/certifications',
    lang: 'ar', dir: 'rtl',
    canonical: `${SITE_URL}/ar/certifications`,
    hreflangPath: 'certifications',
    title: 'الشهادات والخبرة | زيد أبو الشعر',
    description: 'الشهادات المهنية والخبرة العملية لزيد أبو الشعر.',
    h1: 'الشهادات والخبرة',
    p: 'مطوّر واقع معزز/افتراضي ومتدرب ذكاء اصطناعي في مجموعة BMB · نائب رئيس IEEE · مطوّر ويب مستقل',
    nav: [],
  },
  {
    outDir: 'ar/contact',
    lang: 'ar', dir: 'rtl',
    canonical: `${SITE_URL}/ar/contact`,
    hreflangPath: 'contact',
    title: 'تواصل معي | زيد أبو الشعر',
    description: 'تواصل مع زيد أبو الشعر للاستفسار عن مشاريع تطوير الويب والذكاء الاصطناعي والواقع المعزز.',
    h1: 'تواصل معي',
    p: 'متاح للعمل الحر وعن بُعد. تواصل عبر النموذج أو واتساب أو البريد الإلكتروني.',
    nav: [],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function hreflangTags(routePath) {
  const suffix = routePath ? `/${routePath}` : '';
  return [
    `  <link rel="alternate" hreflang="en" href="${SITE_URL}/en${suffix}" />`,
    `  <link rel="alternate" hreflang="ar" href="${SITE_URL}/ar${suffix}" />`,
    `  <link rel="alternate" hreflang="x-default" href="${SITE_URL}/en${suffix}" />`,
  ].join('\n');
}

function injectHead(html, route) {
  // 1. lang + dir on <html>
  html = html.replace(
    /(<html\b[^>]*?)(\s+lang="[^"]*")?(\s+dir="[^"]*")?([^>]*>)/,
    (_, before, _lang, _dir, after) =>
      `${before} lang="${route.lang}" dir="${route.dir}"${after}`,
  );

  // 2. title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(route.title)}</title>`);

  // 3. description
  html = html.replace(
    /(<meta\s+name="description"\s+content=")[^"]*(")/,
    `$1${escapeHtml(route.description)}$2`,
  );

  // 4. canonical + hreflang — inject just before </head>
  const headInject = [
    `  <link rel="canonical" href="${route.canonical}" />`,
    hreflangTags(route.hreflangPath),
  ].join('\n');
  html = html.replace('</head>', `${headInject}\n  </head>`);

  return html;
}

function buildNavHtml(nav) {
  if (!nav || nav.length === 0) return '';
  const links = nav
    .map(({ href, label }) => `      <li><a href="${href}">${escapeHtml(label)}</a></li>`)
    .join('\n');
  return `    <nav aria-label="site navigation"><ul>\n${links}\n    </ul></nav>`;
}

function injectPrerenderedContent(html, route) {
  // Inject visible content inside #root so Googlebot sees real text
  // before React hydrates. React will replace this on load — that's fine.
  const content = `
    <div lang="${route.lang}" dir="${route.dir}">
      <h1>${escapeHtml(route.h1)}</h1>
      <p>${escapeHtml(route.p)}</p>
${buildNavHtml(route.nav)}
    </div>`;
  return html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

let generated = 0;
for (const route of ROUTES) {
  let html = baseHtml;
  html = injectHead(html, route);
  html = injectPrerenderedContent(html, route);

  const outDir = path.join(distDir, route.outDir);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');

  console.log(`  ✓  dist/${route.outDir}/index.html  [${route.lang}]`);
  generated++;
}

console.log(`\n✅ Pre-rendering complete — ${generated} routes written.\n`);
