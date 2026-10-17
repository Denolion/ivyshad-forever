import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

const LETTER = siteConfig.loveLetter;

export default function LoveLetter() {
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  const startTyping = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    indexRef.current = 0;
    setDisplayed('');
    setDone(false);
    setTyping(true);
    setStarted(true);

    intervalRef.current = setInterval(() => {
      if (indexRef.current >= LETTER.length) {
        clearInterval(intervalRef.current!);
        setTyping(false);
        setDone(true);
        return;
      }
      const chunk = LETTER.slice(0, indexRef.current + 1);
      setDisplayed(chunk);
      indexRef.current += 1;
    }, 28);
  };

  const revealAll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayed(LETTER);
    setTyping(false);
    setDone(true);
    setStarted(true);
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <section
      id="love-letter"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24"
      style={{ background: 'linear-gradient(180deg, #fff5f8 0%, #ffe4ec 100%)' }}
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {['❤️','💗','💖'].map((s, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${15 + i * 35}%`,
              top: `${20 + i * 25}%`,
              animation: `gentleFloat ${3 + i}s ease-in-out infinite`,
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
          50% { transform: translateY(-10px); }
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl"
      >
        {/* Section heading */}
        <div className="text-center mb-8">
          <h2 className="font-cursive text-5xl sm:text-6xl text-rose-600 mb-2">
            Dear {siteConfig.shortName}
          </h2>
          <div className="flex justify-center gap-2 text-2xl">❤️ 🌹 ❤️</div>
        </div>

        {/* Card */}
        <div
          className="relative rounded-3xl p-8 sm:p-10 shadow-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(192, 128, 129, 0.4)',
            boxShadow: '0 8px 60px rgba(232, 67, 115, 0.15)',
          }}
        >
          {/* Glowing corner accents */}
          <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-rose-300 opacity-60" />
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-rose-300 opacity-60" />
          <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-rose-300 opacity-60" />
          <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-rose-300 opacity-60" />

          {/* Letter text */}
          {!started ? (
            <div className="flex flex-col items-center gap-6 py-8">
              <p className="font-serif-elegant text-rose-400 italic text-center text-lg">
                A love letter written just for you...
              </p>
              <button
                onClick={startTyping}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-body font-semibold transition-all hover:scale-105 shadow-lg"
              >
                Read My Letter <ChevronDown size={18} />
              </button>
            </div>
          ) : (
            <div className="min-h-64">
              <pre
                className="font-serif-elegant text-base sm:text-lg text-rose-900 leading-relaxed whitespace-pre-wrap"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {displayed}
                {typing && (
                  <span style={{ animation: 'blink 1s step-end infinite', color: '#E84373' }}>|</span>
                )}
              </pre>
            </div>
          )}

          {/* Controls */}
          {started && (
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              <button
                onClick={startTyping}
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-rose-300 text-rose-500 hover:bg-rose-50 font-body text-sm transition-all"
                aria-label="Replay typing animation"
              >
                <RotateCcw size={14} /> Replay
              </button>
              {!done && (
                <button
                  onClick={revealAll}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-600 font-body text-sm transition-all"
                >
                  Reveal All ❤️
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
