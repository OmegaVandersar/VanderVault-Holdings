import { useEffect, useState } from "react";
import { ExternalLink, Newspaper } from "lucide-react";

type Item = {
  title: string;
  url: string;
  source: string;
};

const FALLBACK: Item[] = [
  {
    title: "Bitcoin remains the preferred institutional digital asset allocation",
    url: "#/news",
    source: "Market Desk",
  },
  {
    title: "MiCA compliance gives European platforms a new trust advantage",
    url: "#/news",
    source: "Regulatory Brief",
  },
  {
    title: "Stablecoin liquidity continues to support crypto market structure",
    url: "#/news",
    source: "Treasury Notes",
  },
  {
    title: "Ethereum staking demand rises among European private banks",
    url: "#/news",
    source: "Digital Assets",
  },
  {
    title: "Frankfurt fintech sector expands digital asset services",
    url: "#/news",
    source: "Germany Watch",
  },
];

export default function DashboardNewsWidget() {
  const [items, setItems] = useState<Item[]>(FALLBACK);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/news")
      .then(response => (response.ok ? response.json() : null))
      .then(data => {
        if (data?.data?.length) {
          setItems(
            data.data.slice(0, 5).map((article: any) => ({
              title: article.title,
              url: article.url,
              source: article.author || "CoinGecko",
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-card border border-line rounded-xl p-5">
      <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
        <Newspaper className="w-4 h-4 text-emerald-400" />
        Market intelligence
      </h2>

      <div className="space-y-3">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target={item.url.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="block group"
          >
            <div className="text-[10px] uppercase tracking-wider text-emerald-400">
              {item.source}
            </div>

            <div className="text-sm text-white/80 group-hover:text-white leading-snug mt-0.5 flex gap-2">
              {item.title}
              <ExternalLink className="w-3 h-3 mt-1 shrink-0 opacity-40" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
      }
