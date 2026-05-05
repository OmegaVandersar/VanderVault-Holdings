import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Lock } from "lucide-react";
import { auth } from "../data/auth";

export default function ResetPassword() {
  const [params] = useSearchParams();

  const token = params.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setErr("");

    if (password.length < 8) {
      return setErr("Password must be at least 8 characters.");
    }

    if (password !== confirm) {
      return setErr("Passwords do not match.");
    }

    try {
      auth.resetPassword(token, password);
      setOk(true);
    } catch (error: any) {
      setErr(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {ok ? (
        <>
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-5" />

          <h1 className="text-3xl font-semibold text-white">
            Password updated
          </h1>

          <p className="mt-2 text-sm text-white/60">
            Your password has been changed securely.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex px-5 py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold"
          >
            Sign in
          </Link>
        </>
      ) : (
        <>
          <Lock className="w-12 h-12 text-emerald-400 mb-5" />

          <h1 className="text-3xl font-semibold text-white">
            Choose a new password
          </h1>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <input
              type="password"
              required
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="New password"
              className="w-full bg-card border border-line rounded-md px-3 py-2.5 text-sm"
            />

            <input
              type="password"
              required
              value={confirm}
              onChange={event => setConfirm(event.target.value)}
              placeholder="Confirm password"
              className="w-full bg-card border border-line rounded-md px-3 py-2.5 text-sm"
            />

            {err && (
              <div className="text-xs text-rose-400">
                {err}
              </div>
            )}

            <button className="w-full py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold">
              Reset password
            </button>
          </form>
        </>
      )}
    </div>
  );
            }
