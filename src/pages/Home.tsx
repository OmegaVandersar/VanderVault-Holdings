import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  TrendingUp,
  Lock,
  Globe,
  Users,
  Zap,
  Award,
  ArrowRight,
  CheckCircle2,
  Star,
  Wallet,
  KeyRound,
  LineChart,
  Smartphone,
  Download,
} from "lucide-react";

import { TESTIMONIALS, PARTNERS } from "../data/site";
import { CONFIG, Plan } from "../config";
import { ResponsiveContainer, Area, AreaChart } from "recharts";
import LiveActivity from "../components/LiveActivity";
import AnimatedCounter from "../components/AnimatedCounter";
import AUMTicker from "../components/AUMTicker";
import TrustBadges from "../components/TrustBadges";
import { useSeo } from "../utils/seo";

const PLANS = CONFIG.plans as readonly Plan[];

const SITE = {
  name: CONFIG.brand.name,
  aum: CONFIG.stats.aum,
  investors: CONFIG.stats.investors,
  countries: CONFIG.stats.countries,
  payout: CONFIG.stats.payoutReliability,
};

function generateChart(seed: number, points = 30) {
  const arr: {
    x: number;
    y: number;
  }[] = [];

  let value = 100;

  for (let index = 0; index < points; index++) {
    value += Math.sin(index / 3 + seed) * 4 + (Math.random() - 0.45) * 6;

    arr.push({
      x: index,
      y: Math.max(40, value),
    });
  }

  return arr;
}

