import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeScreen from '@/components/WelcomeScreen';
import Navigation from '@/components/Navigation';
import MusicPlayer, { type MusicPlayerHandle } from '@/components/MusicPlayer';
import FloatingHearts from '@/components/FloatingHearts';
import LoveLetter from '@/components/LoveLetter';
import PhotoGallery from '@/components/PhotoGallery';
import ReasonsCounter from '@/components/ReasonsCounter';
import SurprisesSection from '@/components/SurprisesSection';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/siteConfig';

export default function App() {
  const [entered, setEntered] = useState(false);
  const musicRef = useRef<MusicPlayerHandle>(null);
  const handleEnter = () => { setEntered(true); setTimeout(() => musicRef.current?.play(), 900); };
  return <>
    <AnimatePresence>{!entered && <WelcomeScreen onEnter={handleEnter} />}</AnimatePresence>
    <MusicPlayer ref={musicRef} />
    <FloatingHearts active={entered} />
    {entered && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8 }}>
      <Navigation />
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16 text-center overflow-hidden" style={{ background:'linear-gradient(180deg,#fff5f8 0%,#ffe4ec 50%,#fff5f8 100%)' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">{['✨','💫','🌸'].map((s,i)=><span key={i} className="absolute text-3xl opacity-20" style={{ left:`${10+i*40}%`, top:`${20+i*20}%`, animation:`gentleFloat ${4+i}s ease-in-out infinite`, animationDelay:`${i*1.2}s` }}>{s}</span>)}</div>
        <style>{`@keyframes gentleFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:1 }} className="relative z-10 max-w-xl mx-auto">
          <p className="font-cursive text-2xl sm:text-3xl text-rose-400 mb-3">Welcome, my beautiful</p>
          <h1 className="font-cursive text-6xl sm:text-8xl text-rose-600 mb-4 leading-none" style={{ textShadow:'0 0 40px rgba(232,67,115,.2)' }}>{siteConfig.shortName}</h1>
          <p className="font-serif-elegant italic text-rose-400 text-xl sm:text-2xl mb-8">This little website was made with all the love in the world, just for you.</p>
          <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.5, repeat:Infinity }} className="flex flex-col items-center gap-1 text-rose-300 mt-6"><span className="font-body text-xs tracking-widest uppercase">scroll down</span><div className="w-0.5 h-8 rounded-full bg-rose-300" /></motion.div>
        </motion.div>
      </section>
      <LoveLetter /><PhotoGallery /><ReasonsCounter /><SurprisesSection /><Footer />
    </motion.div>}
  </>;
}
