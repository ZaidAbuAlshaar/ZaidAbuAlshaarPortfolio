import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { handleImageError, getPlaceholder } from '@/lib/images';

interface MediaGalleryProps {
  items: string[];
  alt: string;
}

function isVideo(src: string) {
  return /\.(mp4|webm|ogg)$/i.test(src);
}

const MediaGallery = ({ items, alt }: MediaGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!items.length) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <img src={getPlaceholder()} alt={alt} className="w-24 h-24 opacity-40" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {items.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setLightboxIndex(i)}
          >
            {isVideo(src) ? (
              <video
                src={src}
                muted
                className="w-full h-full object-cover"
                preload="metadata"
              />
            ) : (
              <img
                src={src}
                alt={`${alt} ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={handleImageError}
              />
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="h-8 w-8" />
            </button>

            {items.length > 1 && (
              <>
                <button
                  className="absolute left-4 text-white/80 hover:text-white z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : items.length - 1));
                  }}
                >
                  <ChevronLeft className="h-10 w-10" />
                </button>
                <button
                  className="absolute right-4 text-white/80 hover:text-white z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev! < items.length - 1 ? prev! + 1 : 0));
                  }}
                >
                  <ChevronRight className="h-10 w-10" />
                </button>
              </>
            )}

            {isVideo(items[lightboxIndex]) ? (
              <motion.video
                key={items[lightboxIndex]}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={items[lightboxIndex]}
                controls
                autoPlay
                className="max-w-full max-h-[85vh] rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.img
                key={items[lightboxIndex]}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={items[lightboxIndex]}
                alt={alt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MediaGallery;
