import { useEffect, useState } from "react";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import TradingViewWidget from "../components/TradingViewWidget";

type Market = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d?: {
    price: number[];
  };
};

const FALLBACK: Market[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "",
    current_price: 96420,
    price_change_percentage_24h: 1.82,
    market_cap: 1900000000000,
    total_volume: 38000000000,
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "",
    current_price: 3380,
    price_change_percentage_24h: 2.41,
    market_cap: 410000000000,
    total_volume: 21000000000,
  },
  {
    id: "tether",
    symbol: "usdt",
    name: "Tether",
    image: "",
    current_price: 1,
    price_change_percentage_24h: 0.01,
    market_cap: 138000000000,
    total_volume: 65000000000,
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "",
    current_price: 198,
    price_change_percentage_24h: 4.12,
    market_cap: 92000000000,
    total_volume: 4400000000,
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image: "",
    current_price: 712,
    price_change_percentage_24h: -0.55,
    market_cap: 105000000000,
    total_volume: 1900000000,
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image: "",
    current_price: 2.34,
    price_change_percentage_24h: 3.06,
    market_cap: 134000000000,
    total_volume: 5800000000,
  },
];

const formatMoney = (number: number) => {
  if (number >= 1e9) return `€${(number / 1e9).toFixed(2)}B`;
  if (number >= 1e6) return `€${(number / 1e6).toFixed(2)}M`;

  return `€${number.toLocaleString()}`;
};

export default function Markets() {
  const [markets, setMarkets] = useState<Market[]>(FALLBACK);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h"
    )
      .then(response => (response.ok ? response.json() : null))
      .then(data => {
        if (data) setMarkets(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = markets.filter(market =>
    market.name.toLowerCase().includes(query.toLowerCase()) ||
    market.symbol.toLowerCase().includes(query.toLowerCase())
  );

  const gainers = [...markets]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 4);

  const losers = [...markets]
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 4);

  return (
    <div>
      <section className="border-b border-line bg-radial-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
            Live markets
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            Cryptocurrency prices in real time.
          </h1>

          <p className="mt-4 text-white/60 max-w-2xl">
            Top digital assets by market capitalisation. Prices are shown in EUR
            and update through live market data providers.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Live BTC/EUR chart
          </h2>

          <TradingViewWidget symbol="BINANCE:BTCEUR" height={520} />
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <div className="bg-card border border-line rounded-xl p-5">
            <div className="flex items-center gap-2 text-emerald-400 text-xs uppercase tracking-wider mb-4">
              <TrendingUp className="w-4 h-4" />
              Top gainers (24h)
            </div>

            <div className="space-y-2.5">
              {gainers.map(market => (
                <div
                  key={market.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-3">
                    {market.image ? (
                      <img
                        src={market.image}
                        alt={market.name}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500" />
                    )}

                    <span className="text-white">{market.name}</span>

                    <span className="text-white/40 text-xs uppercase">
                      {market.symbol}
                    </span>
                  </div>

                  <span className="text-emerald-400 font-medium">
                    +{market.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-line rounded-xl p-5">
            <div className="flex items-center gap-2 text-rose-400 text-xs uppercase tracking-wider mb-4">
              <TrendingDown className="w-4 h-4" />
              Top losers (24h)
            </div>

            <div className="space-y-2.5">
              {losers.map(market => (
                <div
                  key={market.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-3">
                    {market.image ? (
                      <img
                        src={market.image}
                        alt={market.name}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500" />
                    )}

                    <span className="text-white">{market.name}</span>

                    <span className="text-white/40 text-xs uppercase">
                      {market.symbol}
                    </span>
                  </div>

                  <span className="text-rose-400 font-medium">
                    {market.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />

            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search assets..."
              className="w-full pl-9 pr-3 py-2.5 bg-card border border-line rounded-md text-sm focus:outline-none focus:border-emerald-400/40"
            />
          </div>

          {loading && (
            <span className="text-xs text-white/40">
              Loading live data...
            </span>
          )}
        </div>

        <div className="overflow-x-auto bg-card border border-line rounded-xl">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-white/50">
                <th className="text-left py-4 px-5">#</th>
                <th className="text-left py-4 px-5">Asset</th>
                <th className="text-right py-4 px-5">Price</th>
                <th className="text-right py-4 px-5">24h</th>
                <th className="text-right py-4 px-5">Market Cap</th>
                <th className="text-right py-4 px-5">Volume (24h)</th>
                <th className="text-right py-4 px-5">Last 7d</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((market, index) => (
                <tr
                  key={market.id}
                  className="border-b border-line/50 last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="py-3.5 px-5 text-white/40">
                    {index + 1}
                  </td>

                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      {market.image ? (
                        <img
                          src={market.image}
                          alt={market.name}
                          className="w-7 h-7 rounded-full"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500" />
                      )}

                      <div>
                        <div className="text-white font-medium">
                          {market.name}
                        </div>

                        <div className="text-xs text-white/40 uppercase">
                          {market.symbol}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-5 text-right text-white">
                    €
                    {market.current_price < 1
                      ? market.current_price.toFixed(4)
                      : market.current_price.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                  </td>

                  <td
                    className={`py-3.5 px-5 text-right font-medium ${
                      market.price_change_percentage_24h >= 0
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {market.price_change_percentage_24h >= 0 ? "+" : ""}
                    {market.price_change_percentage_24h.toFixed(2)}%
                  </td>

                  <td className="py-3.5 px-5 text-right text-white/70">
                    {formatMoney(market.market_cap)}
                  </td>

                  <td className="py-3.5 px-5 text-right text-white/70">
                    {formatMoney(market.total_volume)}
                  </td>

                  <td className="py-3.5 px-5">
                    <div className="h-10 w-28 ml-auto">
                      {market.sparkline_in_7d?.price && (
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={market.sparkline_in_7d.price.map(
                              (price, pointIndex) => ({
                                pointIndex,
                                price,
                              })
                            )}
                          >
                            <Line
                              type="monotone"
                              dataKey="price"
                              stroke={
                                market.price_change_percentage_24h >= 0
                                  ? "#f5c542"
                                  : "#fb7185"
                              }
                              strokeWidth={1.5}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="p-10 text-center text-white/40 text-sm">
              No assets match your search.
            </div>
          )}
        </div>

        <p className="text-xs text-white/40 mt-4">
          Market data is provided for informational purposes only and does not
          constitute investment advice.
        </p>
      </section>
    </div>
  );
    }
