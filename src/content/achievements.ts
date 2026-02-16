import { publicUrl } from '@/lib/assets';

export interface Achievement {
  id: string;
  title: { en: string; ar: string };
  issuer: { en: string; ar: string };
  description: { en: string; ar: string };
  year: number;
  category: 'award' | 'certification' | 'experience';
  media?: string[];
}

export const achievements: Achievement[] = [
  // ─── Awards & Competitions ───
  {
    id: 'award-ieee-hackathon',
    title: { en: '1st Place — Sustainable Tech Hackathon', ar: 'المركز الأول — هاكاثون التقنيات المستدامة' },
    issuer: { en: 'IEEE, Jordan', ar: 'IEEE، الأردن' },
    description: {
      en: 'Competed against top university teams across Jordan and won 1st place at the IEEE Sustainable Technology Hackathon 2025. Designed and built a working prototype that addresses real-world sustainability challenges using cutting-edge technology — recognized by IEEE judges for innovation, technical execution, and impact potential.',
      ar: 'تنافست ضد أفضل الفرق الجامعية في الأردن وفزت بالمركز الأول في هاكاثون IEEE للتقنيات المستدامة 2025. صممت وبنيت نموذجًا أوليًا يعالج تحديات الاستدامة الحقيقية باستخدام أحدث التقنيات —!حصل على تقدير حكام IEEE للابتكار والتنفيذ التقني وإمكانية التأثير.',
    },
    year: 2025,
    category: 'award',
    media: [
      publicUrl('/images/ZaidAbuAlshaar1.jpg'),
      publicUrl('/images/ZaidAbuAlshaar2.JPG'),
      publicUrl('/images/Gemini_Generated_Image_cinj1ocinj1ocinj-Photoroom.png'),
    ],
  },
  {
    id: 'award-palm-dates',
    title: { en: '1st Place — Best Innovation Award (Palm & Dates Sector)', ar: 'المركز الأول — جائزة أفضل ابتكار (قطاع النخيل والتمور)' },
    issuer: { en: 'National Competition, Jordan', ar: 'مسابقة وطنية، الأردن' },
    description: {
      en: 'Awarded 1st place for the Best Innovation in the Palm & Dates sector at a national competition in Jordan, 2025. Developed PalmGuard — an AI-powered pest detection system enhanced with augmented reality, providing farmers with a practical, scalable tool to combat Red Palm Weevil infestations before they cause irreversible damage.',
      ar: 'حصلت على المركز الأول لأفضل ابتكار في قطاع النخيل والتمور في مسابقة وطنية بالأردن 2025. طوّرت حارس النخيل — نظام كشف آفات مدعوم بالذكاء الاصطناعي ومعزز بالواقع المعزز، يوفر للمزارعين أداة عملية وقابلة للتوسع لمكافحة سوسة النخيل الحمراء قبل أن تسبب أضرارًا لا رجعة فيها.',
    },
    year: 2025,
    category: 'award',
    media: [
      publicUrl('/images/ZaidAbuAlshaar4.JPG'),
      publicUrl('/images/ZaidAbuAlshaar3.JPG'),
      publicUrl('/images/WhatsApp Image 2025-12-28 at 7.22.37 PM.jpeg'),
      publicUrl('/images/IMG_2026012419023511.MP4'),
      publicUrl('/images/IMG_5421.jpg'),
    ],
  },
  {
    id: 'award-data-cleaning',
    title: { en: '2nd Place — Data Cleaning Competition', ar: 'المركز الثاني — مسابقة تنظيف البيانات' },
    issuer: { en: 'IEEE, Jordan', ar: 'IEEE، الأردن' },
    description: {
      en: 'Secured 2nd place in the IEEE Data Cleaning Competition 2025, demonstrating advanced skills in data wrangling, anomaly detection, and automated preprocessing pipelines under competitive time pressure — standing out among dozens of participating teams.',
      ar: 'حصلت على المركز الثاني في مسابقة IEEE لتنظيف البيانات 2025، مستعرضًا مهارات متقدمة في معالجة البيانات وكشف الشذوذ وخطوط المعالجة الآلية تحت ضغط الوقت التنافسي 2025— متميزًا بين عشرات الفرق المشاركة.',
    },
    year: 2025,
    category: 'award',
    media: [
      publicUrl('/images/IMG_202601241902351.JPG'),
      publicUrl('/images/IMG_2026012419023512.MP4'),
    ],
  },

  // ─── Certifications ───
  {
    id: 'cert-wordpress',
    title: { en: 'WordPress Development', ar: 'تطوير ووردبريس' },
    issuer: { en: 'Udemy', ar: 'يوديمي' },
    description: {
      en: 'Comprehensive WordPress development course covering theme building, plugin development, and site optimization.',
      ar: 'دورة شاملة في تطوير ووردبريس تغطي بناء القوالب وتطوير الإضافات وتحسين المواقع.',
    },
    year: 2024,
    category: 'certification',
  },
  {
    id: 'cert-unity',
    title: { en: 'Unity Game Development', ar: 'تطوير الألعاب بـ Unity' },
    issuer: { en: 'Online Course', ar: 'دورة إلكترونية' },
    description: {
      en: 'Game development course covering Unity engine, C# scripting, 3D environments, and interactive gameplay mechanics.',
      ar: 'دورة تطوير ألعاب تغطي محرك Unity وبرمجة C# والبيئات ثلاثية الأبعاد وآليات اللعب التفاعلية.',
    },
    year: 2024,
    category: 'certification',
  },
  {
    id: 'cert-english-b2',
    title: { en: 'English Proficiency — B2 Level', ar: 'إتقان اللغة الإنجليزية — مستوى B2' },
    issuer: { en: 'Language Certification', ar: 'شهادة لغة' },
    description: {
      en: 'Certified English language proficiency at B2 (Upper-Intermediate) level, enabling professional communication in global projects.',
      ar: 'شهادة إتقان اللغة الإنجليزية بمستوى B2 (فوق المتوسط)، تمكّن من التواصل المهني في المشاريع العالمية.',
    },
    year: 2024,
    category: 'certification',
  },
  {
    id: 'cert-toefl',
    title: { en: 'TOEFL Preparation', ar: 'التحضير لاختبار التوفل' },
    issuer: { en: 'Self-study Program', ar: 'برنامج دراسة ذاتية' },
    description: {
      en: 'Completed intensive TOEFL preparation covering academic reading, writing, listening, and speaking skills.',
      ar: 'إتمام التحضير المكثف لاختبار التوفل شاملاً مهارات القراءة والكتابة والاستماع والتحدث الأكاديمية.',
    },
    year: 2024,
    category: 'certification',
  },
  {
    id: 'cert-selflearn',
    title: { en: 'Self-Learning — Software Dev & Digital Arts', ar: 'تعلّم ذاتي — تطوير البرمجيات والفنون الرقمية' },
    issuer: { en: 'Self-directed Learning', ar: 'تعلّم ذاتي' },
    description: {
      en: 'Continuous self-learning in modern software development frameworks, AI tools, and digital arts including UI/UX design and 3D modeling.',
      ar: 'تعلّم ذاتي مستمر في أطر تطوير البرمجيات الحديثة وأدوات الذكاء الاصطناعي والفنون الرقمية بما في ذلك تصميم واجهات المستخدم والنمذجة ثلاثية الأبعاد.',
    },
    year: 2024,
    category: 'certification',
  },

  // ─── Experience Highlights ───
  {
    id: 'exp-ieee',
    title: { en: 'IEEE Student Branch Vice Chair', ar: 'نائب رئيس فرع IEEE الطلابي' },
    issuer: { en: 'University of Petra', ar: 'جامعة البتراء' },
    description: {
      en: 'Leading technical initiatives at the IEEE Student Branch, organizing hackathons and workshops, mentoring peers in web development and AI.',
      ar: 'قيادة المبادرات التقنية في فرع IEEE الطلابي، تنظيم الهاكاثونات وورش العمل، وإرشاد الزملاء في تطوير الويب والذكاء الاصطناعي.',
    },
    year: 2025,
    category: 'experience',
  },
  {
    id: 'exp-vr-club',
    title: { en: 'Founding Member — VR & Gaming Club', ar: 'عضو مؤسس — نادي الواقع الافتراضي والألعاب' },
    issuer: { en: 'University of Petra', ar: 'جامعة البتراء' },
    description: {
      en: 'Co-founded the VR & Gaming Club at the University of Petra, building a community for immersive technology enthusiasts and game developers.',
      ar: 'شريك مؤسس لنادي الواقع الافتراضي والألعاب في جامعة البتراء، بناء مجتمع لعشاق التقنيات الغامرة ومطوري الألعاب.',
    },
    year: 2024,
    category: 'experience',
  },
  {
    id: 'exp-freelance',
    title: { en: 'Freelance Web & AI Developer', ar: 'مطوّر ويب وذكاء اصطناعي مستقل' },
    issuer: { en: 'Self-employed', ar: 'عمل حر' },
    description: {
      en: 'Delivering end-to-end web applications, AI integration solutions, and NFC smart card systems for clients across Jordan and the region since 2025.',
      ar: 'تقديم تطبيقات ويب متكاملة وحلول تكامل ذكاء اصطناعي وأنظمة بطاقات NFC الذكية لعملاء في الأردن والمنطقة منذ 2025.',
    },
    year: 2025,
    category: 'experience',
  },
  {
    id: 'exp-bmb-stc',
    title: { en: 'AR/VR Developer & AI Intern — BMB Group (STC Project)', ar: 'مطوّر واقع معزز ومتدرب ذكاء اصطناعي — مجموعة BMB (مشروع STC)' },
    issuer: { en: 'BMB Group / STC Saudi Arabia', ar: 'مجموعة BMB / STC السعودية' },
    description: {
      en: 'Developed an enterprise-grade AI & AR solution for STC Saudi Arabia during an internship at BMB Group. Built intelligent automation integrated with immersive AR interfaces. Also provided web support using Figma, HTML, CSS, and JavaScript.',
      ar: 'تطوير حل ذكاء اصطناعي وواقع معزز بمستوى المؤسسات لشركة STC السعودية خلال تدريب في مجموعة BMB. بناء أتمتة ذكية مدمجة مع واجهات واقع معزز غامرة. تقديم دعم ويب باستخدام Figma و HTML و CSS و JavaScript.',
    },
    year: 2025,
    category: 'experience',
  },
];

export function getAchievementsByCategory(category: Achievement['category']) {
  return achievements.filter((a) => a.category === category);
}
