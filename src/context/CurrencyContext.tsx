import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type Currency = "EUR" | "USD" | "GBP";

const RATES: Record<Currency, number> = {
  EUR: 1,
  USD: 1.09,
  GBP: 0.86,
};

const SYMBOLS: Record<Currency, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

const KEY = "nv_currency";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convert: (eur: number) => number;
  format: (eur: number, digits?: number) => string;
};

const CurrencyCtx = createContext<CurrencyContextValue>({
  currency: "EUR",
  setCurrency: () => {},
  convert: value => value,
  format: value => `€${value.toLocaleString()}`,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const stored = localStorage.getItem(KEY) as Currency | null;
    return stored || "EUR";
  });

  useEffect(() => {
    localStorage.setItem(KEY, currency);
  }, [currency]);

  const value = useMemo<CurrencyContextValue>(() => ({
    currency,
    setCurrency: setCurrencyState,
    convert: eur => eur * RATES[currency],
    format: (eur, digits = 2) =>
      `${SYMBOLS[currency]}${(eur * RATES[currency]).toLocaleString(undefined, {
        maximumFractionDigits: digits,
      })}`,
  }), [currency]);

  return (
    <CurrencyCtx.Provider value={value}>
      {children}
    </CurrencyCtx.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyCtx);
