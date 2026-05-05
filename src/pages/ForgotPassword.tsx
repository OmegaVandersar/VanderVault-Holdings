import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Copy, Mail } from "lucide-react";
import { auth } from "../data/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const token = auth.requestPasswordReset(email);

    if (token) {
      setLink(
        `${window.location.origin}${window.location.pathname}#/reset-password?token=${token}`
      );
    }

    setSent(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Mail className="w-12 h-12 text-emerald-400 mb-5" />

      <h1 className="text-3xl font-semibold text-white">
        Reset your password
      </h1>

      <p className="mt-2 text-sm text-white/60">
        Enter your email address and we will send a secure 30-minute reset link.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <input
          required
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder="you@email.com"
          className="w-full bg-card border border-line rounded-md px-3 py-2.5 text-sm"
        />

        <button className="w-full py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold">
          Send reset link
        </button>
      </form>

      {sent && (
        <div className="mt-6 bg-card border border-line rounded-xl p-4">
          <div className="text-sm text-white flex gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
            If this email exists, a reset link has been sent.
          </div>

          {link && (
            <div className="mt-3 flex gap-2">
              <input
                readOnly
                value={link}
                className="flex-1 bg-bg border border-line rounded px-2 py-2 text-[11px] font-mono"
              />

              <button
                onClick={() => {
                  navigator.clipboard.writeText(link);
                  setCopied(true);
                }}
                className="px-3 border border-line rounded text-white/70"
              >
                {copied ? "✓" : <Copy className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      )}

      <Link
        to="/login"
        className="mt-6 block text-sm text-white/50 hover:text-white"
      >
        ← Back to login
      </Link>
    </div>
  );
}
