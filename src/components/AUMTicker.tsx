import { useEffect, useState } from "react";

const KEY = "nv_aum_baseline";
const START = 4_800_000_000;
const GROWTH_PER_MS = 1200 / 1000;

function getCurrent(): number {
  const stored = localStorage.getItem(KEY);
  let baselineTime = stored ? parseInt(stored, 10) : 0;

  if (!baselineTime || Date.now() < baselineTime) {
    baselineTime = Date.now();
    localStorage.setItem(KEY, String(baselineTime));
  }

  const elapsed = Date.now() - (baselineTime - 30 * 86400000);

  return START + elapsed * GROWTH_PER_MS;
}

export default function AUMTicker() {
  const [value, setValue] = useState(getCurrent());

  useEffect(() => {
    const timer = setInterval(() => setValue(getCurrent()), 1500);

    return () => clearInterval(timer);
  }, []);

  const billions = value / 1_000_000_000;

  const display = billions.toLocaleString("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });

  return (
    <span className="inline-flex items-baseline gap-1 font-mono">
      <span className="text-emerald-400">€</span>
      <span>{display}</span>
      <span className="text-xs text-white/50 font-sans ml-0.5">
        B AUM live
      </span>

      <span className="relative flex w-1.5 h-1.5 ml-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
      </span>
    </span>
  );
}
