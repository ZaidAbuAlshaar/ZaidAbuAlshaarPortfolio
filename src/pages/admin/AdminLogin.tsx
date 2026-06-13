import { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);
    if (authError) {
      setError('Incorrect email or password.');
      setPassword('');
      return;
    }
    // The auth state listener in AdminGuard re-renders into the dashboard.
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4" dir="ltr">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <Lock className="w-6 h-6 text-yellow-400" />
          </div>
        </div>

        <h1 className="text-center text-2xl font-semibold text-white mb-1">Admin Panel</h1>
        <p className="text-center text-sm text-zinc-500 mb-8">
          Sign in to manage your portfolio
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="Email"
            autoComplete="username"
            autoFocus
            required
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="Password"
            autoComplete="current-password"
            required
            className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors"
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-zinc-900 font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

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
