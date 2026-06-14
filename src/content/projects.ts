import { publicUrl } from '@/lib/assets';
import type { Bilingual } from './site';

export interface Project {
  slug: string;
  title: Bilingual;
  description: Bilingual;
  summary: Bilingual;
  tags: string[];
  techStack: string[];
  role: Bilingual;
  image: string;
  featured: boolean;
  comingSoon?: boolean;
  contactForInfo?: boolean;
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    slug: 'palmGuard',
    title: { en: 'PalmGuard — Palm Weevil Detection', ar: 'حارس النخيل — كشف سوسة النخيل' },
    description: {
      en: 'Award-winning AI and AR solution that detects Red Palm Weevil infestations early, helping farmers protect palm trees through intelligent image recognition and augmented reality field inspections.',
      ar: 'حل فائز بجائزة يجمع بين الذكاء الاصطناعي والواقع المعزز لكشف إصابات سوسة النخيل الحمراء مبكرًا، ومساعدة المزارعين على حماية أشجار النخيل.',
    },
    summary: {
      en: 'Developed an innovative system combining AI-driven image analysis with AR visualization for real-time pest detection in the field. The solution won 1st Place — Best Innovation Award in the Palm & Dates Sector at a national competition in Jordan.',
      ar: 'تطوير نظام مبتكر يجمع بين تحليل الصور بالذكاء الاصطناعي والتصور بالواقع المعزز لكشف الآفات في الوقت الفعلي. فاز الحل بالمركز الأول — جائزة أفضل ابتكار في قطاع النخيل والتمور في مسابقة وطنية بالأردن.',
    },
    tags: ['AI/ML', 'AR/VR', 'IoT'],
    techStack: ['Unity', 'C#', 'AR Foundation', 'Python', 'TensorFlow'],
    role: { en: 'Lead Developer & Researcher', ar: 'مطوّر رئيسي وباحث' },
    image: publicUrl('/images/palmGuard.png'),
    featured: true,
    contactForInfo: true,
  },
  {
    slug: 'uniflow',
    title: { en: 'Uniflow — Intelligent University Assistant', ar: 'Uniflow — مساعد جامعي ذكي' },
    description: {
      en: 'An AI-powered platform that streamlines academic planning, course selection, and campus navigation for university students using large language models and real-time data.',
      ar: 'منصة مدعومة بالذكاء الاصطناعي تسهّل التخطيط الأكاديمي واختيار المواد والتنقل في الحرم الجامعي باستخدام نماذج اللغة الكبيرة والبيانات الفورية.',
    },
    summary: {
      en: 'Building an intelligent assistant that leverages LLMs to deliver personalized academic guidance, smart course recommendations, and multi-language support for students.',
      ar: 'بناء مساعد ذكي يستفيد من نماذج اللغة الكبيرة لتقديم إرشاد أكاديمي مخصص وتوصيات ذكية للمواد ودعم متعدد اللغات للطلاب.',
    },
    tags: ['AI/ML', 'Full-Stack'],
    techStack: ['Python', 'OpenAI API', 'LangChain', 'React', 'Node.js'],
    role: { en: 'AI Engineer & Full-Stack Developer', ar: 'مهندس ذكاء اصطناعي ومطوّر متكامل' },
    image: publicUrl('/images/uniAgent.png'),
    featured: true,
    comingSoon: true,
    github: 'https://github.com/ZaidAbuAlshaar/UniAi',
  },
  {
    slug: 'VR-ARClub',
    title: { en: 'VR & AR Club Platform', ar: 'منصة نادي الواقع الافتراضي والمعزز' },
    description: {
      en: 'The official web platform for the VR & Gaming Club at the University of Petra, co-founded by Zaid Abu Alshaar and Abdulrahman Al-Haimouni — showcasing events, member projects, and XR resources.',
      ar: 'المنصة الرسمية لنادي الواقع الافتراضي والألعاب في جامعة البتراء، الذي شارك في تأسيسه زيد أبو الشعر وعبدالرحمن الحيموني — لعرض الفعاليات ومشاريع الأعضاء وموارد الواقع الممتد.',
    },
    summary: {
      en: 'Built the club\'s full web platform from scratch to manage events, member portfolios, and educational resources for the XR community at the University of Petra.',
      ar: 'بناء منصة النادي الكاملة من الصفر لإدارة الفعاليات وملفات الأعضاء والموارد التعليمية لمجتمع الواقع الممتد في جامعة البتراء.',
    },
    tags: ['Full-Stack', 'AR/VR'],
    techStack: ['React', 'TypeScript', 'TailwindCSS', 'Three.js', 'Vite'],
    role: { en: 'Co-Founder & Lead Developer', ar: 'شريك مؤسس ومطوّر رئيسي' },
    image: publicUrl('/images/ZaidAbuAlshaarVRclub.png'),
    featured: true,
    github: 'https://github.com/ZaidAbuAlshaar/VR-ARClub',
  },
  {
    slug: 'HealthyTimer',
    title: { en: 'Healthy Timer', ar: 'مؤقت صحي' },
    description: {
      en: 'A wellness-focused Android timer app with customizable HIIT, Tabata, and interval training routines — designed to make fitness tracking simple and motivating.',
      ar: 'تطبيق مؤقت أندرويد موجه للصحة واللياقة مع تمارين HIIT و Tabata وتدريبات فترات قابلة للتخصيص — مصمم لجعل تتبع اللياقة بسيطًا ومحفزًا.',
    },
    summary: {
      en: 'Developed a timer app tailored for health and fitness routines, supporting HIIT, Tabata, and custom interval training with audio cues and progress tracking.',
      ar: 'تطوير تطبيق مؤقت مصمم لروتين الصحة واللياقة، يدعم تدريب HIIT و Tabata والفترات المخصصة مع إشارات صوتية وتتبع التقدم.',
    },
    tags: ['Mobile', 'UI/UX'],
    techStack: ['Java', 'Android SDK', 'XML', 'Material Design'],
    role: { en: 'Mobile App Developer', ar: 'مطوّر تطبيقات جوال' },
    image: publicUrl('/images/breakApp.png'),
    featured: false,
    github: 'https://github.com/ZaidAbuAlshaar/HealthyTimer',
  },
  {
    slug: 'HealthyCalculator',
    title: { en: 'Healthy Calculator', ar: 'الحاسبة الصحية' },
    description: {
      en: 'A comprehensive health and fitness calculator for Android that computes BMI, daily calorie needs, and macro-nutrient breakdowns with a clean Material Design interface.',
      ar: 'حاسبة صحية ولياقة شاملة لأندرويد تحسب مؤشر كتلة الجسم والسعرات الحرارية اليومية وتوزيع العناصر الغذائية بواجهة Material Design نظيفة.',
    },
    summary: {
      en: 'Built a comprehensive health calculator with BMI analysis, TDEE estimation, and macro-nutrient planning — featuring clean UI and scientifically backed formulas.',
      ar: 'بناء حاسبة صحية شاملة مع تحليل مؤشر كتلة الجسم وتقدير معدل الأيض وتخطيط العناصر الغذائية — بواجهة نظيفة ومعادلات مدعومة علميًا.',
    },
    tags: ['Mobile', 'UI/UX'],
    techStack: ['Java', 'Android SDK', 'XML', 'Material Design'],
    role: { en: 'Mobile App Developer', ar: 'مطوّر تطبيقات جوال' },
    image: publicUrl('/images/HealthCal.png'),
    featured: false,
    github: 'https://github.com/ZaidAbuAlshaar/HealthyCalculator',
  },
  {
    slug: 'nfc-project',
    title: { en: 'NFC Smart Card System', ar: 'نظام بطاقات NFC الذكية' },
    description: {
      en: 'A contactless digital business card platform powered by NFC technology — replacing traditional cards with programmable smart cards linked to dynamic web profiles.',
      ar: 'منصة بطاقات أعمال رقمية لاسلكية مدعومة بتقنية NFC — تستبدل البطاقات التقليدية ببطاقات ذكية قابلة للبرمجة مرتبطة بملفات ويب ديناميكية.',
    },
    summary: {
      en: 'Designed and developed an NFC-powered digital card system with web-based profile management, enabling instant contactless information sharing.',
      ar: 'تصميم وتطوير نظام بطاقات رقمية مدعوم بتقنية NFC مع إدارة ملفات على الويب، يتيح مشاركة فورية للمعلومات لاسلكيًا.',
    },
    tags: ['Full-Stack', 'IoT'],
    techStack: ['React', 'Node.js', 'NFC', 'MongoDB', 'TypeScript'],
    role: { en: 'Full-Stack Developer', ar: 'مطوّر متكامل' },
    image: publicUrl('/images/nfcWeb.png'),
    featured: true,
    github: 'https://github.com/ZaidAbuAlshaar/nfc-project',
  },
  {
    slug: 'PythonWithZaid',
    title: { en: 'Python With Zaid — Learning Platform', ar: 'بايثون مع زيد — منصة تعليمية' },
    description: {
      en: 'A structured Python programming platform with progressive tutorials, hands-on exercises, and real-world projects — from fundamentals to advanced topics.',
      ar: 'منصة برمجة بايثون منظمة مع دروس تدريجية وتمارين عملية ومشاريع واقعية — من الأساسيات إلى المواضيع المتقدمة.',
    },
    summary: {
      en: 'Built a comprehensive Python learning platform with progressive tutorials from basics to advanced concepts, including hands-on projects and coding exercises.',
      ar: 'بناء منصة تعلّم بايثون شاملة مع دروس تدريجية من الأساسيات إلى المفاهيم المتقدمة، بما في ذلك مشاريع وتمارين عملية.',
    },
    tags: ['Full-Stack', 'Education'],
    techStack: ['Python', 'Jupyter', 'Data Structures', 'Algorithms'],
    role: { en: 'Creator & Instructor', ar: 'المؤسس والمدرب' },
    image: publicUrl('/images/ZaidAbuAlshaarPython.png'),
    featured: false,
    github: 'https://github.com/ZaidAbuAlshaar/PythonWithZaid',
  },
  {
    slug: 'JavaWithZaid',
    title: { en: 'Java With Zaid — Learning Platform', ar: 'جافا مع زيد — منصة تعليمية' },
    description: {
      en: 'An educational platform with structured Java programming tutorials, OOP exercises, and code examples for beginners and intermediate learners.',
      ar: 'منصة تعليمية تضم دروس برمجة جافا منظمة وتمارين البرمجة الكائنية وأمثلة كود للمبتدئين والمتوسطين.',
    },
    summary: {
      en: 'Created a structured Java learning resource with tutorials, code exercises, and real-world examples to help students master Java fundamentals and OOP concepts.',
      ar: 'إنشاء مورد تعليمي منظم لجافا مع دروس وتمارين كود وأمثلة واقعية لمساعدة الطلاب على إتقان أساسيات جافا ومفاهيم البرمجة الكائنية.',
    },
    tags: ['Full-Stack', 'Education'],
    techStack: ['Java', 'OOP', 'Data Structures', 'Algorithms'],
    role: { en: 'Creator & Instructor', ar: 'المؤسس والمدرب' },
    image: publicUrl('/images/ZaidAbuAlshaarJava.png'),
    featured: false,
    github: 'https://github.com/ZaidAbuAlshaar/JavaWithZaid',
  },
  {
    slug: 'impact-2025-lecture',
    title: { en: 'IMPACT 2025 — VR in Gaming Lecture', ar: 'IMPACT 2025 — محاضرة الواقع الافتراضي في الألعاب' },
    description: {
      en: 'A professional lecture delivered at the IMPACT 2025 conference exploring the intersection of virtual reality and modern gaming — covering immersive design, XR workflows, and the future of interactive entertainment.',
      ar: 'محاضرة مهنية قُدمت في مؤتمر IMPACT 2025 تستكشف تقاطع الواقع الافتراضي والألعاب الحديثة — تغطي التصميم الغامر وسير عمل الواقع الممتد ومستقبل الترفيه التفاعلي.',
    },
    summary: {
      en: 'Delivered a talk at IMPACT 2025 on the evolving role of VR in the gaming industry, demonstrating practical XR development techniques and industry trends.',
      ar: 'تقديم محاضرة في IMPACT 2025 حول الدور المتطور للواقع الافتراضي في صناعة الألعاب، مع عرض تقنيات تطوير الواقع الممتد واتجاهات الصناعة.',
    },
    tags: ['Lectures', 'AR/VR'],
    techStack: ['Unity', 'VR', 'Public Speaking', 'XR Design'],
    role: { en: 'Speaker & VR Specialist', ar: 'متحدث ومتخصص واقع افتراضي' },
    image: publicUrl('/images/6U8A0156.JPG'),
    featured: true,
    contactForInfo: true,
  },
];

export const allTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
