import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { achievements as staticData } from '@/content/achievements';
import type { Achievement } from '@/content/achievements';
import type { AchievementRow } from '@/lib/adminTypes';

const toStaticShape = (row: AchievementRow & { id: string }): Achievement => ({
  id: row.id,
  title: { en: row.title_en, ar: row.title_ar },
  issuer: { en: row.issuer_en, ar: row.issuer_ar },
  description: { en: row.description_en, ar: row.description_ar },
  year: row.year,
  category: row.category,
  media: row.image_urls?.length ? row.image_urls : undefined,
});

export const useSupabaseAchievements = () => {
  // Start with static data so page renders instantly
  const [data, setData] = useState<Achievement[]>(staticData);

  useEffect(() => {
    (async () => {
      const { data: rows, error } = await supabase
        .from('achievements')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && rows && rows.length > 0) {
        setData(rows.map(toStaticShape));
      }
      // On error or empty table → keep static data
    })();
  }, []);

  return data;
};
