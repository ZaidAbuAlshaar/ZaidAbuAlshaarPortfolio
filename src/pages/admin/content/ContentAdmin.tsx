import { useState, useEffect } from 'react';
import { FileText, Loader2, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { SiteContentRow } from '@/lib/adminTypes';
import { siteConfig } from '@/content/site';

// ── predefined content sections ───────────────────────────────

const SECTIONS: {
  key: string;
  label: string;
  hint: string;
  multiline?: boolean;
  rows?: number;
}[] = [
  {
    key: 'tagline',
    label: 'Tagline (home hero)',
    hint: 'Short one-liner shown below your name on the home page.',
  },
  {
    key: 'bio_1',
    label: 'Bio — Paragraph 1 (About page)',
    hint: 'First paragraph of your bio.',
    multiline: true,
    rows: 4,
  },
  {
    key: 'bio_2',
    label: 'Bio — Paragraph 2 (About page)',
    hint: 'Second paragraph of your bio.',
    multiline: true,
    rows: 4,
  },
  {
    key: 'bio_3',
    label: 'Bio — Paragraph 3 (About page)',
    hint: 'Third paragraph of your bio.',
    multiline: true,
    rows: 4,
  },
  {
    key: 'skills',
    label: 'Skills (comma-separated)',
    hint: 'List of skills shown on the About page. Separate each skill with a comma.',
    multiline: true,
    rows: 3,
  },
];

// Static fallback values per key
const defaults: Record<string, { en: string; ar: string }> = {
  tagline: { en: siteConfig.tagline.en, ar: siteConfig.tagline.ar },
  bio_1: { en: siteConfig.bio.en[0], ar: siteConfig.bio.ar[0] },
  bio_2: { en: siteConfig.bio.en[1], ar: siteConfig.bio.ar[1] },
  bio_3: { en: siteConfig.bio.en[2], ar: siteConfig.bio.ar[2] },
  skills: {
    en: siteConfig.skills.join(', '),
    ar: siteConfig.skills.join(', '),
  },
};

// ── input helpers ─────────────────────────────────────────────

const inp =
  'w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors placeholder-zinc-600';

// ── component ─────────────────────────────────────────────────

const ContentAdmin = () => {
  // Map of key → current values
  const [rows, setRows] = useState<Record<string, { en: string; ar: string }>>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('site_content').select('*');
      if (data && data.length > 0) {
        const map: Record<string, { en: string; ar: string }> = { ...defaults };
        (data as SiteContentRow[]).forEach((row) => {
          map[row.key] = { en: row.value_en, ar: row.value_ar };
        });
        setRows(map);
      }
      setLoading(false);
    })();
  }, []);

  const handleChange = (key: string, lang: 'en' | 'ar', val: string) => {
    setRows((prev) => ({ ...prev, [key]: { ...prev[key], [lang]: val } }));
  };

  const handleSave = async (key: string) => {
    setSaving(key);
    const value = rows[key] ?? { en: '', ar: '' };

    await supabase
      .from('site_content')
      .upsert({ key, value_en: value.en, value_ar: value.ar, updated_at: new Date().toISOString() }, { onConflict: 'key' });

    setSaving(null);
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  };

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <FileText className="w-5 h-5 text-yellow-400" />
        <h1 className="text-xl font-semibold text-white">Content</h1>
      </div>
      <p className="text-zinc-500 text-sm mb-8">
        Edit your bio, tagline, and skills. Each section saves independently.
        Changes here override the static files — the site keeps the static defaults until you save a section.
      </p>

      {loading ? (
        <div className="flex items-center gap-2 text-zinc-500 py-8">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      ) : (
        <div className="space-y-8">
          {SECTIONS.map(({ key, label, hint, multiline, rows: textRows }) => {
            const val = rows[key] ?? { en: '', ar: '' };
            const isSaving = saving === key;
            const isSaved = saved === key;

            return (
              <div key={key} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                <div>
                  <h2 className="text-sm font-semibold text-white">{label}</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">{hint}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* English */}
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">English</label>
                    {multiline ? (
                      <textarea
                        className={inp}
                        rows={textRows ?? 3}
                        value={val.en}
                        onChange={(e) => handleChange(key, 'en', e.target.value)}
                      />
                    ) : (
                      <input
                        className={inp}
                        value={val.en}
                        onChange={(e) => handleChange(key, 'en', e.target.value)}
                      />
                    )}
                  </div>

                  {/* Arabic */}
                  <div dir="rtl">
                    <label className="block text-xs text-zinc-400 mb-1">العربية</label>
                    {multiline ? (
                      <textarea
                        className={inp}
                        rows={textRows ?? 3}
                        value={val.ar}
                        onChange={(e) => handleChange(key, 'ar', e.target.value)}
                        dir="rtl"
                      />
                    ) : (
                      <input
                        className={inp}
                        value={val.ar}
                        onChange={(e) => handleChange(key, 'ar', e.target.value)}
                        dir="rtl"
                      />
                    )}
                  </div>
                </div>

                {/* Save button */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleSave(key)}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-zinc-900 font-semibold rounded-lg text-sm transition-colors"
                  >
                    {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    {isSaving ? 'Saving…' : 'Save'}
                  </button>
                  {isSaved && (
                    <span className="flex items-center gap-1.5 text-green-400 text-sm">
                      <Check className="w-4 h-4" /> Saved
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContentAdmin;
