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
export function AdminWithdrawals() {
  const { refresh } = useStore();
  const [filter, setFilter] = useState<"pending" | "approved" | "denied" | "all">("pending");
  
  const list = store.getTxns().filter(
    t => t.type === "withdrawal" && (filter === "all" || t.status === filter)
  );

  const act = (id: string, status: Transaction["status"]) => {
    store.updateTxn(id, { status });
    refresh();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Withdrawal Terminal</h1>
      <div className="flex gap-2">
        {["pending", "approved", "denied", "all"].map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f as any)} 
            className={`px-4 py-2 rounded-lg text-xs uppercase font-bold transition-all ${
              filter === f ? 'bg-amber-500 text-black shadow-lg shadow-amber-900/20' : 'bg-white/5 text-white/50 hover:bg-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      
      <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/5 text-white/50 text-xs uppercase tracking-widest">
            <tr>
              <th className="p-4">Investor</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {list.map(t => (
              <tr key={t.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-white font-medium">{t.userName}</td>
                <td className="p-4 font-bold text-white uppercase">{t.asset} {fmt(t.amount)}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                    t.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {t.status === "pending" && (
                    <div className="flex justify-end gap-2">
                      <button onClick={() => act(t.id, "approved")} className="p-2 hover:bg-green-500/20 text-green-400 rounded-lg"><CheckCircle2 className="w-4 h-4" /></button>
                      <button onClick={() => act(t.id, "denied")} className="p-2 hover:bg-rose-500/20 text-rose-400 rounded-lg"><XCircle className="w-4 h-4" /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <div className="p-10 text-center text-white/40 text-sm">No pending withdrawal requests.</div>
        )}
      </div>
    </div>
  );
                }
export function AdminWithdrawals() {
  const { refresh } = useStore();

  const [filter, setFilter] = useState<
    "pending" | "approved" | "denied" | "suspended" | "all"
  >("pending");

  const [selected, setSelected] = useState<Transaction | null>(null);

  const list = store
    .getTxns()
    .filter(
      transaction =>
        transaction.type === "withdrawal" &&
        (filter === "all" || transaction.status === filter)
    );

  const act = (
    id: string,
    status: Transaction["status"],
    note?: string
  ) => {
    const before = store.getTxns().find(transaction => transaction.id === id);

    store.updateTxn(id, {
      status,
      ...(note ? { note } : {}),
    });

    audit.log({
      actor: "Administrator",
      action: `Withdrawal ${status}`,
      target: id,
      details: before
        ? `${before.userName} ${before.asset} €${before.amount}`
        : note,
    });

    setSelected(null);
    refresh();
  };

  const counts = {
    pending: store
      .getTxns()
      .filter(
        transaction =>
          transaction.type === "withdrawal" &&
          transaction.status === "pending"
      ).length,

    approved: store
      .getTxns()
      .filter(
        transaction =>
          transaction.type === "withdrawal" &&
          transaction.status === "approved"
      ).length,

    denied: store
      .getTxns()
      .filter(
        transaction =>
          transaction.type === "withdrawal" &&
          transaction.status === "denied"
      ).length,

    suspended: store
      .getTxns()
      .filter(
        transaction =>
          transaction.type === "withdrawal" &&
          transaction.status === "suspended"
      ).length,
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">
        Withdrawals
      </h1>

      <p className="text-sm text-white/50 mt-1">
        Approve, deny or suspend withdrawal requests from clients.
      </p>

      <div className="mt-6 flex gap-1.5 text-xs flex-wrap">
        {(["pending", "approved", "suspended", "denied", "all"] as const).map(
          item => (
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

              {item !== "all" && (
                <span className="ml-1 opacity-60">
                  ({counts[item as keyof typeof counts]})
                </span>
              )}
            </button>
          )
        )}
      </div>

      <div className="mt-5 overflow-x-auto bg-card border border-line rounded-xl">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wider text-white/50">
              <th className="text-left py-3.5 px-5">User</th>
              <th className="text-left py-3.5 px-5">Asset</th>
              <th className="text-right py-3.5 px-5">Amount</th>
              <th className="text-left py-3.5 px-5">Wallet</th>
              <th className="text-left py-3.5 px-5">Date</th>
              <th className="text-left py-3.5 px-5">Status</th>
              <th className="text-right py-3.5 px-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.map(transaction => (
              <tr
                key={transaction.id}
                className="border-b border-line/50 last:border-0 hover:bg-white/[0.02]"
              >
                <td className="py-3 px-5 text-white">
                  {transaction.userName}
                </td>

                <td className="py-3 px-5 text-white/80">
                  {transaction.asset}
                </td>

                <td className="py-3 px-5 text-right text-white font-medium">
                  {fmt(transaction.amount)}
                </td>

                <td className="py-3 px-5 text-white/50 font-mono text-xs">
                  {transaction.walletAddress
                    ? `${transaction.walletAddress.slice(0, 14)}...${transaction.walletAddress.slice(-6)}`
                    : "—"}
                </td>

                <td className="py-3 px-5 text-white/60 text-xs">
                  {dt(transaction.date)}
                </td>

                <td className="py-3 px-5">
                  <span
                    className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${
                      transaction.status === "approved"
                        ? "bg-emerald-400/15 text-emerald-300"
                        : transaction.status === "pending"
                          ? "bg-amber-400/15 text-amber-300"
                          : transaction.status === "suspended"
                            ? "bg-blue-400/15 text-blue-300"
                            : "bg-rose-400/15 text-rose-300"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>

                <td className="py-3 px-5 text-right">
                  <div className="inline-flex gap-1">
                    <button
                      onClick={() => setSelected(transaction)}
                      title="View"
                      className="p-1.5 rounded hover:bg-white/5 text-white/60"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {transaction.status === "pending" && (
                      <>
                        <button
                          onClick={() => act(transaction.id, "approved")}
                          title="Approve"
                          className="p-1.5 rounded hover:bg-emerald-400/10 text-emerald-400"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() =>
                            act(
                              transaction.id,
                              "suspended",
                              "Suspended for compliance review"
                            )
                          }
                          title="Suspend"
                          className="p-1.5 rounded hover:bg-blue-400/10 text-blue-400"
                        >
                          <PauseCircle className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            const reason = prompt("Reason for denial?");

                            if (reason) {
                              act(transaction.id, "denied", reason);
                            }
                          }}
                          title="Deny"
                          className="p-1.5 rounded hover:bg-rose-400/10 text-rose-400"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {transaction.status === "suspended" && (
                      <>
                        <button
                          onClick={() => act(transaction.id, "approved")}
                          title="Approve"
                          className="p-1.5 rounded hover:bg-emerald-400/10 text-emerald-400"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() =>
                            act(
                              transaction.id,
                              "denied",
                              "Denied after compliance review"
                            )
                          }
                          title="Deny"
                          className="p-1.5 rounded hover:bg-rose-400/10 text-rose-400"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {list.length === 0 && (
          <div className="p-10 text-center text-white/40 text-sm">
            No withdrawals in this view.
          </div>
        )}
      </div>
            {selected && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card border border-line rounded-2xl w-full max-w-lg p-6"
            onClick={event => event.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-white">
              Withdrawal #{selected.id}
            </h3>

            <div className="mt-5 space-y-3 text-sm">
              {[
                ["Client", selected.userName],
                ["Asset", selected.asset],
                ["Amount", fmt(selected.amount)],
                ["Wallet", selected.walletAddress || "—"],
                ["Submitted", dt(selected.date)],
                ["Status", selected.status],
                ["Note", selected.note || "—"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-line/50 pb-2"
                >
                  <span className="text-white/50">
                    {label}
                  </span>

                  <span className="text-white text-right break-all">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={() => act(selected.id, "approved")}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-md bg-emerald-400 text-bg font-medium"
              >
                <CheckCircle2 className="w-4 h-4" />
                Approve
              </button>

              <button
                onClick={() =>
                  act(selected.id, "suspended", "Held for AML review")
                }
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-md bg-blue-400 text-bg font-medium"
              >
                <PauseCircle className="w-4 h-4" />
                Suspend
              </button>

              <button
                onClick={() => {
                  const reason = prompt("Reason?") || "Denied";
                  act(selected.id, "denied", reason);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-md bg-rose-400 text-bg font-medium"
              >
                <XCircle className="w-4 h-4" />
                Deny
              </button>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-3 w-full py-2 text-sm text-white/60 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function AdminDeposits() {
  const list = store
    .getTxns()
    .filter(transaction => transaction.type === "deposit");

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">
        Deposits
      </h1>

      <p className="text-sm text-white/50 mt-1">
        Incoming client deposits across all assets.
      </p>

      <div className="mt-6 overflow-x-auto bg-card border border-line rounded-xl">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wider text-white/50">
              <th className="text-left py-3.5 px-5">User</th>
              <th className="text-left py-3.5 px-5">Asset</th>
              <th className="text-right py-3.5 px-5">Amount</th>
              <th className="text-left py-3.5 px-5">Tx hash</th>
              <th className="text-left py-3.5 px-5">Date</th>
              <th className="text-left py-3.5 px-5">Status</th>
            </tr>
          </thead>

          <tbody>
            {list.map(transaction => (
              <tr
                key={transaction.id}
                className="border-b border-line/50 last:border-0"
              >
                <td className="py-3 px-5 text-white">
                  {transaction.userName}
                </td>

                <td className="py-3 px-5 text-white/80">
                  {transaction.asset}
                </td>

                <td className="py-3 px-5 text-right text-emerald-400 font-medium">
                  +{fmt(transaction.amount)}
                </td>

                <td className="py-3 px-5 text-white/50 font-mono text-xs">
                  {transaction.txHash || "—"}
                </td>

                <td className="py-3 px-5 text-white/60 text-xs">
                  {dt(transaction.date)}
                </td>

                <td className="py-3 px-5">
                  <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-emerald-400/15 text-emerald-300">
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {list.length === 0 && (
          <div className="p-10 text-center text-white/40 text-sm">
            No deposits found.
          </div>
        )}
      </div>
    </div>
  );
}

export function AdminInvestments() {
  const list = store
    .getTxns()
    .filter(
      transaction =>
        transaction.type === "investment" ||
        transaction.type === "profit" ||
        transaction.type === "referral"
    );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">
        Investments & Earnings
      </h1>

      <p className="text-sm text-white/50 mt-1">
        Active investment plans, daily profits and referral payouts.
      </p>

      <div className="mt-6 overflow-x-auto bg-card border border-line rounded-xl">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wider text-white/50">
              <th className="text-left py-3.5 px-5">User</th>
              <th className="text-left py-3.5 px-5">Type</th>
              <th className="text-right py-3.5 px-5">Amount</th>
              <th className="text-left py-3.5 px-5">Note</th>
              <th className="text-left py-3.5 px-5">Date</th>
            </tr>
          </thead>

          <tbody>
            {list.map(transaction => (
              <tr
                key={transaction.id}
                className="border-b border-line/50 last:border-0"
              >
                <td className="py-3 px-5 text-white">
                  {transaction.userName}
                </td>

                <td className="py-3 px-5 capitalize text-white/80">
                  {transaction.type}
                </td>

                <td className="py-3 px-5 text-right text-white font-medium">
                  {fmt(transaction.amount)}
                </td>

                <td className="py-3 px-5 text-white/60 text-xs">
                  {transaction.note || "—"}
                </td>

                <td className="py-3 px-5 text-white/60 text-xs">
                  {dt(transaction.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {list.length === 0 && (
          <div className="p-10 text-center text-white/40 text-sm">
            No investment records found.
          </div>
        )}
      </div>
    </div>
  );
                }
export function AdminMessages() {
  const { refresh } = useStore();

  const [selected, setSelected] = useState<Message | null>(null);
  const [reply, setReply] = useState("");

  const messages = store
    .getMsgs()
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const open = (message: Message) => {
    setSelected(message);
    store.updateMsg(message.id, {
      read: true,
    });
    refresh();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">
        Messages
      </h1>

      <p className="text-sm text-white/50 mt-1">
        All inbound enquiries from the contact form and client portal.
      </p>

      <div className="mt-6 grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 bg-card border border-line rounded-xl divide-y divide-line/50 max-h-[70vh] overflow-y-auto">
          {messages.map(message => (
            <button
              key={message.id}
              onClick={() => open(message)}
              className={`w-full text-left p-4 hover:bg-white/[0.02] transition ${
                selected?.id === message.id ? "bg-white/[0.03]" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-sm text-white font-medium truncate">
                  {message.from}
                </div>

                {!message.read && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                )}
              </div>

              <div className="text-xs text-white/60 truncate mt-0.5">
                {message.subject}
              </div>

              <div className="text-[10px] text-white/40 mt-1">
                {dt(message.date)}
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 bg-card border border-line rounded-xl p-6 min-h-[60vh]">
          {selected ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-white">
                    {selected.subject}
                  </div>

                  <div className="text-sm text-white/60 mt-0.5">
                    {selected.from} &lt;{selected.email}&gt;
                  </div>

                  <div className="text-xs text-white/40 mt-0.5">
                    {dt(selected.date)}
                  </div>
                </div>

                <div className="flex gap-1.5">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(
                      selected.subject
                    )}`}
                    className="p-2 rounded hover:bg-white/5 text-emerald-400"
                    title="Reply via email"
                  >
                    <Reply className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      if (confirm("Delete?")) {
                        store.deleteMsg(selected.id);
                        setSelected(null);
                        refresh();
                      }
                    }}
                    className="p-2 rounded hover:bg-rose-400/10 text-rose-400"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-line text-sm text-white/80 leading-relaxed whitespace-pre-line">
                {selected.body}
              </div>

              <div className="mt-6 pt-6 border-t border-line">
                <div className="text-xs text-white/50 mb-2">
                  Quick reply
                </div>

                <textarea
                  value={reply}
                  onChange={event => setReply(event.target.value)}
                  rows={4}
                  placeholder="Type your response..."
                  className="w-full bg-bg border border-line rounded-md p-3 text-sm focus:outline-none focus:border-emerald-400/40"
                />

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      alert("Reply prepared: " + reply);
                      setReply("");
                    }}
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg text-sm font-medium"
                  >
                    Send reply
                  </button>

                  <button
                    onClick={() => setReply("")}
                    className="px-4 py-2 rounded-md border border-line text-white/70 text-sm"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full grid place-items-center text-white/40 text-sm">
              <div className="text-center">
                <MailIcon className="w-8 h-8 mx-auto mb-3 opacity-40" />
                Select a message to read.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function AdminSettings() {
  const { refresh } = useStore();
  const [copied, setCopied] = useState("");

  const copy = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">
        Settings
      </h1>

      <p className="text-sm text-white/50 mt-1">
        Admin credentials, danger zone and production readiness.
      </p>

      <div className="mt-6 grid lg:grid-cols-2 gap-5">
        <div className="bg-card border border-line rounded-xl p-6">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Admin credentials
          </h2>

          <p className="text-xs text-white/50 mt-1">
            Move admin authentication to a backend before accepting real
            capital.
          </p>

          <div className="mt-5 space-y-3">
            <div className="bg-bg/60 border border-line rounded-md p-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-white/50">
                  Email
                </div>

                <div className="text-sm text-white font-mono">
                  {ADMIN_CREDENTIALS.email}
                </div>
              </div>

              <button
                onClick={() => copy(ADMIN_CREDENTIALS.email, "email")}
                className="p-1.5 text-white/60 hover:text-white"
              >
                <Copy className="w-4 h-4" />

                {copied === "email" && (
                  <span className="text-[10px] ml-1 text-emerald-400">
                    Copied
                  </span>
                )}
              </button>
            </div>

            <div className="bg-bg/60 border border-line rounded-md p-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-white/50">
                  Password
                </div>

                <div className="text-sm text-white font-mono">
                  {ADMIN_CREDENTIALS.password}
                </div>
              </div>

              <button
                onClick={() => copy(ADMIN_CREDENTIALS.password, "password")}
                className="p-1.5 text-white/60 hover:text-white"
              >
                <Copy className="w-4 h-4" />

                {copied === "password" && (
                  <span className="text-[10px] ml-1 text-emerald-400">
                    Copied
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-card border border-line rounded-xl p-6">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Danger zone
          </h2>

          <p className="text-xs text-white/50 mt-1">
            Restore reference data. Use with caution.
          </p>

          <div className="mt-5 space-y-2">
            <button
              onClick={() => {
                if (
                  confirm(
                    "Restore reference data? This will reset users, transactions and messages."
                  )
                ) {
                  store.reset();

                  audit.log({
                    actor: "Administrator",
                    action: "Restore reference data",
                    target: "Platform",
                  });

                  refresh();
                  alert("Reference data restored.");
                }
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-md border border-line text-white hover:bg-white/5"
            >
              <RefreshCw className="w-4 h-4" />
              Restore reference data
            </button>
          </div>
        </div>

        <div className="bg-card border border-line rounded-xl p-6 lg:col-span-2">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <Save className="w-4 h-4 text-emerald-400" />
            Production checklist
          </h2>

          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {[
              "Move user data and admin authentication to a backend database.",
              "Hash passwords with bcrypt or Argon2.",
              "Connect Resend for transactional email notifications.",
              "Connect Sumsub or another KYC provider for real identity verification.",
              "Connect custody provider monitoring for real deposit and withdrawal status.",
              "Maintain legal, compliance and risk documentation for each jurisdiction.",
              "Deploy with HTTPS, CSP headers, WAF and DDoS protection.",
              "Enable real monitoring, analytics and alerting.",
            ].map(item => (
              <li key={item} className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
              }
