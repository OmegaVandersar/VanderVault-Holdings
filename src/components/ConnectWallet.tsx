import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  Link as LinkIcon,
  Unplug,
  Wallet,
} from "lucide-react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const KEY = "nv_connected_wallet";

export default function ConnectWallet({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [account, setAccount] = useState<string>(
    localStorage.getItem(KEY) || ""
  );

  const [chainId, setChainId] = useState("");
  const [balance, setBalance] = useState("");
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!window.ethereum || !account) return;

    window.ethereum
      .request({
        method: "eth_chainId",
      })
      .then(setChainId)
      .catch(() => {});

    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [account, "latest"],
      })
      .then((wei: string) =>
        setBalance((parseInt(wei, 16) / 1e18).toFixed(4))
      )
      .catch(() => {});

    const onAccounts = (accounts: string[]) => {
      const next = accounts?.[0] || "";

      setAccount(next);

      if (next) {
        localStorage.setItem(KEY, next);
      } else {
        localStorage.removeItem(KEY);
      }
    };

    window.ethereum.on?.("accountsChanged", onAccounts);

    return () => window.ethereum?.removeListener?.("accountsChanged", onAccounts);
  }, [account]);

  const connect = async () => {
    setErr("");

    if (!window.ethereum) {
      return setErr(
        "No browser wallet detected. Open this website in MetaMask, Coinbase Wallet, Trust Wallet, or install MetaMask."
      );
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const address = accounts?.[0];

      if (address) {
        setAccount(address);
        localStorage.setItem(KEY, address);
      }
    } catch (error: any) {
      setErr(error.message || "Wallet connection was cancelled.");
    }
  };

  const disconnect = () => {
    localStorage.removeItem(KEY);
    setAccount("");
    setBalance("");
    setChainId("");
  };

  const copy = () => {
    navigator.clipboard.writeText(account);
    setCopied(true);

    setTimeout(() => setCopied(false), 1200);
  };

  const short = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : "";

  if (compact) {
    return account ? (
      <button
        onClick={copy}
        className="text-xs px-3 py-2 rounded-md border border-emerald-400/30 text-emerald-300 bg-emerald-400/5 inline-flex items-center gap-2"
      >
        <Wallet className="w-3.5 h-3.5" />
        {short}
      </button>
    ) : (
      <button
        onClick={connect}
        className="text-xs px-3 py-2 rounded-md border border-line text-white/70 hover:text-white inline-flex items-center gap-2"
      >
        <LinkIcon className="w-3.5 h-3.5" />
        Wallet
      </button>
    );
  }

  return (
    <div className="bg-card border border-line rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Wallet className="w-4 h-4 text-emerald-400" />
            Wallet Connect
          </h3>

          <p className="text-xs text-white/50 mt-1">
            Connect a browser wallet for deposits, address verification and
            faster withdrawals.
          </p>
        </div>

        {account && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
      </div>

      {account ? (
        <div className="mt-4 space-y-3">
          <div className="bg-bg/60 border border-line rounded-md p-3">
            <div className="text-[10px] uppercase tracking-wider text-white/40">
              Connected address
            </div>

            <div className="mt-1 flex items-center gap-2">
              <span className="font-mono text-sm text-white break-all">
                {account}
              </span>

              <button onClick={copy} className="text-white/50 hover:text-white">
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-bg/60 border border-line rounded p-3">
              <div className="text-white/40">Chain</div>
              <div className="text-white mt-1">{chainId || "Detected"}</div>
            </div>

            <div className="bg-bg/60 border border-line rounded p-3">
              <div className="text-white/40">ETH balance</div>
              <div className="text-white mt-1">{balance || "0.0000"}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={`https://etherscan.io/address/${account}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center py-2 rounded-md border border-line text-white/70 hover:bg-white/5 text-sm inline-flex items-center justify-center gap-2"
            >
              View on Etherscan
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={disconnect}
              className="px-4 py-2 rounded-md border border-line text-rose-300 hover:bg-rose-400/5"
            >
              <Unplug className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <button
            onClick={connect}
            className="w-full py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold inline-flex items-center justify-center gap-2"
          >
            <LinkIcon className="w-4 h-4" />
            Connect browser wallet
          </button>

          {err && (
            <div className="mt-3 text-xs text-amber-300 bg-amber-400/10 border border-amber-400/20 rounded p-3">
              {err}
            </div>
          )}
        </div>
      )}
    </div>
  );
      }
