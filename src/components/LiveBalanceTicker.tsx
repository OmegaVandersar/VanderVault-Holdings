import { useEffect, useMemo, useState } from "react";
import { auth, Account } from "../data/auth";
import { useCurrency } from "../context/CurrencyContext";

export function liveBalance(user: Account) {
  const plans = user.activeInvestments || [];

  const earned = plans.reduce((sum, plan) => {
    const elapsedDays = Math.max(
      0,
      (Date.now() - +new Date(plan.startedAt)) / 86400000
    );

    const days = Math.min(elapsedDays, plan.duration);

    return sum + (plan.amount * (plan.daily / 100) * days);
  }, 0);

  return user.balance + earned;
}

export default function LiveBalanceTicker({ user }: { user: Account }) {
  const { format } = useCurrency();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);

    return () => clearInterval(timer);
  }, []);

  const value = useMemo(() => liveBalance(user), [user, now]);

  useEffect(() => {
    if ((user.activeInvestments || []).length) {
      auth.update(user.id, {
        totalProfit: Math.max(user.totalProfit, value - user.balance),
      });
    }
  }, [now]);

  return <>{format(value, 2)}</>;
    }
