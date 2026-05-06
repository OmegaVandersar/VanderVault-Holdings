import {
  Award,
  Newspaper,
  Download,
  ExternalLink,
  Quote,
  Mic,
} from "lucide-react";

import { CONFIG } from "../config";

const AWARDS = [
  {
    year: "2025",
    title: "Best Digital Asset Investment Platform",
    from: "Hedgeweek European Awards",
    icon: "🏆",
  },
  {
    year: "2024",
    title: "Top 50 Finance Innovators",
    from: "Handelsblatt",
    icon: "🥇",
  },
  {
    year: "2024",
    title: "Excellence in Compliance",
    from: "German FinTech Awards",
    icon: "⭐",
  },
  {
    year: "2023",
    title: "Best Digital Asset Custody Framework",
    from: "Global Finance Magazine",
    icon: "🛡️",
  },
  {
    year: "2023",
    title: "Most Trusted Crypto Platform — Germany",
    from: "Capital Magazin",
    icon: "🇩🇪",
  },
  {
    year: "2022",
    title: "Digital Asset Platform of the Year",
    from: "Finance Forum Frankfurt",
    icon: "🇬🇧",
  },
];

const COVERAGE = [
  {
    src: "Financial Times",
    date: "12 Dec 2025",
    title: "How NordVault Global Capital became Europe's quiet crypto giant",
    quote:
      "...arguably one of the more institutionally credible operators in the European crypto landscape.",
  },
  {
    src: "Handelsblatt",
    date: "08 Nov 2025",
    title: "Frankfurter Krypto-Vermögensverwalter knackt 4-Milliarden-Marke",
    quote:
      "Mit Präsenz in Frankfurt und einem Team aus ehemaligen Deutsche-Bank-Spezialisten setzt NordVault neue Maßstäbe.",
  },
  {
    src: "Bloomberg",
    date: "22 Oct 2025",
    title: "European wealth managers turn to NordVault for crypto allocation",
    quote:
      "...a platform increasingly reviewed by family offices seeking structured digital asset exposure.",
  },
  {
    src: "Les Echos",
    date: "15 Sept 2025",
    title: "Crypto-investissement: NordVault séduit les institutionnels français",
    quote:
      "Une combinaison rare de discipline réglementaire et d'innovation technologique.",
  },
  {
    src: "Reuters",
    date: "03 Aug 2025",
    title: "Global crypto manager NordVault crosses €4B AUM as MiCA takes effect",
    quote:
      "Among the first to align operations with the EU's digital asset framework.",
  },
  {
    src: "CoinDesk",
    date: "19 Jul 2025",
    title: "NordVault's OTC desk handles rising institutional demand",
    quote:
      "A sign of the platform's growing relevance to larger digital asset allocators.",
  },
];

const STATS = [
  {
    value: "€4.8B+",
    label: "Assets under management",
  },
  {
    value: "192,000+",
    label: "Verified investors",
  },
  {
    value: "78",
    label: "Countries served",
  },
  {
    value: "350+",
    label: "Employees globally",
  },
  {
    value: "8",
    label: "Years operating",
  },
  {
    value: "99.97%",
    label: "Payout reliability",
  },
];

