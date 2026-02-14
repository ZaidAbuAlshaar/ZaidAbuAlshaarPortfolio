import type { Bilingual } from './site';

export interface Service {
  id: string;
  icon: 'Code' | 'Brain' | 'Palette' | 'Glasses';
  title: Bilingual;
  desc: Bilingual;
  linkedProjectSlugs: string[];
}

export const services: Service[] = [
  {
    id: 'fullstack',
    icon: 'Code',
    title: { en: 'Full-Stack Web Apps', ar: 'تطبيقات ويب متكاملة' },
    desc: {
      en: 'End-to-end web applications built with React, Next.js, Node.js, and modern cloud infrastructure — fast, scalable, and production-ready.',
      ar: 'تطبيقات ويب شاملة مبنية بـ React و Next.js و Node.js وبنية سحابية حديثة — سريعة وقابلة للتوسع وجاهزة للإنتاج.',
    },
    linkedProjectSlugs: ['VR-ARClub', 'nfc-project', 'JavaWithZaid'],
  },
  {
    id: 'ai',
    icon: 'Brain',
    title: { en: 'AI Integration & Agents', ar: 'تكامل الذكاء الاصطناعي والوكلاء' },
    desc: {
      en: 'Smart chatbots, AI-powered automation, LangChain agents, and OpenAI API integrations that transform how your business operates.',
      ar: 'روبوتات محادثة ذكية وأتمتة مدعومة بالذكاء الاصطناعي ووكلاء LangChain وتكامل OpenAI API لتحويل طريقة عمل أعمالك.',
    },
    linkedProjectSlugs: ['UniAi', 'redPalmWeevil', 'PythonWithZaid'],
  },
  {
    id: 'uiux',
    icon: 'Palette',
    title: { en: 'UI/UX Design', ar: 'تصميم واجهات المستخدم' },
    desc: {
      en: 'Beautiful, intuitive interfaces designed in Figma and built with pixel-perfect precision — responsive, accessible, and user-centered.',
      ar: 'واجهات جميلة وبديهية مصممة في Figma ومبنية بدقة متناهية — متجاوبة وسهلة الوصول ومتمحورة حول المستخدم.',
    },
    linkedProjectSlugs: ['HealthyCalculator', 'HealthyTimer', 'VR-ARClub'],
  },
  {
    id: 'xr',
    icon: 'Glasses',
    title: { en: 'XR / 3D Experiences', ar: 'تجارب الواقع الممتد والأبعاد الثلاثية' },
    desc: {
      en: 'Immersive AR/VR applications built with Unity, Three.js, and WebXR — from virtual showrooms to interactive 3D product experiences.',
      ar: 'تطبيقات واقع معزز وافتراضي مبنية بـ Unity و Three.js و WebXR — من صالات العرض الافتراضية إلى تجارب المنتجات التفاعلية ثلاثية الأبعاد.',
    },
    linkedProjectSlugs: ['stc-ai-ar', 'redPalmWeevil', 'VR-ARClub'],
  },
];
