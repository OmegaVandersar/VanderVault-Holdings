import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PriceTicker from "./PriceTicker";
import TransactionTicker from "./TransactionTicker";
import LiveChat from "./LiveChat";
import VisitorTracker from "./VisitorTracker";
import CookieConsent from "./CookieConsent";
import FloatingChat from "./FloatingChat";
import SessionTimeout from "./SessionTimeout";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <VisitorTracker />
      <SessionTimeout />
      <PriceTicker />
      <TransactionTicker />
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <FloatingChat />
      <LiveChat />
      <CookieConsent />
    </div>
  );
}
