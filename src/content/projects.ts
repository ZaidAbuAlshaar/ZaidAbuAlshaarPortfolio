export interface Project {
  slug: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  summary: { en: string; ar: string };
  tags: string[];
  techStack: string[];
  role: { en: string; ar: string };
  outcomes: { en: string[]; ar: string[] };
  featured: boolean;
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    slug: 'redPalmWeevil',
    title: { en: 'Red Palm Weevil AR Detection', ar: 'كشف سوسة النخيل بالواقع المعزز' },
    description: {
      en: 'An AR-powered application for detecting and managing Red Palm Weevil infestations, combining AI image recognition with augmented reality visualization.',
      ar: 'تطبيق واقع معزز لكشف وإدارة إصابات سوسة النخيل الحمراء، يجمع بين التعرف على الصور بالذكاء الاصطناعي والتصوير بالواقع المعزز.',
    },
    summary: {
      en: 'Built an innovative AR solution that uses AI-powered image recognition to detect Red Palm Weevil infestations early, helping farmers protect palm trees. Won 1st Place — Best Innovation Award in the Palm & Dates Sector.',
      ar: 'بناء حل واقع معزز مبتكر يستخدم التعرف على الصور بالذكاء الاصطناعي لكشف إصابات سوسة النخيل مبكرًا، مما يساعد المزارعين على حماية النخيل. فاز بالمركز الأول — جائزة أفضل ابتكار في قطاع النخيل والتمور.',
    },
    tags: ['AI/ML', 'AR/VR', 'Mobile'],
    techStack: ['Unity', 'C#', 'AR Foundation', 'Python', 'TensorFlow'],
    role: { en: 'Lead Developer & Researcher', ar: 'مطوّر رئيسي وباحث' },
    outcomes: {
      en: ['1st Place — Best Innovation (Palm & Dates Sector)', 'AI-powered weevil detection', 'AR visualization for field inspections'],
      ar: ['المركز الأول — أفضل ابتكار (قطاع النخيل والتمور)', 'كشف السوسة بالذكاء الاصطناعي', 'تصوير بالواقع المعزز للفحص الميداني'],
    },
    featured: true,
    github: 'https://github.com/ZaidAbuAlshaar/redPalmWeevil',
  },
  {
    slug: 'UniAi',
    title: { en: 'UniAI — University AI Assistant', ar: 'UniAI — مساعد جامعي ذكي' },
    description: {
      en: 'An AI-powered university assistant that helps students with course selection, academic planning, and campus information using natural language processing.',
      ar: 'مساعد جامعي مدعوم بالذكاء الاصطناعي يساعد الطلاب في اختيار المواد والتخطيط الأكاديمي ومعلومات الحرم الجامعي باستخدام معالجة اللغة الطبيعية.',
    },
    summary: {
      en: 'Developed an intelligent university assistant leveraging LLMs to provide personalized academic guidance, course recommendations, and campus navigation for students.',
      ar: 'تطوير مساعد جامعي ذكي يستفيد من نماذج اللغة الكبيرة لتقديم إرشاد أكاديمي مخصص وتوصيات بالمواد والتنقل في الحرم الجامعي للطلاب.',
    },
    tags: ['AI/ML', 'Full-Stack'],
    techStack: ['Python', 'OpenAI API', 'LangChain', 'React', 'Node.js'],
    role: { en: 'AI Engineer & Full-Stack Developer', ar: 'مهندس ذكاء اصطناعي ومطوّر متكامل' },
    outcomes: {
      en: ['Natural language academic planning', 'Personalized course recommendations', 'Multi-language support'],
      ar: ['تخطيط أكاديمي باللغة الطبيعية', 'توصيات مواد مخصصة', 'دعم متعدد اللغات'],
    },
    featured: true,
    github: 'https://github.com/ZaidAbuAlshaar/UniAi',
  },
  {
    slug: 'VR-ARClub',
    title: { en: 'VR & AR Club Platform', ar: 'منصة نادي الواقع الافتراضي والمعزز' },
    description: {
      en: 'The official platform for the VR & Gaming Club at the University of Petra — showcasing events, projects, and resources for XR enthusiasts.',
      ar: 'المنصة الرسمية لنادي الواقع الافتراضي والألعاب في جامعة البتراء — عرض الفعاليات والمشاريع والموارد لعشاق الواقع الممتد.',
    },
    summary: {
      en: 'Built the club\'s web platform from scratch to manage events, member portfolios, and educational resources for the XR community at the University of Petra.',
      ar: 'بناء منصة النادي من الصفر لإدارة الفعاليات وملفات الأعضاء والموارد التعليمية لمجتمع الواقع الممتد في جامعة البتراء.',
    },
    tags: ['Full-Stack', 'AR/VR'],
    techStack: ['React', 'TypeScript', 'TailwindCSS', 'Three.js', 'Vite'],
    role: { en: 'Founder & Lead Developer', ar: 'مؤسس ومطوّر رئيسي' },
    outcomes: {
      en: ['Club web presence established', 'Event management system', '3D interactive elements'],
      ar: ['تأسيس وجود النادي على الويب', 'نظام إدارة فعاليات', 'عناصر تفاعلية ثلاثية الأبعاد'],
    },
    featured: true,
    github: 'https://github.com/ZaidAbuAlshaar/VR-ARClub',
  },
  {
    slug: 'nfc-project',
    title: { en: 'NFC Smart Card System', ar: 'نظام بطاقات NFC الذكية' },
    description: {
      en: 'A smart NFC-based system for digital business cards and access control, enabling contactless information sharing and identity verification.',
      ar: 'نظام ذكي قائم على NFC لبطاقات الأعمال الرقمية والتحكم بالوصول، يتيح مشاركة المعلومات والتحقق من الهوية لاسلكيًا.',
    },
    summary: {
      en: 'Designed and developed an NFC-powered digital card system that replaces traditional business cards with contactless, programmable smart cards linked to dynamic web profiles.',
      ar: 'تصميم وتطوير نظام بطاقات رقمية مدعوم بتقنية NFC يستبدل بطاقات الأعمال التقليدية ببطاقات ذكية قابلة للبرمجة مرتبطة بملفات ويب ديناميكية.',
    },
    tags: ['Full-Stack', 'IoT'],
    techStack: ['React', 'Node.js', 'NFC', 'MongoDB', 'TypeScript'],
    role: { en: 'Full-Stack Developer', ar: 'مطوّر متكامل' },
    outcomes: {
      en: ['Contactless digital business cards', 'Dynamic web profile linking', 'NFC read/write integration'],
      ar: ['بطاقات أعمال رقمية لاسلكية', 'ربط بملفات ويب ديناميكية', 'تكامل قراءة/كتابة NFC'],
    },
    featured: true,
    github: 'https://github.com/ZaidAbuAlshaar/nfc-project',
  },
  {
    slug: 'HealthyCalculator',
    title: { en: 'Healthy Calculator', ar: 'الحاسبة الصحية' },
    description: {
      en: 'A health & fitness calculator app that computes BMI, calorie needs, macro breakdowns, and provides personalized diet recommendations.',
      ar: 'تطبيق حاسبة صحية ولياقة بدنية يحسب مؤشر كتلة الجسم والسعرات الحرارية وتوزيع العناصر الغذائية ويقدم توصيات غذائية مخصصة.',
    },
    summary: {
      en: 'Built a comprehensive health calculator with BMI analysis, TDEE estimation, and macro-nutrient planning — featuring clean UI and scientifically backed formulas.',
      ar: 'بناء حاسبة صحية شاملة مع تحليل مؤشر كتلة الجسم وتقدير معدل الأيض وتخطيط العناصر الغذائية — بواجهة نظيفة ومعادلات مدعومة علميًا.',
    },
    tags: ['Mobile', 'UI/UX'],
    techStack: ['Java', 'Android SDK', 'XML', 'Material Design'],
    role: { en: 'Mobile App Developer', ar: 'مطوّر تطبيقات جوال' },
    outcomes: {
      en: ['BMI & calorie tracking', 'Personalized recommendations', 'Clean Material Design UI'],
      ar: ['تتبع مؤشر كتلة الجسم والسعرات', 'توصيات مخصصة', 'واجهة Material Design نظيفة'],
    },
    featured: false,
    github: 'https://github.com/ZaidAbuAlshaar/HealthyCalculator',
  },
  {
    slug: 'HealthyTimer',
    title: { en: 'Healthy Timer', ar: 'مؤقت صحي' },
    description: {
      en: 'A workout and wellness timer app with customizable intervals, exercise routines, and health-focused timing features.',
      ar: 'تطبيق مؤقت للتمارين والعافية مع فترات قابلة للتخصيص وروتين تمارين وميزات توقيت تركز على الصحة.',
    },
    summary: {
      en: 'Developed a timer app tailored for health and fitness routines, supporting HIIT, Tabata, and custom interval training with audio cues and progress tracking.',
      ar: 'تطوير تطبيق مؤقت مصمم لروتين الصحة واللياقة، يدعم تدريب HIIT و Tabata والفترات المخصصة مع إشارات صوتية وتتبع التقدم.',
    },
    tags: ['Mobile', 'UI/UX'],
    techStack: ['Java', 'Android SDK', 'XML', 'Material Design'],
    role: { en: 'Mobile App Developer', ar: 'مطوّر تطبيقات جوال' },
    outcomes: {
      en: ['Custom interval timers', 'HIIT & Tabata presets', 'Audio cues & progress tracking'],
      ar: ['مؤقتات فترات مخصصة', 'إعدادات HIIT و Tabata مسبقة', 'إشارات صوتية وتتبع التقدم'],
    },
    featured: false,
    github: 'https://github.com/ZaidAbuAlshaar/HealthyTimer',
  },
  {
    slug: 'JavaWithZaid',
    title: { en: 'Java With Zaid — Learning Platform', ar: 'جافا مع زيد — منصة تعليمية' },
    description: {
      en: 'An educational platform with Java programming tutorials, exercises, and code examples for beginners and intermediate learners.',
      ar: 'منصة تعليمية تضم دروس برمجة جافا وتمارين وأمثلة كود للمبتدئين والمتوسطين.',
    },
    summary: {
      en: 'Created a structured Java learning resource with tutorials, code exercises, and real-world examples to help students master Java fundamentals and OOP concepts.',
      ar: 'إنشاء مورد تعليمي منظم لجافا مع دروس وتمارين كود وأمثلة واقعية لمساعدة الطلاب على إتقان أساسيات جافا ومفاهيم البرمجة الكائنية.',
    },
    tags: ['Education', 'Full-Stack'],
    techStack: ['Java', 'OOP', 'Data Structures', 'Algorithms'],
    role: { en: 'Creator & Instructor', ar: 'المؤسس والمدرب' },
    outcomes: {
      en: ['Comprehensive Java tutorials', 'Hands-on coding exercises', 'OOP & data structure examples'],
      ar: ['دروس جافا شاملة', 'تمارين كود عملية', 'أمثلة البرمجة الكائنية وهياكل البيانات'],
    },
    featured: false,
    github: 'https://github.com/ZaidAbuAlshaar/JavaWithZaid',
  },
  {
    slug: 'PythonWithZaid',
    title: { en: 'Python With Zaid — Learning Platform', ar: 'بايثون مع زيد — منصة تعليمية' },
    description: {
      en: 'A Python programming learning platform with tutorials, projects, and exercises covering fundamentals through advanced topics like AI and data science.',
      ar: 'منصة تعلّم برمجة بايثون مع دروس ومشاريع وتمارين تغطي الأساسيات حتى المواضيع المتقدمة كالذكاء الاصطناعي وعلم البيانات.',
    },
    summary: {
      en: 'Built a comprehensive Python learning platform with progressive tutorials from basics to advanced AI/ML concepts, including hands-on projects and exercises.',
      ar: 'بناء منصة تعلّم بايثون شاملة مع دروس تدريجية من الأساسيات إلى مفاهيم الذكاء الاصطناعي المتقدمة، بما في ذلك مشاريع وتمارين عملية.',
    },
    tags: ['Education', 'AI/ML'],
    techStack: ['Python', 'AI/ML', 'Data Science', 'Jupyter'],
    role: { en: 'Creator & Instructor', ar: 'المؤسس والمدرب' },
    outcomes: {
      en: ['Python fundamentals to advanced AI', 'Hands-on projects & exercises', 'Data science foundations'],
      ar: ['من أساسيات بايثون إلى الذكاء الاصطناعي المتقدم', 'مشاريع وتمارين عملية', 'أسس علم البيانات'],
    },
    featured: false,
    github: 'https://github.com/ZaidAbuAlshaar/PythonWithZaid',
  },
  {
    slug: 'stc-ai-ar',
    title: { en: 'STC AI & AR Project (Internship)', ar: 'مشروع STC للذكاء الاصطناعي والواقع المعزز (تدريب)' },
    description: {
      en: 'An AI & Augmented Reality solution developed for STC Saudi Arabia during my internship at BMB Group, combining intelligent automation with immersive AR visualization.',
      ar: 'حل ذكاء اصطناعي وواقع معزز طُوّر لشركة STC السعودية خلال تدريبي في مجموعة BMB، يجمع بين الأتمتة الذكية والتصور الغامر بالواقع المعزز.',
    },
    summary: {
      en: 'Built an enterprise-grade AI & AR application for STC Saudi Arabia that integrates machine learning models with augmented reality interfaces for enhanced customer engagement.',
      ar: 'بناء تطبيق ذكاء اصطناعي وواقع معزز بمستوى المؤسسات لشركة STC السعودية يدمج نماذج تعلّم الآلة مع واجهات الواقع المعزز لتعزيز تفاعل العملاء.',
    },
    tags: ['AI/ML', 'AR/VR', '3D'],
    techStack: ['Unity', 'C#', 'Python', 'AR Foundation', 'AI/ML'],
    role: { en: 'AR/VR Developer & AI Intern at BMB Group', ar: 'مطوّر واقع معزز/افتراضي ومتدرب ذكاء اصطناعي في مجموعة BMB' },
    outcomes: {
      en: ['Delivered AI & AR solution for STC Saudi Arabia', 'Integrated ML models with AR visualization', 'Enhanced customer engagement through immersive tech'],
      ar: ['تسليم حل ذكاء اصطناعي وواقع معزز لشركة STC السعودية', 'دمج نماذج تعلّم الآلة مع تصور الواقع المعزز', 'تعزيز تفاعل العملاء عبر التقنيات الغامرة'],
    },
    featured: true,
  },
];

export const allTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
