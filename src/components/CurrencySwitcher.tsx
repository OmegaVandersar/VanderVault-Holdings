import { ChevronDown } from "lucide-react";
import { Currency, useCurrency } from "../context/CurrencyContext";

const OPTIONS: {
  code: Currency;
  label: string;
  flag: string;
}[] = [
  {
    code: "EUR",
    label: "Euro",
    flag: "🇪🇺",
  },
  {
    code: "USD",
    label: "US Dollar",
    flag: "🇺🇸",
  },
  {
    code: "GBP",
    label: "Pound",
    flag: "🇬🇧",
  },
];

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <label className="relative inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white px-2 py-1.5 rounded-md hover:bg-white/5">
      <span>{OPTIONS.find(option => option.code === currency)?.flag}</span>

      <select
        value={currency}
        onChange={event => setCurrency(event.target.value as Currency)}
        className="appearance-none bg-transparent pr-4 focus:outline-none cursor-pointer"
      >
        {OPTIONS.map(option => (
          <option
            key={option.code}
            value={option.code}
            className="bg-bg text-white"
          >
            {option.code}
          </option>
        ))}
      </select>

      <ChevronDown className="w-3 h-3 absolute right-1 pointer-events-none" />
    </label>
  );
}
