import { Link } from 'react-router-dom';
import { ShieldCheck, Landmark, Users, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#10b981]">
      <nav className="fixed top-0 left-0 right-0 z-50 py-8 px-4 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
          <Link to="/" className="flex items-center gap-3">
            <ShieldCheck className="w-9 h-9 text-[#10b981]" />
            <span className="text-xl font-black uppercase italic tracking-tighter">Vander Vault</span>
          </Link>
          <Link to="/register" className="bg-white text-black px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Join Group</Link>
        </div>
      </nav>

      <main className="pt-48 pb-32">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <div className="max-w-3xl mb-32">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-7xl lg:text-9xl font-black uppercase italic tracking-tighter leading-[0.85] mb-12">
                Pioneering <br /> <span className="text-[#10b981]">Digital Alpha.</span>
              </h1>
              <p className="text-2xl text-white/50 leading-relaxed font-medium italic">
                Founded on the principles of absolute security and uncompromising performance.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-20 mb-40 text-white">
            <div className="space-y-12">
              <div className="flex gap-8 group">
                <div className="shrink-0 w-20 h-20 bg-white/5 border border-white/5 rounded-[2rem] flex items-center justify-center text-[#10b981] transition-all">
                  <Landmark className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">Institutional Roots</h3>
                  <p className="text-white/40 font-bold">Operating from London and Frankfurt since inception.</p>
                </div>
              </div>
              <div className="flex gap-8 group text-white">
                <div className="shrink-0 w-20 h-20 bg-white/5 border border-white/5 rounded-[2rem] flex items-center justify-center text-[#10b981]">
                  <Users className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">Expert Advisory</h3>
                  <p className="text-white/40 font-bold">Decades of algorithmic trading expertise.</p>
                </div>
              </div>
            </div>

            <div className="relative text-white">
              <div className="relative bg-white/5 border border-white/5 p-16 rounded-[4rem] flex flex-col items-center text-center shadow-2xl">
                <Award className="w-20 h-20 text-[#10b981] mb-10" />
                <div className="text-6xl font-black italic tracking-tighter mb-4 underline decoration-[#10b981] decoration-8 underline-offset-8">€42.8B+</div>
                <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">Assets Under Advisory</div>
              </div>
            </div>
          </div>

          <div className="mt-40 bg-[#10b981] rounded-[5rem] p-24 text-center text-black">
             <h2 className="text-6xl font-black text-black uppercase italic tracking-tighter mb-12 uppercase italic">Securing your legacy.</h2>
             <Link to="/register" className="px-16 py-8 bg-black text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl mx-auto w-fit flex items-center gap-4">
               Apply for Access <ArrowRight className="w-5 h-5" />
             </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
