import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { Activity, Box, Users, AlertCircle, TrendingUp } from 'lucide-react';
import { GlassCard } from './Shared';
import { ChartData } from '../types';

const DATA: ChartData[] = [
  { name: 'Mon', value: 4000, value2: 2400 },
  { name: 'Tue', value: 3000, value2: 1398 },
  { name: 'Wed', value: 2000, value2: 9800 },
  { name: 'Thu', value: 2780, value2: 3908 },
  { name: 'Fri', value: 1890, value2: 4800 },
  { name: 'Sat', value: 2390, value2: 3800 },
  { name: 'Sun', value: 3490, value2: 4300 },
];

const METRICS = [
  { label: 'Total Production', value: '12,450', unit: 'units', icon: <Box className="text-primary" />, trend: +12.5 },
  { label: 'Efficiency Rate', value: '94.2', unit: '%', icon: <Activity className="text-accent" />, trend: +2.1 },
  { label: 'Active Workers', value: '142', unit: 'staff', icon: <Users className="text-purple-400" />, trend: -0.5 },
  { label: 'Downtime', value: '0.4', unit: 'hrs', icon: <AlertCircle className="text-red-400" />, trend: -15.3 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="pt-24 pb-12 px-6 container mx-auto">
      <header className="mb-8 flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
           <p className="text-slate-400">Welcome back, Production Manager.</p>
        </div>
        <div className="text-right hidden md:block">
           <p className="text-sm text-slate-500">Last updated: Just now</p>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {METRICS.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="flex flex-col h-full" hoverEffect={false}>
               <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-white/5 rounded-lg">{metric.icon}</div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${metric.trend > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {metric.trend > 0 ? '+' : ''}{metric.trend}%
                  </span>
               </div>
               <div className="mt-auto">
                 <h3 className="text-slate-400 text-sm font-medium">{metric.label}</h3>
                 <div className="flex items-baseline gap-1 mt-1">
                   <span className="text-2xl font-bold text-white">{metric.value}</span>
                   <span className="text-xs text-slate-500">{metric.unit}</span>
                 </div>
               </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Production Output vs Target</h3>
              <button className="text-xs text-primary border border-primary/20 px-3 py-1 rounded-full hover:bg-primary/10 transition">Weekly</button>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C9A7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00C9A7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                <XAxis dataKey="name" stroke="#64748B" axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#64748B" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px', color: '#F1F5F9' }}
                  itemStyle={{ color: '#F1F5F9' }}
                />
                <Area type="monotone" dataKey="value" stroke="#00C9A7" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                <Area type="monotone" dataKey="value2" stroke="#38BDF8" strokeWidth={3} fillOpacity={1} fill="url(#colorValue2)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Secondary Chart */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.5 }}
        >
           <GlassCard className="h-[400px]">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">Efficiency Analysis</h3>
                <TrendingUp size={16} className="text-slate-400" />
             </div>
             <ResponsiveContainer width="100%" height="85%">
                <BarChart data={DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                  <XAxis dataKey="name" stroke="#64748B" axisLine={false} tickLine={false} dy={10} />
                  <Tooltip 
                     cursor={{fill: '#334155', opacity: 0.2}}
                     contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px', color: '#F1F5F9' }}
                  />
                  <Bar dataKey="value" fill="#00C9A7" radius={[4, 4, 0, 0]} />
                </BarChart>
             </ResponsiveContainer>
           </GlassCard>
        </motion.div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
         <GlassCard className="flex items-center justify-between p-8">
            <div>
               <h4 className="text-xl font-bold text-white mb-2">Upgrade to Pro</h4>
               <p className="text-slate-400 text-sm mb-4">Unlock advanced AI predictive maintenance models.</p>
               <button className="text-primary font-semibold text-sm hover:underline">View Plans</button>
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-blue-500 opacity-20 animate-pulse"></div>
         </GlassCard>
      </div>
    </div>
  );
};