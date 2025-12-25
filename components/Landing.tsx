import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hero3D } from './ThreeScene';
import { Button, SectionHeader, GlassCard } from './Shared';
import { WelcomeSplash } from './WelcomeSplash';
import { Settings, Cpu, ShieldCheck, Zap, Globe, BarChart3, ArrowRight, Check, Activity, ChevronRight } from 'lucide-react';
import { Service, PricingPlan } from '../types';

const SERVICES: Service[] = [
  { id: '1', title: 'Smart Assembly', description: 'Automated assembly line management with real-time error detection.', icon: <Settings className="w-8 h-8 text-primary" /> },
  { id: '2', title: 'IoT Integration', description: 'Seamlessly connect all your machinery for unified data streams.', icon: <Cpu className="w-8 h-8 text-blue-400" /> },
  { id: '3', title: 'Quality Control', description: 'AI-powered visual inspection to ensure 99.9% defect-free output.', icon: <ShieldCheck className="w-8 h-8 text-green-400" /> },
  { id: '4', title: 'Predictive Analytics', description: 'Forecast maintenance needs before breakdowns occur.', icon: <BarChart3 className="w-8 h-8 text-purple-400" /> },
  { id: '5', title: 'Global Logistics', description: 'Real-time supply chain tracking across continents.', icon: <Globe className="w-8 h-8 text-orange-400" /> },
  { id: '6', title: 'Energy Optimization', description: 'Reduce carbon footprint with smart energy consumption algorithms.', icon: <Zap className="w-8 h-8 text-yellow-400" /> },
];

const PRICING: PricingPlan[] = [
  { name: 'Starter', price: '$499', features: ['Up to 5 Production Lines', 'Basic Analytics', 'Email Support', '1 Year Data Retention'] },
  { name: 'Professional', price: '$1,299', features: ['Unlimited Production Lines', 'AI Predictive Models', '24/7 Priority Support', '5 Year Data Retention', 'Custom Integrations'], popular: true },
  { name: 'Enterprise', price: 'Custom', features: ['Dedicated Account Manager', 'On-Premise Deployment', 'SLA Guarantees', 'Unlimited History', 'Full API Access'] },
];

export const Landing: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <WelcomeSplash key="splash" onEnter={() => setShowSplash(false)} />
      ) : (
        <motion.div
           key="landing"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1 }}
        >
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <Hero3D />
            <div className="container mx-auto px-6 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full glass border border-primary/20 bg-primary/5">
                  <span className="text-primary text-xs font-bold uppercase tracking-wider">New: AI 2.0 Engine Released</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                  Efficient and Integrated <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 text-glow">
                    Manufacturing Services
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Elevate your production with the world's most advanced SaaS platform. 
                  Real-time insights, AI-driven optimization, and seamless control—all in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup">
                    <Button size="lg" icon={<ArrowRight size={18} />}>Start Free Trial</Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg">Book Demo</Button>
                  </Link>
                </div>
              </motion.div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-primary rounded-full" />
              </div>
            </motion.div>
          </section>

          {/* Services Section */}
          <section className="py-24 relative bg-[#0F172A]">
            <div className="container mx-auto px-6">
              <SectionHeader 
                title="Intelligent Manufacturing" 
                subtitle="Our suite of tools covers every aspect of the modern production floor, from raw material to final delivery."
                center
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES.map((service, idx) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <GlassCard className="h-full flex flex-col items-start p-8 group">
                      <div className="p-3 bg-white/5 rounded-xl mb-6 group-hover:bg-primary/10 transition-colors">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-slate-400 leading-relaxed mb-6">{service.description}</p>
                      <Link to={`/services#${service.id}`} className="mt-auto text-primary text-sm font-semibold flex items-center group-hover:gap-2 transition-all">
                        Learn more <ChevronRight size={14} className="ml-1" />
                      </Link>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats/Feature Split */}
          <section className="py-24 bg-surface/30 relative overflow-hidden">
            <div className="container mx-auto px-6">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                  <div className="lg:w-1/2">
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                        {/* Simulated 3D Graphic via CSS/SVG */}
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px]" />
                            <div className="relative z-10 grid grid-cols-2 gap-4">
                              <GlassCard className="col-span-2 !bg-slate-900/80">
                                  <div className="flex items-center gap-4 mb-4">
                                    <Activity className="text-primary" />
                                    <div>
                                      <div className="text-xs text-slate-400">System Status</div>
                                      <div className="text-white font-bold">Optimal</div>
                                    </div>
                                  </div>
                                  <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[92%]" />
                                  </div>
                              </GlassCard>
                              <GlassCard className="!bg-slate-900/80 flex items-center justify-center flex-col">
                                  <span className="text-3xl font-bold text-white">99%</span>
                                  <span className="text-xs text-slate-400">Uptime</span>
                              </GlassCard>
                              <GlassCard className="!bg-slate-900/80 flex items-center justify-center flex-col">
                                  <span className="text-3xl font-bold text-white">24/7</span>
                                  <span className="text-xs text-slate-400">Monitoring</span>
                              </GlassCard>
                            </div>
                        </div>
                    </motion.div>
                  </div>
                  <div className="lg:w-1/2">
                    <SectionHeader title="Real-time Control" />
                    <p className="text-slate-400 text-lg mb-8">
                      Stop guessing. Start knowing. ProdMast gives you granular visibility into every machine, worker, and process in your factory.
                    </p>
                    <ul className="space-y-4 mb-8">
                        {[
                          'Live 3D Digital Twin visualization',
                          'Instant alert notifications on mobile',
                          'Historical data replay & analysis',
                          'Drag-and-drop workflow builder'
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-300">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                              <Check size={14} className="text-primary" />
                            </div>
                            {item}
                          </li>
                        ))}
                    </ul>
                    <Link to="/signup">
                      <Button variant="primary">Explore Platform</Button>
                    </Link>
                  </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="py-24 relative">
            <div className="container mx-auto px-6">
              <SectionHeader title="Transparent Pricing" subtitle="Choose the plan that fits your factory scale." center />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {PRICING.map((plan, idx) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <GlassCard className={`h-full relative flex flex-col ${plan.popular ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}>
                          {plan.popular && (
                            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                              <span className="bg-primary text-slate-900 text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>
                            </div>
                          )}
                          <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                          <div className="mb-6">
                            <span className="text-4xl font-bold text-white">{plan.price}</span>
                            {plan.price !== 'Custom' && <span className="text-slate-500">/mo</span>}
                          </div>
                          <ul className="space-y-3 mb-8 flex-1">
                            {plan.features.map((feat, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                <Check size={16} className="text-primary mt-0.5 shrink-0" />
                                {feat}
                              </li>
                            ))}
                          </ul>
                          <Link to="/signup" className="w-full">
                            <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full">Choose Plan</Button>
                          </Link>
                      </GlassCard>
                    </motion.div>
                  ))}
              </div>
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5"></div>
            <div className="container mx-auto px-6 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to optimize your production?</h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">Join 500+ manufacturing leaders using ProdMast today.</p>
                <Link to="/signup">
                    <Button size="lg" className="px-12">Get Started Now</Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};