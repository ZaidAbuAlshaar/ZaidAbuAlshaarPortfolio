import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { projects as staticProjects } from '@/content/projects';
import type { Project } from '@/content/projects';
import type { ProjectRow } from '@/lib/adminTypes';
import { publicUrl } from '@/lib/assets';

const toStaticShape = (row: ProjectRow & { id: string }): Project => ({
  slug: row.slug,
  title: { en: row.title_en, ar: row.title_ar },
  description: { en: row.description_en, ar: row.description_ar },
  summary: { en: row.summary_en, ar: row.summary_ar },
  tags: row.tags ?? [],
  techStack: row.tech_stack ?? [],
  role: { en: row.role_en, ar: row.role_ar },
  // Use first uploaded image, or fall back to placeholder
  image: row.image_urls?.[0] ?? publicUrl('/images/palmGuard.png'),
  featured: row.featured,
  comingSoon: row.coming_soon,
  contactForInfo: row.contact_for_info,
  github: row.github_url || undefined,
  live: row.demo_url || undefined,
});

export const useSupabaseProjects = () => {
  // Start with static data so page renders instantly
  const [data, setData] = useState<Project[]>(staticProjects);

  useEffect(() => {
    (async () => {
      const { data: rows, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && rows && rows.length > 0) {
        setData(rows.map(toStaticShape));
      }
      // On error or empty table → keep static data
    })();
  }, []);

  const allTags = ['All', ...Array.from(new Set(data.flatMap((p) => p.tags)))];

  return { data, allTags };
};
