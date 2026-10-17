import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Love Letter', href: '#love-letter' },
  { label: 'Our Beautiful Moment', href: '#gallery' },
  { label: 'Reasons You\'re Special', href: '#reasons' },
  { label: 'Little Surprises', href: '#surprises' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <nav
        className="glass-card mx-3 mt-3 rounded-2xl px-5 py-3 flex items-center justify-between"
        style={{ background: 'rgba(255, 228, 236, 0.88)' }}
      >
        <button
          onClick={() => handleClick('#home')}
          className="flex items-center gap-2 font-cursive text-2xl text-rose-600"
          aria-label="Go to home"
        >
          <Heart size={16} className="fill-rose-500 text-rose-500" />
          Ivyshad
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <button
                onClick={() => handleClick(link.href)}
                className="text-sm font-body text-rose-700 hover:text-rose-500 transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile burger */}
        <button
          className="md:hidden text-rose-600 hover:text-rose-500 transition-colors"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-3 mt-1 rounded-2xl shadow-xl overflow-hidden"
            style={{ background: 'rgba(255, 228, 236, 0.97)' }}
          >
            <ul className="flex flex-col py-3">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => handleClick(link.href)}
                    className="w-full text-left px-6 py-3 text-sm font-body text-rose-700 hover:bg-rose-100 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
