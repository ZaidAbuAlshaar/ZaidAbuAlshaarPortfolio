import { useNavigate } from 'react-router-dom';
import { Trophy, FolderOpen, FileText, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    window.location.reload();
  };

  const sections = [
    {
      icon: Trophy,
      label: 'Achievements',
      description: 'Add, edit, or delete achievements',
      path: '/admin/achievements',
      available: false,
    },
    {
      icon: FolderOpen,
      label: 'Projects',
      description: 'Add, edit, or delete projects',
      path: '/admin/projects',
      available: false,
    },
    {
      icon: FileText,
      label: 'Content',
      description: 'Edit bio, skills, and experiences',
      path: '/admin/content',
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      {/* Header */}
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>
            <p className="text-sm text-zinc-500 mt-1">Manage your portfolio content</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Section cards */}
        <div className="grid gap-4">
          {sections.map(({ icon: Icon, label, description, path, available }) => (
            <button
              key={label}
              onClick={() => available && navigate(path)}
              disabled={!available}
              className={`flex items-center gap-4 p-5 rounded-xl border text-left transition-colors ${
                available
                  ? 'bg-zinc-900 border-zinc-700 hover:border-yellow-400 cursor-pointer'
                  : 'bg-zinc-900/50 border-zinc-800 cursor-not-allowed opacity-50'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-white font-medium">{label}</p>
                <p className="text-zinc-500 text-sm">{description}</p>
              </div>
              {!available && (
                <span className="ml-auto text-xs text-zinc-600 border border-zinc-700 rounded px-2 py-0.5">
                  Coming soon
                </span>
              )}
            </button>
          ))}
        </div>

        <p className="text-center text-zinc-700 text-xs mt-10">
          <a href="/en" className="hover:text-zinc-500 transition-colors">← View portfolio</a>
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
