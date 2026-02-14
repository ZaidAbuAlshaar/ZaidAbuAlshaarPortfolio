export interface Achievement {
  id: string;
  title: { en: string; ar: string };
  issuer: { en: string; ar: string };
  description: { en: string; ar: string };
  year: number;
  category: 'award' | 'certification' | 'experience';
}

export const achievements: Achievement[] = [
  // ─── Awards & Competitions ───
  {
    id: 'award-ieee-hackathon',
    title: { en: '1st Place — Sustainable Tech Hackathon', ar: 'المركز الأول — هاكاثون التقنيات المستدامة' },
    issuer: { en: 'IEEE, Jordan', ar: 'IEEE، الأردن' },
    description: {
      en: 'Won first place at the IEEE Sustainable Technology Hackathon 2025 in Jordan, developing an innovative tech solution addressing sustainability challenges.',
      ar: 'فزت بالمركز الأول في هاكاثون IEEE للتقنيات المستدامة 2025 في الأردن، بتطوير حل تقني مبتكر يعالج تحديات الاستدامة.',
    },
    year: 2025,
    category: 'award',
  },
  {
    id: 'award-palm-dates',
    title: { en: '1st Place — Best Innovation Award (Palm & Dates Sector)', ar: 'المركز الأول — جائزة أفضل ابتكار (قطاع النخيل والتمور)' },
    issuer: { en: 'National Competition, Jordan', ar: 'مسابقة وطنية، الأردن' },
    description: {
      en: 'Awarded 1st place for the Best Innovation in the Palm & Dates sector at a national competition in Jordan, 2025.',
      ar: 'حصلت على المركز الأول لأفضل ابتكار في قطاع النخيل والتمور في مسابقة وطنية بالأردن، 2025.',
    },
    year: 2025,
    category: 'award',
  },
  {
    id: 'award-data-cleaning',
    title: { en: '2nd Place — Data Cleaning Competition', ar: 'المركز الثاني — مسابقة تنظيف البيانات' },
    issuer: { en: 'IEEE, Jordan', ar: 'IEEE، الأردن' },
    description: {
      en: 'Secured 2nd place in the IEEE Data Cleaning Competition 2025, showcasing advanced data wrangling and analysis skills.',
      ar: 'حصلت على المركز الثاني في مسابقة IEEE لتنظيف البيانات 2025، مستعرضًا مهارات متقدمة في معالجة البيانات وتحليلها.',
    },
    year: 2025,
    category: 'award',
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
];

export function getAchievementsByCategory(category: Achievement['category']) {
  return achievements.filter((a) => a.category === category);
}
