import { useEffect, useState } from "react";
import {
  Copy,
  CheckCircle2,
  AlertTriangle,
  Wallet,
  Building2,
  ArrowRight,
  CreditCard,
} from "lucide-react";

import QRCode from "qrcode";
import { CONFIG } from "../config";
import { Link } from "react-router-dom";
import ConnectWallet from "../components/ConnectWallet";

const COINS = [
  {
    id: "BTC",
    name: "Bitcoin",
    network: "Bitcoin",
    confirmations: "1 block (~10 min)",
    color: "#f7931a",
    address: CONFIG.wallets.BTC,
  },
  {
    id: "ETH",
    name: "Ethereum",
    network: "ERC-20",
    confirmations: "12 blocks (~3 min)",
    color: "#627eea",
    address: CONFIG.wallets.ETH,
  },
  {
    id: "USDT_TRC20",
    name: "Tether",
    network: "TRC-20 (Tron)",
    confirmations: "20 blocks (~1 min)",
    color: "#26a17b",
    address: CONFIG.wallets.USDT_TRC20,
  },
  {
    id: "USDT_ERC20",
    name: "Tether",
    network: "ERC-20 (Ethereum)",
    confirmations: "12 blocks (~3 min)",
    color: "#26a17b",
    address: CONFIG.wallets.USDT_ERC20,
  },
  {
    id: "USDC",
    name: "USD Coin",
    network: "ERC-20",
    confirmations: "12 blocks (~3 min)",
    color: "#2775ca",
    address: CONFIG.wallets.USDC,
  },
  {
    id: "BNB",
    name: "BNB",
    network: "BEP-20",
    confirmations: "15 blocks (~45 sec)",
    color: "#f3ba2f",
    address: CONFIG.wallets.BNB,
  },
  {
    id: "SOL",
    name: "Solana",
    network: "Solana",
    confirmations: "32 slots (~13 sec)",
    color: "#14f195",
    address: CONFIG.wallets.SOL,
  },
  {
    id: "XRP",
    name: "XRP",
    network: "XRP Ledger",
    confirmations: "Final (~4 sec)",
    color: "#23292f",
    address: CONFIG.wallets.XRP,
  },
].filter(coin => coin.address);