export default function Home() {
  useSeo({
    title: "Global Digital Asset Investment Platform",
    description:
      "Institutional-grade cryptocurrency investing for global investors. London headquarters, Frankfurt EU office, KYC, 2FA, wallet screening, live market charts, transparent plans and insured custody.",
    path: "/",
  });

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCounter(current => current + 1), 50);

    setTimeout(() => clearInterval(timer), 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero.svg"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/85 to-bg" />
        </div>

        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-radial-glow opacity-70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-ring" />
                London HQ · Frankfurt EU office · Insured custody
              </div>

              <div className="mt-3 inline-flex items-center text-sm text-white/80 px-3 py-1.5 rounded-md bg-card/60 border border-line">
                <AUMTicker />
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
                Institutional-grade{" "}
                <span className="text-gradient">crypto investing</span> for
                global investors.
              </h1>

              <p className="mt-5 text-lg text-white/65 max-w-xl leading-relaxed">
                {SITE.name} manages over {SITE.aum} in digital assets across{" "}
                {SITE.countries} countries. Built with KYC, 2FA, wallet
                screening, withdrawal approval workflows, investor analytics,
                live markets and insured custody infrastructure.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-medium shadow-lg shadow-emerald-500/20 hover:opacity-90 transition"
                >
                  Open investor account
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/plans"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-line text-white hover:bg-white/5 transition"
                >
                  View investment plans
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
                {[
                  {
                    value: SITE.aum,
                    label: "Assets managed",
                  },
                  {
                    value: SITE.investors,
                    label: "Verified investors",
                  },
                  {
                    value: SITE.payout,
                    label: "Payout reliability",
                  },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="text-2xl font-semibold text-white">
                      {stat.value}
                    </div>

                    <div className="text-xs text-white/50 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 lg:hidden">
                <LiveActivity />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-tr from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl" />

              <div className="relative bg-card border border-line rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs text-white/50">
                      Portfolio balance
                    </div>

                    <div className="text-2xl font-semibold text-white">
                      €{(127480 + counter * 12).toLocaleString()}
                    </div>

                    <div className="text-xs text-emerald-400 mt-0.5">
                      ▲ €{(2841 + counter).toLocaleString()} today
                    </div>
                  </div>

                  <div className="flex gap-1.5">
                    {["1D", "7D", "1M", "1Y", "ALL"].map((period, index) => (
                      <button
                        key={period}
                        className={`text-[10px] px-2 py-1 rounded ${
                          index === 2
                            ? "bg-emerald-400/20 text-emerald-300"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={generateChart(1, 60)}>
                      <defs>
                        <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="0%"
                            stopColor="#f5c542"
                            stopOpacity={0.5}
                          />

                          <stop
                            offset="100%"
                            stopColor="#f5c542"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <Area
                        type="monotone"
                        dataKey="y"
                        stroke="#f5c542"
                        strokeWidth={2}
                        fill="url(#portfolioGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[
                    {
                      symbol: "BTC",
                      percent: "42%",
                      change: "+1.8%",
                      color: "#f7931a",
                    },
                    {
                      symbol: "ETH",
                      percent: "31%",
                      change: "+2.4%",
                      color: "#627eea",
                    },
                    {
                      symbol: "SOL",
                      percent: "12%",
                      change: "+4.1%",
                      color: "#14f195",
                    },
                  ].map(asset => (
                    <div
                      key={asset.symbol}
                      className="bg-bg/60 border border-line rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{
                            background: asset.color,
                          }}
                        />

                        <span className="text-xs text-white font-medium">
                          {asset.symbol}
                        </span>
                      </div>

                      <div className="text-sm font-semibold text-white">
                        {asset.percent}
                      </div>

                      <div className="text-[10px] text-emerald-400">
                        {asset.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 bg-card border border-line rounded-xl px-4 py-3 shadow-xl animate-float">
                <div className="w-9 h-9 rounded-full bg-emerald-400/15 grid place-items-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>

                <div>
                  <div className="text-xs text-white font-medium">
                    Insured to €250M
                  </div>

                  <div className="text-[10px] text-white/50">
                    Institutional custody
                  </div>
                </div>
              </div>

              <div className="hidden lg:block absolute -bottom-10 -right-6 w-72">
                <LiveActivity />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      <section className="border-y border-line bg-bg-elev/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-xs uppercase tracking-[0.18em] text-white/40 mb-6">
            Trusted infrastructure and compliance partners
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {PARTNERS.map(partner => (
              <span
                key={partner}
                className="text-white/55 hover:text-white text-sm font-medium tracking-wide"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
            Why NordVault
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold text-white">
            Built for investors who demand security, transparency and structure.
          </h2>

          <p className="mt-4 text-white/60">
            Eight years of operational track record, London headquarters,
            Frankfurt EU office, investor onboarding, KYC, 2FA, wallet screening
            and transparent plan disclosures.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: ShieldCheck,
              title: "Insured custody framework",
              text: "Digital assets are managed around institutional custody procedures, wallet screening and multi-signature controls.",
            },
            {
              icon: TrendingUp,
              title: "Transparent plan yields",
              text: "Every plan clearly displays target daily yield, duration, minimum, maximum and referral commission.",
            },
            {
              icon: Lock,
              title: "Bank-grade account security",
              text: "Email verification, KYC review, 2FA, withdrawal whitelisting and session timeout are built into the platform.",
            },
            {
              icon: Globe,
              title: "Global investor access",
              text: "Multi-currency display, multi-language support, live markets and global contact channels support international clients.",
            },
            {
              icon: Zap,
              title: "Fast withdrawal workflow",
              text: "Withdrawal requests are reviewed with KYC, wallet screening and admin approval workflows.",
            },
            {
              icon: Users,
              title: "Human support",
              text: "Investors can reach support through email, WhatsApp, Telegram and the live chat widget.",
            },
          ].map(feature => (
            <div
              key={feature.title}
              className="group relative bg-card border border-line rounded-xl p-6 hover:border-emerald-400/30 transition"
            >
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-emerald-400/20 to-blue-500/20 grid place-items-center mb-4">
                <feature.icon className="w-5 h-5 text-emerald-400" />
              </div>

              <h3 className="text-white font-semibold">
                {feature.title}
              </h3>

              <p className="text-sm text-white/60 mt-2 leading-relaxed">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg-elev/40 border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
              Simple onboarding
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold text-white">
              Start in three protected steps.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                number: "01",
                icon: KeyRound,
                title: "Create and verify",
                text: "Register with name, phone, email, country, wallet address and security confirmation.",
              },
              {
                number: "02",
                icon: Wallet,
                title: "Complete KYC and 2FA",
                text: "Verify identity, activate two-factor authentication and prepare your secure wallet withdrawal settings.",
              },
              {
                number: "03",
                icon: LineChart,
                title: "Choose a plan",
                text: "Select Starter, Professional or Institutional and monitor your dashboard live.",
              },
            ].map(step => (
              <div
                key={step.number}
                className="relative bg-card border border-line rounded-xl p-7"
              >
                <div className="absolute top-5 right-5 text-5xl font-semibold text-white/5">
                  {step.number}
                </div>

                <step.icon className="w-7 h-7 text-emerald-400 mb-4" />

                <h3 className="text-lg font-semibold text-white">
                  {step.title}
                </h3>

                <p className="text-sm text-white/60 mt-2">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
              Investment plans
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold text-white">
              Choose the strategy that fits your capital.
            </h2>
          </div>

          <Link
            to="/plans"
            className="text-emerald-400 hover:text-emerald-300 text-sm inline-flex items-center gap-1"
          >
            Compare all plans
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {PLANS.map(plan => (
            <div
              key={plan.name}
              className={`relative bg-card border ${
                plan.featured ? "border-emerald-400/40" : "border-line"
              } rounded-2xl p-6 flex flex-col`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-6 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-400 text-bg font-semibold">
                  Most popular
                </div>
              )}

              <div
                className={`absolute inset-0 bg-gradient-to-b ${plan.color} rounded-2xl pointer-events-none`}
              />

              <div className="relative">
                <div className="text-xs uppercase tracking-wider text-white/50">
                  {plan.badge}
                </div>

                <h3 className="mt-1 text-2xl font-semibold text-white">
                  {plan.name}
                </h3>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-white">
                    {plan.daily}%
                  </span>

                  <span className="text-sm text-white/60">
                    target / day
                  </span>
                </div>

                <div className="text-xs text-white/50 mt-1">
                  for {plan.duration} days · capital at risk
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 rounded-lg p-2.5">
                    <div className="text-white/50">Minimum</div>
                    <div className="text-white font-semibold">
                      €{plan.minimum.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-2.5">
                    <div className="text-white/50">Maximum</div>
                    <div className="text-white font-semibold">
                      €{plan.maximum.toLocaleString()}
                    </div>
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5 text-sm text-white/70">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className={`mt-6 block text-center py-2.5 rounded-md font-medium transition ${
                    plan.featured
                      ? "bg-g
