import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Globe, Lock, Zap, 
  Activity, ChevronRight, KeyRound,
  Award, Landmark, Smartphone, PhoneCall
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

const chartData = Array.from({ length: 30 }, (_, i) => ({
  x: i,
  y: 88000 + Math.random() * 5000 + (i * 200),
}));

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const PLANS = [
    { 
      name: "Starter Alpha", 
      daily: "2.5%", 
      min: "€500", 
      max: "€4,999", 
      period: "30 Days", 
      referral: "5%",
      desc: "Secure entry-point for institutional-grade digital asset appreciation." 
    },
    { 
      name: "Institutional Plus", 
      daily: "4.8%", 
      min: "€5,000", 
      max: "€49,999", 
      period: "60 Days", 
      referral: "10%",
      featured: true, 
      desc: "Our high-frequency algorithmic model optimized for rapid capital expansion." 
    },
    { 
      name: "Vander Private Vault", 
      daily: "7.2%", 
      min: "€50,000", 
      max: "No Limit", 
      period: "90 Days", 
      referral: "15%",
      desc: "Bespoke asset management with physically air-gapped cold storage custody." 
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#10b981]">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-10 h-10 text-[#10b981]" />
            <div className="flex flex-col">
              <span className="text-2xl font-black uppercase italic tracking-tighter leading-none text-white">Vander Vault</span>
              <span className="text-[10px] font-bold text-white/40 tracking-[0.3em] uppercase mt-1">Holdings Institutional</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-12 text-white">
            {['About', 'Security', 'Portfolios', 'Governance'].map(item => (
              <Link key={item} to={`/${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50 hover:text-[#10b981] transition-colors">{item}</Link>
            ))}
            <div className="h-5 w-px bg-white/10" />
            <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.25em] text-white hover:text-[#10b981]">Login</Link>
            <Link to="/register" className="bg-[#10b981] text-black px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-95">Open Account</Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-60 pb-40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.15),transparent_60%)] -z-10" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-10">
                <Zap className="w-4 h-4 fill-emerald-400" /> SECURE NODE_LINK: FRANKFURT / LONDON
              </div>
              <h1 className="text-7xl lg:text-[110px] font-black tracking-tighter leading-[0.85] mb-12 uppercase italic text-white">
                Strategic <br /><span className="text-[#10b981]">Capital.</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/50 mb-12 max-w-xl font-medium leading-relaxed">
                Elite digital wealth preservation and growth for high-net-worth investors. Professional portfolios starting from <span className="text-white font-bold">€500</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/register" className="px-12 py-6 bg-[#10b981] text-black rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all active:scale-95">
                  Deploy Funds <ChevronRight className="w-5 h-5" />
                </Link>
                <div className="flex items-center gap-8 px-6 text-white">
                  <div>
                    <div className="text-3xl font-black">€42.8B+</div>
                    <div className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Total AUM</div>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div>
                    <div className="text-3xl font-black">120+</div>
                    <div className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Markets</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-10 backdrop-blur-3xl shadow-2xl relative text-white">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500/40"/><div className="w-2.5 h-2.5 rounded-full bg-amber-500/40"/><div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40"/></div>
                    <span className="text-[10px] font-mono text-white/30 font-bold uppercase tracking-widest">Global Terminal_Secure_v4</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#10b981] font-black animate-pulse flex items-center gap-2 tracking-widest">
                    <Activity className="w-3 h-3" /> LIVE_DATA
                  </span>
                </div>
                <div className="space-y-10">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">BTC / EUR Market</span>
                      <div className="text-6xl font-black font-mono mt-2 tracking-tighter">€91,248</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[#10b981] font-black text-2xl">+4.82%</span>
                    </div>
                  </div>
                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="y" stroke="#10b981" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-12 opacity-30 text-white">
          <div className="flex items-center gap-3 font-black text-lg tracking-tighter italic"><ShieldCheck className="w-6 h-6"/> FINRA REGISTERED</div>
          <div className="flex items-center gap-3 font-black text-lg tracking-tighter italic"><Landmark className="w-6 h-6"/> MiCA COMPLIANT</div>
          <div className="flex items-center gap-3 font-black text-lg tracking-tighter italic"><Globe className="w-6 h-6"/> EU REGULATED</div>
          <div className="flex items-center gap-3 font-black text-lg tracking-tighter italic"><Award className="w-6 h-6"/> SOC2 TYPE II</div>
        </div>
      </section>

      <section id="portfolios" className="py-40 relative">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <div className="text-center mb-32 text-white">
            <h2 className="text-6xl lg:text-8xl font-black uppercase italic tracking-tighter mb-8 leading-none">Strategic <br /> <span className="text-[#10b981]">Portfolios.</span></h2>
            <p className="text-white/40 text-xl max-w-2xl mx-auto font-medium">Tiered high-performance models for institutional capital.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {PLANS.map((plan, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className={`p-14 rounded-[4rem] border transition-all duration-700 relative overflow-hidden flex flex-col ${
                  plan.featured ? 'bg-white text-black border-white shadow-2xl scale-105' : 'bg-[#0a0a0a] border-white/5 hover:border-[#10b981]/50 text-white'
                }`}
              >
                {plan.featured && <div className="absolute top-0 right-0 px-10 py-3 bg-[#10b981] text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-bl-[2rem]">Institutional Choice</div>}
                <h3 className="text-3xl font-black mb-10 uppercase italic tracking-tight">{plan.name}</h3>
                <div className="mb-12">
                  <div className="flex items-baseline gap-3">
                    <span className="text-7xl font-black tracking-tighter leading-none">{plan.daily}</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Daily Yield</span>
                  </div>
                </div>
                <div className="space-y-7 mb-16 pb-16 border-b border-current opacity-10">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.3em]"><span>Min. Entry</span><span>{plan.min}</span></div>
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.3em]"><span>Max. Cap</span><span>{plan.max}</span></div>
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.3em]"><span>Period</span><span>{plan.period}</span></div>
                </div>
                <p className="text-base font-bold opacity-60 leading-relaxed mb-16 italic">{plan.desc}</p>
                <Link to="/register" className={`block w-full py-6 rounded-2xl text-center font-black text-[11px] uppercase tracking-[0.4em] transition-all shadow-xl ${
                  plan.featured ? 'bg-black text-white hover:bg-slate-800' : 'bg-[#10b981] text-black hover:bg-emerald-400'
                }`}>Open Portfolio</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="py-40 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div>
              <h2 className="text-6xl font-black mb-16 uppercase italic tracking-tighter leading-[0.9] text-white">Fortress <br /> <span className="text-[#10b981]">Infrastructure.</span></h2>
              <div className="grid sm:grid-cols-2 gap-10">
                {[
                  { icon: <Lock />, title: "2FA / Biometric", desc: "Dual-layer hardware authentication." },
                  { icon: <ShieldCheck />, title: "Elite KYC", desc: "Institutional identity verification." },
                  { icon: <Smartphone />, title: "Wallet Screening", desc: "Automated AML protocols." },
                  { icon: <KeyRound />, title: "Cold Storage", desc: "Physically air-gapped custody." }
                ].map((f, i) => (
                  <div key={i} className="group">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#10b981] mb-8 group-hover:bg-[#10b981] group-hover:text-black transition-all">
                      {f.icon}
                    </div>
                    <h4 className="font-black text-xs uppercase tracking-widest mb-4 text-white">{f.title}</h4>
                    <p className="text-white/40 text-xs leading-relaxed font-bold">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative text-white">
              <div className="bg-[#0a0a0a] border border-white/5 p-20 rounded-[5rem] text-center shadow-2xl backdrop-blur-3xl overflow-hidden">
                <Landmark className="w-24 h-24 text-[#10b981] mx-auto mb-12" />
                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-8 leading-none">Global <br /> Headquarters</h3>
                <div className="space-y-6 text-white/50 text-sm font-black uppercase tracking-[0.3em]">
                  <p>London, UK <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block ml-2" /></p>
                  <p>Frankfurt, DE <span className="w-2 h-2 rounded-full bg-white/20 inline-block ml-2" /></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-32 border-t border-white/5 bg-[#030303] text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-4 mb-12 text-white">
            <ShieldCheck className="w-10 h-10 text-[#10b981]" />
            <span className="text-3xl font-black uppercase italic tracking-tighter">Vander Vault</span>
          </div>
          <div className="flex flex-wrap justify-center gap-12 mb-16 opacity-30 text-[9px] font-black uppercase tracking-[0.3em] text-white">
            <Link to="/about">About Us</Link>
            <Link to="/legal">Risk Statement</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/aml">AML Policy</Link>
          </div>
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">© {new Date().getFullYear()} Vander Vault Holdings Ltd. Institutional Client Group.</p>
        </div>
      </footer>
    </div>
  );
              }
