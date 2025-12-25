import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Cpu, Activity, ShieldCheck, Zap } from 'lucide-react';

interface WelcomeSplashProps {
  onStartExit: () => void;
  isExiting: boolean;
}

export const WelcomeSplash: React.FC<WelcomeSplashProps> = ({ onStartExit, isExiting }) => {
  
  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 1, delay: 0.5 }} // Fade out UI slowly while 3D warps
    >
      {/* Overlay UI - Pointer events auto for buttons */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 pointer-events-auto">
        <AnimatePresence>
          {!isExiting && (
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
                onClick={onStartExit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full cursor-pointer"
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
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-white/20 rounded-tl-3xl pointer-events-none" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-white/20 rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-white/20 rounded-bl-3xl pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-white/20 rounded-br-3xl pointer-events-none" />
    </motion.div>
  );
};