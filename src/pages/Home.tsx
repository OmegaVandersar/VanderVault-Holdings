import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Globe, TrendingUp, Lock, Menu, X, Zap, 
  Activity, ChevronRight, CheckCircle2, Wallet, KeyRound 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const PLANS = [
    { name: "Alpha Growth", daily: "2.5%", min: "€500", period: "30 Days", desc: "Entry-level HNW portfolio with daily liquidity." },
    { name: "Institutional Pro", daily: "4.8%", min: "€5,000", period: "60 Days", featured: true, desc: "High-frequency trading model for rapid capital growth." },
    { name: "Vault Private", daily: "Custom", min: "€50,000", period: "Bespoke", desc: "Bespoke management with physical vault custody." }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Navigation - Keeps your London/Frankfurt offices visible */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#10b981]" />
            <span className="text-xl font-black uppercase italic tracking-tighter">Vander Vault <span className="text-[#10b981] not-italic">Holdings</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
              <span>London HQ</span>
              <span>Frankfurt Office</span>
            </div>
            <button className="bg-[#10b981] text-black px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-emerald-500/20">Client Login</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-4xl text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-8">
              <Zap className="w-3 h-3 fill-emerald-400" /> Insured Custody · KYC · 2FA · Wallet Screening
            </div>
            <h1 className="text-6xl lg:text-[100px] font-black tracking-tighter leading-[0.85] mb-10 uppercase italic">
              Institutional <br /><span className="text-[#10b981]">Wealth Management.</span>
            </h1>
            <p className="text-xl text-white/50 mb-12 max-w-2xl font-medium leading-relaxed mx-auto lg:mx-0">
              Elite digital asset management for high-net-worth investors. Professional strategies starting from <span className="text-white font-bold">€500</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button className="px-10 py-5 bg-[#10b981] text-black rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3">
                Open Account <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Plans - Fixed Line 547 Error */}
      <section className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-white">Strategic Portfolios</h2>
            <p className="text-white/40 font-medium italic uppercase text-[10px] tracking-widest">Daily Profit Distribution · Institutional Liquidity</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PLANS.map((plan, i) => (
              <div key={i} className={`p-10 rounded-[2.5rem] border transition-all duration-500 ${
                plan.featured ? 'bg-white text-black border-white shadow-2xl scale-105' : 'bg-[#0a0a0a] border-white/10 hover:border-[#10b981]/50'
              }`}>
                <h3 className="text-2xl font-black mb-2 uppercase italic">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-black tracking-tighter">{plan.daily}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Daily ROI</span>
                </div>
                <div className="space-y-4 mb-10 pb-10 border-b border-current opacity-10 text-[10px] font-black uppercase tracking-widest">
                  <div className="flex justify-between"><span>Min. Deposit</span><span>{plan.min}</span></div>
                  <div className="flex justify-between"><span>Contract Period</span><span>{plan.period}</span></div>
                </div>
                <button className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  plan.featured ? 'bg-black text-white hover:bg-slate-800' : 'bg-[#10b981] text-black hover:bg-emerald-400'
                }`}>Open Portfolio</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features - KYC, 2FA, Wallet Screening */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Lock />, title: "2FA Secure", desc: "Multi-device biometric and hardware-key secondary authentication." },
              { icon: <ShieldCheck />, title: "Elite KYC", desc: "Institutional investor identity verification and data encryption." },
              { icon: <KeyRound />, title: "Cold Storage", desc: "Physical air-gapped asset custody across multiple jurisdictions." },
              { icon: <Wallet />, title: "Anti-Money Laundering", desc: "Real-time wallet screening on all inbound and outbound capital." }
            ].map((f, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all">
                <div className="text-[#10b981] mb-6">{f.icon}</div>
                <h4 className="font-bold text-lg mb-2 uppercase tracking-tight">{f.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center">
        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">© {new Date().getFullYear()} Vander Vault Holdings. Institutional Client Group.</p>
      </footer>
    </div>
  );
                }
