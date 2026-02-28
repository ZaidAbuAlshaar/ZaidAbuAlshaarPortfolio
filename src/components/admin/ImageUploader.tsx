import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadImage } from '@/lib/adminStorage';

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
}

const ImageUploader = ({ value, onChange }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    setUploading(true);
    setError('');
    try {
      const urls = await Promise.all(files.map(uploadImage));
      onChange([...value, ...urls]);
    } catch {
      setError('Upload failed — check your Supabase Storage bucket is public.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx));

  return (
    <div className="space-y-2">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((url, idx) => (
            <div key={idx} className="relative group">
              <img
                src={url}
                alt=""
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
              <button
                type="button"
                onClick={() => remove(idx)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      <label
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-zinc-600 text-sm text-zinc-400 transition-colors
          ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-yellow-400 hover:text-yellow-400'}`}
      >
        {uploading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Upload className="w-4 h-4" />
        )}
        {uploading ? 'Uploading…' : 'Upload image(s)'}
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={uploading}
          onChange={handleFiles}
          className="hidden"
        />
      </label>

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
};

export default ImageUploader;
