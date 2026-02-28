// Supabase row shapes (what comes back from / goes into the DB)

export interface AchievementRow {
  id?: string;
  title_en: string;
  title_ar: string;
  issuer_en: string;
  issuer_ar: string;
  description_en: string;
  description_ar: string;
  year: number;
  category: 'award' | 'certification' | 'experience';
  image_urls: string[];
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

export interface SiteContentRow {
  key: string;
  value_en: string;
  value_ar: string;
}
