import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowRight, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-10 lg:p-14 shadow-2xl"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 text-white">
            <ShieldCheck className="w-8 h-8 text-[#10b981]" />
            <span className="text-xl font-black uppercase italic tracking-tighter">Vander Vault</span>
          </Link>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2 text-white">Investor Portal</h2>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Authorized Access Only</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4">Email</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white outline-none focus:border-[#10b981]/50 transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4">Access Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input type="password" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white outline-none focus:border-[#10b981]/50 transition-all" />
            </div>
          </div>
          <button className="w-full bg-[#10b981] text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3">
            Enter Terminal <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
