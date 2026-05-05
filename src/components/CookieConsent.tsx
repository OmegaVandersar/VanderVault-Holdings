import { useEffect, useState } from "react";
import { Cookie, X, Settings, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const KEY = "nv_cookie_consent_v1";

type Prefs = {
  necessary: true;
  analytics: boolean;
  preferences: boolean;
};

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const [prefs, setPrefs] = useState<Prefs>({
    necessary: true,
    analytics: true,
    preferences: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem(KEY);

    if (!stored) {
      setShow(true);
    } else {
      try {
        setPrefs(JSON.parse(stored));
      } catch {
        // Ignore invalid cookie preference data.
      }
    }
  }, []);

  const save = (next: Prefs) => {
    localStorage.setItem(KEY, JSON.stringify(next));
    setPrefs(next);
    setShow(false);
    setOpen(false);
  };

  const acceptAll = () =>
    save({
      necessary: true,
      analytics: true,
      preferences: true,
    });

  const rejectAll = () =>
    save({
      necessary: true,
      analytics: false,
      preferences: false,
    });

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-5">
      <div className="max-w-5xl mx-auto bg-card border border-line rounded-2xl shadow-2xl overflow-hidden">
        {!open ? (
          <div className="p-5 sm:p-6 flex flex-col lg:flex-row gap-5 items-start lg:items-center">
            <div className="w-11 h-11 rounded-lg bg-emerald-400/15 grid place-items-center shrink-0">
              <Cookie className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold flex items-center gap-2">
                We respect your privacy
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-400/15 text-emerald-300">
                  GDPR compliant
                </span>
              </h3>

              <p className="mt-1.5 text-sm text-white/65 leading-relaxed">
                NordVault Global Capital uses cookies to operate the platform
                securely, remember your preferences and understand how investors
                use our services. Read our{" "}
                <Link
                  to="/legal/cookies"
                  className="text-emerald-400 hover:underline"
                >
                  Cookie Policy
                </Link>{" "}
                and{" "}
                <Link
                  to="/legal/privacy"
                  className="text-emerald-400 hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => setOpen(true)}
                className="px-4 py-2.5 rounded-md border border-line text-white text-sm hover:bg-white/5 inline-flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Customise
              </button>

              <button
                onClick={rejectAll}
                className="px-4 py-2.5 rounded-md border border-line text-white/80 text-sm hover:bg-white/5"
              >
                Reject all
              </button>

              <button
                onClick={acceptAll}
                className="px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg text-sm font-semibold"
              >
                Accept all
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Cookie preferences
              </h3>

              <button
                onClick={() => setOpen(false)}
                className="text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  k: "necessary",
                  t: "Strictly necessary",
                  d: "Required for login, security, fraud prevention and payment processing. Cannot be disabled.",
                  locked: true,
                },
                {
                  k: "analytics",
                  t: "Analytics",
                  d: "Helps us understand how investors interact with the platform so we can improve it.",
                  locked: false,
                },
                {
                  k: "preferences",
                  t: "Preferences",
                  d: "Remembers your language, currency and display settings between visits.",
                  locked: false,
                },
              ].map(cookie => (
                <div
                  key={cookie.k}
                  className="flex items-start justify-between gap-4 p-4 rounded-md bg-bg/60 border border-line"
                >
                  <div className="flex-1">
                    <div className="text-sm text-white font-medium">
                      {cookie.t}
                    </div>

                    <div className="text-xs text-white/55 mt-1 leading-relaxed">
                      {cookie.d}
                    </div>
                  </div>

                  <label
                    className={`relative inline-flex items-center cursor-pointer shrink-0 ${
                      cookie.locked ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      disabled={cookie.locked}
                      checked={(prefs as any)[cookie.k]}
                      onChange={event =>
                        setPrefs({
                          ...prefs,
                          [cookie.k]: event.target.checked,
                        } as Prefs)
                      }
                      className="sr-only peer"
                    />

                    <div className="w-10 h-5 bg-white/10 peer-checked:bg-emerald-400 rounded-full transition relative">
                      <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5" />
                    </div>
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-end">
              <button
                onClick={rejectAll}
                className="px-4 py-2.5 rounded-md border border-line text-white/80 text-sm hover:bg-white/5"
              >
                Reject all
              </button>

              <button
                onClick={() => save(prefs)}
                className="px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg text-sm font-semibold"
              >
                Save preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
            }
