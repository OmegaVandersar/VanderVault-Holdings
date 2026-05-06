import {
  CheckCircle2,
  Clock,
  Database,
  Globe2,
  Server,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const SYSTEMS = [
  {
    name: "Web platform",
    uptime: "99.99%",
    icon: Globe2,
  },
  {
    name: "Investor dashboard",
    uptime: "99.98%",
    icon: Server,
  },
  {
    name: "Custody monitoring",
    uptime: "99.97%",
    icon: Wallet,
  },
  {
    name: "KYC verification",
    uptime: "99.95%",
    icon: ShieldCheck,
  },
  {
    name: "Market data",
    uptime: "99.96%",
    icon: Database,
  },
];

export default function Status() {
  return (
    <div>
      <section className="border-b border-line bg-radial-glow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-5" />

          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
            System status
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-white">
            All systems operational.
          </h1>

          <p className="mt-4 text-white/65">
            Platform health, uptime and incident transparency.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-4">
          {SYSTEMS.map(system => (
            <div
              key={system.name}
              className="bg-card border border-line rounded-xl p-5 flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-lg bg-emerald-400/10 grid place-items-center">
                <system.icon className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="flex-1">
                <div className="text-white font-semibold">
                  {system.name}
                </div>

                <div className="text-xs text-white/50">
                  30-day uptime {system.uptime}
                </div>
              </div>

              <span className="text-xs px-2 py-1 rounded bg-emerald-400/15 text-emerald-300">
                Operational
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-card border border-line rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">
            Incident history
          </h2>

          <div className="space-y-3">
            {[
              "No incidents reported today",
              "No incidents this week",
              "No unresolved custody or withdrawal incidents",
            ].map(item => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-white/70"
              >
                <Clock className="w-4 h-4 text-emerald-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
            }
