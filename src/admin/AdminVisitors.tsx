import { useMemo, useState } from "react";
import {
  Globe2,
  Smartphone,
  Monitor,
  Tablet,
  Eye,
  Clock,
  MapPin,
  Search,
  Trash2,
  Download,
  RefreshCw,
} from "lucide-react";

import { analytics, Visit } from "../data/analytics";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#f5c542",
  "#b8860b",
  "#fff4bd",
  "#8a6a12",
  "#fb7185",
  "#22d3ee",
];

const dt = (date: string) =>
  new Date(date).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const ago = (date: string) => {
  const minutes = (Date.now() - +new Date(date)) / 60000;

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${Math.round(minutes)}m ago`;
  if (minutes < 1440) return `${Math.round(minutes / 60)}h ago`;

  return `${Math.round(minutes / 1440)}d ago`;
};

export default function AdminVisitors() {
  const [, force] = useState(0);

  const [query, setQuery] = useState("");
  const [device, setDevice] = useState<
    "all" | "Desktop" | "Mobile" | "Tablet"
  >("all");

  const [selected, setSelected] = useState<Visit | null>(null);

  const all = analytics.all();

  const filtered = useMemo(
    () =>
      all.filter(
        visit =>
          (device === "all" || visit.device === device) &&
          (query === "" ||
            visit.country?.toLowerCase().includes(query.toLowerCase()) ||
            visit.city?.toLowerCase().includes(query.toLowerCase()) ||
            visit.ip?.includes(query) ||
            visit.browser.toLowerCase().includes(query.toLowerCase()) ||
            visit.os.toLowerCase().includes(query.toLowerCase()))
      ),
    [all, query, device]
  );

  const total = all.length;

  const last24h = all.filter(
    visit => Date.now() - +new Date(visit.timestamp) < 86400000
  ).length;

  const uniqueCountries = new Set(
    all.map(visit => visit.country).filter(Boolean)
  ).size;

  const totalPageviews = all.reduce(
    (sum, visit) => sum + visit.pages.length,
    0
  );

  const deviceData = ["Desktop", "Mobile", "Tablet"]
    .map(item => ({
      name: item,
      value: all.filter(visit => visit.device === item).length,
    }))
    .filter(item => item.value > 0);

  const browserCounts: Record<string, number> = {};

  all.forEach(visit => {
    browserCounts[visit.browser] = (browserCounts[visit.browser] || 0) + 1;
  });

  const browserData = Object.entries(browserCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const countryCounts: Record<
    string,
    {
      count: number;
      flag: string;
      code: string;
    }
  > = {};

  all.forEach(visit => {
    if (!visit.country) return;

    const key = visit.country;

    if (!countryCounts[key]) {
      countryCounts[key] = {
        count: 0,
        flag: getFlag(visit.countryCode),
        code: visit.countryCode || "",
      };
    }

    countryCounts[key].count += 1;
  });

  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 8);

  const hourly = Array.from({ length: 24 }, (_, hour) => {
    const hourAgo = 23 - hour;
    const start = Date.now() - (hourAgo + 1) * 3600000;
    const end = Date.now() - hourAgo * 3600000;

    const count = all.filter(visit => {
      const time = +new Date(visit.timestamp);
      return time >= start && time < end;
    }).length;

    return {
      h: `${new Date(end - 1800000).getHours()}h`,
      count,
    };
  });

  const exportCSV = () => {
    const rows = [
      [
        "Time",
        "IP",
        "Country",
        "City",
        "Device",
        "OS",
        "Browser",
        "Screen",
        "Language",
        "Referrer",
        "Landing",
        "Pages",
      ],
      ...all.map(visit => [
        visit.timestamp,
        visit.ip || "",
        visit.country || "",
        visit.city || "",
        visit.device,
        visit.os,
        `${visit.browser} ${visit.browserVersion}`,
        visit.screen,
        visit.language,
        visit.referrer,
        visit.landingPage,
        visit.pages.length.toString(),
      ]),
    ];

    const csv = rows
      .map(row =>
        row
          .map(value => `"${(value || "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `nordvault-visitors-${Date.now()}.csv`;
    anchor.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Visitor Analytics
          </h1>

          <p className="text-sm text-white/50 mt-1">
            Live tracking of every visitor: IP, device, browser, location and
            pages viewed.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => force(value => value + 1)}
            className="px-3 py-2 rounded-md border border-line text-white text-sm hover:bg-white/5 inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>

          <button
            onClick={exportCSV}
            className="px-3 py-2 rounded-md border border-line text-white text-sm hover:bg-white/5 inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total visitors",
            value: total,
            icon: Eye,
          },
          {
            label: "Last 24 hours",
            value: last24h,
            icon: Clock,
          },
          {
            label: "Countries",
            value: uniqueCountries,
            icon: Globe2,
          },
          {
            label: "Pageviews",
            value: totalPageviews,
            icon: MapPin,
          },
        ].map(item => (
          <div
            key={item.label}
            className="bg-card border border-line rounded-xl p-5"
          >
            <div className="flex items-start justify-between">
              <div className="text-xs text-white/50">
                {item.label}
              </div>

              <item.icon className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="mt-2 text-2xl font-semibold text-white">
              {item.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2 bg-card border border-line rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">
            Traffic — last 24 hours
          </h2>

          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={hourly}>
                <Bar dataKey="count" fill="#f5c542" radius={[3, 3, 0, 0]} />

                <XAxis
                  dataKey="h"
                  tick={{ fontSize: 9, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                  interval={2}
                />

                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{
                    background: "#120f08",
                    border: "1px solid #2b2414",
                    borderRadius: 8,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-line rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">
            Device split
          </h2>

          <div className="h-40">
            {deviceData.length > 0 ? (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={deviceData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={60}
                  >
                    {deviceData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      background: "#120f08",
                      border: "1px solid #2b2414",
                      borderRadius: 8,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full grid place-items-center text-white/30 text-sm">
                No data yet
              </div>
            )}
          </div>

          <div className="mt-3 space-y-1.5 text-xs">
            {deviceData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded"
                    style={{
                      background: COLORS[index],
                    }}
                  />

                  <span className="text-white/70">
                    {item.name}
                  </span>
                </div>

                <span className="text-white">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
            <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <div className="bg-card border border-line rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">
            Top countries
          </h2>

          {topCountries.length === 0 ? (
            <div className="text-white/30 text-sm">
              No data yet. Visit the public site to populate analytics.
            </div>
          ) : (
            <div className="space-y-2.5">
              {topCountries.map(([name, info]) => {
                const percent = (info.count / total) * 100;

                return (
                  <div key={name}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base">
                          {info.flag}
                        </span>

                        <span className="text-white">
                          {name}
                        </span>
                      </div>

                      <span className="text-white/60 text-xs">
                        {info.count} ({percent.toFixed(0)}%)
                      </span>
                    </div>

                    <div className="h-1.5 bg-white/5 rounded-full">
                      <div
                        className="h-full bg-emerald-400 rounded-full"
                        style={{
                          width: `${percent}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-card border border-line rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">
            Browsers
          </h2>

          {browserData.length === 0 ? (
            <div className="text-white/30 text-sm">
              No data yet.
            </div>
          ) : (
            <div className="space-y-2.5">
              {browserData
                .sort((a, b) => b.value - a.value)
                .map((browser, index) => {
                  const percent = (browser.value / total) * 100;

                  return (
                    <div key={browser.name}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-white">
                          {browser.name}
                        </span>

                        <span className="text-white/60 text-xs">
                          {browser.value} ({percent.toFixed(0)}%)
                        </span>
                      </div>

                      <div className="h-1.5 bg-white/5 rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${percent}%`,
                            background: COLORS[index % COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />

          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search by country, city, IP, browser..."
            className="w-full pl-9 pr-3 py-2.5 bg-card border border-line rounded-md text-sm focus:outline-none focus:border-emerald-400/40"
          />
        </div>

        <div className="flex gap-1.5 text-xs">
          {(["all", "Desktop", "Mobile", "Tablet"] as const).map(item => (
            <button
              key={item}
              onClick={() => setDevice(item)}
              className={`px-3 py-2 rounded-md ${
                device === item
                  ? "bg-emerald-400/15 text-emerald-300 border border-emerald-400/30"
                  : "bg-card border border-line text-white/60 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            if (confirm("Clear all visitor data?")) {
              analytics.clear();
              force(value => value + 1);
            }
          }}
          className="px-3 py-2 rounded-md border border-line text-rose-400 text-sm hover:bg-rose-400/5 inline-flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto bg-card border border-line rounded-xl">
        <table className="w-full text-sm min-w-[1000px]">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wider text-white/50">
              <th className="text-left py-3.5 px-5">When</th>
              <th className="text-left py-3.5 px-5">Location</th>
              <th className="text-left py-3.5 px-5">IP</th>
              <th className="text-left py-3.5 px-5">Device</th>
              <th className="text-left py-3.5 px-5">Browser / OS</th>
              <th className="text-left py-3.5 px-5">Landing</th>
              <th className="text-right py-3.5 px-5">Pages</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filtered.slice(0, 100).map(visit => (
              <tr
                key={visit.id}
                className="border-b border-line/50 last:border-0 hover:bg-white/[0.02]"
              >
                <td className="py-3 px-5">
                  <div className="text-white text-xs">
                    {ago(visit.timestamp)}
                  </div>

                  <div className="text-[10px] text-white/40">
                    {dt(visit.timestamp)}
                  </div>
                </td>

                <td className="py-3 px-5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">
                      {getFlag(visit.countryCode)}
                    </span>

                    <div>
                      <div className="text-white text-xs">
                        {visit.city || "—"}
                      </div>

                      <div className="text-[10px] text-white/40">
                        {visit.country || "Unknown"}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-5 text-white/60 font-mono text-xs">
                  {visit.ip || "—"}
                </td>

                <td className="py-3 px-5">
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/80">
                    <DeviceIcon device={visit.device} />
                    {visit.device}
                  </span>

                  <div className="text-[10px] text-white/40 mt-0.5">
                    {visit.screen}
                  </div>
                </td>

                <td className="py-3 px-5">
                  <div className="text-white text-xs">
                    {visit.browser} {visit.browserVersion?.split(".")[0]}
                  </div>

                  <div className="text-[10px] text-white/40">
                    {visit.os}
                  </div>
                </td>

                <td className="py-3 px-5 text-white/70 font-mono text-[11px]">
                  {visit.landingPage}
                </td>

                <td className="py-3 px-5 text-right text-white">
                  {visit.pages.length}
                </td>

                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => setSelected(visit)}
                    className="p-1.5 rounded hover:bg-white/5 text-white/60"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <Eye className="w-10 h-10 text-white/20 mx-auto mb-3" />

            <div className="text-white/50 text-sm">
              No visitors recorded yet.
            </div>

            <div className="text-white/30 text-xs mt-1">
              Open the public site in a new tab to start tracking.
            </div>
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card border border-line rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto"
            onClick={event => event.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="text-xs text-emerald-400">
                  Visitor session
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {selected.id}
                </h3>
              </div>

              <span className="text-2xl">
                {getFlag(selected.countryCode)}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {[
                ["Timestamp", dt(selected.timestamp)],
                ["IP address", selected.ip || "—"],
                ["Country", selected.country || "—"],
                ["City", selected.city || "—"],
                ["Region", selected.region || "—"],
                ["ISP / Org", selected.isp || "—"],
                ["Timezone", selected.timezone || "—"],
                ["Device", selected.device],
                ["OS", selected.os],
                ["Browser", `${selected.browser} ${selected.browserVersion}`],
                ["Screen", selected.screen],
                ["Language", selected.language],
                ["Referrer", selected.referrer],
                ["Landing page", selected.landingPage],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-bg/60 border border-line rounded-md p-2.5"
                >
                  <div className="text-[10px] uppercase text-white/50">
                    {label}
                  </div>

                  <div className="text-white text-xs mt-0.5 break-all">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt5">
              <div className="text-xs uppercase text-white/50 mb-2">
                Pages viewed ({selected.pages.length})
              </div>

              <div className="space-y-1.5">
                {selected.pages.map((page, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-bg/60 border border-line rounded-md px-3 py-2 text-xs"
                  >
                    <span className="text-white font-mono">
                      {page.path}
                    </span>

                    <span className="text-white/40">
                      {new Date(page.ts).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-xs uppercase text-white/50 mb-2">
                User Agent
              </div>

              <div className="bg-bg/60 border border-line rounded-md p-3 text-[10px] text-white/60 font-mono break-all">
                {selected.userAgent}
              </div>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-5 w-full py-2 text-sm border border-line text-white/70 rounded-md hover:bg-white/5"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DeviceIcon({ device }: { device: string }) {
  if (device === "Mobile") {
    return <Smartphone className="w-3.5 h-3.5 text-emerald-400" />;
  }

  if (device === "Tablet") {
    return <Tablet className="w-3.5 h-3.5 text-blue-400" />;
  }

  return <Monitor className="w-3.5 h-3.5 text-purple-400" />;
}

function getFlag(code?: string): string {
  if (!code || code.length !== 2) return "🌐";

  return String.fromCodePoint(
    ...code
      .toUpperCase()
      .split("")
      .map(char => 0x1f1e6 - 65 + char.charCodeAt(0))
  );
      }
