import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CONFIG } from "../config";

function curve(daily: number, duration: number, seed: number) {
  let value = 100;

  return Array.from({ length: duration + 1 }, (_, index) => {
    if (index > 0) {
      value += daily + Math.sin(index / 2 + seed) * 0.7;
    }

    return {
      d: `D${index}`,
      v: Number(value.toFixed(2)),
    };
  });
}

export default function PlanPerformance() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
          Plan performance
        </div>

        <h2 className="text-3xl font-semibold text-white">
          Compare the projected growth curve.
        </h2>

        <p className="mt-3 text-white/60">
          Visual model based on target daily rates. For transparency, returns
          remain projections and are not guaranteed.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {CONFIG.plans.map((plan, index) => (
          <div
            key={plan.name}
            className="bg-card border border-line rounded-2xl p-5"
          >
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-white font-semibold">
                {plan.name}
              </h3>

              <span className="text-emerald-400 text-sm">
                {plan.daily}% daily
              </span>
            </div>

            <div className="h-48">
              <ResponsiveContainer>
                <AreaChart data={curve(plan.daily, plan.duration, index)}>
                  <defs>
                    <linearGradient
                      id={`plan-performance-${index}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#f5c542"
                        stopOpacity={0.45}
                      />

                      <stop
                        offset="100%"
                        stopColor="#f5c542"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="d"
                    tick={{ fontSize: 9, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{ fontSize: 9, fill: "#6b7280" }}
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

                  <Area
                    dataKey="v"
                    type="monotone"
                    stroke="#f5c542"
                    strokeWidth={2}
                    fill={`url(#plan-performance-${index})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
            }
