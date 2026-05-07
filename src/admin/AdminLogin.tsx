import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Lock,
  Mail,
  Shield,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";

import { store } from "../data/store";
import Logo from "../components/Logo";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  if (store.isAdmin()) return <Navigate to="/admin" replace />;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (store.loginAdmin(email, password)) {
      navigate("/admin");
    } else {
      setErr("Incorrect email or password.");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-bg p-6 relative">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-radial-glow" />

      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <div className="bg-card border border-line rounded-2xl p-7">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-emerald-400 mb-2">
            <Shield className="w-3.5 h-3.5" />
            Admin console
          </div>

          <h1 className="text-2xl font-semibold text-white">
            Restricted access
          </h1>

          <p className="mt-1 text-sm text-white/55">
            Authorised personnel only. All access attempts are monitored.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs text-white/60">
                Admin email
              </label>

              <div className="relative mt-1">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />

                <input
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  required
                  type="email"
                  className="w-full pl-9 pr-3 py-2.5 bg-bg border border-line rounded-md text-sm focus:outline-none focus:border-emerald-400/40"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-white/60">
                Password
              </label>

              <div className="relative mt-1">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />

                <input
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  required
                  type={show ? "text" : "password"}
                  className="w-full pl-9 pr-10 py-2.5 bg-bg border border-line rounded-md text-sm focus:outline-none focus:border-emerald-400/40"
                />

                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                >
                  {show ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {err && (
              <div className="text-xs text-rose-400">
                {err}
              </div>
            )}

            <button className="w-full py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold">
              Sign in to admin
            </button>
          </form>

          <div className="mt-6 p-3 rounded-md bg-emerald-400/5 border border-emerald-400/20 text-[11px] text-white/60 flex items-start gap-2">
            <ShieldCheck className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400" />

            <span>
              This area is monitored. All access attempts are recorded with IP,
              device and timestamp.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
                }
