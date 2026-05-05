import { Link } from "react-router-dom";
import {
  Award,
  Building2,
  Users,
  Globe2,
  ShieldCheck,
  TrendingUp,
  Lock,
  Trophy,
  Zap,
  Link2,
  ArrowRight,
} from "lucide-react";

import { CONFIG } from "../config";
import { TEAM, REASONS } from "../data/team";

const Linkedin = Link2;

const ICONS: Record<string, any> = {
  ShieldCheck,
  Lock,
  Trophy,
  TrendingUp,
  Users,
  Zap,
};

const milestones = [
  {
    y: "2017",
    t: "Operational foundation by Dr. Maximilian Hoffmann and a team of former Deutsche Bank digital asset specialists.",
  },
  {
    y: "2019",
    t: "Compliance programme formalised around AML controls, custody procedures and institutional investor reporting.",
  },
  {
    y: "2020",
    t: "Crossed €100M in monitored digital asset allocations and launched private client onboarding.",
  },
  {
    y: "2021",
    t: "Frankfurt EU regulatory office established. Institutional OTC and treasury desk launched.",
  },
  {
    y: "2022",
    t: "Risk monitoring strengthened through wallet screening, custody policies and withdrawal approval workflows.",
  },
  {
    y: "2023",
    t: "Platform dashboard upgraded with investor analytics, plan projections, PDF statements and account security tools.",
  },
  {
    y: "2024",
    t: "MiCA-aligned operational review and expanded global investor onboarding across 78 countries.",
  },
  {
    y: "2025",
    t: "Awarded for digital asset platform innovation and crossed 192,000 verified investor accounts.",
  },
];

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0">
          <img
            src="/images/office.svg"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/70 to-bg" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
              About {CONFIG.brand.name}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight">
              A global institution for the digital asset era.
            </h1>

            <p className="mt-5 text-lg text-white/80 leading-relaxed">
              Founded in {CONFIG.brand.foundedYear} by Dr. Maximilian Hoffmann,
              a team of former Deutsche Bank, Goldman Sachs, UBS and European
              compliance specialists built {CONFIG.brand.name} on a single
              principle: serious investors deserve a transparent, secure and
              professional bridge into digital assets.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Building2,
                value: CONFIG.stats.aum,
                label: "Assets under management",
              },
              {
                icon: Users,
                value: CONFIG.stats.investors,
                label: "Verified investors",
              },
              {
                icon: Globe2,
                value: CONFIG.stats.countries,
                label: "Countries served",
              },
              {
                icon: Award,
                value: `${CONFIG.stats.yearsOperating} yrs`,
                label: "Operational track record",
              },
            ].map(stat => (
              <div
                key={stat.label}
                className="bg-card/80 backdrop-blur border border-line rounded-xl p-5"
              >
                <stat.icon className="w-5 h-5 text-emerald-400 mb-3" />

                <div className="text-2xl font-semibold text-white">
                  {stat.value}
                </div>

                <div className="text-xs text-white/50 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
            Why investors choose us
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold text-white">
            Six reasons investors trust NordVault.
          </h2>

          <p className="mt-3 text-white/60">
            There are many crypto platforms. NordVault is structured to look and
            operate like a premium digital asset investment company.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map(reason => {
            const Icon = ICONS[reason.icon] || ShieldCheck;

            return (
              <div
                key={reason.title}
                className="bg-card border border-line rounded-2xl p-7 hover:border-emerald-400/30 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400/20 to-blue-500/20 grid place-items-center mb-5 group-hover:scale-110 transition">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {reason.title}
                </h3>

                <p className="text-sm text-white/65 mt-2 leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-bg-elev/40 border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
              Leadership
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold text-white">
              A team built on finance, compliance and technology.
            </h2>

            <p className="mt-3 text-white/60 max-w-2xl mx-auto">
              Our executives carry decades of experience across banking,
              treasury, compliance, custody architecture and risk management.
            </p>
          </div>

          <div className="bg-card border border-line rounded-3xl overflow-hidden mb-8">
            <div className="grid lg:grid-cols-5 gap-0">
              <div className="lg:col-span-2 relative h-80 lg:h-auto">
                <img
                  src={TEAM[0].image}
                  alt={TEAM[0].name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                  <div className="text-xs text-emerald-400">
                    {TEAM[0].nationality} · Based in {TEAM[0].based}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 p-8 lg:p-12">
                <div className="text-xs uppercase tracking-[0.18em] text-amber-400 mb-2">
                  Founder & CEO
                </div>

                <h3 className="text-2xl lg:text-3xl font-semibold text-white">
                  {TEAM[0].name}
                </h3>

                <p className="mt-4 text-white/70 leading-relaxed">
                  {TEAM[0].bio}
                </p>

                {TEAM[0].quote && (
                  <blockquote className="mt-6 border-l-2 border-emerald-400 pl-4 text-lg text-white italic">
                    "{TEAM[0].quote}"
                  </blockquote>
                )}

                <a
                  href={TEAM[0].linkedIn}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300"
                >
                  <Linkedin className="w-4 h-4" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.slice(1).map(member => (
              <div
                key={member.name}
                className="bg-card border border-line rounded-2xl overflow-hidden hover:border-emerald-400/30 transition group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-bg-elev">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-bg/70 backdrop-blur text-[10px] text-white">
                    {member.nationality}
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-xs text-emerald-400 font-medium">
                    {member.role}
                  </div>

                  <h4 className="mt-1 text-lg font-semibold text-white">
                    {member.name}
                  </h4>

                  <div className="text-xs text-white/40 mt-0.5">
                    Based in {member.based}
                  </div>

                  <p className="mt-3 text-sm text-white/65 leading-relaxed line-clamp-4">
                    {member.bio}
                  </p>

                  <a
                    href={member.linkedIn}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-emerald-400"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center text-sm text-white/50">
            Plus engineers, traders, compliance officers and client support
            staff across London, Frankfurt, Munich, Berlin, Paris, Stockholm and
            Vilnius.
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
              Global headquarters
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              London presence with Frankfurt EU regulatory strength.
            </h2>

            <p className="mt-5 text-white/65 leading-relaxed">
              Our London headquarters positions NordVault within one of the
              world's strongest financial centres, while our Frankfurt EU office
              supports European regulatory, compliance and institutional
              investor engagement.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                ["London, UK", "Global headquarters"],
                ["Frankfurt, DE", "EU regulatory office"],
                ["Munich, DE", "Treasury"],
                ["Berlin, DE", "Client operations"],
                ["Paris, FR", "Compliance"],
                ["Stockholm, SE", "Technology"],
              ].map(([city, purpose]) => (
                <div
                  key={city}
                  className="bg-card border border-line rounded-lg p-3"
                >
                  <div className="text-sm text-white font-medium">
                    {city}
                  </div>

                  <div className="text-xs text-white/50">
                    {purpose}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/10 via-blue-500/10 to-transparent blur-2xl rounded-3xl" />

            <img
              src="/images/office.svg"
              alt="NordVault Global Capital office"
              className="relative rounded-2xl border border-line shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      <section className="bg-bg-elev/40 border-y border-line">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
              Our journey
            </div>

            <h2 className="text-3xl font-semibold text-white">
              Eight years of platform evolution.
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-line" />

            {milestones.map((milestone, index) => (
              <div
                key={milestone.y}
                className={`relative flex gap-6 mb-8 sm:grid sm:grid-cols-2 sm:gap-10 ${
                  index % 2 === 0 ? "" : "sm:[&>*:first-child]:order-2"
                }`}
              >
                <div
                  className={`pl-12 sm:pl-0 ${
                    index % 2 === 0
                      ? "sm:text-right sm:pr-10"
                      : "sm:pl-10"
                  }`}
                >
                  <div className="text-emerald-400 font-semibold text-lg">
                    {milestone.y}
                  </div>

                  <div className="text-white/80 mt-1 text-sm">
                    {milestone.t}
                  </div>
                </div>

                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-400 mt-1.5 ring-4 ring-bg" />

                <div />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white">
          Ready to invest with a professional team?
        </h2>

        <p className="mt-3 text-white/65">
          Open your account, complete KYC, enable 2FA and explore the platform
          dashboard.
        </p>

        <div className="mt-7 flex flex-wrap gap-3 justify-center">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold shadow-lg shadow-emerald-500/20"
          >
            Open account
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-line text-white hover:bg-white/5"
          >
            Talk to a specialist
          </Link>
        </div>
      </section>
    </div>
  );
    }
