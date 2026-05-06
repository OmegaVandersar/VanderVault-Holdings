import { Link } from "react-router-dom";
import {
  Users,
  Gift,
  Share2,
  TrendingUp,
  Award,
  Copy,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { CONFIG } from "../config";
import { useState } from "react";

export default function Affiliate() {
  const [copied, setCopied] = useState(false);

  const sample = "https://nordvaultglobal.com/?ref=ANNA1234";

  const copy = () => {
    navigator.clipboard.writeText(sample);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-radial-glow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs">
                <Gift className="w-3.5 h-3.5" />
                Earn up to 18% lifetime commission
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
                The affiliate program built for{" "}
                <span className="text-gradient">global crypto investors</span>.
              </h1>

              <p className="mt-5 text-lg text-white/65 max-w-xl">
                Refer friends, family or your audience to NordVault. Earn
                commission when they join and fund their investment account.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-gradient-to-r from-amber-400 to-amber-500 text-bg font-medium shadow-lg shadow-amber-500/20"
                >
                  Become an affiliate
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#tiers"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-line text-white hover:bg-white/5"
                >
                  View commission tiers
                </a>
              </div>
            </div>

            <div className="bg-card border border-line rounded-2xl p-6">
              <div className="text-xs text-white/50 mb-2">
                Your referral link (sample)
              </div>

              <div className="flex bg-bg border border-line rounded-md overflow-hidden">
                <input
                  readOnly
                  value={sample}
                  className="flex-1 px-3 py-2.5 bg-transparent text-sm text-white font-mono focus:outline-none"
                />

                <button
                  onClick={copy}
                  className="px-4 border-l border-line text-emerald-400 hover:bg-white/5"
                >
                  {copied ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  {
                    label: "Total earned",
                    value: "€4,182",
                  },
                  {
                    label: "Active referrals",
                    value: "12",
                  },
                  {
                    label: "Pending",
                    value: "€312",
                  },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="bg-bg/60 border border-line rounded-md p-3"
                  >
                    <div className="text-[10px] uppercase text-white/50">
                      {stat.label}
                    </div>

                    <div className="text-lg font-semibold text-white mt-1">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 text-xs text-white/50 flex items-center gap-2">
                <Share2 className="w-3.5 h-3.5" />
                Share via WhatsApp, Telegram, email, social media or QR code.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
            How it works
          </div>

          <h2 className="text-3xl font-semibold text-white">
            Three steps to referral income.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: Users,
              title: "Share your link",
              desc: "Every investor receives a unique referral link after registration.",
            },
            {
              icon: TrendingUp,
              title: "They invest",
              desc: "When someone joins and funds an account, the referral is linked to you.",
            },
            {
              icon: Gift,
              title: "You earn",
              desc: "Commission is credited based on the plan tier and deposit volume.",
            },
          ].map((step, index) => (
            <div
              key={index}
              className="bg-card border border-line rounded-xl p-7 relative"
            >
              <div className="absolute top-5 right-5 text-5xl font-semibold text-white/5">
                0{index + 1}
              </div>

              <step.icon className="w-7 h-7 text-amber-400 mb-4" />

              <h3 className="text-lg font-semibold text-white">
                {step.title}
              </h3>

              <p className="text-sm text-white/60 mt-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="tiers" className="bg-bg-elev/40 border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
              Commission tiers
            </div>

            <h2 className="text-3xl font-semibold text-white">
              The more you refer, the more you earn.
            </h2>

            <p className="mt-3 text-white/60">
              Tier upgrades are based on lifetime referred volume.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONFIG.affiliate.tiers.map(tier => (
              <div
                key={tier.name}
                className="bg-card border border-line rounded-2xl p-6 text-center"
              >
                <div className="text-5xl">
                  {tier.badge}
                </div>

                <div className="mt-3 text-lg font-semibold text-white">
                  {tier.name}
                </div>

                <div className="mt-4 text-4xl font-semibold text-amber-400">
                  {tier.bonus}%
                </div>

                <div className="text-xs text-white/50 mt-1">
                  commission per qualifying deposit
                </div>

                <div className="mt-5 text-xs text-white/60 border-t border-line pt-4">
                  {tier.min === 0
                    ? "Available immediately"
                    : `From €${tier.min.toLocaleString()} referred volume`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Award className="w-10 h-10 text-amber-400 mx-auto mb-4" />

        <h2 className="text-3xl font-semibold text-white">
          Turn your network into recurring income.
        </h2>

        <p className="mt-3 text-white/60 max-w-xl mx-auto">
          Build a referral network around a premium digital asset investment
          platform with transparent plans and visible commission tiers.
        </p>

        <Link
          to="/register"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-to-r from-amber-400 to-amber-500 text-bg font-semibold shadow-lg shadow-amber-500/20"
        >
          Join the program
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
                      }
