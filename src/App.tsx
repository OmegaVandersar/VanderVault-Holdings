import { useState, useEffect } from 'react';
import { 
  Shield, Globe, TrendingUp, Lock, Menu, X, Zap, 
  PhoneCall, ArrowUpRight, PieChart, Activity, 
  ChevronRight, BarChart3 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// Utility for classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

const chartData = Array.from({ length: 24 }, (_, i) => ({
  name: i,
  value: 42000 + Math.random() * 5000 + (i * 200),
}));

const PLANS = [
  {
    name: "Growth Strategy",
    min: "$5,000",
    return: "8-12% APY",
    featured: false,
    description: "Stable returns focused on large-cap digital assets and established indices."
  },
  {
    name: "Institutional Alpha",
    min: "$50,000",
    return: "18-24% APY",
    featured: true,
    description: "Our flagship high-yield strategy utilizing proprietary algorithmic trading."
  },
  {
    name: "Vault Private",
    min: "$250,000",
    return: "Custom",
    featured: false,
    description: "Bespoke asset management with dedicated advisors and physical vault custody."
  }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      isScrolled ? "bg-white/90 backdrop-blur-md border-slate-200 py-3" : "bg-transparent border-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 p-1.5 rounded-lg"><Shield className="w-6 h-6 text-white" /></div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Vander Vault <span className="text-slate-500 font-normal">Holdings</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Markets', 'Terminal', 'Security', 'About'].map(item => (
            <a key={item} href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">{item}</a>
          ))}
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all active:scale-95">Access Terminal</button>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-600">{isOpen ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="md:hidden bg-white border-t p-4 space-y-4 shadow-xl">
            {['Markets', 'Terminal', 'Security', 'About'].map(item => <a key={item} href="#" className="block py-2 text-slate-600 font-medium">{item}</a>)}
            <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold">Access Terminal</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
              <Zap className="w-3 h-3 text-amber-400" /> Vander Vault Institutional
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
              Global Capital. <br /><span className="text-slate-400">Perfectly Secured.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium">
              The premier digital asset terminal for institutional investors and high-net-worth family offices.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 shadow-2xl transition-all flex items-center justify-center gap-2">
                Open Account <ChevronRight className="w-5 h-5" />
              </button>
              <button className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold hover:bg-slate-50 transition-all">Wealth Solutions</button>
            </div>
          </motion.div>
          
          {/* Terminal UI */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="mt-20 bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl p-6 text-left">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
              <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500/40"/><div className="w-3 h-3 rounded-full bg-amber-500/40"/><div className="w-3 h-3 rounded-full bg-emerald-500/40"/></div>
              <div className="text-[10px] font-mono text-emerald-500 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/> LIVE_NODE_STABLE</div>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs><linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.1} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }} />
                      <Area type="monotone" dataKey="value" stroke="#10b981" fill="url(#colorValue)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl">
                  <div className="text-xs font-bold text-emerald-400 mb-1 uppercase tracking-widest">Net Asset Value</div>
                  <div className="text-3xl font-bold text-white font-mono">$2,412,841</div>
                </div>
                <div className="space-y-3 font-mono text-[11px] text-slate-500">
                  <div className="flex justify-between border-b border-slate-900 py-2"><span>BTC/USD</span><span className="text-emerald-400">$94,231</span></div>
                  <div className="flex justify-between border-b border-slate-900 py-2"><span>ETH/USD</span><span className="text-emerald-400">$2,841</span></div>
                  <div className="flex justify-between border-b border-slate-900 py-2"><span>XAU/USD</span><span className="text-red-400">$2,142</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust & Plans */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {PLANS.map((plan, i) => (
              <div key={i} className={cn("p-10 rounded-[2.5rem] border transition-all", plan.featured ? "bg-slate-900 text-white shadow-2xl scale-105" : "bg-white border-slate-200")}>
                <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                <div className="text-4xl font-black mb-6">{plan.return}</div>
                <p className={cn("text-sm leading-relaxed mb-8", plan.featured ? "text-slate-400" : "text-slate-500")}>{plan.description}</p>
                <button className={cn("w-full py-4 rounded-xl font-bold transition-all", plan.featured ? "bg-emerald-500 text-white hover:bg-emerald-400" : "bg-slate-900 text-white")}>Select Strategy</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-2 mb-8">
            <div className="bg-slate-900 p-1.5 rounded-lg"><Shield className="w-5 h-5 text-white" /></div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Vander Vault</span>
          </div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.25em]">© {new Date().getFullYear()} Vander Vault Holdings. Institutional Client Group.</p>
        </div>
      </footer>
    </div>
  );
}
