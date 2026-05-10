import { Link } from 'react-router-dom';
import { ShieldCheck, User, Mail, Smartphone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Register() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-[#0a0a0a] border border-white/5 rounded-[4rem] p-12 lg:p-16 shadow-2xl text-white"
      >
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 text-white">
            <ShieldCheck className="w-10 h-10 text-[#10b981]" />
            <span className="text-2xl font-black uppercase italic tracking-tighter">Vander Vault</span>
          </Link>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-white">Institutional Application</h2>
        </div>

        <form className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Full Name</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-4 text-sm font-bold text-white outline-none" placeholder="Investor Name" />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-4 text-sm font-bold text-white outline-none" />
            </div>
          </div>
          <button className="sm:col-span-2 bg-[#10b981] text-black py-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4 mt-4 shadow-xl">
            Initiate Onboarding <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
