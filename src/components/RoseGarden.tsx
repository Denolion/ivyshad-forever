import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/siteConfig';

const ROSE_EMOJI = '🌹';

export default function RoseGarden() {
  const [revealed, setRevealed] = useState<number | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-cursive text-3xl sm:text-4xl text-rose-600 mb-2">
          A Little Garden of Beautiful Wishes 🌹
        </h3>
        <p className="font-serif-elegant italic text-rose-400">
          Click a rose to reveal a wish for you.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        {siteConfig.roseWishes.map((wish, i) => (
          <motion.button
            key={i}
            onClick={() => setRevealed(revealed === i ? null : i)}
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="relative rounded-2xl p-5 text-center transition-all"
            style={{
              background: revealed === i
                ? 'linear-gradient(135deg, #fff0f5, #ffe4ec)'
                : 'rgba(255, 255, 255, 0.7)',
              border: '1.5px solid rgba(192,128,129,0.4)',
              backdropFilter: 'blur(10px)',
              boxShadow: revealed === i
                ? '0 8px 30px rgba(232,67,115,0.2)'
                : '0 4px 15px rgba(232,67,115,0.08)',
            }}
            aria-expanded={revealed === i}
            aria-label={`Rose ${i + 1} — click to reveal wish`}
          >
            <span
              className="text-5xl block mb-2 transition-transform"
              style={{
                animation: 'gentleFloat 3s ease-in-out infinite',
                animationDelay: `${i * 0.4}s`,
                filter: 'drop-shadow(0 4px 8px rgba(232,67,115,0.3))',
              }}
              aria-hidden="true"
            >
              {ROSE_EMOJI}
            </span>

            <AnimatePresence mode="wait">
              {revealed === i ? (
                <motion.p
                  key="wish"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-serif-elegant italic text-rose-700 text-xs sm:text-sm leading-snug"
                >
                  {wish}
                </motion.p>
              ) : (
                <motion.p
                  key="tap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-body text-rose-400 text-xs"
                >
                  Tap to reveal ✨
                </motion.p>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <style>{`
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
