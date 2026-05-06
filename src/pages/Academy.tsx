import { Link } from "react-router-dom";
import {
  BookOpen,
  Video,
  GraduationCap,
  Clock,
  ArrowRight,
  Award,
} from "lucide-react";

const COURSES = [
  {
    level: "Beginner",
    title: "Crypto investing fundamentals",
    lessons: 12,
    mins: 95,
    desc: "Learn blockchain basics, Bitcoin, Ethereum, stablecoins, custody, risk and how digital asset allocation works.",
    color: "emerald",
  },
  {
    level: "Beginner",
    title: "Wallet security & best practices",
    lessons: 8,
    mins: 60,
    desc: "Understand hardware wallets, seed phrases, withdrawal addresses, 2FA, phishing protection and safe custody habits.",
    color: "emerald",
  },
  {
    level: "Intermediate",
    title: "Reading the market",
    lessons: 16,
    mins: 140,
    desc: "Learn technical analysis, market cycles, liquidity, on-chain metrics, volatility and sentiment indicators.",
    color: "sky",
  },
  {
    level: "Intermediate",
    title: "Portfolio construction",
    lessons: 10,
    mins: 105,
    desc: "Study allocation, rebalancing, diversification, correlation, drawdown control and crypto portfolio risk management.",
    color: "sky",
  },
  {
    level: "Advanced",
    title: "Delta-neutral strategies",
    lessons: 14,
    mins: 180,
    desc: "Explore basis trading, funding rates, market-making, hedging and non-directional yield strategies.",
    color: "amber",
  },
  {
    level: "Advanced",
    title: "MiCA & European tax planning",
    lessons: 9,
    mins: 130,
    desc: "Understand MiCA, AML obligations, investor disclosures, country-by-country tax considerations and reporting basics.",
    color: "amber",
  },
];

const ARTICLES = [
  {
    date: "12 Jan 2026",
    title: "Why 2026 is the institutional inflection point for global crypto",
    read: "8 min",
  },
  {
    date: "08 Jan 2026",
    title: "The MiCA framework explained for digital asset investors",
    read: "12 min",
  },
  {
    date: "03 Jan 2026",
    title: "Bitcoin market cycles and what investors should understand",
    read: "6 min",
  },
  {
    date: "28 Dec 2025",
    title: "How to securely transfer crypto from an exchange to custody",
    read: "5 min",
  },
];

export default function Academy() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-radial-glow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
            NordVault Academy
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight max-w-3xl">
            Learn to invest in crypto like a professional.
          </h1>

          <p className="mt-5 text-lg text-white/65 max-w-2xl">
            Free for every NordVault investor. Courses and articles designed to
            help clients understand custody, risk, markets, portfolio management
            and regulation before allocating capital.
          </p>

          <div className="mt-7 flex flex-wrap gap-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-emerald-400" />
              70+ video lessons
            </div>

            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              200+ articles
            </div>

            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              Investor certificates
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              Professional education library
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Courses
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map(course => (
            <div
              key={course.title}
              className="bg-card border border-line rounded-2xl p-6 hover:border-emerald-400/30 transition group"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded ${
                    course.color === "emerald"
                      ? "bg-emerald-400/15 text-emerald-300"
                      : course.color === "sky"
                        ? "bg-sky-400/15 text-sky-300"
                        : "bg-amber-400/15 text-amber-300"
                  }`}
                >
                  {course.level}
                </span>

                <Video className="w-4 h-4 text-white/30" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-emerald-300 transition">
                {course.title}
              </h3>

              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                {course.desc}
              </p>

              <div className="mt-5 pt-4 border-t border-line flex items-center justify-between text-xs text-white/50">
                <span>{course.lessons} lessons</span>

                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.mins} min
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg-elev/40 border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Latest articles
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {ARTICLES.map(article => (
              <a
                key={article.title}
                href="#"
                className="bg-card border border-line rounded-xl p-5 hover:border-emerald-400/30 transition group"
              >
                <div className="flex items-center justify-between text-xs text-white/40 mb-2">
                  <span>{article.date}</span>

                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.read}
                  </span>
                </div>

                <div className="text-white font-medium group-hover:text-emerald-300 transition">
                  {article.title}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-semibold text-white">
          Free for every NordVault investor.
        </h2>

        <p className="mt-3 text-white/60">
          Open an account and get instant access to the full Academy library.
        </p>

        <Link
          to="/register"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold"
        >
          Start learning
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
    }
