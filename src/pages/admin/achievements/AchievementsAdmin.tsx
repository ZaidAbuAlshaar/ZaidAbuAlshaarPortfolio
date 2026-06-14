import { useEffect, useState } from 'react';
import {
  Plus, Pencil, Trash2, ArrowLeft, Loader2, Save, Trophy, GraduationCap, Briefcase, Star,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { emptyAchievement, type AchievementRow } from '@/lib/adminTypes';
import ImageUploader from '@/components/admin/ImageUploader';
import { inputCls, Field, Bilingual } from '@/components/admin/fields';

type Row = AchievementRow & { id: string };

const categoryMeta = {
  award: { label: 'Competition / Award', icon: Trophy },
  certification: { label: 'Certification', icon: GraduationCap },
  experience: { label: 'Experience', icon: Briefcase },
} as const;

// ── component ────────────────────────────────────────────────
const AchievementsAdmin = () => {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<AchievementRow | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    const { data, error: e } = await supabase
      .from('achievements')
      .select('*')
      .order('order_index', { ascending: true })
      .order('year', { ascending: false });
    if (e) setError(e.message);
    else setItems((data ?? []) as Row[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const startNew = () => {
    setError('');
    setEditingId(null);
    setDraft({ ...emptyAchievement, order_index: items.length });
  };

  const startEdit = (row: Row) => {
    setError('');
    setEditingId(row.id);
    const { id, ...rest } = row;
    void id;
    setDraft({ ...emptyAchievement, ...rest });
  };

  const set = <K extends keyof AchievementRow>(key: K, value: AchievementRow[K]) =>
    setDraft((d) => (d ? { ...d, [key]: value } : d));

  const save = async () => {
    if (!draft) return;
    if (!draft.title_en.trim() && !draft.title_ar.trim()) {
      setError('Please enter a title (EN or AR).');
      return;
    }
    setSaving(true);
    setError('');

    const payload = { ...draft, updated_at: new Date().toISOString() };
    const res = editingId
      ? await supabase.from('achievements').update(payload).eq('id', editingId)
      : await supabase.from('achievements').insert(payload);

    setSaving(false);
    if (res.error) {
      setError(res.error.message);
      return;
    }
    setDraft(null);
    setEditingId(null);
    load();
  };

  const remove = async (row: Row) => {
    if (!window.confirm(`Delete "${row.title_en || row.title_ar}"? This cannot be undone.`)) return;
    const { error: e } = await supabase.from('achievements').delete().eq('id', row.id);
    if (e) setError(e.message);
    else load();
  };

  // ── Form view ──
  if (draft) {
    return (
      <div className="space-y-6">
        <button onClick={() => setDraft(null)} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back to list
        </button>
        <h1 className="text-xl font-bold">{editingId ? 'Edit entry' : 'Add new entry'}</h1>

        <div className="space-y-5">
          <div className="grid sm:grid-cols-3 gap-3">
            <Field label="Type">
              <select
                value={draft.category}
                onChange={(e) => set('category', e.target.value as AchievementRow['category'])}
                className={inputCls}
              >
                {Object.entries(categoryMeta).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Year">
              <input
                type="number"
                value={draft.year}
                onChange={(e) => set('year', parseInt(e.target.value) || new Date().getFullYear())}
                className={inputCls}
              />
            </Field>
            <Field label="Date" hint="optional">
              <input
                type="date"
                value={draft.event_date ?? ''}
                onChange={(e) => set('event_date', e.target.value || null)}
                className={inputCls}
              />
            </Field>
          </div>

          <Bilingual label="Title" en={draft.title_en} ar={draft.title_ar}
            onEn={(v) => set('title_en', v)} onAr={(v) => set('title_ar', v)} />

          {draft.category === 'award' && (
            <Bilingual label="Rank / Placement" en={draft.rank_en} ar={draft.rank_ar}
              onEn={(v) => set('rank_en', v)} onAr={(v) => set('rank_ar', v)} />
          )}

          <Bilingual label="Issuer / Organizer" en={draft.issuer_en} ar={draft.issuer_ar}
            onEn={(v) => set('issuer_en', v)} onAr={(v) => set('issuer_ar', v)} />

          <Bilingual label="Description" en={draft.description_en} ar={draft.description_ar}
            onEn={(v) => set('description_en', v)} onAr={(v) => set('description_ar', v)} textarea />

          <Bilingual label="Location" en={draft.location_en} ar={draft.location_ar}
            onEn={(v) => set('location_en', v)} onAr={(v) => set('location_ar', v)} />

          <Field label="Link" hint="optional — competition page or certificate">
            <input value={draft.url} onChange={(e) => set('url', e.target.value)} placeholder="https://…" className={inputCls} dir="ltr" />
          </Field>

          <Field label="Images / Video" hint="first image is the cover">
            <ImageUploader value={draft.image_urls} onChange={(urls) => set('image_urls', urls)} />
          </Field>

          <div className="grid sm:grid-cols-2 gap-3 items-end">
            <Field label="Order" hint="lower shows first">
              <input
                type="number"
                value={draft.order_index}
                onChange={(e) => set('order_index', parseInt(e.target.value) || 0)}
                className={inputCls}
              />
            </Field>
            <label className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(e) => set('featured', e.target.checked)}
                className="w-4 h-4 accent-yellow-400"
              />
              <Star className="w-4 h-4 text-yellow-400" /> Featured
            </label>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-zinc-900 font-semibold transition-colors"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {editingId ? 'Save changes' : 'Create entry'}
            </button>
            <button onClick={() => setDraft(null)} className="px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── List view ──
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Competitions &amp; Awards</h1>
          <p className="text-sm text-zinc-500">Everything shown on your Awards &amp; Certifications pages.</p>
        </div>
        <button
          onClick={startNew}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-zinc-900 font-semibold transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /> Add new
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 text-yellow-400 animate-spin" /></div>
      ) : items.length === 0 ? (
        <p className="text-center text-zinc-500 py-16">No entries yet. Click “Add new”.</p>
      ) : (
        <div className="space-y-2">
          {items.map((row) => {
            const Icon = categoryMeta[row.category].icon;
            return (
              <div key={row.id} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
                <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center shrink-0">
                  {row.image_urls?.[0] ? (
                    <img src={row.image_urls[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Icon className="w-5 h-5 text-zinc-500" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{row.title_en || row.title_ar}</p>
                    {row.featured && <Star className="w-3.5 h-3.5 text-yellow-400 shrink-0" />}
                  </div>
                  <p className="text-xs text-zinc-500 truncate">
                    {categoryMeta[row.category].label}
                    {row.rank_en ? ` · ${row.rank_en}` : ''} · {row.year}
                  </p>
                </div>
                <button onClick={() => startEdit(row)} title="Edit" className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => remove(row)} title="Delete" className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

export default AchievementsAdmin;
