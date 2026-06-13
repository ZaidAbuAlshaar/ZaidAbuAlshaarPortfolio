import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Trophy, FolderKanban, LayoutDashboard, LogOut, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/achievements', label: 'Competitions & Awards', icon: Trophy, end: false },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban, end: false },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100" dir="ltr">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin · Zaid Abu Alshaar</title>
      </Helmet>

      <header className="border-b border-zinc-800 bg-zinc-900/60 backdrop-blur sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-yellow-400 text-zinc-900 font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <a
              href="/en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">View site</span>
            </a>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
