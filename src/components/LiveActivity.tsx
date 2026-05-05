import { useEffect, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  BadgeCheck,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const PEOPLE = [
  {
    first: "Richard",
    last: "Baumann",
    country: "Switzerland",
    flag: "🇨🇭",
  },
  {
    first: "Katharina",
    last: "Weber",
    country: "Germany",
    flag: "🇩🇪",
  },
  {
    first: "Christopher",
    last: "Hayes",
    country: "United States",
    flag: "🇺🇸",
  },
  {
    first: "Amelia",
    last: "Thompson",
    country: "United Kingdom",
    flag: "🇬🇧",
  },
  {
    first: "Élodie",
    last: "Lefèvre",
    country: "France",
    flag: "🇫🇷",
  },
  {
    first: "Luca",
    last: "Rinaldi",
    country: "Italy",
    flag: "🇮🇹",
  },
  {
    first: "Sofia",
    last: "Martínez",
    country: "Spain",
    flag: "🇪🇸",
  },
  {
    first: "Jeroen",
    last: "de Vries",
    country: "Netherlands",
    flag: "🇳🇱",
  },
  {
    first: "Marta",
    last: "Kowalska",
    country: "Poland",
    flag: "🇵🇱",
  },
  {
    first: "Henrik",
    last: "Solberg",
    country: "Norway",
    flag: "🇳🇴",
  },
  {
    first: "Lars",
    last: "Andersen",
    country: "Denmark",
    flag: "🇩🇰",
  },
  {
    first: "Ingrid",
    last: "Lindqvist",
    country: "Sweden",
    flag: "🇸🇪",
  },
  {
    first: "Patrick",
    last: "O'Brien",
    country: "Ireland",
    flag: "🇮🇪",
  },
  {
    first: "Nikos",
    last: "Papadopoulos",
    country: "Greece",
    flag: "🇬🇷",
  },
  {
    first: "Mateo",
    last: "Silva",
    country: "Portugal",
    flag: "🇵🇹",
  },
  {
    first: "Aisha",
    last: "Khan",
    country: "United Arab Emirates",
    flag: "🇦🇪",
  },
  {
    first: "Kenji",
    last: "Tanaka",
    country: "Japan",
    flag: "🇯🇵",
  },
  {
    first: "Daniel",
    last: "Carter",
    country: "Canada",
    flag: "🇨🇦",
  },
];

const ACTIONS = [
  {
    t: "deposited",
    icon: ArrowDownLeft,
    color: "text-emerald-400",
    min: 700,
    max: 30000,
    sign: "+",
  },
  {
    t: "withdrew",
    icon: ArrowUpRight,
    color: "text-blue-400",
    min: 500,
    max: 18000,
    sign: "-",
  },
  {
    t: "earned daily profit of",
    icon: TrendingUp,
    color: "text-amber-400",
    min: 45,
    max: 950,
    sign: "+",
  },
  {
    t: "completed KYC verification",
    icon: ShieldCheck,
    color: "text-emerald-400",
    min: 0,
    max: 0,
    sign: "",
  },
  {
    t: "activated Professional plan",
    icon: BadgeCheck,
    color: "text-amber-400",
    min: 5000,
    max: 49000,
    sign: "+",
  },
] as const;

type Item = {
  id: number;
  name: string;
  country: string;
  flag: string;
  action: typeof ACTIONS[number];
  amount: number;
  currency: string;
  time: string;
};

const CURRENCIES = ["€", "$", "£"];

const seed: Item[] = [
  {
    id: 1,
    name: "Richard",
    country: "Switzerland",
    flag: "🇨🇭",
    action: ACTIONS[0],
    amount: 8700,
    currency: "$",
    time: "12s ago",
  },
  {
    id: 2,
    name: "Katharina",
    country: "Germany",
    flag: "🇩🇪",
    action: ACTIONS[1],
    amount: 7000,
    currency: "€",
    time: "26s ago",
  },
  {
    id: 3,
    name: "Christopher",
    country: "United States",
    flag: "🇺🇸",
    action: ACTIONS[0],
    amount: 25000,
    currency: "$",
    time: "41s ago",
  },
  {
    id: 4,
    name: "Élodie",
    country: "France",
    flag: "🇫🇷",
    action: ACTIONS[2],
    amount: 420,
    currency: "€",
    time: "48s ago",
  },
  {
    id: 5,
    name: "Luca",
    country: "Italy",
    flag: "🇮🇹",
    action: ACTIONS[4],
    amount: 12500,
    currency: "€",
    time: "55s ago",
  },
];

const make = (id: number): Item => {
  const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  const person = PEOPLE[Math.floor(Math.random() * PEOPLE.length)];

  const amount =
    action.max === 0
      ? 0
      : Math.round((action.min + Math.random() * (action.max - action.min)) / 100) * 100;

  return {
    id,
    name: person.first,
    country: person.country,
    flag: person.flag,
    action,
    amount,
    currency: CURRENCIES[Math.floor(Math.random() * CURRENCIES.length)],
    time: "just now",
  };
};

export default function LiveActivity() {
  const [items, setItems] = useState<Item[]>(seed);

  useEffect(() => {
    let count = 5;

    const timer = setInterval(() => {
      count += 1;
      setItems(previous => [make(count), ...previous].slice(0, 6));
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-card/60 backdrop-blur border border-line rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="relative flex w-2 h-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Global activity
        </h3>

        <span className="text-[10px] uppercase tracking-wider text-white/40">
          Anonymized
        </span>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-3 text-sm py-2 border-b border-line/40 last:border-0"
            style={{
              opacity: 1 - index * 0.12,
            }}
          >
            <span className="text-lg">{item.flag}</span>

            <item.action.icon
              className={`w-3.5 h-3.5 ${item.action.color} shrink-0`}
            />

            <div className="flex-1 min-w-0">
              <div className="text-white/90 truncate">
                <span className="font-medium">{item.name}</span>{" "}
                <span className="text-white/45">from {item.country}</span>{" "}
                <span className="text-white/50">{item.action.t}</span>{" "}
                {item.amount > 0 && (
                  <span className="font-semibold">
                    {item.currency}
                    {item.amount.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="text-[10px] text-white/35 mt-0.5">
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
      }
