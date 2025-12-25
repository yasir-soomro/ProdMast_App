import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button, GlassCard } from './Shared';
import { Hexagon, Mail, Lock, User as UserIcon, Github, Chrome } from 'lucide-react';

interface AuthPageProps {
  type: 'login' | 'signup';
  onLogin: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ type, onLogin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin();
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#0F172A]">
       {/* Background Decoration */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
       </div>

       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="w-full max-w-md relative z-10"
       >
         <Link to="/" className="flex justify-center mb-8 group">
            <Hexagon className="w-10 h-10 text-primary fill-primary/10 group-hover:rotate-90 transition-transform duration-500" />
         </Link>

         <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              {type === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-400 text-center mb-8 text-sm">
              {type === 'login' 
                ? 'Enter your credentials to access the dashboard' 
                : 'Start your 14-day free trial today'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {type === 'signup' && (
                <div className="relative group">
                  <UserIcon className="absolute left-3 top-3.5 text-slate-500 w-5 h-5 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600"
                    required
                  />
                </div>
              )}
              
              <div className="relative group">
                <Mail className="absolute left-3 top-3.5 text-slate-500 w-5 h-5 group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600"
                  required
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-3 top-3.5 text-slate-500 w-5 h-5 group-focus-within:text-primary transition-colors" />
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600"
                  required
                />
              </div>

              {type === 'login' && (
                <div className="flex justify-end">
                  <Link to="#" className="text-xs text-primary hover:text-primary-dark">Forgot Password?</Link>
                </div>
              )}

              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? (
                   <span className="flex items-center gap-2">
                     <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     Processing...
                   </span>
                ) : (
                   type === 'login' ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-[#172033] text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 text-sm">
                 <Chrome size={18} /> Google
               </button>
               <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 text-sm">
                 <Github size={18} /> GitHub
               </button>
            </div>

            <div className="mt-8 text-center text-sm text-slate-400">
               {type === 'login' ? "Don't have an account? " : "Already have an account? "}
               <Link to={type === 'login' ? "/signup" : "/login"} className="text-primary font-medium hover:underline">
                 {type === 'login' ? "Sign up" : "Log in"}
               </Link>
            </div>
         </GlassCard>
       </motion.div>
    </div>
  );
};
