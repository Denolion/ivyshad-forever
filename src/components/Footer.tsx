import { motion } from 'framer-motion';
import { Heart, Code } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export default function Footer() {
  return (
    <footer
      className="relative py-16 px-6 text-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ffe4ec 0%, #590D22 100%)' }}
    >
      {/* Decorative top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(192,128,129,0.6), transparent)' }}
        aria-hidden="true"
      />

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {['❤️','💗','🌹'].map((s, i) => (
          <span
            key={i}
            className="absolute text-xl opacity-20"
            style={{
              left: `${20 + i * 30}%`,
              top: '30%',
              animation: `gentleFloat ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            {s}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {/* Main message */}
        <Heart
          size={32}
          className="mx-auto mb-4 fill-rose-400 text-rose-400"
          style={{ filter: 'drop-shadow(0 0 10px rgba(232,67,115,0.5))' }}
        />

        <p className="font-cursive text-3xl sm:text-4xl text-white mb-2">
          Made with love, especially for {siteConfig.recipientName}.
        </p>
        <p className="font-serif-elegant italic text-pink-200 text-lg mb-8">
          A little website, a little music, and a whole lot of love.
        </p>

        <div
          className="inline-block mx-auto h-px w-24 mb-8"
          style={{ background: 'rgba(255,255,255,0.3)' }}
          aria-hidden="true"
        />

        {/* Developer credit */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Code size={16} className="text-pink-300" />
          <span className="font-body text-pink-100 text-sm">
            Crafted by{' '}
            <span className="font-bold text-white">{siteConfig.developerName}</span>
            {' '}💻❤️
          </span>
        </motion.div>

        <p className="font-body text-pink-300 text-xs mt-6 opacity-60">
          IVYSHAD FOREVER ❤️
        </p>
      </motion.div>
    </footer>
  );
}
