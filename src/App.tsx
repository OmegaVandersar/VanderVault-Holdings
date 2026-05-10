import React, { useState, useEffect } from 'react';
import { 
  Shield, Globe, TrendingUp, Lock, Menu, X, Zap, 
  PhoneCall, ArrowUpRight, PieChart, Activity, 
  ChevronRight, BarChart3, CheckCircle2 
} from 'lucide-react';

// UI Utility
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const PLANS = [
    {
      name: "Basic Alpha",
      min: "€500",
      daily: "2.5%",
      period: "30 Days",
      featured: false,
      desc: "Entry-level HNW portfolio with daily liquidity and secured cold-storage."
    },
    {
      name: "Institutional Pro",
      min: "€5,000",
      daily: "4.8%",
      period: "60 Days",
      featured: true,
      desc: "Our flagship high-frequency trading model for rapid capital growth."
    },
    {
      name: "Vault Private",
      min: "€50,000",
      daily: "Custom",
      period: "Bespoke",
      featured: false,
      desc: "Bespoke management with physical vault custody and dedicated advisors."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled ? "bg-black/80 backdrop-blur-md border-white/10 py-3 shadow-2xl" : "bg-transparent border-transparent py-5"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-1.5 rounded-lg shadow-lg shadow-emerald-500/20">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">Vander Vault <span className="text-emerald-500 not-italic">Holdings</span></span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {['Markets', 'Terminal', 'Security', 'About'].map(item => (
              <a key={item} href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-emerald-400 transition-colors">{item}</a>
            ))}
            <button className="bg-emerald-500 text-black px-6 py-2 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/20">Client Terminal</button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-white">{isMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.15),transparent_50%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-black tracking-[0.2em] uppercase mb-8">
                <Zap className="w-3 h-3 fill-emerald-400" /> Institutional Grade v4.2
              </div>
              <h1 className="text-7xl lg:text-[100px] font-black tracking-tighter leading-[0.85] mb-10 uppercase italic">
                Secure Wealth. <br /><span className="text-emerald-500">Accelerate Capital.</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/50 mb-12 max-w-2xl font-medium leading-relaxed">
                The premier digital asset terminal for elite investors. <br/>High-performance portfolios starting from <span className="text-white font-bold">€500</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button className="px-10 py-5 bg-emerald-500 text-black rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3">
                  Deploy Capital <ChevronRight className="w-5 h-5" />
                </button>
                <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all">Wealth Solutions</button>
              </div>
            </div>

            {/* Simulated Live Terminal */}
            <div className="mt-24 grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                 <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                   <div className="flex gap-2 font-mono text-[10px] text-white/40 uppercase tracking-widest"><Activity className="w-4 h-4 text-emerald-500"/> Node_Status: Optimal</div>
                   <div className="text-[10px] font-mono text-emerald-500 flex items-center gap-2 font-bold uppercase tracking-widest animate-pulse">Live_Market_Stream</div>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { l: 'BTC/EUR', p: '€91,241', c: '+2.4%' },
                      { l: 'ETH/EUR', p: '€2,684', c: '+1.8%' },
                      { l: 'GOLD/EUR', p: '€2,014', c: '-0.2%' },
                      { l: 'AUM_TOTAL', p: '€42.8B', c: 'VERIFIED' },
                    ].map(t => (
                      <div key={t.l} className="space-y-1">
                        <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">{t.l}</div>
                        <div className="text-xl font-bold font-mono">{t.p}</div>
                        <div className={cn("text-[10px] font-bold", t.c.includes('+') ? "text-emerald-500" : "text-white/40")}>{t.c}</div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="bg-emerald-500 p-8 rounded-3xl flex flex-col justify-between shadow-2xl shadow-emerald-500/20">
                 <PieChart className="w-10 h-10 text-black" />
                 <div>
                   <div className="text-black/60 text-[10px] font-black uppercase tracking-widest mb-1">Growth Forecast</div>
                   <div className="text-4xl font-black text-black">+24.8%</div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Plans Section */}
        <section className="py-32 bg-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <h2 className="text-5xl font-black mb-8 uppercase italic tracking-tighter">Strategic Portfolios</h2>
              <p className="text-white/40 text-lg font-medium">Sophisticated high-yield strategies tailored for HNW capital deployment.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {PLANS.map((plan, i) => (
                <div key={i} className={cn(
                  "p-10 rounded-[2.5rem] border transition-all duration-500 group relative overflow-hidden",
                  plan.featured ? "bg-white text-black border-white shadow-2xl scale-105" : "bg-[#0a0a0a] border-white/5 hover:border-emerald-500/50"
                )}>
                  {plan.featured && <span className="absolute top-0 right-0 px-6 py-2 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">Elite Choice</span>}
                  <h3 className="text-2xl font-black mb-2 uppercase italic">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-5xl font-black tracking-tighter">{plan.daily}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Daily Return</span>
                  </div>
                  <div className="space-y-4 mb-12 pb-12 border-b border-current opacity-20">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span>Minimum Deposit</span>
                      <span>{plan.min}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span>Investment Period</span>
                      <span>{plan.period}</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-10 leading-relaxed opacity-60">{plan.desc}</p>
                  <button className={cn(
                    "w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all",
                    plan.featured ? "bg-black text-white hover:bg-slate-800" : "bg-emerald-500 text-black hover:bg-emerald-400 shadow-xl shadow-emerald-500/20"
                  )}>Open Portfolio</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security / Compliance */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-5xl font-black mb-10 uppercase italic tracking-tighter">Fortress Custody.</h2>
                <div className="space-y-10">
                  {[
                    { icon: <Lock className="w-8 h-8 text-emerald-500" />, title: "Quantum-Shielded Vaults", desc: "Your assets are secured in physically air-gapped, offline multi-sig vaults." },
                    { icon: <Shield className="w-8 h-8 text-emerald-500" />, title: "€500M Global Insurance", desc: "Comprehensive policy coverage through Lloyd's of London for complete asset protection." },
                    { icon: <Globe className="w-8 h-8 text-emerald-500" />, title: "EU Regulatory Oversight", desc: "Fully compliant with MiCA and European digital finance directives." }
                  ].map((f, i) => (
                    <div key={i} className="flex gap-8 group">
                      <div className="shrink-0 w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center transition-all group-hover:border-emerald-500/50">{f.icon}</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">{f.title}</h4>
                        <p className="text-white/40 leading-relaxed text-sm font-medium">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                 <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full" />
                 <div className="relative bg-white/5 border border-white/10 p-16 rounded-[4rem] text-center">
                    <BarChart3 className="w-24 h-24 text-emerald-500 mx-auto mb-8" />
                    <div className="text-6xl font-black mb-2 tracking-tighter uppercase italic">99.99%</div>
                    <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Execution SLA Guaranteed</div>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-3 mb-10">
            <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20"><Shield className="w-6 h-6 text-black" /></div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">Vander Vault <span className="text-emerald-500 not-italic">Holdings</span></span>
          </div>
          <div className="flex flex-wrap justify-center gap-10 mb-12 opacity-40">
            {['AML Policy', 'KYC Compliance', 'Terms of Service', 'Privacy'].map(l => (
              <a key={l} href="#" className="text-[10px] font-black uppercase tracking-widest hover:text-white">{l}</a>
            ))}
          </div>
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">© {new Date().getFullYear()} Vander Vault Holdings. Institutional Client Group.</p>
        </div>
      </footer>
    </div>
  );
          }
