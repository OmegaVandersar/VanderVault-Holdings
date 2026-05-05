import { useMemo, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { auth } from "../data/auth";
import { CONFIG } from "../config";
import { store } from "../data/store";

export default function Invest() {
  const me = auth.current();
  const [params] = useSearchParams();

  const initial = Math.max(
    0,
    CONFIG.plans.findIndex(plan => plan.id === params.get("plan"))
  );

  const [index, setIndex] = useState(initial >= 0 ? initial : 1);
  const plan = CONFIG.plans[index];

  const [amount, setAmount] = useState(plan.minimum);
  const [done, setDone] = useState(false);

  if (!me) return <Navigate to="/login" replace />;

  const calc = useMemo(() => {
    const daily = (amount * plan.daily) / 100;
    const totalProfit = daily * plan.duration;
    const total = amount + totalProfit;

    return {
      daily,
      totalProfit,
      total,
    };
  }, [amount, plan]);

  const activate = () => {
    const startedAt = new Date();
    const maturesAt = new Date(Date.now() + plan.duration * 86400000);

    const activeInvestments = [
      ...(me.activeInvestments || []),
      {
        id: `inv${Date.now()}`,
        planId: plan.id,
        planName: plan.name,
        amount,
        daily: plan.daily,
        duration: plan.duration,
        startedAt: startedAt.toISOString(),
        maturesAt: maturesAt.toISOString(),
        status: "active" as const,
      },
    ];

    auth.update(me.id, {
      invested: me.invested + amount,
      balance: Math.max(0, me.balance - amount),
      activeInvestments,
    });

    store.addTxn({
      userId: me.id,
      userName: `${me.firstName} ${me.lastName}`,
      type: "investment",
      asset: "EUR",
      amount,
      status: "approved",
      note: `${plan.name} plan activated`,
    });

    setDone(true);
  };

  if (done) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-5" />

        <h1 className="text-3xl font-semibold text-white">
          Investment activated
        </h1>

        <p className="mt-3 text-white/65">
          Your {plan.name} strategy is active. Target profit accrues live in
          your dashboard. Returns are not guaranteed and capital remains at
          risk.
        </p>

        <Link
          to="/dashboard"
          className="mt-7 inline-flex px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold"
        >
          View dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
        Investment activation
      </div>

      <h1 className="text-4xl font-semibold text-white">
        Start an investment plan
      </h1>

      <p className="mt-3 text-white/60">
        Choose a plan, confirm the amount, review the risk disclosure and
        activate your strategy.
      </p>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-line rounded-2xl p-6">
          <label className="text-xs text-white/60">
            Select plan
          </label>

          <div className="mt-2 grid grid-cols-3 gap-2">
            {CONFIG.plans.map((item, itemIndex) => (
              <button
                key={item.id}
                onClick={() => {
                  setIndex(itemIndex);
                  setAmount(item.minimum);
                }}
                className={`py-2 rounded-md text-xs border ${
                  index === itemIndex
                    ? "border-emerald-400/40 bg-emerald-400/10 text-white"
                    : "border-line text-white/60"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <label className="text-xs text-white/60 mt-6 block">
            Amount:{" "}
            <span className="text-white font-semibold">
              €{amount.toLocaleString()}
            </span>
          </label>

          <input
            type="range"
            min={plan.minimum}
            max={plan.maximum}
            step={Math.max(50, Math.round(plan.minimum / 10))}
            value={amount}
            onChange={event => setAmount(Number(event.target.value))}
            className="w-full mt-3 accent-emerald-400"
          />

          <input
            type="number"
            value={amount}
            onChange={event => setAmount(Number(event.target.value))}
            className="mt-3 w-full bg-bg border border-line rounded-md px-3 py-2.5 text-sm"
          />

          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="bg-bg/60 border border-line rounded-md p-3">
              <div className="text-white/40">
                Minimum
              </div>

              <div className="text-white font-semibold mt-1">
                €{plan.minimum.toLocaleString()}
              </div>
            </div>

            <div className="bg-bg/60 border border-line rounded-md p-3">
              <div className="text-white/40">
                Maximum
              </div>

              <div className="text-white font-semibold mt-1">
                €{plan.maximum.toLocaleString()}
              </div>
            </div>

            <div className="bg-bg/60 border border-line rounded-md p-3">
              <div className="text-white/40">
                Duration
              </div>

              <div className="text-white font-semibold mt-1">
                {plan.duration} days
              </div>
            </div>

            <div className="bg-bg/60 border border-line rounded-md p-3">
              <div className="text-white/40">
                Referral
              </div>

              <div className="text-white font-semibold mt-1">
                {plan.referral}%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-line rounded-2xl p-6">
          <div className="flex items-center gap-2 text-emerald-400 text-xs mb-4">
            <TrendingUp className="w-4 h-4" />
            {plan.name} plan projection
          </div>

          <div className="space-y-3 text-sm">
            {[
              {
                label: "Daily target profit",
                value: calc.daily,
              },
              {
                label: `Target profit after ${plan.duration} days`,
                value: calc.totalProfit,
              },
              {
                label: "Projected total payout",
                value: calc.total,
              },
            ].map(row => (
              <div
                key={row.label}
                className="flex justify-between border-b border-line/50 pb-3"
              >
                <span className="text-white/60">
                  {row.label}
                </span>

                <span className="text-white font-semibold">
                  €{row.value.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-md border border-line bg-bg/60 p-4 text-xs text-white/55 flex gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            Target yields are not guaranteed. Digital asset investment products
            carry risk, including possible loss of principal.
          </div>

          <button
            onClick={activate}
            className="mt-5 w-full py-3 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold inline-flex items-center justify-center gap-2"
          >
            Confirm and activate
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
        }
