import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, FolderKanban, Plus, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ awards: 0, certs: 0, experience: 0, projects: 0 });
  const [email, setEmail] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ''));

    (async () => {
      const { data: ach } = await supabase.from('achievements').select('category');
      const { count: projects } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });

      const by = (c: string) => (ach ?? []).filter((a) => a.category === c).length;
      setCounts({
        awards: by('award'),
        certs: by('certification'),
        experience: by('experience'),
        projects: projects ?? 0,
      });
    })();
  }, []);

  const stat = (label: string, value: number) => (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="text-2xl font-bold text-yellow-400">{value}</div>
      <div className="text-xs text-zinc-500 mt-1">{label}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Welcome back{email ? `, ${email.split('@')[0]}` : ''} 👋</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Manage the competitions, awards, and projects shown on your live portfolio.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stat('Competitions / Awards', counts.awards)}
        {stat('Certifications', counts.certs)}
        {stat('Experience', counts.experience)}
        {stat('Projects', counts.projects)}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          to="/admin/achievements"
          className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-yellow-400/50 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <Plus className="w-5 h-5 text-zinc-600 group-hover:text-yellow-400 transition-colors" />
          </div>
          <h2 className="font-semibold">Competitions &amp; Awards</h2>
          <p className="text-sm text-zinc-500 mt-1">
            Add a competition with its image, name, rank, and description — it appears on the Awards page instantly.
          </p>
          <span className="inline-flex items-center gap-1 text-sm text-yellow-400 mt-3">
            Manage <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          to="/admin/projects"
          className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-yellow-400/50 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center">
              <FolderKanban className="w-5 h-5 text-yellow-400" />
            </div>
            <Plus className="w-5 h-5 text-zinc-600 group-hover:text-yellow-400 transition-colors" />
          </div>
          <h2 className="font-semibold">Projects</h2>
          <p className="text-sm text-zinc-500 mt-1">
            Add or update freelance and personal projects shown on the Projects page.
          </p>
          <span className="inline-flex items-center gap-1 text-sm text-yellow-400 mt-3">
            Manage <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
