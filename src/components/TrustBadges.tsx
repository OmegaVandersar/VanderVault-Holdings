import {
  ShieldCheck,
  Lock,
  Award,
  FileCheck2,
  Globe2,
  Star,
} from "lucide-react";

const BADGES = [
  {
    i: ShieldCheck,
    t: "BaFin",
    s: "German compliance framework",
    color: "text-emerald-400",
  },
  {
    i: FileCheck2,
    t: "MiCA",
    s: "EU framework aligned",
    color: "text-blue-400",
  },
  {
    i: Globe2,
    t: "Handelsregister",
    s: "Frankfurt am Main",
    color: "text-purple-400",
  },
  {
    i: Lock,
    t: "ISO 27001",
    s: "Information security",
    color: "text-emerald-400",
  },
  {
    i: Lock,
    t: "SOC 2 Type II",
    s: "Service controls",
    color: "text-blue-400",
  },
  {
    i: ShieldCheck,
    t: "GDPR",
    s: "EU data privacy",
    color: "text-emerald-400",
  },
  {
    i: Award,
    t: "Lloyd's",
    s: "€250M insurance",
    color: "text-amber-400",
  },
  {
    i: Star,
    t: "Hedgeweek 2025",
    s: "Best EU manager",
    color: "text-amber-400",
  },
];

export default function TrustBadges() {
  return (
    <div className="border-y border-line bg-bg-elev/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-xs uppercase tracking-[0.18em] text-white/40 mb-6">
          Regulated · Audited · Insured · Award-winning
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {BADGES.map(badge => (
            <div
              key={badge.t}
              className="bg-card border border-line rounded-lg p-3 text-center hover:border-emerald-400/30 transition group"
            >
              <badge.i
                className={`w-5 h-5 mx-auto ${badge.color} group-hover:scale-110 transition`}
              />

              <div className="mt-2 text-xs font-semibold text-white">
                {badge.t}
              </div>

              <div className="text-[10px] text-white/50 mt-0.5 leading-tight">
                {badge.s}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
          }
