import React, { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Hexagon, ChevronRight, User, LogOut, LayoutDashboard } from 'lucide-react';
import { NavItem } from '../types';

// Navigation Items
const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass h-16' : 'bg-transparent h-20'
      } flex items-center justify-center`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8">
            <Hexagon className="w-8 h-8 text-primary fill-primary/10 group-hover:rotate-90 transition-transform duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
            ProdMast
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-medium transition-all duration-200 hover:text-primary ${
                location.pathname === item.href ? 'text-primary' : 'text-slate-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" icon={<LayoutDashboard size={16}/>}>Dashboard</Button>
              </Link>
              <Button variant="outline" size="sm" onClick={onLogout} icon={<LogOut size={16}/>}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Log In
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 glass border-t border-slate-700 p-6 md:hidden flex flex-col gap-4 bg-background/95 backdrop-blur-xl"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-lg font-medium text-slate-300 hover:text-primary py-2 border-b border-slate-800"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
               {isAuthenticated ? (
                 <>
                   <Link to="/dashboard" className="w-full">
                     <Button variant="primary" className="w-full">Dashboard</Button>
                   </Link>
                   <Button variant="outline" onClick={onLogout} className="w-full">Logout</Button>
                 </>
               ) : (
                 <>
                   <Link to="/login" className="w-full">
                     <Button variant="outline" className="w-full">Log In</Button>
                   </Link>
                   <Link to="/signup" className="w-full">
                     <Button variant="primary" className="w-full">Sign Up Free</Button>
                   </Link>
                 </>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => (
  <footer className="bg-[#0B1121] border-t border-slate-800 pt-16 pb-8 relative overflow-hidden">
     {/* Decorative glow */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
    
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
             <Hexagon className="text-primary fill-primary/20" />
             <span className="text-xl font-bold text-white">ProdMast</span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed">
            Empowering modern manufacturing with AI-driven insights, real-time tracking, and seamless production management.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/services" className="hover:text-primary transition-colors">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary transition-colors">Integration</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">Enterprise</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="#" className="hover:text-primary transition-colors">Documentation</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">API Reference</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Community</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Security</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-sm">© 2025 ProdMast Inc. All rights reserved.</p>
        <div className="flex gap-4">
          {/* Social icons placeholders */}
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-slate-400">
            <span className="font-bold text-xs">Tw</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-slate-400">
            <span className="font-bold text-xs">Li</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer text-slate-400">
             <span className="font-bold text-xs">Gh</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5",
    secondary: "bg-surface text-white hover:bg-slate-700 border border-slate-700",
    outline: "bg-transparent border border-primary text-primary hover:bg-primary/10",
    ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export const SectionHeader: React.FC<{ title: string; subtitle?: string; center?: boolean }> = ({ title, subtitle, center }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-slate-400 max-w-2xl mx-auto leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export const GlassCard: React.FC<{ children: ReactNode; className?: string; hoverEffect?: boolean }> = ({ children, className = '', hoverEffect = true }) => (
  <div className={`glass-card rounded-2xl p-6 ${hoverEffect ? 'hover:scale-[1.02] hover:border-primary/30 transition-all duration-300' : ''} ${className}`}>
    {children}
  </div>
);