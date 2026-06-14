import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { projects as staticData, type Project } from '@/content/projects';
import type { ProjectRow } from '@/lib/adminTypes';

const toProject = (row: ProjectRow & { id: string }): Project => ({
  slug: row.slug,
  title: { en: row.title_en, ar: row.title_ar },
  description: { en: row.description_en, ar: row.description_ar },
  summary: { en: row.summary_en, ar: row.summary_ar },
  tags: row.tags ?? [],
  techStack: row.tech_stack ?? [],
  role: { en: row.role_en, ar: row.role_ar },
  image: row.image_urls?.[0] ?? '',
  featured: row.featured,
  comingSoon: row.coming_soon || undefined,
  contactForInfo: row.contact_for_info || undefined,
  github: row.github_url || undefined,
  live: row.demo_url || undefined,
});

/**
 * Returns projects with the same instant static fallback + live database
 * upgrade + realtime pattern as achievements. Also derives the tag list
 * from whatever data is currently in use.
 */
export const useSupabaseProjects = () => {
  const [data, setData] = useState<Project[]>(staticData);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const { data: rows, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (!active) return;
      if (!error && rows && rows.length > 0) {
        setData(rows.map((r) => toProject(r as ProjectRow & { id: string })));
      }
    };

    load();

    const channel = supabase
      .channel('public:projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, load)
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const tags = ['All', ...Array.from(new Set(data.flatMap((p) => p.tags)))];

  return { projects: data, tags };
};
