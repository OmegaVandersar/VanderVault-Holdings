import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
} from "lucide-react";

import { CONFIG } from "../config";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;

    if (CONFIG.web3formsAccessKey) {
      const formData = new FormData(form);
      formData.append("access_key", CONFIG.web3formsAccessKey);

      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });
      } catch {
        // If email sending fails, user still sees confirmation.
      }
    } else {
      const messages = JSON.parse(localStorage.getItem("nv_msgs") || "[]");
      const formData = new FormData(form);

      messages.unshift({
        id: `m${Date.now()}`,
        from: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("topic") || "General enquiry",
        body: formData.get("message"),
        date: new Date().toISOString(),
        read: false,
      });

      localStorage.setItem("nv_msgs", JSON.stringify(messages));
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <div>
      <section className="border-b border-line bg-radial-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
            Contact us
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            We are here, 24 hours a day.
          </h1>

          <p className="mt-4 text-white/65 max-w-2xl">
            Existing client, prospective investor, partner or journalist —
            choose the channel that suits you best.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card border border-line rounded-2xl p-7">
            <h2 className="text-xl font-semibold text-white">
              Send us a message
            </h2>

            <p className="text-sm text-white/60 mt-1">
              Our investor relations and support team will respond as soon as
              possible.
            </p>

            {sent ? (
              <div className="mt-8 text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />

                <h3 className="mt-4 text-xl font-semibold text-white">
                  Message received.
                </h3>

                <p className="mt-2 text-white/60">
                  A NordVault specialist will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/60">
                      Full name
                    </label>

                    <input
                      name="name"
                      required
                      className="mt-1 w-full bg-bg border border-line rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400/40"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-white/60">
                      Email
                    </label>

                    <input
                      name="email"
                      required
                      type="email"
                      className="mt-1 w-full bg-bg border border-line rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400/40"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/60">
                      Country
                    </label>

                    <select
                      name="country"
                      className="mt-1 w-full bg-bg border border-line rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400/40"
                    >
                      {[
                        "United Kingdom",
                        "Germany",
                        "France",
                        "Switzerland",
                        "United States",
                        "Canada",
                        "United Arab Emirates",
                        "Italy",
                        "Spain",
                        "Netherlands",
                        "Sweden",
                        "Norway",
                        "Denmark",
                        "Other",
                      ].map(country => (
                        <option key={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-white/60">
                      Topic
                    </label>

                    <select
                      name="topic"
                      className="mt-1 w-full bg-bg border border-line rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400/40"
                    >
                      {[
                        "General enquiry",
                        "Account support",
                        "Become an investor",
                        "Institutional / OTC",
                        "KYC support",
                        "Withdrawal support",
                        "Partnership",
                        "Press",
                      ].map(topic => (
                        <option key={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/60">
                    Message
                  </label>

                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="mt-1 w-full bg-bg border border-line rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400/40"
                  />
                </div>

                <button
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-medium disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send message"}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              icon: Mail,
              title: "Email",
              value: CONFIG.contact.email,
              sub: "Investor and account support",
            },
            {
              icon: Phone,
              title: "Phone",
              value: CONFIG.contact.phone,
              sub: "Business hours and priority support",
            },
            {
              icon: MessageSquare,
              title: "Live chat",
              value: "Available on website",
              sub: "Average response within seconds",
            },
            {
              icon: MapPin,
              title: "Headquarters",
              value: CONFIG.offices.globalHeadquarters,
              sub: "London, United Kingdom",
            },
          ].map(item => (
            <div
              key={item.title}
              className="bg-card border border-line rounded-xl p-5"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-400/10 grid place-items-center">
                  <item.icon className="w-4 h-4 text-emerald-400" />
                </div>

                <div>
                  <div className="text-xs text-white/50">
                    {item.title}
                  </div>

                  <div className="text-white font-medium text-sm mt-0.5">
                    {item.value}
                  </div>

                  <div className="text-xs text-white/40 mt-0.5">
                    {item.sub}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-card border border-line rounded-xl p-5">
            <div className="text-xs text-white/50 mb-2">
              Offices
            </div>

            <ul className="text-sm text-white/80 space-y-1.5">
              <li>🇬🇧 London — Global Headquarters</li>
              <li>🇩🇪 Frankfurt — EU Regulatory Office</li>
              <li>🇩🇪 Munich — Treasury</li>
              <li>🇫🇷 Paris — Compliance</li>
              <li>🇸🇪 Stockholm — Technology</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
          }
