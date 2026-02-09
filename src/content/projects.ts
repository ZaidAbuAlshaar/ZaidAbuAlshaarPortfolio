export interface Project {
  slug: string;
  title: { en: string; ar: string };
  summary: { en: string; ar: string };
  description: { en: string; ar: string };
  tags: string[];
  techStack: string[];
  category: "ai" | "fullstack" | "xr" | "mobile" | "data" | "other";
  images: {
    thumbnail: string;
    gallery: string[];
  };
  links: {
    github?: string;
    live?: string;
  };
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "ai-powered-analytics",
    title: {
      en: "AI-Powered Analytics Dashboard",
      ar: "لوحة تحليلات مدعومة بالذكاء الاصطناعي",
    },
    summary: {
      en: "Real-time analytics platform with ML-driven insights and predictive modeling.",
      ar: "منصة تحليلات فورية مع رؤى مدعومة بالتعلم الآلي والنمذجة التنبؤية.",
    },
    description: {
      en: "A comprehensive analytics dashboard that leverages machine learning algorithms to provide real-time insights, predictive analytics, and automated reporting. Built with a modern tech stack featuring interactive data visualizations and natural language querying capabilities.",
      ar: "لوحة تحليلات شاملة تستفيد من خوارزميات التعلم الآلي لتقديم رؤى فورية وتحليلات تنبؤية وتقارير آلية. مبنية بتقنيات حديثة مع تصورات بيانات تفاعلية وقدرات استعلام باللغة الطبيعية.",
    },
    tags: ["AI/ML", "Dashboard", "Analytics"],
    techStack: ["Python", "React", "TensorFlow", "PostgreSQL", "D3.js"],
    category: "ai",
    images: {
      thumbnail: "/placeholders/project-1.png",
      gallery: [
        "/placeholders/project-1-gallery-1.png",
        "/placeholders/project-1-gallery-2.png",
        "/placeholders/project-1-gallery-3.png",
      ],
    },
    links: {
      github: "https://github.com/PLACEHOLDER/ai-analytics",
      live: "https://placeholder-demo.com/ai-analytics",
    },
    featured: true,
  },
  {
    slug: "ecommerce-platform",
    title: {
      en: "Full-Stack E-Commerce Platform",
      ar: "منصة تجارة إلكترونية متكاملة",
    },
    summary: {
      en: "Scalable e-commerce solution with real-time inventory management and payment processing.",
      ar: "حل تجارة إلكترونية قابل للتوسع مع إدارة مخزون فورية ومعالجة مدفوعات.",
    },
    description: {
      en: "A full-featured e-commerce platform supporting multi-vendor marketplaces, real-time inventory tracking, secure payment processing with Stripe, and an admin dashboard with comprehensive analytics. Optimized for performance with SSR and edge caching.",
      ar: "منصة تجارة إلكترونية متكاملة الميزات تدعم الأسواق متعددة البائعين وتتبع المخزون الفوري ومعالجة المدفوعات الآمنة مع Stripe ولوحة إدارة مع تحليلات شاملة. محسّنة للأداء مع SSR والتخزين المؤقت.",
    },
    tags: ["Full-Stack", "E-Commerce", "SaaS"],
    techStack: ["Next.js", "TypeScript", "Prisma", "Stripe", "Redis"],
    category: "fullstack",
    images: {
      thumbnail: "/placeholders/project-2.png",
      gallery: [
        "/placeholders/project-2-gallery-1.png",
        "/placeholders/project-2-gallery-2.png",
        "/placeholders/project-2-gallery-3.png",
      ],
    },
    links: {
      github: "https://github.com/PLACEHOLDER/ecommerce",
      live: "https://placeholder-demo.com/ecommerce",
    },
    featured: true,
  },
  {
    slug: "xr-training-simulator",
    title: {
      en: "XR Training Simulator",
      ar: "محاكي تدريب الواقع الممتد",
    },
    summary: {
      en: "Immersive VR/AR training platform for industrial safety and equipment operation.",
      ar: "منصة تدريب غامرة بالواقع الافتراضي والمعزز للسلامة الصناعية وتشغيل المعدات.",
    },
    description: {
      en: "An immersive extended reality training simulator designed for industrial environments. Features hand-tracking interactions, realistic physics simulations, multi-user collaboration, and performance analytics. Supports both VR headsets and AR mobile devices.",
      ar: "محاكي تدريب واقع ممتد غامر مصمم للبيئات الصناعية. يتميز بتفاعلات تتبع اليد ومحاكاة فيزيائية واقعية وتعاون متعدد المستخدمين وتحليلات الأداء. يدعم كلاً من سماعات الواقع الافتراضي والأجهزة المحمولة بالواقع المعزز.",
    },
    tags: ["XR", "VR/AR", "Simulation"],
    techStack: ["Unity", "C#", "WebXR", "Three.js", "Node.js"],
    category: "xr",
    images: {
      thumbnail: "/placeholders/project-3.png",
      gallery: [
        "/placeholders/project-3-gallery-1.png",
        "/placeholders/project-3-gallery-2.png",
      ],
    },
    links: {
      github: "https://github.com/PLACEHOLDER/xr-simulator",
    },
    featured: true,
  },
  {
    slug: "nlp-chatbot-framework",
    title: {
      en: "NLP Chatbot Framework",
      ar: "إطار عمل روبوت دردشة NLP",
    },
    summary: {
      en: "Modular chatbot framework with multi-language NLP and context-aware conversations.",
      ar: "إطار عمل روبوت دردشة معياري مع معالجة لغة طبيعية متعددة اللغات ومحادثات واعية بالسياق.",
    },
    description: {
      en: "A flexible, modular chatbot framework supporting multi-language natural language processing, context-aware conversation flows, sentiment analysis, and easy integration with popular messaging platforms. Includes a visual conversation builder and analytics dashboard.",
      ar: "إطار عمل روبوت دردشة مرن ومعياري يدعم معالجة اللغة الطبيعية متعددة اللغات وتدفقات المحادثة الواعية بالسياق وتحليل المشاعر والتكامل السهل مع منصات المراسلة الشائعة. يتضمن منشئ محادثات مرئي ولوحة تحليلات.",
    },
    tags: ["AI/ML", "NLP", "Framework"],
    techStack: ["Python", "FastAPI", "Transformers", "React", "Docker"],
    category: "ai",
    images: {
      thumbnail: "/placeholders/project-4.png",
      gallery: [
        "/placeholders/project-4-gallery-1.png",
        "/placeholders/project-4-gallery-2.png",
      ],
    },
    links: {
      github: "https://github.com/PLACEHOLDER/nlp-chatbot",
      live: "https://placeholder-demo.com/chatbot",
    },
    featured: false,
  },
  {
    slug: "smart-iot-dashboard",
    title: {
      en: "Smart IoT Dashboard",
      ar: "لوحة إنترنت الأشياء الذكية",
    },
    summary: {
      en: "IoT device management platform with real-time monitoring and automated alerts.",
      ar: "منصة إدارة أجهزة إنترنت الأشياء مع مراقبة فورية وتنبيهات آلية.",
    },
    description: {
      en: "A centralized IoT management dashboard for monitoring and controlling connected devices. Features real-time data streaming via WebSockets, automated alerting with customizable thresholds, device provisioning, and historical data analysis with exportable reports.",
      ar: "لوحة إدارة مركزية لإنترنت الأشياء لمراقبة الأجهزة المتصلة والتحكم فيها. تتميز ببث البيانات الفوري عبر WebSockets والتنبيه الآلي مع عتبات قابلة للتخصيص وتوفير الأجهزة وتحليل البيانات التاريخية مع تقارير قابلة للتصدير.",
    },
    tags: ["IoT", "Full-Stack", "Real-time"],
    techStack: ["React", "Node.js", "MQTT", "InfluxDB", "Grafana"],
    category: "fullstack",
    images: {
      thumbnail: "/placeholders/project-5.png",
      gallery: [
        "/placeholders/project-5-gallery-1.png",
        "/placeholders/project-5-gallery-2.png",
      ],
    },
    links: {
      github: "https://github.com/PLACEHOLDER/iot-dashboard",
    },
    featured: false,
  },
  {
    slug: "mobile-health-tracker",
    title: {
      en: "Mobile Health Tracker",
      ar: "تطبيق تتبع الصحة المحمول",
    },
    summary: {
      en: "Cross-platform health tracking app with AI-powered wellness recommendations.",
      ar: "تطبيق تتبع صحة متعدد المنصات مع توصيات عافية مدعومة بالذكاء الاصطناعي.",
    },
    description: {
      en: "A cross-platform mobile health tracking application providing personalized wellness recommendations powered by AI. Features activity tracking, nutrition logging, sleep analysis, and integration with popular wearable devices. Includes a social component for community challenges.",
      ar: "تطبيق تتبع صحة محمول متعدد المنصات يقدم توصيات عافية مخصصة مدعومة بالذكاء الاصطناعي. يتميز بتتبع النشاط وتسجيل التغذية وتحليل النوم والتكامل مع أجهزة القياس القابلة للارتداء الشائعة. يتضمن مكوناً اجتماعياً لتحديات المجتمع.",
    },
    tags: ["Mobile", "AI/ML", "Health"],
    techStack: ["React Native", "TypeScript", "Firebase", "TensorFlow Lite"],
    category: "mobile",
    images: {
      thumbnail: "/placeholders/project-6.png",
      gallery: [
        "/placeholders/project-6-gallery-1.png",
        "/placeholders/project-6-gallery-2.png",
      ],
    },
    links: {
      github: "https://github.com/PLACEHOLDER/health-tracker",
      live: "https://placeholder-demo.com/health-tracker",
    },
    featured: false,
  },
  {
    slug: "data-pipeline-orchestrator",
    title: {
      en: "Data Pipeline Orchestrator",
      ar: "منسق خطوط البيانات",
    },
    summary: {
      en: "Visual data pipeline builder with drag-and-drop ETL workflows and monitoring.",
      ar: "منشئ خطوط بيانات مرئي مع سير عمل ETL بالسحب والإفلات والمراقبة.",
    },
    description: {
      en: "A visual data pipeline orchestration tool that enables teams to build, monitor, and manage ETL workflows through an intuitive drag-and-drop interface. Supports multiple data sources, transformation logic, scheduling, error handling, and real-time pipeline monitoring.",
      ar: "أداة تنسيق خطوط بيانات مرئية تمكّن الفرق من بناء ومراقبة وإدارة سير عمل ETL من خلال واجهة سحب وإفلات بديهية. تدعم مصادر بيانات متعددة ومنطق التحويل والجدولة ومعالجة الأخطاء ومراقبة خطوط البيانات الفورية.",
    },
    tags: ["Data", "ETL", "DevOps"],
    techStack: ["Python", "Apache Airflow", "React", "PostgreSQL", "Docker"],
    category: "data",
    images: {
      thumbnail: "/placeholders/project-7.png",
      gallery: [
        "/placeholders/project-7-gallery-1.png",
        "/placeholders/project-7-gallery-2.png",
      ],
    },
    links: {
      github: "https://github.com/PLACEHOLDER/data-pipeline",
    },
    featured: false,
  },
];

export const categoryColors: Record<Project["category"], string> = {
  ai: "from-purple-500 to-blue-500",
  fullstack: "from-orange-500 to-amber-500",
  xr: "from-emerald-500 to-cyan-500",
  mobile: "from-pink-500 to-rose-500",
  data: "from-indigo-500 to-violet-500",
  other: "from-gray-500 to-slate-500",
};

export const categoryLabels: Record<Project["category"], { en: string; ar: string }> = {
  ai: { en: "AI / ML", ar: "ذكاء اصطناعي" },
  fullstack: { en: "Full-Stack", ar: "متكامل" },
  xr: { en: "XR / VR / AR", ar: "واقع ممتد" },
  mobile: { en: "Mobile", ar: "تطبيقات محمولة" },
  data: { en: "Data Engineering", ar: "هندسة البيانات" },
  other: { en: "Other", ar: "أخرى" },
};
