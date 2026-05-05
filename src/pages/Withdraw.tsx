import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import { auth } from "../data/auth";
import { store } from "../data/store";

const ASSETS = [
  "BTC",
  "ETH",
  "USDT",
  "USDC",
  "BNB",
  "SOL",
  "XRP",
  "EUR",
];

export default function Withdraw() {
  const me = auth.current();

  const [asset, setAsset] = useState("USDT");
  const [amount, setAmount] = useState(500);
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);

  if (!me) return <Navigate to="/login" replace />;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    store.addTxn({
      userId: me.id,
      userName: `${me.firstName} ${me.lastName}`,
      type: "withdrawal",
      asset,
      amount,
      status: "pending",
      walletAddress: address,
      note,
    });

    setDone(true);
  };

  if (done) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-5" />

        <h1 className="text-3xl font-semibold text-white">
          Withdrawal submitted
        </h1>

        <p className="mt-3 text-white/65">
          Your request is now awaiting compliance and treasury approval. You can
          track it from your dashboard.
        </p>

        <Link
          to="/dashboard"
          className="mt-7 inline-flex px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold"
        >
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
        Secure withdrawal
      </div>

      <h1 className="text-4xl font-semibold text-white">
        Request a withdrawal
      </h1>

      <p className="mt-3 text-white/60">
        All withdrawals pass through treasury review, AML screening, wallet
        screening and 2FA validation before approval.
      </p>

      {(!me.twoFA || me.kyc !== "verified") && (
        <div className="mt-6 bg-amber-400/5 border border-amber-400/20 rounded-xl p-4 flex gap-3 text-sm text-amber-100/80">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />

          <div>
            KYC verification and 2FA are required for withdrawals. You can still
            prepare the request, but approval requires both security checks.
          </div>
        </div>
      )}

      <form
        onSubmit={submit}
        className="mt-8 bg-card border border-line rounded-2xl p-6 space-y-4"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-white/60">
              Asset
            </label>

            <select
              value={asset}
              onChange={event => setAsset(event.target.value)}
              className="mt-1 w-full bg-bg border border-line rounded-md px-3 py-2.5 text-sm"
            >
              {ASSETS.map(item => (
                <option key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-white/60">
              Amount
            </label>

            <input
              type="number"
              min="1"
              value={amount}
              onChange={event => setAmount(Number(event.target.value))}
              className="mt-1 w-full bg-bg border border-line rounded-md px-3 py-2.5 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-white/60">
            Destination wallet / IBAN
          </label>

          <input
            required
            value={address}
            onChange={event => setAddress(event.target.value)}
            className="mt-1 w-full bg-bg border border-line rounded-md px-3 py-2.5 text-sm font-mono"
          />
        </div>

        <div>
          <label className="text-xs text-white/60">
            Optional note
          </label>

          <textarea
            value={note}
            onChange={event => setNote(event.target.value)}
            rows={3}
            className="mt-1 w-full bg-bg border border-line rounded-md px-3 py-2.5 text-sm"
          />
        </div>

        <div className="rounded-md border border-line bg-bg/60 p-4 text-xs text-white/55 flex gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          Withdrawal requests are compared against whitelisted addresses,
          IP/device reputation, account history and sanctions screening.
        </div>

        <button className="w-full py-3 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold inline-flex items-center justify-center gap-2">
          Submit withdrawal request
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
        }
