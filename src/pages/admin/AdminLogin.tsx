import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!adminPassword) {
      setError('VITE_ADMIN_PASSWORD is not configured.');
      return;
    }

    if (password === adminPassword) {
      localStorage.setItem('admin_auth', 'true');
      navigate('/admin', { replace: true });
      // Guard will re-render and show dashboard
      window.location.reload();
    } else {
      setError('Incorrect password.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <Lock className="w-6 h-6 text-yellow-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-semibold text-white mb-1">
          Admin Panel
        </h1>
        <p className="text-center text-sm text-zinc-500 mb-8">
          Enter your password to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-zinc-900 font-semibold transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* Back link */}
        <p className="text-center mt-6 text-sm text-zinc-600">
          <a href="/en" className="hover:text-zinc-400 transition-colors">
            ← Back to portfolio
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
