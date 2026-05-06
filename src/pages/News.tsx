import { useEffect, useState } from "react";
import { ExternalLink, Clock, Newspaper } from "lucide-react";

type Article = {
  title: string;
  url: string;
  source: string;
  published: string;
  description?: string;
  image?: string;
};

const FALLBACK: Article[] = [
  {
    title: "Bitcoin holds firm as institutional digital asset allocation expands",
    url: "#",
    source: "Market Desk",
    published: "2026-01-14T09:30:00Z",
    description:
      "European and global institutions continue increasing their exposure to Bitcoin and regulated digital asset products.",
  },
  {
    title: "MiCA guidance strengthens transparency standards for crypto platforms",
    url: "#",
    source: "Regulatory Brief",
    published: "2026-01-13T14:20:00Z",
    description:
      "European digital asset service providers continue improving disclosure, custody and investor protection frameworks.",
  },
  {
    title: "Ethereum liquidity remains strong as institutional demand grows",
    url: "#",
    source: "Digital Assets",
    published: "2026-01-13T11:05:00Z",
    description:
      "Professional investors continue reviewing ETH-based allocations, staking economics and treasury diversification.",
  },
  {
    title: "Frankfurt fintech sector expands digital asset compliance infrastructure",
    url: "#",
    source: "Germany Watch",
    published: "2026-01-12T16:45:00Z",
    description:
      "Frankfurt continues developing as one of Europe's most relevant hubs for regulated financial technology and digital asset operations.",
  },
  {
    title: "Solana ecosystem sees renewed institutional research interest",
    url: "#",
    source: "Crypto Research",
    published: "2026-01-12T10:12:00Z",
    description:
      "Research desks continue monitoring Solana, infrastructure tokens and high-throughput blockchain applications.",
  },
  {
    title: "Stablecoin liquidity remains a core component of crypto market structure",
    url: "#",
    source: "Treasury Notes",
    published: "2026-01-11T08:30:00Z",
    description:
      "Stablecoins remain central to digital asset settlement, exchange liquidity and treasury operations.",
  },
];

const ago = (date: string) => {
  const minutes = (Date.now() - +new Date(date)) / 60000;

  if (minutes < 60) return `${Math.round(minutes)}m ago`;
  if (minutes < 1440) return `${Math.round(minutes / 60)}h ago`;

  return `${Math.round(minutes / 1440)}d ago`;
};

export default function News() {
  const [items, setItems] = useState<Article[]>(FALLBACK);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/news")
      .then(response => (response.ok ? response.json() : null))
      .then(data => {
        if (data?.data?.length) {
          setItems(
            data.data.slice(0, 12).map((article: any) => ({
              title: article.title,
              url: article.url,
              source: article.author || "CoinGecko",
              published: article.updated_at
                ? new Date(article.updated_at * 1000).toISOString()
                : new Date().toISOString(),
              description: article.description,
              image: article.thumb_2x,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <section className="border-b border-line bg-radial-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2 flex items-center gap-2">
            <Newspaper className="w-3.5 h-3.5" />
            Market intelligence
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            The latest in digital assets.
          </h1>

          <p className="mt-4 text-white/65 max-w-2xl">
            Curated headlines from digital asset markets, regulation, custody,
            Bitcoin, Ethereum and institutional crypto adoption.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-line rounded-xl p-5 hover:border-emerald-400/30 transition group"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt=""
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}

              <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                <span className="text-emerald-400 font-medium">
                  {article.source}
                </span>

                <span>·</span>

                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {ago(article.published)}
                </span>
              </div>

              <h3 className="text-white font-semibold leading-snug group-hover:text-emerald-300 transition">
                {article.title}
              </h3>

              {article.description && (
                <p className="mt-2 text-sm text-white/60 line-clamp-2">
                  {article.description}
                </p>
              )}

              <div className="mt-3 text-xs text-emerald-400 inline-flex items-center gap-1">
                Read more
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
    }
