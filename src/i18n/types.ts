interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface Dictionary {
  nav: {
    home: string;
    services: string;
    portfolio: string;
    about: string;
    achievements: string;
    contact: string;
  };
  hero: {
    greeting: string;
    subtitle: string;
    description: string;
    cta: string;
    ctaSecondary: string;
  };
  services: {
    title: string;
    subtitle: string;
    description: string;
    items: ServiceItem[];
  };
  portfolio: {
    title: string;
    subtitle: string;
    description: string;
    viewProject: string;
    viewAll: string;
    allProjects: string;
    filterAll: string;
    backToPortfolio: string;
    techStack: string;
    gallery: string;
    links: string;
    viewGithub: string;
    viewLive: string;
    noImage: string;
  };
  about: {
    title: string;
    subtitle: string;
    bio: string[];
    skills: string;
    experience: string;
    education: string;
    downloadResume: string;
  };
  achievements: {
    title: string;
    subtitle: string;
    description: string;
    viewCredential: string;
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      error: string;
    };
    info: {
      email: string;
      phone: string;
      location: string;
      social: string;
    };
  };
  footer: {
    copyright: string;
    builtWith: string;
  };
  common: {
    learnMore: string;
    readMore: string;
    backToTop: string;
    loading: string;
    language: string;
    theme: {
      light: string;
      dark: string;
      system: string;
    };
  };
  ai: {
    buttonLabel: string;
    comingSoon: string;
    modalTitle: string;
    modalDescription: string;
  };
  seo: {
    homeTitle: string;
    servicesTitle: string;
    portfolioTitle: string;
    aboutTitle: string;
    achievementsTitle: string;
    contactTitle: string;
  };
}
