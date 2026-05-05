import { useMemo, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Copy, Mail, ShieldCheck } from "lucide-react";
import { auth } from "../data/auth";

export default function VerifyEmail() {
  const me = auth.current();
  const [params] = useSearchParams();

  const token = params.get("token") || "";

  const [msg, setMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const verified = useMemo(() => {
    if (!token) return false;

    try {
      auth.verifyEmail(token);
      return true;
    } catch {
      return false;
    }
  }, [token]);

  if (!me && !token) return <Navigate to="/login" replace />;

  const link = me?.emailVerificationToken
    ? `${window.location.origin}${window.location.pathname}#/verify-email?token=${me.emailVerificationToken}`
    : "";

  const copy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);

    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      {verified ? (
        <>
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-5" />

          <h1 className="text-3xl font-semibold text-white">
            Email verified
          </h1>

          <p className="mt-3 text-white/65">
            Your email address is confirmed. You can now continue your investor
            onboarding.
          </p>

          <Link
            to="/dashboard"
            className="mt-7 inline-flex px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold"
          >
            Go to dashboard
          </Link>
        </>
      ) : (
        <>
          <Mail className="w-16 h-16 text-emerald-400 mx-auto mb-5" />

          <h1 className="text-3xl font-semibold text-white">
            Verify your email
          </h1>

          <p className="mt-3 text-white/65">
            We sent a secure verification link to your email. Click it to
            activate deposits, withdrawals and account notifications.
          </p>

          {link && (
            <div className="mt-6 bg-card border border-line rounded-xl p-4 text-left">
              <div className="text-xs text-white/50 mb-2">
                Your secure verification link
              </div>

              <div className="flex gap-2">
                <input
                  readOnly
                  value={link}
                  className="flex-1 bg-bg border-line rounded-md px-3 py-2 text-xs text-white font-mono"
                />

                <button
                  onClick={copy}
                  className="px-3 rounded-md border border-line text-white/70"
                >
                  {copied ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <p className="mt-2 text-[11px] text-white/40">
                When email sending is connected, this link is sent automatically.
              </p>
            </div>
          )}

          {msg && (
            <div className="mt-4 text-xs text-emerald-400">
              {msg}
            </div>
          )}

          <button
            onClick={() =>
              setMsg("Verification email queued. Please check your inbox and spam folder.")
            }
            className="mt-6 px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold inline-flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            Resend verification email
          </button>
        </>
      )}
    </div>
  );
            }
