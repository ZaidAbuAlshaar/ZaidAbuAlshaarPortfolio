import { supabase } from './supabase';

const BUCKET = 'portfolio-images';

/**
 * Upload a single image/video file to the public storage bucket and return
 * its public URL. Writes are RLS-locked to the admin account.
 */
export const uploadImage = async (file: File): Promise<string> => {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const safe = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(safe, file, {
    cacheControl: '31536000',
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(safe);
  return data.publicUrl;
};
