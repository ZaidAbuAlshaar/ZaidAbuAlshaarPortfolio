import { useNavigate } from 'react-router-dom';
import { Trophy, FolderOpen, FileText } from 'lucide-react';

const sections = [
  {
    icon: Trophy,
    label: 'Achievements',
    description: 'Awards, certifications, and experience highlights',
    path: '/admin/achievements',
  },
  {
    icon: FolderOpen,
    label: 'Projects',
    description: 'Portfolio projects with images and links',
    path: '/admin/projects',
  },
  {
    icon: FileText,
    label: 'Content',
    description: 'Bio, tagline, and skills',
    path: '/admin/content',
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-semibold text-white mb-1">Dashboard</h1>
      <p className="text-sm text-zinc-500 mb-8">Choose a section to manage.</p>

      <div className="grid gap-3">
        {sections.map(({ icon: Icon, label, description, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="flex items-center gap-4 p-5 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-yellow-400/60 hover:bg-zinc-800/60 text-left transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">{label}</p>
              <p className="text-zinc-500 text-xs">{description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
