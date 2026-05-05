import React from 'react';
import { Shield, FileText, Camera, CheckCircle } from 'lucide-react';

export default function KYC() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-white tracking-tighter mb-4">Identity Verification</h1>
        <p className="text-slate-400">Mandatory Tier-3 KYC for European Regulatory Compliance (BaFin/FCA).</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mb-12 text-center">
        <div className="glass p-6 rounded-3xl"><FileText className="w-8 h-8 text-amber-500 mx-auto mb-4"/><h4 className="font-bold">1. ID Document</h4></div>
        <div className="glass p-6 rounded-3xl"><Camera className="w-8 h-8 text-amber-500 mx-auto mb-4"/><h4 className="font-bold">2. Live Selfie</h4></div>
        <div className="glass p-6 rounded-3xl"><Shield className="w-8 h-8 text-amber-500 mx-auto mb-4"/><h4 className="font-bold">3. Approval</h4></div>
      </div>
      <div className="glass p-10 rounded-[3rem] border-amber-500/20">
        <h3 className="text-xl font-bold mb-6">Upload Verification Documents</h3>
        <div className="border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center hover:border-amber-500/50 transition-colors cursor-pointer">
          <p className="text-slate-500 text-sm">Drag and drop your Passport or National ID here</p>
        </div>
        <button className="w-full mt-8 py-4 gold-grad text-black font-black rounded-2xl uppercase tracking-widest">Submit for Review</button>
      </div>
    </div>
  );
}
