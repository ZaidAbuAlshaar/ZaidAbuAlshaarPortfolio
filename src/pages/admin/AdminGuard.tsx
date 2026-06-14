import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import AdminLogin from './AdminLogin';

const AdminGuard = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-yellow-400 animate-spin" />
      </div>
    );
  }

  if (!session) return <AdminLogin />;

  return <Outlet />;
};

export default AdminGuard;
