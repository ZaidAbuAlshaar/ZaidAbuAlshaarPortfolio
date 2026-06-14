import { useState } from 'react';
import { Upload, X, Loader2, GripVertical } from 'lucide-react';
import { uploadImage } from '@/lib/adminStorage';

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
}

const isVideo = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);

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
    } catch (err) {
      setError(
        err instanceof Error
          ? `Upload failed: ${err.message}`
          : 'Upload failed — please try again.',
      );
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx));

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...value];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((url, idx) => (
            <div key={url} className="relative group">
              {isVideo(url) ? (
                <video
                  src={url}
                  muted
                  className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                />
              ) : (
                <img
                  src={url}
                  alt=""
                  className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                />
              )}
              {idx === 0 && (
                <span className="absolute bottom-0 inset-x-0 bg-yellow-400 text-zinc-900 text-[10px] text-center font-semibold rounded-b-lg">
                  cover
                </span>
              )}
              <button
                type="button"
                onClick={() => remove(idx)}
                title="Remove"
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-white" />
              </button>
              {value.length > 1 && (
                <button
                  type="button"
                  onClick={() => move(idx, -1)}
                  title="Move earlier"
                  className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-zinc-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <GripVertical className="w-3 h-3 text-white" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <label
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-zinc-600 text-sm text-zinc-400 transition-colors
          ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-yellow-400 hover:text-yellow-400'}`}
      >
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        {uploading ? 'Uploading…' : 'Upload image(s) / video'}
        <input
          type="file"
          accept="image/*,video/mp4,video/webm"
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
