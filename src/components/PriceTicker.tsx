import { useEffect, useState } from "react";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  image?: string;
};

const FALLBACK: Coin[] = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", price: 96420.55, change: 1.82 },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", price: 3380.12, change: 2.41 },
  { id: "tether", symbol: "USDT", name: "Tether", price: 1.0, change: 0.01 },
  { id: "binancecoin", symbol: "BNB", name: "BNB", price: 712.4, change: -0.55 },
  { id: "solana", symbol: "SOL", name: "Solana", price: 198.33, change: 4.12 },
  { id: "ripple", symbol: "XRP", name: "XRP", price: 2.34, change: 3.06 },
  { id: "cardano", symbol: "ADA", name: "Cardano", price: 0.91, change: -1.21 },
  { id: "dogecoin", symbol: "DOGE", name: "Dogecoin", price: 0.385, change: 5.78 },
  { id: "polkadot", symbol: "DOT", name: "Polkadot", price: 7.65, change: 1.04 },
  { id: "chainlink", symbol: "LINK", name: "Chainlink", price: 22.81, change: 2.66 },
];

export default function PriceTicker() {
  const [coins, setCoins] = useState<Coin[]>(FALLBACK);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=20&page=1&sparkline=false"
        );

        if (!response.ok) return;

        const data = await response.json();

        setCoins(
          data.map((coin: any) => ({
            id: coin.id,
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            price: coin.current_price,
            change: coin.price_change_percentage_24h ?? 0,
            image: coin.image,
          }))
        );
      } catch {
        // Use fallback prices when API is unavailable.
      }
    };

    fetchPrices();

    const timer = setInterval(fetchPrices, 60000);

    return () => clearInterval(timer);
  }, []);

  const items = [...coins, ...coins];

  return (
    <div className="w-full overflow-hidden border-y border-line bg-bg-elev/60">
      <div className="flex animate-ticker whitespace-nowrap py-2.5">
        {items.map((coin, index) => (
          <div key={index} className="flex items-center gap-2 px-5 text-xs">
            {coin.image ? (
              <img src={coin.image} alt="" className="w-4 h-4 rounded-full" />
            ) : (
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500" />
            )}

            <span className="font-semibold text-white">{coin.symbol}</span>

            <span className="text-white/70">
              €{coin.price < 1
                ? coin.price.toFixed(4)
                : coin.price.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
            </span>

            <span className={coin.change >= 0 ? "text-emerald-400" : "text-rose-400"}>
              {coin.change >= 0 ? "▲" : "▼"} {Math.abs(coin.change).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
         }
