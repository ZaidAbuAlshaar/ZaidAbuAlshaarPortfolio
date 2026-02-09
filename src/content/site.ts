export const siteConfig = {
  name: {
    en: "Zaid Abu Alshaar",
    ar: "زيد أبو الشعر",
  },
  title: {
    en: "Full-Stack Developer & AI Engineer",
    ar: "مطور متكامل ومهندس ذكاء اصطناعي",
  },
  description: {
    en: "Building intelligent digital experiences with modern web technologies, AI/ML, and extended reality.",
    ar: "بناء تجارب رقمية ذكية باستخدام تقنيات الويب الحديثة والذكاء الاصطناعي والواقع الممتد.",
  },
  email: "PLACEHOLDER_EMAIL@example.com",
  phone: "+1-000-000-0000",
  location: {
    en: "Amman, Jordan",
    ar: "عمّان، الأردن",
  },
  siteUrl: "https://placeholder-domain.com",
  social: {
    github: "https://github.com/PLACEHOLDER_GITHUB",
    linkedin: "https://linkedin.com/in/PLACEHOLDER_LINKEDIN",
    twitter: "https://twitter.com/PLACEHOLDER_TWITTER",
  },
  cta: {
    en: {
      primary: "View My Work",
      secondary: "Get In Touch",
      resume: "Download Resume",
    },
    ar: {
      primary: "شاهد أعمالي",
      secondary: "تواصل معي",
      resume: "تحميل السيرة الذاتية",
    },
  },
  resumeUrl: "/placeholders/resume.pdf",
  portrait: "/placeholders/portrait.png",
  ogImage: "/placeholders/og-image.png",
} as const;

export type SiteConfig = typeof siteConfig;
