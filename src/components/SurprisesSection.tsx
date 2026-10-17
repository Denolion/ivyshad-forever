import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import LoveMessageGenerator from '@/components/LoveMessageGenerator';
import LoveEnvelope from '@/components/LoveEnvelope';
import RoseGarden from '@/components/RoseGarden';
import SurpriseButton from '@/components/SurpriseButton';

export default function SurprisesSection() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section
      id="surprises"
      className="relative px-4 py-24"
      style={{ background: 'linear-gradient(180deg, #ffe4ec 0%, #fff5f8 50%, #ffe4ec 100%)' }}
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-20">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-cursive text-4xl sm:text-5xl text-rose-600 mb-3">
            Little Surprises For You
          </h2>
          <p className="font-serif-elegant italic text-rose-400 text-lg">
            Because you deserve beautiful moments every single day.
          </p>
        </motion.div>

        {/* Love Message Generator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-2"
        >
          <h3 className="font-cursive text-3xl text-rose-500 mb-4 text-center">
            A Little Love Message 💌
          </h3>
          <LoveMessageGenerator />
        </motion.div>

        {/* Love Envelope */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <h3 className="font-cursive text-3xl text-rose-500 mb-6 text-center">
            A Little Envelope 💌
          </h3>
          <LoveEnvelope />
        </motion.div>

        {/* Rose Garden */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <RoseGarden />
        </motion.div>

        {/* Final Surprise Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-4 pt-4"
        >
          <p className="font-serif-elegant italic text-rose-400 text-center text-lg">
            One final thing, especially for you, {siteConfig.shortName}...
          </p>
          <SurpriseButton />
        </motion.div>
      </div>

      {/* Back to top */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showTop ? 1 : 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-4 z-40 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors"
        style={{ background: 'linear-gradient(135deg, #E84373, #FF6F91)' }}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <ChevronUp size={18} className="text-white" />
      </motion.button>
    </section>
  );
}
