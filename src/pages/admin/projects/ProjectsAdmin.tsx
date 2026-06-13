import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ArrowLeft, Loader2, Save, FolderKanban, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { emptyProject, type ProjectRow } from '@/lib/adminTypes';
import ImageUploader from '@/components/admin/ImageUploader';
import { inputCls, Field, Bilingual } from '@/components/admin/fields';

type Row = ProjectRow & { id: string };

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const ProjectsAdmin = () => {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<ProjectRow | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    const { data, error: e } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });
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
    setDraft({ ...emptyProject, order_index: items.length });
  };

  const startEdit = (row: Row) => {
    setError('');
    setEditingId(row.id);
    const { id, ...rest } = row;
    void id;
    setDraft({ ...emptyProject, ...rest });
  };

  const set = <K extends keyof ProjectRow>(key: K, value: ProjectRow[K]) =>
    setDraft((d) => (d ? { ...d, [key]: value } : d));

  const save = async () => {
    if (!draft) return;
    const slug = draft.slug.trim() || slugify(draft.title_en || draft.title_ar);
    if (!slug) {
      setError('Please enter a title or slug.');
      return;
    }
    setSaving(true);
    setError('');

    const payload = { ...draft, slug, updated_at: new Date().toISOString() };
    const res = editingId
      ? await supabase.from('projects').update(payload).eq('id', editingId)
      : await supabase.from('projects').insert(payload);

    setSaving(false);
    if (res.error) {
      setError(
        res.error.message.includes('duplicate')
          ? `Slug "${slug}" is already used — choose a unique slug.`
          : res.error.message,
      );
      return;
    }
    setDraft(null);
    setEditingId(null);
    load();
  };

  const remove = async (row: Row) => {
    if (!window.confirm(`Delete "${row.title_en || row.title_ar}"? This cannot be undone.`)) return;
    const { error: e } = await supabase.from('projects').delete().eq('id', row.id);
    if (e) setError(e.message);
    else load();
  };

  const csv = (arr: string[]) => arr.join(', ');
  const parseCsv = (v: string) => v.split(',').map((s) => s.trim()).filter(Boolean);

  // ── Form view ──
  if (draft) {
    return (
      <div className="space-y-6">
        <button onClick={() => setDraft(null)} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back to list
        </button>
        <h1 className="text-xl font-bold">{editingId ? 'Edit project' : 'Add new project'}</h1>

        <div className="space-y-5">
          <Bilingual label="Title" en={draft.title_en} ar={draft.title_ar}
            onEn={(v) => set('title_en', v)} onAr={(v) => set('title_ar', v)} />

          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Slug" hint="unique URL id — auto from title if blank">
              <input value={draft.slug} onChange={(e) => set('slug', e.target.value)} placeholder="my-project" className={inputCls} dir="ltr" />
            </Field>
            <Bilingual label="Role" en={draft.role_en} ar={draft.role_ar}
              onEn={(v) => set('role_en', v)} onAr={(v) => set('role_ar', v)} />
          </div>

          <Bilingual label="Short description" en={draft.description_en} ar={draft.description_ar}
            onEn={(v) => set('description_en', v)} onAr={(v) => set('description_ar', v)} textarea />

          <Bilingual label="Detailed summary" en={draft.summary_en} ar={draft.summary_ar}
            onEn={(v) => set('summary_en', v)} onAr={(v) => set('summary_ar', v)} textarea />

          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Tags" hint="comma separated">
              <input value={csv(draft.tags)} onChange={(e) => set('tags', parseCsv(e.target.value))} placeholder="AI/ML, Full-Stack" className={inputCls} dir="ltr" />
            </Field>
            <Field label="Tech stack" hint="comma separated">
              <input value={csv(draft.tech_stack)} onChange={(e) => set('tech_stack', parseCsv(e.target.value))} placeholder="React, Node.js" className={inputCls} dir="ltr" />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="GitHub URL" hint="optional">
              <input value={draft.github_url} onChange={(e) => set('github_url', e.target.value)} placeholder="https://github.com/…" className={inputCls} dir="ltr" />
            </Field>
            <Field label="Live / Demo URL" hint="optional">
              <input value={draft.demo_url} onChange={(e) => set('demo_url', e.target.value)} placeholder="https://…" className={inputCls} dir="ltr" />
            </Field>
          </div>

          <Field label="Images" hint="first image is the card cover">
            <ImageUploader value={draft.image_urls} onChange={(urls) => set('image_urls', urls)} />
          </Field>

          <div className="grid sm:grid-cols-2 gap-3 items-end">
            <Field label="Order" hint="lower shows first">
              <input type="number" value={draft.order_index} onChange={(e) => set('order_index', parseInt(e.target.value) || 0)} className={inputCls} />
            </Field>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-zinc-300">
                <input type="checkbox" checked={draft.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4 accent-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400" /> Featured
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-zinc-300">
                <input type="checkbox" checked={draft.coming_soon} onChange={(e) => set('coming_soon', e.target.checked)} className="w-4 h-4 accent-yellow-400" /> Coming soon
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-zinc-300">
                <input type="checkbox" checked={draft.contact_for_info} onChange={(e) => set('contact_for_info', e.target.checked)} className="w-4 h-4 accent-yellow-400" /> Contact for info
              </label>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3">
            <button onClick={save} disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-zinc-900 font-semibold transition-colors">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {editingId ? 'Save changes' : 'Create project'}
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
          <h1 className="text-xl font-bold">Projects</h1>
          <p className="text-sm text-zinc-500">Freelance &amp; personal projects shown on the Projects page.</p>
        </div>
        <button onClick={startNew}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-zinc-900 font-semibold transition-colors shrink-0">
          <Plus className="w-4 h-4" /> Add new
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 text-yellow-400 animate-spin" /></div>
      ) : items.length === 0 ? (
        <p className="text-center text-zinc-500 py-16">No projects yet. Click “Add new”.</p>
      ) : (
        <div className="space-y-2">
          {items.map((row) => (
            <div key={row.id} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
              <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center shrink-0">
                {row.image_urls?.[0] ? (
                  <img src={row.image_urls[0]} alt="" className="w-full h-full object-cover" />
                ) : (
                  <FolderKanban className="w-5 h-5 text-zinc-500" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{row.title_en || row.title_ar}</p>
                  {row.featured && <Star className="w-3.5 h-3.5 text-yellow-400 shrink-0" />}
                  {row.coming_soon && <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-300 shrink-0">soon</span>}
                </div>
                <p className="text-xs text-zinc-500 truncate">{row.slug} · {row.tags.join(', ')}</p>
              </div>
              <button onClick={() => startEdit(row)} title="Edit" className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => remove(row)} title="Delete" className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

export default ProjectsAdmin;
