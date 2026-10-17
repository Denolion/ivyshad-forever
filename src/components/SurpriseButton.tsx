import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

const BURST_HEARTS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 80 + 10,
  symbol: ['❤️','💗','💖','✨','🌹','💕','🥰','💝','🌸'][Math.floor(Math.random() * 9)],
  size: 18 + Math.random() * 24,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 1.5,
}));

export default function SurpriseButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 px-10 py-4 rounded-full font-body font-bold text-white shadow-2xl text-lg mx-auto"
        style={{ background: 'linear-gradient(135deg, #E84373, #c0387f, #FF6F91)' }}
      >
        <Sparkles size={22} />
        ONE LAST SURPRISE ✨
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{
              background: 'linear-gradient(135deg, rgba(232,67,115,0.97), rgba(89,13,34,0.98))',
              backdropFilter: 'blur(4px)',
            }}
          >
            {/* Burst hearts */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              {BURST_HEARTS.map(h => (
                <motion.span
                  key={h.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0.6, 0], scale: [0, 1, 1, 0.5], y: [0, -80, -150] }}
                  transition={{ duration: h.duration, delay: h.delay, repeat: Infinity }}
                  className="absolute"
                  style={{ left: `${h.x}%`, top: `${h.y}%`, fontSize: `${h.size}px` }}
                >
                  {h.symbol}
                </motion.span>
              ))}
            </div>

            {/* Card */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="relative z-10 max-w-sm w-full rounded-3xl p-8 sm:p-10 text-center shadow-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(255,255,255,0.25)',
              }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                aria-label="Close surprise"
              >
                <X size={16} />
              </button>

              <div className="text-5xl mb-5" aria-hidden="true">🌹✨❤️</div>

              <h3 className="font-cursive text-4xl text-white mb-4">
                For You, {siteConfig.shortName}
              </h3>

              <p className="font-serif-elegant italic text-pink-100 text-lg leading-relaxed">
                I hope this little surprise brought a smile to your face,{' '}
                <strong className="font-semibold text-white">{siteConfig.shortName}</strong>. You deserve
                beautiful moments, genuine happiness, and countless reasons to smile. ❤️🌹
              </p>

              <div className="text-3xl mt-6 space-x-2" aria-hidden="true">
                {['💗','🥰','💖','🌸','💕'].map((s, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                    className="inline-block"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>

              <button
                onClick={() => setOpen(false)}
                className="mt-8 px-8 py-3 rounded-full bg-white text-rose-600 font-body font-semibold hover:bg-rose-50 transition-colors shadow-lg"
              >
                Back to the website ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
