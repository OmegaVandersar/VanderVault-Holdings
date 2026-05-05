import React, { useState } from 'react';
import { Shield, Smartphone, Lock, CheckCircle } from 'lucide-react';

export default function TwoFactor() {
  const [code, setCode] = useState('');

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-20 h-20 gold-grad rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-900/20">
          <Smartphone className="w-10 h-10 text-black" />
        </div>
        <h1 className="text-4xl font-black text-white tracking-tighter mb-4">Secure Your Assets</h1>
        <p className="text-slate-400">Two-Factor Authentication (TOTP) is mandatory for all Vanguard Institutional accounts.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white">Why use 2FA?</h3>
          <div className="flex items-start space-x-4">
            <Shield className="w-6 h-6 text-amber-500 shrink-0" />
            <p className="text-sm text-slate-400">Protects your capital even if your email is compromised.</p>
          </div>
          <div className="flex items-start space-x-4">
            <Lock className="w-6 h-6 text-amber-500 shrink-0" />
            <p className="text-sm text-slate-400">Ensures only you can authorize withdrawal requests.</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl">
            <p className="text-xs text-amber-500 font-bold uppercase tracking-widest">BaFin Requirement 109284</p>
          </div>
        </div>

        <div className="glass p-10 rounded-[3rem] border-amber-500/20">
          <div className="mb-8 text-center">
            <div className="bg-white p-4 rounded-2xl w-max mx-auto mb-4 border-4 border-amber-500">
               {/* QR Code Placeholder */}
               <div className="w-32 h-32 bg-slate-200 animate-pulse rounded-lg"></div>
            </div>
            <p className="text-xs text-slate-500">Scan this QR code with Google Authenticator or Authy</p>
          </div>
          <input 
            type="text" 
            placeholder="Enter 6-digit code" 
            className="w-full p-4 bg-black border border-white/10 rounded-xl mb-4 text-center text-2xl font-mono tracking-[0.5em] focus:border-amber-500 outline-none"
            maxLength={6}
          />
          <button className="w-full py-4 gold-grad text-black font-black rounded-2xl uppercase tracking-widest">Verify & Enable</button>
        </div>
      </div>
    </div>
  );
}
