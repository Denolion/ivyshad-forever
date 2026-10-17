import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/siteConfig';

const TARGET = 100;

export default function ReasonsCounter() {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          let current = 0;
          const step = Math.ceil(TARGET / 60);
          const interval = setInterval(() => {
            current = Math.min(current + step, TARGET);
            setCount(current);
            if (current >= TARGET) clearInterval(interval);
          }, 25);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section
      id="reasons"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24"
      style={{ background: 'linear-gradient(180deg, #fff5f8 0%, #ffe4ec 100%)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="font-cursive text-4xl sm:text-5xl text-rose-600 mb-4">
          Reasons You're Special
        </h2>

        {/* Counter */}
        <div className="inline-flex flex-col items-center mb-6">
          <span
            className="font-cursive text-9xl text-rose-500"
            style={{ textShadow: '0 0 40px rgba(232,67,115,0.3)' }}
          >
            {count}
          </span>
          <span className="font-serif-elegant italic text-rose-400 text-xl -mt-2">
            and counting...
          </span>
        </div>

        <p className="font-body text-rose-500 max-w-md mx-auto text-base">
          Here are just a few of the beautiful things that make you, <em>you</em>.
        </p>
      </motion.div>

      {/* Reasons grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl w-full">
        {siteConfig.reasons.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="glass-card rounded-2xl p-4 text-center"
            style={{ border: '1px solid rgba(192,128,129,0.3)' }}
          >
            <span className="text-2xl mb-2 block">
              {['💗', '🌹', '✨', '💖', '🥰', '💕', '🌸', '💝', '❤️', '🌺', '💫', '🫶', '💞', '🌷', '💓'][i % 15]}
            </span>
            <p className="font-serif-elegant text-sm text-rose-700 leading-snug">{reason}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
