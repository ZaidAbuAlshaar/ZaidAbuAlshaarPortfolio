import type { Dictionary } from "../types";

const en: Dictionary = {
  nav: {
    home: "Home",
    services: "Services",
    portfolio: "Portfolio",
    about: "About",
    achievements: "Achievements",
    contact: "Contact",
  },
  hero: {
    greeting: "Hello, I'm",
    subtitle: "Full-Stack Developer & AI Engineer",
    description:
      "Building intelligent digital experiences with modern web technologies, AI/ML, and extended reality.",
    cta: "View My Work",
    ctaSecondary: "Get In Touch",
  },
  services: {
    title: "Services",
    subtitle: "What I Offer",
    description: "Delivering end-to-end digital solutions powered by modern technology.",
    items: [
      {
        title: "Full-Stack Web Development",
        description:
          "Building responsive, performant web applications using React, Next.js, Node.js, and modern cloud infrastructure.",
        icon: "code",
      },
      {
        title: "AI & Machine Learning",
        description:
          "Developing intelligent systems including NLP, computer vision, predictive analytics, and custom ML pipelines.",
        icon: "brain",
      },
      {
        title: "Extended Reality (XR)",
        description:
          "Creating immersive VR/AR experiences for training, visualization, and interactive storytelling.",
        icon: "glasses",
      },
      {
        title: "Mobile App Development",
        description:
          "Cross-platform mobile applications with React Native, delivering native performance on iOS and Android.",
        icon: "smartphone",
      },
      {
        title: "API Design & Integration",
        description:
          "Designing robust RESTful and GraphQL APIs, third-party integrations, and microservice architectures.",
        icon: "plug",
      },
      {
        title: "Technical Consulting",
        description:
          "Strategic guidance on technology choices, architecture design, and digital transformation roadmaps.",
        icon: "lightbulb",
      },
    ],
  },
  portfolio: {
    title: "Portfolio",
    subtitle: "Featured Projects",
    description: "A selection of projects showcasing my expertise across different domains.",
    viewProject: "View Project",
    viewAll: "View All Projects",
    allProjects: "All Projects",
    filterAll: "All",
    backToPortfolio: "Back to Portfolio",
    techStack: "Tech Stack",
    gallery: "Gallery",
    links: "Links",
    viewGithub: "View on GitHub",
    viewLive: "Live Demo",
    noImage: "Image coming soon",
  },
  about: {
    title: "About Me",
    subtitle: "Get to Know Me",
    bio: [
      "I am a passionate full-stack developer and AI engineer based in Amman, Jordan. With a strong foundation in computer science and a drive for innovation, I specialize in building intelligent digital solutions that bridge the gap between cutting-edge technology and real-world applications.",
      "My journey in tech spans across web development, artificial intelligence, and extended reality. I believe in writing clean, maintainable code and creating user experiences that are both functional and delightful.",
      "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers in the local tech community.",
    ],
    skills: "Skills & Technologies",
    experience: "Experience",
    education: "Education",
    downloadResume: "Download Resume",
  },
  achievements: {
    title: "Achievements",
    subtitle: "Milestones & Recognition",
    description: "Certifications, courses, competitions, and awards that mark my professional journey.",
    viewCredential: "View Credential",
  },
  contact: {
    title: "Contact",
    subtitle: "Let's Work Together",
    description: "Have a project in mind or want to collaborate? I'd love to hear from you.",
    form: {
      name: "Your Name",
      email: "Your Email",
      subject: "Subject",
      message: "Your Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully! I'll get back to you soon.",
      error: "Something went wrong. Please try again.",
    },
    info: {
      email: "Email",
      phone: "Phone",
      location: "Location",
      social: "Social",
    },
  },
  footer: {
    copyright: "All rights reserved.",
    builtWith: "Built with Next.js & Tailwind CSS",
  },
  common: {
    learnMore: "Learn More",
    readMore: "Read More",
    backToTop: "Back to Top",
    loading: "Loading...",
    language: "العربية",
    theme: {
      light: "Light",
      dark: "Dark",
      system: "System",
    },
  },
  ai: {
    buttonLabel: "AI Assistant",
    comingSoon: "Coming Soon",
    modalTitle: "AI Assistant",
    modalDescription:
      "An intelligent assistant to help you navigate my portfolio and learn more about my work. This feature is currently under development.",
  },
  seo: {
    homeTitle: "Full-Stack Developer & AI Engineer",
    servicesTitle: "Services",
    portfolioTitle: "Portfolio",
    aboutTitle: "About",
    achievementsTitle: "Achievements",
    contactTitle: "Contact",
  },
};

export default en;
export type { Dictionary } from "../types";
