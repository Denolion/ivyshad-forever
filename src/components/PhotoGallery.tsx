import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export default function PhotoGallery() {
  const [lightbox, setLightbox] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <section
      id="gallery"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24"
      style={{ background: 'linear-gradient(180deg, #ffe4ec 0%, #fff5f8 50%, #ffe4ec 100%)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="font-cursive text-4xl sm:text-5xl text-rose-600 mb-3">
          A Beautiful Soul, A Beautiful Smile ❤️
        </h2>
        <p className="font-serif-elegant italic text-rose-400 text-lg sm:text-xl">
          Some moments deserve to be kept close to the heart.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative max-w-sm w-full"
      >
        {/* Pink glow background */}
        <div
          className="absolute inset-0 rounded-3xl blur-2xl opacity-50"
          style={{ background: 'radial-gradient(circle, #ff6f91, #ffe4ec)', transform: 'scale(1.1)' }}
          aria-hidden="true"
        />

        {/* Portrait frame */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            border: '2px solid rgba(192, 128, 129, 0.6)',
            boxShadow: '0 20px 60px rgba(232, 67, 115, 0.3)',
          }}
        >
          {imgError ? (
            <div
              className="w-full flex items-center justify-center bg-pink-100"
              style={{ aspectRatio: '3/4' }}
            >
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🌹</div>
                <p className="font-serif-elegant text-rose-400 italic text-sm">
                  Place ivyshad-portrait.jpg in public/images/
                </p>
              </div>
            </div>
          ) : (
            <img
              src={siteConfig.portraitImagePath}
              alt="Ivyshad Jepchumba — a beautiful portrait"
              className="w-full h-auto object-cover"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* View Photo button overlay */}
        <div className="mt-6 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setLightbox(true)}
            className="flex items-center gap-2 px-8 py-3 rounded-full font-body font-semibold text-white shadow-xl transition-all"
            style={{ background: 'linear-gradient(135deg, #E84373, #FF6F91)' }}
          >
            <ZoomIn size={18} /> VIEW PHOTO
          </motion.button>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(89, 13, 34, 0.92)', backdropFilter: 'blur(8px)' }}
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative max-w-sm w-full max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(false)}
                className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white text-rose-600 hover:bg-rose-50 flex items-center justify-center shadow-lg transition-colors"
                aria-label="Close photo"
              >
                <X size={18} />
              </button>
              {!imgError ? (
                <img
                  src={siteConfig.portraitImagePath}
                  alt="Ivyshad Jepchumba"
                  className="w-full h-auto rounded-2xl object-contain max-h-[85vh]"
                />
              ) : (
                <div className="text-center text-rose-200 p-8">
                  <div className="text-6xl mb-4">🌹</div>
                  <p className="font-serif-elegant italic">Photo coming soon...</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
