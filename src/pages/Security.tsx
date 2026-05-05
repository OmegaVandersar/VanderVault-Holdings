import {
  ShieldCheck,
  Lock,
  KeyRound,
  FileCheck2,
  Database,
  Eye,
  AlertTriangle,
  Server,
  Fingerprint,
} from "lucide-react";

export default function Security() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0">
          <img
            src="/images/security.svg"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/80 to-bg" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
              Security & compliance
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
              Security designed for serious digital asset investors.
            </h1>

            <p className="mt-5 text-lg text-white/65 leading-relaxed">
              Security at NordVault is built around identity verification,
              two-factor authentication, wallet screening, withdrawal review,
              audit logs, custody controls and encrypted infrastructure.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: ShieldCheck,
              title: "Insured custody framework",
              desc: "The platform is structured around institutional custody procedures, segregated wallet handling, withdrawal approvals and insured custody infrastructure.",
            },
            {
              icon: Database,
              title: "Cold-wallet discipline",
              desc: "Digital asset movements are handled through strict treasury controls, wallet screening and layered internal review.",
            },
            {
              icon: KeyRound,
              title: "Withdrawal whitelisting",
              desc: "Investors can maintain approved wallet addresses before withdrawal requests are reviewed.",
            },
            {
              icon: Lock,
              title: "Two-factor authentication",
              desc: "2FA protects account login, sensitive settings and withdrawal approval workflows.",
            },
            {
              icon: Fingerprint,
              title: "KYC verification",
              desc: "Identity verification, proof of address and selfie verification are part of the onboarding process.",
            },
            {
              icon: Eye,
              title: "Visitor and login monitoring",
              desc: "The platform includes visitor analytics, device detection, login history and security monitoring.",
            },
            {
              icon: FileCheck2,
              title: "Regulatory alignment",
              desc: "London headquarters and Frankfurt EU office support a framework aligned with AML, KYC, GDPR, MiCA and German compliance expectations.",
            },
            {
              icon: Server,
              title: "Encrypted infrastructure",
              desc: "Platform data is designed around encrypted storage, secure browser sessions and protected investor workflows.",
            },
            {
              icon: AlertTriangle,
              title: "Risk-based review",
              desc: "Withdrawal requests, account behaviour and wallet activity may trigger manual review for investor protection.",
            },
          ].map(item => (
            <div
              key={item.title}
              className="bg-card border border-line rounded-xl p-6 hover:border-emerald-400/30 transition"
            >
              <div className="w-11 h-11 rounded-lg bg-emerald-400/10 grid place-items-center mb-4">
                <item.icon className="w-5 h-5 text-emerald-400" />
              </div>

              <h3 className="text-white font-semibold">
                {item.title}
              </h3>

              <p className="text-sm text-white/60 mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg-elev/40 border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-semibold text-white">
                Defence in depth.
              </h2>

              <p className="mt-4 text-white/70 leading-relaxed">
                NordVault is designed around layered account protection. From
                registration to withdrawal approval, every important step
                includes verification, logging and investor protection controls.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Email verification before investor account activation",
                  "Two-factor authentication for account protection",
                  "KYC identity, proof of address and selfie review",
                  "Withdrawal request screening and admin approval",
                  "Wallet address collection and whitelist controls",
                  "Visitor analytics and login activity monitoring",
                  "PDF statements, receipts and audit log export",
                ].map(item => (
                  <div
                    key={item}
                    className="flex gap-3 text-sm text-white/80"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-line rounded-2xl p-7">
              <h3 className="text-white font-semibold">
                Certifications & standards
              </h3>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  {
                    title: "MiCA",
                    subtitle: "EU crypto-asset framework",
                  },
                  {
                    title: "BaFin",
                    subtitle: "German compliance expectations",
                  },
                  {
                    title: "GwG",
                    subtitle: "German AML framework",
                  },
                  {
                    title: "GDPR",
                    subtitle: "EU data privacy",
                  },
                  {
                    title: "ISO 27001",
                    subtitle: "Information security alignment",
                  },
                  {
                    title: "SOC 2",
                    subtitle: "Service controls readiness",
                  },
                  {
                    title: "KYC",
                    subtitle: "Identity verification",
                  },
                  {
                    title: "2FA",
                    subtitle: "Account authentication",
                  },
                ].map(item => (
                  <div
                    key={item.title}
                    className="bg-bg/60 border border-line rounded-lg p-4"
                  >
                    <div className="text-white font-semibold text-sm">
                      {item.title}
                    </div>

                    <div className="text-xs text-white/50 mt-1">
                      {item.subtitle}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-semibold text-white">
          Security before capital movement.
        </h2>

        <p className="mt-3 text-white/65">
          Investors are required to complete email verification, KYC review and
          2FA before withdrawals are approved.
        </p>
      </section>
    </div>
  );
      }
