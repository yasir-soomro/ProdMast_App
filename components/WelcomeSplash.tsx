import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Cpu, Activity, ShieldCheck, Zap } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Intro3D } from './ThreeScene';

interface WelcomeSplashProps {
  onEnter: () => void;
}

export const WelcomeSplash: React.FC<WelcomeSplashProps> = ({ onEnter }) => {
  const [exiting, setExiting] = useState(false);

  const handleEnter = () => {
    setExiting(true);
    // Wait for the 3D warp animation before unmounting
    setTimeout(() => {
      onEnter();
    }, 1500); 
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: 'none', transition: { duration: 1 } }}
    >
      {/* 3D Background specifically for Intro */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} color="#38BDF8" intensity={2} />
          <pointLight position={[-10, -10, -10]} color="#00C9A7" intensity={2} />
          <Intro3D exiting={exiting} />
        </Canvas>
      </div>

      {/* Overlay UI */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
        <AnimatePresence>
          {!exiting && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 mb-6 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-slate-400 tracking-widest uppercase">Systems Online</span>
              </motion.div>

              <motion.h1 
                className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 tracking-tighter mb-4"
                initial={{ letterSpacing: "10px", filter: "blur(10px)" }}
                animate={{ letterSpacing: "-2px", filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: "circOut" }}
              >
                PRODMAST
              </motion.h1>

              <motion.p 
                className="text-lg md:text-xl text-slate-400 max-w-lg mb-12 leading-relaxed font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                The next generation of manufacturing intelligence. <br/>
                <span className="text-primary font-medium">Immersive. Real-time. Secure.</span>
              </motion.p>

              <motion.button
                onClick={handleEnter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full"
              >
                 <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/80 to-blue-500/80 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                 <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-blue-500 opacity-20 group-hover:opacity-40 transition-opacity border border-white/20 rounded-full" />
                 
                 <div className="relative flex items-center gap-3 text-white font-bold tracking-widest uppercase text-sm">
                    Enter Platform
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </div>
              </motion.button>

              <motion.div 
                className="mt-16 flex gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.5 }}
              >
                 <Cpu className="w-6 h-6 text-slate-400" />
                 <Activity className="w-6 h-6 text-slate-400" />
                 <ShieldCheck className="w-6 h-6 text-slate-400" />
                 <Zap className="w-6 h-6 text-slate-400" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-white/20 rounded-tl-3xl" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-white/20 rounded-tr-3xl" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-white/20 rounded-bl-3xl" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-white/20 rounded-br-3xl" />
    </motion.div>
  );
};