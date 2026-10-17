import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';

const ENVELOPE_MSG =
  "If I could give you one thing today, it would be the ability to see yourself through the eyes of people who appreciate you. You would understand just how special you are. ❤️";

export default function LoveEnvelope() {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      {!opened ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleOpen}
          className="group flex items-center gap-3 px-8 py-4 rounded-full font-body font-bold shadow-xl text-base transition-all"
          style={{
            background: 'linear-gradient(135deg, #fff5f8, #ffe4ec)',
            border: '2px solid rgba(232,67,115,0.4)',
            color: '#E84373',
          }}
        >
          <Mail size={20} className="group-hover:animate-bounce" />
          OPEN THIS LITTLE SURPRISE 💌
        </motion.button>
      ) : null}

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateX: -90 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="relative w-full"
          >
            {/* Envelope shape */}
            <div
              className="rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #fff0f5, #ffe4ec)',
                border: '2px solid rgba(192,128,129,0.5)',
              }}
            >
              {/* Envelope flap */}
              <div
                className="w-full h-16 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #ff6f91, #e84373)' }}
              >
                <Heart size={28} className="fill-white text-white" />
              </div>

              {/* Envelope body */}
              <div className="px-8 py-8 text-center">
                {/* Floating hearts on open */}
                <div className="flex justify-center gap-3 text-2xl mb-5" aria-hidden="true">
                  {['❤️','💗','🌹','💖','✨'].map((s, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i, duration: 0.4 }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="font-serif-elegant italic text-rose-800 text-lg leading-relaxed"
                >
                  "{ENVELOPE_MSG}"
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-6 text-3xl"
                  aria-hidden="true"
                >
                  💌
                </motion.div>
              </div>
            </div>

            {/* Re-seal button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setOpened(false)}
                className="px-5 py-2 rounded-full border border-rose-300 text-rose-400 font-body text-sm hover:bg-rose-50 transition-colors"
              >
                Close envelope
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
