import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export interface MusicPlayerHandle {
  play: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerHandle>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [bar, setBar] = useState([3, 5, 4, 6, 3]);

  useEffect(() => {
    const audio = new Audio(siteConfig.audioPath);
    audio.loop = true;
    audio.preload = 'metadata';
    audio.addEventListener('error', () => setHasError(true));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (hasError || !audioRef.current) return;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setVisible(true);
      }).catch(() => setVisible(true));
    },
  }));

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setBar([
        Math.floor(Math.random() * 7) + 2,
        Math.floor(Math.random() * 8) + 3,
        Math.floor(Math.random() * 6) + 2,
        Math.floor(Math.random() * 9) + 3,
        Math.floor(Math.random() * 7) + 2,
      ]);
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-4 z-50 glass-card rounded-2xl px-4 py-3 flex items-center gap-3 rose-gold-border shadow-lg"
      style={{ background: 'rgba(255, 228, 236, 0.9)' }}
    >
      <Music size={14} className="text-rose-500 flex-shrink-0" />

      {/* Visualizer bars */}
      {isPlaying && (
        <div className="flex items-end gap-[2px] h-5" aria-hidden="true">
          {bar.map((h, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-rose-400 transition-all duration-200"
              style={{ height: `${h * 2.5}px` }}
            />
          ))}
        </div>
      )}
      {!isPlaying && (
        <span className="text-xs font-body text-rose-400">Paused</span>
      )}

      {hasError && (
        <span className="text-xs text-rose-400 font-body">Add your song</span>
      )}

      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="w-8 h-8 rounded-full bg-rose-400 hover:bg-rose-500 flex items-center justify-center text-white transition-colors"
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
      </button>

      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        className="w-8 h-8 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center text-rose-500 transition-colors"
      >
        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>
    </div>
  );
});

MusicPlayer.displayName = 'MusicPlayer';
export default MusicPlayer;
