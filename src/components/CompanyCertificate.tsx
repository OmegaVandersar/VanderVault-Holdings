import {
  Award,
  Building2,
  CalendarDays,
  Copy,
  Download,
  FileCheck2,
  Landmark,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { CONFIG } from "../config";
import { generateCompanyCertificate } from "../utils/pdf";
import { useState } from "react";

export default function CompanyCertificate() {
  const regulatory = CONFIG.regulatory;
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(regulatory.certificateId);
    setCopied(true);

    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-emerald-400/25 bg-[#080b12] shadow-2xl shadow-emerald-500/10">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-emerald-400 mb-3">
              <FileCheck2 className="w-4 h-4" />
              Company Verification Certificate
            </div>

            <h3 className="text-3xl font-semibold text-white tracking-tight">
              {CONFIG.brand.legalName}
            </h3>

            <p className="mt-2 text-white/60 max-w-2xl">
              Compliance-issued company information certificate for investor
              verification, regulatory review and onboarding due diligence.
            </p>
          </div>

          <div className="shrink-0 text-center lg:text-right">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 grid place-items-center text-bg mx-auto lg:ml-auto shadow-lg shadow-emerald-500/20">
              <Award className="w-9 h-9" />
            </div>

            <div className="mt-3 text-[10px] uppercase tracking-wider text-white/40">
              Certificate ID
            </div>

            <button
              onClick={copyId}
              className="mt-1 text-sm font-mono text-emerald-300 hover:text-emerald-200 inline-flex items-center gap-1.5"
            >
              {regulatory.certificateId}
              {copied ? (
                <ShieldCheck className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: MapPin,
              label: "Global headquarters",
              value: CONFIG.offices.globalHeadquarters,
            },
            {
              icon: MapPin,
              label: "EU regulatory office",
              value: CONFIG.offices.euRegulatoryOffice,
            },
            {
              icon: Landmark,
              label: "Registry court",
              value: regulatory.registryCourt,
            },
            {
              icon: ShieldCheck,
              label: "Regulatory authority",
              value: regulatory.regulator,
            },
            {
              icon: Building2,
              label: "Commercial register",
              value: regulatory.commercialRegister,
            },
            {
              icon: CalendarDays,
              label: "Founded",
              value: regulatory.foundedDate,
            },
          ].map(item => (
            <div
              key={item.label}
              className="rounded-xl border border-line bg-white/[0.03] p-4"
            >
              <item.icon className="w-4 h-4 text-emerald-400 mb-3" />

              <div className="text-[10px] uppercase tracking-wider text-white/40">
                {item.label}
              </div>

              <div className="mt-1 text-sm text-white leading-relaxed">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-line bg-bg/50 p-5">
            <h4 className="text-white font-semibold">
              Supervisory framework
            </h4>

            <div className="mt-4 flex flex-wrap gap-2">
              {regulatory.supervisoryFramework.map(item => (
                <span
                  key={item}
                  className="text-xs px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 text-emerald-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-bg/50 p-5">
            <h4 className="text-white font-semibold">
              Investor verification steps
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-white/65">
              {regulatory.investorVerificationSteps.map(step => (
                <li key={step} className="flex gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-line pt-6">
          <div className="text-xs text-white/40 leading-relaxed max-w-2xl">
            This certificate is issued by {CONFIG.brand.name}'s compliance
            office. Official registry and regulator references must match the
            public records supplied by legal counsel.
          </div>

          <button
            onClick={generateCompanyCertificate}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold text-sm shadow-lg shadow-emerald-500/20"
          >
            <Download className="w-4 h-4" />
            Download certificate PDF
          </button>
        </div>
      </div>
    </div>
  );
              }
