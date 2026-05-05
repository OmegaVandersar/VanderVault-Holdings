import { useEffect, useRef } from "react";

export default function TradingViewWidget({
  symbol = "BINANCE:BTCEUR",
  height = 480,
}: {
  symbol?: string;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.innerHTML = "";

    const script = document.createElement("script");

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: "60",
      timezone: "Europe/London",
      theme: "dark",
      style: "1",
      locale: "en",
      toolbar_bg: "#120f08",
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      withdateranges: true,
      allow_symbol_change: true,
      details: true,
      hotlist: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });

    ref.current.appendChild(script);
  }, [symbol]);

  return (
    <div
      className="bg-card border border-line rounded-2xl overflow-hidden"
      style={{ height }}
    >
      <div ref={ref} className="h-full w-full" />
    </div>
  );
}
