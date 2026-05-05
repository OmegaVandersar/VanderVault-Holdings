import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Lock,
  Mail,
  User,
  Globe,
  AlertCircle,
  Smartphone,
  Wallet,
  Phone,
} from "lucide-react";

import Logo from "../components/Logo";
import { auth } from "../data/auth";
import { CONFIG } from "../config";
import { verifyCode } from "../utils/totp";

const COUNTRIES = [
  "Germany",
  "Austria",
  "Switzerland",
  "France",
  "Italy",
  "Spain",
  "Portugal",
  "Netherlands",
  "Belgium",
  "Luxembourg",
  "United Kingdom",
  "Ireland",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Poland",
  "Czech Republic",
  "Greece",
  "Estonia",
  "Latvia",
  "Lithuania",
  "Romania",
  "Bulgaria",
  "Hungary",
  "Slovenia",
  "Slovakia",
  "Croatia",
  "Cyprus",
  "Malta",
  "Iceland",
  "United States",
  "Canada",
  "United Arab Emirates",
  "Japan",
  "Other",
];

export function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState("");
  const [stage, setStage] = useState<"creds" | "2fa" | "device">("creds");

  const [pendingId, setPendingId] = useState<string | null>(null);
  const [pendingSecret, setPendingSecret] = useState<string | null>(null);

  const [code, setCode] = useState("");
  const [deviceCode, setDeviceCode] = useState("");
  const [geo, setGeo] = useState<any>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const navigate = useNavigate();

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErr("");

    try {
      const account = auth.login(email, password);

      let currentGeo: any = null;

      try {
        const response = await fetch("https://ipapi.co/json/");
        if (response.ok) currentGeo = await response.json();
      } catch {
        // Geolocation is optional.
      }

      if (account.twoFA && account.twoFASecret) {
        setPendingId(account.id);
        setPendingSecret(account.twoFASecret);
        setBackupCodes(account.twoFABackupCodes || []);
        setStage("2fa");
      } else if (
        (account.loginHistory || []).some(
          history =>
            history.country &&
            currentGeo?.country_name &&
            history.country !== currentGeo.country_name
        )
      ) {
        setPendingId(account.id);
        setGeo(currentGeo);
        setDeviceCode(String(Math.floor(100000 + Math.random() * 900000)));
        setStage("device");
      } else if (!account.emailVerified) {
        auth.completeLogin(account.id, {
          ip: currentGeo?.ip,
          country: currentGeo?.country_name,
          city: currentGeo?.city,
        });

        navigate("/verify-email");
      } else {
        auth.completeLogin(account.id, {
          ip: currentGeo?.ip,
          country: currentGeo?.country_name,
          city: currentGeo?.city,
        });

        navigate("/dashboard");
      }
    } catch (error: any) {
      setErr(error.message);
    }
  };

  const submitDevice = (event: React.FormEvent) => {
    event.preventDefault();

    if (code !== deviceCode) {
      return setErr("Incorrect security code.");
    }

    if (!pendingId) {
      return setErr("Session expired. Please sign in again.");
    }

    auth.completeLogin(pendingId, {
      ip: geo?.ip,
      country: geo?.country_name,
      city: geo?.city,
    });

    navigate("/settings");
  };

  const submit2FA = (event: React.FormEvent) => {
    event.preventDefault();
    setErr("");

    if (!pendingId || !pendingSecret) {
      return setErr("Session expired. Please sign in again.");
    }

    const valid =
      verifyCode(pendingSecret, code) ||
      backupCodes.includes(code.toUpperCase());

    if (!valid) {
      return setErr("Incorrect code. Please try again.");
    }

    if (backupCodes.includes(code.toUpperCase())) {
      auth.update(pendingId, {
        twoFABackupCodes: backupCodes.filter(item => item !== code.toUpperCase()),
      });
    }

    auth.completeLogin(pendingId);
    navigate("/dashboard");
  };

  if (stage === "device") {
    return (
      <AuthShell
        title="New location verification"
        subtitle="We detected a login from a new country or device. Enter the security code to continue."
      >
        <form onSubmit={submitDevice} className="space-y-4">
          <div className="p-4 rounded-md border border-amber-400/20 bg-amber-400/5 text-sm text-amber-100/80">
            Security code:{" "}
            <strong className="text-white font-mono">{deviceCode}</strong>
            <br />
            Location: {geo?.city || "Unknown"},{" "}
            {geo?.country_name || "Unknown"}. After verification, enable 2FA for
            stronger protection.
          </div>

          <input
            value={code}
            onChange={event =>
              setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="000000"
            autoFocus
            inputMode="numeric"
            className="w-full bg-bg border border-line rounded-md px-3 py-4 text-center text-2xl font-mono tracking-widest"
          />

          {err && <ErrBox msg={err} />}

          <button className="w-full py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold">
            Verify device
          </button>
        </form>
      </AuthShell>
    );
  }

  if (stage === "2fa") {
    return (
      <AuthShell
        title="Two-factor verification"
        subtitle="Enter the 6-digit code from your authenticator app or a backup code."
      >
        <form onSubmit={submit2FA} className="space-y-4">
          <div className="flex justify-center my-4">
            <div className="w-16 h-16 rounded-full bg-emerald-400/10 grid place-items-center">
              <Smartphone className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          <input
            value={code}
            onChange={event => setCode(event.target.value.toUpperCase().slice(0, 11))}
            placeholder="000000"
            autoFocus
            inputMode="numeric"
            className="w-full bg-bg border border-line rounded-md px-3 py-4 text-center text-2xl font-mono tracking-widest focus:outline-none focus:border-emerald-400/40"
          />

          {err && <ErrBox msg={err} />}

          <button className="w-full py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold">
            Verify & sign in
          </button>

          <button
            type="button"
            onClick={() => {
              setStage("creds");
              setCode("");
              setErr("");
            }}
            className="w-full text-xs text-white/50 hover:text-white"
          >
            ← Cancel and use a different account
          </button>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your NordVault account"
    >
      <form onSubmit={submit} className="space-y-4">
        <Field
          icon={Mail}
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@email.com"
        />

        <div>
          <label className="text-xs text-white/60">Password</label>

          <div className="relative mt-1">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />

            <input
              required
              value={password}
              onChange={event => setPassword(event.target.value)}
              type={show ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-9 pr-10 py-2.5 bg-bg border border-line rounded-md text-sm focus:outline-none focus:border-emerald-400/40"
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              {show ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {err && <ErrBox msg={err} />}

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-white/60">
            <input type="checkbox" className="accent-emerald-400" />
            Remember me
          </label>

          <Link
            className="text-emerald-400 hover:text-emerald-300"
            to="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>

        <button className="w-full py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold">
          Sign in securely
        </button>

        <p className="text-center text-sm text-white/50">
          No account?{" "}
          <Link to="/register" className="text-emerald-400">
            Open one in 60 seconds
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export function Register() {
  const [params] = useSearchParams();
  const ref = params.get("ref") || "";

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "Germany",
    phone: "",
    primaryWalletAddress: "",
  });

  const [err, setErr] = useState("");
  const [agree, setAgree] = useState(false);
  const [securityAgree, setSecurityAgree] = useState(false);

  const [captchaA] = useState(() => Math.floor(3 + Math.random() * 7));
  const [captchaB] = useState(() => Math.floor(2 + Math.random() * 8));
  const [captcha, setCaptcha] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setErr("");

    if (!agree) return setErr("Please accept the terms to continue.");
    if (!securityAgree) return setErr("Please acknowledge KYC and 2FA security requirements.");
    if (Number(captcha) !== captchaA + captchaB) {
      return setErr("Security check failed. Please solve the anti-bot question.");
    }
    if (data.password.length < 8) {
      return setErr("Password must be at least 8 characters.");
    }

    try {
      const account = auth.signup({
        ...data,
        referredBy: ref || undefined,
      });

      auth.completeLogin(account.id);
      navigate("/verify-email");
    } catch (error: any) {
      setErr(error.message);
    }
  };

  const update = (key: string) => (value: string) =>
    setData({
      ...data,
      [key]: value,
    });

  return (
    <AuthShell
      title="Open your account"
      subtitle={`Free to open. Min. deposit €${CONFIG.plans[0].minimum}. KYC takes 5 minutes.`}
    >
      {ref && (
        <div className="mb-4 text-xs px-3 py-2 rounded-md bg-emerald-400/10 border border-emerald-400/30 text-emerald-300">
          Referred by code <strong>{ref}</strong> — you and your referrer both
          get a referral bonus on your first deposit.
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field
            icon={User}
            label="First name"
            placeholder="Anna"
            value={data.firstName}
            onChange={update("firstName")}
          />

          <Field
            icon={User}
            label="Last name"
            placeholder="Schmidt"
            value={data.lastName}
            onChange={update("lastName")}
          />
        </div>

        <Field
          icon={Mail}
          label="Email"
          type="email"
          placeholder="you@email.com"
          value={data.email}
          onChange={update("email")}
        />

        <Field
          icon={Phone}
          label="Phone number"
          type="tel"
          placeholder="+44 7700 900123"
          value={data.phone}
          onChange={update("phone")}
        />

        <Field
          icon={Wallet}
          label="Primary withdrawal wallet address"
          placeholder="BTC, ETH, USDT or SOL wallet address"
          value={data.primaryWalletAddress}
          onChange={update("primaryWalletAddress")}
        />

        <div>
          <label className="text-xs text-white/60">
            Country of residence
          </label>

          <div className="relative mt-1">
            <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />

            <select
              value={data.country}
              onChange={event => update("country")(event.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-bg border border-line rounded-md text-sm focus:outline-none focus:border-emerald-400/40"
            >
              {COUNTRIES.map(country => (
                <option key={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Field
          icon={Lock}
          label="Password"
          type="password"
          placeholder="Min. 8 characters"
          value={data.password}
          onChange={update("password")}
        />

        <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3 text-xs text-white/70 leading-relaxed">
          Account security requirements: email verification, phone number, KYC
          identity review, wallet address screening and two-factor
          authentication are required before deposits and withdrawals are
          approved.
        </div>

        <div>
          <label className="text-xs text-white/60">
            Anti-bot security check: {captchaA} + {captchaB} = ?
          </label>

          <input
            required
            inputMode="numeric"
            value={captcha}
            onChange={event => setCaptcha(event.target.value)}
            className="mt-1 w-full bg-bg border border-line rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-400/40"
          />
        </div>

        {err && <ErrBox msg={err} />}

        <label className="flex items-start gap-2 text-xs text-white/60">
          <input
            type="checkbox"
            checked={agree}
            onChange={event => setAgree(event.target.checked)}
            className="mt-0.5 accent-emerald-400"
          />

          <span>
            I agree to the{" "}
            <Link to="/legal/terms" className="text-emerald-400">
              Terms
            </Link>
            ,{" "}
            <Link to="/legal/privacy" className="text-emerald-400">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/legal/risk" className="text-emerald-400">
              Risk Disclosure
            </Link>
            .
          </span>
        </label>

        <label className="flex items-start gap-2 text-xs text-white/60">
          <input
            type="checkbox"
            checked={securityAgree}
            onChange={event => setSecurityAgree(event.target.checked)}
            className="mt-0.5 accent-emerald-400"
          />

          <span>
            I understand that KYC verification and 2FA setup are required to
            activate my investor account and request withdrawals.
          </span>
        </label>

        <button className="w-full py-2.5 rounded-md bg-gradient-to-r from-emerald-400 to-blue-500 text-bg font-semibold">
          Create account
        </button>

        <p className="text-center text-sm text-white/50">
          Already a client?{" "}
          <Link to="/login" className="text-emerald-400">
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

function ErrBox({ msg }: { msg: string }) {
  return (
    <div className="flex gap-2 text-xs px-3 py-2 rounded-md bg-rose-400/10 border border-rose-400/30 text-rose-300">
      <AlertCircle className="w-4 h-4 shrink-0" />
      {msg}
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: any) {
  return (
    <div>
      <label className="text-xs text-white/60">
        {label}
      </label>

      <div className="relative mt-1">
        <Icon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />

        <input
          required
          type={type}
          placeholder={placeholder}
          value={value || ""}
          onChange={event => onChange?.(event.target.value)}
          className="w-full pl-9 pr-3 py-2.5 bg-bg border border-line rounded-md text-sm focus:outline-none focus:border-emerald-400/40"
        />
      </div>
    </div>
  );
}

function AuthShell({ title, subtitle, children }: any) {
  return (
    <div className="min-h-[80vh] grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-purple-500/10 border-r border-line p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative">
          <Logo />

          <div className="mt-16 max-w-md">
            <h2 className="text-3xl font-semibold text-white tracking-tight">
              Join {CONFIG.stats.investors} global investors building wealth
              on-chain.
            </h2>

            <p className="mt-4 text-white/65">
              Insured custody, transparent target yields, KYC, 2FA and
              institutional-grade account protection.
            </p>
          </div>
        </div>

        <div className="relative grid grid-cols-3 gap-3">
          {[
            {
              v: CONFIG.stats.aum,
              l: "AUM",
            },
            {
              v: CONFIG.stats.payoutReliability,
              l: "Reliability",
            },
            {
              v: `${CONFIG.stats.avgSupportSeconds}s`,
              l: "Avg. support",
            },
          ].map(stat => (
            <div
              key={stat.l}
              className="bg-bg/40 backdrop-blur border border-line rounded-lg p-3"
            >
              <div className="text-lg font-semibold text-white">
                {stat.v}
              </div>

              <div className="text-[11px] text-white/50">
                {stat.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo />
          </div>

          <h1 className="text-2xl font-semibold text-white">
            {title}
          </h1>

          <p className="mt-1 text-sm text-white/55">
            {subtitle}
          </p>

          <div className="mt-6">
            {children}
          </div>

          <div className="mt-8 flex items-center gap-2 text-[11px] text-white/40">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Secured by 256-bit TLS · KYC · 2FA · wallet screening
          </div>
        </div>
      </div>
    </div>
  );
    }
