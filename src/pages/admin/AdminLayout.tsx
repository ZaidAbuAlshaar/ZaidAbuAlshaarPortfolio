import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Trophy, FolderOpen, FileText, LogOut } from 'lucide-react';

const nav = [
  { to: '/admin', end: true, icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/achievements', end: false, icon: Trophy, label: 'Achievements' },
  { to: '/admin/projects', end: false, icon: FolderOpen, label: 'Projects' },
  { to: '/admin/content', end: false, icon: FileText, label: 'Content' },
];

const AdminLayout = () => {
  const logout = () => {
    localStorage.removeItem('admin_auth');
    window.location.href = '/en';
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-52 flex-shrink-0 border-r border-zinc-800 flex flex-col">
        <div className="px-4 py-5 border-b border-zinc-800">
          <p className="text-white font-semibold text-sm">Admin Panel</p>
          <p className="text-zinc-500 text-xs mt-0.5">Portfolio Manager</p>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {nav.map(({ to, end, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-yellow-400/10 text-yellow-400 font-medium'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-zinc-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-white hover:bg-zinc-800/60 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Page content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
