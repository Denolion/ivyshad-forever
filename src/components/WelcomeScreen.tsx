import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

interface WelcomeScreenProps {
  onEnter: () => void;
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: 8 + Math.random() * 16,
  duration: 5 + Math.random() * 10,
  delay: Math.random() * 5,
  symbol: ['❤️', '💗', '💖', '✨', '🌹', '💕'][Math.floor(Math.random() * 6)],
}));

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const [imgError, setImgError] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleEnter = () => {
    if (clicked) return;
    setClicked(true);
    setTimeout(onEnter, 800);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #ffe4ec 0%, #ffb3c8 30%, #ff6f91 60%, #e84373 100%)',
      }}
      animate={clicked ? { opacity: 0, scale: 1.05 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Floating background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {PARTICLES.map(p => (
          <span
            key={p.id}
            className="absolute bottom-0"
            style={{
              left: `${p.x}%`,
              fontSize: `${p.size}px`,
              animation: `floatUp ${p.duration}s ${p.delay}s ease-in infinite`,
              opacity: 0.6,
            }}
          >
            {p.symbol}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(-110vh) rotate(20deg); opacity: 0; }
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulseBorder {
          0%, 100% { box-shadow: 0 0 20px rgba(255,111,145,0.6), 0 0 40px rgba(255,111,145,0.3); }
          50% { box-shadow: 0 0 35px rgba(255,111,145,0.9), 0 0 70px rgba(255,111,145,0.5); }
        }
      `}</style>

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-lg mx-auto">

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-cursive text-5xl sm:text-6xl text-white drop-shadow-lg mb-2"
          style={{ textShadow: '0 2px 20px rgba(89,13,34,0.4)' }}
        >
          {siteConfig.welcomeHeading}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-serif-elegant text-lg sm:text-xl text-pink-100 mb-8 italic"
        >
          {siteConfig.welcomeSubtitle}
        </motion.p>

        {/* Circular photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2, type: 'spring' }}
          className="relative mb-6"
          style={{ animation: 'gentleFloat 4s ease-in-out infinite' }}
        >
          <div
            className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden"
            style={{
              animation: 'pulseBorder 3s ease-in-out infinite',
              border: '4px solid rgba(255, 228, 236, 0.9)',
            }}
          >
            {imgError ? (
              <div className="w-full h-full bg-pink-300 flex items-center justify-center">
                <Heart size={48} className="text-white fill-white" />
              </div>
            ) : (
              <img
                src={siteConfig.profileImagePath}
                alt="Ivyshad Jepchumba"
                className="w-full h-full object-cover object-top"
                onError={() => setImgError(true)}
              />
            )}
          </div>

          {/* Decorative heart */}
          <div
            className="absolute -bottom-2 -right-2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg"
            style={{ border: '2px solid #ff6f91' }}
          >
            <Heart size={18} className="fill-rose-500 text-rose-500" />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="font-cursive text-4xl sm:text-5xl text-white mb-2"
          style={{ textShadow: '0 2px 15px rgba(89,13,34,0.3)' }}
        >
          {siteConfig.shortName}
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="font-serif-elegant italic text-pink-100 text-base sm:text-lg mb-10"
        >
          "{siteConfig.welcomeTagline}"
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          onClick={handleEnter}
          disabled={clicked}
          className="group relative px-10 py-4 rounded-full text-rose-700 font-body font-bold text-base sm:text-lg tracking-wide shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-70"
          style={{
            background: 'linear-gradient(135deg, #ffffff, #ffe4ec)',
            border: '2px solid rgba(232,67,115,0.4)',
            boxShadow: '0 8px 32px rgba(232,67,115,0.4)',
          }}
        >
          <span className="relative z-10">{siteConfig.openButtonText}</span>
          <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
        </motion.button>
      </div>
    </motion.div>
  );
}
