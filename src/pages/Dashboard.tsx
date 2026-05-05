import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  BarChart3,
  Shield,
  Bell,
  Copy,
  CheckCircle2,
  LogOut,
  Gift,
  FileText,
  Settings as SettingsIcon,
} from "lucide-react";

import { generateStatement } from "../utils/pdf";
import InvestorAnalytics from "../components/InvestorAnalytics";
import LiveBalanceTicker from "../components/LiveBalanceTicker";
import DashboardNewsWidget from "../components/DashboardNewsWidget";
import ConnectWallet from "../components/ConnectWallet";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import { auth } from "../data/auth";
import { useState } from "react";

const balanceHistory = Array.from({ length: 30 }, (_, index) => ({
  d: `D${index + 1}`,
  v: 8000 + index * 240 + Math.sin(index / 3) * 300,
}));

export default function Dashboard() {
  const me = auth.current();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (!me) return <Navigate to="/login" replace />;

  const refLink = `${window.location.origin}${window.location.pathname}#/register?ref=${me.referralCode}`;

  const copy = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  const logout = () => {
    auth.logout();
    navigate("/");
  };

  const downloadStatement = () => {
    const today = new Date().toISOString().slice(0, 10);
    const fromDate = new Date(me.joined).toISOString().slice(0, 10);

    generateStatement({
      client: {
        name: `${me.firstName} ${me.lastName}`,
        email: me.email,
        country: me.country,
        accountId: me.id.toUpperCase(),
      },
      period: {
        from: fromDate,
        to: today,
      },
      balance: {
        opening: 0,
        closing: me.balance,
      },
      deposits: me.invested,
      withdrawals: 0,
      profits: me.totalProfit,
      referrals: me.referralEarnings,
      transactions: [
        {
          date: fromDate,
          type: "Account opened",
          asset: "—",
          amount: 0,
          status: "Completed",
        },
      ],
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs text-emerald-400">
            Welcome back
          </div>

          <h1 className="text-3xl font-semibold text-white">
            {me.firstName} {me.lastName}
          </h1>

          <div className="mt-1 text-sm text-white/50 flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            {me.kyc === "verified" ? "KYC verified" : "KYC pending"} ·{" "}
            {me.twoFA ? "2FA active" : "2FA recommended"}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/deposit"
            className="px-4 py-2 rounded-md border border-line text-white text-sm hover:bg-white/5 inline-flex items-center gap-2"
          >
            <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
            Deposit
          </Link>

          <Link
            to="/withdraw"
            className="px-4 py-2 rounded-md border border-line text-white text-sm hover:bg-white/5 inline-flex items-center gap-2"
          >
            <ArrowUpRight className="w-4 h-4 text-rose-400" />
            Withdraw
          </Link>

          <Link
            to="/invest"
            className="px-4 py-2 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg text-sm font-semibold"
          >
            New investment
          </Link>

          <button
            onClick={downloadStatement}
            className="px-3 py-2 rounded-md border border-line text-white/70 hover:text-white hover:bg-white/5 inline-flex items-center gap-1.5 text-sm"
            title="Download account statement"
          >
            <FileText className="w-4 h-4" />
            Statement
          </button>

          <Link
            to="/settings"
            className="px-3 py-2 rounded-md border border-line text-white/60 hover:text-white hover:bg-white/5 inline-flex items-center gap-1.5"
            title="Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </Link>

          <button
            onClick={logout}
            className="px-3 py-2 rounded-md border border-line text-white/60 hover:text-white hover:bg-white/5 inline-flex items-center gap-1.5"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {me.kyc !== "verified" && (
        <div className="bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-400/30 rounded-xl p-5 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-white font-semibold">
              Complete your KYC verification
            </div>

            <div className="text-sm text-white/70 mt-1">
              Required to deposit and withdraw. Takes only 5 minutes.
            </div>
          </div>

          <Link
            to="/kyc"
            className="shrink-0 px-4 py-2 rounded-md bg-amber-400 text-bg font-medium text-sm"
          >
            Verify identity →
          </Link>
        </div>
      )}

      {!me.twoFA && (
        <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-400/30 rounded-xl p-5 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-white font-semibold">
              Enable two-factor authentication
            </div>

            <div className="text-sm text-white/70 mt-1">
              Strongly recommended before making your first deposit. Takes 60
              seconds.
            </div>
          </div>

          <Link
            to="/settings"
            className="shrink-0 px-4 py-2 rounded-md bg-blue-400 text-bg font-medium text-sm"
          >
            Enable 2FA →
          </Link>
        </div>
      )}

      {me.balance === 0 && me.kyc === "verified" && (
        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-400/20 rounded-xl p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-white font-semibold">
              Welcome to NordVault, {me.firstName}.
            </div>

            <div className="text-sm text-white/70 mt-1">
              Make your first deposit to start investing. Minimum €500.
            </div>
          </div>

          <Link
            to="/deposit"
            className="shrink-0 px-4 py-2 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-medium text-sm"
          >
            Deposit now →
          </Link>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total balance",
            value: <LiveBalanceTicker user={me} />,
            sub: "Live including accrued profit",
            icon: Wallet,
          },
          {
            label: "Active investment",
            value: `€${me.invested.toLocaleString()}`,
            sub: "Across all plans",
            icon: TrendingUp,
          },
          {
            label: "Lifetime profit",
            value: `€${me.totalProfit.toLocaleString()}`,
            sub: `Since ${new Date(me.joined).toLocaleDateString("en-GB")}`,
            icon: BarChart3,
          },
          {
            label: "Referral earnings",
            value: `€${me.referralEarnings.toLocaleString()}`,
            sub: `Code: ${me.referralCode}`,
            icon: Gift,
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
              {item.value}
            </div>

            <div className="mt-1 text-xs text-white/50">
              {item.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-card border border-line rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">
              Portfolio performance
            </h2>

            <div className="flex gap-1">
              {["7D", "1M", "3M", "1Y"].map((period, index) => (
                <button
                  key={period}
                  className={`text-xs px-2.5 py-1 rounded ${
                    index === 1
                      ? "bg-emerald-400/20 text-emerald-300"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceHistory}>
                <defs>
                  <linearGradient
                    id="dashboardGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#f5c542"
                      stopOpacity={0.4}
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
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#f5c542"
                  strokeWidth={2}
                  fill="url(#dashboardGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-line rounded-xl p-5">
          <h2 className="text-white font-semibold mb-3">
            Refer & earn
          </h2>

          <p className="text-xs text-white/60 mb-3">
            Share your link and earn referral commissions from deposits your
            referrals make.
          </p>

          <div className="flex bg-bg border border-line rounded-md overflow-hidden mb-4">
            <input
              readOnly
              value={refLink}
              className="flex-1 px-3 py-2 bg-transparent text-[11px] text-white font-mono focus:outline-none"
            />

            <button
              onClick={copy}
              className="px-3 border-l border-line text-white/60 hover:text-white"
            >
              {copied ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          <h3 className="text-white font-semibold mt-5 mb-3 text-sm">
            Daily profit (7 days)
          </h3>

          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[0, 0, 0, 0, 0, 0, 0].map((value, index) => ({
                  d: `D${index + 1}`,
                  v: value,
                }))}
              >
                <Bar dataKey="v" fill="#f5c542" radius={[4, 4, 0, 0]} />

                <XAxis
                  dataKey="d"
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
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-3 grid lg:grid-cols-2 gap-5">
          <ConnectWallet />
          <DashboardNewsWidget />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            Performance & forecast
          </h2>

          <Bell className="w-4 h-4 text-white/40" />
        </div>

        <InvestorAnalytics user={me} />
      </div>
    </div>
  );
      }
