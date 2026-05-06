import {
  Code2,
  Copy,
  KeyRound,
  Lock,
  Server,
  ShieldCheck,
} from "lucide-react";

import { useState } from "react";
import { CONFIG } from "../config";

const ENDPOINTS = [
  ["GET", "/v1/market/prices", "Live crypto prices and 24h changes"],
  ["GET", "/v1/account/balance", "Authenticated investor balance snapshot"],
  ["POST", "/v1/deposits/address", "Generate or retrieve a deposit address"],
  ["POST", "/v1/withdrawals", "Create a withdrawal request"],
  ["GET", "/v1/investments", "List active and matured investment plans"],
  ["POST", "/v1/webhooks/custody", "Custody provider webhook for deposits"],
];

const SAMPLE = `curl https://api.nordvaultglobal.com/v1/account/balance \\
  -H "Authorization: Bearer nv_live_xxxxxxxxx" \\
  -H "X-Idempotency-Key: 8f33b0d5"`;

export default function ApiDocs() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(SAMPLE);
    setCopied(true);

    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div>
      <section className="border-b border-line bg-radial-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2 flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            Developer API
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-white">
            Open API documentation.
          </h1>

          <p className="mt-4 text-white/65 max-w-2xl">
            A professional REST API specification for custody webhooks, investor
            reporting, deposits, withdrawals and internal treasury workflows.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-card border border-line rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4">
              Endpoints
            </h2>

            <div className="divide-y divide-line/50">
              {ENDPOINTS.map(([method, path, description]) => (
                <div
                  key={path}
                  className="py-3 flex items-center gap-4"
                >
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded ${
                      method === "GET"
                        ? "bg-blue-400/15 text-blue-300"
                        : "bg-emerald-400/15 text-emerald-300"
                    }`}
                  >
                    {method}
                  </span>

                  <code className="text-white font-mono text-sm flex-1">
                    {path}
                  </code>

                  <span className="text-xs text-white/50 hidden sm:block">
                    {description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-line rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold">
                Authentication example
              </h2>

              <button
                onClick={copy}
                className="text-white/50 hover:text-white"
              >
                {copied ? "Copied" : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <pre className="bg-bg border border-line rounded-md p-4 text-xs text-emerald-200 overflow-x-auto">
              {SAMPLE}
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              icon: KeyRound,
              title: "API keys",
              desc: "Scoped live and restricted keys with rotation history.",
            },
            {
              icon: Lock,
              title: "Idempotency",
              desc: "Required on all money-moving endpoints.",
            },
            {
              icon: ShieldCheck,
              title: "Webhooks",
              desc: "HMAC signed custody and KYC event webhooks.",
            },
            {
              icon: Server,
              title: "Environment",
              desc: `Production base URL configured for ${CONFIG.brand.name}.`,
            },
          ].map(item => (
            <div
              key={item.title}
              className="bg-card border border-line rounded-xl p-5"
            >
              <item.icon className="w-5 h-5 text-emerald-400 mb-3" />

              <h3 className="text-white font-semibold">
                {item.title}
              </h3>

              <p className="text-sm text-white/60 mt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
                      }
