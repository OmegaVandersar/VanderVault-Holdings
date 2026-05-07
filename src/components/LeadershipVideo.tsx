import {
  Play,
  ShieldCheck,
  Lock,
  Globe2,
  Users,
  FileCheck2,
} from "lucide-react";

export default function LeadershipVideo() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
            Leadership transparency
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            A message from our leadership team.
          </h2>

          <p className="mt-4 text-white/65 leading-relaxed">
            NordVault Global Capital is built around transparency, disciplined
            risk management and investor protection. Our leadership team
            explains how we approach custody, KYC, two-factor authentication,
            withdrawal review, global investor access and digital asset
            portfolio growth.
          </p>

          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {[
              {
                icon: ShieldCheck,
                title: "Capital protection",
                text: "Risk controls, custody procedures and account security.",
              },
              {
                icon: Lock,
                title: "KYC & 2FA",
                text: "Identity verification and two-factor authentication.",
              },
              {
                icon: Globe2,
                title: "Global investor access",
                text: "London headquarters and Frankfurt EU office.",
              },
              {
                icon: Users,
                title: "Management visibility",
                text: "Experienced leadership and investor support.",
              },
            ].map(item => (
              <div
                key={item.title}
                className="bg-card border border-line rounded-xl p-4"
              >
                <item.icon className="w-5 h-5 text-emerald-400 mb-3" />

                <div className="text-white font-semibold text-sm">
                  {item.title}
                </div>

                <div className="text-xs text-white/55 mt-1">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-tr from-emerald-500/10 via-blue-500/10 to-transparent rounded-3xl blur-2xl" />

          <div className="relative overflow-hidden rounded-3xl border border-line bg-card shadow-2xl">
            <div className="relative aspect-video bg-gradient-to-br from-black via-bg-elev to-card grid place-items-center">
              <img
                src="/images/team-ceo.svg"
                alt="CEO leadership video"
                className="absolute inset-0 w-full h-full object-cover opacity-35"
              />

              <div className="absolute inset-0 bg-black/45" />

              <button className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 grid place-items-center text-bg shadow-2xl shadow-emerald-500/30 hover:scale-105 transition">
                <Play className="w-8 h-8 ml-1" />
              </button>

              <div className="absolute left-5 bottom-5 right-5">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/20">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  CEO Transparency Briefing
                </div>

                <h3 className="mt-3 text-2xl font-semibold text-white">
                  Dr. Maximilian Hoffmann
                </h3>

                <p className="text-sm text-white/60">
                  Founder & Chief Executive Officer
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-line border-t border-line">
              {[
                ["8 yrs", "Track record"],
                ["78", "Countries"],
                ["€4.8B+", "AUM"],
              ].map(([value, label]) => (
                <div key={label} className="p-4 text-center">
                  <div className="text-lg font-semibold text-white">
                    {value}
                  </div>

                  <div className="text-[10px] uppercase tracking-wider text-white/40">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-3 text-xs text-white/40 text-center">
            Video placeholder ready. Replace with YouTube/Vimeo embed when your
            leadership video is recorded.
          </p>
        </div>
      </div>
    </section>
  );
                }
