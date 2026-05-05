import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ArrowRight,
  Calculator,
  TrendingUp,
} from "lucide-react";

import { PLANS } from "../data/site";
import PlanPerformance from "../components/PlanPerformance";

export default function Plans() {
  const [amount, setAmount] = useState(5000);
  const [planIndex, setPlanIndex] = useState(1);

  const plan = PLANS[planIndex];

  const calc = useMemo(() => {
    const dailyProfit = (amount * plan.daily) / 100;
    const totalProfit = dailyProfit * plan.duration;
    const total = amount + totalProfit;

    return {
      dailyProfit,
      totalProfit,
      total,
    };
  }, [amount, plan]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-radial-glow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
            Investment plans
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            Transparent plans. Defined duration. Clear risk.
          </h1>

          <p className="mt-4 text-lg text-white/65 max-w-2xl mx-auto">
            Choose from three investment plans with clearly displayed minimum
            deposit, maximum deposit, target daily yield, duration and referral
            commission.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-card border border-line rounded-2xl p-7">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
              Why investors choose NordVault
            </div>

            <h2 className="text-2xl font-semibold text-white">
              A premium global platform built around transparency, custody and
              disciplined risk management.
            </h2>

            <p className="mt-4 text-white/65 leading-relaxed">
              NordVault Global Capital combines a London headquarters, Frankfurt
              EU regulatory office, institutional custody processes, live
              portfolio analytics, 2FA account protection, KYC onboarding,
              wallet screening, withdrawal review and investor statements. Our
              plans use clearly stated target daily yields, defined durations,
              minimum and maximum allocations, and visible referral commissions
              so investors understand the opportunity before allocating capital.
            </p>

            <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm text-white/70">
              {[
                "London headquarters with Frankfurt EU regulatory presence",
                "KYC, 2FA, email verification and wallet screening",
                "Live charts, performance forecast and investor statements",
                "Withdrawal approval workflow and audit log transparency",
                "Clear target rates, plan duration and risk disclosure",
                "Referral commission structure visible before signup",
              ].map(item => (
                <div key={item} className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-400/5 border border-amber-400/20 rounded-2xl p-7">
            <div className="text-xs uppercase tracking-[0.18em] text-amber-400 mb-2">
              Risk disclosure
            </div>

            <p className="text-sm text-amber-100/80 leading-relaxed">
              Target daily rates are not guaranteed. Digital asset markets are
              volatile, and investment products carry risk, including potential
              loss of principal. Past performance is not a reliable indicator of
              future results. Investors should only allocate capital they can
              afford to risk and should seek independent financial, legal and tax
              advice before investing.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-5">
          {PLANS.map((item, index) => (
            <div
              key={item.name}
              className={`relative bg-card border ${
                item.featured ? "border-emerald-400/40" : "border-line"
              } rounded-2xl p-7 flex flex-col`}
            >
              {item.featured && (
                <div className="absolute -top-3 left-7 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-400 text-bg font-semibold">
                  Most popular
                </div>
              )}

              <div
                className={`absolute inset-0 bg-gradient-to-b ${item.color} rounded-2xl pointer-events-none`}
              />

              <div className="relative flex-1 flex flex-col">
                <div className="text-xs uppercase tracking-wider text-white/50">
                  {item.badge}
                </div>

                <h3 className="mt-1 text-2xl font-semibold text-white">
                  {item.name}
                </h3>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-5xl font-semibold text-white">
                    {item.daily}%
                  </span>

                  <span className="text-sm text-white/60">
                    target / day
                  </span>
                </div>

                <div className="text-xs text-white/50 mt-1">
                  for {item.duration} days · capital at risk
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-white/50">Min deposit</div>
                    <div className="text-white font-semibold text-sm mt-0.5">
                      €{item.minimum.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-white/50">Max deposit</div>
                    <div className="text-white font-semibold text-sm mt-0.5">
                      €{item.maximum.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-white/50">Duration</div>
                    <div className="text-white font-semibold text-sm mt-0.5">
                      {item.duration} days
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-white/50">Referral</div>
                    <div className="text-white font-semibold text-sm mt-0.5">
                      {item.referral}%
                    </div>
                  </div>
                </div>

                <ul className="mt-6 space-y-2.5 text-sm text-white/70 flex-1">
                  {item.features.map(feature => (
                    <li key={feature} className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid gap-2">
                  <Link
                    to={`/invest?plan=${item.name.toLowerCase()}`}
                    className={`block text-center py-2.5 rounded-md font-medium transition ${
                      item.featured
                        ? "bg-gradient-to-r from-emerald-400 to-blue-500 text-bg"
                        : "border border-line text-white hover:bg-white/5"
                    }`}
                  >
                    Invest now
                  </Link>

                  <button
                    onClick={() => setPlanIndex(index)}
                    className="text-xs text-white/50 hover:text-white"
                  >
                    Use in calculator ↓
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PlanPerformance />

      <section className="bg-bg-elev/40 border-y border-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
              <Calculator className="w-4 h-4" />
              Profit calculator
            </div>

            <h2 className="text-3xl font-semibold text-white">
              See your potential target earnings.
            </h2>

            <p className="mt-3 text-white/50 text-sm">
              This calculator shows target projections only. Returns are not
              guaranteed.
            </p>
          </div>

          <div className="bg-card border border-line rounded-2xl p-6 sm:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <label className="text-sm text-white/70">
                  Investment plan
                </label>

                <div className="mt-2 grid grid-cols-3 gap-2">
                  {PLANS.map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() => setPlanIndex(index)}
                      className={`text-xs py-2.5 rounded-md border transition ${
                        index === planIndex
                          ? "border-emerald-400/50 bg-emerald-400/10 text-white"
                          : "border-line text-white/60 hover:bg-white/5"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>

                <label className="text-sm text-white/70 mt-6 block">
                  Investment amount:{" "}
                  <span className="text-white font-semibold">
                    €{amount.toLocaleString()}
                  </span>
                </label>

                <input
                  type="range"
                  min={plan.minimum}
                  max={plan.maximum}
                  step={Math.max(50, Math.round(plan.minimum / 10))}
                  value={Math.min(Math.max(amount, plan.minimum), plan.maximum)}
                  onChange={event => setAmount(Number(event.target.value))}
                  className="w-full mt-2 accent-emerald-400"
                />

                <div className="flex justify-between text-xs text-white/50 mt-1">
                  <span>€{plan.minimum.toLocaleString()}</span>
                  <span>€{plan.maximum.toLocaleString()}</span>
                </div>

                <input
                  type="number"
                  value={amount}
                  onChange={event => setAmount(Number(event.target.value))}
                  className="mt-3 w-full bg-bg border border-line rounded-md px-3 py-2.5 text-white"
                />
              </div>

              <div className="bg-bg/60 border border-line rounded-xl p-5">
                <div className="flex items-center gap-2 text-emerald-400 text-xs mb-4">
                  <TrendingUp className="w-4 h-4" />
                  Projected target returns ({plan.name} plan)
                </div>

                <div className="space-y-3">
                  {[
                    {
                      label: "Daily target profit",
                      value: calc.dailyProfit,
                    },
                    {
                      label: `Target profit after ${plan.duration} days`,
                      value: calc.totalProfit,
                    },
                    {
                      label: "Projected payout before risk adjustments",
                      value: calc.total,
                      big: true,
                    },
                  ].map(row => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between border-b border-line/60 last:border-0 pb-3 last:pb-0"
                    >
                      <span className="text-sm text-white/60">
                        {row.label}
                      </span>

                      <span
                        className={`font-semibold ${
                          row.big
                            ? "text-2xl text-emerald-400"
                            : "text-white"
                        }`}
                      >
                        €{row.value.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/register"
                  className="mt-5 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-medium"
                >
                  Start investing
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="mt-3 text-[11px] text-white/40 leading-relaxed">
                  Projections are target rates and are not guaranteed. Past
                  performance does not predict future results. Capital at risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-semibold text-white text-center mb-8">
          Plan comparison
        </h2>

        <div className="overflow-x-auto bg-card border border-line rounded-xl">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-white/50">
                <th className="text-left py-4 px-5">Feature</th>
                {PLANS.map(item => (
                  <th
                    key={item.name}
                    className="text-center py-4 px-5 text-white"
                  >
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="text-white/80">
              {[
                {
                  label: "Target daily yield",
                  value: PLANS.map(item => `${item.daily}%`),
                },
                {
                  label: "Min deposit",
                  value: PLANS.map(item => `€${item.minimum.toLocaleString()}`),
                },
                {
                  label: "Max deposit",
                  value: PLANS.map(item => `€${item.maximum.toLocaleString()}`),
                },
                {
                  label: "Duration",
                  value: PLANS.map(item => `${item.duration} days`),
                },
                {
                  label: "Referral commission",
                  value: PLANS.map(item => `${item.referral}%`),
                },
                {
                  label: "Dedicated manager",
                  value: ["—", "✓", "✓"],
                },
                {
                  label: "OTC desk access",
                  value: ["—", "—", "✓"],
                },
                {
                  label: "Priority withdrawals",
                  value: ["—", "✓", "✓"],
                },
                {
                  label: "Quarterly market reports",
                  value: ["—", "✓", "✓"],
                },
                {
                  label: "Multi-signature custody",
                  value: ["✓", "✓", "✓"],
                },
              ].map(row => (
                <tr
                  key={row.label}
                  className="border-b border-line/50 last:border-0"
                >
                  <td className="py-3.5 px-5 text-white/60">
                    {row.label}
                  </td>

                  {row.value.map((value, index) => (
                    <td
                      key={index}
                      className="text-center py-3.5 px-5"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-xs text-white/40 leading-relaxed text-center max-w-3xl mx-auto">
          Risk Warning: Digital asset investments involve significant risk and
          are not suitable for every investor. Target daily yields are not
          guaranteed. Investors may lose some or all of their capital.
        </p>
      </section>
    </div>
  );
              }
