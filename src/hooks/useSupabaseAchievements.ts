import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { achievements as staticData, type Achievement } from '@/content/achievements';
import type { AchievementRow } from '@/lib/adminTypes';

const toAchievement = (row: AchievementRow & { id: string }): Achievement => ({
  id: row.id,
  title: { en: row.title_en, ar: row.title_ar },
  issuer: { en: row.issuer_en, ar: row.issuer_ar },
  description: { en: row.description_en, ar: row.description_ar },
  year: row.year,
  category: row.category,
  media: row.image_urls?.length ? row.image_urls : undefined,
  rank: row.rank_en || row.rank_ar ? { en: row.rank_en, ar: row.rank_ar } : undefined,
  location:
    row.location_en || row.location_ar
      ? { en: row.location_en, ar: row.location_ar }
      : undefined,
  url: row.url || undefined,
  eventDate: row.event_date || undefined,
});

/**
 * Returns achievements/competitions, starting from the bundled static data
 * (so the page renders instantly and never breaks if Supabase is down) and
 * upgrading to live database content + realtime updates when available.
 */
export const useSupabaseAchievements = () => {
  const [data, setData] = useState<Achievement[]>(staticData);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const { data: rows, error } = await supabase
        .from('achievements')
        .select('*')
        .order('order_index', { ascending: true })
        .order('year', { ascending: false });

      if (!active) return;
      if (!error && rows && rows.length > 0) {
        setData(rows.map((r) => toAchievement(r as AchievementRow & { id: string })));
      }
    };

    load();

    // Live updates: refetch whenever the admin adds/edits/removes an item.
    const channel = supabase
      .channel('public:achievements')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'achievements' }, load)
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return data;
};
