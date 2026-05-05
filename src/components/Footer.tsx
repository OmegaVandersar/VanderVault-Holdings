import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Send, Globe, Shield, Zap } from "lucide-react";
import Logo from "./Logo";
import { CONFIG } from "../config";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg-elev mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Logo />

            <p className="mt-4 text-sm text-white/60 max-w-sm leading-relaxed">
              {CONFIG.brand.legalName} is a global digital asset investment
              company headquartered in London with an EU regulatory office in
              Frankfurt, serving private and institutional investors since{" "}
              {CONFIG.brand.foundedYear}.
            </p>

            <div className="mt-5 space-y-2.5 text-sm text-white/60">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                <span>{CONFIG.contact.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>{CONFIG.contact.email}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{CONFIG.contact.phone}</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              {[Globe, Shield, Send, Zap].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 grid place-items-center rounded-md border border-line text-white/60 hover:text-white hover:border-white/20 transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>

            <ul className="space-y-2.5 text-sm text-white/60">
              <li><Link to="/plans" className="hover:text-white">Investment Plans</Link></li>
              <li><Link to="/markets" className="hover:text-white">Live Markets</Link></li>
              <li><Link to="/deposit" className="hover:text-white">Deposit Funds</Link></li>
              <li><Link to="/affiliate" className="hover:text-white">Affiliate Program</Link></li>
              <li><Link to="/academy" className="hover:text-white">Academy</Link></li>
              <li><Link to="/news" className="hover:text-white">News</Link></li>
              <li><Link to="/press" className="hover:text-white">Press & Awards</Link></li>
              <li><Link to="/regulation" className="hover:text-white">Regulation & Certificate</Link></li>
              <li><Link to="/security" className="hover:text-white">Security</Link></li>
              <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link to="/quiz" className="hover:text-white">Risk Profile Quiz</Link></li>
              <li><Link to="/api" className="hover:text-white">API Documentation</Link></li>
              <li><Link to="/status" className="hover:text-white">System Status</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>

            <ul className="space-y-2.5 text-sm text-white/60">
              <li><Link to="/legal/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link to="/legal/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/legal/aml" className="hover:text-white">AML & KYC Policy</Link></li>
              <li><Link to="/legal/risk" className="hover:text-white">Risk Disclosure</Link></li>
              <li><Link to="/legal/cookies" className="hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Newsletter
            </h4>

            <p className="text-sm text-white/60 mb-3">
              Weekly market intelligence, delivered every Monday.
            </p>

            <form onSubmit={event => event.preventDefault()} className="flex">
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="flex-1 bg-bg border border-line rounded-l-md px-3 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-emerald-400/50"
              />

              <button className="px-3 rounded-r-md bg-emerald-400 text-bg hover:opacity-90">
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {["BaFin", "MiCA", "GwG AML", "GDPR", "ISO 27001"].map(badge => (
                <span
                  key={badge}
                  className="text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-line text-white/50"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-line flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-white/40">
          <div>
            © {new Date().getFullYear()} {CONFIG.brand.legalName}. All rights
            reserved. {CONFIG.brand.registrationNumber}.
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>London Headquarters</span>
            <span>•</span>
            <span>Frankfurt EU Regulatory Office</span>
            <span>•</span>
            <span>{CONFIG.regulatory.regulator}</span>
          </div>
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-white/35">
          Risk Warning: Investing in digital assets involves significant risk of
          loss and is not suitable for every investor. The value of
          cryptocurrencies can fluctuate, and as a result, clients may lose more
          than their original investment. NordVault Global Capital does not
          provide tax, legal or investment advice. Please consult an independent
          advisor before investing. Past performance is not indicative of future
          results.
        </p>
      </div>
    </footer>
  );
      }
