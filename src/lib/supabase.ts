import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client.
 *
 * The URL and anon key are PUBLIC by design — the security boundary is
 * Row Level Security (public read, writes locked to the admin account),
 * so hardcoding safe defaults guarantees the deployed build works even if
 * the CI build does not inject env vars. Local/CI can still override via
 * VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.
 */
const DEFAULT_URL = 'https://kgbsmxcezmkatcevhkzs.supabase.co';
const DEFAULT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnYnNteGNlem1rYXRjZXZoa3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNzUyODYsImV4cCI6MjA5Njk1MTI4Nn0.phB0lvRhWtBxavIZLVNN6iyCEie_o6Z37vGF-5XNAOg';

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) || DEFAULT_URL;
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || DEFAULT_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'zaid-portfolio-admin',
  },
});
