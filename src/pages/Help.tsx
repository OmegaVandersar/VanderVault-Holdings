import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Wallet,
  Shield,
  BookOpen,
  ArrowUpFromLine,
  Settings,
  Users,
  Gift,
  ArrowRight,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

const CATEGORIES = [
  {
    id: "getting-started",
    name: "Getting started",
    icon: BookOpen,
    color: "emerald",
    count: 12,
  },
  {
    id: "deposits",
    name: "Deposits",
    icon: Wallet,
    color: "sky",
    count: 9,
  },
  {
    id: "withdrawals",
    name: "Withdrawals",
    icon: ArrowUpFromLine,
    color: "amber",
    count: 7,
  },
  {
    id: "security",
    name: "Security & 2FA",
    icon: Shield,
    color: "rose",
    count: 11,
  },
  {
    id: "investments",
    name: "Investment plans",
    icon: Settings,
    color: "purple",
    count: 8,
  },
  {
    id: "account",
    name: "Account & KYC",
    icon: Users,
    color: "blue",
    count: 10,
  },
  {
    id: "affiliate",
    name: "Affiliate program",
    icon: Gift,
    color: "amber",
    count: 6,
  },
  {
    id: "trouble",
    name: "Troubleshooting",
    icon: Settings,
    color: "rose",
    count: 14,
  },
];

const ARTICLES: Record<string, { q: string; a: string }[]> = {
  "getting-started": [
    {
      q: "How do I open a NordVault account?",
      a: "Click 'Open account' in the top right of any page. Enter your name, email, phone number, country, wallet address and password. After registration, complete email verification, KYC and 2FA setup.",
    },
    {
      q: "Is NordVault available in my country?",
      a: "NordVault serves investors in selected global jurisdictions including the UK, EU, EEA, Switzerland, Canada, UAE, Japan and other supported countries. We cannot accept investors from sanctioned or restricted jurisdictions.",
    },
    {
      q: "What is the minimum investment amount?",
      a: "The Starter plan begins at €500. Professional starts at €5,000 and Institutional starts at €50,000.",
    },
    {
      q: "How long does it take to start investing?",
      a: "After registration, email verification, KYC and 2FA setup, investors can deposit funds and activate a plan from the dashboard.",
    },
  ],
  deposits: [
    {
      q: "What deposit methods do you accept?",
      a: "Bitcoin, Ethereum, USDT TRC20, USDT ERC20, USDC, BNB, Solana, SEPA bank transfer and card rails when enabled.",
    },
    {
      q: "How long does a deposit take?",
      a: "Blockchain deposit timing depends on network confirmations. BTC may take around 10 minutes, Ethereum-based assets a few minutes, and Solana usually less than a minute.",
    },
    {
      q: "Are deposit fees charged?",
      a: "The platform does not display deposit fees. Blockchain network fees may apply depending on the network used.",
    },
  ],
  withdrawals: [
    {
      q: "How fast are withdrawals processed?",
      a: "Withdrawal requests are reviewed within 24 hours. Professional and Institutional users receive priority review.",
    },
    {
      q: "Why do withdrawals require approval?",
      a: "Withdrawals are reviewed for KYC, 2FA, wallet address screening, sanctions checks and account security protection.",
    },
    {
      q: "Can I withdraw to any wallet?",
      a: "Investors are encouraged to whitelist wallet addresses before withdrawing. This helps prevent unauthorized withdrawal requests.",
    },
  ],
  security: [
    {
      q: "Why is 2FA required?",
      a: "Two-factor authentication protects account logins, withdrawals and sensitive settings. It is a standard security requirement for professional investment platforms.",
    },
    {
      q: "What happens if I lose my 2FA device?",
      a: "Use your backup codes. If backup codes are unavailable, contact support for identity re-verification.",
    },
    {
      q: "How are accounts protected?",
      a: "Accounts use email verification, KYC review, 2FA, wallet screening, login monitoring, withdrawal approvals and session timeout.",
    },
  ],
  investments: [
    {
      q: "How are plan returns calculated?",
      a: "Plan returns are displayed as target daily yields multiplied by the plan duration. Target yields are not guaranteed and capital is at risk.",
    },
    {
      q: "Can I activate multiple plans?",
      a: "Yes. Investors can activate multiple investment plans from the dashboard, subject to balance, KYC and account review.",
    },
    {
      q: "Are profits guaranteed?",
      a: "No. All displayed returns are target rates only. Digital asset investments involve risk and past performance does not guarantee future results.",
    },
  ],
  account: [
    {
      q: "Why do I need KYC?",
      a: "KYC is required for compliance, anti-money laundering, account protection and withdrawal approval.",
    },
    {
      q: "What documents are required?",
      a: "A government-issued ID, proof of address and selfie verification may be requested.",
    },
    {
      q: "How long does KYC take?",
      a: "Many reviews can be completed quickly, but complex cases may require additional compliance review.",
    },
  ],
  affiliate: [
    {
      q: "How does the referral program work?",
      a: "Each investor receives a referral link. Commission is earned when referred users register, verify and fund an investment account.",
    },
    {
      q: "How much can I earn?",
      a: "Plan-level referral commissions are 5% for Starter, 7% for Professional and 10% for Institutional. Affiliate tiers may reach up to 18%.",
    },
  ],
  trouble: [
    {
      q: "I forgot my password. What should I do?",
      a: "Use the 'Forgot password' link on the login page to generate a reset link.",
    },
    {
      q: "My account is suspended. Why?",
      a: "Accounts may be suspended for compliance review, suspicious activity, wallet screening or incomplete verification.",
    },
    {
      q: "The website is not loading correctly.",
      a: "Try clearing browser cache, using another browser, disabling extensions or opening the website in a modern mobile browser.",
    },
  ],
};

