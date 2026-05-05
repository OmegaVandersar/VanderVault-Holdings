import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { FAQS } from "../data/site";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-radial-glow" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
            Frequently asked questions
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            Answers to common investor questions.
          </h1>

          <p className="mt-4 text-white/65">
            Review the most common questions before opening an account or
            allocating capital.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <button
              key={index}
              onClick={() => setOpen(open === index ? null : index)}
              className="w-full text-left bg-card border border-line rounded-xl p-5 hover:border-emerald-400/30 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />

                  <span className="text-white font-medium">
                    {faq.q}
                  </span>
                </div>

                <ChevronDown
                  className={`w-5 h-5 text-white/40 transition shrink-0 ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              {open === index && (
                <p className="mt-4 pl-8 text-sm text-white/70 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </button>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-400/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white">
            Still have questions?
          </h3>

          <p className="mt-2 text-white/70">
            Talk to a NordVault specialist before opening your investor account.
          </p>

          <Link
            to="/contact"
            className="mt-5 inline-flex px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-medium"
          >
            Contact support
          </Link>
        </div>
      </section>
    </div>
  );
            }
