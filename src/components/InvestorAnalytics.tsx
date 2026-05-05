import { useMemo } from "react";
import {
  TrendingUp,
  Target,
  Zap,
  Award,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

import { Account } from "../data/auth";
import { CONFIG } from "../config";

const COLORS = ["#f5c542", "#b8860b", "#fff4bd", "#8a6a12", "#5c4509"];

export default function InvestorAnalytics({ user }: { user: Account }) {
  const data = useMemo(
    () => generate(user),
    [user.balance, user.invested, user.totalProfit]
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            l: "ROI to date",
            v: data.roi >= 0 ? `+${data.roi.toFixed(2)}%` : `${data.roi.toFixed(2)}%`,
            sub: "Annualised view",
            up: data.roi >= 0,
            i: TrendingUp,
          },
          {
            l: "Avg. daily yield",
            v: `${data.avgDaily.toFixed(2)}%`,
            sub: "Last 30 days",
            up: true,
            i: Zap,
          },
          {
            l: "Best day",
            v: `+€${data.bestDay.toLocaleString()}`,
            sub: "Single-day profit",
            up: true,
            i: Award,
          },
          {
            l: "Forecast (90d)",
            v: `€${data.forecast90d.toLocaleString()}`,
            sub: "Projected balance",
            up: true,
            i: Target,
          },
        ].map(item => (
          <div key={item.l} className="bg-card border border-line rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div className="text-[11px] text-white/50">{item.l}</div>
              <item.i className="w-3.5 h-3.5 text-emerald-400" />
            </div>

            <div className="mt-1.5 text-lg font-semibold text-white">
              {item.v}
            </div>

            <div className="text-[10px] text-white/40 mt-0.5">
              {item.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-line rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white font-semibold">
              Deposits vs profits over time
            </h2>

            <p className="text-xs text-white/50 mt-0.5">
              Cumulative view of invested capital and earnings
            </p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer>
            <AreaChart data={data.timeline}>
              <defs>
                <linearGradient id="depositsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#b8860b" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#b8860b" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="profitsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f5c542" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#f5c542" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="d"
                tick={{ fontSize: 10, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 10, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#120f08",
                  border: "1px solid #2b2414",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />

              <Legend wrapperStyle={{ fontSize: 11, color: "#9ca3af" }} />

              <Area
                type="monotone"
                name="Deposits"
                dataKey="deposits"
                stroke="#b8860b"
                fill="url(#depositsGradient)"
                strokeWidth={2}
              />

              <Area
                type="monotone"
                name="Profits"
                dataKey="profits"
                stroke="#f5c542"
                fill="url(#profitsGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-card border border-line rounded-xl p-5">
          <h2 className="text-white font-semibold">
            Daily P/L (last 14 days)
          </h2>

          <p className="text-xs text-white/50 mt-0.5 mb-4">
            Net profit credited each day
          </p>

          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={data.daily}>
                <XAxis
                  dataKey="d"
                  tick={{ fontSize: 9, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                  interval={1}
                />

                <YAxis
                  tick={{ fontSize: 10, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{
                    background: "#120f08",
                    border: "1px solid #2b2414",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />

                <Bar dataKey="v" radius={[3, 3, 0, 0]}>
                  {data.daily.map((item, index) => (
                    <Cell
                      key={index}
                      fill={item.v >= 0 ? "#f5c542" : "#fb7185"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-line rounded-xl p-5">
          <h2 className="text-white font-semibold">
            Asset allocation
          </h2>

          <p className="text-xs text-white/50 mt-0.5 mb-4">
            Current distribution by asset class
          </p>

          <div className="flex items-center gap-4">
            <div className="w-40 h-40">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data.allocation}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={2}
                  >
                    {data.allocation.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      background: "#120f08",
                      border: "1px solid #2b2414",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex-1 space-y-2">
              {data.allocation.map((asset, index) => (
                <div
                  key={asset.name}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded"
                      style={{ background: COLORS[index] }}
                    />
                    <span className="text-white">{asset.name}</span>
                  </div>

                  <span className="text-white/60">
                    {asset.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-line rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white font-semibold">
              Profit forecast — next 90 days
            </h2>

            <p className="text-xs text-white/50 mt-0.5">
              Projection assuming continuation of current strategy. Not a guarantee.
            </p>
          </div>

          <span className="text-xs text-amber-400 px-2 py-1 rounded bg-amber-400/10">
            Projection
          </span>
        </div>

        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={data.forecast}>
              <XAxis
                dataKey="d"
                tick={{ fontSize: 10, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 10, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#120f08",
                  border: "1px solid #2b2414",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />

              <Legend wrapperStyle={{ fontSize: 11, color: "#9ca3af" }} />

              <Line
                type="monotone"
                name="Conservative"
                dataKey="low"
                stroke="#fb7185"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />

              <Line
                type="monotone"
                name="Expected"
                dataKey="mid"
                stroke="#f5c542"
                strokeWidth={2.5}
                dot={false}
              />

              <Line
                type="monotone"
                name="Optimistic"
                dataKey="high"
                stroke="#b8860b"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-line rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">
          Your milestones
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {data.milestones.map(milestone => (
            <div
              key={milestone.t}
              className={`p-3 rounded-lg border text-center ${
                milestone.unlocked
                  ? "border-emerald-400/30 bg-emerald-400/5"
                  : "border-line bg-bg/40 opacity-50"
              }`}
            >
              <div className="text-2xl">{milestone.icon}</div>

              <div
                className={`mt-1 text-[11px] font-medium ${
                  milestone.unlocked ? "text-white" : "text-white/50"
                }`}
              >
                {milestone.t}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function generate(user: Account) {
  const totalIn = Math.max(user.invested, 1);
  const profit = user.totalProfit;

  const roi = user.invested > 0 ? (profit / user.invested) * 100 : 0;

  const avgDaily =
    roi > 0
      ? roi / Math.max(user.invested > 0 ? 30 : 1, 1)
      : CONFIG.plans[1].daily;

  const bestDay = Math.max(50, Math.round(profit / 14 * 1.6)) || 124;

  const timeline = Array.from({ length: 30 }, (_, index) => {
    const day = index + 1;
    const deposits = (totalIn / 30) * day;
    const profits = (profit / 30) * day * (1 + Math.sin(index / 5) * 0.1);

    return {
      d: `D${day}`,
      deposits: Math.round(deposits),
      profits: Math.round(profits),
    };
  });

  const daily = Array.from({ length: 14 }, (_, index) => {
    const base = profit / 14 || totalIn * 0.011;
    const value = Math.round(base * (0.85 + Math.sin(index) * 0.25));

    return {
      d: `D${index + 1}`,
      v: value,
    };
  });

  const dailyRate = avgDaily / 100 || 0.011;

  const forecast = Array.from({ length: 90 }, (_, index) => {
    const day = index + 1;
    const balance = user.balance || totalIn || 1000;

    return {
      d: `D${day}`,
      low: Math.round(balance * Math.pow(1 + dailyRate * 0.5, day)),
      mid: Math.round(balance * Math.pow(1 + dailyRate, day)),
      high: Math.round(balance * Math.pow(1 + dailyRate * 1.4, day)),
    };
  });

  const forecast90d = forecast[89]?.mid || 0;

  const allocation = [
    { name: "Bitcoin", value: 42 },
    { name: "Ethereum", value: 28 },
    { name: "USDT/USDC", value: 18 },
    { name: "Solana", value: 8 },
    { name: "Other", value: 4 },
  ];

  const milestones = [
    {
      t: "Account opened",
      icon: "🎉",
      unlocked: true,
    },
    {
      t: "KYC verified",
      icon: "✅",
      unlocked: user.kyc === "verified",
    },
    {
      t: "First deposit",
      icon: "💰",
      unlocked: user.invested > 0,
    },
    {
      t: "€1k profit",
      icon: "🚀",
      unlocked: profit >= 1000,
    },
    {
      t: "First referral",
      icon: "🤝",
      unlocked: user.referralEarnings > 0,
    },
    {
      t: "€10k milestone",
      icon: "🏆",
      unlocked: user.balance >= 10000,
    },
    {
      t: "100-day streak",
      icon: "🔥",
      unlocked: false,
    },
    {
      t: "Diamond affiliate",
      icon: "💎",
      unlocked: user.referralEarnings >= 250000,
    },
  ];

  return {
    roi,
    avgDaily,
    bestDay,
    forecast90d,
    timeline,
    daily,
    forecast,
    allocation,
    milestones,
  };
        }
