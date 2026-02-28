import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ChevronLeft, Loader2, FolderOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { ProjectRow } from '@/lib/adminTypes';
import ImageUploader from '@/components/admin/ImageUploader';

// ── helpers ──────────────────────────────────────────────────

const empty: ProjectRow = {
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

const Check = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 accent-yellow-400"
    />
    <span className="text-sm text-zinc-300">{label}</span>
  </label>
);

// ── component ─────────────────────────────────────────────────

const ProjectsAdmin = () => {
  const [items, setItems] = useState<(ProjectRow & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectRow>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // ── data fetching
  const fetchItems = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  // ── helpers
  const set = <K extends keyof ProjectRow>(key: K, val: ProjectRow[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const tagsStr = form.tags.join(', ');
  const stackStr = form.tech_stack.join(', ');

  const openAdd = () => { setEditingId(null); setForm(empty); setMode('form'); setError(''); };
  const openEdit = (item: ProjectRow & { id: string }) => {
    setEditingId(item.id);
    setForm({ ...item });
    setMode('form');
    setError('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await supabase.from('projects').delete().eq('id', id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSave = async () => {
    if (!form.slug.trim() || !form.title_en.trim() || !form.title_ar.trim()) {
      setError('Slug, English title, and Arabic title are required.');
      return;
    }

    setSaving(true);
    setError('');

    const payload = {
      slug: form.slug.trim().toLowerCase().replace(/\s+/g, '-'),
      title_en: form.title_en,
      title_ar: form.title_ar,
      description_en: form.description_en,
      description_ar: form.description_ar,
      summary_en: form.summary_en,
      summary_ar: form.summary_ar,
      tags: form.tags,
      tech_stack: form.tech_stack,
      role_en: form.role_en,
      role_ar: form.role_ar,
      image_urls: form.image_urls,
      featured: form.featured,
      coming_soon: form.coming_soon,
      contact_for_info: form.contact_for_info,
      github_url: form.github_url,
      demo_url: form.demo_url,
      order_index: form.order_index,
    };

    const { error: err } = editingId
      ? await supabase.from('projects').update(payload).eq('id', editingId)
      : await supabase.from('projects').insert(payload);

    if (err) {
      setError(err.message);
    } else {
      await fetchItems();
      setMode('list');
    }
    setSaving(false);
  };

  // ────────────────────────────────────────────────────────────
  // LIST VIEW
  // ────────────────────────────────────────────────────────────
  if (mode === 'list') {
    return (
      <div className="p-6 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FolderOpen className="w-5 h-5 text-yellow-400" />
            <h1 className="text-xl font-semibold text-white">Projects</h1>
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

        {loading ? (
          <div className="flex items-center gap-2 text-zinc-500 py-8">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading…
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-zinc-600">
            <FolderOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No projects yet. Add your first one.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl"
              >
                {item.image_urls?.[0] && (
                  <img
                    src={item.image_urls[0]}
                    alt=""
                    className="w-14 h-10 object-cover rounded-lg flex-shrink-0"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs text-zinc-500 font-mono">{item.slug}</span>
                    {item.featured && (
                      <span className="text-xs text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded">
                        featured
                      </span>
                    )}
                    <span className="text-xs text-zinc-600">· order {item.order_index}</span>
                  </div>
                  <p className="text-sm text-white font-medium truncate">{item.title_en}</p>
                  <p className="text-xs text-zinc-500 truncate" dir="rtl">{item.title_ar}</p>
                  <p className="text-xs text-zinc-600 truncate mt-0.5">
                    {item.tags?.join(', ')}
                  </p>
                </div>

                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
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
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setMode('list')}
          className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h1 className="text-xl font-semibold text-white">
          {editingId ? 'Edit Project' : 'Add Project'}
        </h1>
      </div>

      <div className="space-y-6">
        {/* Slug */}
        <Field label="Slug (URL-safe, unique, e.g. my-project)">
          <input
            className={inp}
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
            placeholder="my-project"
          />
        </Field>

        {/* Titles */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Title (English)">
            <input className={inp} value={form.title_en} onChange={(e) => set('title_en', e.target.value)} placeholder="Project Name" />
          </Field>
          <Field label="Title (Arabic)" dir="rtl">
            <input className={inp} value={form.title_ar} onChange={(e) => set('title_ar', e.target.value)} placeholder="اسم المشروع" dir="rtl" />
          </Field>
        </div>

        {/* Descriptions */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Short Description (English)">
            <textarea className={inp} rows={3} value={form.description_en} onChange={(e) => set('description_en', e.target.value)} placeholder="One-paragraph overview…" />
          </Field>
          <Field label="Short Description (Arabic)" dir="rtl">
            <textarea className={inp} rows={3} value={form.description_ar} onChange={(e) => set('description_ar', e.target.value)} placeholder="وصف مختصر…" dir="rtl" />
          </Field>
        </div>

        {/* Summaries */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full Summary (English)">
            <textarea className={inp} rows={4} value={form.summary_en} onChange={(e) => set('summary_en', e.target.value)} placeholder="Detailed summary for the expanded card view…" />
          </Field>
          <Field label="Full Summary (Arabic)" dir="rtl">
            <textarea className={inp} rows={4} value={form.summary_ar} onChange={(e) => set('summary_ar', e.target.value)} placeholder="ملخص تفصيلي…" dir="rtl" />
          </Field>
        </div>

        {/* Role */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Your Role (English)">
            <input className={inp} value={form.role_en} onChange={(e) => set('role_en', e.target.value)} placeholder="e.g. Lead Developer" />
          </Field>
          <Field label="Your Role (Arabic)" dir="rtl">
            <input className={inp} value={form.role_ar} onChange={(e) => set('role_ar', e.target.value)} placeholder="مثال: مطوّر رئيسي" dir="rtl" />
          </Field>
        </div>

        {/* Tags + Tech Stack */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Tags (comma-separated, e.g. AI/ML, Full-Stack)">
            <input
              className={inp}
              value={tagsStr}
              onChange={(e) =>
                set('tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))
              }
              placeholder="AI/ML, Full-Stack, AR/VR"
            />
          </Field>
          <Field label="Tech Stack (comma-separated)">
            <input
              className={inp}
              value={stackStr}
              onChange={(e) =>
                set('tech_stack', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))
              }
              placeholder="React, Python, TailwindCSS"
            />
          </Field>
        </div>

        {/* URLs */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="GitHub URL">
            <input className={inp} value={form.github_url} onChange={(e) => set('github_url', e.target.value)} placeholder="https://github.com/…" />
          </Field>
          <Field label="Demo / Live URL">
            <input className={inp} value={form.demo_url} onChange={(e) => set('demo_url', e.target.value)} placeholder="https://…" />
          </Field>
        </div>

        {/* Order */}
        <Field label="Order Index (lower = first)">
          <input type="number" className={`${inp} max-w-[120px]`} value={form.order_index} onChange={(e) => set('order_index', Number(e.target.value))} min={0} />
        </Field>

        {/* Flags */}
        <div className="flex flex-wrap gap-6">
          <Check label="Featured on homepage" checked={form.featured} onChange={(v) => set('featured', v)} />
          <Check label="Coming Soon badge" checked={form.coming_soon} onChange={(v) => set('coming_soon', v)} />
          <Check label="Contact for info (hide GitHub/Live links)" checked={form.contact_for_info} onChange={(v) => set('contact_for_info', v)} />
        </div>

        {/* Images */}
        <div>
          <label className="block text-xs text-zinc-400 mb-2">Project Images</label>
          <ImageUploader value={form.image_urls} onChange={(urls) => set('image_urls', urls)} />
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

export default ProjectsAdmin;
