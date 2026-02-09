export interface Achievement {
  id: string;
  type: "certification" | "course" | "competition" | "award";
  title: { en: string; ar: string };
  issuer: { en: string; ar: string };
  date: string;
  description: { en: string; ar: string };
  credential?: string;
  image?: string;
}

export const achievements: Achievement[] = [
  {
    id: "cert-aws-solutions-architect",
    type: "certification",
    title: {
      en: "AWS Solutions Architect – Associate",
      ar: "مهندس حلول AWS – مشارك",
    },
    issuer: {
      en: "Amazon Web Services",
      ar: "خدمات أمازون ويب",
    },
    date: "2024-01",
    description: {
      en: "Validated expertise in designing distributed systems and architectures on AWS cloud platform.",
      ar: "خبرة معتمدة في تصميم الأنظمة الموزعة والبنى على منصة AWS السحابية.",
    },
    credential: "PLACEHOLDER_CREDENTIAL_URL",
    image: "/placeholders/cert-1.png",
  },
  {
    id: "cert-tensorflow-developer",
    type: "certification",
    title: {
      en: "TensorFlow Developer Certificate",
      ar: "شهادة مطور TensorFlow",
    },
    issuer: {
      en: "Google",
      ar: "جوجل",
    },
    date: "2023-09",
    description: {
      en: "Demonstrated proficiency in building and training neural networks using TensorFlow.",
      ar: "إثبات الكفاءة في بناء وتدريب الشبكات العصبية باستخدام TensorFlow.",
    },
    credential: "PLACEHOLDER_CREDENTIAL_URL",
    image: "/placeholders/cert-2.png",
  },
  {
    id: "course-deep-learning-specialization",
    type: "course",
    title: {
      en: "Deep Learning Specialization",
      ar: "تخصص التعلم العميق",
    },
    issuer: {
      en: "Coursera – DeepLearning.AI",
      ar: "كورسيرا – DeepLearning.AI",
    },
    date: "2023-06",
    description: {
      en: "Completed 5-course specialization covering neural networks, optimization, CNNs, RNNs, and sequence models.",
      ar: "إكمال تخصص من 5 دورات يغطي الشبكات العصبية والتحسين و CNNs و RNNs ونماذج التسلسل.",
    },
    credential: "PLACEHOLDER_CREDENTIAL_URL",
    image: "/placeholders/course-1.png",
  },
  {
    id: "course-fullstack-open",
    type: "course",
    title: {
      en: "Full Stack Open",
      ar: "تطوير الويب المتكامل المفتوح",
    },
    issuer: {
      en: "University of Helsinki",
      ar: "جامعة هلسنكي",
    },
    date: "2023-03",
    description: {
      en: "Comprehensive modern web development course covering React, Node.js, GraphQL, TypeScript, and CI/CD.",
      ar: "دورة شاملة في تطوير الويب الحديث تغطي React و Node.js و GraphQL و TypeScript و CI/CD.",
    },
    credential: "PLACEHOLDER_CREDENTIAL_URL",
    image: "/placeholders/course-2.png",
  },
  {
    id: "competition-hackathon-winner",
    type: "competition",
    title: {
      en: "National AI Hackathon – 1st Place",
      ar: "هاكاثون الذكاء الاصطناعي الوطني – المركز الأول",
    },
    issuer: {
      en: "Tech Innovation Hub",
      ar: "مركز الابتكار التقني",
    },
    date: "2024-03",
    description: {
      en: "Won first place for developing an AI-driven solution for healthcare accessibility in underserved communities.",
      ar: "الفوز بالمركز الأول لتطوير حل مدعوم بالذكاء الاصطناعي لتحسين الوصول للرعاية الصحية في المجتمعات المحرومة.",
    },
    image: "/placeholders/competition-1.png",
  },
  {
    id: "competition-coding-challenge",
    type: "competition",
    title: {
      en: "Regional Coding Championship – Top 10",
      ar: "بطولة البرمجة الإقليمية – أفضل 10",
    },
    issuer: {
      en: "ACM ICPC Regional",
      ar: "ACM ICPC الإقليمية",
    },
    date: "2023-11",
    description: {
      en: "Placed in the top 10 among 200+ teams in the regional competitive programming championship.",
      ar: "الحصول على مركز ضمن أفضل 10 من بين أكثر من 200 فريق في بطولة البرمجة التنافسية الإقليمية.",
    },
    image: "/placeholders/competition-2.png",
  },
  {
    id: "award-innovation-excellence",
    type: "award",
    title: {
      en: "Innovation Excellence Award",
      ar: "جائزة التميز في الابتكار",
    },
    issuer: {
      en: "University of Jordan",
      ar: "الجامعة الأردنية",
    },
    date: "2024-06",
    description: {
      en: "Recognized for outstanding innovation in capstone project combining AI with extended reality applications.",
      ar: "تكريم للابتكار المتميز في مشروع التخرج الذي يجمع بين الذكاء الاصطناعي وتطبيقات الواقع الممتد.",
    },
    image: "/placeholders/award-1.png",
  },
  {
    id: "award-open-source-contributor",
    type: "award",
    title: {
      en: "Open Source Contributor of the Year",
      ar: "مساهم العام في المصادر المفتوحة",
    },
    issuer: {
      en: "Local Developer Community",
      ar: "مجتمع المطورين المحلي",
    },
    date: "2024-02",
    description: {
      en: "Awarded for significant contributions to open-source projects in the local developer community.",
      ar: "جائزة للمساهمات الكبيرة في مشاريع المصادر المفتوحة في مجتمع المطورين المحلي.",
    },
    image: "/placeholders/award-2.png",
  },
];

export const achievementTypeLabels: Record<Achievement["type"], { en: string; ar: string }> = {
  certification: { en: "Certifications", ar: "الشهادات" },
  course: { en: "Courses", ar: "الدورات" },
  competition: { en: "Competitions", ar: "المسابقات" },
  award: { en: "Awards & Trophies", ar: "الجوائز والكؤوس" },
};

export const achievementTypeIcons: Record<Achievement["type"], string> = {
  certification: "award",
  course: "book-open",
  competition: "trophy",
  award: "medal",
};
