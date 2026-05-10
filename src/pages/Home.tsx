import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Globe, TrendingUp, Lock, Menu, X, Zap, 
  Activity, ChevronRight, CheckCircle2, Wallet, KeyRound,
  ArrowUpRight, BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Professional Portfolios for HNW Investors
  const PLANS = [
    { 
      name: "Alpha Growth", 
      daily: "2.5%", 
      min: "€500", 
      period: "30 Days", 
      desc: "Entry-level institutional strategy with daily liquidity and secured cold-storage." 
    },
    { 
      name: "Institutional Pro", 
      daily: "4.8%", 
      min: "€5,000", 
      period: "60 Days", 
      featured: true, 
      desc: "Our flagship high-frequency trading model for rapid capital growth and compounding." 
    },
    { 
      name: "Vault Private", 
      daily: "Custom", 
      min: "€50,000", 
      period: "Bespoke", 
      desc: "Bespoke wealth management with physically air-gapped physical vault custody." 
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#10b981] selection:text-white">
      {/* Institutional Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#10b981] p-1.5 rounded-lg shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-black uppercase italic tracking-tighter">Vander Vault <span className="text-[#10b981] not-italic">Holdings</span></span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-white/30">
              <span>London HQ</span>
              <span>Frankfurt EU Office</span>
            </div>
            <button className="bg-[#10b981] text-black px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/20">Investor Terminal</button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section - Preserving your KYC/2FA/Wallet Logic */}
        <section className="relative pt-48 pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.12),transparent_50%)]" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-8">
                  <Zap className="w-3 h-3 fill-emerald-400" /> Insured Custody · KYC · 2FA · Global Terminal v4.2
                </div>
                <h1 className="text-7xl lg:text-[100px] font-black tracking-tighter leading-[0.85] mb-10 uppercase italic">
                  Secure Wealth. <br /><span className="text-[#10b981]">Accelerate Capital.</span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/50 mb-12 max-w-2xl font-medium leading-relaxed">
                  The premier digital wealth partner for HNW investors. <br/>High-performance portfolios starting from <span className="text-white font-bold">€500</span>.
                </p>
                <div className="flex flex-col sm:flex-row gap-5">
                  <button className="px-10 py-5 bg-[#10b981] text-black rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3 active:scale-95">
                    Deploy Capital <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all">Wealth Solutions</button>
                </div>
              </motion.div>
            </div>

            {/* Live Terminal Insights */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="mt-24 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 lg:p-12 backdrop-blur-xl">
               <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                 <div className="flex gap-4 font-mono text-[10px] text-white/40 uppercase tracking-widest font-bold">
                   <span className="flex items-center gap-2"><Activity className="w-4 h-4 text-[#10b981]"/> Node: STABLE</span>
                   <span className="hidden sm:inline">|</span>
                   <span className="hidden sm:inline">Execution: 4.2ms</span>
                 </div>
                 <div className="text-[10px] font-mono text-[#10b981] flex items-center gap-2 font-black uppercase tracking-[0.2em] animate-pulse">Live_BTC_Stream</div>
               </div>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                  {[
                    { label: 'BTC/EUR', value: '€91,248', change: '+2.4%', color: 'text-emerald-400' },
                    { label: 'ETH/EUR', value: '€2,684', change: '+1.8%', color: 'text-emerald-400' },
                    { label: 'Managed Assets', value: '€42.8B', change: 'VERIFIED', color: 'text-emerald-400' },
                    { label: 'Payout Reliability', value: '99.9%', change: 'GUARANTEED', color: 'text-[#10b981]' },
                  ].map(stat => (
                    <div key={stat.label}>
                      <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">{stat.label}</div>
                      <div className="text-3xl font-black font-mono tracking-tighter mb-1">{stat.value}</div>
                      <div className={`text-[10px] font-black uppercase tracking-widest ${stat.color}`}>{stat.change}</div>
                    </div>
                  ))}
               </div>
            </motion.div>
          </div>
        </section>

        {/* Investment Portfolios - Fixed Logic Section */}
        <section id="plans" className="py-32 bg-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <h2 className="text-5xl lg:text-6xl font-black mb-8 uppercase italic tracking-tighter">Strategic Yield</h2>
              <p className="text-white/40 text-lg font-medium">Select a high-performance strategy tailored for your HNW portfolio goals.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {PLANS.map((plan, i) => (
                <div key={i} className={`p-10 rounded-[3rem] border transition-all duration-500 group relative overflow-hidden ${
                  plan.featured ? "bg-white text-black border-white shadow-2xl scale-105" : "bg-[#0a0a0a] border-white/5 hover:border-[#10b981]/50"
                }`}>
                  {plan.featured && <span className="absolute top-0 right-0 px-8 py-3 bg-[#10b981] text-black text-[10px] font-black uppercase tracking-widest rounded-bl-3xl">Institutional Choice</span>}
                  <h3 className="text-2xl font-black mb-2 uppercase italic">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-10">
                    <span className="text-6xl font-black tracking-tighter">{plan.daily}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Daily Return</span>
                  </div>
                  <div className="space-y-5 mb-12 pb-12 border-b border-current opacity-10 font-black uppercase tracking-[0.2em] text-[10px]">
                    <div className="flex justify-between"><span>Min. Commitment</span><span>{plan.min}</span></div>
                    <div className="flex justify-between"><span>Duration</span><span>{plan.period}</span></div>
                  </div>
                  <p className="text-sm font-medium mb-12 leading-relaxed opacity-60 italic">{plan.desc}</p>
                  <button className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] transition-all active:scale-95 ${
                    plan.featured ? "bg-black text-white hover:bg-slate-800" : "bg-[#10b981] text-black hover:bg-emerald-400"
                  }`}>Deploy Capital</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security & Infrastructure - KYC, 2FA, Wallet Screening */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-5xl font-black mb-12 uppercase italic tracking-tighter">Fortress Custody.</h2>
                <div className="space-y-12">
                  {[
                    { icon: <Lock className="w-8 h-8" />, title: "2FA / Biometric", desc: "Multi-factor authentication via hardware keys and biometric nodes." },
                    { icon: <ShieldCheck className="w-8 h-8" />, title: "Institutional KYC", desc: "Rigorous identity verification meeting all EU and Global standards." },
                    { icon: <Wallet className="w-8 h-8" />, title: "Wallet Screening", desc: "Real-time AML screening on all blockchain-based capital operations." },
                    { icon: <Globe className="w-8 h-8" />, title: "Global Compliance", desc: "Serving investors from London to Frankfurt with physical representation." }
                  ].map((f, i) => (
                    <div key={i} className="flex gap-8 group">
                      <div className="shrink-0 w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center transition-all group-hover:border-[#10b981]/50 text-[#10b981]">{f.icon}</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">{f.title}</h4>
                        <p className="text-white/40 leading-relaxed text-sm font-medium">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                 <div className="absolute inset-0 bg-[#10b981]/20 blur-[120px] rounded-full" />
                 <div className="relative bg-white/5 border border-white/10 p-20 rounded-[4rem] text-center backdrop-blur-3xl">
                    <BarChart3 className="w-24 h-24 text-[#10b981] mx-auto mb-10" />
                    <div className="text-7xl font-black mb-2 tracking-tighter uppercase italic">99.99%</div>
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Node Uptime Guaranteed</div>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Professional Footer */}
      <footer className="py-24 border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-3 mb-12">
            <div className="bg-[#10b981] p-2 rounded-xl shadow-lg shadow-emerald-500/20"><ShieldCheck className="w-7 h-7 text-black" /></div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">Vander Vault <span className="text-[#10b981] not-italic">Holdings</span></span>
          </div>
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] mb-4">© {new Date().getFullYear()} Vander Vault Holdings. Institutional Client Group.</p>
          <p className="text-white/10 text-[8px] font-bold uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
            Registered Offices: London, UK | Frankfurt, Germany. <br/> Certified by Global Digital Asset Oversight. 
          </p>
        </div>
      </footer>
    </div>
  );
                    }
