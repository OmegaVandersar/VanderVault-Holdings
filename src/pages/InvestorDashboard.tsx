import React from 'react';
import { Wallet, TrendingUp, ArrowUpRight, Shield, Globe, CreditCard, Clock } from 'lucide-react';

export default function InvestorDashboard() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter">Command Terminal</h1>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mt-1">Frankfurt Node: 92.211.**.**</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/10">Withdraw</button>
          <button className="flex-1 md:flex-none px-6 py-3 gold-grad text-black font-black rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-amber-900/20">Deposit Funds</button>
        </div>
      </div>

      {/* BALANCE CARDS */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="glass p-8 rounded-[2.5rem] border-amber-500/20 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-2">Total Valuation</p>
            <h2 className="text-4xl font-black text-white tracking-tighter mb-4">€125,430.88</h2>
            <div className="flex items-center text-green-500 text-xs font-bold">
              <TrendingUp className="w-4 h-4 mr-1" /> +18.4% Net Return
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Wallet className="w-16 h-16 text-amber-500" />
          </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border-white/5">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Available Rewards</p>
          <h2 className="text-4xl font-black text-white tracking-tighter mb-4">€12,430.45</h2>
          <div className="flex items-center text-amber-500 text-xs font-bold uppercase">
            <Clock className="w-4 h-4 mr-1" /> Next Payout: 14h 22m
          </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border-white/5">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Security Status</p>
          <div className="space-y-3 mt-4">
            <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-xl border border-green-500/20">
              <span className="text-[10px] font-bold text-green-500 uppercase">KYC Verified</span>
              <Shield className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <span className="text-[10px] font-bold text-amber-500 uppercase">2FA Active</span>
              <Shield className="w-4 h-4 text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {/* PORTFOLIO ACTIVATION */}
      <div className="bg-white/5 border border-white/5 rounded-[3rem] p-10">
        <h3 className="text-xl font-bold mb-8">Asset Allocation Terminal</h3>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="p-6 glass rounded-3xl border-amber-500/10">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-white">BTC Portfolio</span>
                <span className="text-xs text-amber-500 font-bold uppercase">Active</span>
              </div>
              <div className="h-1 bg-slate-900 rounded-full"><div className="w-[65%] h-full gold-grad rounded-full shadow-[0_0_10px_#fbbf24]"></div></div>
            </div>
            <div className="p-6 glass rounded-3xl border-white/5 opacity-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-slate-400">Institutional Tier</span>
                <span className="text-xs text-slate-600 font-bold uppercase">Locked</span>
              </div>
              <div className="h-1 bg-slate-900 rounded-full"><div className="w-0 h-full bg-slate-700 rounded-full"></div></div>
            </div>
          </div>
          <div className="bg-black/40 p-8 rounded-3xl border border-white/5">
            <p className="text-xs text-slate-500 mb-4 leading-relaxed uppercase font-bold tracking-widest">BaFin Transaction Log</p>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-2">
                  <span className="text-slate-500">TXID: {Math.random().toString(16).slice(2, 10)}...</span>
                  <span className="text-green-500 font-bold">+€{Math.floor(Math.random() * 5000)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
            }
