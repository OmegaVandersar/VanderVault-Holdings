import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import LangSwitcher from "./LangSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import ConnectWallet from "./ConnectWallet";

const links = [
  { to: "/", label: "Home" },
  { to: "/plans", label: "Plans" },
  { to: "/markets", label: "Markets" },
  { to: "/affiliate", label: "Affiliate" },
  { to: "/academy", label: "Academy" },
  { to: "/news", label: "News" },
  { to: "/regulation", label: "Regulation" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "backdrop-blur-xl bg-bg/80 border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-md text-sm transition ${
                    isActive
                      ? "text-white bg-white/5"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <LangSwitcher />
            <CurrencySwitcher />
            <ConnectWallet compact />

            <Link
              to="/login"
              className="text-sm px-4 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/5 transition"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="text-sm px-4 py-2 rounded-md font-medium bg-gradient-to-r from-emerald-400 to-blue-500 text-bg hover:opacity-90 transition shadow-lg shadow-emerald-500/20"
            >
              Open account
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md text-white hover:bg-white/5"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-bg-elev">
          <div className="px-4 py-3 space-y-1">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-md text-sm ${
                    isActive
                      ? "text-white bg-white/5"
                      : "text-white/70 hover:bg-white/5"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-2 flex items-center justify-between gap-2">
              <LangSwitcher compact />
              <CurrencySwitcher />
              <ConnectWallet compact />
            </div>

            <div className="pt-2 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                className="text-center text-sm py-2.5 rounded-md border border-line text-white/80"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="text-center text-sm py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-medium"
              >
                Open account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
            }
