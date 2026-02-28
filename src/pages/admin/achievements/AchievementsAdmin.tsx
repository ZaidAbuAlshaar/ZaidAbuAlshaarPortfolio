import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ChevronLeft, Loader2, Trophy } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { AchievementRow } from '@/lib/adminTypes';
import ImageUploader from '@/components/admin/ImageUploader';

// ── helpers ──────────────────────────────────────────────────

const empty: AchievementRow = {
  title_en: '',
  title_ar: '',
  issuer_en: '',
  issuer_ar: '',
  description_en: '',
  description_ar: '',
  year: new Date().getFullYear(),
  category: 'award',
  image_urls: [],
  order_index: 0,
};

const Field = ({
  label,
  dir,
  children,
}: {
  label: string;
  dir?: 'rtl';
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-xs text-zinc-400 mb-1">{label}</label>
    <div dir={dir}>{children}</div>
  </div>
);

const inp =
  'w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors placeholder-zinc-600';

// ── component ─────────────────────────────────────────────────

const AchievementsAdmin = () => {
  const [items, setItems] = useState<(AchievementRow & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AchievementRow>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // ── data fetching
  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('achievements')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  // ── actions
  const openAdd = () => { setEditingId(null); setForm(empty); setMode('form'); setError(''); };
  const openEdit = (item: AchievementRow & { id: string }) => {
    setEditingId(item.id);
    setForm({ ...item });
    setMode('form');
    setError('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this achievement?')) return;
    await supabase.from('achievements').delete().eq('id', id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSave = async () => {
    if (!form.title_en.trim() || !form.title_ar.trim()) {
      setError('Both English and Arabic titles are required.');
      return;
    }

    setSaving(true);
    setError('');

    const payload = {
      title_en: form.title_en,
      title_ar: form.title_ar,
      issuer_en: form.issuer_en,
      issuer_ar: form.issuer_ar,
      description_en: form.description_en,
      description_ar: form.description_ar,
      year: form.year,
      category: form.category,
      image_urls: form.image_urls,
      order_index: form.order_index,
    };

    const { error: err } = editingId
      ? await supabase.from('achievements').update(payload).eq('id', editingId)
      : await supabase.from('achievements').insert(payload);

    if (err) {
      setError(err.message);
    } else {
      await fetchItems();
      setMode('list');
    }
    setSaving(false);
  };

  const set = (key: keyof AchievementRow, val: AchievementRow[typeof key]) =>
    setForm((f) => ({ ...f, [key]: val }));

  // ── category badge colour
  const catColor = (c: string) =>
    c === 'award' ? 'text-yellow-400 bg-yellow-400/10'
    : c === 'certification' ? 'text-blue-400 bg-blue-400/10'
    : 'text-green-400 bg-green-400/10';

  // ────────────────────────────────────────────────────────────
  // LIST VIEW
  // ────────────────────────────────────────────────────────────
  if (mode === 'list') {
    return (
      <div className="p-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <h1 className="text-xl font-semibold text-white">Achievements</h1>
            <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
              {items.length} items
            </span>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 font-semibold rounded-lg text-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex items-center gap-2 text-zinc-500 py-8">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading…
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-zinc-600">
            <Trophy className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No achievements yet. Add your first one.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl"
              >
                {/* First image thumbnail */}
                {item.image_urls?.[0] && (
                  <img
                    src={item.image_urls[0]}
                    alt=""
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColor(item.category)}`}
                    >
                      {item.category}
                    </span>
                    <span className="text-xs text-zinc-600">{item.year}</span>
                    <span className="text-xs text-zinc-600">· order {item.order_index}</span>
                  </div>
                  <p className="text-sm text-white font-medium truncate">{item.title_en}</p>
                  <p className="text-xs text-zinc-500 truncate" dir="rtl">{item.title_ar}</p>
                  <p className="text-xs text-zinc-600 truncate mt-0.5">{item.issuer_en}</p>
                </div>

                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────
  // FORM VIEW
  // ────────────────────────────────────────────────────────────
  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setMode('list')}
          className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h1 className="text-xl font-semibold text-white">
          {editingId ? 'Edit Achievement' : 'Add Achievement'}
        </h1>
      </div>

      <div className="space-y-6">
        {/* Titles */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Title (English)">
            <input className={inp} value={form.title_en} onChange={(e) => set('title_en', e.target.value)} placeholder="e.g. 1st Place — IEEE Hackathon" />
          </Field>
          <Field label="Title (Arabic)" dir="rtl">
            <input className={inp} value={form.title_ar} onChange={(e) => set('title_ar', e.target.value)} placeholder="مثال: المركز الأول — هاكاثون IEEE" dir="rtl" />
          </Field>
        </div>

        {/* Issuer */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Issuer / Organisation (English)">
            <input className={inp} value={form.issuer_en} onChange={(e) => set('issuer_en', e.target.value)} placeholder="e.g. IEEE, Jordan" />
          </Field>
          <Field label="Issuer / Organisation (Arabic)" dir="rtl">
            <input className={inp} value={form.issuer_ar} onChange={(e) => set('issuer_ar', e.target.value)} placeholder="مثال: IEEE، الأردن" dir="rtl" />
          </Field>
        </div>

        {/* Descriptions */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Description (English)">
            <textarea
              className={inp}
              rows={5}
              value={form.description_en}
              onChange={(e) => set('description_en', e.target.value)}
              placeholder="Describe this achievement in English…"
            />
          </Field>
          <Field label="Description (Arabic)" dir="rtl">
            <textarea
              className={inp}
              rows={5}
              value={form.description_ar}
              onChange={(e) => set('description_ar', e.target.value)}
              placeholder="اوصف هذا الإنجاز بالعربية…"
              dir="rtl"
            />
          </Field>
        </div>

        {/* Year / Category / Order */}
        <div className="grid grid-cols-3 gap-4">
          <Field label="Year">
            <input
              type="number"
              className={inp}
              value={form.year}
              onChange={(e) => set('year', Number(e.target.value))}
              min={2000}
              max={2100}
            />
          </Field>
          <Field label="Category">
            <select
              className={inp}
              value={form.category}
              onChange={(e) => set('category', e.target.value as AchievementRow['category'])}
            >
              <option value="award">Award</option>
              <option value="certification">Certification</option>
              <option value="experience">Experience</option>
            </select>
          </Field>
          <Field label="Order Index (lower = first)">
            <input
              type="number"
              className={inp}
              value={form.order_index}
              onChange={(e) => set('order_index', Number(e.target.value))}
              min={0}
            />
          </Field>
        </div>

        {/* Images */}
        <div>
          <label className="block text-xs text-zinc-400 mb-2">Images / Media</label>
          <ImageUploader
            value={form.image_urls}
            onChange={(urls) => set('image_urls', urls)}
          />
        </div>

        {/* Error */}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-zinc-900 font-semibold rounded-lg text-sm transition-colors"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Create'}
          </button>
          <button
            onClick={() => setMode('list')}
            className="px-5 py-2.5 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 rounded-lg text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AchievementsAdmin;
