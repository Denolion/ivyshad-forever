import { useState, useEffect, useRef, useCallback } from 'react';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  symbol: string;
}

const SYMBOLS = ['❤️', '💗', '💖', '💕', '💘', '💝', '🌹', '✨', '🥰'];

export default function FloatingHearts({ active }: { active: boolean }) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const counterRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const spawnHeart = useCallback(() => {
    const id = counterRef.current++;
    const heart: FloatingHeart = {
      id,
      x: Math.random() * 100,
      size: 14 + Math.random() * 18,
      duration: 6 + Math.random() * 8,
      delay: 0,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    };
    setHearts(prev => [...prev.slice(-25), heart]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id));
    }, (heart.duration + 1) * 1000);
  }, []);

  useEffect(() => {
    if (!active) return;
    spawnHeart();
    intervalRef.current = setInterval(spawnHeart, 900);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, spawnHeart]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {hearts.map(heart => (
        <span
          key={heart.id}
          className="absolute bottom-0 select-none"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            animation: `floatUp ${heart.duration}s ease-in forwards`,
          }}
        >
          {heart.symbol}
        </span>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-110vh) rotate(${Math.random() > 0.5 ? '' : '-'}${Math.floor(Math.random() * 30 + 10)}deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