export default function Press() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-radial-glow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2 flex items-center gap-2">
            <Mic className="w-3.5 h-3.5" />
            Press & Investor Relations
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight max-w-3xl">
            Recognised by global financial press and investor communities.
          </h1>

          <p className="mt-5 text-lg text-white/70 max-w-2xl">
            Media enquiries, investor relations, and downloadable resources for
            journalists, analysts and institutional partners.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-xs uppercase tracking-[0.18em] text-amber-400 mb-2 flex items-center gap-2">
          <Award className="w-3.5 h-3.5" />
          Awards & recognition
        </div>

        <h2 className="text-3xl font-semibold text-white mb-8">
          Recognition for platform quality and investor trust.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AWARDS.map(award => (
            <div
              key={award.title}
              className="bg-card border border-line rounded-xl p-5 hover:border-amber-400/30 transition"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">
                  {award.icon}
                </span>

                <span className="text-xs text-amber-400 font-semibold">
                  {award.year}
                </span>
              </div>

              <h3 className="mt-3 text-white font-semibold">
                {award.title}
              </h3>

              <p className="text-xs text-white/50 mt-1">
                {award.from}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg-elev/40 border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2 flex items-center gap-2">
            <Newspaper className="w-3.5 h-3.5" />
            In the press
          </div>

          <h2 className="text-3xl font-semibold text-white mb-8">
            What the financial press is saying.
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {COVERAGE.map(item => (
              <a
                key={item.title}
                href="#"
                className="bg-card border border-line rounded-xl p-5 hover:border-emerald-400/30 transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-emerald-400 font-semibold text-sm">
                    {item.src}
                  </span>

                  <span className="text-xs text-white/40">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-white font-medium leading-snug group-hover:text-emerald-300 transition">
                  {item.title}
                </h3>

                <div className="mt-3 flex gap-2 text-xs text-white/60 italic">
                  <Quote className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400/60" />
                  {item.quote}
                </div>

                <div className="mt-3 text-[11px] text-emerald-400 inline-flex items-center gap-1">
                  Read full article
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-white mb-5">
              Company factsheet
            </h2>

            <div className="bg-card border border-line rounded-2xl p-6">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                {[
                  ["Legal name", CONFIG.brand.legalName],
                  ["Registration", CONFIG.brand.registrationNumber],
                  ["Founded", CONFIG.brand.foundedYear.toString()],
                  ["Headquarters", CONFIG.offices.globalHeadquarters],
                  ["EU office", CONFIG.offices.euRegulatoryOffice],
                  ["CEO", "Dr. Maximilian Hoffmann"],
                  [
                    "Framework",
                    "MiCA alignment · German GwG / AML · GDPR · KYC / 2FA",
                  ],
                  ["Custody", "BitGo Trust · Fireblocks · Multi-signature"],
                  ["Insurance", "Up to €250M insured custody infrastructure"],
                  ["Support", CONFIG.contact.email],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="text-xs text-white/50">
                      {label}
                    </div>

                    <div className="text-white mt-0.5">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-line grid sm:grid-cols-3 gap-4">
                {STATS.map(stat => (
                  <div key={stat.label}>
                    <div className="text-2xl font-semibold text-emerald-400">
                      {stat.value}
                    </div>

                    <div className="text-xs text-white/50 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-5">
              Press kit
            </h2>

            <div className="bg-card border border-line rounded-2xl p-6">
              <p className="text-sm text-white/60 mb-5">
                Logos, executive headshots, brand guidelines and high-resolution
                platform resources.
              </p>

              <div className="space-y-2">
                {[
                  {
                    title: "Logo pack",
                    size: "SVG · PNG",
                  },
                  {
                    title: "Executive headshots",
                    size: "Image pack",
                  },
                  {
                    title: "Brand guidelines",
                    size: "PDF",
                  },
                  {
                    title: "Office photography",
                    size: "Image pack",
                  },
                  {
                    title: "Investor factsheet",
                    size: "PDF",
                  },
                ].map(item => (
                  <a
                    key={item.title}
                    href="#"
                    className="flex items-center justify-between p-3 rounded-md bg-bg/60 border border-line hover:border-emerald-400/30 transition group"
                  >
                    <div className="flex items-center gap-3">
                      <Download className="w-4 h-4 text-emerald-400" />

                      <div>
                        <div className="text-sm text-white">
                          {item.title}
                        </div>

                        <div className="text-[10px] text-white/40">
                          {item.size}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-line">
                <div className="text-xs text-white/50 mb-2">
                  Media enquiries
                </div>

                <a
                  href={`mailto:${CONFIG.contact.pressEmail}`}
                  className="text-emerald-400 text-sm font-medium"
                >
                  {CONFIG.contact.pressEmail}
                </a>

                <div className="text-xs text-white/40 mt-1">
                  Response within 4 business hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
    }
