export type Lang = 'en' | 'ar';
export type Bilingual = { en: string; ar: string };

export const siteConfig = {
  name: { en: 'Zaid Abu Alshaar', ar: 'زيد أبو الشعر' } as Bilingual,

  title: {
    en: 'Full-Stack Developer | AI & AR/VR Specialist',
    ar: 'مطوّر متكامل | متخصص في الذكاء الاصطناعي والواقع المعزز',
  } as Bilingual,

  tagline: {
    en: 'CS honors student turning ideas into polished web apps, AI agents, and immersive AR/VR experiences — fast, with measurable results.',
    ar: 'طالب علوم حاسوب متفوق يحوّل الأفكار إلى تطبيقات ويب احترافية ووكلاء ذكاء اصطناعي وتجارب واقع معزز — بسرعة ونتائج ملموسة.',
  } as Bilingual,

  availability: {
    en: 'Available for freelance & remote work',
    ar: 'متاح للعمل الحر وعن بُعد',
  } as Bilingual,

  location: { en: 'Amman, Jordan', ar: 'عمّان، الأردن' } as Bilingual,

  headline: {
    en: 'Full-Stack Developer & AI Specialist',
    ar: 'مطوّر متكامل ومتخصص بالذكاء الاصطناعي',
  } as Bilingual,

  portrait: '/images/ZaidAbuAlshaar.png',
  cvDownloadPath: '/cv/Zaid_Abu_Alshaar_CV.pdf',

  email: 'abualshaarzaid@gmail.com',
  phone: '962799569573',
  whatsapp: 'https://wa.me/962799569573',
  github: 'https://github.com/ZaidAbuAlshaar',
  linkedin: 'https://www.linkedin.com/in/zaid-abu-alshaar-93765a3a1/',

  seo: {
    siteUrl: 'https://zaidabualshaar.com',
    defaultTitle: 'Zaid Abu Alshaar — Full-Stack Developer & AI Specialist',
    defaultDescription: {
      en: 'Zaid Abu Alshaar — Full-Stack Developer, AI Integration Specialist, and AR/VR Creator based in Amman, Jordan. Building web apps, AI agents, and immersive experiences.',
      ar: 'زيد أبو الشعر — مطوّر متكامل ومتخصص في الذكاء الاصطناعي والواقع المعزز من عمّان، الأردن. بناء تطبيقات ويب ووكلاء ذكاء اصطناعي وتجارب غامرة.',
    } as Bilingual,
    ogImage: '/images/ZaidAbuAlshaar.png',
  },

  socialLinks: [
    { platform: 'github', url: 'https://github.com/ZaidAbuAlshaar', icon: 'Github' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/zaid-abu-alshaar-93765a3a1/', icon: 'Linkedin' },
    { platform: 'whatsapp', url: 'https://wa.me/962799569573', icon: 'Phone' },
    { platform: 'email', url: 'mailto:abualshaarzaid@gmail.com', icon: 'Mail' },
  ],

  cta: {
    primary: { en: 'Send Project Details', ar: 'أرسل تفاصيل مشروعك' } as Bilingual,
    secondary: { en: 'Book a Call', ar: 'احجز مكالمة' } as Bilingual,
    cv: { en: 'Download CV', ar: 'تحميل السيرة الذاتية' } as Bilingual,
  },

  stats: [
    { value: '3+', en: 'Years Experience', ar: 'سنوات خبرة' },
    { value: '20+', en: 'Projects Completed', ar: 'مشروع منجز' },
    { value: '5+', en: 'Certificates', ar: 'شهادات' },
    { value: '3', en: 'Awards Won', ar: 'جوائز' },
  ],

  process: [
    { en: 'Discover', ar: 'اكتشاف' },
    { en: 'Plan', ar: 'تخطيط' },
    { en: 'Build', ar: 'بناء' },
    { en: 'Integrate AI', ar: 'دمج الذكاء الاصطناعي' },
    { en: 'Deliver & Iterate', ar: 'تسليم وتحسين' },
  ],

  skills: [
    'Python', 'C#', 'JavaScript', 'TypeScript', 'HTML / CSS', 'PHP',
    'React / Next.js', 'Node.js', 'TailwindCSS', 'Figma',
    'Unity', 'AR / VR (WebXR)', 'Three.js',
    'AI / ML Integration', 'LangChain', 'OpenAI API',
    'MongoDB', 'PostgreSQL', 'Git & CI/CD', 'Docker',
  ],

  experiences: {
    en: [
      {
        company: 'IEEE Student Branch — University of Petra',
        role: 'Vice Chair',
        period: 'Sep 2025 — Present',
        desc: 'Leading technical initiatives, organizing hackathons, and mentoring student developers in web development and AI.',
      },
      {
        company: 'Freelance',
        role: 'Web & AI Developer',
        period: 'Jan 2025 — Present',
        desc: 'Delivering end-to-end web applications and AI integration solutions for clients across Jordan and the region.',
      },
      {
        company: 'BMB Group',
        role: 'AR/VR Developer & AI Intern',
        period: 'Feb 2025 — Apr 2025',
        desc: 'Developed an AI & AR project for STC Saudi Arabia. Provided web support using Figma, HTML, CSS, and JavaScript.',
      },
    ],
    ar: [
      {
        company: 'فرع IEEE الطلابي — جامعة البتراء',
        role: 'نائب الرئيس',
        period: 'سبتمبر ٢٠٢٥ — الحاضر',
        desc: 'قيادة المبادرات التقنية وتنظيم الهاكاثونات وإرشاد المطورين الطلاب في تطوير الويب والذكاء الاصطناعي.',
      },
      {
        company: 'عمل حر',
        role: 'مطوّر ويب وذكاء اصطناعي',
        period: 'يناير ٢٠٢٥ — الحاضر',
        desc: 'تقديم تطبيقات ويب متكاملة وحلول ذكاء اصطناعي لعملاء في الأردن والمنطقة.',
      },
      {
        company: 'مجموعة BMB',
        role: 'مطوّر واقع معزز/افتراضي ومتدرب ذكاء اصطناعي',
        period: 'فبراير ٢٠٢٥ — أبريل ٢٠٢٥',
        desc: 'تطوير مشروع ذكاء اصطناعي وواقع معزز لشركة STC السعودية. تقديم دعم ويب باستخدام Figma و HTML و CSS و JavaScript.',
      },
    ],
  },

  education: {
    en: {
      university: 'University of Petra',
      degree: 'B.Sc. Computer Science — VR/AR Track (Honors)',
      period: 'Expected Jan 2027',
    },
    ar: {
      university: 'جامعة البتراء',
      degree: 'بكالوريوس علوم حاسوب — مسار الواقع الافتراضي والمعزز (بامتياز)',
      period: 'المتوقع يناير ٢٠٢٧',
    },
  },

  involvement: {
    en: [
      'IEEE Membership Developer (MD)',
      'Founding member — VR & Gaming Club, University of Petra',
    ],
    ar: [
      'مطوّر عضويات IEEE',
      'عضو مؤسس — نادي الواقع الافتراضي والألعاب، جامعة البتراء',
    ],
  },

  bio: {
    en: [
      "I'm Zaid Abu Alshaar — a Computer Science honors student at the University of Petra with a specialization in AR/VR, and a passionate full-stack developer focused on AI integration and immersive experiences.",
      "As a freelancer and fast learner, I continuously improve my craft by taking on challenging projects. I've built AI & AR solutions for companies like STC Saudi Arabia during my experience at BMB Group, won hackathons including 1st place at the IEEE Sustainable Tech Hackathon, and I currently serve as Vice Chair of the IEEE Student Branch at my university.",
      "Whether it's a full-stack web app, an AI-powered agent, a stunning UI/UX design, or an immersive XR experience — I bring technical depth, creative problem-solving, and fast delivery to every project.",
    ],
    ar: [
      "أنا زيد أبو الشعر — طالب علوم حاسوب متفوق في جامعة البتراء متخصص في الواقع المعزز والافتراضي، ومطوّر متكامل شغوف بتكامل الذكاء الاصطناعي والتجارب التفاعلية.",
      "كمستقل وسريع التعلّم، أطوّر مهاراتي باستمرار من خلال العمل على مشاريع مليئة بالتحديات. طوّرت حلول ذكاء اصطناعي وواقع معزز لشركات مثل STC السعودية خلال عملي مع مجموعة BMB، وفزت بهاكاثونات منها المركز الأول في هاكاثون IEEE للتقنيات المستدامة، وأشغل حاليًا منصب نائب رئيس فرع IEEE الطلابي في جامعتي.",
      "سواء كان المطلوب تطبيق ويب متكامل أو وكيل ذكاء اصطناعي أو تصميم واجهات مستخدم مبهر أو تجربة واقع ممتد — أقدم عمقًا تقنيًا وحلولًا إبداعية وتسليمًا سريعًا في كل مشروع.",
    ],
  },
};