export default function Deposit() {
  const [tab, setTab] = useState<"crypto" | "bank" | "card">("crypto");
  const [coin, setCoin] = useState(COINS[0]);
  const [qr, setQr] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    QRCode.toDataURL(coin.address, {
      width: 220,
      margin: 1,
      color: {
        dark: "#120f08",
        light: "#ffffff",
      },
    })
      .then(setQr)
      .catch(() => setQr(""));
  }, [coin]);

  const copy = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);

    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div>
      <section className="border-b border-line bg-radial-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
            Fund your account
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            Deposit funds securely.
          </h1>

          <p className="mt-4 text-white/65 max-w-2xl">
            Choose a cryptocurrency, SEPA bank transfer or card payment. Crypto
            deposits are credited after network confirmation and internal wallet
            screening.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setTab("crypto")}
            className={`px-5 py-2.5 rounded-md text-sm font-medium ${
              tab === "crypto"
                ? "bg-emerald-400/15 text-emerald-300 border border-emerald-400/30"
                : "bg-card border border-line text-white/60"
            }`}
          >
            <Wallet className="w-4 h-4 inline mr-2" />
            Cryptocurrency
          </button>

          <button
            onClick={() => setTab("bank")}
            className={`px-5 py-2.5 rounded-md text-sm font-medium ${
              tab === "bank"
                ? "bg-emerald-400/15 text-emerald-300 border border-emerald-400/30"
                : "bg-card border border-line text-white/60"
            }`}
          >
            <Building2 className="w-4 h-4 inline mr-2" />
            SEPA bank
          </button>

          <button
            onClick={() => setTab("card")}
            className={`px-5 py-2.5 rounded-md text-sm font-medium ${
              tab === "card"
                ? "bg-emerald-400/15 text-emerald-300 border border-emerald-400/30"
                : "bg-card border border-line text-white/60"
            }`}
          >
            <CreditCard className="w-4 h-4 inline mr-2" />
            Card / Apple Pay
          </button>
        </div>

        {tab === "crypto" ? (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-card border border-line rounded-2xl p-4">
              <div className="mb-4">
                <ConnectWallet />
              </div>

              <div className="text-xs text-white/50 uppercase tracking-wider mb-3 px-2">
                Select asset
              </div>

              <div className="space-y-1 max-h-[480px] overflow-y-auto scrollbar-thin">
                {COINS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setCoin(item)}
                    className={`w-full flex items-center gap-3 p-3 rounded-md text-left transition ${
                      coin.id === item.id
                        ? "bg-emerald-400/10 border border-emerald-400/30"
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full grid place-items-center text-white text-xs font-bold"
                      style={{
                        background: item.color,
                      }}
                    >
                      {item.id.slice(0, 1)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white font-medium">
                        {item.name}
                      </div>

                      <div className="text-[11px] text-white/50">
                        {item.network}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 bg-card border border-line rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-full grid place-items-center text-white font-bold"
                  style={{
                    background: coin.color,
                  }}
                >
                  {coin.id.slice(0, 1)}
                </div>

                <div>
                  <div className="text-lg font-semibold text-white">
                    Deposit {coin.name}
                  </div>

                  <div className="text-xs text-white/50">
                    Network: {coin.network} · Credited after{" "}
                    {coin.confirmations}
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 items-center">
                <div className="grid place-items-center">
                  <div className="bg-white p-3 rounded-xl">
                    {qr ? (
                      <img src={qr} alt="Deposit QR" className="w-48 h-48" />
                    ) : (
                      <div className="w-48 h-48 grid place-items-center text-bg/40">
                        ...
                      </div>
                    )}
                  </div>

                  <div className="mt-3 text-xs text-white/50">
                    Scan to send
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/60">
                    Your deposit address
                  </label>

                  <div className="mt-1.5 flex bg-bg border border-line rounded-md overflow-hidden">
                    <input
                      readOnly
                      value={coin.address}
                      className="flex-1 px-3 py-2.5 bg-transparent text-xs text-white font-mono focus:outline-none"
                    />

                    <button
                      onClick={() => copy(coin.address, "addr")}
                      className="px-3 border-l border-line text-white/60 hover:text-white"
                    >
                      {copied === "addr" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="mt-5 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/50">Network</span>
                      <span className="text-white">{coin.network}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/50">Minimum</span>
                      <span className="text-white">
                        €{CONFIG.plans[0].minimum} equivalent
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/50">Confirmations</span>
                      <span className="text-white">{coin.confirmations}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/50">Deposit fee</span>
                      <span className="text-emerald-400 font-medium">
                        Free
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/dashboard"
                    className="mt-5 inline-flex items-center gap-2 w-full justify-center py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-medium"
                  >
                    I have sent the deposit
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-md bg-amber-400/5 border border-amber-400/20 text-xs text-amber-200/80 flex gap-3">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />

                <div>
                  <strong className="text-amber-300">
                    Send only {coin.name} on {coin.network}.
                  </strong>{" "}
                  Sending the wrong asset or network may result in permanent
                  loss. Always double-check the address before sending.
                </div>
              </div>
            </div>
          </div>
        ) : tab === "bank" ? (
          <div className="bg-card border border-line rounded-2xl p-7 max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 grid place-items-center">
                <Building2 className="w-5 h-5 text-blue-400" />
              </div>

              <div>
                <div className="text-lg font-semibold text-white">
                  SEPA bank transfer
                </div>

                <div className="text-xs text-white/50">
                  Funds credited within 1 working day after verification
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["Beneficiary", CONFIG.bank.beneficiary],
                ["IBAN", CONFIG.bank.iban],
                ["BIC / SWIFT", CONFIG.bank.bic],
                ["Bank name", CONFIG.bank.bankName],
                ["Bank address", CONFIG.bank.bankAddress],
                ["Reference", CONFIG.bank.reference],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-bg/60 border border-line rounded-md p-3"
                >
                  <div className="text-[10px] uppercase tracking-wider text-white/50">
                    {label}
                  </div>

                  <div className="mt-1 flex items-center justify-between gap-2">
                    <div className="text-sm text-white font-medium font-mono break-all">
                      {value}
                    </div>

                    <button
                      onClick={() => copy(value, label)}
                      className="text-white/50 hover:text-white shrink-0"
                    >
                      {copied === label ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-md bg-amber-400/5 border border-amber-400/20 text-xs text-amber-200/80 flex gap-3">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />

              <div>
                <strong className="text-amber-300">
                  Use your account ID as the transfer reference.
                </strong>{" "}
                Without a correct reference, deposits may require manual review.
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-line rounded-2xl p-7 max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-emerald-400/20 grid place-items-center">
                <CreditCard className="w-5 h-5 text-emerald-400" />
              </div>

              <div>
                <div className="text-lg font-semibold text-white">
                  Card, Apple Pay & Google Pay
                </div>

                <div className="text-xs text-white/50">
                  Powered by Stripe Payment Links when enabled
                </div>
              </div>
            </div>

            <p className="text-sm text-white/65 leading-relaxed">
              Card deposits are ideal for first-time investors who prefer
              traditional payment rails. Payments are screened, KYC-linked and
              reconciled to your investor account reference.
            </p>

            {CONFIG.stripePaymentLink ? (
              <a
                href={CONFIG.stripePaymentLink}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 py-3 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold"
              >
                Continue to secure card payment
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <div className="mt-6 p-4 rounded-md bg-amber-400/5 border border-amber-400/20 text-sm text-amber-100/80">
                Card rails are prepared. Add your Stripe Payment Link in{" "}
                <code className="text-white">src/config.ts</code> to activate
                this option.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
    }
