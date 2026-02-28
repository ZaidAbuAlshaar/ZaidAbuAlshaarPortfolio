import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPlaceholder } from '@/lib/images';

interface GalleryProps {
  basePath: string; // e.g. "/images/projects/my-slug" or "/images/achievements/my-id"
  alt: string;
  maxImages?: number;
}

const Gallery = ({ basePath, alt, maxImages = 8 }: GalleryProps) => {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [failedCount, setFailedCount] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allPaths = Array.from({ length: maxImages }, (_, i) => `${basePath}-${i + 1}.jpg`);

  const handleLoad = useCallback((src: string) => {
    setLoadedImages((prev) => (prev.includes(src) ? prev : [...prev, src]));
  }, []);

  const handleError = useCallback(() => {
    setFailedCount((prev) => prev + 1);
  }, []);

  const showPlaceholder = failedCount >= maxImages && loadedImages.length === 0;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {showPlaceholder && (
          <div className="col-span-full aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
            <img src={getPlaceholder()} alt={alt} className="w-24 h-24 opacity-40" />
          </div>
        )}

        {allPaths.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer ${
              !loadedImages.includes(src) ? 'hidden' : ''
            }`}
            onClick={() => setLightboxIndex(loadedImages.indexOf(src))}
          >
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              onLoad={() => handleLoad(src)}
              onError={handleError}
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && loadedImages.length > 0 && (
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

            {loadedImages.length > 1 && (
              <>
                <button
                  className="absolute left-4 text-white/80 hover:text-white z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : loadedImages.length - 1));
                  }}
                >
                  <ChevronLeft className="h-10 w-10" />
                </button>
                <button
                  className="absolute right-4 text-white/80 hover:text-white z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev! < loadedImages.length - 1 ? prev! + 1 : 0));
                  }}
                >
                  <ChevronRight className="h-10 w-10" />
                </button>
              </>
            )}

            <motion.img
              key={loadedImages[lightboxIndex]}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={loadedImages[lightboxIndex]}
              alt={alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
