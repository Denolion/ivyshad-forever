import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export default function LoveMessageGenerator() {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState(0);
  const [lastIdx, setLastIdx] = useState(-1);

  const generate = () => {
    let idx = Math.floor(Math.random() * siteConfig.loveMessages.length);
    while (idx === lastIdx && siteConfig.loveMessages.length > 1) {
      idx = Math.floor(Math.random() * siteConfig.loveMessages.length);
    }
    setMessage(siteConfig.loveMessages[idx]);
    setLastIdx(idx);
    setKey(k => k + 1);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={generate}
        className="flex items-center gap-3 px-8 py-4 rounded-full font-body font-bold text-white shadow-xl text-base"
        style={{ background: 'linear-gradient(135deg, #E84373, #FF6F91)' }}
      >
        <Shuffle size={18} />
        GIVE ME A LITTLE LOVE ❤️
      </motion.button>

      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-2xl px-8 py-6 text-center"
            style={{ border: '1px solid rgba(192,128,129,0.3)' }}
          >
            <p className="font-serif-elegant text-lg text-rose-800 leading-relaxed italic">
              "{message}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
