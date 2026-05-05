import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileCheck2,
  Landmark,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { CONFIG } from "../config";
import CompanyCertificate from "../components/CompanyCertificate";
import { useSeo } from "../utils/seo";

export default function Regulation() {
  const regulatory = CONFIG.regulatory;

  useSeo({
    title: "Regulation & Company Certificate",
    description: `${CONFIG.brand.name}'s London headquarters, Frankfurt EU regulatory office, investor verification certificate, compliance framework and due-diligence information.`,
    path: "/regulation",
  });

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-radial-glow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Regulation & verification
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
              London headquarters with Frankfurt EU regulatory presence.
            </h1>

            <p className="mt-5 text-lg text-white/70 leading-relaxed">
              NordVault Global Capital is positioned with a London headquarters
              and a Frankfurt EU regulatory office, giving investors a strong
              global finance profile and European compliance credibility.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#certificate"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold"
              >
                View certificate
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-line text-white hover:bg-white/5"
              >
                Request investor data room
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-5">
          {[
            {
              icon: MapPin,
              title: "Global headquarters",
              value: CONFIG.offices.globalHeadquarters,
              note: "London financial district presence",
            },
            {
              icon: Landmark,
              title: "EU regulatory office",
              value: CONFIG.offices.euRegulatoryOffice,
              note: "Frankfurt am Main, Germany",
            },
            {
              icon: FileCheck2,
              title: "Compliance framework",
              value: "MiCA, KWG, GwG, GDPR, AMLD5 and DORA readiness",
              note: "EU and German financial-services alignment",
            },
          ].map(item => (
            <div
              key={item.title}
              className="bg-card border border-line rounded-2xl p-6"
            >
              <item.icon className="w-6 h-6 text-emerald-400 mb-4" />

              <div className="text-xs uppercase tracking-wider text-white/40">
                {item.title}
              </div>

              <div className="mt-2 text-lg font-semibold text-white leading-snug">
                {item.value}
              </div>

              <div className="mt-2 text-sm text-white/55">
                {item.note}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg-elev/40 border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
                Why London and Frankfurt
              </div>

              <h2 className="text-3xl font-semibold text-white">
                A structure investors recognise.
              </h2>

              <p className="mt-4 text-white/70 leading-relaxed">
                London provides global finance credibility, international
                investor access and institutional capital market familiarity.
                Frankfurt adds European regulatory, banking and compliance
                proximity.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "London global headquarters for international investor access",
                  "Frankfurt EU regulatory office in a major European banking hub",
                  "Compliance framework aligned with MiCA, GwG/AML and GDPR",
                  "Investor certificate and due-diligence documentation",
                  "Clear separation of custody, compliance and investor operations",
                ].map(item => (
                  <div key={item} className="flex gap-3 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-line rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-emerald-400/10 grid place-items-center">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                </div>

                <div>
                  <h3 className="text-white font-semibold">
                    Compliance timeline
                  </h3>

                  <p className="text-xs text-white/50">
                    Suggested dates aligned to company maturity
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {[
                  [
                    regulatory.foundedDate,
                    "NordVault Global Capital operational foundation date",
                  ],
                  [
                    regulatory.germanOfficeEstablished,
                    "Frankfurt EU regulatory office established",
                  ],
                  [
                    regulatory.certificateIssued,
                    "Current compliance certificate issued",
                  ],
                ].map(([date, text]) => (
                  <div key={date} className="relative pl-7">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-400/10" />

                    <div className="text-sm font-semibold text-white">
                      {date}
                    </div>

                    <div className="text-sm text-white/60 mt-0.5">
                      {text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="certificate"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <CompanyCertificate />
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-center">
        <h2 className="text-3xl font-semibold text-white">
          Investor due diligence made transparent.
        </h2>

        <p className="mt-3 text-white/65">
          Investors can review the certificate, verify registry references,
          inspect security policies and speak directly with the compliance team
          before allocating capital.
        </p>

        <div className="mt-7 flex flex-wrap gap-3 justify-center">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold"
          >
            Open investor account
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/security"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-line text-white hover:bg-white/5"
          >
            Review security
          </Link>
        </div>
      </section>
    </div>
  );
              }
