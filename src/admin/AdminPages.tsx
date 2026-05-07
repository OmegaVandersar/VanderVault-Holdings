import { useState } from "react";
import {
  Users as UsersIcon,
  Wallet,
  ArrowUpFromLine,
  TrendingUp,
  Mail as MailIcon,
  CheckCircle2,
  XCircle,
  PauseCircle,
  Trash2,
  Search,
  Reply,
  AlertTriangle,
  Eye,
  ShieldCheck,
  Save,
  RefreshCw,
  Copy,
} from "lucide-react";

import {
  store,
  User,
  Transaction,
  Message,
  ADMIN_CREDENTIALS,
} from "../data/store";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

import { audit } from "../data/audit";

const fmt = (number: number) =>
  "€" + number.toLocaleString(undefined, { maximumFractionDigits: 2 });

const dt = (date: string) =>
  new Date(date).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

function useStore() {
  const [, force] = useState(0);
  const refresh = () => force(value => value + 1);

  return { refresh };
}

export function AdminOverview() {
  const users = store.getUsers();
  const transactions = store.getTxns();
  const messages = store.getMsgs();

  const totalAUM = users.reduce((sum, user) => sum + user.balance, 0);

  const pendingWithdrawals = transactions.filter(
    transaction =>
      transaction.type === "withdrawal" && transaction.status === "pending"
  );

  const deposits = transactions
    .filter(transaction => transaction.type === "deposit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const chart = Array.from({ length: 14 }, (_, index) => ({
    d: `D${index + 1}`,
    v: 80000 + index * 4500 + Math.sin(index) * 3000,
  }));

  const bars = [
    { d: "Mon", v: 14 },
    { d: "Tue", v: 22 },
    { d: "Wed", v: 18 },
    { d: "Thu", v: 27 },
    { d: "Fri", v: 31 },
    { d: "Sat", v: 12 },
    { d: "Sun", v: 9 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">
        Overview
      </h1>

      <p className="text-sm text-white/50 mt-1">
        Real-time platform metrics and pending actions.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          {
            label: "Total AUM",
            value: fmt(totalAUM),
            icon: Wallet,
            sub: "+€2.4k today",
          },
          {
            label: "Verified users",
            value: users.filter(user => user.kyc === "verified").length,
            icon: UsersIcon,
            sub: `${users.length} total`,
          },
          {
            label: "Pending withdrawals",
            value: pendingWithdrawals.length,
            icon: ArrowUpFromLine,
            sub: fmt(pendingWithdrawals.reduce((sum, item) => sum + item.amount, 0)),
            urgent: pendingWithdrawals.length > 0,
          },
          {
            label: "Total deposits",
            value: fmt(deposits),
            icon: TrendingUp,
            sub: "All time",
          },
        ].map(item => (
          <div
            key={item.label}
            className={`bg-card border ${
              item.urgent ? "border-rose-400/40" : "border-line"
            } rounded-xl p-5`}
          >
            <div className="flex items-start justify-between">
              <div className="text-xs text-white/50">
                {item.label}
              </div>

              <item.icon
                className={`w-4 h-4 ${
                  item.urgent ? "text-rose-400" : "text-emerald-400"
                }`}
              />
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

      {pendingWithdrawals.length > 0 && (
        <div className="mt-5 bg-rose-500/5 border border-rose-400/30 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />

          <div className="flex-1 text-sm text-white/80">
            <strong className="text-white">
              {pendingWithdrawals.length} withdrawal
              {pendingWithdrawals.length > 1 ? "s" : ""}
            </strong>{" "}
            awaiting approval. Total:{" "}
            <strong className="text-white">
              {fmt(pendingWithdrawals.reduce((sum, item) => sum + item.amount, 0))}
            </strong>
            .
          </div>

          <a
            href="#/admin/withdrawals"
            className="text-xs px-3 py-1.5 rounded-md bg-rose-400 text-bg font-medium"
          >
            Review now
          </a>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <div className="lg:col-span-2 bg-card border border-line rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">
            AUM growth
          </h2>

          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={chart}>
                <defs>
                  <linearGradient id="adminAum" x1="0" y1="0" x2="0" y2="1">
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
                  fill="url(#adminAum)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-line rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">
            New signups
          </h2>

          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={bars}>
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
      </div>

      <div className="bg-card border border-line rounded-xl p-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold">
            Latest activity
          </h2>

          <span className="text-xs text-white/40">
            Live
          </span>
        </div>

        <div className="divide-y divide-line/50">
          {transactions.slice(0, 6).map(transaction => (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-2.5 text-sm"
            >
              <div>
                <div className="text-white">
                  {transaction.userName} —{" "}
                  <span className="capitalize text-white/60">
                    {transaction.type}
                  </span>
                </div>

                <div className="text-xs text-white/40">
                  {dt(transaction.date)}
                </div>
              </div>

              <div className="text-right">
                <div className="text-white font-medium">
                  {fmt(transaction.amount)} {transaction.asset}
                </div>

                <span
                  className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${
                    transaction.status === "completed" ||
                    transaction.status === "approved"
                      ? "bg-emerald-400/15 text-emerald-300"
                      : transaction.status === "pending"
                        ? "bg-amber-400/15 text-amber-300"
                        : "bg-rose-400/15 text-rose-300"
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 text-xs text-white/40">
        Unread messages: {messages.filter(message => !message.read).length} ·
        Suspended users: {users.filter(user => user.status === "suspended").length}
      </div>
    </div>
  );
}

export function AdminUsers() {
  const { refresh } = useStore();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<
    "all" | "active" | "suspended" | "pending"
  >("all");

  const users = store.getUsers().filter(
    user =>
      (filter === "all" || user.status === filter) &&
      (user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.country.toLowerCase().includes(query.toLowerCase()))
  );

  const act = (id: string, patch: Partial<User>) => {
    store.updateUser(id, patch);
    audit.log({
      actor: "Administrator",
      action: "Update user",
      target: id,
      details: JSON.stringify(patch),
    });
    refresh();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">
        Users
      </h1>

      <p className="text-sm text-white/50 mt-1">
        Manage client accounts, KYC, status and balances.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />

          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search users..."
            className="w-full pl-9 pr-3 py-2.5 bg-card border border-line rounded-md text-sm focus:outline-none focus:border-emerald-400/40"
          />
        </div>

        <div className="flex gap-1.5 text-xs">
          {(["all", "active", "pending", "suspended"] as const).map(item => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-3 py-2 rounded-md capitalize ${
                filter === item
                  ? "bg-emerald-400/15 text-emerald-300 border border-emerald-400/30"
                  : "bg-card border border-line text-white/60 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-x-auto bg-card border border-line rounded-xl">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wider text-white/50">
              <th className="text-left py-3.5 px-5">User</th>
              <th className="text-left py-3.5 px-5">Country</th>
              <th className="text-left py-3.5 px-5">KYC</th>
              <th className="text-left py-3.5 px-5">Status</th>
              <th className="text-right py-3.5 px-5">Balance</th>
              <th className="text-right py-3.5 px-5">Joined</th>
              <th className="text-right py-3.5 px-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr
                key={user.id}
                className="border-b border-line/50 last:border-0"
              >
                <td className="py-3 px-5">
                  <div className="text-white font-medium">
                    {user.name}
                  </div>

                  <div className="text-xs text-white/40">
                    {user.email}
                  </div>
                </td>

                <td className="py-3 px-5 text-white/70">
                  {user.country}
                </td>

                <td className="py-3 px-5">
                  <span
                    className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${
                      user.kyc === "verified"
                        ? "bg-emerald-400/15 text-emerald-300"
                        : user.kyc === "pending"
                          ? "bg-amber-400/15 text-amber-300"
                          : "bg-rose-400/15 text-rose-300"
                    }`}
                  >
                    {user.kyc}
                  </span>
                </td>

                <td className="py-3 px-5">
                  <span
                    className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${
                      user.status === "active"
                        ? "bg-emerald-400/15 text-emerald-300"
                        : user.status === "pending"
                          ? "bg-amber-400/15 text-amber-300"
                          : "bg-rose-400/15 text-rose-300"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="py-3 px-5 text-right text-white font-medium">
                  {fmt(user.balance)}
                </td>

                <td className="py-3 px-5 text-right text-white/60 text-xs">
                  {user.joined}
                </td>

                <td className="py-3 px-5 text-right">
                  <div className="inline-flex gap-1.5">
                    {user.kyc !== "verified" && (
                      <button
                        onClick={() =>
                          act(user.id, {
                            kyc: "verified",
                            status: "active",
                          })
                        }
                        title="Approve KYC"
                        className="p-1.5 rounded hover:bg-emerald-400/10 text-emerald-400"
                      >
                        <ShieldCheck className="w-4 h-4" />
                      </button>
                    )}

                    {user.status === "active" ? (
                      <button
                        onClick={() =>
                          act(user.id, {
                            status: "suspended",
                          })
                        }
                        title="Suspend"
                        className="p-1.5 rounded hover:bg-amber-400/10 text-amber-400"
                      >
                        <PauseCircle className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          act(user.id, {
                            status: "active",
                          })
                        }
                        title="Reactivate"
                        className="p-1.5 rounded hover:bg-emerald-400/10 text-emerald-400"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (confirm("Delete user permanently?")) {
                          store.deleteUser(user.id);
                          audit.log({
                            actor: "Administrator",
                            action: "Delete user",
                            target: user.id,
                          });
                          refresh();
                        }
                      }}
                      title="Delete"
                      className="p-1.5 rounded hover:bg-rose-400/10 text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="p-10 text-center text-white/40 text-sm">
            No users match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
