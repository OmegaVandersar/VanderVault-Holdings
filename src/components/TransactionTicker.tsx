import {
  ArrowDownLeft,
  ArrowUpRight,
  BadgeCheck,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const feed = [
  {
    flag: "🇨🇭",
    name: "Richard",
    country: "Switzerland",
    action: "deposited",
    value: "$8,700",
    icon: ArrowDownLeft,
  },
  {
    flag: "🇩🇪",
    name: "Katharina",
    country: "Germany",
    action: "withdrew",
    value: "€7,000",
    icon: ArrowUpRight,
  },
  {
    flag: "🇺🇸",
    name: "Christopher",
    country: "United States",
    action: "deposited",
    value: "$25,000",
    icon: ArrowDownLeft,
  },
  {
    flag: "🇬🇧",
    name: "Amelia",
    country: "United Kingdom",
    action: "activated Institutional plan",
    value: "£52,000",
    icon: BadgeCheck,
  },
  {
    flag: "🇫🇷",
    name: "Élodie",
    country: "France",
    action: "earned daily profit",
    value: "€420",
    icon: TrendingUp,
  },
  {
    flag: "🇮🇹",
    name: "Luca",
    country: "Italy",
    action: "completed KYC",
    value: "verified",
    icon: ShieldCheck,
  },
  {
    flag: "🇪🇸",
    name: "Sofia",
    country: "Spain",
    action: "deposited",
    value: "€12,400",
    icon: ArrowDownLeft,
  },
  {
    flag: "🇳🇱",
    name: "Jeroen",
    country: "Netherlands",
    action: "withdrew",
    value: "€4,900",
    icon: ArrowUpRight,
  },
  {
    flag: "🇦🇪",
    name: "Aisha",
    country: "UAE",
    action: "activated Professional plan",
    value: "$18,000",
    icon: BadgeCheck,
  },
  {
    flag: "🇯🇵",
    name: "Kenji",
    country: "Japan",
    action: "deposited",
    value: "$31,200",
    icon: ArrowDownLeft,
  },
];

export default function TransactionTicker() {
  const items = [...feed, ...feed];

  return (
    <div className="w-full overflow-hidden border-b border-line bg-black/70 backdrop-blur">
      <div className="flex animate-ticker whitespace-nowrap py-2.5">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-5 text-xs"
          >
            <span className="text-base">{item.flag}</span>

            <item.icon className="w-3.5 h-3.5 text-amber-400" />

            <span className="text-white font-medium">{item.name}</span>

            <span className="text-white/45">
              from {item.country}
            </span>

            <span className="text-white/60">
              {item.action}
            </span>

            <span className="text-amber-300 font-semibold">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
  }