const COLOR_MAP: Record<string, string> = {
  emerald: "text-emerald-400 bg-emerald-400/10",
  sky: "text-sky-400 bg-sky-400/10",
  amber: "text-amber-400 bg-amber-400/10",
  rose: "text-rose-400 bg-rose-400/10",
  purple: "text-purple-400 bg-purple-400/10",
  blue: "text-blue-400 bg-blue-400/10",
};

export default function Help() {
  const [active, setActive] = useState("getting-started");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const allArticles = Object.entries(ARTICLES).flatMap(([cat, articles]) =>
    articles.map((article, index) => ({
      ...article,
      cat,
      id: `${cat}-${index}`,
    }))
  );

  const filtered = query
    ? allArticles.filter(
        article =>
          article.q.toLowerCase().includes(query.toLowerCase()) ||
          article.a.toLowerCase().includes(query.toLowerCase())
      )
    : (ARTICLES[active] || []).map((article, index) => ({
        ...article,
        cat: active,
        id: `${active}-${index}`,
      }));

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-radial-glow" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
            Help Center
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            How can we help?
          </h1>

          <p className="mt-4 text-white/65 max-w-2xl mx-auto">
            Browse our knowledge base or search across support articles.
          </p>

          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />

              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-4 bg-card border border-line rounded-xl text-white focus:outline-none focus:border-emerald-400/40"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {!query && (
          <>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Browse by category
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActive(category.id)}
                  className={`text-left bg-card border rounded-xl p-5 transition ${
                    active === category.id
                      ? "border-emerald-400/40"
                      : "border-line hover:border-emerald-400/20"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg grid place-items-center ${COLOR_MAP[category.color]}`}
                  >
                    <category.icon className="w-5 h-5" />
                  </div>

                  <div className="mt-3 text-white font-semibold text-sm">
                    {category.name}
                  </div>

                  <div className="text-xs text-white/50 mt-0.5">
                    {category.count} articles
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        <div className="bg-card border border-line rounded-2xl divide-y divide-line/50">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-white/40 text-sm">
              No articles match your search. Try different keywords or contact
              support.
            </div>
          ) : (
            filtered.map(article => (
              <button
                key={article.id}
                onClick={() => setOpen(open === article.id ? null : article.id)}
                className="w-full text-left p-5 hover:bg-white/[0.02]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-white font-medium">
                      {article.q}
                    </div>

                    {open === article.id && (
                      <p className="mt-3 text-sm text-white/65 leading-relaxed">
                        {article.a}
                      </p>
                    )}
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 text-white/40 mt-1 transition ${
                      open === article.id
                        ? "rotate-90 text-emerald-400"
                        : ""
                    }`}
                  />
                </div>
              </button>
            ))
          )}
        </div>

        <div className="mt-10 bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-purple-500/10 border border-emerald-400/20 rounded-2xl p-8 text-center">
          <MessageCircle className="w-9 h-9 text-emerald-400 mx-auto mb-3" />

          <h3 className="text-xl font-semibold text-white">
            Still need help?
          </h3>

          <p className="mt-2 text-white/65">
            Our support team is available through email, WhatsApp and live chat.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 justify-center">
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-medium inline-flex items-center gap-2"
            >
              Contact support
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/quiz"
              className="px-5 py-2.5 rounded-md border border-line text-white hover:bg-white/5"
            >
              Take risk profile quiz
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
    }
