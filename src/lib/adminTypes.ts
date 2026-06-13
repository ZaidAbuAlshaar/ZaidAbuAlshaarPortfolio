// Supabase row shapes (what comes back from / goes into the database).

export interface AchievementRow {
  id?: string;
  title_en: string;
  title_ar: string;
  issuer_en: string;
  issuer_ar: string;
  description_en: string;
  description_ar: string;
  rank_en: string;
  rank_ar: string;
  year: number;
  event_date: string | null;
  location_en: string;
  location_ar: string;
  url: string;
  category: 'award' | 'certification' | 'experience';
  image_urls: string[];
  featured: boolean;
  order_index: number;
}

export interface ProjectRow {
  id?: string;
  slug: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  summary_en: string;
  summary_ar: string;
  tags: string[];
  tech_stack: string[];
  role_en: string;
  role_ar: string;
  image_urls: string[];
  featured: boolean;
  coming_soon: boolean;
  contact_for_info: boolean;
  github_url: string;
  demo_url: string;
  order_index: number;
}

// Blank templates for the admin "create new" forms.
export const emptyAchievement: AchievementRow = {
  title_en: '',
  title_ar: '',
  issuer_en: '',
  issuer_ar: '',
  description_en: '',
  description_ar: '',
  rank_en: '',
  rank_ar: '',
  year: new Date().getFullYear(),
  event_date: null,
  location_en: '',
  location_ar: '',
  url: '',
  category: 'award',
  image_urls: [],
  featured: false,
  order_index: 0,
};

export const emptyProject: ProjectRow = {
  slug: '',
  title_en: '',
  title_ar: '',
  description_en: '',
  description_ar: '',
  summary_en: '',
  summary_ar: '',
  tags: [],
  tech_stack: [],
  role_en: '',
  role_ar: '',
  image_urls: [],
  featured: false,
  coming_soon: false,
  contact_for_info: false,
  github_url: '',
  demo_url: '',
  order_index: 0,
};
